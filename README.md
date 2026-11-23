# Mohamy Plus — website

Bilingual (English / Arabic) static website for Mohamy Plus, a legal practice in Cairo.
Plain HTML, one stylesheet, one script. No frameworks and no runtime dependencies. Any static host works (GitHub Pages, Netlify, Cloudflare Pages, S3…).

| | |
|---|---|
| Pages | 7 English pages at the root, 7 Arabic pages in `/ar/`, plus `404.html` |
| Themes | Dark and light. Follows the visitor's system setting until they choose one; the choice is remembered. |
| Languages | Real Arabic pages (`lang="ar" dir="rtl"`) rendered at build time, so search engines can index them. The language switch is remembered between visits. |
| Forms | The consultation wizard and contact form open WhatsApp with a pre-written draft, in the page's language. Nothing is sent to a server. |

## Editing content

**Never edit the generated `.html` files directly**: they are rebuilt from `src/`.

| What | Where |
|---|---|
| Phone, email, WhatsApp, social links, domain | `src/config.mjs` |
| Practice areas, intro cards, pillars, goals, process steps | `src/data.mjs` |
| Page copy | `src/pages/*.mjs` |
| The M&A article | `src/content/article-mna.mjs` |
| Header, footer, `<head>`, SEO tags | `src/layout.mjs` |
| Consultation wizard | `src/sections/intake.mjs` |
| Paused client-logo / testimonial sections | `src/sections/paused.mjs` |

Every piece of text is written as `{ en: '…', ar: '…' }` (or `t('English', 'العربية')`), so both languages always stay in step.

Then rebuild (Node 18+):

```sh
node src/build.mjs
```

## Page addresses

Each page is a folder with an `index.html`, so addresses have no `.html`:

| Page | English | Arabic |
|---|---|---|
| Home | `/` | `/ar/` |
| About | `/about/` | `/ar/about/` |
| Practice areas | `/practice-areas/` | `/ar/practice-areas/` |
| How we help | `/how-we-help/` | `/ar/how-we-help/` |
| Insights | `/insights/` | `/ar/insights/` |
| M&A article | `/insights/mergers-demergers-acquisitions/` | `/ar/insights/mergers-demergers-acquisitions/` |
| Contact | `/contact/` | `/ar/contact/` |

- **Works everywhere:** this needs no server rules, so it works on any static host.
- **Old addresses still work:** links to `about.html`, `blog.html?q=…`, `practice-area.html#family` and the other old `.html` pages redirect automatically, keeping any search terms and `#section`.
- **Adding or renaming a page:** change the `pages` table in `src/layout.mjs`. Every link, the language switch, Phoenix and the sitemap follow it.
- **Previewing locally:** you can double-click `index.html` and browse normally. When a page is opened from disk (`file://`), the site sends folder links to their `index.html` automatically, so the address bar shows `…/about/index.html` there. To see the clean addresses exactly as on the live site, run `python -m http.server` in this folder and open `http://localhost:8000`.

## Before going live

1. **Set the domain.** Put it in `site.url` in `src/config.mjs`, for example `https://mohamyplus.com`, then rebuild. This adds:
   - canonical URLs and `hreflang` alternates;
   - absolute Open Graph URLs and share images;
   - `sitemap.xml`, also referenced from `robots.txt`.
2. **Paused sections.** Client logos and testimonials are switched off in `src/config.mjs`. Turn them on only once there is real, client-approved content with written permission to publish.

## Design system

`css/site.css` is organised as follows:
- **Colour tokens.** All colours are defined as tokens at the top of the file. `[data-theme="light"]` overrides the dark defaults, and both sets meet WCAG AA contrast.
- **RTL.** Layout uses CSS logical properties such as `margin-inline-start` and `inset-inline-end`, so Arabic mirrors automatically. Directional icons, like arrows, flip with `.icon--dir`.
- **Fixed-dark areas.** Photo areas (`.hero`, `.page-hero`, image tiles) always use the dark tokens so their text stays readable.
- **Fonts.** Inter for Latin text and IBM Plex Sans Arabic for Arabic. The brand wordmark uses Cinzel (EN) and El Messiri (AR), subset to ~10 KB each in `fonts/brand/`. All are self-hosted and licensed under the SIL Open Font License.
- **Scan effect.** The about photos (`.scan-media`) wipe open on scroll with a gold beam, which then keeps sweeping. With reduced motion turned on, the photo simply appears.

`js/site.js` contains, without dependencies:
- theme switching and language memory;
- the accessible mobile menu, which traps focus and closes on Esc;
- scroll reveal, which respects `prefers-reduced-motion`;
- the intake wizard and contact form;
- insights search;
- the particles and tilt effects, which pause off-screen and run only for mouse users;
- the article's table of contents, reading progress bar and share links.

## Phoenix (فينيكس) — the site assistant

Phoenix is the assistant in the bottom corner of every page. It's rule-based and private: there's no AI service, no server and no data storage. Its code downloads only when a visitor opens it.

- **What it does:** it answers common questions in Arabic and English (including Egyptian phrasing like «بكام» and «فين»), takes visitors to pages and practice areas, and guides them through a consultation request.
- **How requests are sent:** it opens WhatsApp with a ready-made draft. The visitor reviews it and presses Send there; nothing is sent automatically.
- **Guardrails:**
  - It never gives legal advice. Questions like "will I win?" get a fixed redirect to the team.
  - It never quotes fees, hours or outcomes.
  - It reminds visitors not to share sensitive details.
- **Editing Phoenix:**
  - Everything it says lives in `src/phoenix/knowledge.mjs`: replies, buttons, keywords and the booking questions. The practice-area answers come from `src/data.mjs`, so they always match the site.
  - Rebuilding generates `js/phoenix-data.en.js` and `js/phoenix-data.ar.js`. Don't edit those by hand.
  - The engine is in `js/phoenix.js`, the logo in `images/phoenix.svg`, and the styles in the "Phoenix" section of `css/site.css`.
- **Adding a topic:** add an entry to `intents` with its keywords in both languages, a `reply`, and any `buttons`.

## Asset tools (only needed when assets change)

```sh
python src/tools/optimize_images.py              # responsive WebP variants + manifest (Pillow)
python src/tools/make_sprite.py . images/icons.svg   # SVG icon sprite (fonttools, brotli)
node src/tools/render-og.mjs                     # social share images (playwright)
```

- **Photos.** Originals live in `images/*.jpg`. To add one, list it in `PHOTOS` inside `optimize_images.py`, then use `ctx.pic('name')` in a page.
- **Icons.** Icons come from Bootstrap Icons (MIT) and Font Awesome Free (CC BY 4.0). Their font sources are in `src/tools/icon-sources/`.
