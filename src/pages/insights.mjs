import { practiceAreas } from '../data.mjs';
import { pageHero } from '../layout.mjs';
import { articleCard } from '../sections/insights.mjs';

export const meta = {
  title: { en: 'Legal Insights | Mohamy Plus', ar: 'رؤى قانونية | محامي بلس' },
  description: {
    en: "Legal briefings and practical guides from Mohamy Plus on the issues shaping Egypt's legal and business landscape.",
    ar: 'نشرات قانونية وأدلة عملية من محامي بلس حول القضايا التي تشكّل المشهد القانوني ومشهد الأعمال في مصر.',
  },
};

export function render(ctx) {
  const { t, L, icon, href } = ctx;
  return `
${pageHero(ctx, { title: { en: 'Legal Insights', ar: 'رؤى قانونية' }, lead: { en: "Explore legal developments, regulatory updates, and informed perspectives on the issues shaping Egypt's legal and business landscape.", ar: 'استكشف التطورات القانونية والتحديثات التنظيمية والرؤى المستنيرة حول القضايا التي تشكّل المشهد القانوني ومشهد الأعمال في مصر.' }, crumbs: [{ key: 'insights', label: { en: 'Insights', ar: 'رؤى قانونية' } }], image: 'image_1' })}

<div class="section">
  <div class="container blog-layout">
    <div>
      <h2 class="visually-hidden" id="briefings-title">${t('Briefings', 'النشرات')}</h2>
      <p class="search-status" data-search-status aria-live="polite" data-found="${t('{n} result(s) for “{q}”.', 'نتائج البحث عن «{q}»: {n}')}" data-none="${t('No briefings matched “{q}”.', 'لا توجد نشرات تطابق «{q}».')}"></p>
      <div class="blog-list" data-search-list>
        <div class="reveal">${articleCard(ctx, { featured: true })}</div>
      </div>
    </div>
    <aside class="sidebar">
      ${searchForm(ctx)}
      <div class="side-card reveal">
        <h2 class="side-card__title">${t('Practice areas', 'مجالات الممارسة')}</h2>
        <ul class="side-links">
${practiceAreas.map(a => `          <li><a href="${href('practice', '#' + a.id)}">${icon(a.icon)}<span>${L(a.title)}</span></a></li>`).join('\n')}
        </ul>
      </div>
      <div class="side-card side-card--accent reveal">
        <h2 class="side-card__title">${t('Need legal guidance?', 'تحتاج إلى إرشاد قانوني؟')}</h2>
        <p>${t('Contact the team to discuss your matter and the right next step.', 'تواصل مع الفريق لمناقشة مسألتك والخطوة المناسبة.')}</p>
        <a class="btn btn--gold btn--block" href="${href('contact')}"><span>${t('Contact Mohamy Plus', 'تواصل مع محامي بلس')}</span></a>
      </div>
    </aside>
  </div>
</div>
`;
}

export function searchForm(ctx) {
  const { t, icon, href } = ctx;
  return `<form class="side-card search-box reveal" role="search" action="${href('insights')}" method="get">
        <label class="side-card__title" for="search-q">${t('Search insights', 'ابحث في الرؤى')}</label>
        <div class="search-box__field">
          <input id="search-q" name="q" type="search" placeholder="${t('e.g. mergers, arbitration', 'مثال: الاندماج، التحكيم')}" autocomplete="off">
          <button type="submit" aria-label="${t('Search', 'بحث')}">${icon('search')}</button>
        </div>
      </form>`;
}
