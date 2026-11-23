import { site } from '../config.mjs';
import { intakeCategories, intakeFeatures } from '../data.mjs';

export function intakeSection(ctx) {
  const { t, L, icon, pic } = ctx;
  const priorities = [
    ['Standard', t('Standard', 'عادي'), t('Standard request', 'طلب عادي')],
    ['Urgent', t('Urgent', 'عاجل'), t('Urgent matter', 'مسألة عاجلة')],
    ['Time-sensitive', t('Critical / Time-sensitive', 'حرج / مرتبط بمهلة'), t('Time-sensitive matter', 'مسألة مرتبطة بمهلة زمنية')],
  ];
  const tabs = [t('Legal Service', 'الخدمة القانونية'), t('Case Brief', 'ملخص القضية'), t('Contact Details', 'بيانات التواصل')];
  return `<section class="section intake" id="consultation" aria-labelledby="intake-title">
  ${pic('appointment5', { cls: 'intake__media' })}
  <div class="intake__shade" aria-hidden="true"></div>
  <div class="container intake__layout">
    <div class="intake__intro">
      <header class="section-head section-head--start reveal">
        <span class="kicker kicker--live"><span class="kicker__dot" aria-hidden="true"></span>${t('Consultation Request', 'طلب استشارة')}</span>
        <h2 class="section-title" id="intake-title">${t('Consultation Request <em>&amp; Case Intake</em>', 'طلب استشارة <em>وعرض المسألة</em>')}</h2>
        <p class="section-lead">${t('Continue opens WhatsApp with these details prefilled. Review the message before sending, and avoid including confidential or sensitive information.', 'عند المتابعة يُفتح واتساب وبه هذه التفاصيل جاهزة. راجع الرسالة قبل إرسالها، وتجنّب تضمين أي معلومات سرية أو حساسة.')}</p>
      </header>
      <ul class="feature-list">
${intakeFeatures.map((f, i) => `        <li class="feature-row reveal" style="--i:${i}"><span class="icon-badge icon-badge--sm">${icon(f.icon)}</span><div><h3>${L(f.title)}</h3><p>${L(f.text)}</p></div></li>`).join('\n')}
      </ul>
    </div>

    <form class="terminal reveal" data-intake novalidate aria-labelledby="intake-title"
      data-wa="${site.whatsapp}"
      data-msg-title="${t('Mohamy Plus — consultation request', 'محامي بلس — طلب استشارة')}"
      data-msg-name="${t('Name / organization', 'الاسم / الجهة')}"
      data-msg-phone="${t('Phone', 'الهاتف')}"
      data-msg-email="${t('Email', 'البريد الإلكتروني')}"
      data-msg-area="${t('Practice area', 'مجال الخدمة')}"
      data-msg-priority="${t('Priority', 'الأولوية')}"
      data-msg-summary="${t('Summary', 'الملخص')}"
      data-msg-none="${t('Not provided', 'غير مذكور')}"
      data-err-name="${t('Please enter your name or organization.', 'يُرجى إدخال اسمك أو اسم الجهة.')}"
      data-err-contact="${t('Please provide a phone number or an email address.', 'يُرجى إدخال رقم هاتف أو بريد إلكتروني.')}"
      data-err-phone="${t('Please enter a valid phone number (digits, spaces, +, parentheses or hyphens).', 'يُرجى إدخال رقم هاتف صحيح (أرقام أو مسافات أو + أو أقواس أو شرطات).')}"
      data-err-email="${t('Please enter a valid email address.', 'يُرجى إدخال بريد إلكتروني صحيح.')}"
      data-step-label="${t('Step {n} of 3', 'الخطوة {n} من 3')}">
      <div class="terminal__bar" aria-hidden="true">
        <span class="terminal__lights"><i></i><i></i><i></i></span>
        <span class="terminal__title">${icon('terminal')}MOHAMY_PLUS // INTAKE_PROTOCOL_V4.2</span>
        <span class="terminal__badge">${icon('whatsapp')}${t('WhatsApp handoff', 'تحويل إلى واتساب')}</span>
      </div>
      <ol class="terminal__tabs">
${tabs.map((label, i) => `        <li data-tab="${i + 1}"${i === 0 ? ' aria-current="step"' : ''}><span class="terminal__tab-num">0${i + 1}</span><span>${label}</span></li>`).join('\n')}
      </ol>
      <noscript><p class="terminal__note">${t('This request form needs JavaScript.', 'يحتاج هذا النموذج إلى تفعيل JavaScript.')} <a href="${ctx.wa()}">${t('Message the team on WhatsApp directly.', 'راسل الفريق مباشرة عبر واتساب.')}</a></p></noscript>

      <fieldset class="terminal__step" data-step="1">
        <legend class="step-bar"><span class="step-bar__tag" tabindex="-1">${t('Select category', 'اختر الفئة')}</span><span>${t('What does your matter relate to?', 'بماذا تتعلق مسألتك؟')}</span></legend>
        <div class="chip-grid">
${intakeCategories.map((c, i) => `          <label class="chip"><input type="radio" name="category" value="${L(c.label)}"${i === 0 ? ' checked' : ''}><span>${icon(c.icon)}${L(c.label)}</span></label>`).join('\n')}
        </div>
        <p class="hint-box">${icon('question')}<span><strong>${t('Not sure which category applies?', 'لست متأكدًا من الفئة المناسبة؟')}</strong> ${t("No problem. Tell us briefly what you need assistance with, and we'll help identify the appropriate next step.", 'لا مشكلة. أخبرنا باختصار بما تحتاج إليه، وسنساعدك على تحديد الخطوة المناسبة.')}</span></p>
        <fieldset class="priority">
          <legend class="priority__head"><span>${icon('activity')}${t('Priority level', 'مستوى الأولوية')}</span><output class="priority__badge" data-priority-badge>${priorities[0][2]}</output></legend>
          <div class="segmented">
${priorities.map(([value, label, badge], i) => `            <label><input type="radio" name="priority" value="${value}" data-badge="${badge}" data-label="${label}"${i === 0 ? ' checked' : ''}><span>${label}</span></label>`).join('\n')}
          </div>
        </fieldset>
        <div class="terminal__actions terminal__actions--end">
          <button class="btn btn--gold" type="button" data-next><span>${t('Proceed to Case Brief', 'المتابعة إلى ملخص القضية')}</span>${icon('arrow-right', 'icon--dir')}</button>
        </div>
      </fieldset>

      <fieldset class="terminal__step" data-step="2" hidden>
        <legend class="step-bar"><span class="step-bar__tag" tabindex="-1">${t('Brief outline', 'ملخص موجز')}</span><span>${t('Summarize the key facts, in a few lines:', 'لخّص الوقائع الأساسية في بضعة أسطر:')}</span></legend>
        <div class="field">
          <label for="intake-summary">${icon('card-text')}${t('Case facts & context', 'وقائع المسألة وسياقها')} <span class="field__optional">${t('(optional)', '(اختياري)')}</span></label>
          <textarea id="intake-summary" name="summary" rows="6" maxlength="1200" aria-describedby="intake-summary-count" placeholder="${t('Briefly outline the matter. Avoid sensitive details.', 'اعرض المسألة باختصار، وتجنّب التفاصيل الحساسة.')}"></textarea>
          <span class="field__count" id="intake-summary-count" data-count-for="intake-summary" data-template="${t('{n} / 1,200 characters', '{n} / 1200 حرف')}" aria-live="polite">${t('0 / 1,200 characters', '0 / 1200 حرف')}</span>
        </div>
        <div class="terminal__actions">
          <button class="btn btn--ghost" type="button" data-prev>${icon('arrow-left', 'icon--dir')}<span>${t('Back', 'رجوع')}</span></button>
          <button class="btn btn--gold" type="button" data-next><span>${t('Continue to Contact Details', 'المتابعة إلى بيانات التواصل')}</span>${icon('arrow-right', 'icon--dir')}</button>
        </div>
      </fieldset>

      <fieldset class="terminal__step" data-step="3" hidden>
        <legend class="step-bar"><span class="step-bar__tag" tabindex="-1">${t('Contact details', 'بيانات التواصل')}</span><span>${t('How can the team contact you?', 'كيف يمكن للفريق التواصل معك؟')}</span></legend>
        <div class="field-grid">
          <div class="field">
            <label for="intake-name">${icon('person')}${t('Full name / organization', 'الاسم الكامل / الجهة')}</label>
            <input id="intake-name" name="name" type="text" autocomplete="name" required aria-describedby="intake-name-error">
            <span class="field__error" id="intake-name-error"></span>
          </div>
          <div class="field">
            <label for="intake-phone">${icon('whatsapp')}${t('Phone / WhatsApp', 'الهاتف / واتساب')}</label>
            <input id="intake-phone" name="phone" type="tel" dir="ltr" inputmode="tel" autocomplete="tel" maxlength="20" placeholder="+20 1XX XXX XXXX" aria-describedby="intake-phone-error">
            <span class="field__error" id="intake-phone-error"></span>
          </div>
          <div class="field field--full">
            <label for="intake-email">${icon('mail')}${t('Email', 'البريد الإلكتروني')} <span class="field__optional">${t('(optional if phone is given)', '(اختياري عند إدخال الهاتف)')}</span></label>
            <input id="intake-email" name="email" type="email" dir="ltr" autocomplete="email" placeholder="name@example.com" aria-describedby="intake-email-error">
            <span class="field__error" id="intake-email-error"></span>
          </div>
        </div>
        <button class="btn btn--gold btn--block btn--lg" type="submit">${icon('send')}<span>${t('Continue in WhatsApp', 'المتابعة عبر واتساب')}</span></button>
        <p class="terminal__note">${t('WhatsApp will open with a draft for you to review. Avoid sending confidential documents until the firm confirms a secure channel.', 'سيُفتح واتساب ومعه مسودة لمراجعتها. تجنّب إرسال مستندات سرية حتى يؤكد المكتب قناة تواصل آمنة.')}</p>
        <div class="terminal__actions">
          <button class="btn btn--ghost" type="button" data-prev>${icon('arrow-left', 'icon--dir')}<span>${t('Back to Case Brief', 'العودة إلى ملخص القضية')}</span></button>
        </div>
      </fieldset>

      <div class="terminal__success" data-success hidden>
        <span class="terminal__success-icon">${icon('check-circle')}</span>
        <h3 tabindex="-1">${t('Your WhatsApp draft is ready', 'مسودة واتساب جاهزة')}</h3>
        <p>${t('The message has not been sent yet. Review the draft in WhatsApp and press Send there. If WhatsApp did not open, use the button below.', 'لم تُرسل الرسالة بعد. راجع المسودة في واتساب ثم اضغط إرسال. إذا لم يُفتح واتساب، استخدم الزر أدناه.')}</p>
        <div class="terminal__actions terminal__actions--center">
          <a class="btn btn--gold" data-wa-fallback href="${ctx.wa()}" target="_blank" rel="noopener">${icon('whatsapp')}<span>${t('Open WhatsApp', 'افتح واتساب')}</span></a>
          <button class="btn btn--ghost" type="button" data-restart>${t('Start a new request', 'ابدأ طلبًا جديدًا')}</button>
        </div>
      </div>
      <p class="visually-hidden" data-status aria-live="polite"></p>
    </form>
  </div>
</section>`;
}
