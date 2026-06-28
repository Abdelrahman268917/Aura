export type PortfolioItem = {
  id: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  descriptionAr: string;
  descriptionEn: string;
  relatedServiceId: string;
  relatedServiceAr: string;
  relatedServiceEn: string;
  outcomeAr: string;
  outcomeEn: string;
  image?: string;
  link?: string;
  isRealWork: boolean;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'workflow-dashboard',
    titleAr: 'نموذج لوحة تشغيل ومتابعة',
    titleEn: 'Operations Dashboard Sample',
    categoryAr: 'Workflow / Dashboard Systems',
    categoryEn: 'Workflow / Dashboard Systems',
    descriptionAr: 'مكان مخصص لإضافة لقطة حقيقية من لوحات المتابعة أو أنظمة تتبع المشاريع عند توفرها.',
    descriptionEn: 'A slot for a real screenshot of dashboards, project tracking, or operating views when available.',
    relatedServiceId: 'workflow',
    relatedServiceAr: 'تصميم نظام التشغيل وسير العمل',
    relatedServiceEn: 'Workflow & Operating System Design',
    outcomeAr: 'يوضح كيف تتحول المتابعة إلى رؤية تشغيلية واضحة.',
    outcomeEn: 'Shows how follow-up becomes a clear operating view.',
    isRealWork: false,
  },
  {
    id: 'internal-tools',
    titleAr: 'نموذج أداة داخلية',
    titleEn: 'Internal Tool Sample',
    categoryAr: 'Internal Software / Tools',
    categoryEn: 'Internal Software / Tools',
    descriptionAr: 'مكان مخصص لإضافة لقطة من أداة داخلية، نموذج إدخال، tracker، أو بوابة تشغيل.',
    descriptionEn: 'A slot for a real internal tool, form, tracker, or operations portal screenshot.',
    relatedServiceId: 'tools',
    relatedServiceAr: 'الأدوات والبرمجيات الداخلية',
    relatedServiceEn: 'Internal Software & Business Tools',
    outcomeAr: 'يوضح كيف تصبح البيانات والعمل اليومي في مكان واحد.',
    outcomeEn: 'Shows how daily work and data can live in one place.',
    isRealWork: false,
  },
  {
    id: 'ai-automation',
    titleAr: 'نموذج وكيل أو أتمتة AI',
    titleEn: 'AI Agent / Automation Sample',
    categoryAr: 'AI / Automation Systems',
    categoryEn: 'AI / Automation Systems',
    descriptionAr: 'مكان مخصص لإضافة مخطط أتمتة أو نموذج وكيل تقارير، متابعة، بحث، أو دعم مبيعات.',
    descriptionEn: 'A slot for an automation flow or reporting, follow-up, research, or sales-support agent sample.',
    relatedServiceId: 'ai',
    relatedServiceAr: 'أتمتة الذكاء الاصطناعي والوكلاء',
    relatedServiceEn: 'AI Automation & Agent Systems',
    outcomeAr: 'يوضح كيف تعمل الأتمتة داخل سير العمل وليس خارجه.',
    outcomeEn: 'Shows automation inside the workflow, not outside it.',
    isRealWork: false,
  },
  {
    id: 'growth-system',
    titleAr: 'نموذج نظام نمو ومبيعات',
    titleEn: 'Growth & Sales System Sample',
    categoryAr: 'Growth / Marketing Systems',
    categoryEn: 'Growth / Marketing Systems',
    descriptionAr: 'مكان مخصص لإضافة نموذج من تقارير نمو، CRM خفيف، أو ربط حملة بمتابعة ومبيعات.',
    descriptionEn: 'A slot for growth reporting, a lightweight CRM, or campaign-to-sales tracking sample.',
    relatedServiceId: 'growth',
    relatedServiceAr: 'أنظمة النمو والتسويق والمبيعات',
    relatedServiceEn: 'Growth, Marketing & Sales Systems',
    outcomeAr: 'يوضح كيف يتحول التسويق إلى فرص قابلة للمتابعة.',
    outcomeEn: 'Shows how marketing becomes trackable opportunities.',
    isRealWork: false,
  },
  {
    id: 'specialized-solutions',
    titleAr: 'نموذج حل متخصص',
    titleEn: 'Specialized Solution Sample',
    categoryAr: 'Specialized / Real Estate / VR',
    categoryEn: 'Specialized / Real Estate / VR',
    descriptionAr: 'مكان مخصص لإضافة عينة حقيقية من Digital Twin، تسويق عقاري مخصص، أو ذكاء قرار تنفيذي.',
    descriptionEn: 'A slot for a real Digital Twin, personalized real estate, or executive decision intelligence sample.',
    relatedServiceId: 'specialized',
    relatedServiceAr: 'الحلول المتخصصة',
    relatedServiceEn: 'Specialized Solutions',
    outcomeAr: 'يُستخدم فقط عندما يكون الأثر التجاري واضحًا بعد الدراسة.',
    outcomeEn: 'Used only when business impact is clear after discovery.',
    isRealWork: false,
  },
];
