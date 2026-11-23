import { introCards, pillars, goals, audiences } from '../data.mjs';
import { pageHero, sectionHead } from '../layout.mjs';

export const meta = {
  title: { en: 'About Mohamy Plus | Legal Counsel in Egypt', ar: 'من نحن | محامي بلس' },
  description: {
    en: 'Learn about Mohamy Plus and its approach to legal counsel for individuals, families, entrepreneurs, investors, and businesses in Egypt.',
    ar: 'تعرّف على محامي بلس ونهجه في تقديم الاستشارات القانونية للأفراد والأسر ورواد الأعمال والمستثمرين والشركات في مصر.',
  },
};

export function render(ctx) {
  const { t, L, icon, pic, href } = ctx;
  return `
${pageHero(ctx, { title: { en: 'About Mohamy Plus', ar: 'عن محامي بلس' }, lead: { en: 'Professional legal guidance and tailored legal services for individuals, families, entrepreneurs, and businesses across Egypt.', ar: 'إرشاد قانوني مهني وخدمات قانونية مصممة خصيصًا للأفراد والأسر ورواد الأعمال والشركات في جميع أنحاء مصر.' }, crumbs: [{ key: 'about', label: { en: 'About Us', ar: 'من نحن' } }], image: 'case-8' })}

<section class="section" aria-labelledby="story-title">
  <div class="container split">
    <figure class="split__media scan-media reveal">
      ${pic('about-1', { alt: t('Statue of Lady Justice in a law office', 'تمثال سيدة العدالة في مكتب محاماة'), sizes: '(min-width: 992px) 45vw, 100vw' })}
      <figcaption class="media-caption">${icon('shield-check')}<span><strong>${t('Discretion', 'التكتم')}</strong><small>${t('In every interaction', 'في كل تعامل')}</small></span></figcaption>
    </figure>
    <div class="split__copy">
      <header class="section-head section-head--start reveal">
        <span class="kicker"><span class="kicker__dot" aria-hidden="true"></span>${t('Welcome to Mohamy Plus', 'مرحبًا بك في محامي بلس')}</span>
        <h2 class="section-title" id="story-title">${t('Legal counsel built around <em>your needs</em>', 'استشارات قانونية تتمحور حول <em>احتياجاتك</em>')}</h2>
      </header>
      <div class="prose reveal">
        <p>${t('At Mohamy Plus, we believe exceptional legal service begins with understanding your needs. Our approach combines legal expertise, strategic thinking, and a commitment to professionalism, ensuring every matter receives the attention and consideration it deserves.', 'نؤمن في محامي بلس بأن الخدمة القانونية المتميزة تبدأ بفهم احتياجاتك. يجمع نهجنا بين الخبرة القانونية والتفكير الاستراتيجي والالتزام بالمهنية، لتحظى كل مسألة بما تستحقه من اهتمام وعناية.')}</p>
        <p>${t('We connect individuals, entrepreneurs, investors, and businesses with trusted legal expertise, strategic guidance, and tailored legal solutions across a diverse range of practice areas — from corporate and commercial matters to family, criminal, real estate, and dispute resolution.', 'نصل الأفراد ورواد الأعمال والمستثمرين والشركات بخبرة قانونية موثوقة وتوجيه استراتيجي وحلول قانونية مصممة خصيصًا، عبر مجالات ممارسة متنوعة: من مسائل الشركات والتجارة إلى قضايا الأسرة والقضايا الجنائية والعقارية وتسوية المنازعات.')}</p>
        <p>${t('Based in Cairo, the team advises on Egyptian and cross-border matters, with consultations by appointment.', 'يعمل فريقنا من القاهرة، ويقدم المشورة في المسائل المصرية والعابرة للحدود، والاستشارات بموعد مسبق.')}</p>
      </div>
      <div class="button-row reveal">
        <a class="btn btn--gold" href="${href('contact')}"><span>${t('Contact the team', 'تواصل مع الفريق')}</span>${icon('arrow-right', 'icon--dir')}</a>
        <a class="btn btn--outline" href="${href('practice')}"><span>${t('Practice areas', 'مجالات الممارسة')}</span></a>
      </div>
    </div>
  </div>
</section>

<section class="section section--alt" aria-labelledby="approach-title">
  <div class="container">
    ${sectionHead(ctx, { kicker: { en: 'The Mohamy Plus Standard', ar: 'معيار محامي بلس' }, title: { en: 'Why Put Your <em>Trust in Us?</em>', ar: 'لماذا تضع <em>ثقتك فينا؟</em>' }, id: 'approach-title' })}
    <ul class="card-grid card-grid--4">
${pillars.map((p, i) => `      <li class="info-card reveal" style="--i:${i}"><span class="icon-badge">${icon(p.icon)}</span><h3>${L(p.title)}</h3><p>${L(p.text)}</p></li>`).join('\n')}
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="values-title">
  <div class="container">
    ${sectionHead(ctx, { kicker: { en: 'How we work', ar: 'كيف نعمل' }, title: { en: 'Principles that guide <em>every matter</em>', ar: 'مبادئ تقود <em>كل مسألة</em>' }, id: 'values-title' })}
    <ul class="card-grid card-grid--2">
${introCards.map((c, i) => `      <li class="info-card info-card--row reveal" style="--i:${i % 2}"><span class="icon-badge">${icon(c.icon)}</span><div><h3>${L(c.title)}</h3><p>${L(c.text)}</p></div></li>`).join('\n')}
    </ul>
  </div>
</section>

<section class="section section--alt" aria-labelledby="serve-title">
  <div class="container">
    ${sectionHead(ctx, { kicker: { en: 'Who we serve', ar: 'من نخدم' }, title: { en: 'Comprehensive support, <em>beyond boundaries</em>', ar: 'دعم متكامل <em>بلا حدود</em>' }, lead: { en: 'Legal assistance for individuals, families, entrepreneurs, investors, and businesses.', ar: 'مساعدة قانونية للأفراد والأسر ورواد الأعمال والمستثمرين والشركات.' }, id: 'serve-title' })}
    <ul class="card-grid card-grid--5">
${audiences.map((a, i) => `      <li class="info-card info-card--compact reveal" style="--i:${i}"><span class="icon-badge icon-badge--sm">${icon(a.icon)}</span><h3>${L(a.title)}</h3><p>${L(a.text)}</p></li>`).join('\n')}
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="vision-title">
  <div class="container">
    ${sectionHead(ctx, { kicker: { en: 'Our Vision & Purpose', ar: 'رؤيتنا وغايتنا' }, title: { en: 'Our Goals. <em>Your Confidence.</em>', ar: 'أهدافنا. <em>ثقتك.</em>' }, id: 'vision-title' })}
    <ol class="card-grid card-grid--3 numbered">
${goals.map((g, i) => `      <li class="info-card reveal" style="--i:${i}"><span class="numbered__n" aria-hidden="true">0${i + 1}</span><h3>${L(g.title)}</h3><p>${L(g.text)}</p></li>`).join('\n')}
    </ol>
  </div>
</section>
`;
}
