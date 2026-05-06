# blog_readme.md

> Notes for future-me. This is how `blog.html` is wired together and how to add a new post without breaking anything.

---

## Why the architecture looks like this

The site lives statically on Cloudflare Pages — no backend, no DB, no build step. But it should also "just work" when opened directly via `file://` for local preview (double-click `blog.html`, see the blog).

To satisfy both, **everything is loaded via plain `<script>` tags** instead of `fetch()`. `fetch('local.json')` is blocked by the browser on `file://`; `<script src="local.js">` is not. Same code path on `file://`, `localhost`, and Cloudflare.

The split:

- `blog/blog_data/manifest.js` — the **index** only. Metadata for every post (slug, date, title, excerpt, tags, etc.). No bodies. Loaded once at page load.
- `blog/blog_data/<slug>/post.zh.js` and `blog/blog_data/<slug>/post.en.js` — each post's **body**, in its own folder. Loaded on demand when the reader view opens that post.

---

## File layout

```
blog.html                          ← the entire blog UI (list view + reader view)
blog/
├── blog_data/
│   ├── manifest.js                ← INDEX ONLY. Sets window.__BLOG_MANIFEST.
│   ├── blog_readme.md             ← this file
│   ├── <slug>/                    ← one folder per post
│   │   ├── post.zh.js             ← Chinese body. Sets window.__BLOG_POSTS['<slug>:zh'].
│   │   ├── post.en.js             ← English body. Sets window.__BLOG_POSTS['<slug>:en'].
│   │   ├── post.js                ← Single-language body (when lang !== 'both'). Key: '<slug>:<lang>'.
│   │   ├── cover.webp             ← OPTIONAL cover image, referenced from manifest.js
│   │   └── (other assets, e.g. inline images)
│   └── (more post folders…)
└── editor/
    └── blog_writer.py             ← desktop GUI for adding/editing posts (Tk-based)
```

URLs:

- `blog.html` → list view
- `blog.html#<slug>` → reader view for that post (slug must match a manifest entry)

`blog.html` loads `manifest.js` once at boot, then dynamically injects `<script>` tags for `post.<lang>.js` files only when the reader opens. Bodies are cached in memory after first load.

---

## manifest.js schema (index only — no bodies)

`blog/blog_data/manifest.js` sets `window.__BLOG_MANIFEST` to:

```js
window.__BLOG_MANIFEST = {
  version: 3,
  updated: 'YYYY-MM-DD',         // top-level: when this manifest was last touched (informational)
  posts: [
    {
      slug: 'kebab-case-id',     // REQUIRED. URL hash AND post folder name. Never change after publish.
      date: 'YYYY-MM-DD',        // REQUIRED. ISO 8601 publish date. Used for sort + display.
      updated: 'YYYY-MM-DD',     // OPTIONAL. ISO 8601 last-modified date. Shown only if present and !== date.
      title:   { zh: '...', en: '...' },  // REQUIRED. Object for bilingual, or plain string.
      excerpt: { zh: '...', en: '...' },  // 1–2 sentence card summary. Object or string.
      tags: ['tag1', 'tag2'],    // OPTIONAL. Powers the filter chips.
      cover: 'cover.webp',       // OPTIONAL. Resolved as `blog/blog_data/<slug>/cover.webp`.
      readingTime: 3,            // OPTIONAL. Integer minutes.
      lang: 'both',              // 'both' (default) | 'zh' | 'en'
      pinned: false,             // OPTIONAL. true = sticky to top of the list.
      draft: false               // OPTIONAL. true = excluded from list AND blocked in the reader.
    }
  ]
};
```

**No `body` field.** Bodies live in `blog/blog_data/<slug>/post.<lang>.js`.

Field rules:

- **`title` / `excerpt`** can be a plain string (single-language) or `{zh, en}` object. The renderer falls back: current lang → `en` → `zh` → empty.
- **`lang`** controls which body files the reader looks for:
  - `'both'` → loads `post.zh.js` for zh-UI and `post.en.js` for en-UI. If the requested-language file fails to load, the reader falls back to the other language automatically.
  - `'zh'` or `'en'` → loads a single `post.<lang>.js`. The card and reader still show the manifest title/excerpt in the UI language; only the body is single-language.
