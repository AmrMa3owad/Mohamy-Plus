// Phoenix (فينيكس) — the Mohamy Plus site assistant.
// Everything Phoenix says comes from here and from src/data.mjs, so it can only
// repeat approved information. It never gives legal advice, never quotes fees,
// hours or outcomes, and hands every request to the team via WhatsApp.
//
// Text supports **bold** and line breaks (\n). Keywords are matched after
// normalisation (lower-case, Arabic letters unified, diacritics removed).
// Latin keywords match at word starts ("divorc" matches "divorced"); Arabic
// keywords match anywhere (so prefixes like ال / و / ب / لل still match).
//
// Actions on buttons:  intent:<id> | nav:<pageKey>[#hash] | book[:<category value>]
//                      wa | tel | mail | menu | ask-team

import { site } from '../config.mjs';
import { practiceAreas, intakeCategories, processSteps } from '../data.mjs';
import { pages } from '../layout.mjs';

const T = (en, ar) => ({ en, ar });

// Which intake category a practice area maps to (for "book this").
const areaCategory = {
  corporate: 'Corporate & M&A', 'mergers-acquisitions': 'Corporate & M&A', 'capital-markets': 'Capital Markets',
  arbitration: 'Arbitration & Dispute', civil: 'Arbitration & Dispute', criminal: 'Criminal Defense',
  'real-estate': 'Real Estate Law', family: 'Family & Estate', employment: 'Other service',
};

const areaKeywords = {
  corporate: ['corporate', 'company', 'companies', 'business', 'commercial', 'startup', 'incorporat', 'governance', 'contract', 'compliance', 'شركه', 'شركات', 'تاسيس', 'تجاري', 'عقد', 'عقود', 'حوكمه', 'امتثال', 'بيزنس', 'مشروع'],
  family: ['family', 'divorc', 'custody', 'child', 'maintenance', 'alimony', 'inherit', 'marriage', 'wife', 'husband', 'khul', 'اسره', 'اسري', 'طلاق', 'حضانه', 'نفقه', 'ميراث', 'ورث', 'تركه', 'زواج', 'خلع', 'زوج', 'اطفال', 'رؤيه', 'احوال شخصيه'],
  criminal: ['criminal', 'crime', 'police', 'arrest', 'prosecut', 'charge', 'accused', 'jail', 'prison', 'defen', 'جنائي', 'جنايه', 'جنحه', 'شرطه', 'قسم', 'نيابه', 'اتهام', 'متهم', 'حبس', 'سجن', 'قبض', 'محضر', 'دفاع'],
  'real-estate': ['real estate', 'property', 'properties', 'apartment', 'flat', 'land', 'lease', 'rent', 'landlord', 'tenant', 'ownership', 'عقار', 'شقه', 'ارض', 'ايجار', 'مالك', 'مستاجر', 'ملكيه', 'تسجيل', 'بيع', 'شراء'],
  employment: ['employment', 'labor', 'labour', 'employee', 'employer', 'job', 'fired', 'dismiss', 'terminat', 'salary', 'wage', 'workplace', 'عمل', 'عامل', 'عمال', 'موظف', 'وظيفه', 'فصل', 'رفد', 'مرتب', 'راتب', 'اجر', 'صاحب العمل', 'تامينات'],
  civil: ['civil', 'lawsuit', 'sue', 'claim', 'compensation', 'damages', 'litigation', 'court', 'debt', 'مدني', 'دعوى', 'قضيه', 'تعويض', 'مطالبه', 'محكمه', 'تقاضي', 'دين', 'شيك'],
  'capital-markets': ['capital market', 'securities', 'stock', 'shares', 'exchange', 'ipo', 'fra', 'investor', 'سوق المال', 'اوراق ماليه', 'بورصه', 'اسهم', 'سهم', 'رقابه الماليه', 'مستثمر', 'استثمار'],
  'mergers-acquisitions': ['merger', 'acquisition', 'acquire', 'm&a', 'due diligence', 'restructur', 'takeover', 'اندماج', 'استحواذ', 'دمج', 'فحص نافي', 'اعاده هيكله', 'هيكله'],
  arbitration: ['arbitrat', 'dispute', 'mediat', 'negotiat', 'settlement', 'adr', 'crcica', 'تحكيم', 'نزاع', 'منازعه', 'وساطه', 'تفاوض', 'تسويه', 'صلح'],
};

