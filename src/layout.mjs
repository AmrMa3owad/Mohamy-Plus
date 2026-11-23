import fs from 'node:fs';
import path from 'node:path';
import { site } from './config.mjs';
import { practiceAreas } from './data.mjs';

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..');

// Page registry: key -> output file name (same name in /ar/).
export const pages = {
  home: 'index.html',
  about: 'about.html',
  practice: 'practice-area.html',
  help: 'cases.html',
  insights: 'blog.html',
  article: 'blog-single.html',
  contact: 'contact.html',
  notfound: '404.html',
};

const nav = [
  ['home', { en: 'Home', ar: 'الرئيسية' }],
  ['about', { en: 'About', ar: 'من نحن' }],
  ['practice', { en: 'Practice Areas', ar: 'مجالات الممارسة' }],
  ['help', { en: 'How We Help', ar: 'كيف نساعدك' }],
  ['insights', { en: 'Insights', ar: 'رؤى قانونية' }],
  ['contact', { en: 'Contact', ar: 'تواصل معنا' }],
];

const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'images/opt/manifest.json'), 'utf8'));
const spriteSrc = fs.readFileSync(path.join(ROOT, 'images/icons.svg'), 'utf8');
const phoenixSvg = fs.readFileSync(path.join(ROOT, 'images/phoenix.svg'), 'utf8')
  .replace(/<!--[\s\S]*?-->/g, '').replace(/\s+role="img"|\s+aria-label="[^"]*"/g, '').replace('<svg ', '<svg aria-hidden="true" focusable="false" ').trim();
