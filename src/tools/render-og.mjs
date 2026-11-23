// Renders the social share images with a real browser (correct Arabic shaping).
// Usage: npx -y playwright@1.65.1 install chromium   (once)
//        node src/tools/render-og.mjs               (needs `npm i -D playwright` or a global install)
import { chromium } from 'playwright';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..', '..');
const template = pathToFileURL(path.join(root, 'src/tools/og-template.html')).href;
const variants = [
  { lang: 'en', out: 'images/og-image.jpg', name: 'Mohamy Plus', alt: 'محامي بلس', title: 'Legal counsel in Egypt, <em>with absolute clarity</em>', pill: 'Consultations by appointment' },
  { lang: 'ar', out: 'images/og-image-ar.jpg', name: 'محامي بلس', alt: 'Mohamy Plus', title: 'استشارات قانونية في مصر <em>بوضوح تام</em>', pill: 'الاستشارات بموعد مسبق' },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const v of variants) {
  await page.goto(template);
  await page.evaluate((v) => {
    document.documentElement.lang = v.lang;
    document.documentElement.dir = v.lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelector('[data-name]').textContent = v.name;
    document.querySelector('[data-alt]').textContent = v.alt;
    document.querySelector('[data-title]').innerHTML = v.title;
    document.querySelector('[data-pill]').textContent = v.pill;
  }, v);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, v.out), type: 'jpeg', quality: 88 });
  console.log('wrote', v.out);
}
await browser.close();
