import { processSteps, audiences, practiceAreas } from '../data.mjs';
import { pageHero, sectionHead } from '../layout.mjs';

export const meta = {
  title: { en: 'How We Can Help | Mohamy Plus', ar: 'كيف نساعدك | محامي بلس' },
  description: {
    en: 'How Mohamy Plus works with you — from your first question to clear next steps — and the legal matters the team supports in Egypt.',
    ar: 'كيف يعمل معك فريق محامي بلس، من سؤالك الأول إلى خطوات تالية واضحة، والمسائل القانونية التي يدعمها في مصر.',
  },
};

export function render(ctx) {
  const { t, L, icon, pic, href } = ctx;
  return `
${pageHero(ctx, { title: { en: 'How We Can Help', ar: 'كيف نساعدك' }, lead: { en: 'A clear path from your first question to the next step.', ar: 'طريق واضح من سؤالك الأول إلى الخطوة التالية.' }, crumbs: [{ key: 'help', label: { en: 'How We Help', ar: 'كيف نساعدك' } }], image: 'case-2' })}

<section class="section" aria-labelledby="process-title">
  <div class="container">
    ${sectionHead(ctx, { kicker: { en: 'Our Legal Approach', ar: 'منهجنا القانوني' }, title: { en: 'From first question <em>to next step</em>', ar: 'من السؤال الأول <em>إلى الخطوة التالية</em>' }, lead: { en: 'Share a short outline of your matter. The team can confirm whether it is within scope, explain the next steps, and arrange a consultation.', ar: 'شارك ملخصًا قصيرًا لمسألتك، وسيؤكد الفريق ما إذا كانت ضمن نطاق عمله، ويشرح الخطوات التالية، ويرتب موعد الاستشارة.' }, id: 'process-title' })}
    <ol class="process">
${processSteps.map((s, i) => `      <li class="process__step reveal" style="--i:${i}">
        <span class="process__marker" aria-hidden="true"><span>${i + 1}</span></span>
        <span class="icon-badge icon-badge--sm">${icon(s.icon)}</span>
        <h3>${L(s.title)}</h3>
        <p>${L(s.text)}</p>
      </li>`).join('\n')}
    </ol>
  </div>
</section>

<section class="section section--alt" aria-labelledby="matters-title">
  <div class="container">
    ${sectionHead(ctx, { kicker: { en: 'Matters we support', ar: 'المسائل التي ندعمها' }, title: { en: 'Legal support across <em>nine practice areas</em>', ar: 'دعم قانوني عبر <em>تسعة مجالات</em>' }, id: 'matters-title' })}
    <ul class="tile-grid">
${practiceAreas.map((a, i) => `      <li class="reveal" style="--i:${i % 3}">
        <a class="tile" href="${href('practice', '#' + a.id)}">
          ${pic(a.image, { alt: '', sizes: '(min-width: 992px) 33vw, (min-width: 640px) 50vw, 100vw', cls: 'tile__media' })}
          <span class="tile__body"><span class="icon-badge icon-badge--sm">${icon(a.icon)}</span><span class="tile__title">${L(a.title)}</span><span class="tile__text">${L(a.short)}</span></span>
        </a>
      </li>`).join('\n')}
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="who-title">
  <div class="container">
    ${sectionHead(ctx, { kicker: { en: 'Who we help', ar: 'من نساعد' }, title: { en: 'Guidance for people <em>and organisations</em>', ar: 'إرشاد للأفراد <em>والمؤسسات</em>' }, id: 'who-title' })}
    <ul class="card-grid card-grid--5">
${audiences.map((a, i) => `      <li class="info-card info-card--compact reveal" style="--i:${i}"><span class="icon-badge icon-badge--sm">${icon(a.icon)}</span><h3>${L(a.title)}</h3><p>${L(a.text)}</p></li>`).join('\n')}
    </ul>
  </div>
</section>

<section class="section section--alt" aria-labelledby="privacy-title">
  <div class="container narrow center">
    <span class="icon-badge icon-badge--lg reveal">${icon('shield-lock')}</span>
    <h2 class="section-title reveal" id="privacy-title">${t('Respect for client privacy', 'احترام خصوصية العميل')}</h2>
    <p class="section-lead reveal">${t('For an initial inquiry, share only a brief outline. Please do not include sensitive documents or detailed personal information until the firm confirms a secure channel.', 'في الاستفسار الأولي، شارك ملخصًا موجزًا فقط، ويُرجى عدم إرسال مستندات حساسة أو معلومات شخصية تفصيلية حتى يؤكد المكتب قناة تواصل آمنة.')}</p>
    <div class="button-row button-row--center reveal"><a class="btn btn--gold" href="${href('home', '#consultation')}"><span>${t('Start a consultation request', 'ابدأ طلب استشارة')}</span>${icon('arrow-right', 'icon--dir')}</a></div>
  </div>
</section>
`;
}