const symbols = Object.fromEntries([...spriteSrc.matchAll(/<symbol id="i-([^"]+)"[\s\S]*?<\/symbol>/g)].map(m => [m[1], m[0]]));

export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function createContext(lang, key) {
  const isAr = lang === 'ar';
  const base = isAr ? '../' : '';
  const usedIcons = new Set();
  const L = v => (v && typeof v === 'object' && 'en' in v ? (isAr ? v.ar : v.en) : v);
  const ctx = {
    lang, isAr, key, base, dir: isAr ? 'rtl' : 'ltr', L,
    t: (en, ar) => (isAr ? ar : en),
    href: (k, hash = '') => pages[k] + hash,
    asset: p => base + p,
    altHref: () => (isAr ? '../' : 'ar/') + (key === 'notfound' ? pages.home : pages[key]),
    wa: (text) => `https://wa.me/${site.whatsapp}${text ? '?text=' + encodeURIComponent(text) : ''}`,
    icon(id, cls = '') {
      if (!symbols[id]) throw new Error('Unknown icon: ' + id);
      usedIcons.add(id);
      return `<svg class="icon${cls ? ' ' + cls : ''}" aria-hidden="true" focusable="false"><use href="#i-${id}"></use></svg>`;
    },
    /** Responsive <picture>. sizes defaults to full width. */
    pic(name, { alt = '', sizes = '100vw', cls = '', eager = false, flip = false } = {}) {
      const m = manifest[name];
      if (!m) throw new Error('Missing image in manifest: ' + name);
      const srcset = m.widths.map(w => `${base}images/opt/${name}-${w}.webp ${w}w`).join(', ');
      return `<picture class="${cls}"><source type="image/webp" srcset="${srcset}" sizes="${sizes}"><img src="${base}images/opt/${name}.jpg" width="${m.w}" height="${m.h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async"${flip ? ' data-flip' : ''}></picture>`;
    },
    sprite() {
      return `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${[...usedIcons].map(i => symbols[i]).join('')}</svg>`;
    },
  };
  return ctx;
}

const absolute = (lang, file) => site.url ? `${site.url}/${lang === 'ar' ? 'ar/' : ''}${file === 'index.html' ? '' : file}` : '';

function head(ctx, meta) {
  const { L, asset, lang, key } = ctx;
  const title = L(meta.title);
  const description = L(meta.description);
  const file = pages[key];
  const enUrl = absolute('en', file), arUrl = absolute('ar', file);
  const selfUrl = lang === 'ar' ? arUrl : enUrl;
  const ogImage = site.url ? `${site.url}/images/og-image${lang === 'ar' ? '-ar' : ''}.jpg` : '';
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: L(site.name),
    alternateName: lang === 'ar' ? site.name.en : site.name.ar,
    description: L({ en: 'Legal counsel for individuals, families, entrepreneurs, investors, and businesses in Egypt.', ar: 'استشارات قانونية للأفراد والأسر ورواد الأعمال والمستثمرين والشركات في مصر.' }),
    telephone: site.phone,
    email: site.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG' },
    areaServed: { '@type': 'Country', name: 'Egypt' },
    knowsLanguage: ['ar', 'en'],
    knowsAbout: practiceAreas.map(p => p.title.en),
    sameAs: site.social.filter(s => s.id !== 'whatsapp').map(s => s.href),
    ...(site.url ? { url: site.url + '/', logo: site.url + '/images/icon-512.png', image: ogImage } : {}),
  };
  // Runs before first paint: theme, JS flag, and remembered language.
  const boot = `(function(){var d=document.documentElement,s=null;d.className+=' js';try{s=localStorage.getItem('mohamy-plus-theme')}catch(e){}d.setAttribute('data-theme',s==='light'||s==='dark'?s:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'));${key === 'notfound' ? '' : `try{var p=localStorage.getItem('mohamy-plus-language');if(p&&p!==d.lang&&(p==='ar'||p==='en')&&!/[?&]lang=/.test(location.search)){d.style.visibility='hidden';location.replace(${JSON.stringify(ctx.altHref())}+location.hash)}}catch(e){}`}})();`;
  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="color-scheme" content="dark light">
<meta name="theme-color" content="#0a0c0f" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#f6f2ea" media="(prefers-color-scheme: light)">
${meta.noindex ? '<meta name="robots" content="noindex, follow">\n' : ''}<script>${boot}</script>
<link rel="preload" href="${asset(lang === 'ar' ? 'fonts/plex-arabic/IBMPlexSansArabic-400.woff2' : 'fonts/creative/Inter-latin.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${asset(lang === 'ar' ? 'fonts/brand/ElMessiri-700.woff2' : 'fonts/brand/Cinzel-700.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset('css/site.css')}?v=${ctx.version}">
<link rel="icon" href="${asset('favicon.ico')}" sizes="48x48">
<link rel="icon" href="${asset('images/favicon-32.png')}" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="${asset('images/apple-touch-icon.png')}">
<link rel="manifest" href="${asset('site.webmanifest')}">
${site.url && !meta.noindex ? `<link rel="canonical" href="${selfUrl}">
<link rel="alternate" hreflang="en" href="${enUrl}">
<link rel="alternate" hreflang="ar" href="${arUrl}">
<link rel="alternate" hreflang="x-default" href="${enUrl}">
` : ''}<meta property="og:type" content="${meta.ogType || 'website'}">
<meta property="og:site_name" content="${esc(L(site.name))}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:locale" content="${lang === 'ar' ? 'ar_EG' : 'en_US'}">
<meta property="og:locale:alternate" content="${lang === 'ar' ? 'en_US' : 'ar_EG'}">
${selfUrl ? `<meta property="og:url" content="${selfUrl}">\n<meta property="og:image" content="${ogImage}">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n` : ''}<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(meta.jsonld ? [ld, meta.jsonld] : ld)}</script>
</head>`;
}

/** Brand lockup: logo + wordmark (last word in gold) + optional tagline. */
export function brandMark(ctx, { tagline = true, eager = false } = {}) {
  const { L, t, asset } = ctx;
  const words = L(site.name).split(' ');
  const last = words.pop();
  return `<img class="brand__logo" src="${asset('images/logo.webp')}" width="493" height="353" alt="" decoding="async"${eager ? '' : ' loading="lazy"'}>
      <span class="brand__text">
        <span class="brand__name">${words.join(' ')} <em>${last}</em></span>
        ${tagline ? `<span class="brand__tag">${t('Legal Counsel · Cairo', 'استشارات قانونية · القاهرة')}</span>` : ''}
      </span>`;
}

function topbar(ctx) {
  const { t, icon } = ctx;
  return `<aside class="topbar" aria-label="${t('Contact details', 'بيانات التواصل')}">
  <div class="container topbar__inner">
    <div class="topbar__info">
      <span class="status-pill"><span class="status-pill__dot" aria-hidden="true"></span>${t('Consultations by appointment', 'الاستشارات بموعد مسبق')}</span>
      <a class="topbar__link" href="tel:${site.phone}">${icon('phone')}<span dir="ltr">${site.phoneDisplay}</span></a>
      <a class="topbar__link" href="mailto:${site.email}">${icon('mail')}<span>${site.email}</span></a>
    </div>
    ${socialList(ctx, 'topbar__social')}
  </div>
