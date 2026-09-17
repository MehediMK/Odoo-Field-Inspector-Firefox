/**
 * Field Inspector - CSS bootstrap
 *
 * Firefox's `scripting.insertCSS` doesn't reliably honor the `activeTab`
 * grant the way `scripting.executeScript` does, and fails with a generic
 * "An unexpected error occurred" — so content.css is fetched and injected
 * as a <style> tag through the same executeScript call as the other
 * content files instead of via insertCSS. Single source of truth for the
 * actual rules stays content.css; declared web-accessible in manifest.json
 * so this fetch is allowed to read it from the page context.
 */
(function () {
  if (document.getElementById("__fi_style__")) return; // idempotent re-injection guard

  const api = typeof browser !== "undefined" ? browser : chrome;

  fetch(api.runtime.getURL("content.css"))
    .then((res) => res.text())
    .then((css) => {
      const style = document.createElement("style");
      style.id = "__fi_style__";
      style.textContent = css;
      (document.head || document.documentElement).appendChild(style);
    })
    .catch((err) => {
      console.error("[Field Inspector] CSS injection failed:", err);
    });
})();
