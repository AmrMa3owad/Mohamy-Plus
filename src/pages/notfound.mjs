export const meta = {
  title: { en: 'Page not found | Mohamy Plus', ar: 'الصفحة غير موجودة | محامي بلس' },
  description: { en: 'The page you are looking for could not be found.', ar: 'تعذّر العثور على الصفحة المطلوبة.' },
  noindex: true,
};

export function render(ctx) {
  const { t, icon, href } = ctx;
  return `
<section class="section not-found">
  <div class="container narrow center">
    <p class="not-found__code" aria-hidden="true">404</p>
    <h1 class="section-title">${t('This page could not be found', 'تعذّر العثور على هذه الصفحة')}</h1>
    <p class="section-lead">${t('The link may be outdated, or the page may have moved. These pages might help:', 'ربما يكون الرابط قديمًا أو نُقلت الصفحة. قد تفيدك هذه الصفحات:')}</p>
    <div class="button-row button-row--center">
      <a class="btn btn--gold" href="${href('home')}"><span>${t('Go to the homepage', 'الذهاب إلى الصفحة الرئيسية')}</span></a>
      <a class="btn btn--outline" href="${href('practice')}"><span>${t('Practice areas', 'مجالات الممارسة')}</span></a>
      <a class="btn btn--outline" href="${href('contact')}">${icon('phone')}<span>${t('Contact us', 'تواصل معنا')}</span></a>
    </div>
  </div>
</section>
`;
}
