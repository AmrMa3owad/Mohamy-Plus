// Shared bilingual content. Each text value is { en, ar }.

export const practiceAreas = [
  {
    id: 'corporate', icon: 'briefcase', image: 'case-7',
    title: { en: 'Corporate & Commercial Law', ar: 'قانون الشركات والقانون التجاري' },
    short: {
      en: 'Company formation, corporate governance, commercial contracts, and regulatory compliance tailored to business needs.',
      ar: 'تأسيس الشركات والحوكمة المؤسسية والعقود التجارية والامتثال التنظيمي، بما يلائم احتياجات الأعمال.',
    },
    matters: [
      { en: 'Company formation', ar: 'تأسيس الشركات' },
      { en: 'Corporate governance', ar: 'الحوكمة المؤسسية' },
      { en: 'Commercial contracts', ar: 'العقود التجارية' },
      { en: 'Regulatory compliance', ar: 'الامتثال التنظيمي' },
    ],
  },
  {
    id: 'family', icon: 'family', image: 'case-3',
    title: { en: 'Family Law', ar: 'قانون الأسرة' },
    short: {
      en: 'Legal assistance in divorce, custody, maintenance, inheritance, and other family-related matters.',
      ar: 'المساعدة القانونية في الطلاق والحضانة والنفقة والميراث وسائر المسائل الأسرية.',
    },
    matters: [
      { en: 'Divorce', ar: 'الطلاق' },
      { en: 'Custody', ar: 'الحضانة' },
      { en: 'Maintenance', ar: 'النفقة' },
      { en: 'Inheritance', ar: 'المواريث' },
    ],
  },
  {
    id: 'criminal', icon: 'handcuffs', image: 'case-5',
    title: { en: 'Criminal Law', ar: 'القانون الجنائي' },
    short: {
      en: 'Legal defense and representation in criminal investigations, proceedings, and related matters.',
      ar: 'الدفاع والتمثيل القانوني في التحقيقات والإجراءات الجنائية والمسائل المتصلة بها.',
    },
    matters: [
      { en: 'Criminal investigations', ar: 'التحقيقات الجنائية' },
      { en: 'Criminal proceedings', ar: 'الإجراءات والمحاكمات الجنائية' },
      { en: 'Defense & representation', ar: 'الدفاع والتمثيل القانوني' },
    ],
  },
  {
    id: 'real-estate', icon: 'house', image: 'case-1',
    title: { en: 'Real Estate Law', ar: 'القانون العقاري' },
    short: {
      en: 'Property transactions, ownership disputes, real estate contracts, and related legal procedures.',
      ar: 'المعاملات العقارية ومنازعات الملكية والعقود العقارية والإجراءات القانونية المتصلة بها.',
    },
    matters: [
      { en: 'Property transactions', ar: 'المعاملات العقارية' },
      { en: 'Ownership disputes', ar: 'منازعات الملكية' },
      { en: 'Real estate contracts', ar: 'العقود العقارية' },
      { en: 'Related procedures', ar: 'الإجراءات ذات الصلة' },
    ],
  },
  {
    id: 'employment', icon: 'workspace', image: 'case-6',
    title: { en: 'Employment & Labor Law', ar: 'قانون العمل' },
    short: {
      en: 'Employment contracts, workplace disputes, termination matters, and labor law compliance.',
      ar: 'عقود العمل ومنازعات بيئة العمل ومسائل إنهاء الخدمة والامتثال لقانون العمل.',
    },
    matters: [
      { en: 'Employment contracts', ar: 'عقود العمل' },
      { en: 'Workplace disputes', ar: 'منازعات العمل' },
      { en: 'Termination matters', ar: 'إنهاء علاقة العمل' },
      { en: 'Labor law compliance', ar: 'الامتثال لقانون العمل' },
    ],
  },
  {
    id: 'civil', icon: 'gavel', image: 'case-4',
    title: { en: 'Civil Law & Litigation', ar: 'القانون المدني والتقاضي' },
    short: {
      en: 'Civil disputes, contractual claims, compensation matters, and legal representation before courts.',
      ar: 'المنازعات المدنية والمطالبات التعاقدية ودعاوى التعويض والتمثيل القانوني أمام المحاكم.',
    },
    matters: [
      { en: 'Civil disputes', ar: 'المنازعات المدنية' },
      { en: 'Contractual claims', ar: 'المطالبات التعاقدية' },
      { en: 'Compensation matters', ar: 'دعاوى التعويض' },
      { en: 'Court representation', ar: 'التمثيل أمام المحاكم' },
    ],
  },
  {
    id: 'capital-markets', icon: 'chart', image: 'image_1',
    title: { en: 'Capital Markets', ar: 'أسواق المال' },
    short: {
      en: 'Legal advisory on securities transactions, capital market regulations, and compliance requirements.',
      ar: 'الاستشارات القانونية في معاملات الأوراق المالية ولوائح سوق المال ومتطلبات الامتثال.',
    },
    matters: [
      { en: 'Securities transactions', ar: 'معاملات الأوراق المالية' },
      { en: 'Capital market regulations', ar: 'لوائح سوق المال' },
      { en: 'Compliance requirements', ar: 'متطلبات الامتثال' },
    ],
  },
  {
    id: 'mergers-acquisitions', icon: 'diagram', image: 'image_2',
    title: { en: 'Mergers & Acquisitions', ar: 'الاندماج والاستحواذ' },
    short: {
      en: 'Legal due diligence, transaction structuring, corporate acquisitions, and restructuring.',
      ar: 'الفحص القانوني النافي للجهالة وهيكلة الصفقات والاستحواذ على الشركات وإعادة الهيكلة.',
    },
    matters: [
      { en: 'Legal due diligence', ar: 'الفحص القانوني النافي للجهالة' },
      { en: 'Transaction structuring', ar: 'هيكلة الصفقات' },
      { en: 'Corporate acquisitions', ar: 'الاستحواذ على الشركات' },
      { en: 'Restructuring', ar: 'إعادة الهيكلة' },
    ],
  },
  {
    id: 'arbitration', icon: 'scale', image: 'image_3',
    title: { en: 'Arbitration & Dispute Resolution', ar: 'التحكيم وتسوية المنازعات' },
    short: {
      en: 'Arbitration, negotiation, and alternative dispute resolution for commercial and civil matters.',
      ar: 'التحكيم والتفاوض والوسائل البديلة لتسوية المنازعات التجارية والمدنية.',
    },
    matters: [
      { en: 'Arbitration', ar: 'التحكيم' },
      { en: 'Negotiation', ar: 'التفاوض' },
      { en: 'Alternative dispute resolution', ar: 'الوسائل البديلة لتسوية المنازعات' },
    ],
  },
];

