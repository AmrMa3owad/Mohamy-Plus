import { site } from '../config.mjs';
import { article, readingMinutes } from '../content/article-mna.mjs';
import { esc } from '../layout.mjs';
import { searchForm } from './insights.mjs';

export const meta = {
  title: { en: 'Mergers, Demergers & Acquisitions under Egyptian Law | Mohamy Plus', ar: 'الاندماج والتقسيم والاستحواذ في القانون المصري | محامي بلس' },
  description: {
    en: 'A practical overview of mergers, demergers, acquisitions, and the merger-control regime under Egyptian law.',
    ar: 'نظرة عملية على الاندماج والتقسيم والاستحواذ ونظام الرقابة المسبقة على التركزات الاقتصادية في القانون المصري.',
  },
  ogType: 'article',
  jsonld: {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: article.title.en, inLanguage: ['en', 'ar'],
    author: { '@type': 'Organization', name: 'Mohamy Plus' },
    publisher: { '@type': 'Organization', name: 'Mohamy Plus' },
    about: ['Mergers', 'Demergers', 'Acquisitions', 'Egyptian Competition Law'],
  },
};

function block(ctx, b) {
  const { L, icon } = ctx;
  if (b.h2) return `<h2 id="${b.id}">${L(b.h2)}</h2>`;
  if (b.p) return `<p>${L(b.p)}</p>`;
  if (b.note) return `<div class="callout" role="note">${icon('bookmark')}<p>${L(b.note)}</p></div>`;
  if (b.dl) return `<dl class="term-list">${b.dl.map(([term, text]) => `<div><dt>${L(term)}</dt><dd>${L(text)}</dd></div>`).join('')}</dl>`;
  return '';
}

export function render(ctx) {
  const { t, L, icon, pic, href, lang } = ctx;
  const toc = article.blocks.filter(b => b.h2);
  const shareText = encodeURIComponent(L(article.title));
  return `
<div class="read-progress" aria-hidden="true"><span data-read-progress></span></div>
<section class="page-hero page-hero--article">
  ${pic(article.image, { cls: 'page-hero__media', eager: true })}
  <div class="page-hero__shade" aria-hidden="true"></div>
  <div class="container page-hero__content">
    <nav class="breadcrumb" aria-label="${t('Breadcrumb', 'مسار التنقل')}">
      <ol>
        <li><a href="${href('home')}">${t('Home', 'الرئيسية')}</a></li>
        <li>${icon('chevron', 'icon--dir')}<a href="${href('insights')}">${t('Insights', 'رؤى قانونية')}</a></li>
        <li>${icon('chevron', 'icon--dir')}<span aria-current="page">${L(article.category)}</span></li>
      </ol>
    </nav>
    <span class="badge">${L(article.category)}</span>
    <h1 class="page-hero__title">${L(article.title)}</h1>
    <p class="page-hero__lead">${L(article.subtitle)}</p>
    <p class="article-meta">${icon('clock')}${t(`${readingMinutes('en')} min read`, `${readingMinutes('ar')} دقائق قراءة`)}<span aria-hidden="true">·</span>${t('By the Mohamy Plus team', 'بقلم فريق محامي بلس')}</p>
  </div>
</section>

<div class="section">
  <div class="container article-layout">
    <article class="prose prose--article" aria-labelledby="article-title-hidden">
      <h2 class="visually-hidden" id="article-title-hidden">${L(article.title)}</h2>
      ${article.blocks.map(b => block(ctx, b)).join('\n      ')}
      <div class="disclaimer" role="note">${icon('shield-check')}<p><strong>${t('General information, not legal advice.', 'معلومات عامة وليست مشورة قانونية.')}</strong> ${t('This overview is general information. Consult qualified Egyptian counsel about your facts and the current law before acting.', 'هذه النظرة العامة معلومات عامة؛ فاستشر محاميًا مصريًا مؤهلًا بشأن وقائعك والقانون الساري قبل اتخاذ أي إجراء.')}</p></div>
      <section class="sources" aria-labelledby="sources-title">
        <h2 id="sources-title">${t('Official sources', 'المصادر الرسمية')}</h2>
        <ul>
${article.sources.map(s => `          <li><a href="${s.href}" target="_blank" rel="noopener">${L(s.label)}${icon('external')}</a></li>`).join('\n')}
        </ul>
      </section>
      <ul class="tag-list" aria-label="${t('Topics', 'الموضوعات')}">
${article.tags.map(tag => `        <li>${L(tag)}</li>`).join('\n')}
      </ul>
    </article>

    <aside class="sidebar sidebar--sticky">
      <nav class="side-card toc" aria-labelledby="toc-title">
        <h2 class="side-card__title" id="toc-title">${t('On this page', 'في هذه الصفحة')}</h2>
        <ol>
${toc.map(b => `          <li><a href="#${b.id}" data-toc-link>${L(b.h2)}</a></li>`).join('\n')}
        </ol>
      </nav>
      <div class="side-card">
        <h2 class="side-card__title">${t('Share', 'مشاركة')}</h2>
        <div class="share">
          <a class="tool-btn" data-share="whatsapp" href="https://wa.me/?text=${shareText}" target="_blank" rel="noopener" aria-label="${t('Share on WhatsApp', 'شارك عبر واتساب')}">${icon('whatsapp')}</a>
          <a class="tool-btn" data-share="linkedin" href="https://www.linkedin.com/sharing/share-offsite/" target="_blank" rel="noopener" aria-label="${t('Share on LinkedIn', 'شارك عبر لينكدإن')}">${icon('linkedin')}</a>
          <a class="tool-btn" data-share="facebook" href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener" aria-label="${t('Share on Facebook', 'شارك عبر فيسبوك')}">${icon('facebook')}</a>
          <button class="tool-btn share__copy" type="button" data-copy-link data-copied="${t('Link copied', 'تم نسخ الرابط')}" aria-label="${t('Copy link', 'نسخ الرابط')}">${icon('doc')}<span class="share__copied" role="status"></span></button>
        </div>
      </div>
      <div class="side-card side-card--accent">
        <h2 class="side-card__title">${t('Need legal guidance?', 'تحتاج إلى إرشاد قانوني؟')}</h2>
        <p>${t('Contact the team to discuss your matter and the right next step.', 'تواصل مع الفريق لمناقشة مسألتك والخطوة المناسبة.')}</p>
        <a class="btn btn--gold btn--block" href="${ctx.wa(L({ en: `Hello Mohamy Plus, I read “${article.title.en}” and would like to discuss a matter.`, ar: `مرحبًا محامي بلس، قرأت «${article.title.ar}» وأود مناقشة مسألة.` }))}" target="_blank" rel="noopener">${icon('whatsapp')}<span>${t('Contact Mohamy Plus', 'تواصل مع محامي بلس')}</span></a>
      </div>
      ${searchForm(ctx)}
    </aside>
  </div>
</div>
`;
}
