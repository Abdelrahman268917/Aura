'use client';

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Globe, Zap, Shield, Target, Bot, Layers,
  Rocket, BookOpen, Users, ChevronRight, ChevronDown, Check,
  Mail, Phone, MapPin, Star, Award, Clock, TrendingUp,
  Settings, BarChart3, Workflow, Database, MessageSquare,
  Sparkles, ArrowUpRight, Menu, X, Play, RefreshCw
} from 'lucide-react';
import { SystemDashboardMockup } from '@/components/system-dashboard-mockup';
import { PortfolioProofSection } from '@/components/PortfolioProofSection';

/* ─── i18n Content ────────────────────────────────────── */
const content = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      process: 'Process',
      packages: 'Packages',
      why: 'Why Us',
      contact: 'Contact',
      cta: 'Start Now',
    },
    loader: {
      tagline: 'Business Acceleration Studio',
      line1: 'Build smartly. Work faster.',
      line2: 'Turn your business into a system.',
    },
    hero: {
      badge: 'AURA · Business Acceleration Studio',
      title1: 'Build Smartly.',
      title2: 'Work Faster.',
      title3: 'Turn Your Business',
      title4: 'Into a System.',
      subheadline: 'We design the workflow, build the tools, and manage the system as your business grows.',
      description: 'We do not just sell tools or AI. We start by understanding how your company actually works, then design an operational layer that makes execution easier, improvement continuous, and growth scalable.',
      cta1: 'Start Now',
      cta2: 'See How It Works',
    },
    why: {
      badge: 'The Problem',
      title: 'Why Business Acceleration Studio?',
      subtitle: 'The real problem in most companies today is the impact on the company itself:',
      problems: [
        { icon: 'scatter', title: 'Scattered Work', desc: 'Conversations, files, and decisions spread across disconnected channels and tables' },
        { icon: 'delay', title: 'Delivery Delays', desc: 'Work tools don\'t fit the actual workflow — no real coordination' },
        { icon: 'waste', title: 'Wasted Spending', desc: 'Spending without strategy, random AI marketing — volatile results' },
        { icon: 'loss', title: 'Revenue Loss', desc: 'Decisions based on guesswork, high risks, missed expansion opportunities' },
      ],
      solution: {
        title: 'What Do We Do Differently?',
        desc: 'We start by understanding how your company actually works. Then we design an operational layer that makes execution natural, improvement continuous, and growth scalable. We don\'t sell tools — we build systems.',
      },
    },
    services: {
      badge: 'Service Layers',
      title: 'Interconnected Service Layers',
      subtitle: 'Each layer is designed to produce a scalable outcome for the company. Layers work together as a complete business acceleration system.',
      layers: [
        {
          num: '01',
          title: 'Work System Diagnosis',
          problem: 'Decisions without data, resource drain, slow problem detection, no clear priorities',
          solution: 'Precise operational audit with options map and prioritized report for immediate execution',
          kpis: ['Decision time', 'Hidden options count', 'Bottleneck ratio'],
          impact: 'Outcome: clearer priorities and a practical roadmap for action',
          icon: 'search',
        },
        {
          num: '02',
          title: 'Work Flow Design',
          problem: 'Scattered work, unclear responsibilities, repeated delivery delays, conflicting deadlines',
          solution: 'Complete operational system: clear stages + defined responsibilities + approvals + weekly operational cadence',
          kpis: ['Delivery speed', 'Responsibility clarity', 'Re-work rate'],
          impact: 'Outcome: smoother delivery with clearer ownership and fewer handoff gaps',
          icon: 'flow',
        },
        {
          num: '03',
          title: 'Building Internal Tools',
          problem: 'Tools don\'t fit the work, team works with tables and reminders, no follow-up system, no performance tracking',
          solution: 'Lightweight CRM + customized follow-up systems + smart templates + entry gateways + databases',
          kpis: ['Data accuracy', 'Manual task reduction', 'Daily tool usage rate'],
          impact: 'Outcome: tools that support the team instead of adding more admin work',
          icon: 'build',
        },
        {
          num: '04',
          title: 'AI & Automation Integration',
          problem: 'Repetitive tasks consuming the team, human errors in operations, no smart automation linked to the work',
          solution: 'Human review points for quality + customized n8n + CrewAI + AI agents + automated flows',
          kpis: ['Automated tasks count', 'Error reduction', 'Weekly time saved'],
          impact: 'Outcome: reliable automation with human review where quality matters',
          icon: 'bot',
        },
        {
          num: '05',
          title: 'Content & Marketing Strategy',
          problem: 'Random content, spending without return, no clear differentiation, no content strategy',
          solution: 'A focused content system with clear themes, production flow, review points, and performance learning',
          kpis: ['Follower growth', 'Monthly recurring reach', 'Conversion rate', 'Cost per lead'],
          impact: 'Outcome: more consistent content decisions and a repeatable production process',
          icon: 'trend',
        },
        {
          num: '06',
          title: 'Startup & Business Structuring',
          problem: 'Unclear idea, no delivery model, late launch, no strategic planning for the project',
          solution: 'Clear and defined pitch + delivery model scalable for iteration + launch plan + first revenue strategy',
          kpis: ['Pitch clarity to investor', 'Launch time', 'Retention rate', 'First revenue speed'],
          impact: 'Outcome: a clearer offer, delivery model, and path from idea to launch',
          icon: 'rocket',
        },
      ],
      who: [
        { icon: 'target', title: 'Active Startups', desc: 'Structuring before expansion' },
        { icon: 'settings', title: 'Service Teams', desc: 'Scalable delivery' },
        { icon: 'rocket', title: 'Agencies', desc: 'Clear & fast production' },
        { icon: 'book', title: 'Educational Business', desc: 'Optimization for growth' },
      ],
    },
    process: {
      badge: 'Methodology',
      title: 'From Diagnosis to Scalable Execution',
      subtitle: 'Each phase has a clear, measurable goal — not a general statement that creates confusion, but a real proposal linked to the actual reality of your company.',
      steps: [
        { num: '01', title: 'Diagnosis', desc: 'Understanding the work, mapping paths, identifying gaps, pain points, responsibilities' },
        { num: '02', title: 'Design', desc: 'Decisions, simulations, work routes, tools, data, automation paths' },
        { num: '03', title: 'Building', desc: 'Creating operational tools, AI, workflows, follow-up systems, dashboards' },
        { num: '04', title: 'Integration', desc: 'Documenting workflows, making the system easy for daily use by the team' },
        { num: '05', title: 'Optimization', desc: 'Continuous improvement, expanding the system, making growth natural' },
      ],
      questions: {
        title: 'Every system must answer 3 questions:',
        items: [
          'What problem does this solve?',
          'Who will use it daily?',
          'How do we know the system is working?',
        ],
      },
    },
      packages: {
      badge: 'Packages',
      title: 'Choose What Fits Your Need',
      subtitle: 'The initial diagnosis will help determine the right path — you don\'t pay for what you don\'t need.',
      sprint: {
        name: 'Sprint',
        subtitle: 'When you need one specific thing',
        badge: 'Best for Specific Need',
        scope: 'Scoped after diagnosis',
        features: [
          'Diagnosis & Analysis Sprint',
          'Work Flow Design Sprint',
          'Internal Tools Building Sprint',
          'AI Automation Sprint',
          'Content Strategy Sprint',
          'Startup Structuring Sprint',
        ],
        cta: 'Start With Diagnosis',
      },
      full: {
        name: 'Full System',
        subtitle: 'Maximum Impact — Best Value',
        badge: 'Most Impact',
        scope: 'Custom project scope',
        features: [
          'All service layers integrated',
          'Diagnosis + Design + Build + Automate',
          'Complete structuring + content strategy',
          'Full documentation + team training',
          'Future expansion roadmap',
          'Clear handover and future improvement roadmap',
        ],
        cta: 'Start Now',
      },
      managed: {
        name: 'Managed Systems Partner',
        subtitle: 'Ongoing ownership after launch',
        badge: 'Monthly Partnership',
        scope: 'Monthly custom scope',
        description: 'After the system is built, we can stay involved monthly to monitor, improve, and adapt the tools, workflows, and automations as your business grows.',
        features: ['Monthly system review', 'Tool monitoring and improvements', 'Workflow updates', 'Automation refinement', 'Priority roadmap', 'New requests and enhancements'],
        cta: 'Discuss Monthly Support',
      },
      guide: {
        title: 'Starting Point Guide',
        items: [
          { if: 'If you say: "We\'re not sure what needs fixing first"', then: '→ Work System Diagnosis Session' },
          { if: 'If you say: "The team is busy but work is scattered"', then: '→ Work Flow Design Sprint' },
          { if: 'If you say: "We need follow-up systems and templates"', then: '→ Internal Tools Building' },
          { if: 'If you say: "Repetitive tasks are bogging down the team"', then: '→ AI Automation Sprint' },
          { if: 'If you say: "Content or marketing direction is unclear"', then: '→ Content & Marketing Strategy Sprint' },
          { if: 'If you say: "The idea is still unclear or no delivery model"', then: '→ Startup Structuring Sprint' },
          { if: 'If you say: "We need a complete transformation for the company"', then: '→ Full Business Acceleration System ✓' },
        ],
      },
      scopeNote: 'Scope and delivery plan are defined after understanding the business, workflow complexity, tools, automation depth, and team involvement.',
    },
    differentiators: {
      badge: 'Why Us',
      title: 'Built Around How Your Business Works',
      items: [
        { icon: 'award', title: '7+ Years of Project-Building Experience', desc: 'Experience across software, education, automation, operations, and business systems.', quote: 'From early experiments to real workflows, tools, automation layers, and scalable operating systems.' },
        { icon: 'target', title: 'Workflow-First Thinking', desc: 'We learn how your team actually works before recommending a tool or building a system.', quote: 'The system should fit the work, not force the work to fit the system.' },
        { icon: 'layers', title: 'One Connected Operating Layer', desc: 'Workflows, internal tools, data, dashboards, and automation are designed to work together.', quote: 'Clarity across the full process matters more than adding another app.' },
        { icon: 'refresh', title: 'Ownership Beyond Launch', desc: 'Managed Systems Partner keeps the system monitored, useful, and adaptable after delivery.', quote: 'Launch is the start of the improvement cycle, not the end.' },
      ],
    },
    examples: {
      badge: 'Examples',
      title: 'How Does the System Look in Your Company?',
      items: [
        {
          icon: 'palette',
          title: 'Marketing Agency',
          challenge: 'Files, briefs, ideas, orders, comments, modifications, approvals, invoices',
          result: ['Complete visual production pipeline', 'Every project tracked from brief to delivery', 'Clear approval and revision stages', 'No lost requests or modifications'],
        },
        {
          icon: 'bot',
          title: 'Studio with AI',
          challenge: 'Ideas, orders, events, scheduling, publishing — everything connects manually',
          result: ['Managed content workflow', 'AI-assisted idea development', 'Clear production and review stages', 'Consistent publishing evaluation'],
        },
        {
          icon: 'health',
          title: 'Academic / Medical',
          challenge: 'Appointments, lectures, students, tables, materials, expenses',
          result: ['Complete administrative operations hub', 'Automated registration, scheduling, and reminders', 'Attendance tracking and student progress', 'Less manual coordination for the team'],
        },
        {
          icon: 'inbox',
          title: 'Operations & Reception',
          challenge: 'New inquiries, scattered follow-up, disorganized tracking — lost revenue',
          result: ['Scalable reception pipeline', 'Automated follow-up with CRM integration', 'Clear ownership at every stage', 'No potential client falls through the cracks'],
        },
      ],
    },
    tools: {
      badge: 'Flexible Stack',
      title: 'The Stack Depends on the System',
      subtitle: 'We do not force a tool. We choose the right stack based on the workflow, team, budget, and scalability needs. These are examples, not a fixed stack.',
      categories: [
        {
          name: 'Automation',
          tools: [
            { name: 'n8n', desc: 'Open-source automation — full control' },
            { name: 'Make', desc: 'Complex workflow automation' },
            { name: 'Webhooks', desc: 'Reliable system-to-system events' },
          ],
        },
        {
          name: 'AI Agents',
          tools: [
            { name: 'CrewAI', desc: 'Multi-agent orchestration' },
            { name: 'LangChain', desc: 'Advanced AI integration' },
            { name: 'Custom prompt systems', desc: 'Designed around the actual workflow' },
          ],
        },
        { name: 'Dashboards', tools: [{ name: 'Metabase', desc: 'Operational reporting' }, { name: 'Custom dashboards', desc: 'Focused internal views' }, { name: 'Internal reporting', desc: 'Decision-ready summaries' }] },
        { name: 'Integrations', tools: [{ name: 'APIs', desc: 'Connect existing systems' }, { name: 'Forms', desc: 'Structured data intake' }, { name: 'Payment / CRM / operations', desc: 'Connect the tools already in use' }] },
        {
          name: 'Databases & CRM',
          tools: [
            { name: 'Notion', desc: 'Databases, tracking, documentation' },
            { name: 'Airtable', desc: 'Project management' },
            { name: 'Custom CRM', desc: 'Built around your workflow' },
          ],
        },
      ],
    },
    contact: {
      badge: 'Get Started',
      title: 'Ready to turn your business into a system?',
      subtitle: 'Start with a short message. We’ll understand where the chaos is, then recommend the right diagnosis, sprint, full system, or monthly support path.',
      email: 'amirelshazly66@gmail.com',
      phone: '+20 102 924 0066',
      location: 'Egypt / Remote',
      details: {
        email: 'Email',
        whatsapp: 'WhatsApp',
        location: 'Location',
      },
      actions: [
        {
          label: 'A',
          icon: 'target',
          title: 'Start With Diagnosis',
          text: 'Start with a focused diagnosis to understand your workflow, bottlenecks, tools, and best next step.',
          cta: 'Start on WhatsApp',
          type: 'diagnosis',
        },
        {
          label: 'B',
          icon: 'book',
          title: 'Send a Business Brief',
          text: 'Send a short brief about your business and what feels slow, scattered, manual, or unclear.',
          cta: 'Send Email Brief',
          type: 'brief',
        },
        {
          label: 'C',
          icon: 'refresh',
          title: 'Discuss Monthly Support',
          text: 'For businesses that want AURA to stay responsible for improving tools, workflows, automations, and system updates after launch.',
          cta: 'Discuss Monthly Support',
          type: 'monthly',
        },
      ],
    },
    footer: {
      tagline: 'Business Acceleration Studio',
      rights: 'All rights reserved.',
      built: 'Built with precision.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      services: 'الخدمات',
      process: 'طريقة العمل',
      packages: 'المسارات',
      why: 'لماذا AURA',
      contact: 'تواصل',
      cta: 'ابدأ الآن',
    },
    loader: {
      tagline: 'استوديو تسريع الأعمال',
      line1: 'ابنِ عملك بذكاء. اعمل أسرع.',
      line2: 'حوّل شركتك إلى نظام واضح.',
    },
    hero: {
      badge: 'AURA · استوديو تسريع الأعمال',
      title1: 'ابنِ عملك بذكاء.',
      title2: 'اعمل أسرع.',
      title3: 'حوّل شركتك',
      title4: 'إلى نظام.',
      subheadline: 'نصمم سير العمل، نبني الأدوات، ونساعدك على إدارة النظام مع نمو شركتك.',
      description: 'لا نبدأ بالأداة قبل فهم طريقة عمل شركتك. نحلل التشغيل، نرسم المسار، ثم نبني طبقة عملية تجعل المتابعة أوضح، والتنفيذ أسرع، والنمو أكثر قابلية للإدارة.',
      cta1: 'ابدأ التشخيص',
      cta2: 'اعرف طريقة العمل',
    },
    why: {
      badge: 'المشكلة',
      title: 'حين يكبر العمل قبل أن يكتمل النظام',
      subtitle: 'تظهر المشكلة عندما تتوزع المتابعة والملفات والقرارات بين أدوات لا تعمل معًا.',
      problems: [
        { icon: 'scatter', title: 'عمل متفرق', desc: 'محادثات وملفات وقرارات موزعة بين قنوات وجداول غير مترابطة' },
        { icon: 'delay', title: 'تأخير التسليم', desc: 'أدوات العمل لا تناسب مسار العمل الفعلي — لا تنسيق حقيقي' },
        { icon: 'waste', title: 'إنفاق بلا عائد', desc: 'إنفاق بلا استراتيجية، تسويق ذكاء اصطناعي عشوائي — نتائج متذبذبة' },
        { icon: 'loss', title: 'خسارة أعمال محتملة', desc: 'قرارات بالتخمين، مخاطر عالية، فرص توسع ضائعة' },
      ],
      solution: {
        title: 'كيف تساعدك AURA؟',
        desc: 'AURA ليست مجرد أدوات أو تسويق منفصل. نساعد الشركات على تحويل العمل اليومي إلى نظام واضح: تشخيص، تنظيم سير العمل، بناء أدوات ولوحات متابعة، أتمتة، وتسويق مرتبط بالتشغيل والنمو.',
      },
    },
    services: {
      badge: 'خدمات AURA',
      title: 'خدماتنا',
      subtitle: 'يمكنك البدء بمساعدة شاملة، أو اختيار خدمة محددة حسب احتياج شركتك الحالي.',
      layers: [
        {
          num: '٠١',
          title: 'تصميم سير العمل والتشغيل',
          problem: 'نحوّل طريقة العمل اليومية إلى خطوات واضحة، بمسؤوليات محددة ومراحل متابعة قابلة للقياس.',
          solution: 'نرسم المسار الحالي، نحدد نقاط التعطيل، ثم نصمم سير عمل عملي يناسب الفريق وطريقة التسليم.',
          kpis: ['خريطة سير العمل', 'توزيع المسؤوليات', 'تحديد نقاط التعطيل', 'توصيات تشغيلية واضحة'],
          impact: 'النتيجة: تشغيل أوضح ومسؤوليات أسهل في المتابعة.',
          icon: 'flow',
        },
        {
          num: '٠٢',
          title: 'لوحات الإدارة وأنظمة المتابعة',
          problem: 'نبني لوحات متابعة تساعد الإدارة على رؤية المشاريع والعملاء والمهام والتحصيل والتسويق في مكان واحد.',
          solution: 'نحدد المؤشرات المهمة ومصادر البيانات، ثم نبني لوحة تخدم القرار والمتابعة اليومية.',
          kpis: ['لوحة إدارة تنفيذية', 'مؤشرات متابعة', 'تقارير أسبوعية أو شهرية', 'رؤية موحدة للفريق'],
          impact: 'النتيجة: صورة موحدة تساعد الإدارة على التدخل في الوقت المناسب.',
          icon: 'trend',
        },
        {
          num: '٠٣',
          title: 'الأدوات والبرامج الداخلية',
          problem: 'نصمم أدوات داخلية بسيطة ومخصصة لطريقة عملك، بدل الاعتماد على ملفات متفرقة أو متابعة يدوية مرهقة.',
          solution: 'نبني الأداة حول الاستخدام الفعلي للفريق، مع حقول واضحة وتدفق بسيط للبيانات والمتابعة.',
          kpis: ['CRM مخصص', 'أدوات متابعة المشاريع', 'نماذج إدخال بيانات', 'نظام ملفات وروابط منظم'],
          impact: 'النتيجة: أدوات تخدم العمل اليومي بدل أن تضيف عبئًا جديدًا.',
          icon: 'build',
        },
        {
          num: '٠٤',
          title: 'الأتمتة ووكلاء الذكاء الاصطناعي',
          problem: 'نربط الخطوات المتكررة بتنبيهات وتقارير ذكية لتقليل المتابعة اليدوية وتحويل البيانات إلى إجراء.',
          solution: 'نحدد نقاط الأتمتة المناسبة ونضيف مراجعة بشرية حيث تكون الجودة أو الموافقة ضرورية.',
          kpis: ['تنبيهات تلقائية', 'تقارير دورية', 'وكلاء متابعة وتحليل', 'ربط بين الأدوات المستخدمة'],
          impact: 'النتيجة: متابعة أقل يدويًا وتدفق معلومات أكثر انتظامًا.',
          icon: 'bot',
        },
        {
          num: '٠٥',
          title: 'نظام التسويق والنمو',
          problem: 'نربط التسويق بالتشغيل والمبيعات حتى تتحول الحملات والمحتوى إلى فرص يمكن تتبعها وإدارتها.',
          solution: 'نصمم مسارًا واضحًا من المحتوى أو الحملة إلى العميل المحتمل والمتابعة وقراءة الأداء.',
          kpis: ['استراتيجية محتوى', 'صفحات هبوط', 'تتبع العملاء المحتملين', 'تقارير أداء واضحة'],
          impact: 'النتيجة: تسويق مرتبط بالمتابعة والقرار، وليس نشاطًا منفصلًا.',
          icon: 'trend',
        },
        {
          num: '٠٦',
          title: 'شريك إدارة وتحسين الأنظمة',
          problem: 'بعد الإطلاق، نستمر في مراجعة النظام وتحسينه شهريًا حسب احتياج الشركة وتطور العمل.',
          solution: 'نتابع الأداء والطلبات الجديدة ونرتب الأولويات ونحدّث الأدوات واللوحات والأتمتة عند الحاجة.',
          kpis: ['مراجعة شهرية', 'تحسينات مستمرة', 'تحديثات للوحة والأتمتة', 'أولويات الشهر التالي'],
          impact: 'النتيجة: نظام يظل مفيدًا وقابلًا للتطوير بعد الإطلاق.',
          icon: 'refresh',
        },
      ],
      who: [
        { icon: 'target', title: 'الشركات الناشئة', desc: 'هيكلة قبل التوسع' },
        { icon: 'settings', title: 'فرق الخدمات', desc: 'تسليم قابل للتوسع' },
        { icon: 'rocket', title: 'الوكالات', desc: 'إنتاج واضح وسريع' },
        { icon: 'book', title: 'الأعمال التعليمية', desc: 'تحسين للنمو' },
      ],
    },
    process: {
      badge: 'طريقة العمل',
      title: 'طريقة العمل',
      subtitle: 'نبدأ بفهم العمل الحقيقي قبل بناء أي أداة أو حملة.',
      steps: [
        { num: '٠١', title: 'تشخيص الوضع الحالي', desc: 'نفهم طريقة العمل، مصادر البيانات، نقاط التعطيل، وأهم ما يحتاجه صاحب القرار.' },
        { num: '٠٢', title: 'تصميم النظام المناسب', desc: 'نرسم سير العمل، نحدد المسؤوليات، ونختار الأدوات واللوحات المطلوبة حسب الأولوية.' },
        { num: '٠٣', title: 'البناء والتنفيذ', desc: 'نبني الطبقة العملية: لوحة متابعة، أدوات، أتمتة، أو نظام تسويق حسب النطاق المتفق عليه.' },
        { num: '٠٤', title: 'التسليم والتدريب', desc: 'نراجع النظام مع الفريق، نوضح طريقة الاستخدام، ونسلّم الملفات والروابط والتوثيق.' },
        { num: '٠٥', title: 'المتابعة والتحسين', desc: 'عند الاستمرار معنا، نتابع النظام شهريًا ونطوره حسب النتائج والاحتياج الجديد.' },
      ],
      questions: {
        title: 'كل نظام يجب أن يجيب عن ٣ أسئلة:',
        items: [
          'ما المشكلة التي يحلها هذا؟',
          'من سيستخدمه يومياً؟',
          'كيف نعرف أن النظام يعمل؟',
        ],
      },
    },
    packages: {
      badge: 'مسارات التعاون',
      title: 'مسارات التعاون',
      subtitle: 'لا نثبت نطاقًا أو تكلفة قبل التشخيص. نحدد المسار المناسب بعد فهم طبيعة العمل.',
      sprint: {
        name: 'تشخيص وبداية منظمة',
        subtitle: 'لفهم المشكلة وتحديد أول خطوة عملية',
        badge: 'نقطة البداية',
        scope: 'يُحدد بعد التشخيص',
        features: [
          'تشخيص طريقة العمل الحالية',
          'تحديد نقاط التعطيل والأولوية',
          'خريطة أولية لسير العمل',
          'توصية بخدمة محددة أو أكثر',
          'تحديد البيانات والمواد المطلوبة',
          'خطوة تالية واضحة وقابلة للتنفيذ',
        ],
        cta: 'ابدأ التشخيص',
      },
      full: {
        name: 'نظام تشغيل شامل',
        subtitle: 'لربط التشغيل والأدوات والأتمتة والتسويق',
        badge: 'مسار شامل',
        scope: 'نطاق مخصص حسب المشروع',
        features: [
          'تشخيص التشغيل والاحتياج',
          'تصميم سير العمل والمسؤوليات',
          'بناء اللوحات والأدوات المطلوبة',
          'ربط الأتمتة ونقاط المراجعة',
          'توثيق النظام وتدريب الفريق',
          'خطة واضحة للتسليم والتطوير',
        ],
        cta: 'ابدأ التشخيص',
      },
      managed: {
        name: 'شريك إدارة شهرية',
        subtitle: 'لمتابعة النظام وتحسينه بعد الإطلاق',
        badge: 'متابعة شهرية',
        scope: 'نطاق شهري مخصص',
        description: 'مناسب إذا كنت تريد استمرار AURA في متابعة النظام وتحسينه شهريًا حسب تطور العمل والاحتياجات الجديدة.',
        features: ['مراجعة شهرية للنظام', 'تحسين الأدوات واللوحات', 'تحديث سير العمل', 'تطوير الأتمتة', 'ترتيب الأولويات', 'طلبات وتحسينات جديدة'],
        cta: 'ناقش المتابعة الشهرية',
      },
      guide: {
        title: 'دليل اختيار نقطة البداية',
        items: [
          { if: 'إذا قلت: "نحن غير متأكدين ما يحتاج إصلاحه أولاً"', then: '← جلسة تشخيص مسار العمل' },
          { if: 'إذا قلت: "الفريق مشغول لكن العمل متفرق"', then: '← سبرنت تصميم مسار العمل' },
          { if: 'إذا قلت: "نحتاج أنظمة متابعة وقوالب"', then: '← بناء الأدوات الداخلية' },
          { if: 'إذا قلت: "المهام المتكررة تستهلك الفريق"', then: '← سبرنت أتمتة AI' },
          { if: 'إذا قلت: "المحتوى أو التسويق غير واضح"', then: '← سبرنت استراتيجية المحتوى والتسويق' },
          { if: 'إذا قلت: "الفكرة لا تزال غير واضحة أو لا نموذج تسليم"', then: '← سبرنت هيكلة المشروع' },
          { if: 'إذا قلت: "نحتاج تحويلاً كاملاً للشركة"', then: '← نظام تسريع الأعمال الكامل ✓' },
        ],
      },
      scopeNote: 'يتم تحديد النطاق والخطة بعد جلسة تشخيص وفهم سير العمل الفعلي، حجم البيانات، الأدوات الحالية، وعمق التنفيذ المطلوب.',
    },
    differentiators: {
      badge: 'لماذا AURA',
      title: 'لماذا AURA؟',
      items: [
        { icon: 'target', title: 'نبدأ من سير العمل لا من الأداة', desc: 'الأداة وحدها لا تحل المشكلة إذا كان مسار العمل غير واضح. لذلك نفهم التشغيل أولًا.', quote: 'نختار التقنية بعد تحديد المشكلة والاستخدام اليومي.' },
        { icon: 'layers', title: 'نربط الإدارة بالتنفيذ', desc: 'نساعد صاحب القرار على رؤية ما يحدث وما يحتاج تدخله وما يمكن تحسينه.', quote: 'المتابعة الجيدة تبدأ من معلومات واضحة وفي وقت مناسب.' },
        { icon: 'refresh', title: 'نبني أنظمة قابلة للتطوير', desc: 'نصمم الحل بطريقة يمكن تطويرها لاحقًا بدل بناء شيء مؤقت يصعب تعديله.', quote: 'النظام الجيد يتطور مع العمل دون أن يفقد وضوحه.' },
        { icon: 'trend', title: 'التسويق جزء من النظام', desc: 'نتعامل مع التسويق كمسار مرتبط بالعملاء والمبيعات والمتابعة، لا كمنشورات منفصلة.', quote: 'كل نشاط تسويقي يجب أن يرتبط بفرصة يمكن متابعتها.' },
      ],
    },
    examples: {
      badge: 'أمثلة',
      title: 'كيف يبدو النظام في شركتك؟',
      items: [
        {
          icon: 'palette',
          title: 'وكالة تسويق',
          challenge: 'ملفات، بريفات، أفكار، أوامر، تعليقات، تعديلات، موافقات، فواتير',
          result: ['خط إنتاج بصري كامل', 'كل مشروع يتتبع من البريف للتسليم', 'مراحل واضحة للموافقة والتعديل', 'لا طلبات أو تعديلات ضائعة'],
        },
        {
          icon: 'bot',
          title: 'استديو مع AI',
          challenge: 'أفكار، طلبات، أحداث، جدولة، نشر — كل شيء يربط يدوياً',
          result: ['مسار محتوى مُدار', 'تطوير أفكار بمساعدة AI', 'مراحل واضحة للإنتاج والمراجعة', 'تقييم نشر متسق'],
        },
        {
          icon: 'health',
          title: 'أكاديمي / طبي',
          challenge: 'مواعيد، محاضرات، طلاب، جداول، مواد، مصاريف',
          result: ['مركز عمليات إدارية كامل', 'أتمتة التسجيل والجدولة والتذكير', 'تتبع الحضور وتقدم الطلاب', 'تنسيق يدوي أقل للفريق'],
        },
        {
          icon: 'inbox',
          title: 'عمليات واستقبال',
          challenge: 'استفسارات جديدة، متابعة متفرقة، تتبع غير منظم — إيرادات ضائعة',
          result: ['مسار استقبال قابل للتوسع', 'متابعة مؤتمتة مع تكامل CRM', 'مسؤولية واضحة في كل مرحلة', 'لا عميل محتمل يسقط من الشبكة'],
        },
      ],
    },
    tools: {
      badge: 'تقنيات مرنة',
      title: 'التقنيات تعتمد على النظام',
      subtitle: 'لا نفرض أداة. نختار التقنية المناسبة بناءً على سير العمل والفريق والميزانية واحتياجات التوسع. هذه أمثلة وليست قائمة ثابتة.',
      categories: [
        {
          name: 'الأتمتة',
          tools: [
            { name: 'n8n', desc: 'أتمتة مفتوحة المصدر — تحكم كامل' },
            { name: 'Make', desc: 'أتمتة سير عمل معقد' },
            { name: 'Webhooks', desc: 'أحداث موثوقة بين الأنظمة' },
          ],
        },
        {
          name: 'وكلاء AI',
          tools: [
            { name: 'CrewAI', desc: 'تنسيق متعدد الوكلاء' },
            { name: 'LangChain', desc: 'تكامل AI متقدم' },
            { name: 'أنظمة أوامر مخصصة', desc: 'مصممة حول سير العمل الفعلي' },
          ],
        },
        { name: 'لوحات المعلومات', tools: [{ name: 'Metabase', desc: 'تقارير تشغيلية' }, { name: 'لوحات مخصصة', desc: 'واجهات داخلية مركزة' }, { name: 'تقارير داخلية', desc: 'ملخصات جاهزة للقرار' }] },
        { name: 'التكاملات', tools: [{ name: 'APIs', desc: 'ربط الأنظمة الحالية' }, { name: 'النماذج', desc: 'إدخال بيانات منظم' }, { name: 'الدفع وCRM والعمليات', desc: 'ربط الأدوات المستخدمة بالفعل' }] },
        {
          name: 'قواعد البيانات و CRM',
          tools: [
            { name: 'Notion', desc: 'قواعد بيانات، تتبع، توثيق' },
            { name: 'Airtable', desc: 'إدارة مشاريع' },
            { name: 'CRM مخصص', desc: 'مبني حول سير عملك' },
          ],
        },
      ],
    },
    contact: {
      badge: 'ابدأ الآن',
      title: 'ابدأ بخطوة واضحة',
      subtitle: 'أرسل لنا نبذة عن نشاطك، وسنساعدك على تحديد أول خطوة مناسبة لبناء نظام أوضح.',
      email: 'amirelshazly66@gmail.com',
      phone: '+20 102 924 0066',
      location: 'مصر / عن بُعد',
      details: {
        email: 'البريد الإلكتروني',
        whatsapp: 'واتساب',
        location: 'الموقع',
      },
      actions: [
        {
          label: 'A',
          icon: 'target',
          title: 'ابدأ بتشخيص مبدئي',
          text: 'أخبرنا عن طريقة العمل الحالية والمشكلة الأساسية التي تريد حلها.',
          cta: 'ابدأ عبر واتساب',
          type: 'diagnosis',
        },
        {
          label: 'B',
          icon: 'book',
          title: 'أرسل نبذة عن نشاطك',
          text: 'شاركنا موقعك، طبيعة الخدمة، وأهم التحديات الحالية.',
          cta: 'أرسل بريدًا',
          type: 'brief',
        },
        {
          label: 'C',
          icon: 'refresh',
          title: 'ناقش المتابعة الشهرية',
          text: 'إذا كان لديك نظام قائم وتحتاج جهة تتابعه وتحسنه شهريًا.',
          cta: 'ناقش المتابعة',
          type: 'monthly',
        },
      ],
    },
    footer: {
      tagline: 'استوديو تسريع الأعمال',
      rights: 'جميع الحقوق محفوظة.',
      built: 'بُني بدقة.',
    },
  },
};