- **Sorting** (priority order):
  1. `pinned: true` posts come first
  2. Then by `date` descending (newest first)
  3. Ties broken by string compare on the date
- **`updated` semantics**: think "last meaningful edit". Don't bump for typos. If published `2026-05-01` and meaningfully edited `2026-05-12`, set `updated: '2026-05-12'` — cards then show `May 1, 2026 · Updated May 12 · 3 min`. If `updated === date` it's hidden.
- **`pinned` UX**: pinned posts get a small "📌 PINNED" pill in the meta row, a slightly tinted card background, and the accent border on hover. Don't pin more than 2–3 at a time.
- **Drafts**: `"draft": true` removes from list AND blocks the reader (even via direct hash).

---

## post.<lang>.js schema (one body per file)

Each post body file has the form:

```js
/* Post body — <slug> / <lang> */

(window.__BLOG_POSTS = window.__BLOG_POSTS || {})['<slug>:<lang>'] = `
<p class="lead">Lead paragraph here…</p>

<h2>Section heading</h2>
<p>Paragraph body…</p>

<!-- … rest of the post … -->
`;
```

That's the whole file — one statement that registers the body string into a global registry. The key MUST match `<slug>:<lang>` (e.g. `'vision-networks-fttb:zh'`). If it doesn't, the loader will fail with a clear error.

For single-language posts (`lang: 'zh'` or `lang: 'en'`), still use the matching filename: `post.zh.js` or `post.en.js`. The key still uses the same `<slug>:<lang>` shape.

---

## How to add a new post

1. **Pick a slug** — short, lowercase, hyphenated (`first-bug`, `melb-winter-2026`). Becomes both the URL hash and the folder name. Don't change it later — old links break.

2. **Create the folder**: `blog/blog_data/<slug>/`

3. **Create body files** in that folder (one per supported language):
   - `post.zh.js` → registers `window.__BLOG_POSTS['<slug>:zh']`
   - `post.en.js` → registers `window.__BLOG_POSTS['<slug>:en']`

   Just copy an existing post's body file as a template. The body itself is plain HTML inside a JS template literal (backticks). Available styles are listed under "Post body conventions".

4. **(Optional) Drop a cover image** at `blog/blog_data/<slug>/cover.webp`.

5. **Append a manifest entry** to `posts[]` in `blog/blog_data/manifest.js`. Bump the top-level `updated`.

6. **Verify locally** — just double-click `blog.html`. The list page loads first; clicking the post triggers the body load. No server required.

---

## Post body conventions

Body strings are plain HTML inside a JS template literal (backticks). Available styles in the reader (defined in `blog.html` under `.reader-body`):

| Element | Notes |
|---|---|
| `<p class="lead">` | First-paragraph treatment with accent left-border, italic |
| `<h2>` | Section heading with top border separator |
| `<h3>` | Sub-heading |
| `<p>` | Paragraph |
| `<strong>` | Accent-colored emphasis |
| `<em>` | Cream-colored italic |
| `<a href="…">` | Underlined accent link |
| `<ul>` / `<ol>` / `<li>` | Standard list, with comfortable spacing |
| `<code>` | Inline code with subtle accent background |
| `<pre><code>` | Block code |
| `<blockquote>` | Accent left-border, italic muted |
| `<img src="blog/blog_data/<slug>/img.webp">` | Block image with rounded corners and border |
| `<hr>` | Centered accent gradient divider |

Need a new prose element? Add it both to the post body AND to `.reader-body …` rules in `blog.html`'s style block.

---

## TOC sidebar (table of contents)

On wide viewports (≥ 1300 px), the reader automatically builds a sticky left sidebar with all `<h2>` and `<h3>` headings from the post body. Clicking a heading scrolls smoothly to it; the current section is highlighted as the user scrolls.

