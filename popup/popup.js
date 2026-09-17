/**
 * Field Inspector - popup controller
 *
 * Reads/writes preferences via storage.local and drives the per-tab
 * content script via tabs.sendMessage, injecting it on demand
 * (activeTab + scripting) the first time it's needed.
 */

// Firefox doesn't alias every namespace (e.g. `scripting`) onto `chrome.*`,
// only `browser.*` is guaranteed complete — prefer it where present.
const api = typeof browser !== "undefined" ? browser : chrome;

const DEFAULT_SETTINGS = {
  formView: true,
  listView: true,
  highlight: true,
  copyFormat: "text",
  odooMode: true,
};

// content/inject-css.js goes first: it fetches and injects content.css as a
// <style> tag itself, since Firefox's `scripting.insertCSS` doesn't reliably
// honor the `activeTab` grant the way `scripting.executeScript` does.
const CONTENT_FILES = ["content/inject-css.js", "content/utils.js", "content/odoo.js", "content/detector.js", "content/ui.js", "content/domain.js", "content/domain-builder.js", "content/chatter.js", "content/content.js"];

const els = {};
let activeTab = null;
let restricted = false;
let lastError = null;

function isRestrictedUrl(url) {
  if (!url) return true;
  return (
    url.startsWith("chrome://") ||
    url.startsWith("chrome-extension://") ||
    url.startsWith("moz-extension://") ||
    url.startsWith("edge://") ||
    url.startsWith("about:") ||
    url.startsWith("https://chrome.google.com/webstore") ||
    url.startsWith("https://chromewebstore.google.com") ||
    url.startsWith("https://addons.mozilla.org")
  );
}

async function getActiveTab() {
  const [tab] = await api.tabs.query({ active: true, currentWindow: true });
  return tab || null;
}

async function loadSettings() {
  const stored = await api.storage.local.get("fiSettings");
  return { ...DEFAULT_SETTINGS, ...(stored.fiSettings || {}) };
}

async function saveSettings(settings) {
  await api.storage.local.set({ fiSettings: settings });
}

// Promise-only form: `browser.tabs.sendMessage` (Firefox) doesn't support a
// callback argument the way `chrome.tabs.sendMessage` does, so a callback +
// `chrome.runtime.lastError` here would silently never resolve on Firefox.
function sendToTab(tabId, message) {
  return api.tabs.sendMessage(tabId, message);
}

async function pingTab(tabId) {
  try {
    const response = await sendToTab(tabId, { type: "PING" });
    return !!(response && response.pong);
  } catch (err) {
    return false;
  }
}

async function ensureInjected(tabId) {
  const alreadyThere = await pingTab(tabId);
  if (alreadyThere) return true;

  let results;
  try {
    results = await api.scripting.executeScript({ target: { tabId }, files: CONTENT_FILES });
  } catch (err) {
    console.error("[Field Inspector] executeScript failed:", err);
    lastError = err;
    return false;
  }

  // executeScript's own promise resolving doesn't guarantee every injected
  // file ran cleanly — a thrown error inside one of them can surface here
  // as a per-frame `error` instead of a rejection, silently leaving the
  // rest of the file (e.g. content.js's onMessage listener) unregistered.
  const failed = Array.isArray(results) ? results.find((r) => r && r.error) : null;
  if (failed) {
    const detail = failed.error && failed.error.message ? failed.error.message : String(failed.error);
    console.error("[Field Inspector] a content script threw during injection:", failed.error);
    lastError = new Error(`content script error: ${detail}`);
    return false;
  }

  // Belt-and-suspenders: confirm the listener is actually there before
  // telling the caller injection succeeded, since a silent per-file failure
  // (above) isn't the only way it could end up unregistered.
  const listening = await pingTab(tabId);
  if (!listening) {
    lastError = new Error("content script injected but did not respond to PING (its onMessage listener never registered)");
    return false;
  }

  return true;
}

function setStatusText(text, isError) {
  els.statusText.textContent = text;
  els.statusText.classList.toggle("fp-disabled-note", !!isError);
}

// Surfaces the real thrown error in the popup itself, so diagnosing a
// failed start doesn't require opening the browser console.
function describeStartFailure(err) {
  const detail = err && err.message ? err.message : String(err || "unknown error");
  return `Could not start on this page: ${detail}`;
}

function setControlsEnabled(enabled) {
  els.formView.disabled = !enabled;
  els.listView.disabled = !enabled;
  els.highlight.disabled = !enabled;
  els.odooMode.disabled = !enabled;
}