const aura2026Content = {
  en: {
    nav: {
      home: 'Home',
      services: 'Layers',
      process: 'Method',
      packages: 'Engagement',
      why: 'Why AURA',
      contact: 'Contact',
      cta: 'Start Now',
    },
    loader: {
      tagline: 'Enterprise Business Acceleration Studio',
      line1: 'Turn scattered work into intelligent systems.',
      line2: 'Built for complex operations and leadership visibility.',
    },
    hero: {
      badge: 'AURA · Enterprise Business Acceleration Studio',
      title1: 'Enterprise-grade',
      title2: 'acceleration',
      title3: 'for companies that',
      title4: 'outgrew their systems.',
      subheadline: 'We diagnose operations, redesign workflows, build internal tools, connect AI agents, and turn scattered work into measurable operating systems.',
      description: 'When a company grows faster than its systems, time disappears between messages, spreadsheets, and invisible decisions. AURA builds an intelligent operating layer that makes work clearer, follow-up faster, and decisions more data-informed.',
      cta1: 'Start Diagnosis',
      cta2: 'Explore Service Layers',
      trust: 'Designed for larger companies, business groups, and leadership teams that need real operational visibility.',
    },
    why: {
      badge: 'The Operating Problem',
      title: 'When the company grows faster than the system',
      subtitle: 'More teams, projects, subsidiaries, and data make manual follow-up expensive, fragile, and hard to scale.',
      problems: [
        { icon: 'scatter', title: 'Scattered Operations', desc: 'Messages, sheets, tasks, and decisions live in disconnected places with no single operating layer.' },
        { icon: 'delay', title: 'Slow Visibility', desc: 'Leadership discovers risk late because status, ownership, and blockers are not visible early enough.' },
        { icon: 'waste', title: 'Disconnected Tools', desc: 'Dashboards, automations, AI, and marketing do not create value when they are separated from real workflow.' },
        { icon: 'loss', title: 'Unclear Decisions', desc: 'Teams move with partial context, duplicated effort, and weak links between data and execution.' },
      ],
      solution: {
        title: 'What AURA builds differently',
        desc: 'AURA does not sell isolated tools. We diagnose how the company works, redesign the workflow, build internal tools, connect AI agents, improve growth systems, and create a measurable operating layer for leadership.',
      },
    },
    enterprise: {
      badge: 'Enterprise Ready',
      title: 'Designed for companies that outgrew their systems',
      subtitle: 'AURA is built for larger companies, business groups, real estate and development teams, service operations, and organizations with complex daily follow-up.',
      cards: [
        { icon: 'layers', title: 'Multi-company Groups', text: 'When each company works differently and leadership lacks one view of priorities, we rebuild a shared operating layer that shows the full picture.' },
        { icon: 'workflow', title: 'Large Operations Teams', text: 'We turn projects, follow-ups, risks, and decisions into clear stages and dashboards so delays appear before they become crises.' },
        { icon: 'chart', title: 'Data-led Management', text: 'We connect scattered information into one system that helps leaders make faster and more accurate decisions.' },
        { icon: 'bot', title: 'AI Inside Operations', text: 'AI agents become part of the workflow with human review points, not separate experiments outside the real system.' },
      ],
      map: ['Diagnose', 'Workflow', 'Tools', 'AI Agents', 'Decision Layer'],
    },
    services: {
      badge: 'Service Layers',
      title: 'Ten Integrated Service Layers',
      subtitle: 'AURA can build a complete operating system or select the highest-impact layers after diagnosis. Each card stays intentionally short; details are scoped with the team.',
      layers: [
        {
          num: '01',
          title: 'Work System Diagnosis',
          problem: 'A deep review that reveals where resources are wasted, which problems matter most, and where intervention should begin.',
          solution: 'AURA maps the current operating reality, clarifies bottlenecks, and turns uncertainty into a prioritized leadership brief.',
          kpis: ['Operations problem map', 'Financial or operational impact view', 'Clear implementation priorities', 'Executive summary for leadership'],
          impact: 'Target outcome: sharper priorities and a practical starting point.',
          icon: 'search',
          isNew: false,
        },
        {
          num: '02',
          title: 'Workflow & Process Design',
          problem: 'Invisible work becomes delays, unclear ownership, and repeated follow-up across teams.',
          solution: 'We translate daily work into stages, responsibilities, review points, and a weekly operating rhythm.',
          kpis: ['Workflow map', 'Stages and responsibilities', 'Follow-up templates', 'Weekly review system'],
          impact: 'Target outcome: clearer handoffs and fewer hidden blockers.',
          icon: 'flow',
          isNew: false,
        },
        {
          num: '03',
          title: 'Internal Tools & Software',
          problem: 'Generic tools do not match how the team actually works, so people return to sheets and manual reminders.',
          solution: 'We build dashboards, forms, trackers, and lightweight databases around the team’s real usage patterns.',
          kpis: ['Dashboards', 'Smart forms', 'Internal databases', 'Custom tracking tools'],
          impact: 'Target outcome: tools that reduce admin friction instead of adding it.',
          icon: 'build',
          isNew: false,
        },
        {
          num: '04',
          title: 'AI Automation & Agents',
          problem: 'Repetitive reports, reminders, analysis, and handoffs consume senior team time.',
          solution: 'We connect repeatable work to AI agents and automations with human review where quality or approval matters.',
          kpis: ['Follow-up agents', 'Automated reports', 'Smart alerts', 'Human review points'],
          impact: 'Target outcome: less manual coordination and better operational rhythm.',
          icon: 'bot',
          isNew: false,
        },
        {
          num: '05',
          title: 'Growth & Marketing Strategy',
          problem: 'Content, campaigns, competitors, and lead follow-up often operate separately from the company system.',
          solution: 'We build a growth engine that connects content, campaigns, competitor learning, and opportunity tracking.',
          kpis: ['Competitor analysis', 'Content ideas', 'Publishing calendar', 'Opportunity tracking system'],
          impact: 'Target outcome: marketing connected to follow-up and sales decisions.',
          icon: 'trend',
          isNew: false,
        },
        {
          num: '06',
          title: 'Project & Business Structuring',
          problem: 'New units or offers launch without a clear promise, customer journey, delivery model, or launch plan.',
          solution: 'We structure the offer, client path, delivery model, and launch plan so the project can move with less ambiguity.',
          kpis: ['Clear offer', 'Customer journey', 'Delivery model', 'Launch and first-revenue plan'],
          impact: 'Target outcome: a clearer path from idea to market.',
          icon: 'rocket',
          isNew: false,
        },
        {
          num: '07',
          title: 'Live Growth Strategies',
          problem: 'Growth plans become outdated when market data, competitors, and campaign signals change.',
          solution: 'We build a live strategy layer that monitors signals, suggests campaign directions, and keeps human approval before publishing.',
          kpis: ['Continuous data review', 'Campaign suggestions', 'Human approval workflow', 'Live strategy updates'],
          impact: 'Potential impact is estimated after diagnosis and depends on data quality and speed of execution.',
          icon: 'sparkle',
          isNew: true,
        },
        {
          num: '08',
          title: 'Company Digital Twin',
          problem: 'Leadership decisions carry risk when scenarios are not compared before changes are made.',
          solution: 'We design a lightweight virtual model of the company to compare operational, marketing, or structural decisions before execution.',
          kpis: ['Decision simulation', 'Scenario comparison', 'Operational or financial impact estimate', 'Decision refinement before risk'],
          impact: 'Potential impact is scoped after diagnosis; results vary by data quality and model depth.',
          icon: 'chart',
          isNew: true,
        },
        {
          num: '09',
          title: 'Hyper-personalized Real Estate Marketing',
          problem: 'Real estate buyers receive the same generic message even when intent, budget, and project fit differ.',
          solution: 'We can connect buyer data, campaigns, dynamic content, interactive showcases, and campaign-to-sales follow-up. 3D or VR-ready concepts are scoped only when needed.',
          kpis: ['Personalized property content', 'Interactive showcases', 'Buyer-type customization', 'Campaign-to-sales connection'],
          impact: 'Advanced proof of capability; scope is defined after diagnosis, especially for 3D or VR-ready experiences.',
          icon: 'layers',
          isNew: true,
        },
        {
          num: '10',
          title: 'Autonomous Smart Agent System',
          problem: 'Research, reports, sales support, and market analysis often require constant manual attention.',
          solution: 'We design a digital team of specialized agents for research, reporting, sales support, and market analysis under human supervision.',
          kpis: ['Sales agent', 'Reporting agent', 'Research agent', 'Human supervision', 'Continuous follow-up system'],
          impact: 'Potential impact depends on scope, governance, data access, and team adoption.',
          icon: 'bot',
          isNew: true,
        },
      ],
      who: [
        { icon: 'layers', title: 'Large Companies', desc: 'Complex operations and many moving parts' },
        { icon: 'settings', title: 'Business Groups', desc: 'Shared visibility across units' },
        { icon: 'rocket', title: 'Real Estate & Development', desc: 'Sales, campaigns, projects, and follow-up' },
        { icon: 'book', title: 'Service Operations', desc: 'Teams, delivery, data, and daily tracking' },
      ],
    },
    realEstate: {
      badge: 'Proof of Capability',
      title: 'Applied Example: Real Estate & Interactive Experiences',
      subtitle: 'Real estate shows how AURA connects operations, marketing, data, and interactive environments inside one operating path.',
      copy: 'For real estate companies, one ad is rarely enough for every buyer. AURA can build a system that connects buyer data, campaigns, content, landing pages, interactive showcases, and sales follow-up. When needed, 3D environments or VR-ready concepts can help prospects explore a project more deeply before a buying decision.',
      points: ['Personalized real estate marketing', 'AI-assisted content support', 'Interactive property showcases', '3D / VR-ready environments when scoped', 'Sales enablement experiences', 'Lead tracking', 'Campaign-to-sales connection'],
      cta: 'Discuss a similar case for your company',
    },
    process: {
      badge: 'AURA Method',
      title: 'AURA Methodology',
      subtitle: 'Every engagement moves through clear stages, and every stage must produce something usable.',
      steps: [
        { num: '01', title: 'Diagnosis', desc: 'We understand the company, teams, tools, data, and highest-impact operating problems.' },
        { num: '02', title: 'System Design', desc: 'We map workflow, responsibilities, follow-up points, and the layers needed for the first phase.' },
        { num: '03', title: 'Build the Layers', desc: 'We build dashboards, tools, automations, agents, or growth layers depending on scope.' },
        { num: '04', title: 'Review & Training', desc: 'We test the system with the team, document usage, and refine what needs adjustment.' },
        { num: '05', title: 'Operate & Improve', desc: 'We monitor results, update priorities, and add monthly improvements when the partnership continues.' },
      ],
      questions: {
        title: 'Before any solution is delivered, AURA asks:',
        items: [
          'What exact problem does this solve?',
          'Will the team actually use it?',
          'How do we know it creates value?',
        ],
      },
    },
    packages: {
      badge: 'Engagement Models',
      title: 'Enterprise-Friendly Engagement Models',
      subtitle: 'No fixed pricing and no generic package promise. Scope and pricing are defined after diagnosis.',
      sprint: {
        name: 'Focused Sprint',
        subtitle: 'One deep layer for one clear problem',
        badge: '21-30 Days',
        scope: 'Scope and pricing after diagnosis',
        features: [
          'A focused intervention around one operational problem',
          'Diagnosis of the selected layer',
          'Workflow or tool design for the priority issue',
          'A usable output, not just recommendations',
          'Best for testing AURA or solving a defined bottleneck',
        ],
        cta: 'Start Diagnosis',
      },
      full: {
        name: 'Full Acceleration System',
        subtitle: 'A multi-layer transformation over 3-6 months',
        badge: 'Most Complete',
        scope: 'Custom enterprise scope',
        features: [
          'Several integrated service layers',
          'Diagnosis, workflow design, tools, and automation',
          'Leadership visibility and operating dashboards',
          'Team review, training, and documentation',
          'Roadmap for future expansion and governance',
        ],
        cta: 'Start Diagnosis',
      },
      managed: {
        name: 'Continuous Improvement Partner',
        subtitle: 'Monthly ownership after launch',
        badge: 'Monthly',
        scope: 'Monthly custom scope',
        description: 'Ongoing improvement for the operating system after launch: reports, updates, automations, refinements, and monthly priorities.',
        features: ['Monthly system review', 'Priority roadmap', 'Workflow updates', 'Automation refinement', 'Reporting improvements', 'New requests and enhancements'],
        cta: 'Discuss Monthly Support',
      },
      guide: {
        title: 'Best Fit',
        items: [
          { if: 'If you need to test the studio or solve one clear operational point', then: 'Focused Sprint' },
          { if: 'If leadership wants a complete operating layer across teams and data', then: 'Full Acceleration System' },
          { if: 'If the system already exists but needs monthly ownership and improvement', then: 'Continuous Improvement Partner' },
          { if: 'If scope is unclear', then: 'Start with diagnosis, then define the right layer' },
        ],
      },
      scopeNote: 'Scope and pricing are determined after diagnosis because results depend on company size, data quality, operating complexity, and team adoption.',
    },
    differentiators: {
      badge: 'Why AURA',
      title: 'Why AURA?',
      items: [
        { icon: 'layers', title: 'We see the company as one system', desc: 'We do not separate marketing from operations or tools from decisions. We build the layer that connects them.', quote: 'One operating view is more useful than another disconnected tool.' },
        { icon: 'target', title: 'We start with the problem, not the technology', desc: 'AI and dashboards are only useful when each layer solves a real operational problem.', quote: 'The question is not “can we automate it?” but “should this improve the work?”' },
        { icon: 'settings', title: 'Built for complex companies', desc: 'The more teams, projects, and data you have, the more valuable a clear operating system becomes.', quote: 'Complexity needs structure before speed.' },
        { icon: 'bot', title: 'AI under human supervision', desc: 'Agents and automations work inside review points that protect quality, governance, and decisions.', quote: 'Automation supports leadership; it does not replace judgment.' },
        { icon: 'refresh', title: 'Designed to scale', desc: 'We can start with one sprint or layer, then expand the system based on priorities and results.', quote: 'The best system can grow without losing clarity.' },
      ],
    },
    examples: {
      badge: 'Operating Examples',
      title: 'How an AURA System Can Look',
      items: [
        {
          icon: 'layers',
          title: 'Business Group',
          challenge: 'Subsidiaries, units, priorities, reports, and follow-up all move differently.',
          result: ['Shared operating view', 'Priority tracking across units', 'Leadership-ready reports', 'Clear escalation path'],
        },
        {
          icon: 'trend',
          title: 'Real Estate Developer',
          challenge: 'Projects, buyer data, campaigns, inventory, sales follow-up, and content are disconnected.',
          result: ['Campaign-to-sales tracking', 'Buyer segmentation', 'Interactive showcase layer when scoped', 'Clear sales enablement path'],
        },
        {
          icon: 'bot',
          title: 'AI Operations Layer',
          challenge: 'Reports, analysis, reminders, and research depend on manual follow-up.',
          result: ['Specialized AI agents', 'Human approval points', 'Automated reporting rhythm', 'Continuous improvement queue'],
        },
        {
          icon: 'chart',
          title: 'Decision Intelligence',
          challenge: 'Leadership receives status late and decisions are made without a shared data picture.',
          result: ['Unified operating dashboard', 'Scenario comparison', 'Risk visibility', 'Better weekly review structure'],
        },
      ],
    },
    contact: {
      badge: 'Start Now',
      title: 'Start with a work-system diagnosis',
      subtitle: 'Share your company type, number of teams or units, and the biggest point of friction today. We will suggest the most suitable first intervention layer.',
      email: 'amirelshazly66@gmail.com',
      phone: '+20 102 924 0066',
      location: 'Egypt / Remote',
      details: {
        email: 'Email',
        whatsapp: 'WhatsApp',
        location: 'Location',
      },
      actions: [
        {
          label: 'A',
          icon: 'target',
          title: 'Start Diagnosis',
          text: 'Tell us where operations feel slow, scattered, invisible, or hard to control.',
          cta: 'Start on WhatsApp',
          type: 'diagnosis',
        },
        {
          label: 'B',
          icon: 'book',
          title: 'Send a Company Brief',
          text: 'Send a short brief about your company, team structure, systems, and current friction.',
          cta: 'Send Email Brief',
          type: 'brief',
        },
        {
          label: 'C',
          icon: 'refresh',
          title: 'Discuss Your Company Case',
          text: 'For groups, real estate teams, or complex operations that need a tailored operating layer.',
          cta: 'Discuss Monthly Support',
          type: 'monthly',
        },
      ],
    },
    footer: {
      tagline: 'Enterprise Business Acceleration Studio',
      rights: 'All rights reserved.',
      built: 'Built with precision.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      services: 'الطبقات',
      process: 'المنهجية',
      packages: 'نماذج التعاون',
      why: 'لماذا AURA',
      contact: 'تواصل',
      cta: 'ابدأ الآن',
    },
    loader: {
      tagline: 'استوديو تسريع الأعمال للمؤسسات',
      line1: 'نحوّل العمل المتفرق إلى منظومات ذكية.',
      line2: 'مصمم للشركات المعقدة ورؤية القيادة.',
    },
    hero: {
      badge: 'AURA · استوديو تسريع الأعمال للمؤسسات',
      title1: 'حوّل شركتك',
      title2: 'إلى منظومة',
      title3: 'ذكية قابلة',
      title4: 'للنمو.',
      subheadline: 'نساعد الشركات والمجموعات على تشخيص التشغيل، تصميم سير العمل، بناء الأدوات، وربط الذكاء الاصطناعي داخل نظام واحد قابل للمتابعة والتطوير.',
      description: 'عندما تكبر الشركة أسرع من أنظمتها، يبدأ الوقت في الضياع بين الرسائل والجداول والقرارات غير المرئية. AURA تبني طبقة تشغيل ذكية تجعل العمل أوضح، المتابعة أسرع، والقرارات مبنية على بيانات.',
      cta1: 'ابدأ التشخيص',
      cta2: 'استعرض طبقات الخدمة',
      trust: 'مصمم للشركات الكبيرة، المجموعات، وفرق الإدارة التي تحتاج رؤية تشغيلية حقيقية.',
    },
    why: {
      badge: 'مشكلة التشغيل',
      title: 'حين تكبر الشركة أسرع من أنظمتها',
      subtitle: 'كلما زاد عدد الفرق والمشاريع والشركات التابعة، أصبحت المتابعة اليدوية أكثر تكلفة وخطورة.',
      problems: [
        { icon: 'scatter', title: 'تشغيل متفرق', desc: 'الرسائل والجداول والمهام والقرارات موزعة بين أماكن متعددة بلا طبقة تشغيل موحدة.' },
        { icon: 'delay', title: 'رؤية متأخرة', desc: 'تكتشف الإدارة المخاطر متأخرًا لأن الحالة والمسؤوليات ونقاط التعطيل لا تظهر مبكرًا.' },
        { icon: 'waste', title: 'أدوات غير مترابطة', desc: 'الداشبورد أو الأتمتة أو الذكاء الاصطناعي لا تصنع قيمة إذا كانت منفصلة عن سير العمل الحقيقي.' },
        { icon: 'loss', title: 'قرارات غير واضحة', desc: 'تتحرك الفرق بسياق ناقص وجهد مكرر وضعف في الربط بين البيانات والتنفيذ.' },
      ],
      solution: {
        title: 'كيف تبني AURA القيمة؟',
        desc: 'AURA لا تبيع أدوات منفصلة. نبدأ بتشخيص طريقة العمل، ثم نصمم سير التشغيل، ونبني الأدوات، ونربط الذكاء الاصطناعي، ونحوّل البيانات إلى قرارات ومتابعة وتنفيذ.',
      },
    },
    enterprise: {
      badge: 'مصمم للمؤسسات',
      title: 'مصمم للشركات التي كبرت أسرع من أنظمتها',
      subtitle: 'AURA مناسب للشركات الكبيرة، المجموعات متعددة الشركات، شركات العقارات والتطوير، وفرق التشغيل التي لديها متابعة يومية معقدة.',
      cards: [
        { icon: 'layers', title: 'مجموعات متعددة الشركات', text: 'عندما تعمل كل شركة بطريقة مختلفة ولا توجد رؤية موحدة للأولويات، نعيد بناء منظومة تشغيل مشتركة تساعد الإدارة على رؤية الصورة الكاملة.' },
        { icon: 'workflow', title: 'فرق تشغيل ومشاريع كبيرة', text: 'نحوّل المشاريع والمتابعات والقرارات إلى مراحل واضحة ولوحات متابعة تجعل التأخير والمخاطر ظاهرة قبل أن تتحول إلى أزمة.' },
        { icon: 'chart', title: 'إدارة تعتمد على البيانات', text: 'نربط المعلومات المتفرقة داخل نظام واحد يساعد القيادة على اتخاذ قرارات أسرع وأدق.' },
        { icon: 'bot', title: 'ذكاء اصطناعي داخل التشغيل', text: 'نستخدم الذكاء الاصطناعي كجزء من سير العمل، وليس كأداة منفصلة خارج النظام، مع نقاط مراجعة بشرية.' },
      ],
      map: ['تشخيص', 'سير العمل', 'الأدوات', 'وكلاء AI', 'طبقة القرار'],
    },
    services: {
      badge: 'طبقات الخدمة',
      title: 'طبقات الخدمة',
      subtitle: 'عشر طبقات متكاملة يمكن تنفيذها كمنظومة كاملة، أو اختيار الطبقات الأكثر تأثيرًا حسب احتياج الشركة بعد التشخيص.',
      layers: [
        {
          num: '01',
          title: 'تشخيص نظام العمل',
          problem: 'فحص عميق يكشف أين تضيع الموارد، ما المشكلات الأعلى تأثيرًا، وما أولويات التدخل.',
          solution: 'نرسم الواقع التشغيلي الحالي، نحدد نقاط التعطيل، ونحوّل الغموض إلى ملخص تنفيذي قابل للتنفيذ.',
          kpis: ['خريطة مشكلات التشغيل', 'تحليل الأثر المالي أو التشغيلي', 'أولويات تنفيذ واضحة', 'عرض تنفيذي مختصر للقيادة'],
          impact: 'الأثر المستهدف: أولويات أوضح ونقطة بداية عملية.',
          icon: 'search',
          isNew: false,
        },
        {
          num: '02',
          title: 'تصميم سير العمل والعمليات',
          problem: 'العمل غير المرئي يتحول إلى تأخير ومسؤوليات غير واضحة ومتابعة متكررة.',
          solution: 'نحوّل العمل اليومي إلى مراحل ومسؤوليات ونقاط مراجعة وإيقاع متابعة أسبوعي واضح.',
          kpis: ['خريطة سير العمل', 'مراحل ومسؤوليات', 'قوالب متابعة', 'نظام مراجعة أسبوعي'],
          impact: 'الأثر المستهدف: تسليم أوضح وفجوات أقل بين الفرق.',
          icon: 'flow',
          isNew: false,
        },
        {
          num: '03',
          title: 'الأدوات والبرمجيات الداخلية',
          problem: 'الأدوات العامة لا تناسب طريقة عمل الفريق، فيعود الناس إلى الجداول والتذكير اليدوي.',
          solution: 'نبني لوحات ونماذج ومتتبعات وقواعد بيانات خفيفة حول استخدام الفريق الفعلي.',
          kpis: ['لوحات تحكم', 'نماذج ذكية', 'قواعد بيانات داخلية', 'أدوات متابعة مخصصة'],
          impact: 'الأثر المستهدف: أدوات تقلل العبء الإداري بدل أن تضيفه.',
          icon: 'build',
          isNew: false,
        },
        {
          num: '04',
          title: 'أتمتة الذكاء الاصطناعي والوكلاء',
          problem: 'التقارير والتذكير والتحليل والتسليمات المتكررة تستهلك وقت الفريق.',
          solution: 'نربط المهام المتكررة بوكلاء وأتمتة مع مراجعة بشرية عندما تكون الجودة أو الموافقة مهمة.',
          kpis: ['وكلاء متابعة', 'تقارير آلية', 'تنبيهات ذكية', 'نقاط مراجعة بشرية'],
          impact: 'الأثر المستهدف: تنسيق يدوي أقل وإيقاع تشغيل أفضل.',
          icon: 'bot',
          isNew: false,
        },
        {
          num: '05',
          title: 'استراتيجية النمو والتسويق',
          problem: 'المحتوى والحملات والمنافسون ومتابعة العملاء يعملون غالبًا خارج نظام الشركة.',
          solution: 'نبني محرك نمو يربط المحتوى والحملات وتحليل المنافسين وتتبع الفرص داخل نظام واحد.',
          kpis: ['تحليل منافسين', 'أفكار محتوى', 'تقويم نشر', 'نظام تتبع فرص'],
          impact: 'الأثر المستهدف: تسويق مرتبط بالمتابعة وقرارات البيع.',
          icon: 'trend',
          isNew: false,
        },
        {
          num: '06',
          title: 'هيكلة المشاريع والأعمال',
          problem: 'الوحدات أو العروض الجديدة تبدأ أحيانًا بلا وعد واضح أو رحلة عميل أو نموذج تسليم.',
          solution: 'نهيكل العرض ورحلة العميل ونموذج التسليم وخطة الإطلاق حتى يتحرك المشروع بغموض أقل.',
          kpis: ['عرض واضح', 'رحلة عميل', 'نموذج تسليم', 'خطة إطلاق وأول إيراد'],
          impact: 'الأثر المستهدف: طريق أوضح من الفكرة إلى السوق.',
          icon: 'rocket',
          isNew: false,
        },
        {
          num: '07',
          title: 'استراتيجيات النمو الحية',
          problem: 'خطط النمو تصبح قديمة عندما تتغير بيانات السوق والمنافسين وإشارات الحملات.',
          solution: 'نبني طبقة استراتيجية حية تراقب الإشارات وتقترح اتجاهات حملات مع مراجعة بشرية قبل النشر.',
          kpis: ['تحليل بيانات مستمر', 'اقتراح حملات', 'مراجعة وموافقة بشرية', 'تحديثات استراتيجية حية'],
          impact: 'يتم تقدير الأثر بعد التشخيص، وتختلف النتائج حسب جودة البيانات وسرعة التطبيق.',
          icon: 'sparkle',
          isNew: true,
        },
        {
          num: '08',
          title: 'النسخة الافتراضية للشركة',
          problem: 'قرارات القيادة تحمل مخاطرة عندما لا تتم مقارنة السيناريوهات قبل التنفيذ.',
          solution: 'نصمم نموذجًا افتراضيًا خفيفًا للشركة لاختبار القرارات التشغيلية أو التسويقية أو الهيكلية قبل المخاطرة.',
          kpis: ['محاكاة قرارات', 'مقارنة سيناريوهات', 'توقع أثر تشغيلي أو مالي', 'تحسين القرار قبل المخاطرة'],
          impact: 'يتم تقدير الأثر بعد التشخيص حسب جودة البيانات وعمق النموذج.',
          icon: 'chart',
          isNew: true,
        },
        {
          num: '09',
          title: 'التسويق العقاري مفرط التخصيص',
          problem: 'المشتري العقاري لا يحتاج نفس الرسالة دائمًا؛ النية والميزانية وملاءمة المشروع تختلف.',
          solution: 'نربط بيانات العملاء والحملات والمحتوى الديناميكي وتجارب العرض التفاعلية ومسار البيع. مفاهيم 3D أو VR-ready تُحدد فقط عند الحاجة.',
          kpis: ['محتوى عقاري مخصص', 'صفحات أو تجارب عرض تفاعلية', 'تخصيص حسب نوع المشتري', 'ربط الحملات بالمتابعة والمبيعات'],
          impact: 'دليل متقدم على القدرة؛ يتم تحديد النطاق بعد التشخيص خصوصًا لتجارب 3D أو VR-ready.',
          icon: 'layers',
          isNew: true,
        },
        {
          num: '10',
          title: 'نظام الوكلاء الأذكياء المستقلين',
          problem: 'البحث والتقارير ودعم المبيعات وتحليل السوق يحتاجون متابعة يدوية مستمرة.',
          solution: 'نصمم فريقًا رقميًا من وكلاء متخصصين للبحث والتقارير ودعم المبيعات وتحليل السوق مع إشراف بشري.',
          kpis: ['وكيل مبيعات', 'وكيل تقارير', 'وكيل بحث', 'إشراف بشري', 'نظام متابعة مستمر'],
          impact: 'الأثر المحتمل يعتمد على النطاق والحوكمة والوصول للبيانات وتبني الفريق.',
          icon: 'bot',
          isNew: true,
        },
      ],
      who: [
        { icon: 'layers', title: 'الشركات الكبيرة', desc: 'تشغيل معقد وأجزاء كثيرة متحركة' },
        { icon: 'settings', title: 'المجموعات', desc: 'رؤية مشتركة بين الوحدات' },
        { icon: 'rocket', title: 'العقارات والتطوير', desc: 'مبيعات وحملات ومشاريع ومتابعة' },
        { icon: 'book', title: 'شركات الخدمات والتشغيل', desc: 'فرق وتسليم وبيانات وتتبع يومي' },
      ],
    },
    realEstate: {
      badge: 'دليل تطبيقي',
      title: 'دليل تطبيقي: العقارات والتجارب التفاعلية',
      subtitle: 'القطاع العقاري يوضح قوة AURA في الدمج بين التشغيل، التسويق، البيانات، والبيئات التفاعلية.',
      copy: 'في الشركات العقارية، لا يكفي إعلان واحد لكل المشترين. يمكن لـ AURA بناء نظام يربط بيانات العملاء، الحملات، المحتوى، صفحات العرض، والتجارب التفاعلية في مسار واحد. وعند الحاجة، يمكن تطوير بيئات ثلاثية الأبعاد أو تجارب VR-ready تساعد العميل على استكشاف المشروع بشكل أعمق قبل قرار الشراء.',
      points: ['تسويق عقاري مخصص', 'دعم محتوى بالذكاء الاصطناعي', 'تجارب عرض تفاعلية', 'بيئات 3D / VR-ready عند الحاجة', 'تجارب تمكين المبيعات', 'تتبع العملاء المحتملين', 'ربط الحملات بالمبيعات'],
      cta: 'ناقش حالة مشابهة لشركتك',
    },
    process: {
      badge: 'منهجية AURA',
      title: 'منهجية AURA',
      subtitle: 'كل تعامل يمر بمراحل واضحة، وكل مرحلة يجب أن تنتج مخرجًا قابلًا للاستخدام.',
      steps: [
        { num: '01', title: 'التشخيص', desc: 'نفهم الشركة، فرق العمل، الأدوات، البيانات، والمشكلات الأعلى تأثيرًا.' },
        { num: '02', title: 'تصميم المنظومة', desc: 'نرسم سير العمل، المسؤوليات، نقاط المتابعة، والطبقات المطلوبة للمرحلة الأولى.' },
        { num: '03', title: 'بناء الأدوات والطبقات', desc: 'نبني الداشبورد، الأدوات، الأتمتة، الوكلاء، أو طبقة النمو حسب النطاق.' },
        { num: '04', title: 'المراجعة والتدريب', desc: 'نختبر النظام مع الفريق ونوثق طريقة الاستخدام ونحسّن ما يحتاج تعديلًا.' },
        { num: '05', title: 'التشغيل والتحسين', desc: 'نراقب النتائج، نحدث الأولويات، ونضيف تحسينات شهرية عند استمرار التعاون.' },
      ],
      questions: {
        title: 'قبل تسليم أي حل، تسأل AURA:',
        items: [
          'ما المشكلة المحددة التي يحلها هذا؟',
          'هل سيستخدمه الفريق فعليًا؟',
          'كيف نعرف أنه يخلق قيمة؟',
        ],
      },
    },
    packages: {
      badge: 'نماذج التعاون',
      title: 'نماذج التعاون',
      subtitle: 'لا توجد أسعار ثابتة أو وعود عامة. يتم تحديد النطاق والتكلفة بعد التشخيص.',
      sprint: {
        name: 'السبرنت المركزي',
        subtitle: 'طبقة واحدة بتركيز عميق لمعالجة مشكلة محددة',
        badge: '21-30 يوم',
        scope: 'النطاق والتكلفة بعد التشخيص',
        features: [
          'تدخل مركز حول مشكلة تشغيلية واضحة',
          'تشخيص الطبقة المختارة',
          'تصميم سير العمل أو الأداة المناسبة',
          'مخرج قابل للاستخدام وليس توصيات فقط',
          'مناسب لاختبار التعاون أو حل نقطة تعطيل محددة',
        ],
        cta: 'ابدأ التشخيص',
      },
      full: {
        name: 'نظام التسريع الكامل',
        subtitle: 'تحويل متعدد الطبقات خلال 3-6 شهور',
        badge: 'الأكثر تكاملًا',
        scope: 'نطاق مؤسسي مخصص',
        features: [
          'تنفيذ عدة طبقات متكاملة',
          'تشخيص وتصميم سير العمل والأدوات والأتمتة',
          'رؤية تشغيلية ولوحات متابعة للقيادة',
          'مراجعة وتدريب وتوثيق للفريق',
          'خارطة تطوير وحوكمة للمراحل التالية',
        ],
        cta: 'ابدأ التشخيص',
      },
      managed: {
        name: 'شريك التحسين المستمر',
        subtitle: 'متابعة شهرية بعد الإطلاق',
        badge: 'شهري',
        scope: 'نطاق شهري مخصص',
        description: 'متابعة وتحسين مستمر للمنظومة بعد الإطلاق: تقارير، تحديثات، أتمتة، تحسينات، وأولويات شهرية.',
        features: ['مراجعة شهرية للنظام', 'خارطة أولويات', 'تحديث سير العمل', 'تحسين الأتمتة', 'تطوير التقارير', 'طلبات وتحسينات جديدة'],
        cta: 'ناقش المتابعة الشهرية',
      },
      guide: {
        title: 'ما النموذج الأنسب؟',
        items: [
          { if: 'إذا أردت اختبار الاستوديو أو حل نقطة تشغيلية واضحة', then: 'السبرنت المركزي' },
          { if: 'إذا احتاجت الإدارة طبقة تشغيل كاملة بين الفرق والبيانات', then: 'نظام التسريع الكامل' },
          { if: 'إذا كان النظام قائمًا ويحتاج متابعة وتحسين شهري', then: 'شريك التحسين المستمر' },
          { if: 'إذا كان النطاق غير واضح', then: 'ابدأ بالتشخيص ثم نحدد الطبقة المناسبة' },
        ],
      },
      scopeNote: 'يُحدد النطاق والتكلفة بعد التشخيص لأن النتائج تعتمد على حجم الشركة، جودة البيانات، تعقيد التشغيل، والتزام الفريق بالتطبيق.',
    },
    differentiators: {
      badge: 'لماذا AURA',
      title: 'لماذا AURA؟',
      items: [
        { icon: 'layers', title: 'نرى الشركة كنظام كامل', desc: 'لا نفصل التسويق عن التشغيل، ولا الأدوات عن القرارات. نبني طبقة تربط كل ذلك.', quote: 'رؤية تشغيل واحدة أفضل من أداة إضافية منفصلة.' },
        { icon: 'target', title: 'نبدأ بالمشكلة لا بالتقنية', desc: 'لا نضيف AI أو dashboards لمجرد الإبهار. كل طبقة يجب أن تحل مشكلة تشغيلية واضحة.', quote: 'السؤال ليس: هل يمكن أتمتته؟ بل: هل سيحسن العمل؟' },
        { icon: 'settings', title: 'مناسب للشركات المعقدة', desc: 'كلما زاد عدد الفرق والمشاريع والبيانات، زادت قيمة وجود نظام واضح.', quote: 'التعقيد يحتاج هيكلة قبل السرعة.' },
        { icon: 'bot', title: 'ذكاء اصطناعي تحت إشراف بشري', desc: 'الوكلاء والأتمتة يعملون داخل نقاط مراجعة تحافظ على الجودة والقرار.', quote: 'الأتمتة تدعم القيادة ولا تستبدل الحكم البشري.' },
        { icon: 'refresh', title: 'قابل للتوسع', desc: 'نبدأ بطبقة أو سبرنت، ثم نوسع المنظومة حسب النتائج والأولوية.', quote: 'أفضل نظام يكبر دون أن يفقد وضوحه.' },
      ],
    },
    examples: {
      badge: 'أمثلة تشغيلية',
      title: 'كيف يمكن أن يبدو نظام AURA؟',
      items: [
        {
          icon: 'layers',
          title: 'مجموعة شركات',
          challenge: 'شركات تابعة، وحدات، أولويات، تقارير، ومتابعة تتحرك بطرق مختلفة.',
          result: ['رؤية تشغيل موحدة', 'تتبع أولويات بين الوحدات', 'تقارير مناسبة للقيادة', 'مسار تصعيد واضح'],
        },
        {
          icon: 'trend',
          title: 'شركة تطوير عقاري',
          challenge: 'المشاريع وبيانات المشترين والحملات والمخزون والمتابعة والمحتوى غير مترابطة.',
          result: ['ربط الحملات بالمبيعات', 'تقسيم المشترين', 'طبقة عرض تفاعلية عند الحاجة', 'مسار واضح لتمكين المبيعات'],
        },
        {
          icon: 'bot',
          title: 'طبقة تشغيل بالذكاء الاصطناعي',
          challenge: 'التقارير والتحليل والتذكير والبحث تعتمد على متابعة يدوية.',
          result: ['وكلاء ذكاء اصطناعي متخصصون', 'نقاط موافقة بشرية', 'إيقاع تقارير آلي', 'قائمة تحسين مستمرة'],
        },
        {
          icon: 'chart',
          title: 'ذكاء القرار',
          challenge: 'تصل الحالة للإدارة متأخرة، وتُتخذ القرارات بلا صورة بيانات مشتركة.',
          result: ['داشبورد تشغيل موحد', 'مقارنة سيناريوهات', 'رؤية مبكرة للمخاطر', 'هيكلة أفضل للمراجعة الأسبوعية'],
        },
      ],
    },
    contact: {
      badge: 'ابدأ الآن',
      title: 'ابدأ بتشخيص منظومة العمل',
      subtitle: 'شاركنا طبيعة شركتك، عدد الفرق أو الوحدات، وأكبر نقطة تعطيل حاليًا. سنقترح أول طبقة تدخل مناسبة.',
      email: 'amirelshazly66@gmail.com',
      phone: '+20 102 924 0066',
      location: 'مصر / عن بُعد',
      details: {
        email: 'البريد الإلكتروني',
        whatsapp: 'واتساب',
        location: 'الموقع',
      },
      actions: [
        {
          label: 'A',
          icon: 'target',
          title: 'ابدأ التشخيص',
          text: 'أخبرنا أين يبدو التشغيل بطيئًا، متفرقًا، غير مرئي، أو صعب السيطرة.',
          cta: 'ابدأ عبر واتساب',
          type: 'diagnosis',
        },
        {
          label: 'B',
          icon: 'book',
          title: 'أرسل نبذة عن الشركة',
          text: 'شاركنا نبذة عن الشركة، هيكل الفرق، الأنظمة الحالية، ونقطة التعطيل الرئيسية.',
          cta: 'أرسل بريدًا',
          type: 'brief',
        },
        {
          label: 'C',
          icon: 'refresh',
          title: 'ناقش حالة شركتك',
          text: 'للمجموعات، شركات العقارات، أو التشغيل المعقد الذي يحتاج طبقة تشغيل مخصصة.',
          cta: 'ناقش المتابعة',
          type: 'monthly',
        },
      ],
    },
    footer: {
      tagline: 'استوديو تسريع الأعمال للمؤسسات',
      rights: 'جميع الحقوق محفوظة.',
      built: 'بُني بدقة.',
    },
  },
} as const;