// Categories offered in the WhatsApp intake (approved by the client).
export const intakeCategories = [
  { value: 'Corporate & M&A', icon: 'building', label: { en: 'Corporate & M&A', ar: 'الشركات والاستحواذ' } },
  { value: 'Arbitration & Dispute', icon: 'shield', label: { en: 'Arbitration & Dispute', ar: 'التحكيم والمنازعات' } },
  { value: 'Capital Markets', icon: 'chart', label: { en: 'Capital Markets', ar: 'أسواق المال' } },
  { value: 'Criminal Defense', icon: 'gavel', label: { en: 'Criminal Defense', ar: 'الدفاع الجنائي' } },
  { value: 'Real Estate Law', icon: 'houses', label: { en: 'Real Estate Law', ar: 'القانون العقاري' } },
  { value: 'Family & Estate', icon: 'people-fill', label: { en: 'Family & Estate', ar: 'الأسرة والتركات' } },
  { value: 'Other service', icon: 'question', label: { en: 'Other service', ar: 'خدمة أخرى' } },
];

export const introCards = [
  {
    icon: 'compass',
    title: { en: 'The Compass of Clarity', ar: 'بوصلة الوضوح' },
    text: {
      en: 'Making complex legal matters easier to understand through informed guidance and a clear understanding of your available options.',
      ar: 'نجعل المسائل القانونية المعقدة أيسر فهمًا، من خلال توجيه مستنير ورؤية واضحة للخيارات المتاحة أمامك.',
    },
  },
  {
    icon: 'award',
    title: { en: 'Strategic Legal Solutions', ar: 'حلول قانونية استراتيجية' },
    text: {
      en: 'Developing thoughtful legal approaches tailored to your circumstances, objectives, and the complexities of each matter.',
      ar: 'نضع مناهج قانونية مدروسة تلائم ظروفك وأهدافك وتعقيدات كل مسألة.',
    },
  },
  {
    icon: 'patch-check',
    title: { en: 'A Commitment to Your Interests', ar: 'التزام بمصالحك' },
    text: {
      en: "Approaching every legal matter with dedication, attention, and a genuine commitment to our clients' needs.",
      ar: 'نتناول كل مسألة قانونية بتفانٍ واهتمام، والتزام حقيقي باحتياجات عملائنا.',
    },
  },
  {
    icon: 'bank',
    title: { en: 'Integrity Without Compromise', ar: 'نزاهة بلا تنازل' },
    text: {
      en: 'Upholding the highest standards of professionalism, discretion, transparency, and responsibility in every interaction.',
      ar: 'نلتزم بأعلى معايير المهنية والتكتم والشفافية والمسؤولية في كل تعامل.',
    },
  },
];