</aside>`;
}

export function socialList(ctx, cls) {
  const { t, icon } = ctx;
  return `<ul class="social ${cls}" aria-label="${t('Mohamy Plus on social media', 'محامي بلس على وسائل التواصل')}">
${site.social.map(s => `      <li><a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}" title="${s.label}">${icon(s.id)}</a></li>`).join('\n')}
    </ul>`;
}

function header(ctx) {
  const { t, L, icon, key, asset, href, altHref, isAr } = ctx;
  const activeKey = key === 'article' ? 'insights' : key;
  return `<header class="site-header" id="site-header">
  <div class="container site-header__inner">
    <a class="brand" href="${href('home')}" aria-label="${t('Mohamy Plus — home', 'محامي بلس — الصفحة الرئيسية')}">
      ${brandMark(ctx, { eager: true })}
    </a>
    <nav class="primary-nav" id="primary-nav" aria-label="${t('Main', 'القائمة الرئيسية')}">
      <ul class="primary-nav__list">
${nav.map(([k, label]) => `        <li><a href="${href(k)}"${k === activeKey ? ' aria-current="page"' : ''}>${L(label)}</a></li>`).join('\n')}
      </ul>
      <div class="primary-nav__extra">
        <a class="btn btn--gold btn--block" href="${ctx.wa()}" target="_blank" rel="noopener">${icon('whatsapp')}<span>${t('Schedule Consultation', 'احجز استشارة')}</span></a>
        <a class="nav-contact" href="tel:${site.phone}">${icon('phone')}<span dir="ltr">${site.phoneDisplay}</span></a>
        <a class="nav-contact" href="mailto:${site.email}">${icon('mail')}<span>${site.email}</span></a>
      </div>
    </nav>
    <div class="site-header__tools">
      <a class="tool-btn lang-switch" href="${altHref()}" hreflang="${isAr ? 'en' : 'ar'}" lang="${isAr ? 'en' : 'ar'}" data-lang-switch="${isAr ? 'en' : 'ar'}" aria-label="${isAr ? 'View this page in English' : 'اعرض هذه الصفحة بالعربية'}">${icon('translate')}<span>${isAr ? 'English' : 'العربية'}</span></a>
      <button class="tool-btn theme-toggle" type="button" data-theme-toggle aria-label="${t('Switch theme', 'تبديل المظهر')}">
        ${icon('sun', 'theme-toggle__sun')}${icon('moon', 'theme-toggle__moon')}
      </button>
      <button class="tool-btn menu-toggle" type="button" aria-controls="primary-nav" aria-expanded="false" data-menu-toggle>
        ${icon('menu', 'menu-toggle__open')}${icon('close', 'menu-toggle__close')}<span class="visually-hidden">${t('Menu', 'القائمة')}</span>
      </button>
    </div>
  </div>
