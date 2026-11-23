import { practiceAreas } from '../data.mjs';
import { pageHero, sectionHead } from '../layout.mjs';

export const meta = {
  title: { en: 'Legal Practice Areas | Mohamy Plus', ar: 'مجالات الممارسة القانونية | محامي بلس' },
  description: {
    en: 'Corporate, family, criminal, real estate, employment, civil litigation, capital markets, M&A, and arbitration — the legal practice areas supported by Mohamy Plus in Egypt.',
    ar: 'الشركات والأسرة والقضايا الجنائية والعقارات والعمل والتقاضي المدني وأسواق المال والاندماج والاستحواذ والتحكيم — مجالات الممارسة لدى محامي بلس في مصر.',
  },
};

export function render(ctx) {
  const { t, L, icon, pic, href } = ctx;
  return `
${pageHero(ctx, { title: { en: 'Practice Areas', ar: 'مجالات الممارسة' }, lead: { en: 'Comprehensive legal services tailored to the needs of individuals, families, and businesses.', ar: 'خدمات قانونية شاملة مصممة لاحتياجات الأفراد والأسر والشركات.' }, crumbs: [{ key: 'practice', label: { en: 'Practice Areas', ar: 'مجالات الممارسة' } }] })}

<section class="section" aria-labelledby="areas-index-title">
  <div class="container">
    ${sectionHead(ctx, { kicker: { en: 'Our Expertise', ar: 'خبراتنا' }, title: { en: 'Nine areas, <em>one standard of care</em>', ar: 'تسعة مجالات <em>ومعيار واحد للعناية</em>' }, id: 'areas-index-title' })}
    <nav class="jump-nav reveal" aria-label="${t('Jump to a practice area', 'انتقل إلى مجال ممارسة')}">
      <ul>
${practiceAreas.map(a => `        <li><a href="#${a.id}">${icon(a.icon)}${L(a.title)}</a></li>`).join('\n')}
      </ul>
    </nav>
    <div class="area-detail-list">
${practiceAreas.map((a, i) => `      <article class="area-detail reveal" id="${a.id}" aria-labelledby="${a.id}-title">
        <div class="area-detail__media">${pic(a.image, { alt: '', sizes: '(min-width: 992px) 38vw, 100vw' })}<span class="area-detail__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span></div>
        <div class="area-detail__body">
          <span class="icon-badge">${icon(a.icon)}</span>
          <h2 id="${a.id}-title">${L(a.title)}</h2>
          <p>${L(a.short)}</p>
          <h3 class="area-detail__sub">${t('Matters we support', 'المسائل التي ندعمها')}</h3>
          <ul class="check-list">
${a.matters.map(m => `            <li>${icon('check-circle')}${L(m)}</li>`).join('\n')}
          </ul>
          <a class="link-arrow" href="${href('home', '#consultation')}">${t('Discuss a matter', 'ناقش مسألتك')}${icon('arrow-right', 'icon--dir')}</a>
        </div>
      </article>`).join('\n')}
    </div>
  </div>
</section>

<section class="section section--alt" aria-labelledby="not-listed-title">
  <div class="container narrow center">
    <span class="icon-badge icon-badge--lg reveal">${icon('question')}</span>
    <h2 class="section-title reveal" id="not-listed-title">${t('Not sure which area applies?', 'لست متأكدًا من المجال المناسب؟')}</h2>
    <p class="section-lead reveal">${t("No problem. Tell us briefly what you need assistance with, and we'll help identify the appropriate next step.", 'لا مشكلة. أخبرنا باختصار بما تحتاج إليه، وسنساعدك على تحديد الخطوة المناسبة.')}</p>
    <div class="button-row button-row--center reveal">
      <a class="btn btn--gold" href="${ctx.wa()}" target="_blank" rel="noopener">${icon('whatsapp')}<span>${t('Message us on WhatsApp', 'راسلنا عبر واتساب')}</span></a>
      <a class="btn btn--outline" href="${href('contact')}"><span>${t('Other ways to reach us', 'طرق تواصل أخرى')}</span></a>
    </div>
  </div>
</section>
`;
}
