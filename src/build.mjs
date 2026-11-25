// Static site build — no dependencies.   Usage:  node src/build.mjs
// Writes English pages to the repo root and Arabic pages to /ar/.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { site } from './config.mjs';
import { ROOT, pages, outputFile, absolute, createContext, renderPage } from './layout.mjs';
import { phoenixData } from './phoenix/knowledge.mjs';

const modules = {
  home: await import('./pages/home.mjs'),
  about: await import('./pages/about.mjs'),
  practice: await import('./pages/practice.mjs'),
  help: await import('./pages/help.mjs'),
  insights: await import('./pages/insights.mjs'),
  article: await import('./pages/article.mjs'),
  contact: await import('./pages/contact.mjs'),
  notfound: await import('./pages/notfound.mjs'),
};

// Hash with normalised line endings so Windows (CRLF) and Unix (LF) checkouts build identically.
const hash = f => crypto.createHash('sha1').update(fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n')).digest('hex').slice(0, 8);
// Phoenix knowledge files are generated first so they are part of the asset version.
const written = [];
for (const lang of ['en', 'ar']) {
  const rel = `js/phoenix-data.${lang}.js`;
  fs.writeFileSync(path.join(ROOT, rel), phoenixData(lang));
  written.push(rel);
}
const version = hash('css/site.css') + hash('js/site.js').slice(0, 4) + hash('js/phoenix.js').slice(0, 2) + hash('js/phoenix-data.en.js').slice(0, 2);
const write = (rel, content) => {
  const out = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, content);
  return rel;
};

for (const lang of ['en', 'ar']) {
  for (const [key, mod] of Object.entries(modules)) {
    if (key === 'notfound' && lang === 'ar') continue; // hosts serve a single root 404.html
    const ctx = createContext(lang, key);
    ctx.version = version;
    let html = renderPage(ctx, mod.meta, mod.render(ctx));
    if (key === 'notfound' && site.url) html = html.replace('<head>', `<head>\n<base href="${site.url}/">`);
    written.push(write((lang === 'ar' ? 'ar/' : '') + outputFile(key), html));
  }
}

// Old *.html addresses keep working: each becomes a tiny redirect to its clean URL,
// carrying over any ?query (insights search) and #section.
const legacy = {
  'about.html': 'about', 'practice-area.html': 'practice', 'cases.html': 'help', 'attorney.html': 'help',
  'blog.html': 'insights', 'blog-single.html': 'article', 'contact.html': 'contact',
};
const redirect = (target, lang, canonical) => `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>Moved</title><meta name="robots" content="noindex"><link rel="canonical" href="${canonical || target}"><script>var t=${JSON.stringify(target)};if(location.protocol==='file:'&&t.slice(-1)==='/')t+='index.html';location.replace(t+location.search+location.hash)</script><meta http-equiv="refresh" content="0; url=${target}"></head><body><p><a href="${target}">This page has moved.</a></p></body></html>\n`;
for (const lang of ['en', 'ar']) {
  for (const [old, key] of Object.entries(legacy)) {
    written.push(write((lang === 'ar' ? 'ar/' : '') + old, redirect(pages[key], lang, absolute(lang, key))));
  }
}

written.push(write('site.webmanifest', JSON.stringify({
  name: 'Mohamy Plus', short_name: 'Mohamy Plus', lang: 'en', dir: 'ltr', start_url: './', display: 'standalone',
  background_color: '#0a0c0f', theme_color: '#0a0c0f',
  icons: [{ src: 'images/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: 'images/icon-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 2) + '\n'));

written.push(write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /src/\n${site.url ? `\nSitemap: ${site.url}/sitemap.xml\n` : ''}`));

if (site.url) {
  const urls = Object.keys(pages).filter(k => k !== 'notfound').map(k => {
    const en = absolute('en', k), ar = absolute('ar', k);
    const alt = `<xhtml:link rel="alternate" hreflang="en" href="${en}"/><xhtml:link rel="alternate" hreflang="ar" href="${ar}"/>`;
    return `<url><loc>${en}</loc>${alt}</url><url><loc>${ar}</loc>${alt}</url>`;
  });
  written.push(write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`));
} else if (fs.existsSync(path.join(ROOT, 'sitemap.xml'))) {
  fs.rmSync(path.join(ROOT, 'sitemap.xml'));
}

console.log(`Built ${written.length} files (asset version ${version}).`);