Object.assign(content.en, aura2026Content.en);
Object.assign(content.ar, aura2026Content.ar);

const auraSimpleContent = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      process: 'Method',
      packages: 'Options',
      why: 'Value',
      contact: 'Start',
      cta: 'Start Diagnosis',
    },
    loader: {
      tagline: 'Business Acceleration Studio',
      line1: 'Turn scattered operations into a clear system.',
      line2: 'Workflow. Tools. Automation. Growth.',
    },
    hero: {
      badge: 'AURA · Business Acceleration Studio',
      title1: 'Turn your',
      title2: 'operations',
      title3: 'into a clear',
      title4: 'system.',
      subheadline: 'We help existing companies redesign workflows, build internal tools, connect automation and AI, and turn daily follow-up into a measurable operating system.',
      description: 'If your company is already working but execution is scattered across chats, sheets, tools, and invisible decisions, the issue is not effort. It is the lack of a clear operating system.',
      cta1: 'Start Diagnosis',
      cta2: 'Explore Services',
      trust: 'Designed for companies with teams, clients, operations, and a real need for clearer execution.',
    },
    why: {
      badge: 'Problem / Value',
      title: 'Companies do not lose time suddenly. They lose it in daily details.',
      subtitle: 'AURA makes the value easy to see: fewer scattered follow-ups, clearer ownership, and a system leadership can actually use.',
      problems: [
        { icon: 'scatter', title: 'Scattered Follow-up', desc: 'Work is split between WhatsApp, sheets, team memory, and tools that do not talk to each other.' },
        { icon: 'delay', title: 'Decisions Without Full Visibility', desc: 'Management sees parts of the picture, but not where work is blocked or where opportunities are lost.' },
        { icon: 'settings', title: 'Tools That Do Not Fit Reality', desc: 'Generic tools rarely reflect how the team actually works, so the team returns to manual work.' },
        { icon: 'bot', title: 'AI Without a System', desc: 'AI that is not connected to real workflow creates noise before it creates value.' },
      ],
      solution: {
        title: 'AURA does not just add another tool.',
        desc: 'AURA rebuilds the way work moves: workflow, internal tools, automation, growth systems, and specialized solutions only when they clearly serve the business.',
      },
    },
    services: {
      badge: '5 Service Lines',
      title: 'Five Clear Service Lines',
      subtitle: 'We start by understanding how the company works, then choose the line with the highest impact: workflow, tools, automation, growth, or specialized solutions.',
      layers: [
        {
          num: '01',
          title: 'Workflow & Operating System Design',
          problem: 'When it is unclear where work stops, who owns it, and why delivery is delayed.',
          solution: 'We map the real workflow, define stages and responsibilities, then build a weekly follow-up rhythm and clear operating indicators.',
          kpis: ['Workflow map', 'Stages and responsibilities', 'Follow-up templates', 'Performance indicators', 'Main bottlenecks'],
          impact: 'Related proof: workflow and dashboard samples.',
          icon: 'flow',
          proofId: 'workflow-dashboard',
          proofTitle: 'Operations dashboard sample',
          cta: 'Check if it fits your company',
        },
        {
          num: '02',
          title: 'Internal Software & Business Tools',
          problem: 'When the team depends on Excel, WhatsApp, and scattered links instead of one clear system.',
          solution: 'We build dashboards, trackers, forms, and lightweight databases designed around the company’s real way of working.',
          kpis: ['Dashboards', 'Input forms', 'Operations, client, or project tracker', 'Automatic reports', 'Single source of truth'],
          impact: 'Related proof: internal tool and tracker samples.',
          icon: 'build',
          proofId: 'internal-tools',
          proofTitle: 'Internal tool sample',
          cta: 'Check if it fits your company',
        },
        {
          num: '03',
          title: 'AI Automation & Agent Systems',
          problem: 'When follow-ups, reports, research, reminders, or data entry consume too much team time.',
          solution: 'We identify what should be automated and build AI agents or flows connected to the workflow, with human review where needed.',
          kpis: ['AI follow-up agent', 'AI reporting agent', 'AI research agent', 'Sales/support assistant', 'Workflow automation'],
          impact: 'Related proof: AI agent and automation samples.',
          icon: 'bot',
          proofId: 'ai-automation',
          proofTitle: 'AI automation sample',
          cta: 'Check if it fits your company',
        },
        {
          num: '04',
          title: 'Growth, Marketing & Sales Systems',
          problem: 'When marketing or sales is inconsistent, disconnected from follow-up, or not converted into measurable opportunities.',
          solution: 'We design a growth system that connects analysis, positioning, content, campaigns, lightweight CRM, and opportunity tracking.',
          kpis: ['Competitor analysis', 'Content pillars', 'Publishing calendar', 'Sales tracker or CRM', 'Growth intelligence'],
          impact: 'Related proof: growth and sales tracking samples.',
          icon: 'trend',
          proofId: 'growth-system',
          proofTitle: 'Growth system sample',
          cta: 'Check if it fits your company',
        },
        {
          num: '05',
          title: 'Specialized Solutions',
          problem: 'When the company needs deeper customization, sharper decisions, or an intelligence layer above existing data.',
          solution: 'We propose advanced solutions only when the business impact is clear: Digital Twin, hyper-personalized real estate marketing, or executive decision intelligence.',
          kpis: ['Digital Twin Company Simulation', 'Hyper-Personalized Real Estate Marketing', 'Executive Decision Intelligence', 'Custom Sector Systems'],
          impact: 'Related proof: specialized solution samples. Not the default starting point for every client.',
          icon: 'sparkle',
          proofId: 'specialized-solutions',
          proofTitle: 'Specialized solution sample',
          cta: 'Check if it fits your company',
        },
      ],
      who: [],
    },
    portfolio: {
      badge: 'Portfolio / Proof',
      title: 'Samples of How We Work',
      subtitle: 'Selected proof slots that show how ideas and operations become systems, tools, and usable experiences. Real screenshots can be added as soon as they are available.',
      placeholder: 'Sample coming soon',
      view: 'See sample',
      real: 'Real work',
    },
    discovery: {
      badge: 'How We Start',
      title: 'We start with the right study, not a fixed template.',
      subtitle: 'Discovery depth changes based on company size, problem clarity, and the service line required.',
      items: [
        { name: 'Light Discovery', duration: '2-5 days', use: 'For one clear problem or one selected service line.', goal: 'Fast understanding and solution scope.' },
        { name: 'Operational Mapping', duration: '7-14 days', use: 'For a workflow, dashboard, or follow-up system.', goal: 'Map the process, people, bottlenecks, and indicators.' },
        { name: 'Business System Audit', duration: '14-30 days', use: 'For a larger company or business group.', goal: 'Deeper analysis of operations, tools, data, waste, and automation opportunities.' },
      ],
      note: 'Numbers are estimates and depend on scope, data quality, company size, and team availability.',
    },
    process: {
      badge: 'Method',
      title: 'Execution Methodology',
      subtitle: 'A short path from scope to usable outputs, with quality checks before delivery.',
      steps: [
        { num: '01', title: 'Scope', desc: 'Define the service line, business problem, and first useful output.' },
        { num: '02', title: 'Right-depth Study', desc: 'Choose light discovery, operational mapping, or deeper audit.' },
        { num: '03', title: 'System Design', desc: 'Design workflow, data flow, ownership, and tool structure.' },
        { num: '04', title: 'Build Outputs', desc: 'Build the agreed workflow, dashboard, tool, automation, or growth layer.' },
        { num: '05', title: 'Handover & Training', desc: 'Train the team and document how the system should be used.' },
        { num: '06', title: 'Improve & Measure', desc: 'Review usage, measure value, and improve what needs refinement.' },
      ],
      questions: {
        title: 'Before delivery, we ask:',
        items: ['What exact problem does this solve?', 'Will the team use it daily?', 'How do we know it created value?'],
      },
    },
    packages: {
      badge: 'Engagement Options',
      title: 'Simple Engagement Options',
      subtitle: 'No fixed prices. The right scope is defined after the study.',
      sprint: {
        name: 'Specific Service',
        subtitle: 'For one clear problem or one service line.',
        badge: 'Focused',
        scope: 'Defined after study',
        features: ['One service line', 'Clear problem scope', 'Usable output', 'Short handover', 'Next-step recommendation'],
        cta: 'Start Diagnosis',
      },
      full: {
        name: 'Integrated System',
        subtitle: 'For workflow + tools + automation or growth.',
        badge: 'Complete',
        scope: 'Defined after study',
        features: ['Multiple service lines', 'Workflow and tool design', 'Automation or growth layer', 'Team training', 'Improvement roadmap'],
        cta: 'Start Diagnosis',
      },
      managed: {
        name: 'Continuous Improvement',
        subtitle: 'For monthly improvement and system ownership.',
        badge: 'Monthly',
        scope: 'Defined after study',
        description: 'Ongoing review, updates, automation refinement, reporting, and monthly priorities after launch.',
        features: ['Monthly review', 'System updates', 'Automation improvements', 'Reporting refinement', 'Priority backlog'],
        cta: 'Discuss Monthly Support',
      },
      guide: { title: '', items: [] },
      scopeNote: 'Scope and pricing are defined after the study so the work matches the company’s actual problem, team, tools, and data quality.',
    },
    contact: {
      badge: 'Start Now',
      title: 'Start by diagnosing your company need',
      subtitle: 'Share your company type, where time is being lost, and what needs more clarity now. We will help identify the right service line and first implementation step.',
      email: 'amirelshazly66@gmail.com',
      phone: '+20 102 924 0066',
      location: 'Egypt / Remote',
      details: { email: 'Email', whatsapp: 'WhatsApp', location: 'Location' },
      actions: [
        { label: 'A', icon: 'target', title: 'Start Diagnosis', text: 'Tell us where work feels scattered, delayed, manual, or unclear.', cta: 'Start on WhatsApp', type: 'diagnosis' },
        { label: 'B', icon: 'book', title: 'Send a Company Brief', text: 'Share your company, teams, tools, and the service line you think may fit.', cta: 'Send Email Brief', type: 'brief' },
        { label: 'C', icon: 'refresh', title: 'Discuss Monthly Improvement', text: 'For companies that already have systems but need ongoing ownership and improvement.', cta: 'Discuss Support', type: 'monthly' },
      ],
    },
    footer: {
      tagline: 'Business Acceleration Studio',
      rights: 'All rights reserved.',
      built: 'Built with precision.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      services: 'الخدمات',
      process: 'المنهجية',
      packages: 'التعاون',
      why: 'القيمة',
      contact: 'ابدأ',
      cta: 'ابدأ التشخيص',
    },
    loader: {
      tagline: 'استوديو تسريع الأعمال',
      line1: 'نحوّل التشغيل المتفرق إلى نظام واضح.',
      line2: 'سير عمل. أدوات. أتمتة. نمو.',
    },
    hero: {
      badge: 'AURA · استوديو تسريع الأعمال',
      title1: 'حوّل تشغيل',
      title2: 'شركتك',
      title3: 'إلى منظومة',
      title4: 'واضحة.',
      subheadline: 'نساعد الشركات القائمة على تنظيم سير العمل، بناء الأدوات الداخلية، ربط الأتمتة والذكاء الاصطناعي، وتحويل المتابعة اليومية إلى نظام قابل للقياس والنمو.',
      description: 'إذا كانت شركتك تعمل بالفعل لكن المتابعة تتم عبر رسائل، جداول، أدوات متفرقة، وقرارات غير مرئية، فالمشكلة ليست في مجهود الفريق. المشكلة في غياب نظام تشغيل واضح.',
      cta1: 'ابدأ التشخيص',
      cta2: 'استعرض الخدمات',
      trust: 'مصمم للشركات التي لديها فرق، عملاء، عمليات، واحتياج حقيقي لنظام أوضح.',
    },
    why: {
      badge: 'المشكلة والقيمة',
      title: 'الشركات لا تخسر الوقت فجأة. تخسره في التفاصيل اليومية.',
      subtitle: 'قيمة AURA تظهر بسرعة: متابعة أقل تشتتًا، مسؤوليات أوضح، ونظام يمكن للإدارة استخدامه فعليًا.',
      problems: [
        { icon: 'scatter', title: 'متابعة متفرقة', desc: 'العمل موزع بين واتساب، جداول، ذاكرة الفريق، وأدوات لا تتكلم مع بعضها.' },
        { icon: 'delay', title: 'قرارات بلا رؤية كاملة', desc: 'الإدارة ترى أجزاء من الصورة، لكن لا ترى أين يتعطل العمل أو أين تضيع الفرص.' },
        { icon: 'settings', title: 'أدوات لا تناسب الواقع', desc: 'استخدام أدوات جاهزة لا تعكس طريقة عمل الفريق يؤدي غالبًا للعودة إلى العمل اليدوي.' },
        { icon: 'bot', title: 'ذكاء اصطناعي بلا نظام', desc: 'AI بدون ربط بسير العمل الحقيقي ينتج ضجيجًا أكثر من قيمة.' },
      ],
      solution: {
        title: 'AURA لا تضيف أداة جديدة فقط.',
        desc: 'AURA تعيد بناء طريقة العمل نفسها: سير عمل، أدوات داخلية، أتمتة، أنظمة نمو، وحلول متخصصة فقط عندما تكون قيمتها واضحة للشركة.',
      },
    },
    services: {
      badge: '5 خطوط خدمة',
      title: 'خمس خطوط خدمة واضحة',
      subtitle: 'نبدأ بفهم طريقة عمل الشركة، ثم نختار الخط الذي يحقق أكبر أثر: سير عمل، أدوات، أتمتة، نمو، أو حلول متخصصة.',
      layers: [
        {
          num: '01',
          title: 'تصميم نظام التشغيل وسير العمل',
          problem: 'عندما لا يكون واضحًا أين يقف العمل، من المسؤول، ولماذا تتأخر التسليمات.',
          solution: 'نرسم سير العمل الحقيقي، نحدد المراحل والمسؤوليات، ونبني إيقاع متابعة أسبوعي ومؤشرات واضحة.',
          kpis: ['خريطة سير العمل', 'مراحل ومسؤوليات', 'قوالب متابعة', 'مؤشرات أداء', 'أهم نقاط التعطيل'],
          impact: 'نماذج مرتبطة: لوحات تشغيل ومتابعة.',
          icon: 'flow',
          proofId: 'workflow-dashboard',
          proofTitle: 'نموذج لوحة تشغيل',
          cta: 'اعرف هل يناسب شركتك',
        },
        {
          num: '02',
          title: 'الأدوات والبرمجيات الداخلية',
          problem: 'عندما يعتمد الفريق على Excel، WhatsApp، وروابط متفرقة بدل نظام واحد واضح.',
          solution: 'نبني dashboards، trackers، forms، وdatabases خفيفة مصممة حول طريقة عمل الشركة الفعلية.',
          kpis: ['لوحات تحكم', 'نماذج إدخال', 'متتبع عمليات أو عملاء أو مشاريع', 'تقارير تلقائية', 'مصدر موحد للحقيقة'],
          impact: 'نماذج مرتبطة: أدوات داخلية ومتتبعات.',
          icon: 'build',
          proofId: 'internal-tools',
          proofTitle: 'نموذج أداة داخلية',
          cta: 'اعرف هل يناسب شركتك',
        },
        {
          num: '03',
          title: 'أتمتة الذكاء الاصطناعي والوكلاء',
          problem: 'عندما تستهلك المتابعات، التقارير، البحث، التذكيرات، أو إدخال البيانات وقتًا كبيرًا من الفريق.',
          solution: 'نحدد المهام القابلة للأتمتة ونبني وكلاء أو مسارات AI مرتبطة بسير العمل، مع مراجعة بشرية عند الحاجة.',
          kpis: ['AI follow-up agent', 'AI reporting agent', 'AI research agent', 'Sales/support assistant', 'Workflow automation'],
          impact: 'نماذج مرتبطة: وكلاء وأتمتة AI.',
          icon: 'bot',
          proofId: 'ai-automation',
          proofTitle: 'نموذج أتمتة AI',
          cta: 'اعرف هل يناسب شركتك',
        },
        {
          num: '04',
          title: 'أنظمة النمو والتسويق والمبيعات',
          problem: 'عندما يكون التسويق أو المبيعات غير منتظم، غير متصل بالمتابعة، أو لا يتحول إلى فرص قابلة للقياس.',
          solution: 'نصمم نظام نمو يربط التحليل، التموضع، المحتوى، الحملات، CRM خفيف، وتتبع الفرص.',
          kpis: ['تحليل منافسين', 'Content pillars', 'تقويم نشر', 'Sales tracker أو CRM', 'Growth intelligence'],
          impact: 'نماذج مرتبطة: أنظمة نمو ومتابعة مبيعات.',
          icon: 'trend',
          proofId: 'growth-system',
          proofTitle: 'نموذج نظام نمو',
          cta: 'اعرف هل يناسب شركتك',
        },
        {
          num: '05',
          title: 'الحلول المتخصصة',
          problem: 'عندما تحتاج الشركة قرارًا أدق، تخصيصًا أعمق، أو طبقة ذكاء تشغيلية فوق البيانات الحالية.',
          solution: 'نقترح حلولًا متقدمة فقط عندما يكون الأثر التجاري واضحًا: Digital Twin، التسويق العقاري مفرط التخصيص، أو Executive Decision Intelligence.',
          kpis: ['Digital Twin Company Simulation', 'Hyper-Personalized Real Estate Marketing', 'Executive Decision Intelligence', 'Custom Sector Systems'],
          impact: 'نماذج مرتبطة: حلول متخصصة. ليست نقطة البداية الافتراضية لكل عميل.',
          icon: 'sparkle',
          proofId: 'specialized-solutions',
          proofTitle: 'نموذج حل متخصص',
          cta: 'اعرف هل يناسب شركتك',
        },
      ],
      who: [],
    },
    portfolio: {
      badge: 'نماذج العمل',
      title: 'نماذج من طريقة عملنا',
      subtitle: 'نماذج مختارة توضح كيف نحول الأفكار والعمليات إلى أنظمة، أدوات، وتجارب قابلة للاستخدام. يمكن استبدال البطاقات بلقطات حقيقية عند توفرها.',
      placeholder: 'عينة قادمة قريبًا',
      view: 'شاهد العينة',
      real: 'عمل حقيقي',
    },
    discovery: {
      badge: 'كيف نبدأ',
      title: 'نبدأ بالدراسة المناسبة، لا بقالب ثابت.',
      subtitle: 'عمق الدراسة يتغير حسب حجم الشركة، وضوح المشكلة، ونوع الخدمة المطلوبة.',
      items: [
        { name: 'Discovery خفيف', duration: '2-5 أيام', use: 'لمشكلة واضحة أو خدمة محددة.', goal: 'فهم سريع وتحديد نطاق الحل.' },
        { name: 'Operational Mapping', duration: '7-14 يوم', use: 'لتصميم workflow، dashboard، أو نظام متابعة.', goal: 'رسم العملية، الأطراف، نقاط التعطل، ومؤشرات القياس.' },
        { name: 'Business System Audit', duration: '14-30 يوم', use: 'لشركة كبيرة أو مجموعة.', goal: 'تحليل أعمق للعمليات، الأدوات، البيانات، الهدر، وفرص الأتمتة.' },
      ],
      note: 'الأرقام تقديرية وتعتمد على نطاق العمل، حجم الشركة، جودة البيانات، والتزام الفريق بالتطبيق.',
    },
    process: {
      badge: 'المنهجية',
      title: 'منهجية التنفيذ',
      subtitle: 'مسار قصير من تحديد النطاق إلى مخرجات قابلة للاستخدام، مع فلتر جودة قبل التسليم.',
      steps: [
        { num: '01', title: 'تحديد النطاق', desc: 'نحدد خط الخدمة، المشكلة التجارية، وأول مخرج مفيد.' },
        { num: '02', title: 'الدراسة حسب العمق', desc: 'نختار Discovery خفيف، Operational Mapping، أو Audit أعمق.' },
        { num: '03', title: 'تصميم النظام', desc: 'نصمم سير العمل، تدفق البيانات، المسؤوليات، وهيكل الأداة.' },
        { num: '04', title: 'بناء المخرجات', desc: 'نبني سير العمل، اللوحة، الأداة، الأتمتة، أو طبقة النمو المتفق عليها.' },
        { num: '05', title: 'التسليم والتدريب', desc: 'ندرب الفريق ونوثق طريقة استخدام النظام.' },
        { num: '06', title: 'التحسين والقياس', desc: 'نراجع الاستخدام، نقيس القيمة، ونحسن ما يحتاج تطويرًا.' },
      ],
      questions: {
        title: 'قبل تسليم أي حل، نسأل:',
        items: ['ما المشكلة المحددة التي يحلها؟', 'هل سيستخدمه الفريق يوميًا؟', 'كيف نعرف أنه خلق قيمة؟'],
      },
    },
    packages: {
      badge: 'نماذج التعاون',
      title: 'نماذج تعاون بسيطة',
      subtitle: 'لا نعرض أسعارًا ثابتة. النطاق المناسب يُحدد بعد الدراسة.',
      sprint: {
        name: 'خدمة محددة',
        subtitle: 'لمشكلة واضحة أو خط خدمة واحد.',
        badge: 'مركز',
        scope: 'يُحدد بعد الدراسة',
        features: ['خط خدمة واحد', 'نطاق مشكلة واضح', 'مخرج قابل للاستخدام', 'تسليم مختصر', 'توصية للخطوة التالية'],
        cta: 'ابدأ التشخيص',
      },
      full: {
        name: 'نظام متكامل',
        subtitle: 'لشركات تحتاج workflow + tools + automation/growth.',
        badge: 'متكامل',
        scope: 'يُحدد بعد الدراسة',
        features: ['عدة خطوط خدمة', 'تصميم سير العمل والأدوات', 'طبقة أتمتة أو نمو', 'تدريب الفريق', 'خارطة تحسين'],
        cta: 'ابدأ التشخيص',
      },
      managed: {
        name: 'تحسين مستمر',
        subtitle: 'للتحسين الشهري وملكية النظام.',
        badge: 'شهري',
        scope: 'يُحدد بعد الدراسة',
        description: 'متابعة وتحسين مستمر بعد الإطلاق: تحديثات، أتمتة، تقارير، وأولويات شهرية.',
        features: ['مراجعة شهرية', 'تحديث النظام', 'تحسين الأتمتة', 'تطوير التقارير', 'قائمة أولويات'],
        cta: 'ناقش المتابعة',
      },
      guide: { title: '', items: [] },
      scopeNote: 'يُحدد النطاق والتكلفة بعد الدراسة حتى يناسب العمل المشكلة الفعلية، الفريق، الأدوات، وجودة البيانات.',
    },
    contact: {
      badge: 'ابدأ الآن',
      title: 'ابدأ بتشخيص احتياج شركتك',
      subtitle: 'شاركنا طبيعة شركتك، أين يضيع الوقت، وما أكثر شيء يحتاج وضوحًا الآن. سنساعدك على تحديد خط الخدمة الأنسب وأول خطوة تنفيذية.',
      email: 'amirelshazly66@gmail.com',
      phone: '+20 102 924 0066',
      location: 'مصر / عن بُعد',
      details: { email: 'البريد الإلكتروني', whatsapp: 'واتساب', location: 'الموقع' },
      actions: [
        { label: 'A', icon: 'target', title: 'ابدأ التشخيص', text: 'أخبرنا أين يبدو العمل متفرقًا، متأخرًا، يدويًا، أو غير واضح.', cta: 'ابدأ عبر واتساب', type: 'diagnosis' },
        { label: 'B', icon: 'book', title: 'أرسل نبذة عن الشركة', text: 'شاركنا طبيعة الشركة، الفرق، الأدوات، وخط الخدمة الذي تتوقع أنه مناسب.', cta: 'أرسل بريدًا', type: 'brief' },
        { label: 'C', icon: 'refresh', title: 'ناقش التحسين المستمر', text: 'للشركات التي لديها أنظمة قائمة وتحتاج متابعة وتحسين شهري.', cta: 'ناقش المتابعة', type: 'monthly' },
      ],
    },
    footer: {
      tagline: 'استوديو تسريع الأعمال',
      rights: 'جميع الحقوق محفوظة.',
      built: 'بُني بدقة.',
    },
  },
} as const;

