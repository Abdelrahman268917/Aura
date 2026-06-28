export type PortfolioImage = {
  src: string;
  altAr: string;
  altEn: string;
  captionAr: string;
  captionEn: string;
  fit?: "cover" | "contain";
};

export type PortfolioGroup = {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  introAr: string;
  introEn: string;
  categoryAr: string;
  categoryEn: string;
  relatedServiceId: string;
  relatedServiceAr: string;
  relatedServiceEn: string;
  images: PortfolioImage[];
};

export const portfolioGroups: PortfolioGroup[] = [
  {
    id: "workflow-dashboard",
    titleAr: "أنظمة تشغيل ولوحات متابعة",
    titleEn: "Workflow Systems",
    subtitleAr: "نماذج لمساحات عمل داخلية ولوحات متابعة تساعد الفريق على رؤية المهام، المراحل، الملفات، والمخاطر من مكان واحد.",
    subtitleEn: "Internal workspaces and dashboards that make tasks, phases, files, and risks visible in one place.",
    introAr: "لقطات من أنظمة ولوحات متابعة تدعم التشغيل اليومي وتحوّل المتابعة إلى رؤية واضحة.",
    introEn: "Snapshots of dashboards and operating views that turn follow-up into a clear working system.",
    categoryAr: "أنظمة تشغيل",
    categoryEn: "Workflow Systems",
    relatedServiceId: "workflow",
    relatedServiceAr: "Workflow & Operating System Design",
    relatedServiceEn: "Workflow & Operating System Design",
    images: [
      { src: "/portfolio/workflow-dashboard-01.png", altAr: "لوحة متابعة تشغيل داخلية من AURA", altEn: "AURA internal operations dashboard sample", captionAr: "لوحة متابعة تجمع حالة العمل والمهام والمراحل في مساحة واحدة.", captionEn: "A dashboard view that brings work status, tasks, and phases into one operating space.", fit: "contain" },
      { src: "/portfolio/workflow-dashboard-02.png", altAr: "مساحة عمل داخلية لمتابعة المشاريع", altEn: "Internal project workspace sample", captionAr: "نموذج لمساحة عمل تساعد الفريق على متابعة الملفات والاجتماعات والقرارات.", captionEn: "A workspace sample for tracking files, meetings, and decisions.", fit: "contain" },
      { src: "/portfolio/workflow-dashboard-03.png", altAr: "لوحة متابعة للمهام والمخاطر", altEn: "Task and risk tracking dashboard sample", captionAr: "رؤية منظمة للمهام والعوائق ونقاط المتابعة اليومية.", captionEn: "A structured view for tasks, blockers, and daily follow-up.", fit: "contain" },
      { src: "/portfolio/workflow-dashboard-04.png", altAr: "واجهة تشغيل لمتابعة مراحل العمل", altEn: "Operating interface for tracking project phases", captionAr: "واجهة توضح كيف يمكن تحويل سير العمل إلى مراحل قابلة للمتابعة.", captionEn: "An interface showing how workflows become trackable delivery stages.", fit: "contain" }
    ]
  },
  {
    id: "internal-tools",
    titleAr: "أدوات وبرمجيات داخلية مخصصة",
    titleEn: "Internal Software",
    subtitleAr: "نماذج لأدوات داخلية مصممة حول طريقة عمل المستخدم، تشمل إدخال البيانات، توليد المخرجات، 2D layouts، وواجهات تشغيل عملية.",
    subtitleEn: "Internal tools designed around the user's workflow, including inputs, outputs, 2D layouts, and practical operating interfaces.",
    introAr: "نماذج توضح كيف تتحول البيانات والعمل اليومي إلى أداة سهلة الاستخدام.",
    introEn: "Samples showing how daily work and data can become a focused internal tool.",
    categoryAr: "برمجيات داخلية",
    categoryEn: "Internal Software",
    relatedServiceId: "tools",
    relatedServiceAr: "Internal Software & Business Tools",
    relatedServiceEn: "Internal Software & Business Tools",
    images: [
      { src: "/portfolio/internal-software-01.png", altAr: "أداة داخلية مخصصة من AURA", altEn: "AURA custom internal software sample", captionAr: "واجهة عملية مصممة حول خطوات المستخدم اليومية.", captionEn: "A practical interface designed around the user's daily workflow.", fit: "contain" },
      { src: "/portfolio/internal-software-02.png", altAr: "واجهة إدخال بيانات وتشغيل داخلية", altEn: "Internal input and operating interface sample", captionAr: "نموذج لإدخال البيانات وتحويلها إلى مخرجات مفيدة.", captionEn: "A sample for turning inputs into useful outputs.", fit: "contain" },
      { src: "/portfolio/internal-software-03.png", altAr: "واجهة توليد مخططات داخلية", altEn: "Internal layout generation interface sample", captionAr: "نموذج لواجهة تساعد على إنتاج مخرجات مرئية منظمة.", captionEn: "An interface sample for producing structured visual outputs.", fit: "contain" },
      { src: "/portfolio/internal-software-04.png", altAr: "أداة تشغيل عملية للفرق", altEn: "Practical team operations tool sample", captionAr: "أداة داخلية تربط المدخلات بالنتائج في تجربة واحدة.", captionEn: "An internal tool connecting inputs and results in one experience.", fit: "contain" },
      { src: "/portfolio/internal-software-05.png", altAr: "واجهة برمجية داخلية مختصرة", altEn: "Compact internal software interface sample", captionAr: "تصميم مختصر يركز على الاستخدام اليومي وليس العرض فقط.", captionEn: "A compact design focused on daily use, not just presentation.", fit: "contain" }
    ]
  },
  {
    id: "ai-automation",
    titleAr: "أتمتة ووكلاء ذكاء اصطناعي",
    titleEn: "AI Automation",
    subtitleAr: "نماذج لمسارات أتمتة ووكلاء يساعدون في المتابعة، الرسائل، التقارير، والتعامل مع البيانات المتكررة داخل سير العمل.",
    subtitleEn: "Automation flows and agent concepts that support follow-up, messages, reports, and repetitive data handling inside workflows.",
    introAr: "لقطات توضح كيف تعمل الأتمتة داخل سير العمل بدل أن تكون أداة منفصلة.",
    introEn: "Snapshots showing automation inside the workflow rather than as a disconnected tool.",
    categoryAr: "أتمتة AI",
    categoryEn: "AI Automation",
    relatedServiceId: "ai",
    relatedServiceAr: "AI Automation & Agent Systems",
    relatedServiceEn: "AI Automation & Agent Systems",
    images: [
      { src: "/portfolio/ai-automation-01.jpeg", altAr: "مسار أتمتة ذكاء اصطناعي", altEn: "AI automation flow sample", captionAr: "نموذج لمسار أتمتة يربط الخطوات المتكررة داخل التشغيل.", captionEn: "An automation flow connecting repetitive steps inside operations.", fit: "contain" },
      { src: "/portfolio/ai-framework-01.png", altAr: "إطار عمل لوكيل أو نظام ذكي", altEn: "AI agent or smart system framework sample", captionAr: "إطار تفكير يساعد في تصميم وكيل أو نظام ذكي قابل للاستخدام.", captionEn: "A framework for shaping an agent or intelligent system into something usable.", fit: "contain" }
    ]
  },
  {
    id: "growth-system",
    titleAr: "أنظمة نمو وتسويق ومبيعات",
    titleEn: "Growth & Marketing",
    subtitleAr: "نماذج من محتوى وحالات تسويقية واقعية توضح بناء الرسالة، التصميم، المحتوى، والثقة الرقمية للعلامات والخدمات.",
    subtitleEn: "Real marketing case snapshots showing messaging, design, content, and digital trust for brands and services.",
    introAr: "لقطات من أصول تسويقية تساعد على توضيح الرسالة وبناء الثقة الرقمية.",
    introEn: "Snapshots of growth assets that clarify positioning and support digital trust.",
    categoryAr: "نمو وتسويق",
    categoryEn: "Growth & Marketing",
    relatedServiceId: "growth",
    relatedServiceAr: "Growth, Marketing & Sales Systems",
    relatedServiceEn: "Growth, Marketing & Sales Systems",
    images: [
      { src: "/portfolio/marketing-dr-gogo.png", altAr: "نموذج محتوى تسويقي للدكتور جوجو", altEn: "Marketing content sample for Dr Gogo", captionAr: "لقطة من حالة تسويقية توضّح بناء الرسالة والثقة.", captionEn: "A marketing case snapshot showing messaging and trust building.", fit: "contain" },
      { src: "/portfolio/marketing-dr-asmaa.png", altAr: "نموذج محتوى تسويقي للدكتورة أسماء هاشم", altEn: "Marketing content sample for Dr Asmaa Hashem", captionAr: "نموذج يوضح الدمج بين التصميم والمحتوى في عرض الخدمة.", captionEn: "A sample combining design and content to present a service clearly.", fit: "contain" },
      { src: "/portfolio/marketing-amr-nofal.png", altAr: "نموذج محتوى تسويقي لعمرو نوفل", altEn: "Marketing content sample for Amr Nofal", captionAr: "لقطة لحالة تسويقية تعتمد على وضوح الرسالة والهوية.", captionEn: "A marketing snapshot built around clear messaging and identity.", fit: "contain" },
      { src: "/portfolio/marketing-al-thiqa.png", altAr: "نموذج محتوى تسويقي لمعمل الثقة", altEn: "Marketing content sample for Al Thiqa Lab", captionAr: "نموذج من محتوى يساعد على بناء ثقة رقمية للخدمة.", captionEn: "A content sample supporting digital trust for a service brand.", fit: "contain" },
      { src: "/portfolio/marketing-dr-rasha.png", altAr: "نموذج محتوى تسويقي للدكتورة رشا عبد الرازق", altEn: "Marketing content sample for Dr Rasha Abd Elrazek", captionAr: "لقطة توضح استخدام المحتوى والتصميم في تقديم الخدمة.", captionEn: "A snapshot showing how content and design can present a service.", fit: "contain" }
    ]
  },
  {
    id: "specialized-solutions",
    titleAr: "حلول متخصصة وتجارب تفاعلية",
    titleEn: "Specialized Solutions",
    subtitleAr: "نماذج لحلول متقدمة مثل البيئات التفاعلية، 3D/VR-ready concepts، وتجارب عرض تساعد في البيع، التدريب، أو توضيح الفكرة.",
    subtitleEn: "Advanced concepts such as interactive environments, 3D/VR-ready experiences, and visual demonstrations for sales, training, or concept clarity.",
    introAr: "لقطات لحلول متخصصة تُستخدم عندما يكون الأثر التجاري واضحًا بعد الدراسة.",
    introEn: "Specialized samples used when the business impact is clear after discovery.",
    categoryAr: "حلول متخصصة",
    categoryEn: "Specialized Solutions",
    relatedServiceId: "specialized",
    relatedServiceAr: "Specialized Solutions",
    relatedServiceEn: "Specialized Solutions",
    images: [
      { src: "/portfolio/specialized-interactive-01.png", altAr: "نموذج حل متخصص وتجربة تفاعلية", altEn: "Specialized interactive solution sample", captionAr: "نموذج لتجربة متخصصة تساعد في العرض أو البيع أو توضيح الفكرة.", captionEn: "A specialized experience sample for showcasing, selling, or explaining an idea.", fit: "contain" }
    ]
  }
];
