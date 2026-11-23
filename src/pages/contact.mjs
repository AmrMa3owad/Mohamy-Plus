import { site } from '../config.mjs';
import { pageHero } from '../layout.mjs';

export const meta = {
  title: { en: 'Contact Mohamy Plus | Legal Consultations', ar: 'تواصل مع محامي بلس | الاستشارات القانونية' },
  description: {
    en: 'Contact Mohamy Plus by WhatsApp, phone, or email to discuss a legal matter or arrange a consultation in Cairo, Egypt.',
    ar: 'تواصل مع محامي بلس عبر واتساب أو الهاتف أو البريد الإلكتروني لمناقشة مسألة قانونية أو حجز استشارة في القاهرة.',
  },
};

export function render(ctx) {
  const { t, icon, href } = ctx;
  const methods = [
    { icon: 'whatsapp', label: t('WhatsApp', 'واتساب'), value: t('Message the team', 'راسل الفريق'), href: ctx.wa(), ext: true, note: t('Fastest way to reach us', 'أسرع وسيلة للتواصل معنا') },
    { icon: 'phone', label: t('Phone', 'الهاتف'), value: `<span dir="ltr">${site.phoneDisplay}</span>`, href: `tel:${site.phone}`, note: t('Discuss urgent matters and availability', 'لمناقشة المسائل العاجلة والمواعيد المتاحة') },
    { icon: 'mail', label: t('Email', 'البريد الإلكتروني'), value: site.email, href: `mailto:${site.email}`, note: t('For general inquiries', 'للاستفسارات العامة') },
    { icon: 'pin', label: t('Location', 'الموقع'), value: t('Cairo, Egypt', 'القاهرة، مصر'), note: t('Egyptian and cross-border matters', 'المسائل المصرية والعابرة للحدود') },
  ];
  return `
${pageHero(ctx, { title: { en: 'Contact Us', ar: 'تواصل معنا' }, lead: { en: 'Discuss your matter with the team and arrange a consultation.', ar: 'ناقش مسألتك مع الفريق واحجز موعد استشارة.' }, crumbs: [{ key: 'contact', label: { en: 'Contact', ar: 'تواصل معنا' } }], image: 'appointment5' })}

<section class="section" aria-label="${t('Contact methods', 'وسائل التواصل')}">
  <div class="container">
    <ul class="contact-methods">
${methods.map((m, i) => {
    const inner = `<span class="icon-badge">${icon(m.icon)}</span><span class="contact-method__label">${m.label}</span><span class="contact-method__value">${m.value}</span><span class="contact-method__note">${m.note}</span>`;
    return `      <li class="reveal" style="--i:${i}">${m.href ? `<a class="contact-method" href="${m.href}"${m.ext ? ' target="_blank" rel="noopener"' : ''}>${inner}</a>` : `<div class="contact-method">${inner}</div>`}</li>`;
  }).join('\n')}
    </ul>
  </div>
</section>

<section class="section section--alt" aria-labelledby="contact-form-title">
  <div class="container contact-layout">
    <div class="contact-layout__intro">
      <header class="section-head section-head--start reveal">
        <span class="kicker kicker--live"><span class="kicker__dot" aria-hidden="true"></span>${t('Consultations by appointment', 'الاستشارات بموعد مسبق')}</span>
        <h2 class="section-title" id="contact-form-title">${t('Start a <em>conversation</em>', 'ابدأ <em>محادثة</em>')}</h2>
        <p class="section-lead">${t('Send a consultation request directly through WhatsApp. The team reviews every request and will follow up as availability allows.', 'أرسل طلب استشارة مباشرة عبر واتساب. يراجع الفريق كل طلب ويتابع معك بحسب المواعيد المتاحة.')}</p>
      </header>
      <ul class="feature-list">
        <li class="feature-row reveal"><span class="icon-badge icon-badge--sm">${icon('shield-lock')}</span><div><h3>${t('Respect for client privacy', 'احترام خصوصية العميل')}</h3><p>${t('For an initial inquiry, share only a brief outline. Please do not include sensitive documents or detailed personal information.', 'في الاستفسار الأولي، شارك ملخصًا موجزًا فقط، ويُرجى عدم إرفاق مستندات حساسة أو معلومات شخصية تفصيلية.')}</p></div></li>
        <li class="feature-row reveal"><span class="icon-badge icon-badge--sm">${icon('calendar')}</span><div><h3>${t('Consultations by appointment', 'الاستشارات بموعد مسبق')}</h3><p>${t('Consultation requests are reviewed by the team, who will follow up as availability allows.', 'يراجع الفريق طلبات الاستشارة ويتابع معك بحسب المواعيد المتاحة.')}</p></div></li>
        <li class="feature-row reveal"><span class="icon-badge icon-badge--sm">${icon('globe')}</span><div><h3>${t('Arabic & English', 'العربية والإنجليزية')}</h3><p>${t('Write to us in the language you are most comfortable with.', 'راسلنا باللغة التي ترتاح إليها أكثر.')}</p></div></li>
      </ul>
    </div>

    <form class="terminal reveal" data-contact novalidate aria-labelledby="contact-form-title"
      data-wa="${site.whatsapp}"
      data-msg-title="${t('Mohamy Plus — contact request', 'محامي بلس — طلب تواصل')}"
      data-msg-name="${t('Name', 'الاسم')}" data-msg-email="${t('Email', 'البريد الإلكتروني')}" data-msg-subject="${t('Subject', 'الموضوع')}" data-msg-message="${t('Message', 'الرسالة')}"
      data-err-required="${t('This field is required.', 'هذا الحقل مطلوب.')}" data-err-email="${t('Please enter a valid email address.', 'يُرجى إدخال بريد إلكتروني صحيح.')}">
      <div class="terminal__bar" aria-hidden="true">
        <span class="terminal__lights"><i></i><i></i><i></i></span>
        <span class="terminal__title">${icon('terminal')}MOHAMY_PLUS // DIRECT_DISPATCH</span>
        <span class="terminal__badge">${icon('whatsapp')}${t('WhatsApp handoff', 'تحويل إلى واتساب')}</span>
      </div>
      <div class="terminal__body">
        <noscript><p class="terminal__note">${t('This form needs JavaScript to prepare a WhatsApp draft. Use the phone or email links above to contact the team directly.', 'يحتاج هذا النموذج إلى JavaScript لإعداد مسودة واتساب. استخدم روابط الهاتف أو البريد أعلاه للتواصل مباشرة.')}</p></noscript>
        <div class="field-grid">
          <div class="field">
            <label for="c-name">${icon('person')}${t('Full name / organization', 'الاسم الكامل / الجهة')}</label>
            <input id="c-name" name="name" type="text" autocomplete="name" required aria-describedby="c-name-error">
            <span class="field__error" id="c-name-error"></span>
          </div>
          <div class="field">
            <label for="c-email">${icon('mail')}${t('Email', 'البريد الإلكتروني')}</label>
            <input id="c-email" name="email" type="email" dir="ltr" autocomplete="email" required placeholder="name@example.com" aria-describedby="c-email-error">
            <span class="field__error" id="c-email-error"></span>
          </div>
          <div class="field field--full">
            <label for="c-subject">${icon('bookmark')}${t('Legal subject matter', 'موضوع المسألة القانونية')} <span class="field__optional">${t('(optional)', '(اختياري)')}</span></label>
            <input id="c-subject" name="subject" type="text" placeholder="${t('e.g. company formation, custody, a contract dispute', 'مثال: تأسيس شركة، حضانة، نزاع تعاقدي')}">
          </div>
          <div class="field field--full">
            <label for="c-message">${icon('card-text')}${t('Matter details & summary', 'تفاصيل المسألة وملخصها')}</label>
            <textarea id="c-message" name="message" rows="5" maxlength="1200" required aria-describedby="c-message-error c-message-count" placeholder="${t('Briefly summarize your matter. Avoid sensitive details.', 'لخّص مسألتك باختصار، وتجنّب التفاصيل الحساسة.')}"></textarea>
            <span class="field__count" id="c-message-count" data-count-for="c-message" data-template="${t('{n} / 1,200 characters', '{n} / 1200 حرف')}" aria-live="polite">${t('0 / 1,200 characters', '0 / 1200 حرف')}</span>
            <span class="field__error" id="c-message-error"></span>
          </div>
        </div>
        <button class="btn btn--gold btn--block btn--lg" type="submit">${icon('send')}<span>${t('Prepare WhatsApp message', 'إعداد رسالة واتساب')}</span></button>
        <div class="form-result" data-result hidden>
          ${icon('check-circle')}
          <p><strong>${t('Your draft is ready.', 'المسودة جاهزة.')}</strong> ${t('Review the prefilled WhatsApp message and press Send there when you are ready.', 'راجع رسالة واتساب المُعدّة واضغط إرسال عندما تكون مستعدًا.')} <a data-wa-fallback href="${ctx.wa()}" target="_blank" rel="noopener">${t('Open WhatsApp', 'افتح واتساب')}</a></p>
        </div>
      </div>
    </form>
  </div>
</section>
`;
}