Object.assign(content.en, auraSimpleContent.en);
Object.assign(content.ar, auraSimpleContent.ar);

const WHATSAPP_NUMBER = '201029240066';
const CONTACT_EMAIL = 'amirelshazly66@gmail.com';
const LANGUAGE_STORAGE_KEY = 'aura-language';
const LANGUAGE_CHANGE_EVENT = 'aura-language-change';

function getLanguageSnapshot(): 'en' | 'ar' {
  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLanguage === 'en' || savedLanguage === 'ar') return savedLanguage;

  const browserUsesArabic = [navigator.language, ...(navigator.languages ?? [])]
    .some(language => language?.toLowerCase().startsWith('ar'));
  if (browserUsesArabic) return 'ar';

  return 'ar';
}

function subscribeToLanguagePreference(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, onStoreChange);
  };
}

const contactMessages = {
  en: {
    diagnosis: 'Hi AURA team, I’m interested in turning my business operations into a clear system. I’d like to start with a business diagnosis.',
    monthly: 'Hi AURA team, I’m interested in Managed Systems Partner / monthly support for managing and improving our workflows, tools, and automations.',
    briefSubject: 'AURA Business Brief',
    briefBody: `Hi AURA team,

I would like to share a short brief about my business.

Business name:
Business type:
What feels chaotic or unclear:
What I want to improve:
Website/social link:

Thank you.`,
  },
  ar: {
    diagnosis: 'أهلًا فريق AURA، أود معرفة كيف يمكنكم مساعدتنا في تحويل سير العمل داخل الشركة إلى نظام أوضح وأسهل في الإدارة. أريد البدء بتشخيص مبدئي.',
    monthly: 'أهلًا فريق AURA، أريد مناقشة المتابعة الشهرية وتحسين الأنظمة داخل شركتنا.',
    briefSubject: 'نبذة عن العمل - AURA',
    briefBody: `أهلًا فريق AURA،

أرغب في إرسال نبذة قصيرة عن نشاطي.

اسم النشاط:
نوع النشاط:
ما الذي يبدو فوضويًا أو غير واضح:
ما الذي أريد تحسينه:
رابط الموقع أو السوشيال:

شكرًا.`,
  },
};