</header>`;
}

function footer(ctx) {
  const { t, L, icon, href, asset } = ctx;
  const year = 2026;
  const footerAreas = ['corporate', 'mergers-acquisitions', 'capital-markets', 'arbitration', 'criminal'];
  return `<footer class="site-footer">
  <div class="site-footer__glow" aria-hidden="true"></div>
  <div class="container">
    <div class="cta-card reveal">
      <div class="cta-card__body">
        <span class="kicker kicker--live"><span class="kicker__dot" aria-hidden="true"></span>${t('Legal assistance starts here', 'المساعدة القانونية تبدأ من هنا')}</span>
        <h2 class="cta-card__title">${t('Ready to Take the Next Step?', 'هل أنت مستعد للخطوة التالية؟')}</h2>
        <p class="cta-card__text">${t("Whether you're seeking legal advice, representation, or business legal services, Mohamy Plus is here to help you explore the appropriate next steps.", 'سواء كنت تبحث عن مشورة قانونية أو تمثيل قانوني أو خدمات قانونية للأعمال، فإن محامي بلس هنا ليساعدك على استكشاف الخطوات المناسبة.')}</p>
      </div>
      <a class="btn btn--gold btn--lg" href="${ctx.wa()}" target="_blank" rel="noopener">${icon('whatsapp')}<span>${t('Contact Us via WhatsApp', 'تواصل معنا عبر واتساب')}</span>${icon('arrow-up-right', 'icon--dir')}</a>
    </div>

    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="${href('home')}">
          ${brandMark(ctx)}
        </a>
        <p>${t('Professional legal guidance and tailored legal services for individuals, families, entrepreneurs, and businesses across Egypt.', 'إرشاد قانوني مهني وخدمات قانونية مصممة خصيصًا للأفراد والأسر ورواد الأعمال والشركات في جميع أنحاء مصر.')}</p>
        ${socialList(ctx, 'social--footer')}
      </div>
      <nav class="footer-col" aria-label="${t('Footer', 'روابط التذييل')}">
        <h2 class="footer-col__title">${t('Navigation', 'التنقل')}</h2>
        <ul>
          <li><a href="${href('home')}">${t('Home', 'الرئيسية')}</a></li>
          <li><a href="${href('about')}">${t('About Us', 'من نحن')}</a></li>
          <li><a href="${href('practice')}">${t('Practice Areas', 'مجالات الممارسة')}</a></li>
          <li><a href="${href('help')}">${t('How We Help', 'كيف نساعدك')}</a></li>
          <li><a href="${href('insights')}">${t('Legal Insights', 'رؤى قانونية')}</a></li>
          <li><a href="${href('contact')}">${t('Contact Us', 'تواصل معنا')}</a></li>
        </ul>
      </nav>
      <div class="footer-col">
        <h2 class="footer-col__title">${t('Expertise', 'الخبرات')}</h2>
        <ul>
${footerAreas.map(id => { const a = practiceAreas.find(p => p.id === id); return `          <li><a href="${href('practice', '#' + id)}">${L(a.title)}</a></li>`; }).join('\n')}
        </ul>
      </div>
      <div class="footer-col">
        <h2 class="footer-col__title">${t('Contact', 'التواصل')}</h2>
        <ul class="footer-contact">
          <li><a href="tel:${site.phone}">${icon('phone')}<span><small>${t('Phone', 'الهاتف')}</small><span dir="ltr">${site.phoneDisplay}</span></span></a></li>
          <li><a href="mailto:${site.email}">${icon('mail')}<span><small>${t('Email', 'البريد الإلكتروني')}</small><span>${site.email}</span></span></a></li>
          <li><span class="footer-contact__static">${icon('pin')}<span><small>${t('Location', 'الموقع')}</small><span>${t('Cairo, Egypt · Cross-border matters', 'القاهرة، مصر · مسائل عابرة للحدود')}</span></span></span></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container footer-bottom__inner">
      <p>© <span data-year>${year}</span> ${L(site.name)}. ${t('All Rights Reserved.', 'جميع الحقوق محفوظة.')}</p>
      <p class="signature"><span>${t('Designed & Developed by', 'تصميم وتطوير')}</span><img src="${asset('images/amr-maowad-signature.webp')}" width="400" height="163" alt="Amr Maowad" loading="lazy" decoding="async"></p>
    </div>
  </div>
