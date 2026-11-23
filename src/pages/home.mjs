import { site } from '../config.mjs';
import { practiceAreas, introCards, pillars, principles, goals } from '../data.mjs';
import { sectionHead } from '../layout.mjs';
import { intakeSection } from '../sections/intake.mjs';
import { featuredArticle } from '../sections/insights.mjs';
import { pausedSections } from '../sections/paused.mjs';

export const meta = {
  title: { en: 'Mohamy Plus | Legal Counsel in Egypt', ar: 'محامي بلس | استشارات قانونية في مصر' },
  description: {
    en: 'Legal counsel for individuals, families, entrepreneurs, investors, and businesses in Egypt. Contact Mohamy Plus to discuss your matter and arrange a consultation.',
    ar: 'استشارات قانونية للأفراد والأسر ورواد الأعمال والمستثمرين والشركات في مصر. تواصل مع محامي بلس لمناقشة مسألتك وحجز استشارة.',
  },
};

export function render(ctx) {
  const { t, L, icon, pic, href } = ctx;
  return `
<section class="hero" aria-labelledby="hero-title">
  ${pic('hero2', { cls: 'hero__media', eager: true, flip: true })}
  <div class="hero__shade" aria-hidden="true"></div>
  <div class="hero__grid" aria-hidden="true"></div>
  <div class="container hero__content">
    <span class="kicker kicker--on-dark"><span class="kicker__dot" aria-hidden="true"></span>${t('Premier Egyptian & International Counsel', 'استشارات قانونية مصرية ودولية')}</span>
    <h1 class="hero__title" id="hero-title">${t('Navigating Legal Complexity', 'نتعامل مع تعقيدات القانون')}<span>${t('Achieving Absolute Clarity', 'لنصل بك إلى وضوح تام')}</span></h1>
    <p class="hero__lead">${t('Connecting individuals, entrepreneurs, investors, and businesses with trusted legal expertise, strategic guidance, and tailored legal solutions across a diverse range of practice areas.', 'نصل الأفراد ورواد الأعمال والمستثمرين والشركات بخبرة قانونية موثوقة وتوجيه استراتيجي وحلول قانونية مصممة خصيصًا، عبر مجالات ممارسة متنوعة.')}</p>
    <div class="hero__actions">
      <a class="btn btn--gold btn--lg" href="${ctx.wa()}" target="_blank" rel="noopener"><span>${t('Schedule Consultation', 'احجز استشارة')}</span>${icon('arrow-up-right', 'icon--dir')}</a>
      <a class="btn btn--glass btn--lg" href="${href('practice')}"><span>${t('Explore Practice Areas', 'استكشف مجالات الممارسة')}</span>${icon('chevron', 'icon--dir')}</a>
    </div>
  </div>
  <a class="hero__scroll" href="#intro" aria-label="${t('Scroll to content', 'انتقل إلى المحتوى')}"><span class="hero__mouse" aria-hidden="true"></span><span>${t('Explore', 'استكشف')}</span></a>
</section>

<section class="intro" id="intro" aria-label="${t('Our commitments', 'التزاماتنا')}">
  <div class="container">
    <ul class="intro__grid">
${introCards.map((c, i) => `      <li class="intro-card reveal" style="--i:${i}">
        <span class="icon-badge">${icon(c.icon)}</span>
        <div>
          <h2 class="intro-card__title">${L(c.title)}</h2>
          <p>${L(c.text)}</p>
        </div>
      </li>`).join('\n')}
    </ul>
  </div>
</section>

<section class="section about-home" aria-labelledby="about-home-title">
  <div class="container about-home__layout">
    <figure class="about-home__media scan-media reveal">
      ${pic('about1', { alt: t('Bronze statue of Lady Justice holding the scales', 'تمثال برونزي لسيدة العدالة تحمل الميزان'), sizes: '(min-width: 992px) 40vw, 100vw' })}
      <figcaption class="media-caption">${icon('shield-check')}<span><strong>${t('Tailored', 'مصمّم لك')}</strong><small>${t('Guidance for your matter', 'توجيه يناسب مسألتك')}</small></span></figcaption>
    </figure>
    <div class="about-home__copy">
      <header class="section-head section-head--start reveal">
        <span class="kicker"><span class="kicker__dot" aria-hidden="true"></span>${t('The Mohamy Plus Standard', 'معيار محامي بلس')}</span>
        <h2 class="section-title" id="about-home-title">${t('Why Put Your <em>Trust in Us?</em>', 'لماذا تضع <em>ثقتك فينا؟</em>')}</h2>
        <p class="section-lead">${t('At Mohamy Plus, we believe exceptional legal service begins with understanding your needs. Our approach combines legal expertise, strategic thinking, and a commitment to professionalism, ensuring every matter receives the attention and consideration it deserves.', 'نؤمن في محامي بلس بأن الخدمة القانونية المتميزة تبدأ بفهم احتياجاتك. يجمع نهجنا بين الخبرة القانونية والتفكير الاستراتيجي والالتزام بالمهنية، لتحظى كل مسألة بما تستحقه من اهتمام وعناية.')}</p>
      </header>
      <ul class="pillar-grid">
${pillars.map((p, i) => `        <li class="pillar reveal" style="--i:${i}">
          <span class="icon-badge icon-badge--sm">${icon(p.icon)}</span>
          <div><h3 class="pillar__title">${L(p.title)}</h3><p>${L(p.text)}</p></div>
        </li>`).join('\n')}
      </ul>
    </div>
  </div>
</section>

<section class="principles" aria-label="${t('What you can expect', 'ما يمكنك توقعه')}">
  <div class="container">
    <ul class="principles__grid">
${principles.map((p, i) => `      <li class="reveal" style="--i:${i}"><h2>${L(p.title)}</h2><p>${L(p.text)}</p></li>`).join('\n')}
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="areas-title">
  <div class="container">
    ${sectionHead(ctx, { kicker: { en: 'Our Expertise', ar: 'خبراتنا' }, title: { en: 'Our Practice Areas', ar: 'مجالات ممارستنا' }, lead: { en: 'Comprehensive legal services tailored to the needs of individuals, families, and businesses.', ar: 'خدمات قانونية شاملة مصممة لاحتياجات الأفراد والأسر والشركات.' }, id: 'areas-title' })}
    <ul class="area-list">
${practiceAreas.map((a, i) => `      <li class="reveal" style="--i:${i % 2}">
        <a class="area-item" href="${href('practice', '#' + a.id)}">
          <span class="area-item__head"><span class="icon-badge icon-badge--sm">${icon(a.icon)}</span><h3>${L(a.title)}</h3>${icon('arrow-right', 'area-item__arrow icon--dir')}</span>
          <p>${L(a.short)}</p>
        </a>
      </li>`).join('\n')}
    </ul>
  </div>
</section>
${pausedSections(ctx)}
<section class="section goals" aria-labelledby="goals-title">
  <canvas class="goals__particles" aria-hidden="true"></canvas>
  <div class="goals__grid-floor" aria-hidden="true"></div>
  <div class="container">
    ${sectionHead(ctx, { kicker: { en: 'Our Vision & Purpose', ar: 'رؤيتنا وغايتنا' }, title: { en: 'Our Goals. <em>Your Confidence.</em>', ar: 'أهدافنا. <em>ثقتك.</em>' }, lead: { en: "We envision a legal experience where professional guidance is accessible, every client's needs are understood, and clarity shapes every step forward.", ar: 'نتطلع إلى تجربة قانونية يكون فيها الإرشاد المهني في المتناول، وتُفهم فيها احتياجات كل عميل، ويقود الوضوح كل خطوة إلى الأمام.' }, id: 'goals-title' })}
    <ul class="goal-grid">
${goals.map((g, i) => `      <li class="goal-card reveal" style="--i:${i}" data-tilt>
        <span class="goal-card__bracket goal-card__bracket--tl" aria-hidden="true"></span><span class="goal-card__bracket goal-card__bracket--tr" aria-hidden="true"></span><span class="goal-card__bracket goal-card__bracket--bl" aria-hidden="true"></span><span class="goal-card__bracket goal-card__bracket--br" aria-hidden="true"></span>
        <span class="goal-card__num" aria-hidden="true">0${i + 1}</span>
        <span class="goal-card__icon"><span class="goal-card__ring" aria-hidden="true"></span>${icon(g.icon)}</span>
        <h3>${L(g.title)}</h3>
        <p>${L(g.text)}</p>
        <span class="goal-card__tag"><span class="goal-card__dot" aria-hidden="true"></span>${L(g.tag)}</span>
      </li>`).join('\n')}
    </ul>
  </div>
</section>

${intakeSection(ctx)}

<section class="section" aria-labelledby="insights-title">
  <div class="container">
    ${sectionHead(ctx, { kicker: { en: 'Legal Intelligence & Insights', ar: 'المعرفة القانونية والرؤى' }, title: { en: 'Legal Briefings & <em>Perspectives</em>', ar: 'نشرات <em>ورؤى قانونية</em>' }, lead: { en: "Explore legal developments, regulatory updates, and informed perspectives on the issues shaping Egypt's legal and business landscape.", ar: 'استكشف التطورات القانونية والتحديثات التنظيمية والرؤى المستنيرة حول القضايا التي تشكّل المشهد القانوني ومشهد الأعمال في مصر.' }, id: 'insights-title' })}
    ${featuredArticle(ctx)}
    <p class="center-link reveal"><a class="btn btn--outline" href="${href('insights')}"><span>${t('View All Insights', 'عرض جميع الرؤى')}</span>${icon('arrow-right', 'icon--dir')}</a></p>
  </div>
</section>
`;
}