Object.assign(contactMessages.en, {
  diagnosis: 'Hi AURA team, I want to discuss how AURA can help us turn our company operations into a clearer and more intelligent operating system. I would like to start with an initial diagnosis.',
  monthly: 'Hi AURA team, I want to discuss continuous improvement support for our operating system, workflows, tools, automations, and AI agents.',
  briefSubject: 'AURA Company Brief',
  briefBody: `Hi AURA team,

I would like to share a short brief about our company.

Company name:
Company type:
Number of teams / units:
Current tools or systems:
Biggest operational friction:
What we want to improve:
Website/social link:

Thank you.`,
});

Object.assign(contactMessages.ar, {
  diagnosis: 'أهلًا فريق AURA، أريد مناقشة كيف يمكن لـ AURA مساعدتنا في تحويل التشغيل داخل شركتنا إلى منظومة أوضح وأكثر ذكاءً. أود البدء بتشخيص مبدئي.',
  monthly: 'أهلًا فريق AURA، أريد مناقشة المتابعة والتحسين المستمر لمنظومة العمل داخل شركتنا: سير العمل، الأدوات، الأتمتة، ووكلاء الذكاء الاصطناعي.',
  briefSubject: 'نبذة عن الشركة - AURA',
  briefBody: `أهلًا فريق AURA،

أرغب في إرسال نبذة قصيرة عن شركتنا.

اسم الشركة:
نوع الشركة:
عدد الفرق أو الوحدات:
الأدوات أو الأنظمة الحالية:
أكبر نقطة تعطيل حاليًا:
ما الذي نريد تحسينه:
رابط الموقع أو السوشيال:

شكرًا.`,
});

