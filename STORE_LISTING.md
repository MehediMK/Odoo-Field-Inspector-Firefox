# Firefox Add-ons (AMO) listing — copy-paste reference

Everything below is drafted text for the [Firefox Add-on Developer
Hub](https://addons.mozilla.org/developers/) submission form
(`Submit a New Add-on`). Nothing here is uploaded automatically — paste
each field into the matching box when you submit. This is the Firefox
sibling of `../chrome-field-inspector/STORE_LISTING.md`; the product
copy is the same product, reworded only where AMO's form fields, limits,
or review process differ from the Chrome Web Store's.

## Submission flow

1. Sign in at https://addons.mozilla.org/developers/ (a free Firefox
   Account).
2. **Submit a New Add-on** → **On this site** (listed, public on AMO) or
   **On your own** (unlisted — still signed by Mozilla so it installs
   permanently, but not published in the public catalog). Pick **On this
   site** for a normal public listing.
3. Upload `field-inspector-firefox-v1.0.0.zip` (see **Package** below).
   AMO runs the same automated validation `web-ext lint` runs locally —
   0 errors is required to proceed; warnings are advisory.
4. Fill in the listing fields below, upload the graphic assets, and
   submit for review.

There is **no developer registration fee** for AMO (unlike the Chrome
Web Store's one-time $5) and signing itself is always free.

## Listing details tab

**Name** (verify availability — AMO names must be unique):
```
Odoo Field Inspector
```

**Summary** (250 char max on AMO, shown under the name in search
results and cards):
```
Inspect Odoo (and any) form fields & table columns: CSS selector, XPath, technical field name, live ir.model.fields data.
```
121/250 characters.

**Category:** Web Development (AMO's closest equivalent to Chrome's
"Developer Tools")

**Description** (main listing body — identical product copy to the
Chrome listing, "Chrome DevTools" reworded to be browser-neutral):
```
Odoo Field Inspector is a developer tool for Odoo functional consultants,
implementation partners, and developers who need a field's technical
name, XPath, or CSS selector without digging through Odoo's Technical
Settings or opening the browser's DevTools. It works off the Odoo web
client's standard markup (`.o_field_widget[name]`, list-view `data-name`
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

**Support email / homepage URL:**
```
https://mehedimk.github.io/Odoo-Field-Inspector-Firefox/
```

**License:** pick whatever license the source repo actually uses (AMO
requires one to be declared for listed add-ons); if unset, "All Rights
Reserved" is the safe default until you decide otherwise.

## Privacy & data collection

**Privacy policy URL:**
```
https://mehedimk.github.io/Odoo-Field-Inspector-Firefox/privacy.html
```
This is a real, styled HTML page (`docs/privacy.html` in this repo,
mirroring `PRIVACY_POLICY.md`), served by this repo's own GitHub Pages
site — it is **not live until you enable it**:

1. Push this folder to `github.com/MehediMK/Odoo-Field-Inspector-Firefox`
   (or whatever repo name you actually use — update every
   `mehedimk.github.io/Odoo-Field-Inspector-Firefox/` URL in this file,
   `AMO_LISTING.md`, `README.md`, and inside `docs/*.html` first if you
   pick a different name).
2. GitHub → this repo → **Settings → Pages**.
3. Under "Build and deployment", set **Source: Deploy from a branch**,
   **Branch: main**, folder **`/docs`**. Save.
4. Wait a minute or two, then confirm both
   `https://mehedimk.github.io/Odoo-Field-Inspector-Firefox/` and the
   `/privacy.html` URL above load before pasting the URL into AMO's form
   — submission will be rejected without a working privacy policy URL
   for an add-on that talks to a remote server (the Odoo lookup).

This is a separate GitHub Pages site from the Chrome edition's
(`mehedimk.github.io/Odoo-Field-Inspector/`) — each edition hosts its
own docs independently.

**"Does this add-on collect any technical and interaction data?"**
(AMO's data-collection consent question, asked during submission):
Answer **No** for standard telemetry/analytics categories — this
extension has none. If AMO's form asks specifically about data sent to
third-party or remote servers, describe the Odoo lookup honestly: it
sends a field's technical name + model name (never its value) to the
same Odoo server the current tab is already logged into, only when
**Odoo Developer Mode** is on and a recognized Odoo field is clicked —
never to the developer, never to any third party. Point reviewers at
the privacy policy URL above for the full breakdown.

**Permissions** (AMO shows these to users at install time; no separate
justification text box like the Chrome Web Store, but keep this handy
in case a reviewer asks during manual review):

| Permission | Why |
|---|---|
| `activeTab` | Lets the extension act on the current tab only after the user explicitly clicks the toolbar icon and enables it — not automatically on every site. |
| `scripting` | Lets the extension inject its inspector code into the tab the user has enabled it on, on demand. |
| `storage` | Lets the extension save the user's preference settings locally via the WebExtensions `storage.local` API, so they persist between browser sessions. |

No host permissions are requested.

## Graphic assets

| Asset | Requirement | Status |
|---|---|---|
| Add-on icon | 128×128 PNG (AMO also displays a 64×64 downscale) | ✅ `icons/icon128.png` |
| Screenshot(s) | Any size, 1080p-ish recommended; at least 1 | ✅ reuse the 5 screenshots from `../chrome-field-inspector/promo/` — same product UI, browser-neutral (also copied into this folder's `promo/`) |

AMO doesn't use Chrome's small-promo-tile/marquee assets — the icon and
screenshots above are all that's needed.

## Package

Upload `field-inspector-firefox-v1.0.0.zip`. It contains only the files
`manifest.json` references: `manifest.json`, `background.js`,
`content/`, `content.css`, `popup/`, `icons/*.png` (plus `icons/icon.svg`,
which isn't referenced but is harmless to include). `README.md`,
`PRIVACY_POLICY.md`, `STORE_LISTING.md`, and `promo/` are dev-only and
intentionally excluded from the package. Rebuild it after any source
change with:
```
cd firefox-field-inspector
zip -r field-inspector-firefox-v1.0.0.zip manifest.json background.js content.css content/ popup/ icons/ -x '*.DS_Store'
```
Validate before uploading:
```
npx web-ext lint --source-dir=.
```
This build was last validated at **0 errors, 0 notices, 12 warnings**
(all pre-existing `innerHTML` assignments in `content/ui.js`,
`content/chatter.js`, and `content/domain-builder.js` that the static
linter can't verify are already passed through the local `escapeHtml()`
helper before insertion — same code as the Chrome edition, not
introduced by this port).

## Before you submit

1. Confirm the "Odoo Field Inspector" name isn't already taken on AMO —
   if it is, pick a variant (e.g. "Field Inspector for Odoo") and update
   `manifest.json`'s `name` to match before rebuilding the zip.
2. Load the exact zipped contents as a temporary add-on
   (`about:debugging#/runtime/this-firefox` → **Load Temporary Add-on…**,
   pick a file extracted from the zip, not your working directory) to
   confirm nothing needed got excluded.
3. Run `npx web-ext lint --source-dir=.` one more time against the
   working directory and confirm 0 errors before uploading.
4. Enable GitHub Pages for this repo's own `/docs` folder (see
   **Privacy & data collection** above) and confirm
   `https://mehedimk.github.io/Odoo-Field-Inspector-Firefox/privacy.html`
   loads — AMO requires a working privacy policy URL for an add-on that
   talks to a remote server (the Odoo lookup).
5. `browser_specific_settings.gecko.id` in `manifest.json`
   (`odoo-field-inspector@mehedimk.github.io`) must stay stable across
   versions — changing it makes AMO treat future uploads as a brand-new
   add-on rather than an update to this one.
6. Listed (public) submissions go through AMO's human review queue;
   an extension with no host permissions and a clear single purpose
   (this one) typically reviews faster, but first submissions can still
   take a few business days. Unlisted submissions are auto-signed within
   minutes if automated validation passes, with no human review wait —
   pick that track if you just need a signed `.xpi` quickly and don't
   need the public listing yet.
