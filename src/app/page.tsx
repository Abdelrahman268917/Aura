'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Globe, Zap, Shield, Target, Bot, Layers,
  Rocket, BookOpen, Users, ChevronRight, ChevronDown, Check,
  Mail, Phone, MapPin, Star, Award, Clock, TrendingUp,
  Settings, BarChart3, Workflow, Database, MessageSquare,
  Sparkles, ArrowUpRight, Menu, X, Play, RefreshCw
} from 'lucide-react';
import { SystemDashboardMockup } from '@/components/system-dashboard-mockup';

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
        duration: '5-14 days execution',
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
        duration: '21-45 days execution',
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
        duration: 'Monthly custom scope',
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
      title: 'Ready to Transform Your Business Into a System?',
      subtitle: 'Tell us where work slows down, gets repeated, or becomes difficult to manage. We will help identify the right starting point.',
      email: 'amirelshazly66@gmail.com',
      phone: '+20 102 924 0066',
      location: 'Egypt / Remote',
      questions: [
        'How does your current workflow currently operate until final delivery?',
        'Where do delays, re-work, or chaos appear most in your work?',
        'What would a clearer, easier operating system change for your team?',
      ],
      cta: 'Send a Business Brief',
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
      packages: 'الباقات',
      why: 'لماذا نحن',
      contact: 'تواصل',
      cta: 'ابدأ الآن',
    },
    loader: {
      tagline: 'استديو تسريع الأعمال',
    },
    hero: {
      badge: 'AURA · استديو تسريع الأعمال',
      title1: 'نبني بذكاء.',
      title2: 'نعمل أسرع.',
      title3: 'حوّل عملك',
      title4: 'إلى نظام.',
      subheadline: 'نصمم سير العمل، ونبني الأدوات، وندير النظام مع نمو عملك.',
      description: 'نحن لا نبيع أدوات أو ذكاء اصطناعياً فقط. نبدأ بفهم طريقة عمل شركتك فعلياً، ثم نصمم طبقة تشغيلية تجعل التنفيذ أسهل، والتحسين مستمراً، والنمو قابلاً للتوسع.',
      cta1: 'ابدأ الآن',
      cta2: 'شاهد كيف نعمل',
    },
    why: {
      badge: 'المشكلة',
      title: 'لماذا استديو تسريع الأعمال؟',
      subtitle: 'المشكلة الحقيقية في معظم الشركات اليوم هي التأثير على الشركة نفسها:',
      problems: [
        { icon: 'scatter', title: 'عمل متفرق', desc: 'محادثات وملفات وقرارات موزعة بين قنوات وجداول غير مترابطة' },
        { icon: 'delay', title: 'تأخير التسليم', desc: 'أدوات العمل لا تناسب مسار العمل الفعلي — لا تنسيق حقيقي' },
        { icon: 'waste', title: 'إنفاق بلا عائد', desc: 'إنفاق بلا استراتيجية، تسويق ذكاء اصطناعي عشوائي — نتائج متذبذبة' },
        { icon: 'loss', title: 'خسارة أعمال محتملة', desc: 'قرارات بالتخمين، مخاطر عالية، فرص توسع ضائعة' },
      ],
      solution: {
        title: 'ماذا نفعل بشكل مختلف؟',
        desc: 'نبدأ بفهم طريقة عمل شركتك الفعلية، ثم نصمم طبقة تشغيلية تجعل التنفيذ طبيعياً، والتحسين مستمراً، والنمو قابلاً للتوسع. لا نبيع أدوات — نبني أنظمة.',
      },
    },
    services: {
      badge: 'طبقات الخدمة',
      title: 'طبقات خدمات مترابطة',
      subtitle: 'كل طبقة مصممة لتنتج نتيجة قابلة للتوسع للشركة. الطبقات تعمل معاً كنظام تسريع أعمال كامل.',
      layers: [
        {
          num: '٠١',
          title: 'تشخيص مسار العمل',
          problem: 'قرارات بلا بيانات، هدر موارد، بطء كشف المشاكل، أولويات غير واضحة',
          solution: 'تدقيق تشغيلي دقيق مع خريطة خيارات وتقرير أولويات للتنفيذ الفوري',
          kpis: ['وقت القرار', 'عدد الخيارات الكامنة', 'نسبة عنق الزجاجة'],
          impact: 'النتيجة: أولويات أوضح وخارطة عملية قابلة للتنفيذ',
          icon: 'search',
        },
        {
          num: '٠٢',
          title: 'تصميم مسار العمل',
          problem: 'عمل متفرق، مسؤوليات غير واضحة، تأخير متكرر في التسليم، مواعيد متعارضة',
          solution: 'نظام تشغيلي كامل: مراحل واضحة + مسؤوليات محددة + موافقات + دورية تشغيلية أسبوعية',
          kpis: ['سرعة التسليم', 'وضوح المسؤولية', 'معدل إعادة العمل'],
          impact: 'النتيجة: تسليم أكثر سلاسة ومسؤوليات أوضح وفجوات أقل',
          icon: 'flow',
        },
        {
          num: '٠٣',
          title: 'بناء الأدوات الداخلية',
          problem: 'أدوات لا تناسب العمل، فريق يعمل بجداول وتذكيرات، لا نظام متابعة، لا تتبع أداء',
          solution: 'CRM خفيف + أنظمة متابعة مخصصة + قوالب ذكية + بوابات إدخال + قواعد بيانات',
          kpis: ['دقة البيانات', 'تقليل المهام اليدوية', 'معدل استخدام الأدوات يومياً'],
          impact: 'النتيجة: أدوات تدعم الفريق بدلاً من إضافة أعمال إدارية جديدة',
          icon: 'build',
        },
        {
          num: '٠٤',
          title: 'دمج الذكاء الاصطناعي والأتمتة',
          problem: 'مهام متكررة تستهلك الفريق، أخطاء بشرية في العمليات، لا أتمتة ذكية مرتبطة بالعمل',
          solution: 'نقاط مراجعة بشرية للجودة + n8n مخصص + CrewAI + وكلاء AI + تدفقات مؤتمتة',
          kpis: ['عدد المهام المؤتمتة', 'تقليل الأخطاء', 'وقت التوفير الأسبوعي'],
          impact: 'النتيجة: أتمتة موثوقة مع مراجعة بشرية حيث تهم الجودة',
          icon: 'bot',
        },
        {
          num: '٠٥',
          title: 'استراتيجية المحتوى والتسويق',
          problem: 'محتوى عشوائي، إنفاق بلا عائد، لا تميز واضح، لا استراتيجية محتوى',
          solution: 'نظام محتوى مركز بموضوعات واضحة ومسار إنتاج ونقاط مراجعة وتعلم من الأداء',
          kpis: ['نمو المتابعين', 'الوصول المتكرر الشهري', 'معدل التحويل', 'تكلفة العميل المحتمل'],
          impact: 'النتيجة: قرارات محتوى أكثر اتساقاً وعملية إنتاج قابلة للتكرار',
          icon: 'trend',
        },
        {
          num: '٠٦',
          title: 'هيكلة الشركات والمشاريع الناشئة',
          problem: 'فكرة غير واضحة، لا نموذج تسليم، إطلاق متأخر، لا تخطيط استراتيجي للمشروع',
          solution: 'عرض واضح ومحدد + نموذج تسليم قابل للتكرار + خطة إطلاق + استراتيجية أول إيراد',
          kpis: ['وضوح العرض للمستثمر', 'وقت الإطلاق', 'معدل الاحتفاظ', 'سرعة أول إيراد'],
          impact: 'النتيجة: عرض ونموذج تسليم ومسار أوضح من الفكرة إلى الإطلاق',
          icon: 'rocket',
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
      badge: 'المنهجية',
      title: 'من التشخيص إلى التنفيذ القابل للتوسع',
      subtitle: 'كل مرحلة لها هدف واضح ومحدد — لا عبارة عامة تخلق لبساً، بل اقتراح حقيقي مرتبط بالواقع الفعلي لشركتك.',
      steps: [
        { num: '٠١', title: 'التشخيص', desc: 'فهم العمل، رسم المسارات، تحديد الفجوات، نقاط الألم، المسؤوليات' },
        { num: '٠٢', title: 'التصميم', desc: 'القرارات، المحاكاة، مسارات العمل، الأدوات، البيانات، مسارات الأتمتة' },
        { num: '٠٣', title: 'البناء', desc: 'إنشاء أدوات تشغيلية، AI، سير عمل، أنظمة متابعة، لوحات معلومات' },
        { num: '٠٤', title: 'الدمج', desc: 'توثيق سير العمل، جعل النظام سهل للاستخدام اليومي من قبل الفريق' },
        { num: '٠٥', title: 'التحسين', desc: 'التحسين المستمر، توسيع النظام، جعل النمو طبيعياً' },
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
      badge: 'الباقات',
      title: 'اختر ما يناسب احتياجك',
      subtitle: 'التشخيص الأولي سيساعد على تحديد المسار المناسب — لا تدفع مقابل ما لا تحتاجه.',
      sprint: {
        name: 'سبرنت',
        subtitle: 'عندما تحتاج شيئاً واحداً محدداً',
        badge: 'الأفضل لاحتياج محدد',
        duration: 'تنفيذ ٥-١٤ يوم',
        features: [
          'سبرنت تشخيص وتحليل',
          'سبرنت تصميم مسار العمل',
          'سبرنت بناء الأدوات الداخلية',
          'سبرنت أتمتة الذكاء الاصطناعي',
          'سبرنت استراتيجية المحتوى',
          'سبرنت هيكلة المشروع',
        ],
        cta: 'ابدأ بالتشخيص',
      },
      full: {
        name: 'النظام الكامل',
        subtitle: 'أقصى تأثير — أفضل قيمة',
        badge: 'الأكثر تأثيراً',
        duration: 'تنفيذ ٢١-٤٥ يوم',
        features: [
          'جميع طبقات الخدمة مدمجة',
          'تشخيص + تصميم + بناء + أتمتة',
          'هيكلة كاملة + استراتيجية محتوى',
          'توثيق كامل + تدريب الفريق',
          'خارطة توسع مستقبلية',
          'تسليم واضح وخارطة للتحسين المستقبلي',
        ],
        cta: 'ابدأ الآن',
      },
      managed: {
        name: 'شريك الأنظمة المُدارة',
        subtitle: 'ملكية مستمرة بعد الإطلاق',
        badge: 'شراكة شهرية',
        duration: 'نطاق شهري مخصص',
        description: 'بعد بناء النظام، يمكننا الاستمرار شهرياً لمراقبة الأدوات ومسارات العمل والأتمتة وتحسينها وتكييفها مع نمو عملك.',
        features: ['مراجعة شهرية للنظام', 'مراقبة الأدوات وتحسينها', 'تحديثات سير العمل', 'تحسين الأتمتة', 'خارطة أولويات', 'طلبات وتحسينات جديدة'],
        cta: 'ناقش الدعم الشهري',
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
    },
    differentiators: {
      badge: 'لماذا نحن',
      title: 'نبني حول طريقة عمل شركتك',
      items: [
        { icon: 'award', title: 'خبرة أكثر من ٧ سنوات في بناء المشاريع', desc: 'خبرة عبر البرمجيات والتعليم والأتمتة والعمليات وأنظمة الأعمال.', quote: 'من تجارب مبكرة إلى مسارات عمل وأدوات وطبقات أتمتة وأنظمة تشغيل قابلة للتوسع.' },
        { icon: 'target', title: 'نفكر من مسار العمل أولاً', desc: 'نفهم كيف يعمل فريقك فعلياً قبل اقتراح أداة أو بناء نظام.', quote: 'يجب أن يناسب النظام العمل، لا أن يجبر العمل على التكيف معه.' },
        { icon: 'layers', title: 'طبقة تشغيل واحدة مترابطة', desc: 'نصمم مسارات العمل والأدوات الداخلية والبيانات واللوحات والأتمتة لتعمل معاً.', quote: 'وضوح العملية كاملة أهم من إضافة تطبيق جديد.' },
        { icon: 'refresh', title: 'ملكية مستمرة بعد الإطلاق', desc: 'يحافظ شريك الأنظمة المُدارة على النظام مفيداً ومراقباً وقابلاً للتكيف بعد التسليم.', quote: 'الإطلاق بداية دورة التحسين وليس نهايتها.' },
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
      badge: 'ابدأ',
      title: 'هل أنت مستعد لتحويل عملك إلى نظام؟',
      subtitle: 'أخبرنا أين يتباطأ العمل أو يتكرر أو يصبح صعب الإدارة، وسنساعدك في تحديد نقطة البداية المناسبة.',
      email: 'amirelshazly66@gmail.com',
      phone: '+20 102 924 0066',
      location: 'مصر / عن بُعد',
      questions: [
        'كيف يعمل سير عملك الحالي حتى التسليم النهائي؟',
        'أين يظهر التأخير أو إعادة العمل أو الفوضى أكثر في عملك؟',
        'ماذا سيغير نظام تشغيل أوضح وأسهل لفريقك؟',
      ],
      cta: 'أرسل ملخص عملك',
    },
    footer: {
      tagline: 'استديو تسريع الأعمال',
      rights: 'جميع الحقوق محفوظة.',
      built: 'بُني بدقة.',
    },
  },
};

/* ─── Icon Mapper ──────────────────────────────────────── */
function getIcon(name: string, size = 20) {
  const map: Record<string, React.ReactNode> = {
    scatter: <Layers size={size} />,
    delay: <Clock size={size} />,
    waste: <TrendingUp size={size} />,
    loss: <BarChart3 size={size} />,
    search: <Target size={size} />,
    flow: <Workflow size={size} />,
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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center flex-col gap-6"
      style={{ background: '#1A0A2E' }}
      exit={{ opacity: 0, visibility: 'hidden' }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(75,29,110,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(242,169,0,0.15) 0%, transparent 50%)',
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-4"
      >
        <motion.div
          className="text-5xl md:text-7xl font-bold tracking-wider"
          style={{
            background: 'linear-gradient(135deg, #F2A900 0%, #FFD666 50%, #F2A900 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'loaderPulse 2s ease-in-out infinite',
          }}
        >
          AURA
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm md:text-base tracking-widest uppercase"
          style={{ color: 'rgba(242,169,0,0.7)', fontFamily: 'var(--font-outfit), sans-serif' }}
        >
          {content[lang].loader.tagline}
        </motion.p>

        <div className="w-48 h-[3px] rounded-full overflow-hidden mt-2" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{
              background: '#F2A900',
              boxShadow: '0 0 12px rgba(242,169,0,0.5)',
              width: progress + '%',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Navigation ──────────────────────────────────────── */
function Navigation({ lang, setLang, scrolled }: { lang: 'en' | 'ar'; setLang: (l: 'en' | 'ar') => void; scrolled: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = content[lang].nav;
  const isRtl = lang === 'ar';

  const links = [
    { label: t.home, href: '#home' },
    { label: t.services, href: '#services' },
    { label: t.process, href: '#process' },
    { label: t.packages, href: '#packages' },
    { label: t.why, href: '#why' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 2.2 }}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-400"
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
          <span className="text-xl font-bold text-gold-gradient">AURA</span>
          <span className="hidden xl:block text-[0.52rem] leading-tight tracking-[0.12em] uppercase max-w-[5.5rem]" style={{ color: 'rgba(255,255,255,0.45)' }}>Business Acceleration Studio</span>
        </a>

        <div className="hidden md:flex items-center h-12">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="relative flex items-center h-full px-3 text-[0.62rem] tracking-[0.1em] uppercase font-medium transition-colors duration-300"
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
          style={{ color: 'rgba(255,255,255,0.55)' }}
        >
          <Globe size={14} />
          {lang === 'en' ? 'AR' : 'EN'}
        </button>

        <a
          href="#contact"
          className="flex items-center h-12 px-4 gap-1.5 text-[0.62rem] tracking-[0.1em] uppercase font-bold rounded-r-full transition-all duration-300"
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
                className="text-sm tracking-widest uppercase py-2"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── Hero Section ────────────────────────────────────── */
function HeroSection({ lang }: { lang: 'en' | 'ar' }) {
  const t = content[lang].hero;
  const isRtl = lang === 'ar';
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: '#F2A900', color: '#090416', boxShadow: '0 8px 30px rgba(242,169,0,0.3)' }}
              >
                {t.cta1}
                {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </a>
              <a
                href="#process"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-white/5 active:scale-95"
                style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
              >
                <Play size={14} />
                {t.cta2}
              </a>
            </motion.div>

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
function WhySection({ lang }: { lang: 'en' | 'ar' }) {
  const t = content[lang].why;
  const isRtl = lang === 'ar';

  return (
    <AnimatedSection id="why" className="py-20 md:py-24 px-6 relative overflow-hidden" >
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
function ServiceLayerCard({ layer, index, lang }: { layer: typeof content.en.services.layers[0]; index: number; lang: 'en' | 'ar' }) {
  const [expanded, setExpanded] = useState(false);
  const isRtl = lang === 'ar';

  return (
    <motion.div
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
                    {lang === 'en' ? 'What We Build' : 'ما نبنيه'}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }} dir={isRtl ? 'rtl' : 'ltr'}>{layer.solution}</p>
                </div>
                <div>
                  <h4 className="font-bold text-xs tracking-wider uppercase mb-2" style={{ color: '#FFD666' }}>
                    {lang === 'en' ? 'KPIs' : 'مؤشرات الأداء'}
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
              <div className="mt-4 p-4 rounded-xl flex items-center gap-2" style={{ background: 'rgba(242,169,0,0.08)', border: '1px solid rgba(242,169,0,0.15)' }}>
                <TrendingUp size={16} style={{ color: '#FFD666' }} />
                <span className="text-sm font-semibold" style={{ color: '#FFD666' }} dir={isRtl ? 'rtl' : 'ltr'}>{layer.impact}</span>
              </div>
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
        <div className="grid md:grid-cols-5 gap-4 mb-10">
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
              <Clock size={14} style={{ color: '#F2A900' }} />
              <span className="text-sm font-semibold" style={{ color: '#FFD666' }}>{t.sprint.duration}</span>
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
              href="#contact"
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
              <Clock size={14} style={{ color: '#F2A900' }} />
              <span className="text-sm font-semibold" style={{ color: '#FFD666' }}>{t.full.duration}</span>
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
              href="#contact"
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
              <span className="text-sm font-semibold" style={{ color: '#FFD666' }}>{t.managed.duration}</span>
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
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
              style={{ border: '1px solid rgba(242,169,0,0.45)', color: '#FFD666', background: 'rgba(242,169,0,0.07)' }}
            >
              {t.managed.cta}
              {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </a>
          </motion.div>
        </div>

        {/* Starting Point Guide */}
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
      </div>
    </AnimatedSection>
  );
}

/* ─── Differentiators Section ─────────────────────────── */
function DifferentiatorsSection({ lang }: { lang: 'en' | 'ar' }) {
  const t = content[lang].differentiators;
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
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

  return (
    <AnimatedSection id="contact" className="py-20 md:py-24 px-6 relative overflow-hidden" style={{ background: 'transparent' }}>
      <div className="absolute inset-0 bg-radial-gradient from-purple-900/5 via-transparent to-transparent -z-10" />
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6" style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA', border: '1px solid rgba(139,92,246,0.15)' }}>
          {t.badge}
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ color: '#fff' }}>{t.title}</h2>
        <p className="text-base md:text-lg max-w-xl mx-auto mb-12" style={{ color: '#B5AEC4' }} dir={isRtl ? 'rtl' : 'ltr'}>
          {t.subtitle}
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <a href={`mailto:${t.email}`} className="p-5 rounded-2xl flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(20,9,38,0.4)', border: '1px solid rgba(139,92,246,0.15)', backdropFilter: 'blur(10px)' }}>
            <Mail size={20} style={{ color: '#F2A900' }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>{t.email}</span>
          </a>
          <a href={`https://wa.me/201029240066`} target="_blank" rel="noopener noreferrer" className="p-5 rounded-2xl flex flex-col items-center gap-2 transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(20,9,38,0.4)', border: '1px solid rgba(139,92,246,0.15)', backdropFilter: 'blur(10px)' }}>
            <Phone size={20} style={{ color: '#F2A900' }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }} dir="ltr">{t.phone}</span>
          </a>
          <div className="p-5 rounded-2xl flex flex-col items-center gap-2" style={{ background: 'rgba(20,9,38,0.4)', border: '1px solid rgba(139,92,246,0.15)', backdropFilter: 'blur(10px)' }}>
            <MapPin size={20} style={{ color: '#F2A900' }} />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }} dir={isRtl ? 'rtl' : 'ltr'}>{t.location}</span>
          </div>
        </div>

        {/* Questions */}
        <div className={`p-8 rounded-3xl mb-8 ${isRtl ? 'text-right' : 'text-left'}`} style={{
          background: 'linear-gradient(135deg, #100624 0%, #1D0E3B 50%, #2A134E 100%)',
          border: '1px solid rgba(139,92,246,0.2)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
        }}>
          <h3 className="font-bold text-lg mb-6 text-gold-gradient text-center">
            {lang === 'en' ? 'A Useful Starting Brief' : 'ملخص مفيد لنقطة البداية'}
          </h3>
          <ol className="space-y-4">
            {t.questions.map((q, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: '#F2A900', color: '#090416' }}>{i + 1}</span>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }} dir={isRtl ? 'rtl' : 'ltr'}>{q}</p>
              </li>
            ))}
          </ol>
        </div>

        <a
          href={`mailto:${t.email}?subject=${lang === 'en' ? 'AURA Business Brief' : 'ملخص عمل إلى AURA'}`}
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ background: '#F2A900', color: '#090416', boxShadow: '0 8px 30px rgba(242,169,0,0.3)' }}
        >
          {t.cta}
          {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
        </a>
      </div>
    </AnimatedSection>
  );
}

/* ─── Footer ──────────────────────────────────────────── */
function Footer({ lang }: { lang: 'en' | 'ar' }) {
  const t = content[lang].footer;

  return (
    <footer className="py-8 px-6 text-center" style={{ background: '#090416', borderTop: '1px solid rgba(139,92,246,0.1)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-2xl font-extrabold text-gold-gradient mb-2">AURA</div>
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(242,169,0,0.6)' }}>{t.tagline}</p>
        <div className="h-px mb-6" style={{ background: 'rgba(139,92,246,0.1)' }} />
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
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [scrolled, setScrolled] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRtl = lang === 'ar';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
      <AnimatePresence>
        {loading && <Loader onComplete={handleLoaderComplete} lang={lang} />}
      </AnimatePresence>

      <Navigation lang={lang} setLang={setLang} scrolled={scrolled} />

      <main className="flex-1">
        <HeroSection lang={lang} />
        <div className="section-divider" />
        <WhySection lang={lang} />
        <div className="section-divider" />
        <ServicesSection lang={lang} />
        <div className="section-divider" />
        <ProcessSection lang={lang} />
        <div className="section-divider" />
        <PackagesSection lang={lang} />
        <div className="section-divider" />
        <DifferentiatorsSection lang={lang} />
        <div className="section-divider" />
        <ExamplesSection lang={lang} />
        <div className="section-divider" />
        <ToolsSection lang={lang} />
        <div className="section-divider" />
        <ContactSection lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}