const pageInfo = {
  home: { label: T('Home', 'الرئيسية'), kw: ['home', 'homepage', 'main page', 'start', 'الرئيسيه', 'البدايه'] },
  about: { label: T('About us', 'من نحن'), kw: ['about', 'who are you', 'the firm', 'your team', 'من نحن', 'من انتم', 'مين انتم', 'عنكم', 'المكتب'] },
  practice: { label: T('Practice areas', 'مجالات الممارسة'), kw: ['practice area', 'areas', 'expertise', 'مجالات', 'تخصص', 'خبرات'] },
  help: { label: T('How we help', 'كيف نساعدك'), kw: ['how we help', 'how you help', 'approach', 'كيف نساعد', 'تساعدني', 'تساعدوني', 'منهج'] },
  insights: { label: T('Legal insights', 'رؤى قانونية'), kw: ['insight', 'blog', 'article', 'briefing', 'news', 'read', 'مقال', 'مقالات', 'رؤى', 'مدونه', 'نشره', 'اقرا'] },
  contact: { label: T('Contact page', 'صفحة التواصل'), kw: ['contact page', 'contact form', 'صفحه التواصل'] },
};

function knowledge(lang) {
  const L = v => v[lang];
  const pick = (en, ar) => (lang === 'ar' ? ar : en);
  const area = id => practiceAreas.find(a => a.id === id);

  const menu = [
    { label: pick('Practice areas', 'مجالات الممارسة'), action: 'intent:services' },
    { label: pick('Book a consultation', 'احجز استشارة'), action: 'book', primary: true },
    { label: pick('How it works', 'كيف نعمل'), action: 'intent:process' },
    { label: pick('Contact the team', 'تواصل مع الفريق'), action: 'intent:contact' },
    { label: pick('Browse pages', 'تصفّح الصفحات'), action: 'intent:pages' },
  ];

  const intents = [
    // ---- conversation ----
    { id: 'greet', kw: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'salam', 'مرحبا', 'اهلا', 'السلام', 'سلام', 'صباح', 'مساء', 'هاي', 'ازيك', 'ازيكم'],
      reply: pick('Hello! How can I help you today?', 'أهلًا بك! كيف أستطيع مساعدتك اليوم؟'), buttons: menu },
    { id: 'thanks', kw: ['thank', 'thx', 'great', 'perfect', 'شكرا', 'متشكر', 'تسلم', 'ممتاز', 'جميل', 'تمام'],
      reply: pick('You’re welcome. Is there anything else I can help with?', 'على الرحب والسعة. هل هناك شيء آخر أستطيع مساعدتك فيه؟'), buttons: menu.slice(0, 4) },
    { id: 'bye', kw: ['bye', 'goodbye', 'see you', 'مع السلامه', 'سلام عليكم', 'باي'],
      reply: pick('Thank you for visiting Mohamy Plus. Whenever you are ready, the team is one message away.', 'شكرًا لزيارتك محامي بلس. الفريق على بُعد رسالة متى كنت مستعدًا.'),
      buttons: [{ label: pick('Message the team', 'راسل الفريق'), action: 'wa' }] },
    { id: 'bot', kw: ['who are you', 'are you human', 'are you a bot', 'robot', 'phoenix', 'your name', 'انت مين', 'من انت', 'روبوت', 'بوت', 'فينيكس', 'اسمك', 'انسان'],
      reply: pick('I’m **Phoenix**, the Mohamy Plus website assistant. I’m automated, not a lawyer: I help you find information, move around the site, and prepare a consultation request that you send to the team on WhatsApp.',
        'أنا **فينيكس**، المساعد الآلي لموقع محامي بلس. لست محاميًا؛ أساعدك في الوصول إلى المعلومات والتنقل في الموقع وإعداد طلب استشارة ترسله إلى الفريق عبر واتساب.'), buttons: menu },
    { id: 'menu', kw: ['menu', 'help', 'options', 'what can you do', 'start over', 'القائمه', 'مساعده', 'ساعدني', 'تقدر تعمل', 'خيارات'],
      reply: pick('Here’s what I can help with:', 'إليك ما يمكنني مساعدتك فيه:'), buttons: menu },

    // ---- information ----
    { id: 'services', kw: ['service', 'what do you do', 'what do you offer', 'specialt', 'خدمات', 'خدمه', 'بتعملوا', 'تقدمون', 'تقدموا', 'تخصصات'],
      reply: pick('Mohamy Plus supports individuals, families, entrepreneurs, investors, and businesses across **nine practice areas**. Which one is closest to your matter?',
        'يدعم محامي بلس الأفراد والأسر ورواد الأعمال والمستثمرين والشركات عبر **تسعة مجالات ممارسة**. أيّها الأقرب إلى مسألتك؟'),
      buttons: [...practiceAreas.map(a => ({ label: L(a.title), action: `intent:area-${a.id}` })), { label: pick('Not sure', 'لست متأكدًا'), action: 'intent:unsure' }] },
    { id: 'unsure', kw: ['not sure', 'dont know', 'don’t know', 'no idea', 'مش عارف', 'لا اعرف', 'مش متاكد', 'لست متاكد', 'محتار'],
      reply: pick('No problem — many people aren’t sure which category applies. Tell me briefly what you need help with, or start a consultation request and choose **“Other service”**. The team will help identify the right next step.',
        'لا مشكلة، فكثيرون لا يعرفون الفئة المناسبة. أخبرني باختصار بما تحتاج إليه، أو ابدأ طلب استشارة واختر **«خدمة أخرى»**، وسيساعدك الفريق على تحديد الخطوة المناسبة.'),
      buttons: [{ label: pick('Start a request', 'ابدأ طلبًا'), action: 'book:Other service', primary: true }, { label: pick('See all areas', 'كل المجالات'), action: 'intent:services' }] },
    { id: 'process', weight: 1.6, kw: ['how does it work', 'how it works', 'process', 'steps', 'what happens', 'next step', 'procedure', 'ازاي', 'كيف', 'خطوات', 'الاجراءات', 'بيتم', 'ايه اللي', 'طريقه'],
      reply: pick('Here’s how it works:\n', 'هكذا تسير الأمور:\n') + processSteps.map((s, i) => `**${i + 1}. ${L(s.title)}** — ${L(s.text)}`).join('\n'),
      buttons: [{ label: pick('Start step 1 now', 'ابدأ الخطوة الأولى الآن'), action: 'book', primary: true }, { label: pick('How we help page', 'صفحة كيف نساعدك'), action: 'nav:help' }] },
    { id: 'contact', weight: 1.6, kw: ['contact', 'phone', 'number', 'call', 'email', 'mail', 'whatsapp', 'reach', 'talk to', 'speak', 'رقم', 'تليفون', 'هاتف', 'موبايل', 'اتصل', 'ايميل', 'بريد', 'واتس', 'تواصل', 'اكلم', 'اكلمكم', 'كلم'],
      reply: pick(`You can reach the team directly:\n**WhatsApp:** fastest way to reach us\n**Phone:** ${site.phoneDisplay}\n**Email:** ${site.email}`,
        `يمكنك التواصل مع الفريق مباشرة:\n**واتساب:** أسرع وسيلة للتواصل\n**الهاتف:** ${site.phoneDisplay}\n**البريد الإلكتروني:** ${site.email}`),
      buttons: [{ label: pick('WhatsApp', 'واتساب'), action: 'wa', primary: true }, { label: pick('Call', 'اتصال'), action: 'tel' }, { label: pick('Email', 'بريد إلكتروني'), action: 'mail' }, { label: pick('Book a consultation', 'احجز استشارة'), action: 'book' }] },
    { id: 'location', weight: 1.6, kw: ['where', 'address', 'location', 'office', 'located', 'visit', 'cairo', 'map', 'عنوان', 'مكان', 'فين', 'وين', 'موقع', 'مقر', 'مكتب', 'القاهره', 'زياره'],
      reply: pick('Mohamy Plus is based in **Cairo, Egypt**, and advises on Egyptian and cross-border matters. Consultations are **by appointment** — the team will confirm the meeting details when they follow up on your request.',
        'يقع محامي بلس في **القاهرة، مصر**، ويقدم المشورة في المسائل المصرية والعابرة للحدود. الاستشارات **بموعد مسبق**، وسيؤكد الفريق تفاصيل اللقاء عند متابعة طلبك.'),
      buttons: [{ label: pick('Request an appointment', 'اطلب موعدًا'), action: 'book', primary: true }, { label: pick('Contact details', 'بيانات التواصل'), action: 'intent:contact' }] },
    { id: 'hours', weight: 1.6, kw: ['hours', 'open', 'opening', 'when are you', 'available', 'availability', 'today', 'tomorrow', 'weekend', 'friday', 'مواعيد', 'ساعات', 'امتى', 'متى', 'مفتوح', 'النهارده', 'بكره', 'الجمعه', 'متاح'],
      reply: pick('Consultations are **by appointment**. Send a request with your preferred day and time, and the team will follow up to confirm availability. For urgent matters, mark your request as urgent or call the team.',
        'الاستشارات **بموعد مسبق**. أرسل طلبًا باليوم والوقت المفضلين لديك، وسيتابع الفريق معك لتأكيد الموعد المتاح. وفي المسائل العاجلة، حدّد الطلب بأنه عاجل أو اتصل بالفريق.'),
      buttons: [{ label: pick('Choose a preferred time', 'اختر وقتًا مفضلًا'), action: 'book', primary: true }, { label: pick('Call now', 'اتصل الآن'), action: 'tel' }] },
    { id: 'fees', weight: 1.6, kw: ['price', 'cost', 'fee', 'how much', 'charge', 'pay', 'free', 'expensive', 'budget', 'اتعاب', 'سعر', 'تكلفه', 'بكام', 'كام', 'فلوس', 'مجاني', 'مجانا', 'تدفع', 'اسعار', 'رسوم'],
      reply: pick('Fees depend on the nature and complexity of each matter, so I can’t quote a price here. After reviewing a short outline, the team will explain the next steps and any fees directly with you.',
        'تختلف الأتعاب بحسب طبيعة كل مسألة ومدى تعقيدها، لذا لا أستطيع ذكر سعر هنا. بعد مراجعة ملخص قصير لمسألتك، سيشرح لك الفريق الخطوات التالية والأتعاب مباشرة.'),
      buttons: [{ label: pick('Share an outline', 'شارك ملخصًا'), action: 'book', primary: true }, { label: pick('Ask on WhatsApp', 'اسأل عبر واتساب'), action: 'wa' }] },
    { id: 'privacy', weight: 1.6, kw: ['privacy', 'confidential', 'secret', 'secure', 'safe', 'data', 'documents', 'سريه', 'خصوصيه', 'سري', 'امان', 'آمن', 'بيانات', 'مستندات', 'اوراق'],
      reply: pick('Your privacy matters. For a first inquiry, please share **only a brief outline** — no sensitive documents or detailed personal information — until the firm confirms a secure channel. I don’t send anything myself: you review every message in WhatsApp before it’s sent.',
        'خصوصيتك مهمة. في الاستفسار الأول، شارك **ملخصًا موجزًا فقط**، دون مستندات حساسة أو معلومات شخصية تفصيلية، حتى يؤكد المكتب قناة تواصل آمنة. أنا لا أرسل شيئًا بنفسي؛ فأنت تراجع كل رسالة في واتساب قبل إرسالها.'),
      buttons: [{ label: pick('Book a consultation', 'احجز استشارة'), action: 'book', primary: true }] },
    { id: 'language', weight: 1.6, kw: ['arabic', 'english', 'language', 'translate', 'عربي', 'انجليزي', 'انجليزيه', 'لغه'],
      reply: pick('The team works in **Arabic and English** — write in whichever you prefer. You can also switch the whole website using the language button at the top.',
        'يعمل الفريق **بالعربية والإنجليزية**، فاكتب باللغة التي تفضلها. ويمكنك أيضًا تبديل لغة الموقع بالكامل من زر اللغة في الأعلى.'),
      buttons: menu.slice(0, 3) },
    { id: 'about', kw: ['about', 'who are you', 'the firm', 'your firm', 'experience', 'lawyer', 'attorney', 'team', 'عن المكتب', 'من انتم', 'مين انتم', 'محامي', 'محامين', 'خبره', 'الفريق'],
      reply: pick('At Mohamy Plus, exceptional legal service begins with understanding your needs. The approach combines legal expertise, strategic thinking, and a commitment to professionalism, so every matter receives the attention it deserves.',
        'في محامي بلس، تبدأ الخدمة القانونية المتميزة بفهم احتياجاتك. يجمع النهج بين الخبرة القانونية والتفكير الاستراتيجي والالتزام بالمهنية، لتحظى كل مسألة بما تستحقه من اهتمام.'),
      buttons: [{ label: pick('Open About us', 'افتح صفحة من نحن'), action: 'nav:about' }, { label: pick('Practice areas', 'مجالات الممارسة'), action: 'intent:services' }] },
    { id: 'article', kw: ['article', 'blog', 'insight', 'briefing', 'read', 'merger article', 'competition law', 'مقال', 'مدونه', 'رؤى', 'نشره', 'قانون المنافسه'],
      reply: pick('The latest briefing is **“Mergers, Demergers & Acquisitions under Egyptian Law”** — a practical guide to three distinct legal mechanisms and the merger-control regime that applies to major transactions.',
        'أحدث نشرة هي **«الاندماج والتقسيم والاستحواذ في القانون المصري»**، وهي دليل عملي لثلاث آليات قانونية مستقلة ونظام الرقابة المسبقة الذي يسري على الصفقات الكبرى.'),
      buttons: [{ label: pick('Read the article', 'اقرأ المقال'), action: 'nav:article' }, { label: pick('All insights', 'كل الرؤى'), action: 'nav:insights' }] },
    { id: 'urgent', weight: 2, kw: ['urgent', 'emergency', 'asap', 'immediately', 'right now', 'arrested', 'detained', 'deadline', 'tomorrow court', 'عاجل', 'ضروري', 'حالا', 'فورا', 'طوارئ', 'اتقبض', 'محبوس', 'مستعجل', 'بسرعه'],
      reply: pick('If your matter is urgent, the quickest route is to **call the team** or message them on WhatsApp now. You can also send a request marked **time-sensitive**.',
        'إذا كانت مسألتك عاجلة، فأسرع طريق هو **الاتصال بالفريق** أو مراسلته عبر واتساب الآن. ويمكنك أيضًا إرسال طلب مُعلَّم بأنه **مرتبط بمهلة زمنية**.'),
      buttons: [{ label: pick(`Call ${site.phoneDisplay}`, `اتصل ${site.phoneDisplay}`), action: 'tel', primary: true }, { label: pick('WhatsApp now', 'واتساب الآن'), action: 'wa' }, { label: pick('Time-sensitive request', 'طلب عاجل'), action: 'book:urgent' }] },
    { id: 'pages', kw: ['pages', 'navigate', 'browse', 'site map', 'sitemap', 'menu of pages', 'where can i find', 'الصفحات', 'تصفح', 'خريطه الموقع', 'فين الاقي'],
      reply: pick('Where would you like to go?', 'إلى أين تودّ الذهاب؟'),
      buttons: Object.entries(pageInfo).map(([k, v]) => ({ label: L(v.label), action: `nav:${k}` })) },

    // ---- practice areas ----
    ...practiceAreas.map(a => ({
      id: `area-${a.id}`, kw: areaKeywords[a.id], area: a.id,
      reply: `**${L(a.title)}**\n${L(a.short)}\n${pick('Matters include: ', 'وتشمل المسائل: ')}${a.matters.map(L).join(pick(', ', '، '))}.`,
      buttons: [
        { label: pick('Book a consultation', 'احجز استشارة'), action: `book:${areaCategory[a.id]}`, primary: true },
        { label: pick('View this area', 'اعرض هذا المجال'), action: `nav:practice#${a.id}` },
        { label: pick('Other areas', 'مجالات أخرى'), action: 'intent:services' },
      ],
    })),

    // ---- navigation (only when the visitor names a page and asks to go) ----
    ...Object.entries(pageInfo).map(([k, v]) => ({
      id: `page-${k}`, kw: v.kw, nav: k, needsNavVerb: true, weight: 2,
      reply: pick(`Opening **${L(v.label)}** for you…`, `جارٍ فتح **${L(v.label)}**…`),
      buttons: [{ label: pick(`Open ${L(v.label)}`, `افتح ${L(v.label)}`), action: `nav:${k}`, primary: true }],
    })),

    // ---- booking trigger ----
    { id: 'book', weight: 1.2, kw: ['book', 'appointment', 'consult', 'schedul', 'meeting', 'meet', 'reserve', 'session', 'hire', 'need a lawyer', 'حجز', 'احجز', 'موعد', 'ميعاد', 'استشاره', 'مقابله', 'جلسه', 'اقابل', 'محتاج محامي', 'عايز محامي', 'اريد محامي'], action: 'book' },
  ];

  // Phrases that ask for a legal opinion — Phoenix must not answer them.
  const adviceTriggers = ['will i win', 'can i win', 'my chances', 'is it legal', 'am i allowed', 'can they', 'should i', 'what should i do', 'is it possible to', 'how long will', 'will i get', 'هكسب', 'هل اكسب', 'فرصتي', 'هل يحق', 'من حقي', 'هل يجوز', 'قانوني ولا', 'اعمل ايه', 'ماذا افعل', 'هل ممكن', 'هاخد', 'هل اقدر', 'ينفع'];

  const ui = {
    lang,
    name: pick('Phoenix', 'فينيكس'),
    subtitle: pick('Mohamy Plus assistant', 'مساعد محامي بلس'),
    status: pick('Online · replies instantly', 'متصل · يرد فورًا'),
    launcher: pick('Ask Phoenix', 'اسأل فينيكس'),
    open: pick('Open the Phoenix assistant', 'افتح مساعد فينيكس'),
    close: pick('Close the assistant', 'إغلاق المساعد'),
    restart: pick('Start a new conversation', 'ابدأ محادثة جديدة'),
    teaser: pick('Hi, I’m Phoenix. Need help finding your way or booking a consultation?', 'مرحبًا، أنا فينيكس. هل تحتاج إلى مساعدة في التنقل أو حجز استشارة؟'),
    teaserClose: pick('Dismiss', 'إخفاء'),
    placeholder: pick('Ask about services, pages or booking…', 'اسأل عن الخدمات أو الصفحات أو الحجز…'),
    placeholderInput: pick('Type your answer…', 'اكتب إجابتك…'),
    send: pick('Send', 'إرسال'),
    typing: pick('Phoenix is typing', 'فينيكس يكتب'),
    you: pick('You', 'أنت'),
    disclaimer: pick('Automated assistant, not legal advice. Please don’t share sensitive details.', 'مساعد آلي وليس مشورة قانونية. يُرجى عدم مشاركة تفاصيل حساسة.'),
    welcome: pick('Hello, I’m **Phoenix**, the Mohamy Plus assistant. I can help you find the right practice area, move around the site, or prepare a consultation request for WhatsApp. How can I help?',
      'مرحبًا، أنا **فينيكس**، مساعد محامي بلس. أستطيع مساعدتك في الوصول إلى مجال الممارسة المناسب، والتنقل في الموقع، وإعداد طلب استشارة عبر واتساب. كيف أساعدك؟'),
    fallback: pick('I’m not completely sure I understood. I can help with practice areas, booking a consultation, how the process works, or contact details — or I can send your question straight to the team on WhatsApp.',
      'لست متأكدًا تمامًا من أنني فهمت. أستطيع المساعدة في مجالات الممارسة أو حجز استشارة أو شرح خطوات العمل أو بيانات التواصل، أو إرسال سؤالك مباشرة إلى الفريق عبر واتساب.'),
    askTeam: pick('Send my question to the team', 'أرسل سؤالي إلى الفريق'),
    advice: pick('That depends on the specific facts of your situation, so it needs a qualified lawyer rather than an automated assistant. The team can review your matter and explain your options.',
      'يتوقف ذلك على الوقائع المحددة لحالتك، لذا يحتاج إلى محامٍ مؤهل لا إلى مساعد آلي. يستطيع الفريق مراجعة مسألتك وشرح الخيارات المتاحة لك.'),
    navigating: pick('Taking you there…', 'جارٍ الانتقال…'),
    menu,
    waQuestion: pick('Hello Mohamy Plus, I have a question:', 'مرحبًا محامي بلس، لدي سؤال:'),
  };

  // ---- booking flow ----
  const booking = {
    start: pick('Let’s prepare your consultation request. It takes about a minute, and nothing is sent until you review it in WhatsApp. You can type **cancel** at any time.',
      'لنُعدّ طلب الاستشارة معًا. يستغرق ذلك دقيقة تقريبًا، ولن يُرسل شيء قبل أن تراجعه في واتساب. يمكنك كتابة **إلغاء** في أي وقت.'),
    cancelWords: ['cancel', 'stop', 'quit', 'exit', 'الغاء', 'الغي', 'توقف', 'خروج', 'لا شكرا'],
    skipWords: ['skip', 'no', 'none', 'nothing', 'تخطي', 'تخطى', 'لا', 'مفيش', 'لا يوجد'],
    cancelled: pick('No problem, I’ve cancelled the request. How else can I help?', 'لا مشكلة، ألغيت الطلب. كيف يمكنني مساعدتك؟'),
    back: pick('Back', 'رجوع'),
    skip: pick('Skip', 'تخطٍّ'),
    steps: [
      { key: 'category', ask: pick('What does your matter relate to?', 'بماذا تتعلق مسألتك؟'),
        options: intakeCategories.map(c => ({ value: c.value, label: L(c.label) })) },
      { key: 'priority', ask: pick('How urgent is it?', 'ما مدى إلحاح المسألة؟'),
        options: [
          { value: 'Standard', label: pick('Standard', 'عادي') },
          { value: 'Urgent', label: pick('Urgent', 'عاجل') },
          { value: 'Time-sensitive', label: pick('Time-sensitive', 'مرتبط بمهلة زمنية') },
        ] },
      { key: 'when', ask: pick('When would you prefer to talk? The team will confirm the exact time.', 'متى تفضّل التواصل؟ سيؤكد الفريق الموعد بالتحديد.'),
        options: [
          { value: 'As soon as possible', label: pick('As soon as possible', 'في أقرب وقت') },
          { value: 'This week', label: pick('This week', 'هذا الأسبوع') },
          { value: 'Next week', label: pick('Next week', 'الأسبوع القادم') },
        ], free: true },
      { key: 'time', ask: pick('Which time of day suits you best?', 'أي وقت من اليوم يناسبك؟'),
        options: [
          { value: 'Morning', label: pick('Morning', 'صباحًا') },
          { value: 'Afternoon', label: pick('Afternoon', 'بعد الظهر') },
          { value: 'Evening', label: pick('Evening', 'مساءً') },
          { value: 'Any time', label: pick('Any time', 'أي وقت') },
        ], free: true },
      { key: 'summary', ask: pick('Briefly, what do you need help with? A sentence or two is enough — please avoid sensitive details.', 'باختصار، بماذا تحتاج إلى المساعدة؟ تكفي جملة أو جملتان، ويُرجى تجنّب التفاصيل الحساسة.'),
        input: 'text', optional: true, max: 600 },
      { key: 'name', ask: pick('What name should the team use?', 'ما الاسم الذي يستخدمه الفريق؟'), input: 'text', max: 80,
        error: pick('Please type your name or your organization’s name.', 'يُرجى كتابة اسمك أو اسم الجهة.') },
      { key: 'contact', ask: pick('Finally, your phone/WhatsApp number or email, so the team can reply.', 'وأخيرًا، رقم هاتفك/واتساب أو بريدك الإلكتروني ليتمكن الفريق من الرد.'), input: 'contact', max: 80,
        error: pick('That doesn’t look like a phone number or email. Please check and try again.', 'لا يبدو هذا رقم هاتف أو بريدًا إلكترونيًا صحيحًا. يُرجى المراجعة والمحاولة مرة أخرى.') },
    ],
    review: pick('Here’s your request. Review it, then send it from WhatsApp:', 'هذا طلبك. راجعه ثم أرسله من واتساب:'),
    labels: {
      category: pick('Practice area', 'مجال الخدمة'), priority: pick('Priority', 'الأولوية'), when: pick('Preferred day', 'اليوم المفضل'),
      time: pick('Preferred time', 'الوقت المفضل'), summary: pick('Summary', 'الملخص'), name: pick('Name', 'الاسم'), contact: pick('Contact', 'التواصل'),
    },
    none: pick('Not provided', 'غير مذكور'),
    sendWa: pick('Open in WhatsApp', 'افتح في واتساب'),
    edit: pick('Start over', 'ابدأ من جديد'),
    cancel: pick('Cancel', 'إلغاء'),
    sent: pick('Your draft is open in WhatsApp — review it and press **Send** there. If WhatsApp didn’t open, use the button below. The team will follow up to confirm availability.',
      'فُتحت المسودة في واتساب؛ راجعها واضغط **إرسال** هناك. إذا لم يُفتح واتساب، استخدم الزر أدناه. سيتابع الفريق معك لتأكيد الموعد.'),
    reopen: pick('Open WhatsApp again', 'افتح واتساب مرة أخرى'),
    msgTitle: pick('Mohamy Plus — consultation request (via Phoenix)', 'محامي بلس — طلب استشارة (عبر فينيكس)'),
    preselected: pick('I’ve noted **{area}**. ', 'سجّلتُ **{area}**. '),
  };

  return {
    ui, booking, intents, adviceTriggers,
    pages: Object.fromEntries(Object.keys(pageInfo).concat(['article']).map(k => [k, pages[k]])),
    wa: site.whatsapp, phone: site.phone, email: site.email,
  };
}

export function phoenixData(lang) {
  return `/* Generated by src/build.mjs from src/phoenix/knowledge.mjs — do not edit. */\nwindow.PHOENIX_DATA=${JSON.stringify(knowledge(lang))};\n`;
}
