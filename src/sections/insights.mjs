import { article, readingMinutes } from '../content/article-mna.mjs';

const minutes = (ctx) => ctx.t(`${readingMinutes('en')} min read`, `${readingMinutes('ar')} دقائق قراءة`);

/** Article card. `featured` renders the wide horizontal variant. */
export function articleCard(ctx, { featured = false } = {}) {
  const { L, icon, pic, t } = ctx;
  return `<article class="article-card${featured ? ' article-card--featured' : ''}" data-search-item>
  <div class="article-card__media">
    ${pic(article.image, { alt: '', sizes: featured ? '(min-width: 992px) 55vw, 100vw' : '(min-width: 992px) 33vw, 100vw' })}
    <span class="badge">${L(article.category)}</span>
  </div>
  <div class="article-card__body">
    <p class="article-card__meta"><span>${icon('clock')}${minutes(ctx)}</span><span>${icon('doc')}${t('Practical guide', 'دليل عملي')}</span></p>
    <h3 class="article-card__title"><a href="${ctx.href('article')}">${L(article.title)}</a></h3>
    <p class="article-card__summary">${L(featured ? article.subtitle : article.summary)}</p>
    <span class="link-arrow" aria-hidden="true">${t('Read Analysis', 'اقرأ التحليل')}${icon('arrow-right', 'icon--dir')}</span>
  </div>
</article>`;
}

export function featuredArticle(ctx) {
  const { t, icon, href } = ctx;
  return `<div class="insights-grid">
  <div class="reveal">${articleCard(ctx, { featured: true })}</div>
  <div class="ask-card reveal" style="--i:1">
    <span class="icon-badge">${icon('chat')}</span>
    <h3>${t('Have a question about your situation?', 'لديك سؤال حول وضعك؟')}</h3>
    <p>${t('Our briefings offer general information. For guidance on your own matter, share a short outline with the team and we will help identify the right next step.', 'تقدّم نشراتنا معلومات عامة. وللحصول على إرشاد بشأن مسألتك، شارك الفريق ملخصًا قصيرًا وسنساعدك على تحديد الخطوة المناسبة.')}</p>
    <a class="btn btn--outline" href="${href('home', '#consultation')}"><span>${t('Request a consultation', 'اطلب استشارة')}</span>${icon('arrow-right', 'icon--dir')}</a>
  </div>
</div>`;
}