</footer>`;
}

/** Inner-page hero with breadcrumb. */
export function pageHero(ctx, { title, lead, crumbs = [], image = 'bg_5' }) {
  const { t, L, href, pic, icon } = ctx;
  return `<section class="page-hero">
  ${pic(image, { cls: 'page-hero__media', eager: true })}
  <div class="page-hero__shade" aria-hidden="true"></div>
  <div class="container page-hero__content">
    <nav class="breadcrumb" aria-label="${t('Breadcrumb', 'مسار التنقل')}">
      <ol>
        <li><a href="${href('home')}">${t('Home', 'الرئيسية')}</a></li>
${crumbs.map((c, i) => `        <li>${icon('chevron', 'icon--dir')}${i === crumbs.length - 1 ? `<span aria-current="page">${L(c.label)}</span>` : `<a href="${href(c.key)}">${L(c.label)}</a>`}</li>`).join('\n')}
      </ol>
    </nav>
    <h1 class="page-hero__title">${L(title)}</h1>
    ${lead ? `<p class="page-hero__lead">${L(lead)}</p>` : ''}
  </div>
</section>`;
}

export function sectionHead(ctx, { kicker, title, lead, align = 'center', id }) {
  const { L } = ctx;
  return `<header class="section-head section-head--${align} reveal">
  ${kicker ? `<span class="kicker"><span class="kicker__dot" aria-hidden="true"></span>${L(kicker)}</span>` : ''}
  <h2 class="section-title"${id ? ` id="${id}"` : ''}>${L(title)}</h2>
  ${lead ? `<p class="section-lead">${L(lead)}</p>` : ''}
</header>`;
}

/** Phoenix assistant launcher. The panel itself is built by js/phoenix.js on first open. */
function phoenix(ctx) {
  const { t, asset, lang } = ctx;
  return `<div class="phx-root" data-phoenix data-wa="${site.whatsapp}" data-src="${asset('js/phoenix.js')}?v=${ctx.version}" data-data="${asset(`js/phoenix-data.${lang}.js`)}?v=${ctx.version}">
  <div class="phx-teaser" hidden>
    <p>${t('Hi, I’m <strong>Phoenix</strong>. Need help finding your way or booking a consultation?', 'مرحبًا، أنا <strong>فينيكس</strong>. هل تحتاج إلى مساعدة في التنقل أو حجز استشارة؟')}</p>
    <button type="button" class="phx-teaser__close" data-phx-dismiss aria-label="${t('Dismiss', 'إخفاء')}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
  </div>
  <button class="phx-launcher" type="button" aria-expanded="false" aria-controls="phx-panel" aria-label="${t('Open the Phoenix assistant', 'افتح مساعد فينيكس')}">
    <span class="phx-launcher__ring" aria-hidden="true"></span>
    <span class="phx-mark">${phoenixSvg}</span>
    <span class="phx-launcher__label" aria-hidden="true">${t('Ask Phoenix', 'اسأل فينيكس')}</span>
  </button>
</div>`;
}

export function renderPage(ctx, meta, main) {
  const { lang, dir, t, asset } = ctx;
  const body = `${topbar(ctx)}
${header(ctx)}
<main id="main" tabindex="-1">
${main}
</main>
${footer(ctx)}
${phoenix(ctx)}
<script src="${asset('js/site.js')}?v=${ctx.version}" defer></script>`;
  return `<!doctype html>
<html lang="${lang}" dir="${dir}" data-page="${ctx.key}">
${head(ctx, meta)}
<body>
<a class="skip-link" href="#main">${t('Skip to content', 'انتقل إلى المحتوى')}</a>
${ctx.sprite()}
${body}
</body>
</html>
`;
}