**How it works:**
- `buildToc()` is called in `renderReader` right after `writeBody(html)` succeeds.
- It queries `#reader-body` for `h2, h3` elements, assigns stable `id` attributes (slugified from text), and renders `<a class="toc-link">` elements into `<nav id="toc-sidebar">`.
- An `IntersectionObserver` with `rootMargin: '-10% 0px -80% 0px'` tracks which heading is in the upper portion of the viewport and adds `.toc-current` to the matching link.
- Clicks use `scrollIntoView({ behavior: 'smooth' })` with `e.preventDefault()` — **do not let these links change `location.hash`**, because any hash change triggers `route()` which would navigate away from the post.
- `clearToc()` is called in `route()` when switching back to the list view; it disconnects the observer and empties the sidebar.
- Language toggle rebuilds the TOC automatically because `applyLang → route → renderReader → writeBody → buildToc`.

**CSS positioning:**
```css
left: max(20px, calc(50vw - 450px - 210px));
```
This keeps the TOC left of the 880 px content column regardless of viewport width. Hidden via `display: none !important` below 1300 px.

**Post authoring note:** The TOC is driven entirely by `<h2>` and `<h3>` in the post body — no extra markup needed. Posts with fewer than 2 headings get no sidebar.

---

## ⚠️ Template-literal escaping

`post.<lang>.js` body strings are JS backtick-delimited template literals. Two characters need escaping:

