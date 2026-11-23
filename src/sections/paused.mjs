// Client logos + testimonials — PAUSED at the client's request ("keep it in the
// source code to use later, till we get some feedback to publish").
//
// These sections are NOT rendered while `showClientLogos` / `showTestimonials`
// are false in src/config.mjs, so nothing here reaches the published HTML.
//
// Before switching either on:
//   • add only organisations and quotes the client has WRITTEN PERMISSION to publish;
//   • never describe results as guaranteed, and avoid naming the developer as counsel;
//   • fill in both languages.

import { site } from '../config.mjs';

export const clientOrganizations = [
  // { icon: 'building', name: { en: 'Organisation name', ar: 'اسم الجهة' } },
];

export const testimonials = [
  // {
  //   matter: { en: 'Matter type', ar: 'نوع المسألة' },
  //   quote:  { en: 'Approved quote…', ar: 'نص الشهادة المعتمد…' },
  //   name:   'Client name (or initials, with permission)',
  //   role:   { en: 'Role, Organisation', ar: 'المنصب، الجهة' },
  // },
];

export function pausedSections(ctx) {
  const { t, L, icon } = ctx;
  let html = '';
  if (site.showClientLogos && clientOrganizations.length) {
    const items = clientOrganizations.map(c => `<li class="client-pill">${icon(c.icon)}${L(c.name)}</li>`).join('');
    html += `<section class="section clients" aria-labelledby="clients-title">
  <div class="container">
    <header class="section-head section-head--center"><span class="kicker">${t('Institutional Trust & Partnerships', 'الثقة المؤسسية والشراكات')}</span><h2 class="section-title" id="clients-title">${t('Trusted by Leading Enterprises & Institutions', 'موضع ثقة كبرى الشركات والمؤسسات')}</h2></header>
    <div class="marquee"><ul class="marquee__track">${items}</ul><ul class="marquee__track" aria-hidden="true">${items}</ul></div>
  </div>
</section>`;
  }
  if (site.showTestimonials && testimonials.length) {
    html += `<section class="section testimonials" aria-labelledby="testimonials-title">
  <div class="container">
    <header class="section-head section-head--center"><span class="kicker">${t('Client Feedback', 'آراء العملاء')}</span><h2 class="section-title" id="testimonials-title">${t('What Our Clients Say', 'ماذا يقول عملاؤنا')}</h2></header>
    <ul class="testimonial-grid">${testimonials.map(q => `<li><figure class="testimonial"><span class="badge">${L(q.matter)}</span><blockquote>${L(q.quote)}</blockquote><figcaption><strong>${q.name}</strong><span>${L(q.role)}</span></figcaption></figure></li>`).join('')}</ul>
  </div>
</section>`;
  }
  return html;
}
