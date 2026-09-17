/**
 * Field Inspector - CSS bootstrap
 *
 * Firefox's `scripting.insertCSS` doesn't reliably honor the `activeTab`
 * grant the way `scripting.executeScript` does, and fails with a generic
 * "An unexpected error occurred" — so the stylesheet is injected as a
 * <style> tag through this executeScript-loaded file instead.
 *
 * The rules are inlined (not fetched from content.css at runtime) so this
 * has zero dependency on web_accessible_resources or a page's CSP
 * connect-src — both of which are just another way the same class of
 * "works in Chrome, silently fails in Firefox" bug could resurface. Keep
 * this in sync with content.css by hand; it's small and rarely changes.
 */
(function () {
  if (document.getElementById("__fi_style__")) return; // idempotent re-injection guard

  const css = `
html[data-fi-active] .fi-detected-field {
  outline: 1.5px dashed rgba(37, 99, 235, 0.55) !important;
  outline-offset: 2px !important;
  cursor: pointer !important;
}

html[data-fi-active] .fi-hover-field {
  outline: 2px solid #2563eb !important;
  outline-offset: 2px !important;
  background-color: rgba(37, 99, 235, 0.08) !important;
  cursor: pointer !important;
}

html[data-fi-active="true"] .fi-chatter-collapsed { display: none !important; }
html[data-fi-active="true"] .fi-chatter-message-flash { outline: 2px solid #875a7b !important; outline-offset: 2px !important; }
`;

  const style = document.createElement("style");
  style.id = "__fi_style__";
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);
})();

// Firefox's scripting.executeScript clones each file's top-level completion
// value and throws "Script result is non-structured-clonable data" if it
// can't — force it to a guaranteed-cloneable value regardless of what the
// IIFE above implicitly evaluates to.
void 0;