Object.assign(contactMessages.en, {
  diagnosis: 'Hi AURA team, I’d like to discuss how AURA can help turn our company operations into a clearer system. I’d like to start with a business diagnosis and identify the right service line.',
  monthly: 'Hi AURA team, I’d like to discuss continuous improvement for our company operating system after launch.',
  briefSubject: 'AURA Company Diagnosis Brief',
  briefBody: `Hi AURA team,

I would like to share a short brief and identify the right service line.

Company name:
Company type:
Team / units:
Where time is being lost:
What needs more clarity now:
Possible service line:
Website/social link:

Thank you.`,
});

Object.assign(contactMessages.ar, {
  diagnosis: 'أهلًا فريق AURA، أريد مناقشة كيف يمكن لأورا مساعدتنا في تحويل التشغيل داخل شركتنا إلى منظومة أوضح. أود البدء بتشخيص احتياج الشركة وتحديد خط الخدمة المناسب.',
  monthly: 'أهلًا فريق AURA، أريد مناقشة التحسين المستمر وملكية النظام بعد الإطلاق داخل شركتنا.',
  briefSubject: 'تشخيص احتياج الشركة - AURA',
  briefBody: `أهلًا فريق AURA،

أرغب في إرسال نبذة قصيرة لتحديد خط الخدمة المناسب.

اسم الشركة:
نوع الشركة:
عدد الفرق أو الوحدات:
أين يضيع الوقت حاليًا:
ما أكثر شيء يحتاج وضوحًا الآن:
خط الخدمة المتوقع:
رابط الموقع أو السوشيال:

شكرًا.`,
});

function getWhatsAppLink(lang: 'en' | 'ar', type: 'diagnosis' | 'monthly' = 'diagnosis') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(contactMessages[lang][type])}`;
}

function getBusinessBriefLink(lang: 'en' | 'ar') {
  const { briefSubject, briefBody } = contactMessages[lang];
  const encodedBody = encodeURIComponent(briefBody.replace(/\n/g, '\r\n'));
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(briefSubject)}&body=${encodedBody}`;
}

/* ─── Icon Mapper ──────────────────────────────────────── */
function getIcon(name: string, size = 20) {
  const map: Record<string, React.ReactNode> = {
    scatter: <Layers size={size} />,
    delay: <Clock size={size} />,
    waste: <TrendingUp size={size} />,
    loss: <BarChart3 size={size} />,
    search: <Target size={size} />,
    flow: <Workflow size={size} />,
    workflow: <Workflow size={size} />,
    build: <Settings size={size} />,
    bot: <Bot size={size} />,
    trend: <TrendingUp size={size} />,
    rocket: <Rocket size={size} />,
    target: <Target size={size} />,
    settings: <Settings size={size} />,
    book: <BookOpen size={size} />,
    zap: <Zap size={size} />,
    shield: <Shield size={size} />,
    credit: <MessageSquare size={size} />,
    chart: <BarChart3 size={size} />,
    refresh: <Sparkles size={size} />,
    award: <Award size={size} />,
    layers: <Layers size={size} />,
    sparkle: <Sparkles size={size} />,
    palette: <Star size={size} />,
    health: <Users size={size} />,
    inbox: <Mail size={size} />,
  };
  return map[name] || <Star size={size} />;
}