export const pillars = [
  {
    icon: 'gavel',
    title: { en: 'Legal Excellence', ar: 'التميّز القانوني' },
    text: {
      en: 'Informed legal guidance grounded in knowledge, precision, and professional judgment.',
      ar: 'توجيه قانوني مستنير قائم على المعرفة والدقة والتقدير المهني السليم.',
    },
  },
  {
    icon: 'trophy',
    title: { en: 'Strategic Thinking', ar: 'التفكير الاستراتيجي' },
    text: {
      en: 'Thoughtful legal approaches designed around your objectives and the circumstances of each matter.',
      ar: 'مناهج قانونية مدروسة تُبنى حول أهدافك وملابسات كل مسألة.',
    },
  },
  {
    icon: 'patch-check',
    title: { en: 'Personalized Attention', ar: 'اهتمام شخصي' },
    text: {
      en: 'An attentive, individualized approach that recognizes the unique needs of every client.',
      ar: 'نهج فردي يقظ يراعي الاحتياجات الخاصة لكل عميل.',
    },
  },
  {
    icon: 'journal',
    title: { en: 'Principled Practice', ar: 'ممارسة قائمة على المبادئ' },
    text: {
      en: 'Professional integrity, discretion, and transparent communication at every stage.',
      ar: 'نزاهة مهنية وتكتم وتواصل شفاف في كل مرحلة.',
    },
  },
];

export const principles = [
  {
    title: { en: 'Clear Direction', ar: 'توجيه واضح' },
    text: { en: 'Understand your options and the next steps for your legal matter.', ar: 'افهم خياراتك والخطوات التالية في مسألتك القانونية.' },
  },
  {
    title: { en: 'Direct Communication', ar: 'تواصل مباشر' },
    text: { en: 'Reach our team easily and receive guidance on how to proceed.', ar: 'تواصل مع فريقنا بسهولة واحصل على إرشاد حول كيفية المضي قدمًا.' },
  },
  {
    title: { en: 'Comprehensive Support', ar: 'دعم متكامل' },
    text: { en: 'Legal assistance for individuals, families, entrepreneurs, and businesses.', ar: 'مساعدة قانونية للأفراد والأسر ورواد الأعمال والشركات.' },
  },
  {
    title: { en: 'Beyond Boundaries', ar: 'دعم بلا حدود' },
    text: { en: 'Support for a diverse range of legal matters and requirements.', ar: 'دعم لطيف واسع من المسائل والمتطلبات القانونية.' },
  },
];

export const goals = [
  {
    icon: 'shield', tag: { en: 'Accessibility & Clarity', ar: 'الإتاحة والوضوح' },
    title: { en: 'Accessible Legal Guidance', ar: 'مشورة قانونية في المتناول' },
    text: {
      en: 'Making professional legal assistance more approachable by simplifying access to guidance that addresses the needs of individuals and businesses.',
      ar: 'نجعل المساعدة القانونية المهنية أقرب إليك، بتيسير الوصول إلى إرشاد يلبي احتياجات الأفراد والشركات.',
    },
  },
  {
    icon: 'cpu', tag: { en: 'Service & Professionalism', ar: 'الخدمة والمهنية' },
    title: { en: 'Elevating Legal Service', ar: 'الارتقاء بالخدمة القانونية' },
    text: {
      en: 'Advancing a more responsive and client-centered legal experience through thoughtful coordination, clear communication, and professional care.',
      ar: 'نطوّر تجربة قانونية أسرع استجابة وأكثر تركيزًا على العميل، عبر تنسيق مدروس وتواصل واضح وعناية مهنية.',
    },
  },
  {
    icon: 'award', tag: { en: 'Trust & Long-Term Value', ar: 'الثقة والقيمة الممتدة' },
    title: { en: 'Building Lasting Trust', ar: 'بناء ثقة راسخة' },
    text: {
      en: 'Fostering lasting relationships through integrity, transparent communication, and consistent attention to the interests of those we serve.',
      ar: 'نبني علاقات دائمة قوامها النزاهة والتواصل الشفاف والاهتمام المستمر بمصالح من نخدمهم.',
    },
  },
];

