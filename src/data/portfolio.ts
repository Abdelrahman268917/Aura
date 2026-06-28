export type PortfolioProofImage = {
  src: string;
  altAr: string;
  altEn: string;
  fit?: "cover" | "contain";
};

export type PortfolioProofCard = {
  serviceId: "workflow" | "software" | "ai" | "growth" | "specialized";
  labelAr: string;
  labelEn: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  ctaAnchor: string;
  images: PortfolioProofImage[];
};

export const portfolioProofCards: PortfolioProofCard[] = [
  {
    serviceId: "workflow",
    labelAr: "خط الخدمة 01",
    labelEn: "Service Line 01",
    titleAr: "أنظمة تشغيل ولوحات متابعة",
    titleEn: "Workflow systems and dashboards",
    descriptionAr: "مساحات عمل ولوحات متابعة تساعد الفريق على رؤية المهام، المراحل، الملفات، والمخاطر من مكان واحد.",
    descriptionEn: "Workspaces and dashboards that help teams track tasks, stages, files, and risks from one place.",
    ctaAnchor: "#service-workflow",
    images: [
      { src: "/portfolio/workflow-dashboard-01.png", altAr: "لوحة متابعة تشغيل داخلية", altEn: "Internal workflow dashboard sample", fit: "contain" },
      { src: "/portfolio/workflow-dashboard-02.png", altAr: "مساحة عمل لمتابعة المشاريع", altEn: "Project workspace sample", fit: "contain" },
      { src: "/portfolio/workflow-dashboard-03.png", altAr: "لوحة متابعة للمهام والمخاطر", altEn: "Task and risk dashboard sample", fit: "contain" },
      { src: "/portfolio/workflow-dashboard-04.png", altAr: "واجهة متابعة مراحل العمل", altEn: "Workflow stages interface sample", fit: "contain" }
    ]
  },
  {
    serviceId: "software",
    labelAr: "خط الخدمة 02",
    labelEn: "Service Line 02",
    titleAr: "أدوات وبرمجيات داخلية",
    titleEn: "Internal software and tools",
    descriptionAr: "واجهات وأدوات مخصصة لإدخال البيانات، تنظيم العمل، توليد المخرجات، ومتابعة الاستخدام اليومي.",
    descriptionEn: "Custom interfaces and tools for data entry, workflow organization, outputs, and daily use.",
    ctaAnchor: "#service-software",
    images: [
      { src: "/portfolio/internal-software-01.png", altAr: "أداة داخلية مخصصة", altEn: "Custom internal software sample", fit: "contain" },
      { src: "/portfolio/internal-software-02.png", altAr: "واجهة إدخال وتشغيل داخلية", altEn: "Internal input and operations interface", fit: "contain" },
      { src: "/portfolio/internal-software-03.png", altAr: "واجهة توليد مخرجات داخلية", altEn: "Internal output generation interface", fit: "contain" },
      { src: "/portfolio/internal-software-04.png", altAr: "أداة تشغيل عملية للفريق", altEn: "Team operations tool sample", fit: "contain" },
      { src: "/portfolio/internal-software-05.png", altAr: "واجهة برمجية داخلية مختصرة", altEn: "Compact internal software interface", fit: "contain" }
    ]
  },
  {
    serviceId: "ai",
    labelAr: "خط الخدمة 03",
    labelEn: "Service Line 03",
    titleAr: "أتمتة ووكلاء ذكاء اصطناعي",
    titleEn: "AI automation and agents",
    descriptionAr: "مسارات أتمتة ووكلاء يساعدون في المتابعة، الرسائل، التقارير، والمهام المتكررة داخل سير العمل.",
    descriptionEn: "Automation flows and agents for follow-up, messages, reporting, and repeated operational tasks.",
    ctaAnchor: "#service-ai",
    images: [
      { src: "/portfolio/ai-automation-01.jpeg", altAr: "مسار أتمتة ذكاء اصطناعي", altEn: "AI automation flow sample", fit: "contain" },
      { src: "/portfolio/ai-framework-01.png", altAr: "إطار عمل لوكيل ذكي", altEn: "AI agent framework sample", fit: "contain" }
    ]
  },
  {
    serviceId: "growth",
    labelAr: "خط الخدمة 04",
    labelEn: "Service Line 04",
    titleAr: "أنظمة نمو وتسويق ومبيعات",
    titleEn: "Growth, marketing, and sales systems",
    descriptionAr: "نماذج من محتوى وحالات تسويقية توضح بناء الرسالة، التصميم، الثقة، وتحويل الاهتمام إلى فرص.",
    descriptionEn: "Marketing and growth assets showing positioning, content, trust-building, and lead conversion.",
    ctaAnchor: "#service-growth",
    images: [
      { src: "/portfolio/marketing-dr-gogo.png", altAr: "نموذج محتوى تسويقي", altEn: "Marketing content sample", fit: "cover" },
      { src: "/portfolio/marketing-dr-asmaa.png", altAr: "نموذج تسويق لخدمة طبية", altEn: "Medical service marketing sample", fit: "cover" },
      { src: "/portfolio/marketing-amr-nofal.png", altAr: "نموذج محتوى وهوية", altEn: "Content and identity sample", fit: "cover" },
      { src: "/portfolio/marketing-al-thiqa.png", altAr: "نموذج ثقة رقمية لخدمة", altEn: "Digital trust marketing sample", fit: "cover" },
      { src: "/portfolio/marketing-dr-rasha.png", altAr: "نموذج عرض خدمة بالمحتوى", altEn: "Service positioning content sample", fit: "cover" }
    ]
  },
  {
    serviceId: "specialized",
    labelAr: "خط الخدمة 05",
    labelEn: "Service Line 05",
    titleAr: "حلول متخصصة وتجارب تفاعلية",
    titleEn: "Specialized and interactive solutions",
    descriptionAr: "نماذج لحلول متقدمة مثل البيئات التفاعلية، التصور ثلاثي الأبعاد، وتجارب العرض أو التدريب.",
    descriptionEn: "Advanced examples such as interactive environments, 3D visualization, and presentation or training experiences.",
    ctaAnchor: "#service-specialized",
    images: [
      { src: "/portfolio/specialized-interactive-01.png", altAr: "نموذج حل متخصص وتجربة تفاعلية", altEn: "Specialized interactive solution sample", fit: "contain" }
    ]
  }
];