async function pushSettingsToTab(settings) {
  if (!activeTab) return;
  const isOn = els.enableToggle.checked;
  if (!isOn) return;
  try {
    await sendToTab(activeTab.id, { type: "FI_UPDATE_SETTINGS", settings });
  } catch (err) {
    // Content script may not be present (e.g. tab navigated); ignore.
  }
}

async function onEnableToggleChange() {
  if (!activeTab || restricted) {
    els.enableToggle.checked = false;
    return;
  }

  const settings = await loadSettings();

  if (els.enableToggle.checked) {
    console.log("[Field Inspector] enabling on tab", activeTab.id, activeTab.url);
    setStatusText("Starting inspector…");
    lastError = null;
    const ok = await ensureInjected(activeTab.id);
    if (!ok) {
      els.enableToggle.checked = false;
      setStatusText(describeStartFailure(lastError), true);
      return;
    }
    try {
      await sendToTab(activeTab.id, { type: "FI_ENABLE", settings });
      setStatusText("Inspector active — click a field on the page.");
      setControlsEnabled(true);
    } catch (err) {
      console.error("[Field Inspector] FI_ENABLE message failed:", err);
      els.enableToggle.checked = false;
      setStatusText(describeStartFailure(err), true);
    }
  } else {
    try {
      await sendToTab(activeTab.id, { type: "FI_DISABLE" });
    } catch (err) {
      /* content script already gone (e.g. navigation) — nothing to do */
    }
    setStatusText("Inspector is off.");
    setControlsEnabled(false);
  }
}

async function onSettingChange() {
  const settings = {
    formView: els.formView.checked,
    listView: els.listView.checked,
    highlight: els.highlight.checked,
    odooMode: els.odooMode.checked,
    copyFormat: document.querySelector('input[name="fp-copy-format"]:checked').value,
  };
  await saveSettings(settings);
  await pushSettingsToTab(settings);
}

function applySettingsToUI(settings) {
  els.formView.checked = settings.formView;
  els.listView.checked = settings.listView;
  els.highlight.checked = settings.highlight;
  els.odooMode.checked = settings.odooMode;
  const radio = document.getElementById(settings.copyFormat === "json" ? "fp-copy-json" : "fp-copy-text");
  if (radio) radio.checked = true;
}

async function init() {
  els.enableToggle = document.getElementById("fp-enable-toggle");
  els.statusText = document.getElementById("fp-status-text");
  els.formView = document.getElementById("fp-form-view");
  els.listView = document.getElementById("fp-list-view");
  els.highlight = document.getElementById("fp-highlight");
  els.odooMode = document.getElementById("fp-odoo-mode");
  els.version = document.getElementById("fp-version");

  try {
    const manifest = api.runtime.getManifest();
    els.version.textContent = `v${manifest.version}`;
  } catch (err) {
    /* non-fatal */
  }

  const settings = await loadSettings();
  applySettingsToUI(settings);

  activeTab = await getActiveTab();

  if (!activeTab || isRestrictedUrl(activeTab.url)) {
    restricted = true;
    els.enableToggle.checked = false;
    els.enableToggle.disabled = true;
    setControlsEnabled(false);
    setStatusText("Not available on this page.", true);
  } else {
    const currentlyEnabled = await pingTab(activeTab.id).then(async (present) => {
      if (!present) return false;
      try {
        const state = await sendToTab(activeTab.id, { type: "GET_STATE" });
        if (state && state.settings) applySettingsToUI(state.settings);
        return !!(state && state.enabled);
      } catch (err) {
        return false;
      }
    });

    els.enableToggle.checked = currentlyEnabled;
    setControlsEnabled(currentlyEnabled);
    setStatusText(currentlyEnabled ? "Inspector active — click a field on the page." : "Inspector is off.");
  }

  els.enableToggle.addEventListener("change", onEnableToggleChange);
  els.formView.addEventListener("change", onSettingChange);
  els.listView.addEventListener("change", onSettingChange);
  els.highlight.addEventListener("change", onSettingChange);
  els.odooMode.addEventListener("change", onSettingChange);
  document.getElementById("fp-copy-text").addEventListener("change", onSettingChange);
  document.getElementById("fp-copy-json").addEventListener("change", onSettingChange);
}

document.addEventListener("DOMContentLoaded", () => {
  init().catch((err) => {
    console.error("[Field Inspector] popup init failed:", err);
    setStatusText("Something went wrong. Try reopening the popup.", true);
  });
});
