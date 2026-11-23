// "Mergers, Demergers & Acquisitions under Egyptian Law" — the firm's published article.
// Blocks: { h2, id } | { p } | { ul: [...] } | { dl: [[term, text], ...] }

export const article = {
  slug: 'blog-single.html',
  image: 'image_2',
  category: { en: 'Corporate & M&A', ar: 'الشركات والاستحواذ' },
  tags: [
    { en: 'Mergers', ar: 'الاندماج' }, { en: 'Demergers', ar: 'التقسيم' }, { en: 'Acquisitions', ar: 'الاستحواذ' },
    { en: 'Competition law', ar: 'قانون المنافسة' }, { en: 'Corporate law', ar: 'قانون الشركات' },
  ],
  title: { en: 'Mergers, Demergers & Acquisitions under Egyptian Law', ar: 'الاندماج والتقسيم والاستحواذ في القانون المصري' },
  subtitle: {
    en: 'A practical guide to the core differences between three distinct legal mechanisms — and the merger-control regime that now applies to major transactions.',
    ar: 'دليل عملي للفروق الجوهرية بين ثلاث آليات قانونية مستقلة، ونظام الرقابة المسبقة الذي بات يسري على الصفقات الكبرى.',
  },
  summary: {
    en: 'An overview of mergers, demergers, acquisitions, corporate law, and transaction controls in Egypt.',
    ar: 'نظرة عامة على الاندماج والتقسيم والاستحواذ وقانون الشركات والرقابة على الصفقات في مصر.',
  },
  blocks: [
    { h2: { en: 'Introduction', ar: 'مقدمة' }, id: 'introduction' },
    { p: {
      en: "In Egypt's dynamic business landscape, corporate restructuring serves as an indispensable strategic tool for growth, expansion, and stronger competitive capabilities. Although the terms “merger,” “demerger,” and “acquisition” are often mentioned together, they are not synonymous. They are distinct legal mechanisms, each with its own nature, procedures, and implications. Understanding these differences is not merely an academic exercise; it is the cornerstone of sound strategic decision-making that achieves corporate objectives while mitigating legal risk.",
      ar: 'في بيئة الأعمال المصرية المتغيرة، تمثل عمليات إعادة هيكلة الشركات أداة استراتيجية لا غنى عنها لتحقيق النمو والتوسع وتعزيز القدرة التنافسية. ومع أن مصطلحات «الاندماج» و«التقسيم» و«الاستحواذ» كثيرًا ما تُذكر معًا، فإنها ليست مترادفة؛ بل هي آليات قانونية مستقلة، لكل منها طبيعتها وإجراءاتها وآثارها. وفهم هذه الفروق ليس ترفًا أكاديميًا، بل هو حجر الأساس لاتخاذ قرارات استراتيجية سليمة تحقق أهداف الشركة وتحدّ من المخاطر القانونية.',
    } },
    { p: {
      en: 'These operations are governed by a precise, multi-layered legislative framework, primarily based on Companies Law No. 159 of 1981 and its Executive Regulations, which regulate mergers and demergers. When listed companies are involved, Capital Market Law No. 95 of 1992 becomes paramount, imposing strict rules on acquisitions to protect investors. More recently, Competition Law No. 3 of 2005, as amended by Law No. 175 of 2022, introduced a pre-merger control system for major transactions.',
      ar: 'وتخضع هذه العمليات لإطار تشريعي دقيق ومتعدد المستويات، يقوم أساسًا على قانون الشركات رقم 159 لسنة 1981 ولائحته التنفيذية اللذين ينظمان الاندماج والتقسيم. وحين يتعلق الأمر بشركات مقيدة في البورصة، يتصدر قانون سوق رأس المال رقم 95 لسنة 1992 المشهد بقواعد صارمة للاستحواذ تهدف إلى حماية المستثمرين. ومؤخرًا، أضاف قانون حماية المنافسة ومنع الممارسات الاحتكارية رقم 3 لسنة 2005، المعدّل بالقانون رقم 175 لسنة 2022، نظامًا للرقابة المسبقة على الصفقات الكبرى.',
    } },

    { h2: { en: 'Mergers: a complete legal union', ar: 'الاندماج: اتحاد قانوني كامل' }, id: 'mergers' },
    { p: {
      en: 'A merger is a legal process whereby two or more companies are unified into a single legal entity. Its defining characteristic is the dissolution of the legal personality of the merged company, which is fully absorbed into the surviving company. Mergers commonly take one of two forms:',
      ar: 'الاندماج عملية قانونية تتوحد بموجبها شركتان أو أكثر في كيان قانوني واحد. وسمته المميزة انقضاء الشخصية الاعتبارية للشركة المندمجة وذوبانها كليًا في الشركة الدامجة. ويتخذ الاندماج عادة إحدى صورتين:',
    } },
    { dl: [
      [{ en: 'Merger by absorption', ar: 'الاندماج بطريق الضم' }, { en: 'One company absorbs another. The absorbing company continues to exist, while the absorbed company is dissolved.', ar: 'تضم شركة شركة أخرى؛ فتستمر الشركة الدامجة، وتنقضي الشركة المندمجة.' }],
      [{ en: 'Merger by consolidation', ar: 'الاندماج بطريق المزج' }, { en: 'Two or more companies are dissolved to form a new company.', ar: 'تنقضي شركتان أو أكثر لتنشأ عنها شركة جديدة.' }],
    ] },
    { p: {
      en: 'A merger may involve universal succession, but the effect on each asset, liability, contract, and required registration depends on the applicable law and the transaction structure. Formal approvals and regulatory steps may also apply, including procedures before the General Authority for Investment and Free Zones (GAFI).',
      ar: 'وقد يترتب على الاندماج خلافة عامة، غير أن أثره في كل أصل والتزام وعقد وقيد مطلوب يتوقف على القانون الواجب التطبيق وهيكل الصفقة. وقد تلزم كذلك موافقات رسمية وخطوات تنظيمية، منها إجراءات أمام الهيئة العامة للاستثمار والمناطق الحرة.',
    } },

    { h2: { en: 'Demergers: an organized legal separation', ar: 'التقسيم: انفصال قانوني منظم' }, id: 'demergers' },
    { p: {
      en: 'A demerger is the inverse of a merger. Instead of consolidation, it separates the assets and liabilities of a single company into two or more independent legal entities. Companies turn to demergers to achieve specific strategic objectives, such as focusing on core activities, isolating higher-risk operations, or preparing part of the business for a future sale.',
      ar: 'التقسيم هو الوجه المقابل للاندماج؛ فبدلًا من التوحيد، يفصل أصول شركة واحدة والتزاماتها إلى كيانين قانونيين مستقلين أو أكثر. وتلجأ الشركات إلى التقسيم لتحقيق أهداف استراتيجية محددة، مثل التركيز على النشاط الرئيسي، أو عزل الأنشطة الأعلى مخاطرة، أو تهيئة جزء من الأعمال لبيع مستقبلي.',
    } },
    { p: {
      en: "A demerger results in new companies, each with an independent legal personality upon registration in the Commercial Registry. As with a merger, it requires formal procedures, including the valuation of the demerged assets by specialized committees at GAFI and the approval of the company's extraordinary general assembly.",
      ar: 'وينتج عن التقسيم شركات جديدة تكتسب كل منها شخصية اعتبارية مستقلة بقيدها في السجل التجاري. وكما في الاندماج، يتطلب التقسيم إجراءات رسمية، منها تقييم الأصول محل التقسيم بمعرفة اللجان المختصة بالهيئة العامة للاستثمار، وموافقة الجمعية العامة غير العادية للشركة.',
    } },

    { h2: { en: 'Acquisitions: the purchase of control', ar: 'الاستحواذ: شراء السيطرة' }, id: 'acquisitions' },
    { p: {
      en: 'An acquisition is fundamentally different from a merger. It is not a legal union, but a transaction to purchase a controlling stake in another company in order to direct its management and strategic decisions. The key distinction is that the acquired company retains its independent legal personality: what changes is the ownership and control structure, not the legal existence of the company. The process depends on whether the target is listed:',
      ar: 'يختلف الاستحواذ اختلافًا جوهريًا عن الاندماج؛ فهو ليس اتحادًا قانونيًا، بل صفقة لشراء حصة مسيطرة في شركة أخرى بهدف توجيه إدارتها وقراراتها الاستراتيجية. والفارق الأساسي أن الشركة المستحوذ عليها تحتفظ بشخصيتها الاعتبارية المستقلة؛ فالذي يتغير هو هيكل الملكية والسيطرة، لا الوجود القانوني للشركة. وتختلف الإجراءات بحسب ما إذا كانت الشركة المستهدفة مقيدة في البورصة:',
    } },
    { dl: [
      [{ en: 'Unlisted companies', ar: 'الشركات غير المقيدة' }, { en: 'Transactions commonly use negotiated contracts such as a share purchase agreement. Legal and financial due diligence helps the parties assess the target before completion.', ar: 'تتم الصفقات عادة بعقود تفاوضية مثل اتفاقية شراء الأسهم، ويساعد الفحص القانوني والمالي النافي للجهالة الأطراف على تقييم الشركة المستهدفة قبل الإتمام.' }],
      [{ en: 'Listed companies', ar: 'الشركات المقيدة' }, { en: "Financial Regulatory Authority (FRA) rules include a mandatory tender offer trigger when an acquirer reaches one-third or more of a target's capital or voting rights. Additional triggers and exceptions may apply, so confirm the current rules against the transaction facts.", ar: 'تتضمن قواعد الهيئة العامة للرقابة المالية التزامًا بتقديم عرض شراء إجباري متى بلغ المستحوذ ثلث رأس مال الشركة المستهدفة أو حقوق التصويت فيها أو أكثر. وقد توجد حالات واستثناءات أخرى، لذا تحقّق من القواعد السارية في ضوء وقائع الصفقة.' }],
    ] },

    { h2: { en: 'The most significant development: pre-transaction control', ar: 'التطور الأبرز: الرقابة المسبقة على الصفقات' }, id: 'merger-control' },
    { p: {
      en: "Egypt's ex-ante merger-control regime took effect on June 1, 2024. An in-scope economic concentration that meets the applicable notification thresholds must be notified to the Egyptian Competition Authority (ECA) before implementation.",
      ar: 'دخل نظام الرقابة المسبقة على التركزات الاقتصادية في مصر حيز النفاذ في 1 يونيو 2024. ويجب إخطار جهاز حماية المنافسة بأي تركز اقتصادي يدخل في نطاق النظام ويستوفي حدود الإخطار المقررة، وذلك قبل تنفيذه.',
    } },
    { p: {
      en: 'The domestic threshold includes combined Egyptian annual turnover or assets above EGP 900 million, together with at least two concerned persons each having Egyptian annual turnover above EGP 200 million. The international threshold includes worldwide combined annual turnover or assets above EGP 7.5 billion, together with Egyptian annual turnover above EGP 200 million for the target.',
      ar: 'ويشمل الحد المحلي تجاوز إجمالي رقم الأعمال السنوي أو الأصول في مصر 900 مليون جنيه مصري، مع وجود شخصين معنيين على الأقل يتجاوز رقم أعمال كل منهما في مصر 200 مليون جنيه سنويًا. ويشمل الحد الدولي تجاوز إجمالي رقم الأعمال السنوي أو الأصول عالميًا 7.5 مليار جنيه مصري، مع تجاوز رقم أعمال الشركة المستهدفة في مصر 200 مليون جنيه سنويًا.',
    } },
    { note: {
      en: 'These figures are a summary: the definitions of concerned persons, calculation rules, and applicable exceptions affect whether a filing is required. Check current ECA guidance before signing or implementing a transaction.',
      ar: 'هذه الأرقام موجزة؛ إذ تؤثر تعريفات الأشخاص المعنيين وقواعد الحساب والاستثناءات المقررة في مدى وجوب الإخطار. راجع إرشادات جهاز حماية المنافسة السارية قبل توقيع أي صفقة أو تنفيذها.',
    } },

    { h2: { en: 'Practical comparison and strategic considerations', ar: 'مقارنة عملية واعتبارات استراتيجية' }, id: 'comparison' },
    { p: {
      en: 'Compare the legal process, timing, tax treatment, and effect on employees before choosing a structure:',
      ar: 'قارن بين الإجراءات القانونية والتوقيت والمعاملة الضريبية والأثر على العاملين قبل اختيار الهيكل المناسب:',
    } },
    { dl: [
      [{ en: 'Tax', ar: 'الضرائب' }, { en: 'Tax consequences depend on the structure and facts. Specific tax deferral treatment may be available under statutory conditions; review the proposal with Egyptian tax counsel.', ar: 'تتوقف الآثار الضريبية على الهيكل والوقائع، وقد تتاح معاملة ضريبية مؤجلة بشروط قانونية محددة؛ فراجع المقترح مع مستشار ضريبي مصري.' }],
      [{ en: 'Employment', ar: 'العاملون' }, { en: 'Effects differ between mergers, demergers, and share acquisitions. Confirm employee rights, transfer requirements, and liabilities under current law.', ar: 'تختلف الآثار بين الاندماج والتقسيم والاستحواذ على الأسهم؛ فتحقّق من حقوق العاملين ومتطلبات النقل والالتزامات وفق القانون الساري.' }],
      [{ en: 'Timing and approvals', ar: 'التوقيت والموافقات' }, { en: 'Contractual acquisitions may involve fewer corporate steps, while mergers and demergers can require additional valuations and regulatory approvals.', ar: 'قد يتطلب الاستحواذ التعاقدي خطوات مؤسسية أقل، بينما قد يستلزم الاندماج والتقسيم تقييمات وموافقات تنظيمية إضافية.' }],
    ] },

    { h2: { en: 'Conclusion: which path is right for your company?', ar: 'الخلاصة: أي طريق يناسب شركتك؟' }, id: 'conclusion' },
    { p: {
      en: "The right structure depends on the company's objectives, approvals, and risk profile:",
      ar: 'يتوقف الهيكل المناسب على أهداف الشركة والموافقات المطلوبة ودرجة المخاطر:',
    } },
    { dl: [
      [{ en: 'Merger', ar: 'الاندماج' }, { en: 'Consider when the parties seek closer integration, after assessing legal, regulatory, and tax effects.', ar: 'يُنظر فيه حين يسعى الأطراف إلى تكامل أوثق، بعد تقييم آثاره القانونية والتنظيمية والضريبية.' }],
      [{ en: 'Demerger', ar: 'التقسيم' }, { en: 'Consider when restructuring operations or separating business lines is a priority.', ar: 'يُنظر فيه حين تكون إعادة هيكلة العمليات أو فصل خطوط الأعمال أولوية.' }],
      [{ en: 'Acquisition', ar: 'الاستحواذ' }, { en: 'Consider when the intended outcome is a change in ownership or control without combining legal entities.', ar: 'يُنظر فيه حين تكون الغاية تغيير الملكية أو السيطرة دون دمج الكيانات القانونية.' }],
    ] },
    { p: {
      en: 'Transaction-specific advice should account for corporate, competition, securities, tax, employment, and sector-specific rules.',
      ar: 'وينبغي أن تراعي المشورة الخاصة بكل صفقة قواعد الشركات والمنافسة والأوراق المالية والضرائب والعمل، والقواعد الخاصة بكل قطاع.',
    } },
  ],
  sources: [
    { label: { en: 'ECA — ex-ante merger control guidance', ar: 'جهاز حماية المنافسة — إرشادات الرقابة المسبقة على التركزات' }, href: 'https://eca.org.eg/en-us/%D8%AC%D9%87%D8%A7%D8%B2-%D8%AD%D9%85%D8%A7%D9%8A%D8%A9-%D8%A7%D9%84%D9%85%D9%86%D8%A7%D9%81%D8%B3%D8%A9/economic-concentrations/ex-ante-control-of-economic-concentrations' },
    { label: { en: 'ECA — notification threshold explainer (PDF)', ar: 'جهاز حماية المنافسة — شرح حدود الإخطار (PDF)' }, href: 'https://eca.org.eg/getattachment/f22fb654-aabc-444f-b783-d9a51d69ea98/Ex-ante-Control-of-Economic-Concentrations.pdf' },
    { label: { en: 'FRA — capital market regulations', ar: 'الهيئة العامة للرقابة المالية — تشريعات سوق المال' }, href: 'https://fra.gov.eg/en/%D8%AA%D8%B4%D8%B1%D9%8A%D8%B9%D8%A7%D8%AA-%D9%81%D9%8A-%D9%85%D8%AC%D8%A7%D9%84-%D8%B3%D9%88%D9%82-%D8%A7%D9%84%D9%85%D8%A7%D9%84/' },
  ],
};

export function readingMinutes(lang) {
  const text = article.blocks.map(b => (b.p || b.note || b.h2 || { en: '', ar: '' })[lang] + ' ' + (b.dl || []).map(([a, c]) => a[lang] + ' ' + c[lang]).join(' ')).join(' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / (lang === 'ar' ? 180 : 220)));
}
