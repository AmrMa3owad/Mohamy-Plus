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

## Asset tools (only needed when assets change)

```sh
python src/tools/optimize_images.py              # responsive WebP variants + manifest (Pillow)
python src/tools/make_sprite.py . images/icons.svg   # SVG icon sprite (fonttools, brotli)
node src/tools/render-og.mjs                     # social share images (playwright)
```

- **Photos.** Originals live in `images/*.jpg`. To add one, list it in `PHOTOS` inside `optimize_images.py`, then use `ctx.pic('name')` in a page.
- **Icons.** Icons come from Bootstrap Icons (MIT) and Font Awesome Free (CC BY 4.0). Their font sources are in `src/tools/icon-sources/`.