| Want to write literally | Escape as |
|---|---|
| `` ` `` (backtick) | `` \` `` |
| `${` (dollar-curly) | `\${` |

If a post discusses code that contains backticks (rare — bash heredocs, markdown ticks), or shell variable syntax like `${HOME}`, escape them. Forgetting means JS will try to template-substitute and you'll get a runtime error or wrong content.

For 99% of prose articles, neither character appears, so no escaping is needed.

---

## Asset paths inside post bodies

Assets are loaded via the browser's normal HTML resolver, which resolves URLs **relative to `blog.html`** (the page in the address bar) — NOT relative to the post folder. So:

```html
<!-- Wrong: relative to nothing useful -->
<img src="img.webp">
<img src="cover.webp">

<!-- Right: explicit prefix -->
<img src="blog/blog_data/<slug>/img.webp">
```

Same rule for the `cover` field in the manifest — it's the *filename* (e.g. `"cover.webp"`); the renderer prepends `blog/blog_data/<slug>/`.

Convert PNG → WebP for size:

```bash
python -c "from PIL import Image; Image.open('cover.png').save('cover.webp', 'webp', quality=90)"
```

Aim for cover images < 200 KB.

---

## Editing an existing post

1. Edit `blog/blog_data/<slug>/post.zh.js` and/or `post.en.js`. The body string is the only thing inside.
2. **If the change is meaningful**, set `updated: '<today>'` in the manifest entry. Trivial typo? Leave `updated` alone.
3. Bump the top-level `manifest.updated` if you want.
4. Don't change `slug` — it's the permanent URL AND folder name. If you must rename, expect old links to 404.

If a post had a major rewrite and you want it to feel "new" again, set `pinned: true` instead of faking a fresh `date`.

---

## Component map (inside blog.html)

| Element / function | Purpose |
|---|---|
| `<script src="blog/blog_data/manifest.js">` | Loads `window.__BLOG_MANIFEST` synchronously before the main script runs |
| `loadManifest()` | Reads `window.__BLOG_MANIFEST`, drops drafts, sorts (pinned → date desc) |
| `renderTagBar()` | Builds the tag pills — "All" + deduped sorted union of all post tags |
| `renderList()` | Renders cards for posts matching `activeTag` |
| `loadPostBody(slug, lang)` | On demand: injects a `<script>` tag for `blog/blog_data/<slug>/post.<lang>.js`, awaits load, returns the registered body. Cached in `window.__BLOG_POSTS` and an in-flight map (`_bodyLoading`) to prevent duplicate loads. |
| `renderReader(slug)` | Renders the metadata skeleton immediately, then awaits `loadPostBody` and injects body HTML. Fallback to opposite language on failure. |
| `pickLang(field)` | Resolves bilingual `{zh, en}` against `currentLang` with fallback chain |
| `formatDate(iso)` | Luxon-formatted date per locale (`yyyy.MM.dd` for zh, `LLL d, yyyy` for en) |
| `route()` | Reads `location.hash`, swaps view, re-renders |
| `applyLang(lang)` | Re-applies static labels and re-routes (so visible content reflects new lang) |
| `bindFadeIn()` | Re-binds the IntersectionObserver after each render |

Routing is **hash-based** (`#slug`). No history API, no server routing.

Language preference persists via `localStorage['louie-lang']` and is shared with `index.html`.

---

## Style / design rules to keep consistent

- Stick to the `:root` CSS variables — they match `index.html`. If you start hardcoding `#d98c70`, you've drifted.
- Cards use the same glass-blur recipe as index.html's `.project-card` (`rgba(35,35,37,0.4)` + `backdrop-filter: blur(40px) saturate(150%)`).
- Reader prose width is capped by `main { max-width: 880px }` — don't widen, it hurts readability.
- Bilingual UI: every translatable static label has `data-i18n="key"`. Add new keys to **both** `translations.zh` and `translations.en`, or the missing-language toggle will display the raw key.

---

## Gotchas

1. **`window.__BLOG_MANIFEST` must exist before the main script runs.** Keep `<script src="blog/blog_data/manifest.js">` *before* the inline `<script>` in `blog.html`. The current order is correct — don't reorder.
2. **`post.<lang>.js` files must register the EXACT key `<slug>:<lang>`.** Mismatch (`'foo:zh'` when slug is `bar`) means the loader sees the script load successfully but no body present, and shows a clear error.
3. **Slug rename = broken inbound links AND missing folder.** If you must rename, expect old `blog.html#old-slug` URLs to show "Post not found".
4. **Cloudflare caching of manifest.js** — when you publish a new post, the manifest changes but the URL is the same, so CDN caches may serve stale data. Either configure short cache TTL on `manifest.js` and the post .js files, or version their URLs in the `<script src=...>` (cache-bust). The current `blog.html` doesn't version-stamp them, so a force-refresh might be needed during deploys.
5. **Cloudflare Rocket Loader** can interfere with script execution timing. If the blog ever loads weird in production but fine locally, disable Rocket Loader for this site in the Cloudflare dashboard.
6. **No fetch() at runtime** — every load goes through `<script>` tags. This is intentional and the reason the site works on `file://`.
7. **No code highlighting** is bundled. If a post needs syntax highlighting, ship a small highlighter (Prism, Shiki) or stick with plain `<pre><code>`.
8. **Date format**: ISO 8601 only (`YYYY-MM-DD`). Anything else makes Luxon return "Invalid DateTime".
9. **Tag filter doesn't reset on language switch** — by design (`activeTag` is module-scoped). If you change tags between languages, just click "All".
10. **Reader skeleton uses `requestAnimationFrame` to reveal itself, not `IntersectionObserver`.** When `route()` flips `view-reader` from `display:none` to `display:block` and then immediately calls `renderReader`, the IO fires before layout is recomputed and reports `isIntersecting: false` — so the `.visible` class never gets added and the entire reader stays at `opacity: 0` (blank screen). The fix: after `reader.innerHTML = skeleton`, call `requestAnimationFrame(() => wrapper.classList.add('visible'))`. rAF fires after layout is stable, so the CSS transition plays correctly. The list-view cards still use IO because they scroll into view from a stable layout — no issue there. **Do not switch the reader back to IO.**

---

## Quick checklist before publishing a new post

- [ ] Slug picked (short, lowercase, hyphenated, never to be changed)
- [ ] Folder `blog/blog_data/<slug>/` created
- [ ] `post.zh.js` and/or `post.en.js` written, **registering the exact key `<slug>:<lang>`**
- [ ] Body HTML uses only the elements listed in "Post body conventions"
- [ ] Asset paths in body use `blog/blog_data/<slug>/...` (resolved against `blog.html`)
- [ ] No unescaped `` ` `` or `${` inside body strings
- [ ] **Headings are well-structured for the TOC** — use `<h2>` for top-level sections and `<h3>` for sub-sections. The sidebar appears automatically when there are ≥ 2 headings. Avoid skipping levels (e.g. `<h2>` → `<h4>`) since only h2/h3 are picked up.
- [ ] **Heading text is concise** — TOC links are 220 px wide; very long headings wrap to two lines. Aim for headings under ~30 characters where possible.
- [ ] Manifest entry appended in `manifest.js` (matching `slug`, `date`, `title`, `excerpt`, `lang`, etc.)
- [ ] Cover image: place `cover.webp` in `blog/blog_data/<slug>/` and add `cover: 'cover.webp'` to the manifest entry. Convert PNG → WebP with `cwebp -q 90 cover.png -o cover.webp`.
- [ ] `pinned` / `draft` set deliberately (or omitted)
- [ ] If editing an existing post, `updated` bumped (or deliberately not)
- [ ] Top-level `manifest.updated` bumped
- [ ] Verified locally by opening `blog.html` directly in the browser — list view AND clicking through to the reader should both work
- [ ] If `lang: 'both'`, verified in **both** languages via the language toggle
- [ ] On a wide screen (≥ 1360 px), verify the TOC sidebar appears and scroll-spy highlights correctly

---

# IF you are an AI

(Note from the previous AI to the next one. Read this before touching anything.)

Louie works with AI as a primary collaborator on this codebase — most of what's here was iterated through Claude. He's not a passive operator; he reads diffs, opens files, and notices when something is off. Treat him like a thoughtful tech lead, not a customer.

## What the blog system actually is (post-v3)

The whole site is a static bundle that has to satisfy **two** runtime contexts equally well:

1. Cloudflare Pages (production) — `https://louie1.com/blog.html`
2. `file://` double-click on Louie's local machine — `C:\Users\Louie\Documents\GitHub\homepage\blog.html`

This dual constraint is the reason for **every** weird-looking architecture decision. The most important one: nothing uses `fetch()`. Everything (manifest, post bodies) loads via `<script>` tags. If you find yourself reaching for `fetch` to "simplify" something, stop — you'll break the file:// case.

The data flow:

- Page boots → `<script src="blog/blog_data/manifest.js">` populates `window.__BLOG_MANIFEST` (~1.5 KB, all metadata, no bodies)
- List view renders from manifest only — fast, no network
- User clicks a post → `loadPostBody(slug, lang)` injects `<script src="blog/blog_data/<slug>/post.<lang>.js">`, which registers `window.__BLOG_POSTS['<slug>:<lang>']`. Cached in memory after first load.
- Language toggle re-fetches via the same loader (with cache hit if already loaded)
- Cover images, inline images: standard `<img src="blog/blog_data/<slug>/...">`. Resolved relative to `blog.html`, not the post folder.

The split (manifest separate from bodies) is intentional and Louie cared about it specifically — manifest stays small, each post is independently editable, CDN caching is per-file.

## How Louie wants you to work

These are not preferences I'm guessing — they were stated explicitly during this session, sometimes after I got it wrong:

- **Never run git operations on this repo.** No `git add`, `commit`, `push`, `gh pr create`. Even if `/create-pr` is invoked, decline. He handles git himself.
- **Apply changes to the actual files.** The session runs in a worktree (`.claude/worktrees/<name>/`) but the "real" files live at `C:\Users\Louie\Documents\GitHub\homepage\`. After editing in the worktree, `cp` results to the main repo. Don't make him ask.
- **Don't fake state in the preview to take screenshots.** If you `eval` a modification (e.g. set `pinned: true` to demo the badge), he sees the screenshot and assumes the file was changed. This caused real confusion mid-session. If you want to demo, change the file.
- **Don't add features he didn't ask for.** I once added a "Lab" section with world clocks and Konami code. He removed it the next turn. Stick to scope.
- **Be willing to delete what you just built.** Architecture changed twice in one session: per-post `.html` files → bundled bodies in manifest → split bodies into per-folder `.js` files. He had a clear mental model and pushed until the code matched it. Don't be precious about your previous work.
- **He tests by double-clicking the file in his browser.** If you ship something that requires a server, he'll come back with "还是没东西啊" (still nothing). The file:// equivalence is the whole point of the script-tag architecture.

## Design taste

- **Subtle over loud.** The first dropdown design was a bordered pill with caps text — "突兀" (jarring) was his exact word. The current `brand-switcher` is the rewrite: transparent, low-key, only the chevron and color shift hint at interactivity. Match this register.
- **One coherent unit, not separate pieces.** The brand+selector is `louie.X` as one connected token, not `louie.` (logo) + a separate "X" button. Same idea on the dropdown items.
- **Existing palette is non-negotiable.** Use `var(--accent)` (#d98c70), `var(--muted)`, etc. Don't introduce new colors. Glass blur recipe (`rgba(35,35,37,0.4)` + `backdrop-filter: blur(40px) saturate(150%)`) is the visual signature — keep it consistent across cards.
- **Typography: descenders must show.** The "Blog" title's `g` was getting clipped by tight `line-height` + gradient `background-clip: text`. Don't use `line-height: 1.05` on a gradient-clipped heading — give it `1.18`+ and `padding-bottom: 0.1em`.
- **Mobile/responsive is a real check, not a token gesture.** He uses both desktop and small-window-on-large-screen.

## Content taste

- **Privacy.** Don't write his real name beyond "Louie", school, course, or specific identifiers. He's "an international student from China studying in Melbourne" — that's the level of detail to stay at.
- **Don't paraphrase his writing.** If he provides article text, preserve it character-for-character ("一个字都不要差"). Including inconsistent capitalization (`Part1` vs `part2`), mixed punctuation (`：` and `:` in the same article), emojis, and what might look like typos. Translate when asked, but never edit the original.
- **Length: short by default.** "不用写太长" came up multiple times. If a post can be 3 paragraphs, make it 3 paragraphs.
- **Tags: keep them lowercase English in general** ("intro", "meta", "australia", "guide"). The `Hello World` tag on the welcome post is the explicit exception he wanted. Don't proliferate tag styles.
- **AI involvement is part of the brand here, not a secret.** The welcome post explicitly mentions Claude. Don't try to hide AI fingerprints; Louie is upfront about the workflow.

## Schema discipline

The current manifest entry shape (post-v3):

```js
{
  slug, date, title, excerpt,
  tags, cover, readingTime, lang,
  pinned, draft, updated
}
```

- Don't add a `body` field on the manifest — bodies live in their own files now (that's the whole v3 migration). If you re-inline them you're undoing his explicit ask.
- Only set `pinned`/`updated`/`draft` when the user explicitly asks. Default to omitting them.
- For new posts, default `lang: 'both'` and write both files. Use a single `post.html` only if `lang` is `'zh'` or `'en'`.

## Things you can probably do without asking

- Add a new post (folder + 2 body files + manifest entry)
- Fix a typo or styling issue
- Rebalance whitespace
- Add a missing i18n string

## Things to confirm before doing

- Renaming a slug (breaks inbound links)
- Changing the manifest schema (touches every post)
- Adding new prose elements / styles to `.reader-body`
- Anything that touches `index.html`'s hero/nav/cat — those are the public face, treat as load-bearing
- Switching deployment targets, build tooling, or adding any kind of bundler — he chose "no build step" deliberately

## Final note

Louie communicates in a mix of Chinese and English, often switching mid-sentence. Match whichever language he's in. He's direct about corrections — "去掉" (remove), "不需要" (don't need), "不要泄露" (don't leak) — and he expects you to absorb the correction and move on, not over-apologize. When you screw up (and you will), say what changed, sync the file, and proceed.

Good luck.