export const intakeFeatures = [
  {
    icon: 'shield-lock',
    title: { en: 'Thoughtful Legal Guidance', ar: 'توجيه قانوني مدروس' },
    text: { en: 'A focused first conversation to understand your situation and discuss next steps.', ar: 'محادثة أولى مركّزة لفهم وضعك ومناقشة الخطوات التالية.' },
  },
  {
    icon: 'stopwatch',
    title: { en: 'Urgent Matters', ar: 'المسائل العاجلة' },
    text: { en: 'Mark urgent matters in your request. The team will follow up to discuss availability.', ar: 'حدّد المسائل العاجلة في طلبك، وسيتابع الفريق معك لمناقشة المواعيد المتاحة.' },
  },
  {
    icon: 'briefcase',
    title: { en: 'Personal & Business Legal Services', ar: 'خدمات قانونية للأفراد والشركات' },
    text: { en: 'Legal assistance tailored to the needs of individuals, families, entrepreneurs, and businesses.', ar: 'مساعدة قانونية مصممة لاحتياجات الأفراد والأسر ورواد الأعمال والشركات.' },
  },
];

// The process described by the firm ("from first question to next step").
export const processSteps = [
  {
    icon: 'chat',
    title: { en: 'Share a brief outline', ar: 'شارك ملخصًا موجزًا' },
    text: {
      en: 'Send a short outline of your matter through the consultation form, WhatsApp, phone, or email. Please hold back confidential documents at this stage.',
      ar: 'أرسل ملخصًا قصيرًا لمسألتك عبر نموذج الاستشارة أو واتساب أو الهاتف أو البريد الإلكتروني، مع الاحتفاظ بالمستندات السرية في هذه المرحلة.',
    },
  },
  {
    icon: 'clipboard',
    title: { en: 'Scope confirmation', ar: 'تأكيد نطاق المسألة' },
    text: {
      en: 'The team confirms whether your matter is within scope and lets you know what information will be needed.',
      ar: 'يؤكد الفريق ما إذا كانت مسألتك تقع ضمن نطاق عمله، ويوضّح لك المعلومات التي سيحتاج إليها.',
    },
  },
  {
    icon: 'calendar',
    title: { en: 'Focused consultation', ar: 'استشارة مركّزة' },
    text: {
      en: 'A focused first conversation, by appointment, to understand your situation and the outcome you are seeking.',
      ar: 'محادثة أولى مركّزة بموعد مسبق، لفهم وضعك والنتيجة التي تسعى إليها.',
    },
  },
  {
    icon: 'signpost',
    title: { en: 'Clear next steps', ar: 'خطوات تالية واضحة' },
    text: {
      en: 'You receive an explanation of the available options and the next steps, so you can decide how to proceed with confidence.',
      ar: 'تحصل على شرح للخيارات المتاحة والخطوات التالية، لتقرر كيفية المضي قدمًا بثقة.',
    },
  },
];

export const audiences = [
  { icon: 'person', title: { en: 'Individuals', ar: 'الأفراد' }, text: { en: 'Guidance on personal legal matters, from contracts and property to disputes and criminal proceedings.', ar: 'إرشاد في المسائل القانونية الشخصية، من العقود والعقارات إلى المنازعات والإجراءات الجنائية.' } },
  { icon: 'people', title: { en: 'Families', ar: 'الأسر' }, text: { en: 'Support with divorce, custody, maintenance, inheritance, and other family matters.', ar: 'دعم في الطلاق والحضانة والنفقة والميراث وغيرها من المسائل الأسرية.' } },
  { icon: 'bolt', title: { en: 'Entrepreneurs', ar: 'رواد الأعمال' }, text: { en: 'Company formation, commercial contracts, and compliance for new and growing ventures.', ar: 'تأسيس الشركات والعقود التجارية والامتثال للمشروعات الناشئة والنامية.' } },
  { icon: 'chart', title: { en: 'Investors', ar: 'المستثمرون' }, text: { en: 'Advice on transactions, securities, capital market regulations, and due diligence.', ar: 'استشارات في الصفقات والأوراق المالية ولوائح سوق المال والفحص النافي للجهالة.' } },
  { icon: 'building', title: { en: 'Businesses', ar: 'الشركات' }, text: { en: 'Corporate governance, employment matters, restructuring, and dispute resolution.', ar: 'الحوكمة المؤسسية ومسائل العمل وإعادة الهيكلة وتسوية المنازعات.' } },
];