/* ─── Animated Section Wrapper ─────────────────────────── */
function AnimatedSection({
  children,
  className = '',
  id = '',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

/* ─── Floating Particles ──────────────────────────────── */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            background: i % 3 === 0 ? '#F2A900' : '#6B3FA0',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            opacity: Math.random() * 0.4 + 0.1,
            animation: `particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite`,
            animationDelay: Math.random() * 5 + 's',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Loader Component ────────────────────────────────── */
function Loader({ onComplete, lang }: { onComplete: () => void; lang: 'en' | 'ar' }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 1500);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  const t = content[lang].loader;

  return (
    <div className="aura-loader" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="aura-loader__glow" />
      <div className="aura-loader__content">
        <div className="aura-loader__brand">
          <Image
            src="/brand/aura-mark.png"
            alt=""
            width={512}
            height={512}
            className="aura-loader__mark"
            priority
          />
          <span className="aura-loader__wordmark">AURA</span>
        </div>
        <p className="aura-loader__descriptor">{t.tagline}</p>
        <div className="aura-loader__tagline">
          <span>{t.line1}</span>
          <span>{t.line2}</span>
        </div>
        <div className="aura-loader__track" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}

/* ─── Navigation ──────────────────────────────────────── */
function Navigation({ lang, setLang, scrolled }: { lang: 'en' | 'ar'; setLang: (l: 'en' | 'ar') => void; scrolled: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = content[lang].nav;
  const isRtl = lang === 'ar';
  const diagnosisLink = getWhatsAppLink(lang);

  const links = [
    { label: t.home, href: '#home' },
    { label: t.services, href: '#services' },
    { label: t.process, href: '#process' },
    { label: t.packages, href: '#packages' },
    { label: t.why, href: '#problem' },
  ];

  return (
    <motion.nav
      initial={{ x: '-50%', y: -100, opacity: 0 }}
      animate={{ x: '-50%', y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 2.2 }}
      className="fixed top-4 md:top-6 left-1/2 z-[100] transition-all duration-400"
      style={{ top: scrolled ? '0.5rem' : undefined }}
    >
      <div
        className="flex items-center rounded-full overflow-hidden transition-all duration-400"
        style={{
          background: scrolled ? 'rgba(26,10,46,0.88)' : 'rgba(26,10,46,0.45)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: scrolled ? '1px solid rgba(242,169,0,0.15)' : '1px solid rgba(255,255,255,0.06)',
          boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.35)' : 'none',
        }}
      >
        <a href="#home" className="flex items-center justify-center gap-2 px-4 h-12 group">
          <Image src="/brand/aura-mark.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" priority />
          <span className="text-xl font-bold text-gold-gradient">AURA</span>
          <span className={`hidden xl:block text-[0.52rem] leading-tight max-w-[5.5rem] ${isRtl ? 'tracking-normal' : 'tracking-[0.12em] uppercase'}`} style={{ color: 'rgba(255,255,255,0.45)' }}>{content[lang].loader.tagline}</span>
        </a>

        <div className="hidden md:flex items-center h-12">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`relative flex items-center h-full px-3 text-[0.62rem] font-medium transition-colors duration-300 ${isRtl ? 'tracking-normal' : 'tracking-[0.1em] uppercase'}`}
              style={{ color: 'rgba(255,255,255,0.55)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              {link.label}
              <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#F2A900] scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <button
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="flex items-center h-12 px-3 text-[0.62rem] tracking-[0.1em] uppercase font-medium transition-colors duration-300 gap-1.5"
          aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          <Globe size={14} />
          {lang === 'en' ? 'AR' : 'EN'}
        </button>

        <a
          href={diagnosisLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden sm:flex items-center h-12 px-4 gap-1.5 text-[0.62rem] font-bold rounded-full transition-all duration-300 ${isRtl ? 'tracking-normal' : 'tracking-[0.1em] uppercase'}`}
          style={{ background: '#F2A900', color: '#1A0A2E' }}
        >
          {t.cta}
          {isRtl ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center h-12 px-3"
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 rounded-2xl p-4 flex flex-col gap-3"
            style={{
              background: 'rgba(26,10,46,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(242,169,0,0.15)',
            }}
          >
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm py-2 ${isRtl ? 'tracking-normal' : 'tracking-widest uppercase'}`}
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={diagnosisLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold"
              style={{ background: '#F2A900', color: '#090416' }}
            >
              {t.cta}
              {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── Hero Section ────────────────────────────────────── */
function HeroSection({ lang }: { lang: 'en' | 'ar' }) {
  const t = content[lang].hero as typeof content.en.hero & { trust?: string };
  const isRtl = lang === 'ar';
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const diagnosisLink = getWhatsAppLink(lang);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-24">
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(9,4,22,0.95) 0%, rgba(20,9,40,0.9) 40%, rgba(41,17,71,0.85) 100%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 18% 45%, rgba(242,169,0,0.08) 0%, transparent 48%), radial-gradient(ellipse at 78% 28%, rgba(139,92,246,0.18) 0%, transparent 52%), linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: 'auto, auto, 64px 64px, 64px 64px',
        }} />
      </motion.div>

      <FloatingParticles />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className={`grid lg:grid-cols-12 gap-14 xl:gap-20 items-center text-center ${isRtl ? 'lg:text-right' : 'lg:text-left'}`}>
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(242,169,0,0.1)', border: '1px solid rgba(242,169,0,0.2)' }}
            >
              <Sparkles size={14} style={{ color: '#F2A900' }} />
              <span className="text-xs tracking-widest uppercase font-semibold text-gold-gradient">{t.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.7 }}
              className="text-4xl sm:text-5xl lg:text-[3.45rem] xl:text-[4rem] font-extrabold mb-6 leading-[1.12] tracking-tight"
              style={{ color: '#fff' }}
            >
              <span className="text-gold-gradient">{t.title1}</span>{' '}
              <span className="text-gold-gradient">{t.title2}</span>
              <br />
              <span style={{ color: '#fff' }}>{t.title3}</span>{' '}
              <span className="text-gold-gradient">{t.title4}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.9 }}
              className="text-lg md:text-xl mb-4 leading-relaxed max-w-xl font-semibold"
              style={{ color: 'rgba(255,255,255,0.9)' }}
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {t.subheadline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3 }}
              className="text-sm md:text-base mb-8 leading-relaxed max-w-xl"
              style={{ color: 'rgba(244,239,255,0.7)' }}
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {t.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.1 }}
              className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto"
            >
              <a
                href={diagnosisLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: '#F2A900', color: '#090416', boxShadow: '0 8px 30px rgba(242,169,0,0.3)' }}
              >
                {t.cta1}
                {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </a>
              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white/5 active:scale-95"
                style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
              >
                <Play size={14} />
                {t.cta2}
              </a>
            </motion.div>

            {t.trust && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 3.2 }}
                className="mt-5 text-xs md:text-sm max-w-xl"
                style={{ color: 'rgba(255,255,255,0.55)' }}
                dir={isRtl ? 'rtl' : 'ltr'}
              >
                {t.trust}
              </motion.p>
            )}

          </div>

          {/* Right Column: Visual Dashboard Mockup */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative group w-full max-w-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(242,169,0,0.05) 100%)',
                border: '1px solid rgba(139,92,246,0.2)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-purple-500/10 filter blur-xl opacity-40 group-hover:opacity-65 transition-opacity duration-500 -z-10" />
              <SystemDashboardMockup lang={lang} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 flex justify-center pt-2 cursor-pointer"
          style={{ borderColor: 'rgba(242,169,0,0.3)' }}
        >
          <div className="w-1 h-2 rounded-full" style={{ background: '#F2A900' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Why Section ─────────────────────────────────────── */
function EnterpriseSection({ lang }: { lang: 'en' | 'ar' }) {
  const t = aura2026Content[lang].enterprise;
  const isRtl = lang === 'ar';

  return (
    <AnimatedSection className="py-16 md:py-20 px-6 relative overflow-hidden" style={{ background: 'transparent' }}>
      <div className="absolute inset-0 bg-radial-gradient from-purple-900/10 via-transparent to-transparent -z-10" />
      <div className="max-w-6xl mx-auto">
        <div className={`grid lg:grid-cols-12 gap-8 lg:gap-10 items-center ${isRtl ? 'lg:text-right' : 'lg:text-left'}`}>
          <div className="lg:col-span-5 text-center lg:text-start">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA', border: '1px solid rgba(139,92,246,0.15)' }}>
              {t.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gold-gradient">{t.title}</h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>
              {t.subtitle}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              {t.cards.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="p-5 rounded-2xl"
                  style={{
                    background: 'rgba(20,9,38,0.45)',
                    border: '1px solid rgba(139,92,246,0.15)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(242,169,0,0.10)', border: '1px solid rgba(242,169,0,0.18)' }}>
                    <span style={{ color: '#F2A900' }}>{getIcon(card.icon, 18)}</span>
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: '#fff' }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>{card.text}</p>
                </motion.article>
              ))}
            </div>

            <div className="p-5 rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(242,169,0,0.05))', border: '1px solid rgba(242,169,0,0.16)' }}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {t.map.map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="px-4 py-3 rounded-2xl text-sm font-bold" style={{ background: 'rgba(9,4,22,0.55)', color: '#FFD666', border: '1px solid rgba(242,169,0,0.14)' }}>
                      {step}
                    </div>
                    {index < t.map.length - 1 && (
                      <ArrowRight size={16} style={{ color: 'rgba(242,169,0,0.45)', transform: isRtl ? 'rotate(180deg)' : undefined }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function WhySection({ lang }: { lang: 'en' | 'ar' }) {
  const t = content[lang].why;
  const isRtl = lang === 'ar';

  return (
    <AnimatedSection id="problem" className="py-20 md:py-24 px-6 relative overflow-hidden" >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent -z-10" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA', border: '1px solid rgba(139,92,246,0.15)' }}>
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ color: '#fff' }}>{t.title}</h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {t.problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 group"
              style={{
                background: 'rgba(20,9,38,0.4)',
                border: '1px solid rgba(139,92,246,0.15)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: 'rgba(242,169,0,0.12)', border: '1px solid rgba(242,169,0,0.2)' }}>
                <span style={{ color: '#F2A900' }}>{getIcon(p.icon, 22)}</span>
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#fff' }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-3xl text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0E0620 0%, #1A0D32 50%, #2A134A 100%)',
            border: '1px solid rgba(139,92,246,0.2)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
          }}
        >
          <div className="absolute inset-0 bg-radial-gradient from-purple-500/10 to-transparent -z-10" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gold-gradient">{t.solution.title}</h3>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(244,239,255,0.8)' }} dir={isRtl ? 'rtl' : 'ltr'}>
            {t.solution.desc}
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Service Layer Card ──────────────────────────────── */
const serviceAnchorByProofId: Record<string, string> = {
  'workflow-dashboard': 'service-workflow',
  'internal-tools': 'service-software',
  'ai-automation': 'service-ai',
  'growth-system': 'service-growth',
  'specialized-solutions': 'service-specialized',
};

function ServiceLayerCard({ layer, index, lang }: { layer: typeof content.en.services.layers[0]; index: number; lang: 'en' | 'ar' }) {
  const [expanded, setExpanded] = useState(false);
  const isRtl = lang === 'ar';
  const enhancedLayer = layer as typeof layer & {
    cta?: string;
    proofId?: string;
    proofTitle?: string;
    isNew?: boolean;
  };

  return (
    <motion.div
      id={enhancedLayer.proofId ? serviceAnchorByProofId[enhancedLayer.proofId] : undefined}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
      style={{
        background: 'rgba(20,9,38,0.4)',
        border: '1px solid rgba(139,92,246,0.15)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        className="p-6 cursor-pointer flex items-start gap-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #1A0A2E, #4B1D6E)', border: '1px solid rgba(139,92,246,0.2)' }}>
          <span style={{ color: '#F2A900' }}>{getIcon(layer.icon, 24)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-bold tracking-widest text-gold-gradient">{layer.num}</span>
            {enhancedLayer.isNew && (
              <span className="px-2 py-0.5 rounded-full text-[0.62rem] font-bold uppercase tracking-wider" style={{ background: 'rgba(242,169,0,0.12)', color: '#FFD666', border: '1px solid rgba(242,169,0,0.18)' }}>
                {lang === 'en' ? 'New' : 'جديد'}
              </span>
            )}
            <h3 className="font-bold text-lg" style={{ color: '#fff' }}>{layer.title}</h3>
          </div>
          <p className="text-sm" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>{layer.problem}</p>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }} className="self-center">
          <ChevronDown size={20} style={{ color: '#B5AEC4' }} />
        </motion.div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <div className="h-px mb-4" style={{ background: 'rgba(139,92,246,0.15)' }} />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-xs tracking-wider uppercase mb-2" style={{ color: '#FFD666' }}>
                    {lang === 'en' ? 'What AURA Builds' : 'ما تبنيه AURA'}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }} dir={isRtl ? 'rtl' : 'ltr'}>{layer.solution}</p>
                </div>
                <div>
                  <h4 className="font-bold text-xs tracking-wider uppercase mb-2" style={{ color: '#FFD666' }}>
                    {lang === 'en' ? 'Key Outputs' : 'المخرجات'}
                  </h4>
                  <ul className="space-y-1.5">
                    {layer.kpis.map((kpi, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                        <Check size={14} style={{ color: '#F2A900' }} />
                        {kpi}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ background: 'rgba(242,169,0,0.08)', border: '1px solid rgba(242,169,0,0.15)' }}>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} style={{ color: '#FFD666' }} />
                  <span className="text-sm font-semibold" style={{ color: '#FFD666' }} dir={isRtl ? 'rtl' : 'ltr'}>{layer.impact}</span>
                </div>
                {enhancedLayer.proofId && (
                  <a href="#portfolio" className="text-xs font-bold inline-flex items-center gap-1" style={{ color: '#fff' }}>
                    {lang === 'en' ? 'Related proof' : 'نماذج مرتبطة'}
                    {isRtl ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
                  </a>
                )}
              </div>
              {enhancedLayer.cta && (
                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105"
                  style={{ border: '1px solid rgba(242,169,0,0.35)', color: '#FFD666', background: 'rgba(242,169,0,0.06)' }}
                >
                  {enhancedLayer.cta}
                  {isRtl ? <ArrowLeft size={13} /> : <ArrowRight size={13} />}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Services Section ────────────────────────────────── */
function ServicesSection({ lang }: { lang: 'en' | 'ar' }) {
  const t = content[lang].services;
  const isRtl = lang === 'ar';

  return (
    <AnimatedSection id="services" className="py-20 md:py-24 px-6 relative overflow-hidden" style={{ background: 'transparent' }}>
      <div className="absolute inset-0 bg-radial-gradient from-purple-900/10 to-transparent -z-10" />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA', border: '1px solid rgba(139,92,246,0.15)' }}>
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ color: '#fff' }}>{t.title}</h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {t.layers.map((layer, i) => (
            <ServiceLayerCard key={i} layer={layer} index={i} lang={lang} />
          ))}
        </div>

        {/* Who we serve */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {t.who.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl text-center"
              style={{
                background: 'rgba(20,9,38,0.4)',
                border: '1px solid rgba(139,92,246,0.12)',
              }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.15)' }}>
                <span style={{ color: '#A78BFA' }}>{getIcon(item.icon, 18)}</span>
              </div>
              <h4 className="font-bold text-sm mb-1" style={{ color: '#fff' }}>{item.title}</h4>
              <p className="text-xs" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Process Section ──────────────────────────────────── */
/* ─── Process Section ──────────────────────────────────── */
function PortfolioSection({ lang }: { lang: 'en' | 'ar' }) {
  return <PortfolioProofSection lang={lang} />;
}

function DiscoverySection({ lang }: { lang: 'en' | 'ar' }) {
  const t = auraSimpleContent[lang].discovery;
  const isRtl = lang === 'ar';

  return (
    <AnimatedSection className="py-16 md:py-20 px-6 relative overflow-hidden" style={{ background: 'transparent' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA', border: '1px solid rgba(139,92,246,0.15)' }}>
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ color: '#fff' }}>{t.title}</h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-5">
          {t.items.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="p-6 rounded-2xl"
              style={{ background: 'rgba(20,9,38,0.45)', border: '1px solid rgba(139,92,246,0.15)', backdropFilter: 'blur(10px)' }}
            >
              <span className="text-xs font-bold tracking-widest text-gold-gradient">{item.duration}</span>
              <h3 className="font-bold text-lg mt-2 mb-3" style={{ color: '#fff' }}>{item.name}</h3>
              <p className="text-sm mb-3" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>{item.use}</p>
              <p className="text-sm font-semibold" style={{ color: '#FFD666' }} dir={isRtl ? 'rtl' : 'ltr'}>{item.goal}</p>
            </motion.article>
          ))}
        </div>
        <p className="text-center text-xs md:text-sm" style={{ color: 'rgba(255,255,255,0.5)' }} dir={isRtl ? 'rtl' : 'ltr'}>
          {t.note}
        </p>
      </div>
    </AnimatedSection>
  );
}

function RealEstateProofSection({ lang }: { lang: 'en' | 'ar' }) {
  const t = aura2026Content[lang].realEstate;
  const isRtl = lang === 'ar';

  return (
    <AnimatedSection className="py-16 md:py-20 px-6 relative overflow-hidden" style={{ background: 'transparent' }}>
      <div className="absolute inset-0 bg-radial-gradient from-gold-500/5 via-transparent to-transparent -z-10" />
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[2rem] overflow-hidden p-6 md:p-8 lg:p-10" style={{ background: 'linear-gradient(135deg, rgba(16,6,36,0.86), rgba(42,19,78,0.72))', border: '1px solid rgba(242,169,0,0.18)', boxShadow: '0 18px 60px rgba(0,0,0,0.35)' }}>
          <div className={`grid lg:grid-cols-12 gap-8 items-center ${isRtl ? 'lg:text-right' : 'lg:text-left'}`}>
            <div className="lg:col-span-7 text-center lg:text-start">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background: 'rgba(242,169,0,0.1)', color: '#FFD666', border: '1px solid rgba(242,169,0,0.2)' }}>
                {t.badge}
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ color: '#fff' }}>{t.title}</h2>
              <p className="text-base md:text-lg mb-5" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>{t.subtitle}</p>
              <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'rgba(244,239,255,0.78)' }} dir={isRtl ? 'rtl' : 'ltr'}>{t.copy}</p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
                style={{ background: '#F2A900', color: '#090416', boxShadow: '0 8px 30px rgba(242,169,0,0.2)' }}
              >
                {t.cta}
                {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
              </a>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-3">
                {t.points.map((point, index) => (
                  <div key={point} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: 'rgba(9,4,22,0.42)', border: '1px solid rgba(139,92,246,0.14)' }}>
                    <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: 'rgba(242,169,0,0.12)', color: '#FFD666', border: '1px solid rgba(242,169,0,0.18)' }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.82)' }} dir={isRtl ? 'rtl' : 'ltr'}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function ProcessSection({ lang }: { lang: 'en' | 'ar' }) {
  const t = content[lang].process;
  const isRtl = lang === 'ar';

  return (
    <AnimatedSection id="process" className="py-20 md:py-24 px-6 relative overflow-hidden" style={{ background: 'transparent' }}>
      <div className="absolute inset-0 bg-radial-gradient from-purple-900/5 via-transparent to-transparent -z-10" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA', border: '1px solid rgba(139,92,246,0.15)' }}>
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gold-gradient">{t.title}</h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>
            {t.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-10">
          {t.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-6 rounded-2xl text-center group"
              style={{
                background: 'rgba(20,9,38,0.4)',
                border: '1px solid rgba(139,92,246,0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="text-3xl font-extrabold mb-3 text-gold-gradient">{step.num}</div>
              <h3 className="font-bold text-base mb-2" style={{ color: '#fff' }}>{step.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>{step.desc}</p>
              {i < t.steps.length - 1 && (
                <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 z-10 ${isRtl ? '-left-3' : '-right-3'}`}>
                  <ChevronRight size={16} style={{ color: '#F2A900', transform: isRtl ? 'rotate(180deg)' : undefined }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Quality Questions */}
        <div className="p-6 md:p-7 rounded-2xl" style={{ background: 'rgba(242,169,0,0.04)', border: '1px solid rgba(242,169,0,0.20)', backdropFilter: 'blur(10px)' }}>
          <h3 className="font-bold text-base mb-5 text-center" style={{ color: '#F2A900' }}>{t.questions.title}</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {t.questions.items.map((q, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(20,9,38,0.42)', border: '1px solid rgba(139,92,246,0.12)' }}>
                <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#F2A900', color: '#090416' }}>{i + 1}</span>
                <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.82)' }} dir={isRtl ? 'rtl' : 'ltr'}>{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Packages Section ────────────────────────────────── */
function PackagesSection({ lang }: { lang: 'en' | 'ar' }) {
  const t = content[lang].packages;
  const isRtl = lang === 'ar';
  const diagnosisLink = getWhatsAppLink(lang);
  const monthlyLink = getWhatsAppLink(lang, 'monthly');

  return (
    <AnimatedSection id="packages" className="py-20 md:py-24 px-6 relative overflow-hidden" style={{ background: 'transparent' }}>
      <div className="absolute inset-0 bg-radial-gradient from-purple-900/10 via-transparent to-transparent -z-10" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA', border: '1px solid rgba(139,92,246,0.15)' }}>
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ color: '#fff' }}>{t.title}</h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12 items-stretch">
          {/* Sprint */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-7 rounded-3xl flex flex-col"
            style={{
              background: 'rgba(20,9,38,0.4)',
              border: '1px solid rgba(139,92,246,0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider" style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA' }}>
                {t.sprint.badge}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1" style={{ color: '#fff' }}>{t.sprint.name}</h3>
            <p className="text-sm mb-4" style={{ color: '#B5AEC4' }}>{t.sprint.subtitle}</p>
            <div className="flex items-center gap-2 mb-6">
              <Layers size={14} style={{ color: '#F2A900' }} />
              <span className="text-sm font-semibold" style={{ color: '#FFD666' }}>{t.sprint.scope}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {t.sprint.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  <Check size={16} className="shrink-0 mt-0.5" style={{ color: '#F2A900' }} />
                  <span dir={isRtl ? 'rtl' : 'ltr'}>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href={diagnosisLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
              style={{ border: '2px solid rgba(139,92,246,0.3)', color: '#fff', background: 'rgba(139,92,246,0.1)' }}
            >
              {t.sprint.cta}
              {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </a>
          </motion.div>

          {/* Full System */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-7 rounded-3xl relative overflow-hidden flex flex-col"
            style={{
              background: 'linear-gradient(135deg, #100624 0%, #1D0E3B 50%, #2A134E 100%)',
              border: '1px solid #F2A900',
              boxShadow: '0 8px 40px rgba(242,169,0,0.15)',
            }}
          >
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider" style={{ background: '#F2A900', color: '#090416' }}>
                {t.full.badge}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1 text-gold-gradient mt-6">{t.full.name}</h3>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>{t.full.subtitle}</p>
            <div className="flex items-center gap-2 mb-6">
              <Layers size={14} style={{ color: '#F2A900' }} />
              <span className="text-sm font-semibold" style={{ color: '#FFD666' }}>{t.full.scope}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {t.full.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  <Check size={16} className="shrink-0 mt-0.5" style={{ color: '#F2A900' }} />
                  <span dir={isRtl ? 'rtl' : 'ltr'}>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href={diagnosisLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
              style={{ background: '#F2A900', color: '#090416', boxShadow: '0 0 20px rgba(242,169,0,0.3)' }}
            >
              {t.full.cta}
              {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </a>
          </motion.div>

          {/* Managed Systems Partner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-7 rounded-3xl flex flex-col"
            style={{
              background: 'rgba(20,9,38,0.55)',
              border: '1px solid rgba(139,92,246,0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
            }}
          >
            <span className="self-start px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4" style={{ background: 'rgba(139,92,246,0.15)', color: '#C4B5FD' }}>
              {t.managed.badge}
            </span>
            <h3 className="text-2xl font-bold mb-1" style={{ color: '#fff' }}>{t.managed.name}</h3>
            <p className="text-sm mb-4" style={{ color: '#B5AEC4' }}>{t.managed.subtitle}</p>
            <div className="flex items-center gap-2 mb-5">
              <RefreshCw size={14} style={{ color: '#F2A900' }} />
              <span className="text-sm font-semibold" style={{ color: '#FFD666' }}>{t.managed.scope}</span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.72)' }} dir={isRtl ? 'rtl' : 'ltr'}>
              {t.managed.description}
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {t.managed.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.82)' }}>
                  <Check size={16} className="shrink-0 mt-0.5" style={{ color: '#F2A900' }} />
                  <span dir={isRtl ? 'rtl' : 'ltr'}>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href={monthlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
              style={{ border: '1px solid rgba(242,169,0,0.45)', color: '#FFD666', background: 'rgba(242,169,0,0.07)' }}
            >
              {t.managed.cta}
              {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </a>
          </motion.div>
        </div>

        <p className="max-w-3xl mx-auto mb-10 text-center text-xs md:text-sm leading-relaxed" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>
          {t.scopeNote}
        </p>

        {t.guide.items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-3xl"
            style={{
              background: 'rgba(20,9,38,0.4)',
              border: '1px solid rgba(139,92,246,0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            }}
          >
            <h3 className="text-lg font-bold mb-5" style={{ color: '#fff' }}>{t.guide.title}</h3>
            <div className="grid md:grid-cols-2 gap-3 max-h-[20rem] overflow-y-auto pr-2">
              {t.guide.items.map((item, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.08)' }}>
                  <p className="text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.8)' }} dir={isRtl ? 'rtl' : 'ltr'}>{item.if}</p>
                  <p className="text-sm font-bold" style={{ color: '#FFD666' }}>{item.then}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  );
}

/* ─── Differentiators Section ─────────────────────────── */
function DifferentiatorsSection({ lang }: { lang: 'en' | 'ar' }) {
  const t = content[lang].differentiators;
  const isRtl = lang === 'ar';

  return (
    <AnimatedSection id="why" className="py-20 md:py-24 px-6 relative overflow-hidden" style={{ background: 'transparent' }}>
      <div className="absolute inset-0 bg-radial-gradient from-purple-900/5 via-transparent to-transparent -z-10" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA', border: '1px solid rgba(139,92,246,0.15)' }}>
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gold-gradient">{t.title}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {t.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-5 rounded-2xl group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(20,9,38,0.4)',
                border: '1px solid rgba(139,92,246,0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(242,169,0,0.12)', border: '1px solid rgba(242,169,0,0.15)' }}>
                <span style={{ color: '#F2A900' }}>{getIcon(item.icon, 18)}</span>
              </div>
              <h3 className="font-bold text-sm mb-2" style={{ color: '#fff' }}>{item.title}</h3>
              <p className="text-xs leading-relaxed mb-3" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>
                {item.desc}
              </p>
              <p className="text-xs italic" style={{ color: 'rgba(242,169,0,0.6)' }} dir={isRtl ? 'rtl' : 'ltr'}>
                {item.quote}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Examples Section ────────────────────────────────── */
function ExamplesSection({ lang }: { lang: 'en' | 'ar' }) {
  const t = content[lang].examples;
  const isRtl = lang === 'ar';

  return (
    <AnimatedSection className="py-20 md:py-24 px-6 relative overflow-hidden" style={{ background: 'transparent' }}>
      <div className="absolute inset-0 bg-radial-gradient from-purple-900/5 via-transparent to-transparent -z-10" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA', border: '1px solid rgba(139,92,246,0.15)' }}>
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ color: '#fff' }}>{t.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl transition-all duration-300 hover:shadow-2xl"
              style={{
                background: 'rgba(20,9,38,0.4)',
                border: '1px solid rgba(139,92,246,0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center animate-pulse" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
                  <span style={{ color: '#A78BFA' }}>{getIcon(item.icon, 18)}</span>
                </div>
                <h3 className="font-bold text-lg" style={{ color: '#fff' }}>{item.title}</h3>
              </div>
              <div className="mb-4 p-4 rounded-xl" style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.1)' }}>
                <p className="text-xs font-bold uppercase mb-1" style={{ color: '#B5AEC4' }}>
                  {lang === 'en' ? 'Challenge:' : 'التحدي:'}
                </p>
                <p className="text-sm font-semibold" style={{ color: '#FFD666' }} dir={isRtl ? 'rtl' : 'ltr'}>{item.challenge}</p>
              </div>
              <ul className="space-y-2">
                {item.result.map((r, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-left" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    <Check size={14} className="shrink-0 mt-0.5" style={{ color: '#F2A900' }} />
                    <span dir={isRtl ? 'rtl' : 'ltr'}>{r}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Tools Section ───────────────────────────────────── */
function ToolsSection({ lang }: { lang: 'en' | 'ar' }) {
  const t = content[lang].tools;
  const isRtl = lang === 'ar';

  return (
    <AnimatedSection className="py-20 md:py-24 px-6 relative overflow-hidden" style={{ background: 'transparent' }}>
      <div className="absolute inset-0 bg-radial-gradient from-purple-900/5 via-transparent to-transparent -z-10" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA', border: '1px solid rgba(139,92,246,0.15)' }}>
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gold-gradient">{t.title}</h2>
          <p className="text-base md:text-lg max-w-xl mx-auto mb-12" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>
            {t.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {t.categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-5 rounded-2xl ${isRtl ? 'text-right' : 'text-left'}`}
                style={{
                  background: 'rgba(20,9,38,0.4)',
                  border: '1px solid rgba(139,92,246,0.15)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <h3 className="font-bold text-sm mb-4" style={{ color: '#F2A900' }}>{cat.name}</h3>
                <div className="space-y-4">
                  {cat.tools.map((tool, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <Database size={12} className="shrink-0 mt-1" style={{ color: 'rgba(242,169,0,0.5)' }} />
                      <div>
                        <p className="text-sm font-semibold" style={{ color: '#fff' }}>{tool.name}</p>
                        <p className="text-xs" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>{tool.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Contact Section ─────────────────────────────────── */
function ContactSection({ lang }: { lang: 'en' | 'ar' }) {
  const t = content[lang].contact;
  const isRtl = lang === 'ar';
  const diagnosisLink = getWhatsAppLink(lang);
  const monthlyLink = getWhatsAppLink(lang, 'monthly');
  const briefLink = getBusinessBriefLink(lang);

  return (
    <AnimatedSection id="contact" className="py-20 md:py-24 px-6 relative overflow-hidden" style={{ background: 'transparent' }}>
      <div className="absolute inset-0 bg-radial-gradient from-purple-900/5 via-transparent to-transparent -z-10" />
      <div className="max-w-6xl mx-auto text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA', border: '1px solid rgba(139,92,246,0.15)' }}>
          {t.badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 contact-heading" style={{ color: '#fff' }}>{t.title}</h2>
        <p className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>
          {t.subtitle}
        </p>

        <div className="grid md:grid-cols-3 gap-5 text-start">
          {t.actions.map((action, index) => {
            const href = action.type === 'brief' ? briefLink : action.type === 'monthly' ? monthlyLink : diagnosisLink;
            const isExternal = action.type !== 'brief';
            return (
              <motion.article
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="contact-action-card"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="contact-route-label">{action.label}</span>
                  <span className="contact-action-icon">{getIcon(action.icon, 18)}</span>
                </div>
                <h3>{action.title}</h3>
                <p dir={isRtl ? 'rtl' : 'ltr'}>{action.text}</p>
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className={index === 0 ? 'contact-action-button is-primary' : 'contact-action-button'}
                >
                  {action.cta}
                  {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                </a>
              </motion.article>
            );
          })}
        </div>

        <div className="contact-direct-details">
          <a href={`mailto:${t.email}`}>
            <Mail size={16} />
            <span><strong>{t.details.email}:</strong> {t.email}</span>
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
            <Phone size={16} />
            <span><strong>{t.details.whatsapp}:</strong> <bdi>{t.phone}</bdi></span>
          </a>
          <div>
            <MapPin size={16} />
            <span><strong>{t.details.location}:</strong> {t.location}</span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── Footer ──────────────────────────────────────────── */
function Footer({ lang }: { lang: 'en' | 'ar' }) {
  const t = content[lang].footer;
  const contact = content[lang].contact;

  return (
    <footer className="py-8 px-6 text-center" style={{ background: '#090416', borderTop: '1px solid rgba(139,92,246,0.1)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center justify-center gap-2 mb-2">
          <Image src="/brand/aura-mark.png" alt="" width={30} height={30} className="h-7 w-7 object-contain" />
          <span className="text-2xl font-extrabold text-gold-gradient">AURA</span>
        </div>
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(242,169,0,0.6)' }}>{t.tagline}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-5 text-xs">
          <a href={`mailto:${contact.email}`} className="transition-colors hover:text-white" style={{ color: '#B5AEC4' }}>{contact.email}</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white" style={{ color: '#B5AEC4' }} dir="ltr">{contact.phone}</a>
        </div>
        <div className="h-px mb-5" style={{ background: 'rgba(139,92,246,0.1)' }} />
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          © {new Date().getFullYear()} AURA. {t.rights} {t.built}
        </p>
      </div>
    </footer>
  );
}

/* ─── Main Page ───────────────────────────────────────── */
export default function Home() {
  const [loading, setLoading] = useState(true);
  const lang = useSyncExternalStore(subscribeToLanguagePreference, getLanguageSnapshot, () => 'ar');
  const [scrolled, setScrolled] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRtl = lang === 'ar';
  const changeLanguage = useCallback((nextLanguage: 'en' | 'ar') => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
  }, []);

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col"
      style={{ fontFamily: isRtl ? 'var(--font-cairo), sans-serif' : 'var(--font-outfit), sans-serif' }}
    >
      <AnimatePresence>
        {loading && <Loader onComplete={handleLoaderComplete} lang={lang} />}
      </AnimatePresence>

      <Navigation lang={lang} setLang={changeLanguage} scrolled={scrolled} />

      <main className="flex-1">
        <HeroSection lang={lang} />
        <div className="section-divider" />
        <WhySection lang={lang} />
        <div className="section-divider" />
        <ServicesSection lang={lang} />
        <div className="section-divider" />
        <PortfolioSection lang={lang} />
        <div className="section-divider" />
        <DiscoverySection lang={lang} />
        <div className="section-divider" />
        <ProcessSection lang={lang} />
        <div className="section-divider" />
        <PackagesSection lang={lang} />
        <div className="section-divider" />
        <ContactSection lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
