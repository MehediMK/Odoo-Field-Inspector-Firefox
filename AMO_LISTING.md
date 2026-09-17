# AMO listing copy — ready to paste

Pure copy-paste content for the addons.mozilla.org submission form, one
field per section below. For *how* to submit (upload steps, validation,
data-collection question, package contents, pre-submit checklist), see
[`STORE_LISTING.md`](STORE_LISTING.md) — this file is only the finished
text.

---

## Name

```
Odoo Field Inspector
```

---

## Summary

*(shown under the name in search results and cards — AMO limit 250 characters, this is 121)*

```
Inspect Odoo (and any) form fields & table columns: CSS selector, XPath, technical field name, live ir.model.fields data.
```

---

## Category

```
Web Development
```

---

## Tags

```
odoo
developer-tools
css-selector
xpath
web-development
productivity
```

---

## Description

```
Odoo Field Inspector is a developer tool for Odoo functional consultants,
implementation partners, and developers who need a field's technical
name, XPath, or CSS selector without digging through Odoo's Technical
Settings or opening the browser's DevTools. It works off the Odoo web
client's standard markup (.o_field_widget[name], list-view data-name
columns) rather than a hardcoded version check, so it isn't tied to one
specific Odoo release. Click a form field's label or a table's column
header on any page — Odoo or not — and a developer-tool style panel
slides in with everything about it: element type, id/name, classes,
current and default value, required/read-only/disabled state, validation
and ARIA attributes, a working CSS selector, an XPath, its parent
element, and the owning <form>.

FORM VIEW
Click a <label>, <input>, <select>, <textarea>, checkbox/radio,
contenteditable field, or an ARIA-labelled custom control.

LIST VIEW
Click a <th> or [role="columnheader"] to see the column name, index,
attributes, selector, and a sample of the input control used in that
column. Click a plain data cell instead of the header to see its row/
column position and (on Odoo pages) the same live field lookup below.

BUILT FOR ODOO DEVELOPERS
When a clicked field belongs to an Odoo form, list, or wizard, the panel
leads with a live Odoo Field Definition pulled straight from that Odoo
server: the model, the field's real ORM type, relation, required/
readonly/stored state, help text, decoded selection options, how the
field is actually declared in the current view (widget=, domain=,
context=, invisible=, required=, ...), a direct link to the field's own
admin record, and a ready-to-paste <field name="..."/> view XML snippet.
No more guessing a field's technical name from CSS classes. This has its
own on/off toggle in the popup, separate from the general inspector
switch, and follows your system's light/dark theme.

FIELD FINDER
A floating search button opens a page-wide search: filter every field
and list column on the page by label or technical name, live as you
type, then click a result to jump straight to its full inspector panel.
If an Odoo wizard (dialog) is open, the search automatically scopes to
just that wizard's fields.

NEVER TOUCHES YOUR DATA
While inspecting, clicks on fields are intercepted before the page sees
them — labels never toggle checkboxes, <select> never opens, and no
value or focus state ever changes. Turn the inspector off and the page
behaves exactly as it did before.

PRIVACY
Everything runs locally in your browser. The one exception: the Odoo
field lookup above, which — only for fields recognized as Odoo fields —
asks the SAME Odoo server you're already logged into for that field's
definition, using your existing session. No field values, browsing
history, or personal data are ever sent, and there is no server or
analytics of ours in the loop at all. Full privacy policy:
https://mehedimk.github.io/Odoo-Field-Inspector-Firefox/privacy.html

No host permissions are requested, so Firefox never shows a broad
"access your data for all websites" warning: content scripts only run
on a tab after you explicitly enable the inspector for it.

WHO IT'S FOR
Odoo developers debugging a view, functional consultants who need a
field's technical name for a customization request without asking a
developer, QA/testers writing CSS selectors for automated tests, and
anyone who wants a field or table column's CSS selector and XPath on
any website — not just Odoo. If you've ever opened Odoo's Technical
Settings, turned on developer mode just to find one field's technical
name, or hand-written a CSS selector by guessing at DOM structure in
DevTools, this replaces that whole detour with one click.
```

---

## Support email / homepage URL

```
https://mehedimk.github.io/Odoo-Field-Inspector-Firefox/
```

---

## Privacy policy URL

```
https://mehedimk.github.io/Odoo-Field-Inspector-Firefox/privacy.html
```

---

## "What data does this extension collect?" (short answer for the AMO reviewer/consent form)

```
None, by default. The only data this extension ever sends anywhere is,
when the opt-in "Odoo Developer Mode" setting is on and a clicked field
is recognized as belonging to an Odoo form, the field's technical name
and model name (never its value) — sent to the same Odoo server the
current tab is already logged into, over that existing session. Nothing
is sent to the developer or to any third party. Full details:
https://mehedimk.github.io/Odoo-Field-Inspector-Firefox/privacy.html
```

---

## Permissions, in plain language (shown to users at install)

```
- activeTab: only act on the tab you explicitly enable the inspector on
- scripting: inject the inspector into that tab on demand
- storage: remember your preferences locally in your browser

No host permissions are requested — the extension cannot run on any
site until you turn it on there yourself.
```

---

## Version notes (for this release)

```
1.0.0 — Firefox edition. Same features as the Chrome release (currently
at 1.3.0 there): tabbed inspector panel, colored type chips, Field
Finder (with wizard-scoped search), Domain Builder, Chatter Manager,
inspection history, and live Odoo field lookups.
```
