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

/* â”€â”€â”€ i18n Content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
      badge: 'AURA Â· Business Acceleration Studio',
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
        { icon: 'delay', title: 'Delivery Delays', desc: 'Work tools don\'t fit the actual workflow â€” no real coordination' },
        { icon: 'waste', title: 'Wasted Spending', desc: 'Spending without strategy, random AI marketing â€” volatile results' },
        { icon: 'loss', title: 'Revenue Loss', desc: 'Decisions based on guesswork, high risks, missed expansion opportunities' },
      ],
      solution: {
        title: 'What Do We Do Differently?',
        desc: 'We start by understanding how your company actually works. Then we design an operational layer that makes execution natural, improvement continuous, and growth scalable. We don\'t sell tools â€” we build systems.',
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
      subtitle: 'Each phase has a clear, measurable goal â€” not a general statement that creates confusion, but a real proposal linked to the actual reality of your company.',
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
      subtitle: 'The initial diagnosis will help determine the right path â€” you don\'t pay for what you don\'t need.',
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
        subtitle: 'Maximum Impact â€” Best Value',
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
          { if: 'If you say: "We\'re not sure what needs fixing first"', then: 'â†’ Work System Diagnosis Session' },
          { if: 'If you say: "The team is busy but work is scattered"', then: 'â†’ Work Flow Design Sprint' },
          { if: 'If you say: "We need follow-up systems and templates"', then: 'â†’ Internal Tools Building' },
          { if: 'If you say: "Repetitive tasks are bogging down the team"', then: 'â†’ AI Automation Sprint' },
          { if: 'If you say: "Content or marketing direction is unclear"', then: 'â†’ Content & Marketing Strategy Sprint' },
          { if: 'If you say: "The idea is still unclear or no delivery model"', then: 'â†’ Startup Structuring Sprint' },
          { if: 'If you say: "We need a complete transformation for the company"', then: 'â†’ Full Business Acceleration System âœ“' },
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
          challenge: 'Ideas, orders, events, scheduling, publishing â€” everything connects manually',
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
          challenge: 'New inquiries, scattered follow-up, disorganized tracking â€” lost revenue',
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
            { name: 'n8n', desc: 'Open-source automation â€” full control' },
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
      subtitle: 'Start with a short message. Weâ€™ll understand where the chaos is, then recommend the right diagnosis, sprint, full system, or monthly support path.',
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
      home: 'Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©',
      services: 'Ø§Ù„Ø®Ø¯Ù…Ø§Øª',
      process: 'Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø¹Ù…Ù„',
      packages: 'Ø§Ù„Ù…Ø³Ø§Ø±Ø§Øª',
      why: 'Ù„Ù…Ø§Ø°Ø§ AURA',
      contact: 'ØªÙˆØ§ØµÙ„',
      cta: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„Ø¢Ù†',
    },
    loader: {
      tagline: 'Ø§Ø³ØªÙˆØ¯ÙŠÙˆ ØªØ³Ø±ÙŠØ¹ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„',
      line1: 'Ø§Ø¨Ù†Ù Ø¹Ù…Ù„Ùƒ Ø¨Ø°ÙƒØ§Ø¡. Ø§Ø¹Ù…Ù„ Ø£Ø³Ø±Ø¹.',
      line2: 'Ø­ÙˆÙ‘Ù„ Ø´Ø±ÙƒØªÙƒ Ø¥Ù„Ù‰ Ù†Ø¸Ø§Ù… ÙˆØ§Ø¶Ø­.',
    },
    hero: {
      badge: 'AURA Â· Ø§Ø³ØªÙˆØ¯ÙŠÙˆ ØªØ³Ø±ÙŠØ¹ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„',
      title1: 'Ø§Ø¨Ù†Ù Ø¹Ù…Ù„Ùƒ Ø¨Ø°ÙƒØ§Ø¡.',
      title2: 'Ø§Ø¹Ù…Ù„ Ø£Ø³Ø±Ø¹.',
      title3: 'Ø­ÙˆÙ‘Ù„ Ø´Ø±ÙƒØªÙƒ',
      title4: 'Ø¥Ù„Ù‰ Ù†Ø¸Ø§Ù….',
      subheadline: 'Ù†ØµÙ…Ù… Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ØŒ Ù†Ø¨Ù†ÙŠ Ø§Ù„Ø£Ø¯ÙˆØ§ØªØŒ ÙˆÙ†Ø³Ø§Ø¹Ø¯Ùƒ Ø¹Ù„Ù‰ Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù†Ø¸Ø§Ù… Ù…Ø¹ Ù†Ù…Ùˆ Ø´Ø±ÙƒØªÙƒ.',
      description: 'Ù„Ø§ Ù†Ø¨Ø¯Ø£ Ø¨Ø§Ù„Ø£Ø¯Ø§Ø© Ù‚Ø¨Ù„ ÙÙ‡Ù… Ø·Ø±ÙŠÙ‚Ø© Ø¹Ù…Ù„ Ø´Ø±ÙƒØªÙƒ. Ù†Ø­Ù„Ù„ Ø§Ù„ØªØ´ØºÙŠÙ„ØŒ Ù†Ø±Ø³Ù… Ø§Ù„Ù…Ø³Ø§Ø±ØŒ Ø«Ù… Ù†Ø¨Ù†ÙŠ Ø·Ø¨Ù‚Ø© Ø¹Ù…Ù„ÙŠØ© ØªØ¬Ø¹Ù„ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø£ÙˆØ¶Ø­ØŒ ÙˆØ§Ù„ØªÙ†ÙÙŠØ° Ø£Ø³Ø±Ø¹ØŒ ÙˆØ§Ù„Ù†Ù…Ùˆ Ø£ÙƒØ«Ø± Ù‚Ø§Ø¨Ù„ÙŠØ© Ù„Ù„Ø¥Ø¯Ø§Ø±Ø©.',
      cta1: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„ØªØ´Ø®ÙŠØµ',
      cta2: 'Ø§Ø¹Ø±Ù Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø¹Ù…Ù„',
    },
    why: {
      badge: 'Ø§Ù„Ù…Ø´ÙƒÙ„Ø©',
      title: 'Ø­ÙŠÙ† ÙŠÙƒØ¨Ø± Ø§Ù„Ø¹Ù…Ù„ Ù‚Ø¨Ù„ Ø£Ù† ÙŠÙƒØªÙ…Ù„ Ø§Ù„Ù†Ø¸Ø§Ù…',
      subtitle: 'ØªØ¸Ù‡Ø± Ø§Ù„Ù…Ø´ÙƒÙ„Ø© Ø¹Ù†Ø¯Ù…Ø§ ØªØªÙˆØ²Ø¹ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© ÙˆØ§Ù„Ù…Ù„ÙØ§Øª ÙˆØ§Ù„Ù‚Ø±Ø§Ø±Ø§Øª Ø¨ÙŠÙ† Ø£Ø¯ÙˆØ§Øª Ù„Ø§ ØªØ¹Ù…Ù„ Ù…Ø¹Ù‹Ø§.',
      problems: [
        { icon: 'scatter', title: 'Ø¹Ù…Ù„ Ù…ØªÙØ±Ù‚', desc: 'Ù…Ø­Ø§Ø¯Ø«Ø§Øª ÙˆÙ…Ù„ÙØ§Øª ÙˆÙ‚Ø±Ø§Ø±Ø§Øª Ù…ÙˆØ²Ø¹Ø© Ø¨ÙŠÙ† Ù‚Ù†ÙˆØ§Øª ÙˆØ¬Ø¯Ø§ÙˆÙ„ ØºÙŠØ± Ù…ØªØ±Ø§Ø¨Ø·Ø©' },
        { icon: 'delay', title: 'ØªØ£Ø®ÙŠØ± Ø§Ù„ØªØ³Ù„ÙŠÙ…', desc: 'Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ø¹Ù…Ù„ Ù„Ø§ ØªÙ†Ø§Ø³Ø¨ Ù…Ø³Ø§Ø± Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„ÙØ¹Ù„ÙŠ â€” Ù„Ø§ ØªÙ†Ø³ÙŠÙ‚ Ø­Ù‚ÙŠÙ‚ÙŠ' },
        { icon: 'waste', title: 'Ø¥Ù†ÙØ§Ù‚ Ø¨Ù„Ø§ Ø¹Ø§Ø¦Ø¯', desc: 'Ø¥Ù†ÙØ§Ù‚ Ø¨Ù„Ø§ Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ©ØŒ ØªØ³ÙˆÙŠÙ‚ Ø°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ø¹Ø´ÙˆØ§Ø¦ÙŠ â€” Ù†ØªØ§Ø¦Ø¬ Ù…ØªØ°Ø¨Ø°Ø¨Ø©' },
        { icon: 'loss', title: 'Ø®Ø³Ø§Ø±Ø© Ø£Ø¹Ù…Ø§Ù„ Ù…Ø­ØªÙ…Ù„Ø©', desc: 'Ù‚Ø±Ø§Ø±Ø§Øª Ø¨Ø§Ù„ØªØ®Ù…ÙŠÙ†ØŒ Ù…Ø®Ø§Ø·Ø± Ø¹Ø§Ù„ÙŠØ©ØŒ ÙØ±Øµ ØªÙˆØ³Ø¹ Ø¶Ø§Ø¦Ø¹Ø©' },
      ],
      solution: {
        title: 'ÙƒÙŠÙ ØªØ³Ø§Ø¹Ø¯Ùƒ AURAØŸ',
        desc: 'AURA Ù„ÙŠØ³Øª Ù…Ø¬Ø±Ø¯ Ø£Ø¯ÙˆØ§Øª Ø£Ùˆ ØªØ³ÙˆÙŠÙ‚ Ù…Ù†ÙØµÙ„. Ù†Ø³Ø§Ø¹Ø¯ Ø§Ù„Ø´Ø±ÙƒØ§Øª Ø¹Ù„Ù‰ ØªØ­ÙˆÙŠÙ„ Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„ÙŠÙˆÙ…ÙŠ Ø¥Ù„Ù‰ Ù†Ø¸Ø§Ù… ÙˆØ§Ø¶Ø­: ØªØ´Ø®ÙŠØµØŒ ØªÙ†Ø¸ÙŠÙ… Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ØŒ Ø¨Ù†Ø§Ø¡ Ø£Ø¯ÙˆØ§Øª ÙˆÙ„ÙˆØ­Ø§Øª Ù…ØªØ§Ø¨Ø¹Ø©ØŒ Ø£ØªÙ…ØªØ©ØŒ ÙˆØªØ³ÙˆÙŠÙ‚ Ù…Ø±ØªØ¨Ø· Ø¨Ø§Ù„ØªØ´ØºÙŠÙ„ ÙˆØ§Ù„Ù†Ù…Ùˆ.',
      },
    },
    services: {
      badge: 'Ø®Ø¯Ù…Ø§Øª AURA',
      title: 'Ø®Ø¯Ù…Ø§ØªÙ†Ø§',
      subtitle: 'ÙŠÙ…ÙƒÙ†Ùƒ Ø§Ù„Ø¨Ø¯Ø¡ Ø¨Ù…Ø³Ø§Ø¹Ø¯Ø© Ø´Ø§Ù…Ù„Ø©ØŒ Ø£Ùˆ Ø§Ø®ØªÙŠØ§Ø± Ø®Ø¯Ù…Ø© Ù…Ø­Ø¯Ø¯Ø© Ø­Ø³Ø¨ Ø§Ø­ØªÙŠØ§Ø¬ Ø´Ø±ÙƒØªÙƒ Ø§Ù„Ø­Ø§Ù„ÙŠ.',
      layers: [
        {
          num: 'Ù Ù¡',
          title: 'ØªØµÙ…ÙŠÙ… Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ ÙˆØ§Ù„ØªØ´ØºÙŠÙ„',
          problem: 'Ù†Ø­ÙˆÙ‘Ù„ Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„ÙŠÙˆÙ…ÙŠØ© Ø¥Ù„Ù‰ Ø®Ø·ÙˆØ§Øª ÙˆØ§Ø¶Ø­Ø©ØŒ Ø¨Ù…Ø³Ø¤ÙˆÙ„ÙŠØ§Øª Ù…Ø­Ø¯Ø¯Ø© ÙˆÙ…Ø±Ø§Ø­Ù„ Ù…ØªØ§Ø¨Ø¹Ø© Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„Ù‚ÙŠØ§Ø³.',
          solution: 'Ù†Ø±Ø³Ù… Ø§Ù„Ù…Ø³Ø§Ø± Ø§Ù„Ø­Ø§Ù„ÙŠØŒ Ù†Ø­Ø¯Ø¯ Ù†Ù‚Ø§Ø· Ø§Ù„ØªØ¹Ø·ÙŠÙ„ØŒ Ø«Ù… Ù†ØµÙ…Ù… Ø³ÙŠØ± Ø¹Ù…Ù„ Ø¹Ù…Ù„ÙŠ ÙŠÙ†Ø§Ø³Ø¨ Ø§Ù„ÙØ±ÙŠÙ‚ ÙˆØ·Ø±ÙŠÙ‚Ø© Ø§Ù„ØªØ³Ù„ÙŠÙ….',
          kpis: ['Ø®Ø±ÙŠØ·Ø© Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„', 'ØªÙˆØ²ÙŠØ¹ Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠØ§Øª', 'ØªØ­Ø¯ÙŠØ¯ Ù†Ù‚Ø§Ø· Ø§Ù„ØªØ¹Ø·ÙŠÙ„', 'ØªÙˆØµÙŠØ§Øª ØªØ´ØºÙŠÙ„ÙŠØ© ÙˆØ§Ø¶Ø­Ø©'],
          impact: 'Ø§Ù„Ù†ØªÙŠØ¬Ø©: ØªØ´ØºÙŠÙ„ Ø£ÙˆØ¶Ø­ ÙˆÙ…Ø³Ø¤ÙˆÙ„ÙŠØ§Øª Ø£Ø³Ù‡Ù„ ÙÙŠ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø©.',
          icon: 'flow',
        },
        {
          num: 'Ù Ù¢',
          title: 'Ù„ÙˆØ­Ø§Øª Ø§Ù„Ø¥Ø¯Ø§Ø±Ø© ÙˆØ£Ù†Ø¸Ù…Ø© Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø©',
          problem: 'Ù†Ø¨Ù†ÙŠ Ù„ÙˆØ­Ø§Øª Ù…ØªØ§Ø¨Ø¹Ø© ØªØ³Ø§Ø¹Ø¯ Ø§Ù„Ø¥Ø¯Ø§Ø±Ø© Ø¹Ù„Ù‰ Ø±Ø¤ÙŠØ© Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ ÙˆØ§Ù„Ø¹Ù…Ù„Ø§Ø¡ ÙˆØ§Ù„Ù…Ù‡Ø§Ù… ÙˆØ§Ù„ØªØ­ØµÙŠÙ„ ÙˆØ§Ù„ØªØ³ÙˆÙŠÙ‚ ÙÙŠ Ù…ÙƒØ§Ù† ÙˆØ§Ø­Ø¯.',
          solution: 'Ù†Ø­Ø¯Ø¯ Ø§Ù„Ù…Ø¤Ø´Ø±Ø§Øª Ø§Ù„Ù…Ù‡Ù…Ø© ÙˆÙ…ØµØ§Ø¯Ø± Ø§Ù„Ø¨ÙŠØ§Ù†Ø§ØªØŒ Ø«Ù… Ù†Ø¨Ù†ÙŠ Ù„ÙˆØ­Ø© ØªØ®Ø¯Ù… Ø§Ù„Ù‚Ø±Ø§Ø± ÙˆØ§Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„ÙŠÙˆÙ…ÙŠØ©.',
          kpis: ['Ù„ÙˆØ­Ø© Ø¥Ø¯Ø§Ø±Ø© ØªÙ†ÙÙŠØ°ÙŠØ©', 'Ù…Ø¤Ø´Ø±Ø§Øª Ù…ØªØ§Ø¨Ø¹Ø©', 'ØªÙ‚Ø§Ø±ÙŠØ± Ø£Ø³Ø¨ÙˆØ¹ÙŠØ© Ø£Ùˆ Ø´Ù‡Ø±ÙŠØ©', 'Ø±Ø¤ÙŠØ© Ù…ÙˆØ­Ø¯Ø© Ù„Ù„ÙØ±ÙŠÙ‚'],
          impact: 'Ø§Ù„Ù†ØªÙŠØ¬Ø©: ØµÙˆØ±Ø© Ù…ÙˆØ­Ø¯Ø© ØªØ³Ø§Ø¹Ø¯ Ø§Ù„Ø¥Ø¯Ø§Ø±Ø© Ø¹Ù„Ù‰ Ø§Ù„ØªØ¯Ø®Ù„ ÙÙŠ Ø§Ù„ÙˆÙ‚Øª Ø§Ù„Ù…Ù†Ø§Ø³Ø¨.',
          icon: 'trend',
        },
        {
          num: 'Ù Ù£',
          title: 'Ø§Ù„Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ù„Ø¨Ø±Ø§Ù…Ø¬ Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØ©',
          problem: 'Ù†ØµÙ…Ù… Ø£Ø¯ÙˆØ§Øª Ø¯Ø§Ø®Ù„ÙŠØ© Ø¨Ø³ÙŠØ·Ø© ÙˆÙ…Ø®ØµØµØ© Ù„Ø·Ø±ÙŠÙ‚Ø© Ø¹Ù…Ù„ÙƒØŒ Ø¨Ø¯Ù„ Ø§Ù„Ø§Ø¹ØªÙ…Ø§Ø¯ Ø¹Ù„Ù‰ Ù…Ù„ÙØ§Øª Ù…ØªÙØ±Ù‚Ø© Ø£Ùˆ Ù…ØªØ§Ø¨Ø¹Ø© ÙŠØ¯ÙˆÙŠØ© Ù…Ø±Ù‡Ù‚Ø©.',
          solution: 'Ù†Ø¨Ù†ÙŠ Ø§Ù„Ø£Ø¯Ø§Ø© Ø­ÙˆÙ„ Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„ÙØ¹Ù„ÙŠ Ù„Ù„ÙØ±ÙŠÙ‚ØŒ Ù…Ø¹ Ø­Ù‚ÙˆÙ„ ÙˆØ§Ø¶Ø­Ø© ÙˆØªØ¯ÙÙ‚ Ø¨Ø³ÙŠØ· Ù„Ù„Ø¨ÙŠØ§Ù†Ø§Øª ÙˆØ§Ù„Ù…ØªØ§Ø¨Ø¹Ø©.',
          kpis: ['CRM Ù…Ø®ØµØµ', 'Ø£Ø¯ÙˆØ§Øª Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹', 'Ù†Ù…Ø§Ø°Ø¬ Ø¥Ø¯Ø®Ø§Ù„ Ø¨ÙŠØ§Ù†Ø§Øª', 'Ù†Ø¸Ø§Ù… Ù…Ù„ÙØ§Øª ÙˆØ±ÙˆØ§Ø¨Ø· Ù…Ù†Ø¸Ù…'],
          impact: 'Ø§Ù„Ù†ØªÙŠØ¬Ø©: Ø£Ø¯ÙˆØ§Øª ØªØ®Ø¯Ù… Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„ÙŠÙˆÙ…ÙŠ Ø¨Ø¯Ù„ Ø£Ù† ØªØ¶ÙŠÙ Ø¹Ø¨Ø¦Ù‹Ø§ Ø¬Ø¯ÙŠØ¯Ù‹Ø§.',
          icon: 'build',
        },
        {
          num: 'Ù Ù¤',
          title: 'Ø§Ù„Ø£ØªÙ…ØªØ© ÙˆÙˆÙƒÙ„Ø§Ø¡ Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ',
          problem: 'Ù†Ø±Ø¨Ø· Ø§Ù„Ø®Ø·ÙˆØ§Øª Ø§Ù„Ù…ØªÙƒØ±Ø±Ø© Ø¨ØªÙ†Ø¨ÙŠÙ‡Ø§Øª ÙˆØªÙ‚Ø§Ø±ÙŠØ± Ø°ÙƒÙŠØ© Ù„ØªÙ‚Ù„ÙŠÙ„ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„ÙŠØ¯ÙˆÙŠØ© ÙˆØªØ­ÙˆÙŠÙ„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø¥Ù„Ù‰ Ø¥Ø¬Ø±Ø§Ø¡.',
          solution: 'Ù†Ø­Ø¯Ø¯ Ù†Ù‚Ø§Ø· Ø§Ù„Ø£ØªÙ…ØªØ© Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø© ÙˆÙ†Ø¶ÙŠÙ Ù…Ø±Ø§Ø¬Ø¹Ø© Ø¨Ø´Ø±ÙŠØ© Ø­ÙŠØ« ØªÙƒÙˆÙ† Ø§Ù„Ø¬ÙˆØ¯Ø© Ø£Ùˆ Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø© Ø¶Ø±ÙˆØ±ÙŠØ©.',
          kpis: ['ØªÙ†Ø¨ÙŠÙ‡Ø§Øª ØªÙ„Ù‚Ø§Ø¦ÙŠØ©', 'ØªÙ‚Ø§Ø±ÙŠØ± Ø¯ÙˆØ±ÙŠØ©', 'ÙˆÙƒÙ„Ø§Ø¡ Ù…ØªØ§Ø¨Ø¹Ø© ÙˆØªØ­Ù„ÙŠÙ„', 'Ø±Ø¨Ø· Ø¨ÙŠÙ† Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…Ø©'],
          impact: 'Ø§Ù„Ù†ØªÙŠØ¬Ø©: Ù…ØªØ§Ø¨Ø¹Ø© Ø£Ù‚Ù„ ÙŠØ¯ÙˆÙŠÙ‹Ø§ ÙˆØªØ¯ÙÙ‚ Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø£ÙƒØ«Ø± Ø§Ù†ØªØ¸Ø§Ù…Ù‹Ø§.',
          icon: 'bot',
        },
        {
          num: 'Ù Ù¥',
          title: 'Ù†Ø¸Ø§Ù… Ø§Ù„ØªØ³ÙˆÙŠÙ‚ ÙˆØ§Ù„Ù†Ù…Ùˆ',
          problem: 'Ù†Ø±Ø¨Ø· Ø§Ù„ØªØ³ÙˆÙŠÙ‚ Ø¨Ø§Ù„ØªØ´ØºÙŠÙ„ ÙˆØ§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª Ø­ØªÙ‰ ØªØªØ­ÙˆÙ„ Ø§Ù„Ø­Ù…Ù„Ø§Øª ÙˆØ§Ù„Ù…Ø­ØªÙˆÙ‰ Ø¥Ù„Ù‰ ÙØ±Øµ ÙŠÙ…ÙƒÙ† ØªØªØ¨Ø¹Ù‡Ø§ ÙˆØ¥Ø¯Ø§Ø±ØªÙ‡Ø§.',
          solution: 'Ù†ØµÙ…Ù… Ù…Ø³Ø§Ø±Ù‹Ø§ ÙˆØ§Ø¶Ø­Ù‹Ø§ Ù…Ù† Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø£Ùˆ Ø§Ù„Ø­Ù…Ù„Ø© Ø¥Ù„Ù‰ Ø§Ù„Ø¹Ù…ÙŠÙ„ Ø§Ù„Ù…Ø­ØªÙ…Ù„ ÙˆØ§Ù„Ù…ØªØ§Ø¨Ø¹Ø© ÙˆÙ‚Ø±Ø§Ø¡Ø© Ø§Ù„Ø£Ø¯Ø§Ø¡.',
          kpis: ['Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ© Ù…Ø­ØªÙˆÙ‰', 'ØµÙØ­Ø§Øª Ù‡Ø¨ÙˆØ·', 'ØªØªØ¨Ø¹ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ Ø§Ù„Ù…Ø­ØªÙ…Ù„ÙŠÙ†', 'ØªÙ‚Ø§Ø±ÙŠØ± Ø£Ø¯Ø§Ø¡ ÙˆØ§Ø¶Ø­Ø©'],
          impact: 'Ø§Ù„Ù†ØªÙŠØ¬Ø©: ØªØ³ÙˆÙŠÙ‚ Ù…Ø±ØªØ¨Ø· Ø¨Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© ÙˆØ§Ù„Ù‚Ø±Ø§Ø±ØŒ ÙˆÙ„ÙŠØ³ Ù†Ø´Ø§Ø·Ù‹Ø§ Ù…Ù†ÙØµÙ„Ù‹Ø§.',
          icon: 'trend',
        },
        {
          num: 'Ù Ù¦',
          title: 'Ø´Ø±ÙŠÙƒ Ø¥Ø¯Ø§Ø±Ø© ÙˆØªØ­Ø³ÙŠÙ† Ø§Ù„Ø£Ù†Ø¸Ù…Ø©',
          problem: 'Ø¨Ø¹Ø¯ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚ØŒ Ù†Ø³ØªÙ…Ø± ÙÙŠ Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ù†Ø¸Ø§Ù… ÙˆØªØ­Ø³ÙŠÙ†Ù‡ Ø´Ù‡Ø±ÙŠÙ‹Ø§ Ø­Ø³Ø¨ Ø§Ø­ØªÙŠØ§Ø¬ Ø§Ù„Ø´Ø±ÙƒØ© ÙˆØªØ·ÙˆØ± Ø§Ù„Ø¹Ù…Ù„.',
          solution: 'Ù†ØªØ§Ø¨Ø¹ Ø§Ù„Ø£Ø¯Ø§Ø¡ ÙˆØ§Ù„Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø© ÙˆÙ†Ø±ØªØ¨ Ø§Ù„Ø£ÙˆÙ„ÙˆÙŠØ§Øª ÙˆÙ†Ø­Ø¯Ù‘Ø« Ø§Ù„Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ù„Ù„ÙˆØ­Ø§Øª ÙˆØ§Ù„Ø£ØªÙ…ØªØ© Ø¹Ù†Ø¯ Ø§Ù„Ø­Ø§Ø¬Ø©.',
          kpis: ['Ù…Ø±Ø§Ø¬Ø¹Ø© Ø´Ù‡Ø±ÙŠØ©', 'ØªØ­Ø³ÙŠÙ†Ø§Øª Ù…Ø³ØªÙ…Ø±Ø©', 'ØªØ­Ø¯ÙŠØ«Ø§Øª Ù„Ù„ÙˆØ­Ø© ÙˆØ§Ù„Ø£ØªÙ…ØªØ©', 'Ø£ÙˆÙ„ÙˆÙŠØ§Øª Ø§Ù„Ø´Ù‡Ø± Ø§Ù„ØªØ§Ù„ÙŠ'],
          impact: 'Ø§Ù„Ù†ØªÙŠØ¬Ø©: Ù†Ø¸Ø§Ù… ÙŠØ¸Ù„ Ù…ÙÙŠØ¯Ù‹Ø§ ÙˆÙ‚Ø§Ø¨Ù„Ù‹Ø§ Ù„Ù„ØªØ·ÙˆÙŠØ± Ø¨Ø¹Ø¯ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚.',
          icon: 'refresh',
        },
      ],
      who: [
        { icon: 'target', title: 'Ø§Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„Ù†Ø§Ø´Ø¦Ø©', desc: 'Ù‡ÙŠÙƒÙ„Ø© Ù‚Ø¨Ù„ Ø§Ù„ØªÙˆØ³Ø¹' },
        { icon: 'settings', title: 'ÙØ±Ù‚ Ø§Ù„Ø®Ø¯Ù…Ø§Øª', desc: 'ØªØ³Ù„ÙŠÙ… Ù‚Ø§Ø¨Ù„ Ù„Ù„ØªÙˆØ³Ø¹' },
        { icon: 'rocket', title: 'Ø§Ù„ÙˆÙƒØ§Ù„Ø§Øª', desc: 'Ø¥Ù†ØªØ§Ø¬ ÙˆØ§Ø¶Ø­ ÙˆØ³Ø±ÙŠØ¹' },
        { icon: 'book', title: 'Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„ØªØ¹Ù„ÙŠÙ…ÙŠØ©', desc: 'ØªØ­Ø³ÙŠÙ† Ù„Ù„Ù†Ù…Ùˆ' },
      ],
    },
    process: {
      badge: 'Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø¹Ù…Ù„',
      title: 'Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø¹Ù…Ù„',
      subtitle: 'Ù†Ø¨Ø¯Ø£ Ø¨ÙÙ‡Ù… Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠ Ù‚Ø¨Ù„ Ø¨Ù†Ø§Ø¡ Ø£ÙŠ Ø£Ø¯Ø§Ø© Ø£Ùˆ Ø­Ù…Ù„Ø©.',
      steps: [
        { num: 'Ù Ù¡', title: 'ØªØ´Ø®ÙŠØµ Ø§Ù„ÙˆØ¶Ø¹ Ø§Ù„Ø­Ø§Ù„ÙŠ', desc: 'Ù†ÙÙ‡Ù… Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø¹Ù…Ù„ØŒ Ù…ØµØ§Ø¯Ø± Ø§Ù„Ø¨ÙŠØ§Ù†Ø§ØªØŒ Ù†Ù‚Ø§Ø· Ø§Ù„ØªØ¹Ø·ÙŠÙ„ØŒ ÙˆØ£Ù‡Ù… Ù…Ø§ ÙŠØ­ØªØ§Ø¬Ù‡ ØµØ§Ø­Ø¨ Ø§Ù„Ù‚Ø±Ø§Ø±.' },
        { num: 'Ù Ù¢', title: 'ØªØµÙ…ÙŠÙ… Ø§Ù„Ù†Ø¸Ø§Ù… Ø§Ù„Ù…Ù†Ø§Ø³Ø¨', desc: 'Ù†Ø±Ø³Ù… Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ØŒ Ù†Ø­Ø¯Ø¯ Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠØ§ØªØŒ ÙˆÙ†Ø®ØªØ§Ø± Ø§Ù„Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ù„Ù„ÙˆØ­Ø§Øª Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø© Ø­Ø³Ø¨ Ø§Ù„Ø£ÙˆÙ„ÙˆÙŠØ©.' },
        { num: 'Ù Ù£', title: 'Ø§Ù„Ø¨Ù†Ø§Ø¡ ÙˆØ§Ù„ØªÙ†ÙÙŠØ°', desc: 'Ù†Ø¨Ù†ÙŠ Ø§Ù„Ø·Ø¨Ù‚Ø© Ø§Ù„Ø¹Ù…Ù„ÙŠØ©: Ù„ÙˆØ­Ø© Ù…ØªØ§Ø¨Ø¹Ø©ØŒ Ø£Ø¯ÙˆØ§ØªØŒ Ø£ØªÙ…ØªØ©ØŒ Ø£Ùˆ Ù†Ø¸Ø§Ù… ØªØ³ÙˆÙŠÙ‚ Ø­Ø³Ø¨ Ø§Ù„Ù†Ø·Ø§Ù‚ Ø§Ù„Ù…ØªÙÙ‚ Ø¹Ù„ÙŠÙ‡.' },
        { num: 'Ù Ù¤', title: 'Ø§Ù„ØªØ³Ù„ÙŠÙ… ÙˆØ§Ù„ØªØ¯Ø±ÙŠØ¨', desc: 'Ù†Ø±Ø§Ø¬Ø¹ Ø§Ù„Ù†Ø¸Ø§Ù… Ù…Ø¹ Ø§Ù„ÙØ±ÙŠÙ‚ØŒ Ù†ÙˆØ¶Ø­ Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù…ØŒ ÙˆÙ†Ø³Ù„Ù‘Ù… Ø§Ù„Ù…Ù„ÙØ§Øª ÙˆØ§Ù„Ø±ÙˆØ§Ø¨Ø· ÙˆØ§Ù„ØªÙˆØ«ÙŠÙ‚.' },
        { num: 'Ù Ù¥', title: 'Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© ÙˆØ§Ù„ØªØ­Ø³ÙŠÙ†', desc: 'Ø¹Ù†Ø¯ Ø§Ù„Ø§Ø³ØªÙ…Ø±Ø§Ø± Ù…Ø¹Ù†Ø§ØŒ Ù†ØªØ§Ø¨Ø¹ Ø§Ù„Ù†Ø¸Ø§Ù… Ø´Ù‡Ø±ÙŠÙ‹Ø§ ÙˆÙ†Ø·ÙˆØ±Ù‡ Ø­Ø³Ø¨ Ø§Ù„Ù†ØªØ§Ø¦Ø¬ ÙˆØ§Ù„Ø§Ø­ØªÙŠØ§Ø¬ Ø§Ù„Ø¬Ø¯ÙŠØ¯.' },
      ],
      questions: {
        title: 'ÙƒÙ„ Ù†Ø¸Ø§Ù… ÙŠØ¬Ø¨ Ø£Ù† ÙŠØ¬ÙŠØ¨ Ø¹Ù† Ù£ Ø£Ø³Ø¦Ù„Ø©:',
        items: [
          'Ù…Ø§ Ø§Ù„Ù…Ø´ÙƒÙ„Ø© Ø§Ù„ØªÙŠ ÙŠØ­Ù„Ù‡Ø§ Ù‡Ø°Ø§ØŸ',
          'Ù…Ù† Ø³ÙŠØ³ØªØ®Ø¯Ù…Ù‡ ÙŠÙˆÙ…ÙŠØ§Ù‹ØŸ',
          'ÙƒÙŠÙ Ù†Ø¹Ø±Ù Ø£Ù† Ø§Ù„Ù†Ø¸Ø§Ù… ÙŠØ¹Ù…Ù„ØŸ',
        ],
      },
    },
    packages: {
      badge: 'Ù…Ø³Ø§Ø±Ø§Øª Ø§Ù„ØªØ¹Ø§ÙˆÙ†',
      title: 'Ù…Ø³Ø§Ø±Ø§Øª Ø§Ù„ØªØ¹Ø§ÙˆÙ†',
      subtitle: 'Ù„Ø§ Ù†Ø«Ø¨Øª Ù†Ø·Ø§Ù‚Ù‹Ø§ Ø£Ùˆ ØªÙƒÙ„ÙØ© Ù‚Ø¨Ù„ Ø§Ù„ØªØ´Ø®ÙŠØµ. Ù†Ø­Ø¯Ø¯ Ø§Ù„Ù…Ø³Ø§Ø± Ø§Ù„Ù…Ù†Ø§Ø³Ø¨ Ø¨Ø¹Ø¯ ÙÙ‡Ù… Ø·Ø¨ÙŠØ¹Ø© Ø§Ù„Ø¹Ù…Ù„.',
      sprint: {
        name: 'ØªØ´Ø®ÙŠØµ ÙˆØ¨Ø¯Ø§ÙŠØ© Ù…Ù†Ø¸Ù…Ø©',
        subtitle: 'Ù„ÙÙ‡Ù… Ø§Ù„Ù…Ø´ÙƒÙ„Ø© ÙˆØªØ­Ø¯ÙŠØ¯ Ø£ÙˆÙ„ Ø®Ø·ÙˆØ© Ø¹Ù…Ù„ÙŠØ©',
        badge: 'Ù†Ù‚Ø·Ø© Ø§Ù„Ø¨Ø¯Ø§ÙŠØ©',
        scope: 'ÙŠÙØ­Ø¯Ø¯ Ø¨Ø¹Ø¯ Ø§Ù„ØªØ´Ø®ÙŠØµ',
        features: [
          'ØªØ´Ø®ÙŠØµ Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ø­Ø§Ù„ÙŠØ©',
          'ØªØ­Ø¯ÙŠØ¯ Ù†Ù‚Ø§Ø· Ø§Ù„ØªØ¹Ø·ÙŠÙ„ ÙˆØ§Ù„Ø£ÙˆÙ„ÙˆÙŠØ©',
          'Ø®Ø±ÙŠØ·Ø© Ø£ÙˆÙ„ÙŠØ© Ù„Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„',
          'ØªÙˆØµÙŠØ© Ø¨Ø®Ø¯Ù…Ø© Ù…Ø­Ø¯Ø¯Ø© Ø£Ùˆ Ø£ÙƒØ«Ø±',
          'ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ÙˆØ§Ù„Ù…ÙˆØ§Ø¯ Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø©',
          'Ø®Ø·ÙˆØ© ØªØ§Ù„ÙŠØ© ÙˆØ§Ø¶Ø­Ø© ÙˆÙ‚Ø§Ø¨Ù„Ø© Ù„Ù„ØªÙ†ÙÙŠØ°',
        ],
        cta: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„ØªØ´Ø®ÙŠØµ',
      },
      full: {
        name: 'Ù†Ø¸Ø§Ù… ØªØ´ØºÙŠÙ„ Ø´Ø§Ù…Ù„',
        subtitle: 'Ù„Ø±Ø¨Ø· Ø§Ù„ØªØ´ØºÙŠÙ„ ÙˆØ§Ù„Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ù„Ø£ØªÙ…ØªØ© ÙˆØ§Ù„ØªØ³ÙˆÙŠÙ‚',
        badge: 'Ù…Ø³Ø§Ø± Ø´Ø§Ù…Ù„',
        scope: 'Ù†Ø·Ø§Ù‚ Ù…Ø®ØµØµ Ø­Ø³Ø¨ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹',
        features: [
          'ØªØ´Ø®ÙŠØµ Ø§Ù„ØªØ´ØºÙŠÙ„ ÙˆØ§Ù„Ø§Ø­ØªÙŠØ§Ø¬',
          'ØªØµÙ…ÙŠÙ… Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ ÙˆØ§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠØ§Øª',
          'Ø¨Ù†Ø§Ø¡ Ø§Ù„Ù„ÙˆØ­Ø§Øª ÙˆØ§Ù„Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø©',
          'Ø±Ø¨Ø· Ø§Ù„Ø£ØªÙ…ØªØ© ÙˆÙ†Ù‚Ø§Ø· Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©',
          'ØªÙˆØ«ÙŠÙ‚ Ø§Ù„Ù†Ø¸Ø§Ù… ÙˆØªØ¯Ø±ÙŠØ¨ Ø§Ù„ÙØ±ÙŠÙ‚',
          'Ø®Ø·Ø© ÙˆØ§Ø¶Ø­Ø© Ù„Ù„ØªØ³Ù„ÙŠÙ… ÙˆØ§Ù„ØªØ·ÙˆÙŠØ±',
        ],
        cta: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„ØªØ´Ø®ÙŠØµ',
      },
      managed: {
        name: 'Ø´Ø±ÙŠÙƒ Ø¥Ø¯Ø§Ø±Ø© Ø´Ù‡Ø±ÙŠØ©',
        subtitle: 'Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ù†Ø¸Ø§Ù… ÙˆØªØ­Ø³ÙŠÙ†Ù‡ Ø¨Ø¹Ø¯ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚',
        badge: 'Ù…ØªØ§Ø¨Ø¹Ø© Ø´Ù‡Ø±ÙŠØ©',
        scope: 'Ù†Ø·Ø§Ù‚ Ø´Ù‡Ø±ÙŠ Ù…Ø®ØµØµ',
        description: 'Ù…Ù†Ø§Ø³Ø¨ Ø¥Ø°Ø§ ÙƒÙ†Øª ØªØ±ÙŠØ¯ Ø§Ø³ØªÙ…Ø±Ø§Ø± AURA ÙÙŠ Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ù†Ø¸Ø§Ù… ÙˆØªØ­Ø³ÙŠÙ†Ù‡ Ø´Ù‡Ø±ÙŠÙ‹Ø§ Ø­Ø³Ø¨ ØªØ·ÙˆØ± Ø§Ù„Ø¹Ù…Ù„ ÙˆØ§Ù„Ø§Ø­ØªÙŠØ§Ø¬Ø§Øª Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø©.',
        features: ['Ù…Ø±Ø§Ø¬Ø¹Ø© Ø´Ù‡Ø±ÙŠØ© Ù„Ù„Ù†Ø¸Ø§Ù…', 'ØªØ­Ø³ÙŠÙ† Ø§Ù„Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ù„Ù„ÙˆØ­Ø§Øª', 'ØªØ­Ø¯ÙŠØ« Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„', 'ØªØ·ÙˆÙŠØ± Ø§Ù„Ø£ØªÙ…ØªØ©', 'ØªØ±ØªÙŠØ¨ Ø§Ù„Ø£ÙˆÙ„ÙˆÙŠØ§Øª', 'Ø·Ù„Ø¨Ø§Øª ÙˆØªØ­Ø³ÙŠÙ†Ø§Øª Ø¬Ø¯ÙŠØ¯Ø©'],
        cta: 'Ù†Ø§Ù‚Ø´ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ø´Ù‡Ø±ÙŠØ©',
      },
      guide: {
        title: 'Ø¯Ù„ÙŠÙ„ Ø§Ø®ØªÙŠØ§Ø± Ù†Ù‚Ø·Ø© Ø§Ù„Ø¨Ø¯Ø§ÙŠØ©',
        items: [
          { if: 'Ø¥Ø°Ø§ Ù‚Ù„Øª: "Ù†Ø­Ù† ØºÙŠØ± Ù…ØªØ£ÙƒØ¯ÙŠÙ† Ù…Ø§ ÙŠØ­ØªØ§Ø¬ Ø¥ØµÙ„Ø§Ø­Ù‡ Ø£ÙˆÙ„Ø§Ù‹"', then: 'â† Ø¬Ù„Ø³Ø© ØªØ´Ø®ÙŠØµ Ù…Ø³Ø§Ø± Ø§Ù„Ø¹Ù…Ù„' },
          { if: 'Ø¥Ø°Ø§ Ù‚Ù„Øª: "Ø§Ù„ÙØ±ÙŠÙ‚ Ù…Ø´ØºÙˆÙ„ Ù„ÙƒÙ† Ø§Ù„Ø¹Ù…Ù„ Ù…ØªÙØ±Ù‚"', then: 'â† Ø³Ø¨Ø±Ù†Øª ØªØµÙ…ÙŠÙ… Ù…Ø³Ø§Ø± Ø§Ù„Ø¹Ù…Ù„' },
          { if: 'Ø¥Ø°Ø§ Ù‚Ù„Øª: "Ù†Ø­ØªØ§Ø¬ Ø£Ù†Ø¸Ù…Ø© Ù…ØªØ§Ø¨Ø¹Ø© ÙˆÙ‚ÙˆØ§Ù„Ø¨"', then: 'â† Ø¨Ù†Ø§Ø¡ Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØ©' },
          { if: 'Ø¥Ø°Ø§ Ù‚Ù„Øª: "Ø§Ù„Ù…Ù‡Ø§Ù… Ø§Ù„Ù…ØªÙƒØ±Ø±Ø© ØªØ³ØªÙ‡Ù„Ùƒ Ø§Ù„ÙØ±ÙŠÙ‚"', then: 'â† Ø³Ø¨Ø±Ù†Øª Ø£ØªÙ…ØªØ© AI' },
          { if: 'Ø¥Ø°Ø§ Ù‚Ù„Øª: "Ø§Ù„Ù…Ø­ØªÙˆÙ‰ Ø£Ùˆ Ø§Ù„ØªØ³ÙˆÙŠÙ‚ ØºÙŠØ± ÙˆØ§Ø¶Ø­"', then: 'â† Ø³Ø¨Ø±Ù†Øª Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ© Ø§Ù„Ù…Ø­ØªÙˆÙ‰ ÙˆØ§Ù„ØªØ³ÙˆÙŠÙ‚' },
          { if: 'Ø¥Ø°Ø§ Ù‚Ù„Øª: "Ø§Ù„ÙÙƒØ±Ø© Ù„Ø§ ØªØ²Ø§Ù„ ØºÙŠØ± ÙˆØ§Ø¶Ø­Ø© Ø£Ùˆ Ù„Ø§ Ù†Ù…ÙˆØ°Ø¬ ØªØ³Ù„ÙŠÙ…"', then: 'â† Ø³Ø¨Ø±Ù†Øª Ù‡ÙŠÙƒÙ„Ø© Ø§Ù„Ù…Ø´Ø±ÙˆØ¹' },
          { if: 'Ø¥Ø°Ø§ Ù‚Ù„Øª: "Ù†Ø­ØªØ§Ø¬ ØªØ­ÙˆÙŠÙ„Ø§Ù‹ ÙƒØ§Ù…Ù„Ø§Ù‹ Ù„Ù„Ø´Ø±ÙƒØ©"', then: 'â† Ù†Ø¸Ø§Ù… ØªØ³Ø±ÙŠØ¹ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ Ø§Ù„ÙƒØ§Ù…Ù„ âœ“' },
        ],
      },
      scopeNote: 'ÙŠØªÙ… ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù†Ø·Ø§Ù‚ ÙˆØ§Ù„Ø®Ø·Ø© Ø¨Ø¹Ø¯ Ø¬Ù„Ø³Ø© ØªØ´Ø®ÙŠØµ ÙˆÙÙ‡Ù… Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„ÙØ¹Ù„ÙŠØŒ Ø­Ø¬Ù… Ø§Ù„Ø¨ÙŠØ§Ù†Ø§ØªØŒ Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ø­Ø§Ù„ÙŠØ©ØŒ ÙˆØ¹Ù…Ù‚ Ø§Ù„ØªÙ†ÙÙŠØ° Ø§Ù„Ù…Ø·Ù„ÙˆØ¨.',
    },
    differentiators: {
      badge: 'Ù„Ù…Ø§Ø°Ø§ AURA',
      title: 'Ù„Ù…Ø§Ø°Ø§ AURAØŸ',
      items: [
        { icon: 'target', title: 'Ù†Ø¨Ø¯Ø£ Ù…Ù† Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ù„Ø§ Ù…Ù† Ø§Ù„Ø£Ø¯Ø§Ø©', desc: 'Ø§Ù„Ø£Ø¯Ø§Ø© ÙˆØ­Ø¯Ù‡Ø§ Ù„Ø§ ØªØ­Ù„ Ø§Ù„Ù…Ø´ÙƒÙ„Ø© Ø¥Ø°Ø§ ÙƒØ§Ù† Ù…Ø³Ø§Ø± Ø§Ù„Ø¹Ù…Ù„ ØºÙŠØ± ÙˆØ§Ø¶Ø­. Ù„Ø°Ù„Ùƒ Ù†ÙÙ‡Ù… Ø§Ù„ØªØ´ØºÙŠÙ„ Ø£ÙˆÙ„Ù‹Ø§.', quote: 'Ù†Ø®ØªØ§Ø± Ø§Ù„ØªÙ‚Ù†ÙŠØ© Ø¨Ø¹Ø¯ ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù…Ø´ÙƒÙ„Ø© ÙˆØ§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„ÙŠÙˆÙ…ÙŠ.' },
        { icon: 'layers', title: 'Ù†Ø±Ø¨Ø· Ø§Ù„Ø¥Ø¯Ø§Ø±Ø© Ø¨Ø§Ù„ØªÙ†ÙÙŠØ°', desc: 'Ù†Ø³Ø§Ø¹Ø¯ ØµØ§Ø­Ø¨ Ø§Ù„Ù‚Ø±Ø§Ø± Ø¹Ù„Ù‰ Ø±Ø¤ÙŠØ© Ù…Ø§ ÙŠØ­Ø¯Ø« ÙˆÙ…Ø§ ÙŠØ­ØªØ§Ø¬ ØªØ¯Ø®Ù„Ù‡ ÙˆÙ…Ø§ ÙŠÙ…ÙƒÙ† ØªØ­Ø³ÙŠÙ†Ù‡.', quote: 'Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ø¬ÙŠØ¯Ø© ØªØ¨Ø¯Ø£ Ù…Ù† Ù…Ø¹Ù„ÙˆÙ…Ø§Øª ÙˆØ§Ø¶Ø­Ø© ÙˆÙÙŠ ÙˆÙ‚Øª Ù…Ù†Ø§Ø³Ø¨.' },
        { icon: 'refresh', title: 'Ù†Ø¨Ù†ÙŠ Ø£Ù†Ø¸Ù…Ø© Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„ØªØ·ÙˆÙŠØ±', desc: 'Ù†ØµÙ…Ù… Ø§Ù„Ø­Ù„ Ø¨Ø·Ø±ÙŠÙ‚Ø© ÙŠÙ…ÙƒÙ† ØªØ·ÙˆÙŠØ±Ù‡Ø§ Ù„Ø§Ø­Ù‚Ù‹Ø§ Ø¨Ø¯Ù„ Ø¨Ù†Ø§Ø¡ Ø´ÙŠØ¡ Ù…Ø¤Ù‚Øª ÙŠØµØ¹Ø¨ ØªØ¹Ø¯ÙŠÙ„Ù‡.', quote: 'Ø§Ù„Ù†Ø¸Ø§Ù… Ø§Ù„Ø¬ÙŠØ¯ ÙŠØªØ·ÙˆØ± Ù…Ø¹ Ø§Ù„Ø¹Ù…Ù„ Ø¯ÙˆÙ† Ø£Ù† ÙŠÙÙ‚Ø¯ ÙˆØ¶ÙˆØ­Ù‡.' },
        { icon: 'trend', title: 'Ø§Ù„ØªØ³ÙˆÙŠÙ‚ Ø¬Ø²Ø¡ Ù…Ù† Ø§Ù„Ù†Ø¸Ø§Ù…', desc: 'Ù†ØªØ¹Ø§Ù…Ù„ Ù…Ø¹ Ø§Ù„ØªØ³ÙˆÙŠÙ‚ ÙƒÙ…Ø³Ø§Ø± Ù…Ø±ØªØ¨Ø· Ø¨Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ ÙˆØ§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª ÙˆØ§Ù„Ù…ØªØ§Ø¨Ø¹Ø©ØŒ Ù„Ø§ ÙƒÙ…Ù†Ø´ÙˆØ±Ø§Øª Ù…Ù†ÙØµÙ„Ø©.', quote: 'ÙƒÙ„ Ù†Ø´Ø§Ø· ØªØ³ÙˆÙŠÙ‚ÙŠ ÙŠØ¬Ø¨ Ø£Ù† ÙŠØ±ØªØ¨Ø· Ø¨ÙØ±ØµØ© ÙŠÙ…ÙƒÙ† Ù…ØªØ§Ø¨Ø¹ØªÙ‡Ø§.' },
      ],
    },
    examples: {
      badge: 'Ø£Ù…Ø«Ù„Ø©',
      title: 'ÙƒÙŠÙ ÙŠØ¨Ø¯Ùˆ Ø§Ù„Ù†Ø¸Ø§Ù… ÙÙŠ Ø´Ø±ÙƒØªÙƒØŸ',
      items: [
        {
          icon: 'palette',
          title: 'ÙˆÙƒØ§Ù„Ø© ØªØ³ÙˆÙŠÙ‚',
          challenge: 'Ù…Ù„ÙØ§ØªØŒ Ø¨Ø±ÙŠÙØ§ØªØŒ Ø£ÙÙƒØ§Ø±ØŒ Ø£ÙˆØ§Ù…Ø±ØŒ ØªØ¹Ù„ÙŠÙ‚Ø§ØªØŒ ØªØ¹Ø¯ÙŠÙ„Ø§ØªØŒ Ù…ÙˆØ§ÙÙ‚Ø§ØªØŒ ÙÙˆØ§ØªÙŠØ±',
          result: ['Ø®Ø· Ø¥Ù†ØªØ§Ø¬ Ø¨ØµØ±ÙŠ ÙƒØ§Ù…Ù„', 'ÙƒÙ„ Ù…Ø´Ø±ÙˆØ¹ ÙŠØªØªØ¨Ø¹ Ù…Ù† Ø§Ù„Ø¨Ø±ÙŠÙ Ù„Ù„ØªØ³Ù„ÙŠÙ…', 'Ù…Ø±Ø§Ø­Ù„ ÙˆØ§Ø¶Ø­Ø© Ù„Ù„Ù…ÙˆØ§ÙÙ‚Ø© ÙˆØ§Ù„ØªØ¹Ø¯ÙŠÙ„', 'Ù„Ø§ Ø·Ù„Ø¨Ø§Øª Ø£Ùˆ ØªØ¹Ø¯ÙŠÙ„Ø§Øª Ø¶Ø§Ø¦Ø¹Ø©'],
        },
        {
          icon: 'bot',
          title: 'Ø§Ø³ØªØ¯ÙŠÙˆ Ù…Ø¹ AI',
          challenge: 'Ø£ÙÙƒØ§Ø±ØŒ Ø·Ù„Ø¨Ø§ØªØŒ Ø£Ø­Ø¯Ø§Ø«ØŒ Ø¬Ø¯ÙˆÙ„Ø©ØŒ Ù†Ø´Ø± â€” ÙƒÙ„ Ø´ÙŠØ¡ ÙŠØ±Ø¨Ø· ÙŠØ¯ÙˆÙŠØ§Ù‹',
          result: ['Ù…Ø³Ø§Ø± Ù…Ø­ØªÙˆÙ‰ Ù…ÙØ¯Ø§Ø±', 'ØªØ·ÙˆÙŠØ± Ø£ÙÙƒØ§Ø± Ø¨Ù…Ø³Ø§Ø¹Ø¯Ø© AI', 'Ù…Ø±Ø§Ø­Ù„ ÙˆØ§Ø¶Ø­Ø© Ù„Ù„Ø¥Ù†ØªØ§Ø¬ ÙˆØ§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©', 'ØªÙ‚ÙŠÙŠÙ… Ù†Ø´Ø± Ù…ØªØ³Ù‚'],
        },
        {
          icon: 'health',
          title: 'Ø£ÙƒØ§Ø¯ÙŠÙ…ÙŠ / Ø·Ø¨ÙŠ',
          challenge: 'Ù…ÙˆØ§Ø¹ÙŠØ¯ØŒ Ù…Ø­Ø§Ø¶Ø±Ø§ØªØŒ Ø·Ù„Ø§Ø¨ØŒ Ø¬Ø¯Ø§ÙˆÙ„ØŒ Ù…ÙˆØ§Ø¯ØŒ Ù…ØµØ§Ø±ÙŠÙ',
          result: ['Ù…Ø±ÙƒØ² Ø¹Ù…Ù„ÙŠØ§Øª Ø¥Ø¯Ø§Ø±ÙŠØ© ÙƒØ§Ù…Ù„', 'Ø£ØªÙ…ØªØ© Ø§Ù„ØªØ³Ø¬ÙŠÙ„ ÙˆØ§Ù„Ø¬Ø¯ÙˆÙ„Ø© ÙˆØ§Ù„ØªØ°ÙƒÙŠØ±', 'ØªØªØ¨Ø¹ Ø§Ù„Ø­Ø¶ÙˆØ± ÙˆØªÙ‚Ø¯Ù… Ø§Ù„Ø·Ù„Ø§Ø¨', 'ØªÙ†Ø³ÙŠÙ‚ ÙŠØ¯ÙˆÙŠ Ø£Ù‚Ù„ Ù„Ù„ÙØ±ÙŠÙ‚'],
        },
        {
          icon: 'inbox',
          title: 'Ø¹Ù…Ù„ÙŠØ§Øª ÙˆØ§Ø³ØªÙ‚Ø¨Ø§Ù„',
          challenge: 'Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø¬Ø¯ÙŠØ¯Ø©ØŒ Ù…ØªØ§Ø¨Ø¹Ø© Ù…ØªÙØ±Ù‚Ø©ØŒ ØªØªØ¨Ø¹ ØºÙŠØ± Ù…Ù†Ø¸Ù… â€” Ø¥ÙŠØ±Ø§Ø¯Ø§Øª Ø¶Ø§Ø¦Ø¹Ø©',
          result: ['Ù…Ø³Ø§Ø± Ø§Ø³ØªÙ‚Ø¨Ø§Ù„ Ù‚Ø§Ø¨Ù„ Ù„Ù„ØªÙˆØ³Ø¹', 'Ù…ØªØ§Ø¨Ø¹Ø© Ù…Ø¤ØªÙ…ØªØ© Ù…Ø¹ ØªÙƒØ§Ù…Ù„ CRM', 'Ù…Ø³Ø¤ÙˆÙ„ÙŠØ© ÙˆØ§Ø¶Ø­Ø© ÙÙŠ ÙƒÙ„ Ù…Ø±Ø­Ù„Ø©', 'Ù„Ø§ Ø¹Ù…ÙŠÙ„ Ù…Ø­ØªÙ…Ù„ ÙŠØ³Ù‚Ø· Ù…Ù† Ø§Ù„Ø´Ø¨ÙƒØ©'],
        },
      ],
    },
    tools: {
      badge: 'ØªÙ‚Ù†ÙŠØ§Øª Ù…Ø±Ù†Ø©',
      title: 'Ø§Ù„ØªÙ‚Ù†ÙŠØ§Øª ØªØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ù†Ø¸Ø§Ù…',
      subtitle: 'Ù„Ø§ Ù†ÙØ±Ø¶ Ø£Ø¯Ø§Ø©. Ù†Ø®ØªØ§Ø± Ø§Ù„ØªÙ‚Ù†ÙŠØ© Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø© Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ ÙˆØ§Ù„ÙØ±ÙŠÙ‚ ÙˆØ§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ© ÙˆØ§Ø­ØªÙŠØ§Ø¬Ø§Øª Ø§Ù„ØªÙˆØ³Ø¹. Ù‡Ø°Ù‡ Ø£Ù…Ø«Ù„Ø© ÙˆÙ„ÙŠØ³Øª Ù‚Ø§Ø¦Ù…Ø© Ø«Ø§Ø¨ØªØ©.',
      categories: [
        {
          name: 'Ø§Ù„Ø£ØªÙ…ØªØ©',
          tools: [
            { name: 'n8n', desc: 'Ø£ØªÙ…ØªØ© Ù…ÙØªÙˆØ­Ø© Ø§Ù„Ù…ØµØ¯Ø± â€” ØªØ­ÙƒÙ… ÙƒØ§Ù…Ù„' },
            { name: 'Make', desc: 'Ø£ØªÙ…ØªØ© Ø³ÙŠØ± Ø¹Ù…Ù„ Ù…Ø¹Ù‚Ø¯' },
            { name: 'Webhooks', desc: 'Ø£Ø­Ø¯Ø§Ø« Ù…ÙˆØ«ÙˆÙ‚Ø© Ø¨ÙŠÙ† Ø§Ù„Ø£Ù†Ø¸Ù…Ø©' },
          ],
        },
        {
          name: 'ÙˆÙƒÙ„Ø§Ø¡ AI',
          tools: [
            { name: 'CrewAI', desc: 'ØªÙ†Ø³ÙŠÙ‚ Ù…ØªØ¹Ø¯Ø¯ Ø§Ù„ÙˆÙƒÙ„Ø§Ø¡' },
            { name: 'LangChain', desc: 'ØªÙƒØ§Ù…Ù„ AI Ù…ØªÙ‚Ø¯Ù…' },
            { name: 'Ø£Ù†Ø¸Ù…Ø© Ø£ÙˆØ§Ù…Ø± Ù…Ø®ØµØµØ©', desc: 'Ù…ØµÙ…Ù…Ø© Ø­ÙˆÙ„ Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„ÙØ¹Ù„ÙŠ' },
          ],
        },
        { name: 'Ù„ÙˆØ­Ø§Øª Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª', tools: [{ name: 'Metabase', desc: 'ØªÙ‚Ø§Ø±ÙŠØ± ØªØ´ØºÙŠÙ„ÙŠØ©' }, { name: 'Ù„ÙˆØ­Ø§Øª Ù…Ø®ØµØµØ©', desc: 'ÙˆØ§Ø¬Ù‡Ø§Øª Ø¯Ø§Ø®Ù„ÙŠØ© Ù…Ø±ÙƒØ²Ø©' }, { name: 'ØªÙ‚Ø§Ø±ÙŠØ± Ø¯Ø§Ø®Ù„ÙŠØ©', desc: 'Ù…Ù„Ø®ØµØ§Øª Ø¬Ø§Ù‡Ø²Ø© Ù„Ù„Ù‚Ø±Ø§Ø±' }] },
        { name: 'Ø§Ù„ØªÙƒØ§Ù…Ù„Ø§Øª', tools: [{ name: 'APIs', desc: 'Ø±Ø¨Ø· Ø§Ù„Ø£Ù†Ø¸Ù…Ø© Ø§Ù„Ø­Ø§Ù„ÙŠØ©' }, { name: 'Ø§Ù„Ù†Ù…Ø§Ø°Ø¬', desc: 'Ø¥Ø¯Ø®Ø§Ù„ Ø¨ÙŠØ§Ù†Ø§Øª Ù…Ù†Ø¸Ù…' }, { name: 'Ø§Ù„Ø¯ÙØ¹ ÙˆCRM ÙˆØ§Ù„Ø¹Ù…Ù„ÙŠØ§Øª', desc: 'Ø±Ø¨Ø· Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…Ø© Ø¨Ø§Ù„ÙØ¹Ù„' }] },
        {
          name: 'Ù‚ÙˆØ§Ø¹Ø¯ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ùˆ CRM',
          tools: [
            { name: 'Notion', desc: 'Ù‚ÙˆØ§Ø¹Ø¯ Ø¨ÙŠØ§Ù†Ø§ØªØŒ ØªØªØ¨Ø¹ØŒ ØªÙˆØ«ÙŠÙ‚' },
            { name: 'Airtable', desc: 'Ø¥Ø¯Ø§Ø±Ø© Ù…Ø´Ø§Ø±ÙŠØ¹' },
            { name: 'CRM Ù…Ø®ØµØµ', desc: 'Ù…Ø¨Ù†ÙŠ Ø­ÙˆÙ„ Ø³ÙŠØ± Ø¹Ù…Ù„Ùƒ' },
          ],
        },
      ],
    },
    contact: {
      badge: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„Ø¢Ù†',
      title: 'Ø§Ø¨Ø¯Ø£ Ø¨Ø®Ø·ÙˆØ© ÙˆØ§Ø¶Ø­Ø©',
      subtitle: 'Ø£Ø±Ø³Ù„ Ù„Ù†Ø§ Ù†Ø¨Ø°Ø© Ø¹Ù† Ù†Ø´Ø§Ø·ÙƒØŒ ÙˆØ³Ù†Ø³Ø§Ø¹Ø¯Ùƒ Ø¹Ù„Ù‰ ØªØ­Ø¯ÙŠØ¯ Ø£ÙˆÙ„ Ø®Ø·ÙˆØ© Ù…Ù†Ø§Ø³Ø¨Ø© Ù„Ø¨Ù†Ø§Ø¡ Ù†Ø¸Ø§Ù… Ø£ÙˆØ¶Ø­.',
      email: 'amirelshazly66@gmail.com',
      phone: '+20 102 924 0066',
      location: 'Ù…ØµØ± / Ø¹Ù† Ø¨ÙØ¹Ø¯',
      details: {
        email: 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ',
        whatsapp: 'ÙˆØ§ØªØ³Ø§Ø¨',
        location: 'Ø§Ù„Ù…ÙˆÙ‚Ø¹',
      },
      actions: [
        {
          label: 'A',
          icon: 'target',
          title: 'Ø§Ø¨Ø¯Ø£ Ø¨ØªØ´Ø®ÙŠØµ Ù…Ø¨Ø¯Ø¦ÙŠ',
          text: 'Ø£Ø®Ø¨Ø±Ù†Ø§ Ø¹Ù† Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ø­Ø§Ù„ÙŠØ© ÙˆØ§Ù„Ù…Ø´ÙƒÙ„Ø© Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ© Ø§Ù„ØªÙŠ ØªØ±ÙŠØ¯ Ø­Ù„Ù‡Ø§.',
          cta: 'Ø§Ø¨Ø¯Ø£ Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨',
          type: 'diagnosis',
        },
        {
          label: 'B',
          icon: 'book',
          title: 'Ø£Ø±Ø³Ù„ Ù†Ø¨Ø°Ø© Ø¹Ù† Ù†Ø´Ø§Ø·Ùƒ',
          text: 'Ø´Ø§Ø±ÙƒÙ†Ø§ Ù…ÙˆÙ‚Ø¹ÙƒØŒ Ø·Ø¨ÙŠØ¹Ø© Ø§Ù„Ø®Ø¯Ù…Ø©ØŒ ÙˆØ£Ù‡Ù… Ø§Ù„ØªØ­Ø¯ÙŠØ§Øª Ø§Ù„Ø­Ø§Ù„ÙŠØ©.',
          cta: 'Ø£Ø±Ø³Ù„ Ø¨Ø±ÙŠØ¯Ù‹Ø§',
          type: 'brief',
        },
        {
          label: 'C',
          icon: 'refresh',
          title: 'Ù†Ø§Ù‚Ø´ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ø´Ù‡Ø±ÙŠØ©',
          text: 'Ø¥Ø°Ø§ ÙƒØ§Ù† Ù„Ø¯ÙŠÙƒ Ù†Ø¸Ø§Ù… Ù‚Ø§Ø¦Ù… ÙˆØªØ­ØªØ§Ø¬ Ø¬Ù‡Ø© ØªØªØ§Ø¨Ø¹Ù‡ ÙˆØªØ­Ø³Ù†Ù‡ Ø´Ù‡Ø±ÙŠÙ‹Ø§.',
          cta: 'Ù†Ø§Ù‚Ø´ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø©',
          type: 'monthly',
        },
      ],
    },
    footer: {
      tagline: 'Ø§Ø³ØªÙˆØ¯ÙŠÙˆ ØªØ³Ø±ÙŠØ¹ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„',
      rights: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ù‚ÙˆÙ‚ Ù…Ø­ÙÙˆØ¸Ø©.',
      built: 'Ø¨ÙÙ†ÙŠ Ø¨Ø¯Ù‚Ø©.',
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
      badge: 'AURA Â· Enterprise Business Acceleration Studio',
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
          solution: 'We build dashboards, forms, trackers, and lightweight databases around the teamâ€™s real usage patterns.',
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
        { icon: 'target', title: 'We start with the problem, not the technology', desc: 'AI and dashboards are only useful when each layer solves a real operational problem.', quote: 'The question is not â€œcan we automate it?â€ but â€œshould this improve the work?â€' },
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
      home: 'Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©',
      services: 'Ø§Ù„Ø·Ø¨Ù‚Ø§Øª',
      process: 'Ø§Ù„Ù…Ù†Ù‡Ø¬ÙŠØ©',
      packages: 'Ù†Ù…Ø§Ø°Ø¬ Ø§Ù„ØªØ¹Ø§ÙˆÙ†',
      why: 'Ù„Ù…Ø§Ø°Ø§ AURA',
      contact: 'ØªÙˆØ§ØµÙ„',
      cta: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„Ø¢Ù†',
    },
    loader: {
      tagline: 'Ø§Ø³ØªÙˆØ¯ÙŠÙˆ ØªØ³Ø±ÙŠØ¹ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ Ù„Ù„Ù…Ø¤Ø³Ø³Ø§Øª',
      line1: 'Ù†Ø­ÙˆÙ‘Ù„ Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ù…ØªÙØ±Ù‚ Ø¥Ù„Ù‰ Ù…Ù†Ø¸ÙˆÙ…Ø§Øª Ø°ÙƒÙŠØ©.',
      line2: 'Ù…ØµÙ…Ù… Ù„Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„Ù…Ø¹Ù‚Ø¯Ø© ÙˆØ±Ø¤ÙŠØ© Ø§Ù„Ù‚ÙŠØ§Ø¯Ø©.',
    },
    hero: {
      badge: 'AURA Â· Ø§Ø³ØªÙˆØ¯ÙŠÙˆ ØªØ³Ø±ÙŠØ¹ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ Ù„Ù„Ù…Ø¤Ø³Ø³Ø§Øª',
      title1: 'Ø­ÙˆÙ‘Ù„ Ø´Ø±ÙƒØªÙƒ',
      title2: 'Ø¥Ù„Ù‰ Ù…Ù†Ø¸ÙˆÙ…Ø©',
      title3: 'Ø°ÙƒÙŠØ© Ù‚Ø§Ø¨Ù„Ø©',
      title4: 'Ù„Ù„Ù†Ù…Ùˆ.',
      subheadline: 'Ù†Ø³Ø§Ø¹Ø¯ Ø§Ù„Ø´Ø±ÙƒØ§Øª ÙˆØ§Ù„Ù…Ø¬Ù…ÙˆØ¹Ø§Øª Ø¹Ù„Ù‰ ØªØ´Ø®ÙŠØµ Ø§Ù„ØªØ´ØºÙŠÙ„ØŒ ØªØµÙ…ÙŠÙ… Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ØŒ Ø¨Ù†Ø§Ø¡ Ø§Ù„Ø£Ø¯ÙˆØ§ØªØŒ ÙˆØ±Ø¨Ø· Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ø¯Ø§Ø®Ù„ Ù†Ø¸Ø§Ù… ÙˆØ§Ø­Ø¯ Ù‚Ø§Ø¨Ù„ Ù„Ù„Ù…ØªØ§Ø¨Ø¹Ø© ÙˆØ§Ù„ØªØ·ÙˆÙŠØ±.',
      description: 'Ø¹Ù†Ø¯Ù…Ø§ ØªÙƒØ¨Ø± Ø§Ù„Ø´Ø±ÙƒØ© Ø£Ø³Ø±Ø¹ Ù…Ù† Ø£Ù†Ø¸Ù…ØªÙ‡Ø§ØŒ ÙŠØ¨Ø¯Ø£ Ø§Ù„ÙˆÙ‚Øª ÙÙŠ Ø§Ù„Ø¶ÙŠØ§Ø¹ Ø¨ÙŠÙ† Ø§Ù„Ø±Ø³Ø§Ø¦Ù„ ÙˆØ§Ù„Ø¬Ø¯Ø§ÙˆÙ„ ÙˆØ§Ù„Ù‚Ø±Ø§Ø±Ø§Øª ØºÙŠØ± Ø§Ù„Ù…Ø±Ø¦ÙŠØ©. AURA ØªØ¨Ù†ÙŠ Ø·Ø¨Ù‚Ø© ØªØ´ØºÙŠÙ„ Ø°ÙƒÙŠØ© ØªØ¬Ø¹Ù„ Ø§Ù„Ø¹Ù…Ù„ Ø£ÙˆØ¶Ø­ØŒ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø£Ø³Ø±Ø¹ØŒ ÙˆØ§Ù„Ù‚Ø±Ø§Ø±Ø§Øª Ù…Ø¨Ù†ÙŠØ© Ø¹Ù„Ù‰ Ø¨ÙŠØ§Ù†Ø§Øª.',
      cta1: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„ØªØ´Ø®ÙŠØµ',
      cta2: 'Ø§Ø³ØªØ¹Ø±Ø¶ Ø·Ø¨Ù‚Ø§Øª Ø§Ù„Ø®Ø¯Ù…Ø©',
      trust: 'Ù…ØµÙ…Ù… Ù„Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„ÙƒØ¨ÙŠØ±Ø©ØŒ Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹Ø§ØªØŒ ÙˆÙØ±Ù‚ Ø§Ù„Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„ØªÙŠ ØªØ­ØªØ§Ø¬ Ø±Ø¤ÙŠØ© ØªØ´ØºÙŠÙ„ÙŠØ© Ø­Ù‚ÙŠÙ‚ÙŠØ©.',
    },
    why: {
      badge: 'Ù…Ø´ÙƒÙ„Ø© Ø§Ù„ØªØ´ØºÙŠÙ„',
      title: 'Ø­ÙŠÙ† ØªÙƒØ¨Ø± Ø§Ù„Ø´Ø±ÙƒØ© Ø£Ø³Ø±Ø¹ Ù…Ù† Ø£Ù†Ø¸Ù…ØªÙ‡Ø§',
      subtitle: 'ÙƒÙ„Ù…Ø§ Ø²Ø§Ø¯ Ø¹Ø¯Ø¯ Ø§Ù„ÙØ±Ù‚ ÙˆØ§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ ÙˆØ§Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„ØªØ§Ø¨Ø¹Ø©ØŒ Ø£ØµØ¨Ø­Øª Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„ÙŠØ¯ÙˆÙŠØ© Ø£ÙƒØ«Ø± ØªÙƒÙ„ÙØ© ÙˆØ®Ø·ÙˆØ±Ø©.',
      problems: [
        { icon: 'scatter', title: 'ØªØ´ØºÙŠÙ„ Ù…ØªÙØ±Ù‚', desc: 'Ø§Ù„Ø±Ø³Ø§Ø¦Ù„ ÙˆØ§Ù„Ø¬Ø¯Ø§ÙˆÙ„ ÙˆØ§Ù„Ù…Ù‡Ø§Ù… ÙˆØ§Ù„Ù‚Ø±Ø§Ø±Ø§Øª Ù…ÙˆØ²Ø¹Ø© Ø¨ÙŠÙ† Ø£Ù…Ø§ÙƒÙ† Ù…ØªØ¹Ø¯Ø¯Ø© Ø¨Ù„Ø§ Ø·Ø¨Ù‚Ø© ØªØ´ØºÙŠÙ„ Ù…ÙˆØ­Ø¯Ø©.' },
        { icon: 'delay', title: 'Ø±Ø¤ÙŠØ© Ù…ØªØ£Ø®Ø±Ø©', desc: 'ØªÙƒØªØ´Ù Ø§Ù„Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…Ø®Ø§Ø·Ø± Ù…ØªØ£Ø®Ø±Ù‹Ø§ Ù„Ø£Ù† Ø§Ù„Ø­Ø§Ù„Ø© ÙˆØ§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠØ§Øª ÙˆÙ†Ù‚Ø§Ø· Ø§Ù„ØªØ¹Ø·ÙŠÙ„ Ù„Ø§ ØªØ¸Ù‡Ø± Ù…Ø¨ÙƒØ±Ù‹Ø§.' },
        { icon: 'waste', title: 'Ø£Ø¯ÙˆØ§Øª ØºÙŠØ± Ù…ØªØ±Ø§Ø¨Ø·Ø©', desc: 'Ø§Ù„Ø¯Ø§Ø´Ø¨ÙˆØ±Ø¯ Ø£Ùˆ Ø§Ù„Ø£ØªÙ…ØªØ© Ø£Ùˆ Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ù„Ø§ ØªØµÙ†Ø¹ Ù‚ÙŠÙ…Ø© Ø¥Ø°Ø§ ÙƒØ§Ù†Øª Ù…Ù†ÙØµÙ„Ø© Ø¹Ù† Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠ.' },
        { icon: 'loss', title: 'Ù‚Ø±Ø§Ø±Ø§Øª ØºÙŠØ± ÙˆØ§Ø¶Ø­Ø©', desc: 'ØªØªØ­Ø±Ùƒ Ø§Ù„ÙØ±Ù‚ Ø¨Ø³ÙŠØ§Ù‚ Ù†Ø§Ù‚Øµ ÙˆØ¬Ù‡Ø¯ Ù…ÙƒØ±Ø± ÙˆØ¶Ø¹Ù ÙÙŠ Ø§Ù„Ø±Ø¨Ø· Ø¨ÙŠÙ† Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ÙˆØ§Ù„ØªÙ†ÙÙŠØ°.' },
      ],
      solution: {
        title: 'ÙƒÙŠÙ ØªØ¨Ù†ÙŠ AURA Ø§Ù„Ù‚ÙŠÙ…Ø©ØŸ',
        desc: 'AURA Ù„Ø§ ØªØ¨ÙŠØ¹ Ø£Ø¯ÙˆØ§Øª Ù…Ù†ÙØµÙ„Ø©. Ù†Ø¨Ø¯Ø£ Ø¨ØªØ´Ø®ÙŠØµ Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø¹Ù…Ù„ØŒ Ø«Ù… Ù†ØµÙ…Ù… Ø³ÙŠØ± Ø§Ù„ØªØ´ØºÙŠÙ„ØŒ ÙˆÙ†Ø¨Ù†ÙŠ Ø§Ù„Ø£Ø¯ÙˆØ§ØªØŒ ÙˆÙ†Ø±Ø¨Ø· Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠØŒ ÙˆÙ†Ø­ÙˆÙ‘Ù„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø¥Ù„Ù‰ Ù‚Ø±Ø§Ø±Ø§Øª ÙˆÙ…ØªØ§Ø¨Ø¹Ø© ÙˆØªÙ†ÙÙŠØ°.',
      },
    },
    enterprise: {
      badge: 'Ù…ØµÙ…Ù… Ù„Ù„Ù…Ø¤Ø³Ø³Ø§Øª',
      title: 'Ù…ØµÙ…Ù… Ù„Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„ØªÙŠ ÙƒØ¨Ø±Øª Ø£Ø³Ø±Ø¹ Ù…Ù† Ø£Ù†Ø¸Ù…ØªÙ‡Ø§',
      subtitle: 'AURA Ù…Ù†Ø§Ø³Ø¨ Ù„Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„ÙƒØ¨ÙŠØ±Ø©ØŒ Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹Ø§Øª Ù…ØªØ¹Ø¯Ø¯Ø© Ø§Ù„Ø´Ø±ÙƒØ§ØªØŒ Ø´Ø±ÙƒØ§Øª Ø§Ù„Ø¹Ù‚Ø§Ø±Ø§Øª ÙˆØ§Ù„ØªØ·ÙˆÙŠØ±ØŒ ÙˆÙØ±Ù‚ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø§Ù„ØªÙŠ Ù„Ø¯ÙŠÙ‡Ø§ Ù…ØªØ§Ø¨Ø¹Ø© ÙŠÙˆÙ…ÙŠØ© Ù…Ø¹Ù‚Ø¯Ø©.',
      cards: [
        { icon: 'layers', title: 'Ù…Ø¬Ù…ÙˆØ¹Ø§Øª Ù…ØªØ¹Ø¯Ø¯Ø© Ø§Ù„Ø´Ø±ÙƒØ§Øª', text: 'Ø¹Ù†Ø¯Ù…Ø§ ØªØ¹Ù…Ù„ ÙƒÙ„ Ø´Ø±ÙƒØ© Ø¨Ø·Ø±ÙŠÙ‚Ø© Ù…Ø®ØªÙ„ÙØ© ÙˆÙ„Ø§ ØªÙˆØ¬Ø¯ Ø±Ø¤ÙŠØ© Ù…ÙˆØ­Ø¯Ø© Ù„Ù„Ø£ÙˆÙ„ÙˆÙŠØ§ØªØŒ Ù†Ø¹ÙŠØ¯ Ø¨Ù†Ø§Ø¡ Ù…Ù†Ø¸ÙˆÙ…Ø© ØªØ´ØºÙŠÙ„ Ù…Ø´ØªØ±ÙƒØ© ØªØ³Ø§Ø¹Ø¯ Ø§Ù„Ø¥Ø¯Ø§Ø±Ø© Ø¹Ù„Ù‰ Ø±Ø¤ÙŠØ© Ø§Ù„ØµÙˆØ±Ø© Ø§Ù„ÙƒØ§Ù…Ù„Ø©.' },
        { icon: 'workflow', title: 'ÙØ±Ù‚ ØªØ´ØºÙŠÙ„ ÙˆÙ…Ø´Ø§Ø±ÙŠØ¹ ÙƒØ¨ÙŠØ±Ø©', text: 'Ù†Ø­ÙˆÙ‘Ù„ Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ ÙˆØ§Ù„Ù…ØªØ§Ø¨Ø¹Ø§Øª ÙˆØ§Ù„Ù‚Ø±Ø§Ø±Ø§Øª Ø¥Ù„Ù‰ Ù…Ø±Ø§Ø­Ù„ ÙˆØ§Ø¶Ø­Ø© ÙˆÙ„ÙˆØ­Ø§Øª Ù…ØªØ§Ø¨Ø¹Ø© ØªØ¬Ø¹Ù„ Ø§Ù„ØªØ£Ø®ÙŠØ± ÙˆØ§Ù„Ù…Ø®Ø§Ø·Ø± Ø¸Ø§Ù‡Ø±Ø© Ù‚Ø¨Ù„ Ø£Ù† ØªØªØ­ÙˆÙ„ Ø¥Ù„Ù‰ Ø£Ø²Ù…Ø©.' },
        { icon: 'chart', title: 'Ø¥Ø¯Ø§Ø±Ø© ØªØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª', text: 'Ù†Ø±Ø¨Ø· Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ù…ØªÙØ±Ù‚Ø© Ø¯Ø§Ø®Ù„ Ù†Ø¸Ø§Ù… ÙˆØ§Ø­Ø¯ ÙŠØ³Ø§Ø¹Ø¯ Ø§Ù„Ù‚ÙŠØ§Ø¯Ø© Ø¹Ù„Ù‰ Ø§ØªØ®Ø§Ø° Ù‚Ø±Ø§Ø±Ø§Øª Ø£Ø³Ø±Ø¹ ÙˆØ£Ø¯Ù‚.' },
        { icon: 'bot', title: 'Ø°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ø¯Ø§Ø®Ù„ Ø§Ù„ØªØ´ØºÙŠÙ„', text: 'Ù†Ø³ØªØ®Ø¯Ù… Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ÙƒØ¬Ø²Ø¡ Ù…Ù† Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ØŒ ÙˆÙ„ÙŠØ³ ÙƒØ£Ø¯Ø§Ø© Ù…Ù†ÙØµÙ„Ø© Ø®Ø§Ø±Ø¬ Ø§Ù„Ù†Ø¸Ø§Ù…ØŒ Ù…Ø¹ Ù†Ù‚Ø§Ø· Ù…Ø±Ø§Ø¬Ø¹Ø© Ø¨Ø´Ø±ÙŠØ©.' },
      ],
      map: ['ØªØ´Ø®ÙŠØµ', 'Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„', 'Ø§Ù„Ø£Ø¯ÙˆØ§Øª', 'ÙˆÙƒÙ„Ø§Ø¡ AI', 'Ø·Ø¨Ù‚Ø© Ø§Ù„Ù‚Ø±Ø§Ø±'],
    },
    services: {
      badge: 'Ø·Ø¨Ù‚Ø§Øª Ø§Ù„Ø®Ø¯Ù…Ø©',
      title: 'Ø·Ø¨Ù‚Ø§Øª Ø§Ù„Ø®Ø¯Ù…Ø©',
      subtitle: 'Ø¹Ø´Ø± Ø·Ø¨Ù‚Ø§Øª Ù…ØªÙƒØ§Ù…Ù„Ø© ÙŠÙ…ÙƒÙ† ØªÙ†ÙÙŠØ°Ù‡Ø§ ÙƒÙ…Ù†Ø¸ÙˆÙ…Ø© ÙƒØ§Ù…Ù„Ø©ØŒ Ø£Ùˆ Ø§Ø®ØªÙŠØ§Ø± Ø§Ù„Ø·Ø¨Ù‚Ø§Øª Ø§Ù„Ø£ÙƒØ«Ø± ØªØ£Ø«ÙŠØ±Ù‹Ø§ Ø­Ø³Ø¨ Ø§Ø­ØªÙŠØ§Ø¬ Ø§Ù„Ø´Ø±ÙƒØ© Ø¨Ø¹Ø¯ Ø§Ù„ØªØ´Ø®ÙŠØµ.',
      layers: [
        {
          num: '01',
          title: 'ØªØ´Ø®ÙŠØµ Ù†Ø¸Ø§Ù… Ø§Ù„Ø¹Ù…Ù„',
          problem: 'ÙØ­Øµ Ø¹Ù…ÙŠÙ‚ ÙŠÙƒØ´Ù Ø£ÙŠÙ† ØªØ¶ÙŠØ¹ Ø§Ù„Ù…ÙˆØ§Ø±Ø¯ØŒ Ù…Ø§ Ø§Ù„Ù…Ø´ÙƒÙ„Ø§Øª Ø§Ù„Ø£Ø¹Ù„Ù‰ ØªØ£Ø«ÙŠØ±Ù‹Ø§ØŒ ÙˆÙ…Ø§ Ø£ÙˆÙ„ÙˆÙŠØ§Øª Ø§Ù„ØªØ¯Ø®Ù„.',
          solution: 'Ù†Ø±Ø³Ù… Ø§Ù„ÙˆØ§Ù‚Ø¹ Ø§Ù„ØªØ´ØºÙŠÙ„ÙŠ Ø§Ù„Ø­Ø§Ù„ÙŠØŒ Ù†Ø­Ø¯Ø¯ Ù†Ù‚Ø§Ø· Ø§Ù„ØªØ¹Ø·ÙŠÙ„ØŒ ÙˆÙ†Ø­ÙˆÙ‘Ù„ Ø§Ù„ØºÙ…ÙˆØ¶ Ø¥Ù„Ù‰ Ù…Ù„Ø®Øµ ØªÙ†ÙÙŠØ°ÙŠ Ù‚Ø§Ø¨Ù„ Ù„Ù„ØªÙ†ÙÙŠØ°.',
          kpis: ['Ø®Ø±ÙŠØ·Ø© Ù…Ø´ÙƒÙ„Ø§Øª Ø§Ù„ØªØ´ØºÙŠÙ„', 'ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø£Ø«Ø± Ø§Ù„Ù…Ø§Ù„ÙŠ Ø£Ùˆ Ø§Ù„ØªØ´ØºÙŠÙ„ÙŠ', 'Ø£ÙˆÙ„ÙˆÙŠØ§Øª ØªÙ†ÙÙŠØ° ÙˆØ§Ø¶Ø­Ø©', 'Ø¹Ø±Ø¶ ØªÙ†ÙÙŠØ°ÙŠ Ù…Ø®ØªØµØ± Ù„Ù„Ù‚ÙŠØ§Ø¯Ø©'],
          impact: 'Ø§Ù„Ø£Ø«Ø± Ø§Ù„Ù…Ø³ØªÙ‡Ø¯Ù: Ø£ÙˆÙ„ÙˆÙŠØ§Øª Ø£ÙˆØ¶Ø­ ÙˆÙ†Ù‚Ø·Ø© Ø¨Ø¯Ø§ÙŠØ© Ø¹Ù…Ù„ÙŠØ©.',
          icon: 'search',
          isNew: false,
        },
        {
          num: '02',
          title: 'ØªØµÙ…ÙŠÙ… Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ ÙˆØ§Ù„Ø¹Ù…Ù„ÙŠØ§Øª',
          problem: 'Ø§Ù„Ø¹Ù…Ù„ ØºÙŠØ± Ø§Ù„Ù…Ø±Ø¦ÙŠ ÙŠØªØ­ÙˆÙ„ Ø¥Ù„Ù‰ ØªØ£Ø®ÙŠØ± ÙˆÙ…Ø³Ø¤ÙˆÙ„ÙŠØ§Øª ØºÙŠØ± ÙˆØ§Ø¶Ø­Ø© ÙˆÙ…ØªØ§Ø¨Ø¹Ø© Ù…ØªÙƒØ±Ø±Ø©.',
          solution: 'Ù†Ø­ÙˆÙ‘Ù„ Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„ÙŠÙˆÙ…ÙŠ Ø¥Ù„Ù‰ Ù…Ø±Ø§Ø­Ù„ ÙˆÙ…Ø³Ø¤ÙˆÙ„ÙŠØ§Øª ÙˆÙ†Ù‚Ø§Ø· Ù…Ø±Ø§Ø¬Ø¹Ø© ÙˆØ¥ÙŠÙ‚Ø§Ø¹ Ù…ØªØ§Ø¨Ø¹Ø© Ø£Ø³Ø¨ÙˆØ¹ÙŠ ÙˆØ§Ø¶Ø­.',
          kpis: ['Ø®Ø±ÙŠØ·Ø© Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„', 'Ù…Ø±Ø§Ø­Ù„ ÙˆÙ…Ø³Ø¤ÙˆÙ„ÙŠØ§Øª', 'Ù‚ÙˆØ§Ù„Ø¨ Ù…ØªØ§Ø¨Ø¹Ø©', 'Ù†Ø¸Ø§Ù… Ù…Ø±Ø§Ø¬Ø¹Ø© Ø£Ø³Ø¨ÙˆØ¹ÙŠ'],
          impact: 'Ø§Ù„Ø£Ø«Ø± Ø§Ù„Ù…Ø³ØªÙ‡Ø¯Ù: ØªØ³Ù„ÙŠÙ… Ø£ÙˆØ¶Ø­ ÙˆÙØ¬ÙˆØ§Øª Ø£Ù‚Ù„ Ø¨ÙŠÙ† Ø§Ù„ÙØ±Ù‚.',
          icon: 'flow',
          isNew: false,
        },
        {
          num: '03',
          title: 'Ø§Ù„Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ù„Ø¨Ø±Ù…Ø¬ÙŠØ§Øª Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØ©',
          problem: 'Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ø¹Ø§Ù…Ø© Ù„Ø§ ØªÙ†Ø§Ø³Ø¨ Ø·Ø±ÙŠÙ‚Ø© Ø¹Ù…Ù„ Ø§Ù„ÙØ±ÙŠÙ‚ØŒ ÙÙŠØ¹ÙˆØ¯ Ø§Ù„Ù†Ø§Ø³ Ø¥Ù„Ù‰ Ø§Ù„Ø¬Ø¯Ø§ÙˆÙ„ ÙˆØ§Ù„ØªØ°ÙƒÙŠØ± Ø§Ù„ÙŠØ¯ÙˆÙŠ.',
          solution: 'Ù†Ø¨Ù†ÙŠ Ù„ÙˆØ­Ø§Øª ÙˆÙ†Ù…Ø§Ø°Ø¬ ÙˆÙ…ØªØªØ¨Ø¹Ø§Øª ÙˆÙ‚ÙˆØ§Ø¹Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª Ø®ÙÙŠÙØ© Ø­ÙˆÙ„ Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„ÙØ±ÙŠÙ‚ Ø§Ù„ÙØ¹Ù„ÙŠ.',
          kpis: ['Ù„ÙˆØ­Ø§Øª ØªØ­ÙƒÙ…', 'Ù†Ù…Ø§Ø°Ø¬ Ø°ÙƒÙŠØ©', 'Ù‚ÙˆØ§Ø¹Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª Ø¯Ø§Ø®Ù„ÙŠØ©', 'Ø£Ø¯ÙˆØ§Øª Ù…ØªØ§Ø¨Ø¹Ø© Ù…Ø®ØµØµØ©'],
          impact: 'Ø§Ù„Ø£Ø«Ø± Ø§Ù„Ù…Ø³ØªÙ‡Ø¯Ù: Ø£Ø¯ÙˆØ§Øª ØªÙ‚Ù„Ù„ Ø§Ù„Ø¹Ø¨Ø¡ Ø§Ù„Ø¥Ø¯Ø§Ø±ÙŠ Ø¨Ø¯Ù„ Ø£Ù† ØªØ¶ÙŠÙÙ‡.',
          icon: 'build',
          isNew: false,
        },
        {
          num: '04',
          title: 'Ø£ØªÙ…ØªØ© Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ÙˆØ§Ù„ÙˆÙƒÙ„Ø§Ø¡',
          problem: 'Ø§Ù„ØªÙ‚Ø§Ø±ÙŠØ± ÙˆØ§Ù„ØªØ°ÙƒÙŠØ± ÙˆØ§Ù„ØªØ­Ù„ÙŠÙ„ ÙˆØ§Ù„ØªØ³Ù„ÙŠÙ…Ø§Øª Ø§Ù„Ù…ØªÙƒØ±Ø±Ø© ØªØ³ØªÙ‡Ù„Ùƒ ÙˆÙ‚Øª Ø§Ù„ÙØ±ÙŠÙ‚.',
          solution: 'Ù†Ø±Ø¨Ø· Ø§Ù„Ù…Ù‡Ø§Ù… Ø§Ù„Ù…ØªÙƒØ±Ø±Ø© Ø¨ÙˆÙƒÙ„Ø§Ø¡ ÙˆØ£ØªÙ…ØªØ© Ù…Ø¹ Ù…Ø±Ø§Ø¬Ø¹Ø© Ø¨Ø´Ø±ÙŠØ© Ø¹Ù†Ø¯Ù…Ø§ ØªÙƒÙˆÙ† Ø§Ù„Ø¬ÙˆØ¯Ø© Ø£Ùˆ Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø© Ù…Ù‡Ù…Ø©.',
          kpis: ['ÙˆÙƒÙ„Ø§Ø¡ Ù…ØªØ§Ø¨Ø¹Ø©', 'ØªÙ‚Ø§Ø±ÙŠØ± Ø¢Ù„ÙŠØ©', 'ØªÙ†Ø¨ÙŠÙ‡Ø§Øª Ø°ÙƒÙŠØ©', 'Ù†Ù‚Ø§Ø· Ù…Ø±Ø§Ø¬Ø¹Ø© Ø¨Ø´Ø±ÙŠØ©'],
          impact: 'Ø§Ù„Ø£Ø«Ø± Ø§Ù„Ù…Ø³ØªÙ‡Ø¯Ù: ØªÙ†Ø³ÙŠÙ‚ ÙŠØ¯ÙˆÙŠ Ø£Ù‚Ù„ ÙˆØ¥ÙŠÙ‚Ø§Ø¹ ØªØ´ØºÙŠÙ„ Ø£ÙØ¶Ù„.',
          icon: 'bot',
          isNew: false,
        },
        {
          num: '05',
          title: 'Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ© Ø§Ù„Ù†Ù…Ùˆ ÙˆØ§Ù„ØªØ³ÙˆÙŠÙ‚',
          problem: 'Ø§Ù„Ù…Ø­ØªÙˆÙ‰ ÙˆØ§Ù„Ø­Ù…Ù„Ø§Øª ÙˆØ§Ù„Ù…Ù†Ø§ÙØ³ÙˆÙ† ÙˆÙ…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ ÙŠØ¹Ù…Ù„ÙˆÙ† ØºØ§Ù„Ø¨Ù‹Ø§ Ø®Ø§Ø±Ø¬ Ù†Ø¸Ø§Ù… Ø§Ù„Ø´Ø±ÙƒØ©.',
          solution: 'Ù†Ø¨Ù†ÙŠ Ù…Ø­Ø±Ùƒ Ù†Ù…Ùˆ ÙŠØ±Ø¨Ø· Ø§Ù„Ù…Ø­ØªÙˆÙ‰ ÙˆØ§Ù„Ø­Ù…Ù„Ø§Øª ÙˆØªØ­Ù„ÙŠÙ„ Ø§Ù„Ù…Ù†Ø§ÙØ³ÙŠÙ† ÙˆØªØªØ¨Ø¹ Ø§Ù„ÙØ±Øµ Ø¯Ø§Ø®Ù„ Ù†Ø¸Ø§Ù… ÙˆØ§Ø­Ø¯.',
          kpis: ['ØªØ­Ù„ÙŠÙ„ Ù…Ù†Ø§ÙØ³ÙŠÙ†', 'Ø£ÙÙƒØ§Ø± Ù…Ø­ØªÙˆÙ‰', 'ØªÙ‚ÙˆÙŠÙ… Ù†Ø´Ø±', 'Ù†Ø¸Ø§Ù… ØªØªØ¨Ø¹ ÙØ±Øµ'],
          impact: 'Ø§Ù„Ø£Ø«Ø± Ø§Ù„Ù…Ø³ØªÙ‡Ø¯Ù: ØªØ³ÙˆÙŠÙ‚ Ù…Ø±ØªØ¨Ø· Ø¨Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© ÙˆÙ‚Ø±Ø§Ø±Ø§Øª Ø§Ù„Ø¨ÙŠØ¹.',
          icon: 'trend',
          isNew: false,
        },
        {
          num: '06',
          title: 'Ù‡ÙŠÙƒÙ„Ø© Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ ÙˆØ§Ù„Ø£Ø¹Ù…Ø§Ù„',
          problem: 'Ø§Ù„ÙˆØ­Ø¯Ø§Øª Ø£Ùˆ Ø§Ù„Ø¹Ø±ÙˆØ¶ Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø© ØªØ¨Ø¯Ø£ Ø£Ø­ÙŠØ§Ù†Ù‹Ø§ Ø¨Ù„Ø§ ÙˆØ¹Ø¯ ÙˆØ§Ø¶Ø­ Ø£Ùˆ Ø±Ø­Ù„Ø© Ø¹Ù…ÙŠÙ„ Ø£Ùˆ Ù†Ù…ÙˆØ°Ø¬ ØªØ³Ù„ÙŠÙ….',
          solution: 'Ù†Ù‡ÙŠÙƒÙ„ Ø§Ù„Ø¹Ø±Ø¶ ÙˆØ±Ø­Ù„Ø© Ø§Ù„Ø¹Ù…ÙŠÙ„ ÙˆÙ†Ù…ÙˆØ°Ø¬ Ø§Ù„ØªØ³Ù„ÙŠÙ… ÙˆØ®Ø·Ø© Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚ Ø­ØªÙ‰ ÙŠØªØ­Ø±Ùƒ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ø¨ØºÙ…ÙˆØ¶ Ø£Ù‚Ù„.',
          kpis: ['Ø¹Ø±Ø¶ ÙˆØ§Ø¶Ø­', 'Ø±Ø­Ù„Ø© Ø¹Ù…ÙŠÙ„', 'Ù†Ù…ÙˆØ°Ø¬ ØªØ³Ù„ÙŠÙ…', 'Ø®Ø·Ø© Ø¥Ø·Ù„Ø§Ù‚ ÙˆØ£ÙˆÙ„ Ø¥ÙŠØ±Ø§Ø¯'],
          impact: 'Ø§Ù„Ø£Ø«Ø± Ø§Ù„Ù…Ø³ØªÙ‡Ø¯Ù: Ø·Ø±ÙŠÙ‚ Ø£ÙˆØ¶Ø­ Ù…Ù† Ø§Ù„ÙÙƒØ±Ø© Ø¥Ù„Ù‰ Ø§Ù„Ø³ÙˆÙ‚.',
          icon: 'rocket',
          isNew: false,
        },
        {
          num: '07',
          title: 'Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ§Øª Ø§Ù„Ù†Ù…Ùˆ Ø§Ù„Ø­ÙŠØ©',
          problem: 'Ø®Ø·Ø· Ø§Ù„Ù†Ù…Ùˆ ØªØµØ¨Ø­ Ù‚Ø¯ÙŠÙ…Ø© Ø¹Ù†Ø¯Ù…Ø§ ØªØªØºÙŠØ± Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø³ÙˆÙ‚ ÙˆØ§Ù„Ù…Ù†Ø§ÙØ³ÙŠÙ† ÙˆØ¥Ø´Ø§Ø±Ø§Øª Ø§Ù„Ø­Ù…Ù„Ø§Øª.',
          solution: 'Ù†Ø¨Ù†ÙŠ Ø·Ø¨Ù‚Ø© Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ© Ø­ÙŠØ© ØªØ±Ø§Ù‚Ø¨ Ø§Ù„Ø¥Ø´Ø§Ø±Ø§Øª ÙˆØªÙ‚ØªØ±Ø­ Ø§ØªØ¬Ø§Ù‡Ø§Øª Ø­Ù…Ù„Ø§Øª Ù…Ø¹ Ù…Ø±Ø§Ø¬Ø¹Ø© Ø¨Ø´Ø±ÙŠØ© Ù‚Ø¨Ù„ Ø§Ù„Ù†Ø´Ø±.',
          kpis: ['ØªØ­Ù„ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª Ù…Ø³ØªÙ…Ø±', 'Ø§Ù‚ØªØ±Ø§Ø­ Ø­Ù…Ù„Ø§Øª', 'Ù…Ø±Ø§Ø¬Ø¹Ø© ÙˆÙ…ÙˆØ§ÙÙ‚Ø© Ø¨Ø´Ø±ÙŠØ©', 'ØªØ­Ø¯ÙŠØ«Ø§Øª Ø§Ø³ØªØ±Ø§ØªÙŠØ¬ÙŠØ© Ø­ÙŠØ©'],
          impact: 'ÙŠØªÙ… ØªÙ‚Ø¯ÙŠØ± Ø§Ù„Ø£Ø«Ø± Ø¨Ø¹Ø¯ Ø§Ù„ØªØ´Ø®ÙŠØµØŒ ÙˆØªØ®ØªÙ„Ù Ø§Ù„Ù†ØªØ§Ø¦Ø¬ Ø­Ø³Ø¨ Ø¬ÙˆØ¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ÙˆØ³Ø±Ø¹Ø© Ø§Ù„ØªØ·Ø¨ÙŠÙ‚.',
          icon: 'sparkle',
          isNew: true,
        },
        {
          num: '08',
          title: 'Ø§Ù„Ù†Ø³Ø®Ø© Ø§Ù„Ø§ÙØªØ±Ø§Ø¶ÙŠØ© Ù„Ù„Ø´Ø±ÙƒØ©',
          problem: 'Ù‚Ø±Ø§Ø±Ø§Øª Ø§Ù„Ù‚ÙŠØ§Ø¯Ø© ØªØ­Ù…Ù„ Ù…Ø®Ø§Ø·Ø±Ø© Ø¹Ù†Ø¯Ù…Ø§ Ù„Ø§ ØªØªÙ… Ù…Ù‚Ø§Ø±Ù†Ø© Ø§Ù„Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆÙ‡Ø§Øª Ù‚Ø¨Ù„ Ø§Ù„ØªÙ†ÙÙŠØ°.',
          solution: 'Ù†ØµÙ…Ù… Ù†Ù…ÙˆØ°Ø¬Ù‹Ø§ Ø§ÙØªØ±Ø§Ø¶ÙŠÙ‹Ø§ Ø®ÙÙŠÙÙ‹Ø§ Ù„Ù„Ø´Ø±ÙƒØ© Ù„Ø§Ø®ØªØ¨Ø§Ø± Ø§Ù„Ù‚Ø±Ø§Ø±Ø§Øª Ø§Ù„ØªØ´ØºÙŠÙ„ÙŠØ© Ø£Ùˆ Ø§Ù„ØªØ³ÙˆÙŠÙ‚ÙŠØ© Ø£Ùˆ Ø§Ù„Ù‡ÙŠÙƒÙ„ÙŠØ© Ù‚Ø¨Ù„ Ø§Ù„Ù…Ø®Ø§Ø·Ø±Ø©.',
          kpis: ['Ù…Ø­Ø§ÙƒØ§Ø© Ù‚Ø±Ø§Ø±Ø§Øª', 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆÙ‡Ø§Øª', 'ØªÙˆÙ‚Ø¹ Ø£Ø«Ø± ØªØ´ØºÙŠÙ„ÙŠ Ø£Ùˆ Ù…Ø§Ù„ÙŠ', 'ØªØ­Ø³ÙŠÙ† Ø§Ù„Ù‚Ø±Ø§Ø± Ù‚Ø¨Ù„ Ø§Ù„Ù…Ø®Ø§Ø·Ø±Ø©'],
          impact: 'ÙŠØªÙ… ØªÙ‚Ø¯ÙŠØ± Ø§Ù„Ø£Ø«Ø± Ø¨Ø¹Ø¯ Ø§Ù„ØªØ´Ø®ÙŠØµ Ø­Ø³Ø¨ Ø¬ÙˆØ¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ÙˆØ¹Ù…Ù‚ Ø§Ù„Ù†Ù…ÙˆØ°Ø¬.',
          icon: 'chart',
          isNew: true,
        },
        {
          num: '09',
          title: 'Ø§Ù„ØªØ³ÙˆÙŠÙ‚ Ø§Ù„Ø¹Ù‚Ø§Ø±ÙŠ Ù…ÙØ±Ø· Ø§Ù„ØªØ®ØµÙŠØµ',
          problem: 'Ø§Ù„Ù…Ø´ØªØ±ÙŠ Ø§Ù„Ø¹Ù‚Ø§Ø±ÙŠ Ù„Ø§ ÙŠØ­ØªØ§Ø¬ Ù†ÙØ³ Ø§Ù„Ø±Ø³Ø§Ù„Ø© Ø¯Ø§Ø¦Ù…Ù‹Ø§Ø› Ø§Ù„Ù†ÙŠØ© ÙˆØ§Ù„Ù…ÙŠØ²Ø§Ù†ÙŠØ© ÙˆÙ…Ù„Ø§Ø¡Ù…Ø© Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ ØªØ®ØªÙ„Ù.',
          solution: 'Ù†Ø±Ø¨Ø· Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ ÙˆØ§Ù„Ø­Ù…Ù„Ø§Øª ÙˆØ§Ù„Ù…Ø­ØªÙˆÙ‰ Ø§Ù„Ø¯ÙŠÙ†Ø§Ù…ÙŠÙƒÙŠ ÙˆØªØ¬Ø§Ø±Ø¨ Ø§Ù„Ø¹Ø±Ø¶ Ø§Ù„ØªÙØ§Ø¹Ù„ÙŠØ© ÙˆÙ…Ø³Ø§Ø± Ø§Ù„Ø¨ÙŠØ¹. Ù…ÙØ§Ù‡ÙŠÙ… 3D Ø£Ùˆ VR-ready ØªÙØ­Ø¯Ø¯ ÙÙ‚Ø· Ø¹Ù†Ø¯ Ø§Ù„Ø­Ø§Ø¬Ø©.',
          kpis: ['Ù…Ø­ØªÙˆÙ‰ Ø¹Ù‚Ø§Ø±ÙŠ Ù…Ø®ØµØµ', 'ØµÙØ­Ø§Øª Ø£Ùˆ ØªØ¬Ø§Ø±Ø¨ Ø¹Ø±Ø¶ ØªÙØ§Ø¹Ù„ÙŠØ©', 'ØªØ®ØµÙŠØµ Ø­Ø³Ø¨ Ù†ÙˆØ¹ Ø§Ù„Ù…Ø´ØªØ±ÙŠ', 'Ø±Ø¨Ø· Ø§Ù„Ø­Ù…Ù„Ø§Øª Ø¨Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© ÙˆØ§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª'],
          impact: 'Ø¯Ù„ÙŠÙ„ Ù…ØªÙ‚Ø¯Ù… Ø¹Ù„Ù‰ Ø§Ù„Ù‚Ø¯Ø±Ø©Ø› ÙŠØªÙ… ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù†Ø·Ø§Ù‚ Ø¨Ø¹Ø¯ Ø§Ù„ØªØ´Ø®ÙŠØµ Ø®ØµÙˆØµÙ‹Ø§ Ù„ØªØ¬Ø§Ø±Ø¨ 3D Ø£Ùˆ VR-ready.',
          icon: 'layers',
          isNew: true,
        },
        {
          num: '10',
          title: 'Ù†Ø¸Ø§Ù… Ø§Ù„ÙˆÙƒÙ„Ø§Ø¡ Ø§Ù„Ø£Ø°ÙƒÙŠØ§Ø¡ Ø§Ù„Ù…Ø³ØªÙ‚Ù„ÙŠÙ†',
          problem: 'Ø§Ù„Ø¨Ø­Ø« ÙˆØ§Ù„ØªÙ‚Ø§Ø±ÙŠØ± ÙˆØ¯Ø¹Ù… Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª ÙˆØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø³ÙˆÙ‚ ÙŠØ­ØªØ§Ø¬ÙˆÙ† Ù…ØªØ§Ø¨Ø¹Ø© ÙŠØ¯ÙˆÙŠØ© Ù…Ø³ØªÙ…Ø±Ø©.',
          solution: 'Ù†ØµÙ…Ù… ÙØ±ÙŠÙ‚Ù‹Ø§ Ø±Ù‚Ù…ÙŠÙ‹Ø§ Ù…Ù† ÙˆÙƒÙ„Ø§Ø¡ Ù…ØªØ®ØµØµÙŠÙ† Ù„Ù„Ø¨Ø­Ø« ÙˆØ§Ù„ØªÙ‚Ø§Ø±ÙŠØ± ÙˆØ¯Ø¹Ù… Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª ÙˆØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø³ÙˆÙ‚ Ù…Ø¹ Ø¥Ø´Ø±Ø§Ù Ø¨Ø´Ø±ÙŠ.',
          kpis: ['ÙˆÙƒÙŠÙ„ Ù…Ø¨ÙŠØ¹Ø§Øª', 'ÙˆÙƒÙŠÙ„ ØªÙ‚Ø§Ø±ÙŠØ±', 'ÙˆÙƒÙŠÙ„ Ø¨Ø­Ø«', 'Ø¥Ø´Ø±Ø§Ù Ø¨Ø´Ø±ÙŠ', 'Ù†Ø¸Ø§Ù… Ù…ØªØ§Ø¨Ø¹Ø© Ù…Ø³ØªÙ…Ø±'],
          impact: 'Ø§Ù„Ø£Ø«Ø± Ø§Ù„Ù…Ø­ØªÙ…Ù„ ÙŠØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ø§Ù„Ù†Ø·Ø§Ù‚ ÙˆØ§Ù„Ø­ÙˆÙƒÙ…Ø© ÙˆØ§Ù„ÙˆØµÙˆÙ„ Ù„Ù„Ø¨ÙŠØ§Ù†Ø§Øª ÙˆØªØ¨Ù†ÙŠ Ø§Ù„ÙØ±ÙŠÙ‚.',
          icon: 'bot',
          isNew: true,
        },
      ],
      who: [
        { icon: 'layers', title: 'Ø§Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„ÙƒØ¨ÙŠØ±Ø©', desc: 'ØªØ´ØºÙŠÙ„ Ù…Ø¹Ù‚Ø¯ ÙˆØ£Ø¬Ø²Ø§Ø¡ ÙƒØ«ÙŠØ±Ø© Ù…ØªØ­Ø±ÙƒØ©' },
        { icon: 'settings', title: 'Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹Ø§Øª', desc: 'Ø±Ø¤ÙŠØ© Ù…Ø´ØªØ±ÙƒØ© Ø¨ÙŠÙ† Ø§Ù„ÙˆØ­Ø¯Ø§Øª' },
        { icon: 'rocket', title: 'Ø§Ù„Ø¹Ù‚Ø§Ø±Ø§Øª ÙˆØ§Ù„ØªØ·ÙˆÙŠØ±', desc: 'Ù…Ø¨ÙŠØ¹Ø§Øª ÙˆØ­Ù…Ù„Ø§Øª ÙˆÙ…Ø´Ø§Ø±ÙŠØ¹ ÙˆÙ…ØªØ§Ø¨Ø¹Ø©' },
        { icon: 'book', title: 'Ø´Ø±ÙƒØ§Øª Ø§Ù„Ø®Ø¯Ù…Ø§Øª ÙˆØ§Ù„ØªØ´ØºÙŠÙ„', desc: 'ÙØ±Ù‚ ÙˆØªØ³Ù„ÙŠÙ… ÙˆØ¨ÙŠØ§Ù†Ø§Øª ÙˆØªØªØ¨Ø¹ ÙŠÙˆÙ…ÙŠ' },
      ],
    },
    realEstate: {
      badge: 'Ø¯Ù„ÙŠÙ„ ØªØ·Ø¨ÙŠÙ‚ÙŠ',
      title: 'Ø¯Ù„ÙŠÙ„ ØªØ·Ø¨ÙŠÙ‚ÙŠ: Ø§Ù„Ø¹Ù‚Ø§Ø±Ø§Øª ÙˆØ§Ù„ØªØ¬Ø§Ø±Ø¨ Ø§Ù„ØªÙØ§Ø¹Ù„ÙŠØ©',
      subtitle: 'Ø§Ù„Ù‚Ø·Ø§Ø¹ Ø§Ù„Ø¹Ù‚Ø§Ø±ÙŠ ÙŠÙˆØ¶Ø­ Ù‚ÙˆØ© AURA ÙÙŠ Ø§Ù„Ø¯Ù…Ø¬ Ø¨ÙŠÙ† Ø§Ù„ØªØ´ØºÙŠÙ„ØŒ Ø§Ù„ØªØ³ÙˆÙŠÙ‚ØŒ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§ØªØŒ ÙˆØ§Ù„Ø¨ÙŠØ¦Ø§Øª Ø§Ù„ØªÙØ§Ø¹Ù„ÙŠØ©.',
      copy: 'ÙÙŠ Ø§Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„Ø¹Ù‚Ø§Ø±ÙŠØ©ØŒ Ù„Ø§ ÙŠÙƒÙÙŠ Ø¥Ø¹Ù„Ø§Ù† ÙˆØ§Ø­Ø¯ Ù„ÙƒÙ„ Ø§Ù„Ù…Ø´ØªØ±ÙŠÙ†. ÙŠÙ…ÙƒÙ† Ù„Ù€ AURA Ø¨Ù†Ø§Ø¡ Ù†Ø¸Ø§Ù… ÙŠØ±Ø¨Ø· Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ØŒ Ø§Ù„Ø­Ù…Ù„Ø§ØªØŒ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ØŒ ØµÙØ­Ø§Øª Ø§Ù„Ø¹Ø±Ø¶ØŒ ÙˆØ§Ù„ØªØ¬Ø§Ø±Ø¨ Ø§Ù„ØªÙØ§Ø¹Ù„ÙŠØ© ÙÙŠ Ù…Ø³Ø§Ø± ÙˆØ§Ø­Ø¯. ÙˆØ¹Ù†Ø¯ Ø§Ù„Ø­Ø§Ø¬Ø©ØŒ ÙŠÙ…ÙƒÙ† ØªØ·ÙˆÙŠØ± Ø¨ÙŠØ¦Ø§Øª Ø«Ù„Ø§Ø«ÙŠØ© Ø§Ù„Ø£Ø¨Ø¹Ø§Ø¯ Ø£Ùˆ ØªØ¬Ø§Ø±Ø¨ VR-ready ØªØ³Ø§Ø¹Ø¯ Ø§Ù„Ø¹Ù…ÙŠÙ„ Ø¹Ù„Ù‰ Ø§Ø³ØªÙƒØ´Ø§Ù Ø§Ù„Ù…Ø´Ø±ÙˆØ¹ Ø¨Ø´ÙƒÙ„ Ø£Ø¹Ù…Ù‚ Ù‚Ø¨Ù„ Ù‚Ø±Ø§Ø± Ø§Ù„Ø´Ø±Ø§Ø¡.',
      points: ['ØªØ³ÙˆÙŠÙ‚ Ø¹Ù‚Ø§Ø±ÙŠ Ù…Ø®ØµØµ', 'Ø¯Ø¹Ù… Ù…Ø­ØªÙˆÙ‰ Ø¨Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ', 'ØªØ¬Ø§Ø±Ø¨ Ø¹Ø±Ø¶ ØªÙØ§Ø¹Ù„ÙŠØ©', 'Ø¨ÙŠØ¦Ø§Øª 3D / VR-ready Ø¹Ù†Ø¯ Ø§Ù„Ø­Ø§Ø¬Ø©', 'ØªØ¬Ø§Ø±Ø¨ ØªÙ…ÙƒÙŠÙ† Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª', 'ØªØªØ¨Ø¹ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ Ø§Ù„Ù…Ø­ØªÙ…Ù„ÙŠÙ†', 'Ø±Ø¨Ø· Ø§Ù„Ø­Ù…Ù„Ø§Øª Ø¨Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª'],
      cta: 'Ù†Ø§Ù‚Ø´ Ø­Ø§Ù„Ø© Ù…Ø´Ø§Ø¨Ù‡Ø© Ù„Ø´Ø±ÙƒØªÙƒ',
    },
    process: {
      badge: 'Ù…Ù†Ù‡Ø¬ÙŠØ© AURA',
      title: 'Ù…Ù†Ù‡Ø¬ÙŠØ© AURA',
      subtitle: 'ÙƒÙ„ ØªØ¹Ø§Ù…Ù„ ÙŠÙ…Ø± Ø¨Ù…Ø±Ø§Ø­Ù„ ÙˆØ§Ø¶Ø­Ø©ØŒ ÙˆÙƒÙ„ Ù…Ø±Ø­Ù„Ø© ÙŠØ¬Ø¨ Ø£Ù† ØªÙ†ØªØ¬ Ù…Ø®Ø±Ø¬Ù‹Ø§ Ù‚Ø§Ø¨Ù„Ù‹Ø§ Ù„Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù….',
      steps: [
        { num: '01', title: 'Ø§Ù„ØªØ´Ø®ÙŠØµ', desc: 'Ù†ÙÙ‡Ù… Ø§Ù„Ø´Ø±ÙƒØ©ØŒ ÙØ±Ù‚ Ø§Ù„Ø¹Ù…Ù„ØŒ Ø§Ù„Ø£Ø¯ÙˆØ§ØªØŒ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§ØªØŒ ÙˆØ§Ù„Ù…Ø´ÙƒÙ„Ø§Øª Ø§Ù„Ø£Ø¹Ù„Ù‰ ØªØ£Ø«ÙŠØ±Ù‹Ø§.' },
        { num: '02', title: 'ØªØµÙ…ÙŠÙ… Ø§Ù„Ù…Ù†Ø¸ÙˆÙ…Ø©', desc: 'Ù†Ø±Ø³Ù… Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ØŒ Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠØ§ØªØŒ Ù†Ù‚Ø§Ø· Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø©ØŒ ÙˆØ§Ù„Ø·Ø¨Ù‚Ø§Øª Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø© Ù„Ù„Ù…Ø±Ø­Ù„Ø© Ø§Ù„Ø£ÙˆÙ„Ù‰.' },
        { num: '03', title: 'Ø¨Ù†Ø§Ø¡ Ø§Ù„Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ù„Ø·Ø¨Ù‚Ø§Øª', desc: 'Ù†Ø¨Ù†ÙŠ Ø§Ù„Ø¯Ø§Ø´Ø¨ÙˆØ±Ø¯ØŒ Ø§Ù„Ø£Ø¯ÙˆØ§ØªØŒ Ø§Ù„Ø£ØªÙ…ØªØ©ØŒ Ø§Ù„ÙˆÙƒÙ„Ø§Ø¡ØŒ Ø£Ùˆ Ø·Ø¨Ù‚Ø© Ø§Ù„Ù†Ù…Ùˆ Ø­Ø³Ø¨ Ø§Ù„Ù†Ø·Ø§Ù‚.' },
        { num: '04', title: 'Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© ÙˆØ§Ù„ØªØ¯Ø±ÙŠØ¨', desc: 'Ù†Ø®ØªØ¨Ø± Ø§Ù„Ù†Ø¸Ø§Ù… Ù…Ø¹ Ø§Ù„ÙØ±ÙŠÙ‚ ÙˆÙ†ÙˆØ«Ù‚ Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù… ÙˆÙ†Ø­Ø³Ù‘Ù† Ù…Ø§ ÙŠØ­ØªØ§Ø¬ ØªØ¹Ø¯ÙŠÙ„Ù‹Ø§.' },
        { num: '05', title: 'Ø§Ù„ØªØ´ØºÙŠÙ„ ÙˆØ§Ù„ØªØ­Ø³ÙŠÙ†', desc: 'Ù†Ø±Ø§Ù‚Ø¨ Ø§Ù„Ù†ØªØ§Ø¦Ø¬ØŒ Ù†Ø­Ø¯Ø« Ø§Ù„Ø£ÙˆÙ„ÙˆÙŠØ§ØªØŒ ÙˆÙ†Ø¶ÙŠÙ ØªØ­Ø³ÙŠÙ†Ø§Øª Ø´Ù‡Ø±ÙŠØ© Ø¹Ù†Ø¯ Ø§Ø³ØªÙ…Ø±Ø§Ø± Ø§Ù„ØªØ¹Ø§ÙˆÙ†.' },
      ],
      questions: {
        title: 'Ù‚Ø¨Ù„ ØªØ³Ù„ÙŠÙ… Ø£ÙŠ Ø­Ù„ØŒ ØªØ³Ø£Ù„ AURA:',
        items: [
          'Ù…Ø§ Ø§Ù„Ù…Ø´ÙƒÙ„Ø© Ø§Ù„Ù…Ø­Ø¯Ø¯Ø© Ø§Ù„ØªÙŠ ÙŠØ­Ù„Ù‡Ø§ Ù‡Ø°Ø§ØŸ',
          'Ù‡Ù„ Ø³ÙŠØ³ØªØ®Ø¯Ù…Ù‡ Ø§Ù„ÙØ±ÙŠÙ‚ ÙØ¹Ù„ÙŠÙ‹Ø§ØŸ',
          'ÙƒÙŠÙ Ù†Ø¹Ø±Ù Ø£Ù†Ù‡ ÙŠØ®Ù„Ù‚ Ù‚ÙŠÙ…Ø©ØŸ',
        ],
      },
    },
    packages: {
      badge: 'Ù†Ù…Ø§Ø°Ø¬ Ø§Ù„ØªØ¹Ø§ÙˆÙ†',
      title: 'Ù†Ù…Ø§Ø°Ø¬ Ø§Ù„ØªØ¹Ø§ÙˆÙ†',
      subtitle: 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£Ø³Ø¹Ø§Ø± Ø«Ø§Ø¨ØªØ© Ø£Ùˆ ÙˆØ¹ÙˆØ¯ Ø¹Ø§Ù…Ø©. ÙŠØªÙ… ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù†Ø·Ø§Ù‚ ÙˆØ§Ù„ØªÙƒÙ„ÙØ© Ø¨Ø¹Ø¯ Ø§Ù„ØªØ´Ø®ÙŠØµ.',
      sprint: {
        name: 'Ø§Ù„Ø³Ø¨Ø±Ù†Øª Ø§Ù„Ù…Ø±ÙƒØ²ÙŠ',
        subtitle: 'Ø·Ø¨Ù‚Ø© ÙˆØ§Ø­Ø¯Ø© Ø¨ØªØ±ÙƒÙŠØ² Ø¹Ù…ÙŠÙ‚ Ù„Ù…Ø¹Ø§Ù„Ø¬Ø© Ù…Ø´ÙƒÙ„Ø© Ù…Ø­Ø¯Ø¯Ø©',
        badge: '21-30 ÙŠÙˆÙ…',
        scope: 'Ø§Ù„Ù†Ø·Ø§Ù‚ ÙˆØ§Ù„ØªÙƒÙ„ÙØ© Ø¨Ø¹Ø¯ Ø§Ù„ØªØ´Ø®ÙŠØµ',
        features: [
          'ØªØ¯Ø®Ù„ Ù…Ø±ÙƒØ² Ø­ÙˆÙ„ Ù…Ø´ÙƒÙ„Ø© ØªØ´ØºÙŠÙ„ÙŠØ© ÙˆØ§Ø¶Ø­Ø©',
          'ØªØ´Ø®ÙŠØµ Ø§Ù„Ø·Ø¨Ù‚Ø© Ø§Ù„Ù…Ø®ØªØ§Ø±Ø©',
          'ØªØµÙ…ÙŠÙ… Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ø£Ùˆ Ø§Ù„Ø£Ø¯Ø§Ø© Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø©',
          'Ù…Ø®Ø±Ø¬ Ù‚Ø§Ø¨Ù„ Ù„Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù… ÙˆÙ„ÙŠØ³ ØªÙˆØµÙŠØ§Øª ÙÙ‚Ø·',
          'Ù…Ù†Ø§Ø³Ø¨ Ù„Ø§Ø®ØªØ¨Ø§Ø± Ø§Ù„ØªØ¹Ø§ÙˆÙ† Ø£Ùˆ Ø­Ù„ Ù†Ù‚Ø·Ø© ØªØ¹Ø·ÙŠÙ„ Ù…Ø­Ø¯Ø¯Ø©',
        ],
        cta: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„ØªØ´Ø®ÙŠØµ',
      },
      full: {
        name: 'Ù†Ø¸Ø§Ù… Ø§Ù„ØªØ³Ø±ÙŠØ¹ Ø§Ù„ÙƒØ§Ù…Ù„',
        subtitle: 'ØªØ­ÙˆÙŠÙ„ Ù…ØªØ¹Ø¯Ø¯ Ø§Ù„Ø·Ø¨Ù‚Ø§Øª Ø®Ù„Ø§Ù„ 3-6 Ø´Ù‡ÙˆØ±',
        badge: 'Ø§Ù„Ø£ÙƒØ«Ø± ØªÙƒØ§Ù…Ù„Ù‹Ø§',
        scope: 'Ù†Ø·Ø§Ù‚ Ù…Ø¤Ø³Ø³ÙŠ Ù…Ø®ØµØµ',
        features: [
          'ØªÙ†ÙÙŠØ° Ø¹Ø¯Ø© Ø·Ø¨Ù‚Ø§Øª Ù…ØªÙƒØ§Ù…Ù„Ø©',
          'ØªØ´Ø®ÙŠØµ ÙˆØªØµÙ…ÙŠÙ… Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ ÙˆØ§Ù„Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ù„Ø£ØªÙ…ØªØ©',
          'Ø±Ø¤ÙŠØ© ØªØ´ØºÙŠÙ„ÙŠØ© ÙˆÙ„ÙˆØ­Ø§Øª Ù…ØªØ§Ø¨Ø¹Ø© Ù„Ù„Ù‚ÙŠØ§Ø¯Ø©',
          'Ù…Ø±Ø§Ø¬Ø¹Ø© ÙˆØªØ¯Ø±ÙŠØ¨ ÙˆØªÙˆØ«ÙŠÙ‚ Ù„Ù„ÙØ±ÙŠÙ‚',
          'Ø®Ø§Ø±Ø·Ø© ØªØ·ÙˆÙŠØ± ÙˆØ­ÙˆÙƒÙ…Ø© Ù„Ù„Ù…Ø±Ø§Ø­Ù„ Ø§Ù„ØªØ§Ù„ÙŠØ©',
        ],
        cta: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„ØªØ´Ø®ÙŠØµ',
      },
      managed: {
        name: 'Ø´Ø±ÙŠÙƒ Ø§Ù„ØªØ­Ø³ÙŠÙ† Ø§Ù„Ù…Ø³ØªÙ…Ø±',
        subtitle: 'Ù…ØªØ§Ø¨Ø¹Ø© Ø´Ù‡Ø±ÙŠØ© Ø¨Ø¹Ø¯ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚',
        badge: 'Ø´Ù‡Ø±ÙŠ',
        scope: 'Ù†Ø·Ø§Ù‚ Ø´Ù‡Ø±ÙŠ Ù…Ø®ØµØµ',
        description: 'Ù…ØªØ§Ø¨Ø¹Ø© ÙˆØªØ­Ø³ÙŠÙ† Ù…Ø³ØªÙ…Ø± Ù„Ù„Ù…Ù†Ø¸ÙˆÙ…Ø© Ø¨Ø¹Ø¯ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚: ØªÙ‚Ø§Ø±ÙŠØ±ØŒ ØªØ­Ø¯ÙŠØ«Ø§ØªØŒ Ø£ØªÙ…ØªØ©ØŒ ØªØ­Ø³ÙŠÙ†Ø§ØªØŒ ÙˆØ£ÙˆÙ„ÙˆÙŠØ§Øª Ø´Ù‡Ø±ÙŠØ©.',
        features: ['Ù…Ø±Ø§Ø¬Ø¹Ø© Ø´Ù‡Ø±ÙŠØ© Ù„Ù„Ù†Ø¸Ø§Ù…', 'Ø®Ø§Ø±Ø·Ø© Ø£ÙˆÙ„ÙˆÙŠØ§Øª', 'ØªØ­Ø¯ÙŠØ« Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„', 'ØªØ­Ø³ÙŠÙ† Ø§Ù„Ø£ØªÙ…ØªØ©', 'ØªØ·ÙˆÙŠØ± Ø§Ù„ØªÙ‚Ø§Ø±ÙŠØ±', 'Ø·Ù„Ø¨Ø§Øª ÙˆØªØ­Ø³ÙŠÙ†Ø§Øª Ø¬Ø¯ÙŠØ¯Ø©'],
        cta: 'Ù†Ø§Ù‚Ø´ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ø´Ù‡Ø±ÙŠØ©',
      },
      guide: {
        title: 'Ù…Ø§ Ø§Ù„Ù†Ù…ÙˆØ°Ø¬ Ø§Ù„Ø£Ù†Ø³Ø¨ØŸ',
        items: [
          { if: 'Ø¥Ø°Ø§ Ø£Ø±Ø¯Øª Ø§Ø®ØªØ¨Ø§Ø± Ø§Ù„Ø§Ø³ØªÙˆØ¯ÙŠÙˆ Ø£Ùˆ Ø­Ù„ Ù†Ù‚Ø·Ø© ØªØ´ØºÙŠÙ„ÙŠØ© ÙˆØ§Ø¶Ø­Ø©', then: 'Ø§Ù„Ø³Ø¨Ø±Ù†Øª Ø§Ù„Ù…Ø±ÙƒØ²ÙŠ' },
          { if: 'Ø¥Ø°Ø§ Ø§Ø­ØªØ§Ø¬Øª Ø§Ù„Ø¥Ø¯Ø§Ø±Ø© Ø·Ø¨Ù‚Ø© ØªØ´ØºÙŠÙ„ ÙƒØ§Ù…Ù„Ø© Ø¨ÙŠÙ† Ø§Ù„ÙØ±Ù‚ ÙˆØ§Ù„Ø¨ÙŠØ§Ù†Ø§Øª', then: 'Ù†Ø¸Ø§Ù… Ø§Ù„ØªØ³Ø±ÙŠØ¹ Ø§Ù„ÙƒØ§Ù…Ù„' },
          { if: 'Ø¥Ø°Ø§ ÙƒØ§Ù† Ø§Ù„Ù†Ø¸Ø§Ù… Ù‚Ø§Ø¦Ù…Ù‹Ø§ ÙˆÙŠØ­ØªØ§Ø¬ Ù…ØªØ§Ø¨Ø¹Ø© ÙˆØªØ­Ø³ÙŠÙ† Ø´Ù‡Ø±ÙŠ', then: 'Ø´Ø±ÙŠÙƒ Ø§Ù„ØªØ­Ø³ÙŠÙ† Ø§Ù„Ù…Ø³ØªÙ…Ø±' },
          { if: 'Ø¥Ø°Ø§ ÙƒØ§Ù† Ø§Ù„Ù†Ø·Ø§Ù‚ ØºÙŠØ± ÙˆØ§Ø¶Ø­', then: 'Ø§Ø¨Ø¯Ø£ Ø¨Ø§Ù„ØªØ´Ø®ÙŠØµ Ø«Ù… Ù†Ø­Ø¯Ø¯ Ø§Ù„Ø·Ø¨Ù‚Ø© Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø©' },
        ],
      },
      scopeNote: 'ÙŠÙØ­Ø¯Ø¯ Ø§Ù„Ù†Ø·Ø§Ù‚ ÙˆØ§Ù„ØªÙƒÙ„ÙØ© Ø¨Ø¹Ø¯ Ø§Ù„ØªØ´Ø®ÙŠØµ Ù„Ø£Ù† Ø§Ù„Ù†ØªØ§Ø¦Ø¬ ØªØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ø­Ø¬Ù… Ø§Ù„Ø´Ø±ÙƒØ©ØŒ Ø¬ÙˆØ¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§ØªØŒ ØªØ¹Ù‚ÙŠØ¯ Ø§Ù„ØªØ´ØºÙŠÙ„ØŒ ÙˆØ§Ù„ØªØ²Ø§Ù… Ø§Ù„ÙØ±ÙŠÙ‚ Ø¨Ø§Ù„ØªØ·Ø¨ÙŠÙ‚.',
    },
    differentiators: {
      badge: 'Ù„Ù…Ø§Ø°Ø§ AURA',
      title: 'Ù„Ù…Ø§Ø°Ø§ AURAØŸ',
      items: [
        { icon: 'layers', title: 'Ù†Ø±Ù‰ Ø§Ù„Ø´Ø±ÙƒØ© ÙƒÙ†Ø¸Ø§Ù… ÙƒØ§Ù…Ù„', desc: 'Ù„Ø§ Ù†ÙØµÙ„ Ø§Ù„ØªØ³ÙˆÙŠÙ‚ Ø¹Ù† Ø§Ù„ØªØ´ØºÙŠÙ„ØŒ ÙˆÙ„Ø§ Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø¹Ù† Ø§Ù„Ù‚Ø±Ø§Ø±Ø§Øª. Ù†Ø¨Ù†ÙŠ Ø·Ø¨Ù‚Ø© ØªØ±Ø¨Ø· ÙƒÙ„ Ø°Ù„Ùƒ.', quote: 'Ø±Ø¤ÙŠØ© ØªØ´ØºÙŠÙ„ ÙˆØ§Ø­Ø¯Ø© Ø£ÙØ¶Ù„ Ù…Ù† Ø£Ø¯Ø§Ø© Ø¥Ø¶Ø§ÙÙŠØ© Ù…Ù†ÙØµÙ„Ø©.' },
        { icon: 'target', title: 'Ù†Ø¨Ø¯Ø£ Ø¨Ø§Ù„Ù…Ø´ÙƒÙ„Ø© Ù„Ø§ Ø¨Ø§Ù„ØªÙ‚Ù†ÙŠØ©', desc: 'Ù„Ø§ Ù†Ø¶ÙŠÙ AI Ø£Ùˆ dashboards Ù„Ù…Ø¬Ø±Ø¯ Ø§Ù„Ø¥Ø¨Ù‡Ø§Ø±. ÙƒÙ„ Ø·Ø¨Ù‚Ø© ÙŠØ¬Ø¨ Ø£Ù† ØªØ­Ù„ Ù…Ø´ÙƒÙ„Ø© ØªØ´ØºÙŠÙ„ÙŠØ© ÙˆØ§Ø¶Ø­Ø©.', quote: 'Ø§Ù„Ø³Ø¤Ø§Ù„ Ù„ÙŠØ³: Ù‡Ù„ ÙŠÙ…ÙƒÙ† Ø£ØªÙ…ØªØªÙ‡ØŸ Ø¨Ù„: Ù‡Ù„ Ø³ÙŠØ­Ø³Ù† Ø§Ù„Ø¹Ù…Ù„ØŸ' },
        { icon: 'settings', title: 'Ù…Ù†Ø§Ø³Ø¨ Ù„Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„Ù…Ø¹Ù‚Ø¯Ø©', desc: 'ÙƒÙ„Ù…Ø§ Ø²Ø§Ø¯ Ø¹Ø¯Ø¯ Ø§Ù„ÙØ±Ù‚ ÙˆØ§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ ÙˆØ§Ù„Ø¨ÙŠØ§Ù†Ø§ØªØŒ Ø²Ø§Ø¯Øª Ù‚ÙŠÙ…Ø© ÙˆØ¬ÙˆØ¯ Ù†Ø¸Ø§Ù… ÙˆØ§Ø¶Ø­.', quote: 'Ø§Ù„ØªØ¹Ù‚ÙŠØ¯ ÙŠØ­ØªØ§Ø¬ Ù‡ÙŠÙƒÙ„Ø© Ù‚Ø¨Ù„ Ø§Ù„Ø³Ø±Ø¹Ø©.' },
        { icon: 'bot', title: 'Ø°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ØªØ­Øª Ø¥Ø´Ø±Ø§Ù Ø¨Ø´Ø±ÙŠ', desc: 'Ø§Ù„ÙˆÙƒÙ„Ø§Ø¡ ÙˆØ§Ù„Ø£ØªÙ…ØªØ© ÙŠØ¹Ù…Ù„ÙˆÙ† Ø¯Ø§Ø®Ù„ Ù†Ù‚Ø§Ø· Ù…Ø±Ø§Ø¬Ø¹Ø© ØªØ­Ø§ÙØ¸ Ø¹Ù„Ù‰ Ø§Ù„Ø¬ÙˆØ¯Ø© ÙˆØ§Ù„Ù‚Ø±Ø§Ø±.', quote: 'Ø§Ù„Ø£ØªÙ…ØªØ© ØªØ¯Ø¹Ù… Ø§Ù„Ù‚ÙŠØ§Ø¯Ø© ÙˆÙ„Ø§ ØªØ³ØªØ¨Ø¯Ù„ Ø§Ù„Ø­ÙƒÙ… Ø§Ù„Ø¨Ø´Ø±ÙŠ.' },
        { icon: 'refresh', title: 'Ù‚Ø§Ø¨Ù„ Ù„Ù„ØªÙˆØ³Ø¹', desc: 'Ù†Ø¨Ø¯Ø£ Ø¨Ø·Ø¨Ù‚Ø© Ø£Ùˆ Ø³Ø¨Ø±Ù†ØªØŒ Ø«Ù… Ù†ÙˆØ³Ø¹ Ø§Ù„Ù…Ù†Ø¸ÙˆÙ…Ø© Ø­Ø³Ø¨ Ø§Ù„Ù†ØªØ§Ø¦Ø¬ ÙˆØ§Ù„Ø£ÙˆÙ„ÙˆÙŠØ©.', quote: 'Ø£ÙØ¶Ù„ Ù†Ø¸Ø§Ù… ÙŠÙƒØ¨Ø± Ø¯ÙˆÙ† Ø£Ù† ÙŠÙÙ‚Ø¯ ÙˆØ¶ÙˆØ­Ù‡.' },
      ],
    },
    examples: {
      badge: 'Ø£Ù…Ø«Ù„Ø© ØªØ´ØºÙŠÙ„ÙŠØ©',
      title: 'ÙƒÙŠÙ ÙŠÙ…ÙƒÙ† Ø£Ù† ÙŠØ¨Ø¯Ùˆ Ù†Ø¸Ø§Ù… AURAØŸ',
      items: [
        {
          icon: 'layers',
          title: 'Ù…Ø¬Ù…ÙˆØ¹Ø© Ø´Ø±ÙƒØ§Øª',
          challenge: 'Ø´Ø±ÙƒØ§Øª ØªØ§Ø¨Ø¹Ø©ØŒ ÙˆØ­Ø¯Ø§ØªØŒ Ø£ÙˆÙ„ÙˆÙŠØ§ØªØŒ ØªÙ‚Ø§Ø±ÙŠØ±ØŒ ÙˆÙ…ØªØ§Ø¨Ø¹Ø© ØªØªØ­Ø±Ùƒ Ø¨Ø·Ø±Ù‚ Ù…Ø®ØªÙ„ÙØ©.',
          result: ['Ø±Ø¤ÙŠØ© ØªØ´ØºÙŠÙ„ Ù…ÙˆØ­Ø¯Ø©', 'ØªØªØ¨Ø¹ Ø£ÙˆÙ„ÙˆÙŠØ§Øª Ø¨ÙŠÙ† Ø§Ù„ÙˆØ­Ø¯Ø§Øª', 'ØªÙ‚Ø§Ø±ÙŠØ± Ù…Ù†Ø§Ø³Ø¨Ø© Ù„Ù„Ù‚ÙŠØ§Ø¯Ø©', 'Ù…Ø³Ø§Ø± ØªØµØ¹ÙŠØ¯ ÙˆØ§Ø¶Ø­'],
        },
        {
          icon: 'trend',
          title: 'Ø´Ø±ÙƒØ© ØªØ·ÙˆÙŠØ± Ø¹Ù‚Ø§Ø±ÙŠ',
          challenge: 'Ø§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹ ÙˆØ¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ø´ØªØ±ÙŠÙ† ÙˆØ§Ù„Ø­Ù…Ù„Ø§Øª ÙˆØ§Ù„Ù…Ø®Ø²ÙˆÙ† ÙˆØ§Ù„Ù…ØªØ§Ø¨Ø¹Ø© ÙˆØ§Ù„Ù…Ø­ØªÙˆÙ‰ ØºÙŠØ± Ù…ØªØ±Ø§Ø¨Ø·Ø©.',
          result: ['Ø±Ø¨Ø· Ø§Ù„Ø­Ù…Ù„Ø§Øª Ø¨Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª', 'ØªÙ‚Ø³ÙŠÙ… Ø§Ù„Ù…Ø´ØªØ±ÙŠÙ†', 'Ø·Ø¨Ù‚Ø© Ø¹Ø±Ø¶ ØªÙØ§Ø¹Ù„ÙŠØ© Ø¹Ù†Ø¯ Ø§Ù„Ø­Ø§Ø¬Ø©', 'Ù…Ø³Ø§Ø± ÙˆØ§Ø¶Ø­ Ù„ØªÙ…ÙƒÙŠÙ† Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª'],
        },
        {
          icon: 'bot',
          title: 'Ø·Ø¨Ù‚Ø© ØªØ´ØºÙŠÙ„ Ø¨Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ',
          challenge: 'Ø§Ù„ØªÙ‚Ø§Ø±ÙŠØ± ÙˆØ§Ù„ØªØ­Ù„ÙŠÙ„ ÙˆØ§Ù„ØªØ°ÙƒÙŠØ± ÙˆØ§Ù„Ø¨Ø­Ø« ØªØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ù…ØªØ§Ø¨Ø¹Ø© ÙŠØ¯ÙˆÙŠØ©.',
          result: ['ÙˆÙƒÙ„Ø§Ø¡ Ø°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ù…ØªØ®ØµØµÙˆÙ†', 'Ù†Ù‚Ø§Ø· Ù…ÙˆØ§ÙÙ‚Ø© Ø¨Ø´Ø±ÙŠØ©', 'Ø¥ÙŠÙ‚Ø§Ø¹ ØªÙ‚Ø§Ø±ÙŠØ± Ø¢Ù„ÙŠ', 'Ù‚Ø§Ø¦Ù…Ø© ØªØ­Ø³ÙŠÙ† Ù…Ø³ØªÙ…Ø±Ø©'],
        },
        {
          icon: 'chart',
          title: 'Ø°ÙƒØ§Ø¡ Ø§Ù„Ù‚Ø±Ø§Ø±',
          challenge: 'ØªØµÙ„ Ø§Ù„Ø­Ø§Ù„Ø© Ù„Ù„Ø¥Ø¯Ø§Ø±Ø© Ù…ØªØ£Ø®Ø±Ø©ØŒ ÙˆØªÙØªØ®Ø° Ø§Ù„Ù‚Ø±Ø§Ø±Ø§Øª Ø¨Ù„Ø§ ØµÙˆØ±Ø© Ø¨ÙŠØ§Ù†Ø§Øª Ù…Ø´ØªØ±ÙƒØ©.',
          result: ['Ø¯Ø§Ø´Ø¨ÙˆØ±Ø¯ ØªØ´ØºÙŠÙ„ Ù…ÙˆØ­Ø¯', 'Ù…Ù‚Ø§Ø±Ù†Ø© Ø³ÙŠÙ†Ø§Ø±ÙŠÙˆÙ‡Ø§Øª', 'Ø±Ø¤ÙŠØ© Ù…Ø¨ÙƒØ±Ø© Ù„Ù„Ù…Ø®Ø§Ø·Ø±', 'Ù‡ÙŠÙƒÙ„Ø© Ø£ÙØ¶Ù„ Ù„Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ÙŠØ©'],
        },
      ],
    },
    contact: {
      badge: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„Ø¢Ù†',
      title: 'Ø§Ø¨Ø¯Ø£ Ø¨ØªØ´Ø®ÙŠØµ Ù…Ù†Ø¸ÙˆÙ…Ø© Ø§Ù„Ø¹Ù…Ù„',
      subtitle: 'Ø´Ø§Ø±ÙƒÙ†Ø§ Ø·Ø¨ÙŠØ¹Ø© Ø´Ø±ÙƒØªÙƒØŒ Ø¹Ø¯Ø¯ Ø§Ù„ÙØ±Ù‚ Ø£Ùˆ Ø§Ù„ÙˆØ­Ø¯Ø§ØªØŒ ÙˆØ£ÙƒØ¨Ø± Ù†Ù‚Ø·Ø© ØªØ¹Ø·ÙŠÙ„ Ø­Ø§Ù„ÙŠÙ‹Ø§. Ø³Ù†Ù‚ØªØ±Ø­ Ø£ÙˆÙ„ Ø·Ø¨Ù‚Ø© ØªØ¯Ø®Ù„ Ù…Ù†Ø§Ø³Ø¨Ø©.',
      email: 'amirelshazly66@gmail.com',
      phone: '+20 102 924 0066',
      location: 'Ù…ØµØ± / Ø¹Ù† Ø¨ÙØ¹Ø¯',
      details: {
        email: 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ',
        whatsapp: 'ÙˆØ§ØªØ³Ø§Ø¨',
        location: 'Ø§Ù„Ù…ÙˆÙ‚Ø¹',
      },
      actions: [
        {
          label: 'A',
          icon: 'target',
          title: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„ØªØ´Ø®ÙŠØµ',
          text: 'Ø£Ø®Ø¨Ø±Ù†Ø§ Ø£ÙŠÙ† ÙŠØ¨Ø¯Ùˆ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø¨Ø·ÙŠØ¦Ù‹Ø§ØŒ Ù…ØªÙØ±Ù‚Ù‹Ø§ØŒ ØºÙŠØ± Ù…Ø±Ø¦ÙŠØŒ Ø£Ùˆ ØµØ¹Ø¨ Ø§Ù„Ø³ÙŠØ·Ø±Ø©.',
          cta: 'Ø§Ø¨Ø¯Ø£ Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨',
          type: 'diagnosis',
        },
        {
          label: 'B',
          icon: 'book',
          title: 'Ø£Ø±Ø³Ù„ Ù†Ø¨Ø°Ø© Ø¹Ù† Ø§Ù„Ø´Ø±ÙƒØ©',
          text: 'Ø´Ø§Ø±ÙƒÙ†Ø§ Ù†Ø¨Ø°Ø© Ø¹Ù† Ø§Ù„Ø´Ø±ÙƒØ©ØŒ Ù‡ÙŠÙƒÙ„ Ø§Ù„ÙØ±Ù‚ØŒ Ø§Ù„Ø£Ù†Ø¸Ù…Ø© Ø§Ù„Ø­Ø§Ù„ÙŠØ©ØŒ ÙˆÙ†Ù‚Ø·Ø© Ø§Ù„ØªØ¹Ø·ÙŠÙ„ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©.',
          cta: 'Ø£Ø±Ø³Ù„ Ø¨Ø±ÙŠØ¯Ù‹Ø§',
          type: 'brief',
        },
        {
          label: 'C',
          icon: 'refresh',
          title: 'Ù†Ø§Ù‚Ø´ Ø­Ø§Ù„Ø© Ø´Ø±ÙƒØªÙƒ',
          text: 'Ù„Ù„Ù…Ø¬Ù…ÙˆØ¹Ø§ØªØŒ Ø´Ø±ÙƒØ§Øª Ø§Ù„Ø¹Ù‚Ø§Ø±Ø§ØªØŒ Ø£Ùˆ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø§Ù„Ù…Ø¹Ù‚Ø¯ Ø§Ù„Ø°ÙŠ ÙŠØ­ØªØ§Ø¬ Ø·Ø¨Ù‚Ø© ØªØ´ØºÙŠÙ„ Ù…Ø®ØµØµØ©.',
          cta: 'Ù†Ø§Ù‚Ø´ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø©',
          type: 'monthly',
        },
      ],
    },
    footer: {
      tagline: 'Ø§Ø³ØªÙˆØ¯ÙŠÙˆ ØªØ³Ø±ÙŠØ¹ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ Ù„Ù„Ù…Ø¤Ø³Ø³Ø§Øª',
      rights: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ù‚ÙˆÙ‚ Ù…Ø­ÙÙˆØ¸Ø©.',
      built: 'Ø¨ÙÙ†ÙŠ Ø¨Ø¯Ù‚Ø©.',
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
      badge: 'AURA Â· Business Acceleration Studio',
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
          solution: 'We build dashboards, trackers, forms, and lightweight databases designed around the companyâ€™s real way of working.',
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
      scopeNote: 'Scope and pricing are defined after the study so the work matches the companyâ€™s actual problem, team, tools, and data quality.',
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
      home: 'Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©',
      services: 'Ø§Ù„Ø®Ø¯Ù…Ø§Øª',
      process: 'Ø§Ù„Ù…Ù†Ù‡Ø¬ÙŠØ©',
      packages: 'Ø§Ù„ØªØ¹Ø§ÙˆÙ†',
      why: 'Ø§Ù„Ù‚ÙŠÙ…Ø©',
      contact: 'Ø§Ø¨Ø¯Ø£',
      cta: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„ØªØ´Ø®ÙŠØµ',
    },
    loader: {
      tagline: 'Ø§Ø³ØªÙˆØ¯ÙŠÙˆ ØªØ³Ø±ÙŠØ¹ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„',
      line1: 'Ù†Ø­ÙˆÙ‘Ù„ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø§Ù„Ù…ØªÙØ±Ù‚ Ø¥Ù„Ù‰ Ù†Ø¸Ø§Ù… ÙˆØ§Ø¶Ø­.',
      line2: 'Ø³ÙŠØ± Ø¹Ù…Ù„. Ø£Ø¯ÙˆØ§Øª. Ø£ØªÙ…ØªØ©. Ù†Ù…Ùˆ.',
    },
    hero: {
      badge: 'AURA Â· Ø§Ø³ØªÙˆØ¯ÙŠÙˆ ØªØ³Ø±ÙŠØ¹ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„',
      title1: 'Ø­ÙˆÙ‘Ù„ ØªØ´ØºÙŠÙ„',
      title2: 'Ø´Ø±ÙƒØªÙƒ',
      title3: 'Ø¥Ù„Ù‰ Ù…Ù†Ø¸ÙˆÙ…Ø©',
      title4: 'ÙˆØ§Ø¶Ø­Ø©.',
      subheadline: 'Ù†Ø³Ø§Ø¹Ø¯ Ø§Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© Ø¹Ù„Ù‰ ØªÙ†Ø¸ÙŠÙ… Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ØŒ Ø¨Ù†Ø§Ø¡ Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØ©ØŒ Ø±Ø¨Ø· Ø§Ù„Ø£ØªÙ…ØªØ© ÙˆØ§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠØŒ ÙˆØªØ­ÙˆÙŠÙ„ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„ÙŠÙˆÙ…ÙŠØ© Ø¥Ù„Ù‰ Ù†Ø¸Ø§Ù… Ù‚Ø§Ø¨Ù„ Ù„Ù„Ù‚ÙŠØ§Ø³ ÙˆØ§Ù„Ù†Ù…Ùˆ.',
      description: 'Ø¥Ø°Ø§ ÙƒØ§Ù†Øª Ø´Ø±ÙƒØªÙƒ ØªØ¹Ù…Ù„ Ø¨Ø§Ù„ÙØ¹Ù„ Ù„ÙƒÙ† Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© ØªØªÙ… Ø¹Ø¨Ø± Ø±Ø³Ø§Ø¦Ù„ØŒ Ø¬Ø¯Ø§ÙˆÙ„ØŒ Ø£Ø¯ÙˆØ§Øª Ù…ØªÙØ±Ù‚Ø©ØŒ ÙˆÙ‚Ø±Ø§Ø±Ø§Øª ØºÙŠØ± Ù…Ø±Ø¦ÙŠØ©ØŒ ÙØ§Ù„Ù…Ø´ÙƒÙ„Ø© Ù„ÙŠØ³Øª ÙÙŠ Ù…Ø¬Ù‡ÙˆØ¯ Ø§Ù„ÙØ±ÙŠÙ‚. Ø§Ù„Ù…Ø´ÙƒÙ„Ø© ÙÙŠ ØºÙŠØ§Ø¨ Ù†Ø¸Ø§Ù… ØªØ´ØºÙŠÙ„ ÙˆØ§Ø¶Ø­.',
      cta1: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„ØªØ´Ø®ÙŠØµ',
      cta2: 'Ø§Ø³ØªØ¹Ø±Ø¶ Ø§Ù„Ø®Ø¯Ù…Ø§Øª',
      trust: 'Ù…ØµÙ…Ù… Ù„Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„ØªÙŠ Ù„Ø¯ÙŠÙ‡Ø§ ÙØ±Ù‚ØŒ Ø¹Ù…Ù„Ø§Ø¡ØŒ Ø¹Ù…Ù„ÙŠØ§ØªØŒ ÙˆØ§Ø­ØªÙŠØ§Ø¬ Ø­Ù‚ÙŠÙ‚ÙŠ Ù„Ù†Ø¸Ø§Ù… Ø£ÙˆØ¶Ø­.',
    },
    why: {
      badge: 'Ø§Ù„Ù…Ø´ÙƒÙ„Ø© ÙˆØ§Ù„Ù‚ÙŠÙ…Ø©',
      title: 'Ø§Ù„Ø´Ø±ÙƒØ§Øª Ù„Ø§ ØªØ®Ø³Ø± Ø§Ù„ÙˆÙ‚Øª ÙØ¬Ø£Ø©. ØªØ®Ø³Ø±Ù‡ ÙÙŠ Ø§Ù„ØªÙØ§ØµÙŠÙ„ Ø§Ù„ÙŠÙˆÙ…ÙŠØ©.',
      subtitle: 'Ù‚ÙŠÙ…Ø© AURA ØªØ¸Ù‡Ø± Ø¨Ø³Ø±Ø¹Ø©: Ù…ØªØ§Ø¨Ø¹Ø© Ø£Ù‚Ù„ ØªØ´ØªØªÙ‹Ø§ØŒ Ù…Ø³Ø¤ÙˆÙ„ÙŠØ§Øª Ø£ÙˆØ¶Ø­ØŒ ÙˆÙ†Ø¸Ø§Ù… ÙŠÙ…ÙƒÙ† Ù„Ù„Ø¥Ø¯Ø§Ø±Ø© Ø§Ø³ØªØ®Ø¯Ø§Ù…Ù‡ ÙØ¹Ù„ÙŠÙ‹Ø§.',
      problems: [
        { icon: 'scatter', title: 'Ù…ØªØ§Ø¨Ø¹Ø© Ù…ØªÙØ±Ù‚Ø©', desc: 'Ø§Ù„Ø¹Ù…Ù„ Ù…ÙˆØ²Ø¹ Ø¨ÙŠÙ† ÙˆØ§ØªØ³Ø§Ø¨ØŒ Ø¬Ø¯Ø§ÙˆÙ„ØŒ Ø°Ø§ÙƒØ±Ø© Ø§Ù„ÙØ±ÙŠÙ‚ØŒ ÙˆØ£Ø¯ÙˆØ§Øª Ù„Ø§ ØªØªÙƒÙ„Ù… Ù…Ø¹ Ø¨Ø¹Ø¶Ù‡Ø§.' },
        { icon: 'delay', title: 'Ù‚Ø±Ø§Ø±Ø§Øª Ø¨Ù„Ø§ Ø±Ø¤ÙŠØ© ÙƒØ§Ù…Ù„Ø©', desc: 'Ø§Ù„Ø¥Ø¯Ø§Ø±Ø© ØªØ±Ù‰ Ø£Ø¬Ø²Ø§Ø¡ Ù…Ù† Ø§Ù„ØµÙˆØ±Ø©ØŒ Ù„ÙƒÙ† Ù„Ø§ ØªØ±Ù‰ Ø£ÙŠÙ† ÙŠØªØ¹Ø·Ù„ Ø§Ù„Ø¹Ù…Ù„ Ø£Ùˆ Ø£ÙŠÙ† ØªØ¶ÙŠØ¹ Ø§Ù„ÙØ±Øµ.' },
        { icon: 'settings', title: 'Ø£Ø¯ÙˆØ§Øª Ù„Ø§ ØªÙ†Ø§Ø³Ø¨ Ø§Ù„ÙˆØ§Ù‚Ø¹', desc: 'Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø£Ø¯ÙˆØ§Øª Ø¬Ø§Ù‡Ø²Ø© Ù„Ø§ ØªØ¹ÙƒØ³ Ø·Ø±ÙŠÙ‚Ø© Ø¹Ù…Ù„ Ø§Ù„ÙØ±ÙŠÙ‚ ÙŠØ¤Ø¯ÙŠ ØºØ§Ù„Ø¨Ù‹Ø§ Ù„Ù„Ø¹ÙˆØ¯Ø© Ø¥Ù„Ù‰ Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„ÙŠØ¯ÙˆÙŠ.' },
        { icon: 'bot', title: 'Ø°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ø¨Ù„Ø§ Ù†Ø¸Ø§Ù…', desc: 'AI Ø¨Ø¯ÙˆÙ† Ø±Ø¨Ø· Ø¨Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠ ÙŠÙ†ØªØ¬ Ø¶Ø¬ÙŠØ¬Ù‹Ø§ Ø£ÙƒØ«Ø± Ù…Ù† Ù‚ÙŠÙ…Ø©.' },
      ],
      solution: {
        title: 'AURA Ù„Ø§ ØªØ¶ÙŠÙ Ø£Ø¯Ø§Ø© Ø¬Ø¯ÙŠØ¯Ø© ÙÙ‚Ø·.',
        desc: 'AURA ØªØ¹ÙŠØ¯ Ø¨Ù†Ø§Ø¡ Ø·Ø±ÙŠÙ‚Ø© Ø§Ù„Ø¹Ù…Ù„ Ù†ÙØ³Ù‡Ø§: Ø³ÙŠØ± Ø¹Ù…Ù„ØŒ Ø£Ø¯ÙˆØ§Øª Ø¯Ø§Ø®Ù„ÙŠØ©ØŒ Ø£ØªÙ…ØªØ©ØŒ Ø£Ù†Ø¸Ù…Ø© Ù†Ù…ÙˆØŒ ÙˆØ­Ù„ÙˆÙ„ Ù…ØªØ®ØµØµØ© ÙÙ‚Ø· Ø¹Ù†Ø¯Ù…Ø§ ØªÙƒÙˆÙ† Ù‚ÙŠÙ…ØªÙ‡Ø§ ÙˆØ§Ø¶Ø­Ø© Ù„Ù„Ø´Ø±ÙƒØ©.',
      },
    },
    services: {
      badge: '5 Ø®Ø·ÙˆØ· Ø®Ø¯Ù…Ø©',
      title: 'Ø®Ù…Ø³ Ø®Ø·ÙˆØ· Ø®Ø¯Ù…Ø© ÙˆØ§Ø¶Ø­Ø©',
      subtitle: 'Ù†Ø¨Ø¯Ø£ Ø¨ÙÙ‡Ù… Ø·Ø±ÙŠÙ‚Ø© Ø¹Ù…Ù„ Ø§Ù„Ø´Ø±ÙƒØ©ØŒ Ø«Ù… Ù†Ø®ØªØ§Ø± Ø§Ù„Ø®Ø· Ø§Ù„Ø°ÙŠ ÙŠØ­Ù‚Ù‚ Ø£ÙƒØ¨Ø± Ø£Ø«Ø±: Ø³ÙŠØ± Ø¹Ù…Ù„ØŒ Ø£Ø¯ÙˆØ§ØªØŒ Ø£ØªÙ…ØªØ©ØŒ Ù†Ù…ÙˆØŒ Ø£Ùˆ Ø­Ù„ÙˆÙ„ Ù…ØªØ®ØµØµØ©.',
      layers: [
        {
          num: '01',
          title: 'ØªØµÙ…ÙŠÙ… Ù†Ø¸Ø§Ù… Ø§Ù„ØªØ´ØºÙŠÙ„ ÙˆØ³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„',
          problem: 'Ø¹Ù†Ø¯Ù…Ø§ Ù„Ø§ ÙŠÙƒÙˆÙ† ÙˆØ§Ø¶Ø­Ù‹Ø§ Ø£ÙŠÙ† ÙŠÙ‚Ù Ø§Ù„Ø¹Ù…Ù„ØŒ Ù…Ù† Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ØŒ ÙˆÙ„Ù…Ø§Ø°Ø§ ØªØªØ£Ø®Ø± Ø§Ù„ØªØ³Ù„ÙŠÙ…Ø§Øª.',
          solution: 'Ù†Ø±Ø³Ù… Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠØŒ Ù†Ø­Ø¯Ø¯ Ø§Ù„Ù…Ø±Ø§Ø­Ù„ ÙˆØ§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠØ§ØªØŒ ÙˆÙ†Ø¨Ù†ÙŠ Ø¥ÙŠÙ‚Ø§Ø¹ Ù…ØªØ§Ø¨Ø¹Ø© Ø£Ø³Ø¨ÙˆØ¹ÙŠ ÙˆÙ…Ø¤Ø´Ø±Ø§Øª ÙˆØ§Ø¶Ø­Ø©.',
          kpis: ['Ø®Ø±ÙŠØ·Ø© Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„', 'Ù…Ø±Ø§Ø­Ù„ ÙˆÙ…Ø³Ø¤ÙˆÙ„ÙŠØ§Øª', 'Ù‚ÙˆØ§Ù„Ø¨ Ù…ØªØ§Ø¨Ø¹Ø©', 'Ù…Ø¤Ø´Ø±Ø§Øª Ø£Ø¯Ø§Ø¡', 'Ø£Ù‡Ù… Ù†Ù‚Ø§Ø· Ø§Ù„ØªØ¹Ø·ÙŠÙ„'],
          impact: 'Ù†Ù…Ø§Ø°Ø¬ Ù…Ø±ØªØ¨Ø·Ø©: Ù„ÙˆØ­Ø§Øª ØªØ´ØºÙŠÙ„ ÙˆÙ…ØªØ§Ø¨Ø¹Ø©.',
          icon: 'flow',
          proofId: 'workflow-dashboard',
          proofTitle: 'Ù†Ù…ÙˆØ°Ø¬ Ù„ÙˆØ­Ø© ØªØ´ØºÙŠÙ„',
          cta: 'Ø§Ø¹Ø±Ù Ù‡Ù„ ÙŠÙ†Ø§Ø³Ø¨ Ø´Ø±ÙƒØªÙƒ',
        },
        {
          num: '02',
          title: 'Ø§Ù„Ø£Ø¯ÙˆØ§Øª ÙˆØ§Ù„Ø¨Ø±Ù…Ø¬ÙŠØ§Øª Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØ©',
          problem: 'Ø¹Ù†Ø¯Ù…Ø§ ÙŠØ¹ØªÙ…Ø¯ Ø§Ù„ÙØ±ÙŠÙ‚ Ø¹Ù„Ù‰ ExcelØŒ WhatsAppØŒ ÙˆØ±ÙˆØ§Ø¨Ø· Ù…ØªÙØ±Ù‚Ø© Ø¨Ø¯Ù„ Ù†Ø¸Ø§Ù… ÙˆØ§Ø­Ø¯ ÙˆØ§Ø¶Ø­.',
          solution: 'Ù†Ø¨Ù†ÙŠ dashboardsØŒ trackersØŒ formsØŒ Ùˆdatabases Ø®ÙÙŠÙØ© Ù…ØµÙ…Ù…Ø© Ø­ÙˆÙ„ Ø·Ø±ÙŠÙ‚Ø© Ø¹Ù…Ù„ Ø§Ù„Ø´Ø±ÙƒØ© Ø§Ù„ÙØ¹Ù„ÙŠØ©.',
          kpis: ['Ù„ÙˆØ­Ø§Øª ØªØ­ÙƒÙ…', 'Ù†Ù…Ø§Ø°Ø¬ Ø¥Ø¯Ø®Ø§Ù„', 'Ù…ØªØªØ¨Ø¹ Ø¹Ù…Ù„ÙŠØ§Øª Ø£Ùˆ Ø¹Ù…Ù„Ø§Ø¡ Ø£Ùˆ Ù…Ø´Ø§Ø±ÙŠØ¹', 'ØªÙ‚Ø§Ø±ÙŠØ± ØªÙ„Ù‚Ø§Ø¦ÙŠØ©', 'Ù…ØµØ¯Ø± Ù…ÙˆØ­Ø¯ Ù„Ù„Ø­Ù‚ÙŠÙ‚Ø©'],
          impact: 'Ù†Ù…Ø§Ø°Ø¬ Ù…Ø±ØªØ¨Ø·Ø©: Ø£Ø¯ÙˆØ§Øª Ø¯Ø§Ø®Ù„ÙŠØ© ÙˆÙ…ØªØªØ¨Ø¹Ø§Øª.',
          icon: 'build',
          proofId: 'internal-tools',
          proofTitle: 'Ù†Ù…ÙˆØ°Ø¬ Ø£Ø¯Ø§Ø© Ø¯Ø§Ø®Ù„ÙŠØ©',
          cta: 'Ø§Ø¹Ø±Ù Ù‡Ù„ ÙŠÙ†Ø§Ø³Ø¨ Ø´Ø±ÙƒØªÙƒ',
        },
        {
          num: '03',
          title: 'Ø£ØªÙ…ØªØ© Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ ÙˆØ§Ù„ÙˆÙƒÙ„Ø§Ø¡',
          problem: 'Ø¹Ù†Ø¯Ù…Ø§ ØªØ³ØªÙ‡Ù„Ùƒ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø§ØªØŒ Ø§Ù„ØªÙ‚Ø§Ø±ÙŠØ±ØŒ Ø§Ù„Ø¨Ø­Ø«ØŒ Ø§Ù„ØªØ°ÙƒÙŠØ±Ø§ØªØŒ Ø£Ùˆ Ø¥Ø¯Ø®Ø§Ù„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ÙˆÙ‚ØªÙ‹Ø§ ÙƒØ¨ÙŠØ±Ù‹Ø§ Ù…Ù† Ø§Ù„ÙØ±ÙŠÙ‚.',
          solution: 'Ù†Ø­Ø¯Ø¯ Ø§Ù„Ù…Ù‡Ø§Ù… Ø§Ù„Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„Ø£ØªÙ…ØªØ© ÙˆÙ†Ø¨Ù†ÙŠ ÙˆÙƒÙ„Ø§Ø¡ Ø£Ùˆ Ù…Ø³Ø§Ø±Ø§Øª AI Ù…Ø±ØªØ¨Ø·Ø© Ø¨Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ØŒ Ù…Ø¹ Ù…Ø±Ø§Ø¬Ø¹Ø© Ø¨Ø´Ø±ÙŠØ© Ø¹Ù†Ø¯ Ø§Ù„Ø­Ø§Ø¬Ø©.',
          kpis: ['AI follow-up agent', 'AI reporting agent', 'AI research agent', 'Sales/support assistant', 'Workflow automation'],
          impact: 'Ù†Ù…Ø§Ø°Ø¬ Ù…Ø±ØªØ¨Ø·Ø©: ÙˆÙƒÙ„Ø§Ø¡ ÙˆØ£ØªÙ…ØªØ© AI.',
          icon: 'bot',
          proofId: 'ai-automation',
          proofTitle: 'Ù†Ù…ÙˆØ°Ø¬ Ø£ØªÙ…ØªØ© AI',
          cta: 'Ø§Ø¹Ø±Ù Ù‡Ù„ ÙŠÙ†Ø§Ø³Ø¨ Ø´Ø±ÙƒØªÙƒ',
        },
        {
          num: '04',
          title: 'Ø£Ù†Ø¸Ù…Ø© Ø§Ù„Ù†Ù…Ùˆ ÙˆØ§Ù„ØªØ³ÙˆÙŠÙ‚ ÙˆØ§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª',
          problem: 'Ø¹Ù†Ø¯Ù…Ø§ ÙŠÙƒÙˆÙ† Ø§Ù„ØªØ³ÙˆÙŠÙ‚ Ø£Ùˆ Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª ØºÙŠØ± Ù…Ù†ØªØ¸Ù…ØŒ ØºÙŠØ± Ù…ØªØµÙ„ Ø¨Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø©ØŒ Ø£Ùˆ Ù„Ø§ ÙŠØªØ­ÙˆÙ„ Ø¥Ù„Ù‰ ÙØ±Øµ Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„Ù‚ÙŠØ§Ø³.',
          solution: 'Ù†ØµÙ…Ù… Ù†Ø¸Ø§Ù… Ù†Ù…Ùˆ ÙŠØ±Ø¨Ø· Ø§Ù„ØªØ­Ù„ÙŠÙ„ØŒ Ø§Ù„ØªÙ…ÙˆØ¶Ø¹ØŒ Ø§Ù„Ù…Ø­ØªÙˆÙ‰ØŒ Ø§Ù„Ø­Ù…Ù„Ø§ØªØŒ CRM Ø®ÙÙŠÙØŒ ÙˆØªØªØ¨Ø¹ Ø§Ù„ÙØ±Øµ.',
          kpis: ['ØªØ­Ù„ÙŠÙ„ Ù…Ù†Ø§ÙØ³ÙŠÙ†', 'Content pillars', 'ØªÙ‚ÙˆÙŠÙ… Ù†Ø´Ø±', 'Sales tracker Ø£Ùˆ CRM', 'Growth intelligence'],
          impact: 'Ù†Ù…Ø§Ø°Ø¬ Ù…Ø±ØªØ¨Ø·Ø©: Ø£Ù†Ø¸Ù…Ø© Ù†Ù…Ùˆ ÙˆÙ…ØªØ§Ø¨Ø¹Ø© Ù…Ø¨ÙŠØ¹Ø§Øª.',
          icon: 'trend',
          proofId: 'growth-system',
          proofTitle: 'Ù†Ù…ÙˆØ°Ø¬ Ù†Ø¸Ø§Ù… Ù†Ù…Ùˆ',
          cta: 'Ø§Ø¹Ø±Ù Ù‡Ù„ ÙŠÙ†Ø§Ø³Ø¨ Ø´Ø±ÙƒØªÙƒ',
        },
        {
          num: '05',
          title: 'Ø§Ù„Ø­Ù„ÙˆÙ„ Ø§Ù„Ù…ØªØ®ØµØµØ©',
          problem: 'Ø¹Ù†Ø¯Ù…Ø§ ØªØ­ØªØ§Ø¬ Ø§Ù„Ø´Ø±ÙƒØ© Ù‚Ø±Ø§Ø±Ù‹Ø§ Ø£Ø¯Ù‚ØŒ ØªØ®ØµÙŠØµÙ‹Ø§ Ø£Ø¹Ù…Ù‚ØŒ Ø£Ùˆ Ø·Ø¨Ù‚Ø© Ø°ÙƒØ§Ø¡ ØªØ´ØºÙŠÙ„ÙŠØ© ÙÙˆÙ‚ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø­Ø§Ù„ÙŠØ©.',
          solution: 'Ù†Ù‚ØªØ±Ø­ Ø­Ù„ÙˆÙ„Ù‹Ø§ Ù…ØªÙ‚Ø¯Ù…Ø© ÙÙ‚Ø· Ø¹Ù†Ø¯Ù…Ø§ ÙŠÙƒÙˆÙ† Ø§Ù„Ø£Ø«Ø± Ø§Ù„ØªØ¬Ø§Ø±ÙŠ ÙˆØ§Ø¶Ø­Ù‹Ø§: Digital TwinØŒ Ø§Ù„ØªØ³ÙˆÙŠÙ‚ Ø§Ù„Ø¹Ù‚Ø§Ø±ÙŠ Ù…ÙØ±Ø· Ø§Ù„ØªØ®ØµÙŠØµØŒ Ø£Ùˆ Executive Decision Intelligence.',
          kpis: ['Digital Twin Company Simulation', 'Hyper-Personalized Real Estate Marketing', 'Executive Decision Intelligence', 'Custom Sector Systems'],
          impact: 'Ù†Ù…Ø§Ø°Ø¬ Ù…Ø±ØªØ¨Ø·Ø©: Ø­Ù„ÙˆÙ„ Ù…ØªØ®ØµØµØ©. Ù„ÙŠØ³Øª Ù†Ù‚Ø·Ø© Ø§Ù„Ø¨Ø¯Ø§ÙŠØ© Ø§Ù„Ø§ÙØªØ±Ø§Ø¶ÙŠØ© Ù„ÙƒÙ„ Ø¹Ù…ÙŠÙ„.',
          icon: 'sparkle',
          proofId: 'specialized-solutions',
          proofTitle: 'Ù†Ù…ÙˆØ°Ø¬ Ø­Ù„ Ù…ØªØ®ØµØµ',
          cta: 'Ø§Ø¹Ø±Ù Ù‡Ù„ ÙŠÙ†Ø§Ø³Ø¨ Ø´Ø±ÙƒØªÙƒ',
        },
      ],
      who: [],
    },
    portfolio: {
      badge: 'Ù†Ù…Ø§Ø°Ø¬ Ø§Ù„Ø¹Ù…Ù„',
      title: 'Ù†Ù…Ø§Ø°Ø¬ Ù…Ù† Ø·Ø±ÙŠÙ‚Ø© Ø¹Ù…Ù„Ù†Ø§',
      subtitle: 'Ù†Ù…Ø§Ø°Ø¬ Ù…Ø®ØªØ§Ø±Ø© ØªÙˆØ¶Ø­ ÙƒÙŠÙ Ù†Ø­ÙˆÙ„ Ø§Ù„Ø£ÙÙƒØ§Ø± ÙˆØ§Ù„Ø¹Ù…Ù„ÙŠØ§Øª Ø¥Ù„Ù‰ Ø£Ù†Ø¸Ù…Ø©ØŒ Ø£Ø¯ÙˆØ§ØªØŒ ÙˆØªØ¬Ø§Ø±Ø¨ Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù…. ÙŠÙ…ÙƒÙ† Ø§Ø³ØªØ¨Ø¯Ø§Ù„ Ø§Ù„Ø¨Ø·Ø§Ù‚Ø§Øª Ø¨Ù„Ù‚Ø·Ø§Øª Ø­Ù‚ÙŠÙ‚ÙŠØ© Ø¹Ù†Ø¯ ØªÙˆÙØ±Ù‡Ø§.',
      placeholder: 'Ø¹ÙŠÙ†Ø© Ù‚Ø§Ø¯Ù…Ø© Ù‚Ø±ÙŠØ¨Ù‹Ø§',
      view: 'Ø´Ø§Ù‡Ø¯ Ø§Ù„Ø¹ÙŠÙ†Ø©',
      real: 'Ø¹Ù…Ù„ Ø­Ù‚ÙŠÙ‚ÙŠ',
    },
    discovery: {
      badge: 'ÙƒÙŠÙ Ù†Ø¨Ø¯Ø£',
      title: 'Ù†Ø¨Ø¯Ø£ Ø¨Ø§Ù„Ø¯Ø±Ø§Ø³Ø© Ø§Ù„Ù…Ù†Ø§Ø³Ø¨Ø©ØŒ Ù„Ø§ Ø¨Ù‚Ø§Ù„Ø¨ Ø«Ø§Ø¨Øª.',
      subtitle: 'Ø¹Ù…Ù‚ Ø§Ù„Ø¯Ø±Ø§Ø³Ø© ÙŠØªØºÙŠØ± Ø­Ø³Ø¨ Ø­Ø¬Ù… Ø§Ù„Ø´Ø±ÙƒØ©ØŒ ÙˆØ¶ÙˆØ­ Ø§Ù„Ù…Ø´ÙƒÙ„Ø©ØŒ ÙˆÙ†ÙˆØ¹ Ø§Ù„Ø®Ø¯Ù…Ø© Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø©.',
      items: [
        { name: 'Discovery Ø®ÙÙŠÙ', duration: '2-5 Ø£ÙŠØ§Ù…', use: 'Ù„Ù…Ø´ÙƒÙ„Ø© ÙˆØ§Ø¶Ø­Ø© Ø£Ùˆ Ø®Ø¯Ù…Ø© Ù…Ø­Ø¯Ø¯Ø©.', goal: 'ÙÙ‡Ù… Ø³Ø±ÙŠØ¹ ÙˆØªØ­Ø¯ÙŠØ¯ Ù†Ø·Ø§Ù‚ Ø§Ù„Ø­Ù„.' },
        { name: 'Operational Mapping', duration: '7-14 ÙŠÙˆÙ…', use: 'Ù„ØªØµÙ…ÙŠÙ… workflowØŒ dashboardØŒ Ø£Ùˆ Ù†Ø¸Ø§Ù… Ù…ØªØ§Ø¨Ø¹Ø©.', goal: 'Ø±Ø³Ù… Ø§Ù„Ø¹Ù…Ù„ÙŠØ©ØŒ Ø§Ù„Ø£Ø·Ø±Ø§ÙØŒ Ù†Ù‚Ø§Ø· Ø§Ù„ØªØ¹Ø·Ù„ØŒ ÙˆÙ…Ø¤Ø´Ø±Ø§Øª Ø§Ù„Ù‚ÙŠØ§Ø³.' },
        { name: 'Business System Audit', duration: '14-30 ÙŠÙˆÙ…', use: 'Ù„Ø´Ø±ÙƒØ© ÙƒØ¨ÙŠØ±Ø© Ø£Ùˆ Ù…Ø¬Ù…ÙˆØ¹Ø©.', goal: 'ØªØ­Ù„ÙŠÙ„ Ø£Ø¹Ù…Ù‚ Ù„Ù„Ø¹Ù…Ù„ÙŠØ§ØªØŒ Ø§Ù„Ø£Ø¯ÙˆØ§ØªØŒ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§ØªØŒ Ø§Ù„Ù‡Ø¯Ø±ØŒ ÙˆÙØ±Øµ Ø§Ù„Ø£ØªÙ…ØªØ©.' },
      ],
      note: 'Ø§Ù„Ø£Ø±Ù‚Ø§Ù… ØªÙ‚Ø¯ÙŠØ±ÙŠØ© ÙˆØªØ¹ØªÙ…Ø¯ Ø¹Ù„Ù‰ Ù†Ø·Ø§Ù‚ Ø§Ù„Ø¹Ù…Ù„ØŒ Ø­Ø¬Ù… Ø§Ù„Ø´Ø±ÙƒØ©ØŒ Ø¬ÙˆØ¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§ØªØŒ ÙˆØ§Ù„ØªØ²Ø§Ù… Ø§Ù„ÙØ±ÙŠÙ‚ Ø¨Ø§Ù„ØªØ·Ø¨ÙŠÙ‚.',
    },
    process: {
      badge: 'Ø§Ù„Ù…Ù†Ù‡Ø¬ÙŠØ©',
      title: 'Ù…Ù†Ù‡Ø¬ÙŠØ© Ø§Ù„ØªÙ†ÙÙŠØ°',
      subtitle: 'Ù…Ø³Ø§Ø± Ù‚ØµÙŠØ± Ù…Ù† ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù†Ø·Ø§Ù‚ Ø¥Ù„Ù‰ Ù…Ø®Ø±Ø¬Ø§Øª Ù‚Ø§Ø¨Ù„Ø© Ù„Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù…ØŒ Ù…Ø¹ ÙÙ„ØªØ± Ø¬ÙˆØ¯Ø© Ù‚Ø¨Ù„ Ø§Ù„ØªØ³Ù„ÙŠÙ….',
      steps: [
        { num: '01', title: 'ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù†Ø·Ø§Ù‚', desc: 'Ù†Ø­Ø¯Ø¯ Ø®Ø· Ø§Ù„Ø®Ø¯Ù…Ø©ØŒ Ø§Ù„Ù…Ø´ÙƒÙ„Ø© Ø§Ù„ØªØ¬Ø§Ø±ÙŠØ©ØŒ ÙˆØ£ÙˆÙ„ Ù…Ø®Ø±Ø¬ Ù…ÙÙŠØ¯.' },
        { num: '02', title: 'Ø§Ù„Ø¯Ø±Ø§Ø³Ø© Ø­Ø³Ø¨ Ø§Ù„Ø¹Ù…Ù‚', desc: 'Ù†Ø®ØªØ§Ø± Discovery Ø®ÙÙŠÙØŒ Operational MappingØŒ Ø£Ùˆ Audit Ø£Ø¹Ù…Ù‚.' },
        { num: '03', title: 'ØªØµÙ…ÙŠÙ… Ø§Ù„Ù†Ø¸Ø§Ù…', desc: 'Ù†ØµÙ…Ù… Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ØŒ ØªØ¯ÙÙ‚ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§ØªØŒ Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠØ§ØªØŒ ÙˆÙ‡ÙŠÙƒÙ„ Ø§Ù„Ø£Ø¯Ø§Ø©.' },
        { num: '04', title: 'Ø¨Ù†Ø§Ø¡ Ø§Ù„Ù…Ø®Ø±Ø¬Ø§Øª', desc: 'Ù†Ø¨Ù†ÙŠ Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ØŒ Ø§Ù„Ù„ÙˆØ­Ø©ØŒ Ø§Ù„Ø£Ø¯Ø§Ø©ØŒ Ø§Ù„Ø£ØªÙ…ØªØ©ØŒ Ø£Ùˆ Ø·Ø¨Ù‚Ø© Ø§Ù„Ù†Ù…Ùˆ Ø§Ù„Ù…ØªÙÙ‚ Ø¹Ù„ÙŠÙ‡Ø§.' },
        { num: '05', title: 'Ø§Ù„ØªØ³Ù„ÙŠÙ… ÙˆØ§Ù„ØªØ¯Ø±ÙŠØ¨', desc: 'Ù†Ø¯Ø±Ø¨ Ø§Ù„ÙØ±ÙŠÙ‚ ÙˆÙ†ÙˆØ«Ù‚ Ø·Ø±ÙŠÙ‚Ø© Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ù†Ø¸Ø§Ù….' },
        { num: '06', title: 'Ø§Ù„ØªØ­Ø³ÙŠÙ† ÙˆØ§Ù„Ù‚ÙŠØ§Ø³', desc: 'Ù†Ø±Ø§Ø¬Ø¹ Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù…ØŒ Ù†Ù‚ÙŠØ³ Ø§Ù„Ù‚ÙŠÙ…Ø©ØŒ ÙˆÙ†Ø­Ø³Ù† Ù…Ø§ ÙŠØ­ØªØ§Ø¬ ØªØ·ÙˆÙŠØ±Ù‹Ø§.' },
      ],
      questions: {
        title: 'Ù‚Ø¨Ù„ ØªØ³Ù„ÙŠÙ… Ø£ÙŠ Ø­Ù„ØŒ Ù†Ø³Ø£Ù„:',
        items: ['Ù…Ø§ Ø§Ù„Ù…Ø´ÙƒÙ„Ø© Ø§Ù„Ù…Ø­Ø¯Ø¯Ø© Ø§Ù„ØªÙŠ ÙŠØ­Ù„Ù‡Ø§ØŸ', 'Ù‡Ù„ Ø³ÙŠØ³ØªØ®Ø¯Ù…Ù‡ Ø§Ù„ÙØ±ÙŠÙ‚ ÙŠÙˆÙ…ÙŠÙ‹Ø§ØŸ', 'ÙƒÙŠÙ Ù†Ø¹Ø±Ù Ø£Ù†Ù‡ Ø®Ù„Ù‚ Ù‚ÙŠÙ…Ø©ØŸ'],
      },
    },
    packages: {
      badge: 'Ù†Ù…Ø§Ø°Ø¬ Ø§Ù„ØªØ¹Ø§ÙˆÙ†',
      title: 'Ù†Ù…Ø§Ø°Ø¬ ØªØ¹Ø§ÙˆÙ† Ø¨Ø³ÙŠØ·Ø©',
      subtitle: 'Ù„Ø§ Ù†Ø¹Ø±Ø¶ Ø£Ø³Ø¹Ø§Ø±Ù‹Ø§ Ø«Ø§Ø¨ØªØ©. Ø§Ù„Ù†Ø·Ø§Ù‚ Ø§Ù„Ù…Ù†Ø§Ø³Ø¨ ÙŠÙØ­Ø¯Ø¯ Ø¨Ø¹Ø¯ Ø§Ù„Ø¯Ø±Ø§Ø³Ø©.',
      sprint: {
        name: 'Ø®Ø¯Ù…Ø© Ù…Ø­Ø¯Ø¯Ø©',
        subtitle: 'Ù„Ù…Ø´ÙƒÙ„Ø© ÙˆØ§Ø¶Ø­Ø© Ø£Ùˆ Ø®Ø· Ø®Ø¯Ù…Ø© ÙˆØ§Ø­Ø¯.',
        badge: 'Ù…Ø±ÙƒØ²',
        scope: 'ÙŠÙØ­Ø¯Ø¯ Ø¨Ø¹Ø¯ Ø§Ù„Ø¯Ø±Ø§Ø³Ø©',
        features: ['Ø®Ø· Ø®Ø¯Ù…Ø© ÙˆØ§Ø­Ø¯', 'Ù†Ø·Ø§Ù‚ Ù…Ø´ÙƒÙ„Ø© ÙˆØ§Ø¶Ø­', 'Ù…Ø®Ø±Ø¬ Ù‚Ø§Ø¨Ù„ Ù„Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù…', 'ØªØ³Ù„ÙŠÙ… Ù…Ø®ØªØµØ±', 'ØªÙˆØµÙŠØ© Ù„Ù„Ø®Ø·ÙˆØ© Ø§Ù„ØªØ§Ù„ÙŠØ©'],
        cta: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„ØªØ´Ø®ÙŠØµ',
      },
      full: {
        name: 'Ù†Ø¸Ø§Ù… Ù…ØªÙƒØ§Ù…Ù„',
        subtitle: 'Ù„Ø´Ø±ÙƒØ§Øª ØªØ­ØªØ§Ø¬ workflow + tools + automation/growth.',
        badge: 'Ù…ØªÙƒØ§Ù…Ù„',
        scope: 'ÙŠÙØ­Ø¯Ø¯ Ø¨Ø¹Ø¯ Ø§Ù„Ø¯Ø±Ø§Ø³Ø©',
        features: ['Ø¹Ø¯Ø© Ø®Ø·ÙˆØ· Ø®Ø¯Ù…Ø©', 'ØªØµÙ…ÙŠÙ… Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ ÙˆØ§Ù„Ø£Ø¯ÙˆØ§Øª', 'Ø·Ø¨Ù‚Ø© Ø£ØªÙ…ØªØ© Ø£Ùˆ Ù†Ù…Ùˆ', 'ØªØ¯Ø±ÙŠØ¨ Ø§Ù„ÙØ±ÙŠÙ‚', 'Ø®Ø§Ø±Ø·Ø© ØªØ­Ø³ÙŠÙ†'],
        cta: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„ØªØ´Ø®ÙŠØµ',
      },
      managed: {
        name: 'ØªØ­Ø³ÙŠÙ† Ù…Ø³ØªÙ…Ø±',
        subtitle: 'Ù„Ù„ØªØ­Ø³ÙŠÙ† Ø§Ù„Ø´Ù‡Ø±ÙŠ ÙˆÙ…Ù„ÙƒÙŠØ© Ø§Ù„Ù†Ø¸Ø§Ù….',
        badge: 'Ø´Ù‡Ø±ÙŠ',
        scope: 'ÙŠÙØ­Ø¯Ø¯ Ø¨Ø¹Ø¯ Ø§Ù„Ø¯Ø±Ø§Ø³Ø©',
        description: 'Ù…ØªØ§Ø¨Ø¹Ø© ÙˆØªØ­Ø³ÙŠÙ† Ù…Ø³ØªÙ…Ø± Ø¨Ø¹Ø¯ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚: ØªØ­Ø¯ÙŠØ«Ø§ØªØŒ Ø£ØªÙ…ØªØ©ØŒ ØªÙ‚Ø§Ø±ÙŠØ±ØŒ ÙˆØ£ÙˆÙ„ÙˆÙŠØ§Øª Ø´Ù‡Ø±ÙŠØ©.',
        features: ['Ù…Ø±Ø§Ø¬Ø¹Ø© Ø´Ù‡Ø±ÙŠØ©', 'ØªØ­Ø¯ÙŠØ« Ø§Ù„Ù†Ø¸Ø§Ù…', 'ØªØ­Ø³ÙŠÙ† Ø§Ù„Ø£ØªÙ…ØªØ©', 'ØªØ·ÙˆÙŠØ± Ø§Ù„ØªÙ‚Ø§Ø±ÙŠØ±', 'Ù‚Ø§Ø¦Ù…Ø© Ø£ÙˆÙ„ÙˆÙŠØ§Øª'],
        cta: 'Ù†Ø§Ù‚Ø´ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø©',
      },
      guide: { title: '', items: [] },
      scopeNote: 'ÙŠÙØ­Ø¯Ø¯ Ø§Ù„Ù†Ø·Ø§Ù‚ ÙˆØ§Ù„ØªÙƒÙ„ÙØ© Ø¨Ø¹Ø¯ Ø§Ù„Ø¯Ø±Ø§Ø³Ø© Ø­ØªÙ‰ ÙŠÙ†Ø§Ø³Ø¨ Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ù…Ø´ÙƒÙ„Ø© Ø§Ù„ÙØ¹Ù„ÙŠØ©ØŒ Ø§Ù„ÙØ±ÙŠÙ‚ØŒ Ø§Ù„Ø£Ø¯ÙˆØ§ØªØŒ ÙˆØ¬ÙˆØ¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª.',
    },
    contact: {
      badge: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„Ø¢Ù†',
      title: 'Ø§Ø¨Ø¯Ø£ Ø¨ØªØ´Ø®ÙŠØµ Ø§Ø­ØªÙŠØ§Ø¬ Ø´Ø±ÙƒØªÙƒ',
      subtitle: 'Ø´Ø§Ø±ÙƒÙ†Ø§ Ø·Ø¨ÙŠØ¹Ø© Ø´Ø±ÙƒØªÙƒØŒ Ø£ÙŠÙ† ÙŠØ¶ÙŠØ¹ Ø§Ù„ÙˆÙ‚ØªØŒ ÙˆÙ…Ø§ Ø£ÙƒØ«Ø± Ø´ÙŠØ¡ ÙŠØ­ØªØ§Ø¬ ÙˆØ¶ÙˆØ­Ù‹Ø§ Ø§Ù„Ø¢Ù†. Ø³Ù†Ø³Ø§Ø¹Ø¯Ùƒ Ø¹Ù„Ù‰ ØªØ­Ø¯ÙŠØ¯ Ø®Ø· Ø§Ù„Ø®Ø¯Ù…Ø© Ø§Ù„Ø£Ù†Ø³Ø¨ ÙˆØ£ÙˆÙ„ Ø®Ø·ÙˆØ© ØªÙ†ÙÙŠØ°ÙŠØ©.',
      email: 'amirelshazly66@gmail.com',
      phone: '+20 102 924 0066',
      location: 'Ù…ØµØ± / Ø¹Ù† Ø¨ÙØ¹Ø¯',
      details: { email: 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ', whatsapp: 'ÙˆØ§ØªØ³Ø§Ø¨', location: 'Ø§Ù„Ù…ÙˆÙ‚Ø¹' },
      actions: [
        { label: 'A', icon: 'target', title: 'Ø§Ø¨Ø¯Ø£ Ø§Ù„ØªØ´Ø®ÙŠØµ', text: 'Ø£Ø®Ø¨Ø±Ù†Ø§ Ø£ÙŠÙ† ÙŠØ¨Ø¯Ùˆ Ø§Ù„Ø¹Ù…Ù„ Ù…ØªÙØ±Ù‚Ù‹Ø§ØŒ Ù…ØªØ£Ø®Ø±Ù‹Ø§ØŒ ÙŠØ¯ÙˆÙŠÙ‹Ø§ØŒ Ø£Ùˆ ØºÙŠØ± ÙˆØ§Ø¶Ø­.', cta: 'Ø§Ø¨Ø¯Ø£ Ø¹Ø¨Ø± ÙˆØ§ØªØ³Ø§Ø¨', type: 'diagnosis' },
        { label: 'B', icon: 'book', title: 'Ø£Ø±Ø³Ù„ Ù†Ø¨Ø°Ø© Ø¹Ù† Ø§Ù„Ø´Ø±ÙƒØ©', text: 'Ø´Ø§Ø±ÙƒÙ†Ø§ Ø·Ø¨ÙŠØ¹Ø© Ø§Ù„Ø´Ø±ÙƒØ©ØŒ Ø§Ù„ÙØ±Ù‚ØŒ Ø§Ù„Ø£Ø¯ÙˆØ§ØªØŒ ÙˆØ®Ø· Ø§Ù„Ø®Ø¯Ù…Ø© Ø§Ù„Ø°ÙŠ ØªØªÙˆÙ‚Ø¹ Ø£Ù†Ù‡ Ù…Ù†Ø§Ø³Ø¨.', cta: 'Ø£Ø±Ø³Ù„ Ø¨Ø±ÙŠØ¯Ù‹Ø§', type: 'brief' },
        { label: 'C', icon: 'refresh', title: 'Ù†Ø§Ù‚Ø´ Ø§Ù„ØªØ­Ø³ÙŠÙ† Ø§Ù„Ù…Ø³ØªÙ…Ø±', text: 'Ù„Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„ØªÙŠ Ù„Ø¯ÙŠÙ‡Ø§ Ø£Ù†Ø¸Ù…Ø© Ù‚Ø§Ø¦Ù…Ø© ÙˆØªØ­ØªØ§Ø¬ Ù…ØªØ§Ø¨Ø¹Ø© ÙˆØªØ­Ø³ÙŠÙ† Ø´Ù‡Ø±ÙŠ.', cta: 'Ù†Ø§Ù‚Ø´ Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø©', type: 'monthly' },
      ],
    },
    footer: {
      tagline: 'Ø§Ø³ØªÙˆØ¯ÙŠÙˆ ØªØ³Ø±ÙŠØ¹ Ø§Ù„Ø£Ø¹Ù…Ø§Ù„',
      rights: 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ù‚ÙˆÙ‚ Ù…Ø­ÙÙˆØ¸Ø©.',
      built: 'Ø¨ÙÙ†ÙŠ Ø¨Ø¯Ù‚Ø©.',
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
    diagnosis: 'Hi AURA team, Iâ€™m interested in turning my business operations into a clear system. Iâ€™d like to start with a business diagnosis.',
    monthly: 'Hi AURA team, Iâ€™m interested in Managed Systems Partner / monthly support for managing and improving our workflows, tools, and automations.',
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
    diagnosis: 'Ø£Ù‡Ù„Ù‹Ø§ ÙØ±ÙŠÙ‚ AURAØŒ Ø£ÙˆØ¯ Ù…Ø¹Ø±ÙØ© ÙƒÙŠÙ ÙŠÙ…ÙƒÙ†ÙƒÙ… Ù…Ø³Ø§Ø¹Ø¯ØªÙ†Ø§ ÙÙŠ ØªØ­ÙˆÙŠÙ„ Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ Ø¯Ø§Ø®Ù„ Ø§Ù„Ø´Ø±ÙƒØ© Ø¥Ù„Ù‰ Ù†Ø¸Ø§Ù… Ø£ÙˆØ¶Ø­ ÙˆØ£Ø³Ù‡Ù„ ÙÙŠ Ø§Ù„Ø¥Ø¯Ø§Ø±Ø©. Ø£Ø±ÙŠØ¯ Ø§Ù„Ø¨Ø¯Ø¡ Ø¨ØªØ´Ø®ÙŠØµ Ù…Ø¨Ø¯Ø¦ÙŠ.',
    monthly: 'Ø£Ù‡Ù„Ù‹Ø§ ÙØ±ÙŠÙ‚ AURAØŒ Ø£Ø±ÙŠØ¯ Ù…Ù†Ø§Ù‚Ø´Ø© Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ø´Ù‡Ø±ÙŠØ© ÙˆØªØ­Ø³ÙŠÙ† Ø§Ù„Ø£Ù†Ø¸Ù…Ø© Ø¯Ø§Ø®Ù„ Ø´Ø±ÙƒØªÙ†Ø§.',
    briefSubject: 'Ù†Ø¨Ø°Ø© Ø¹Ù† Ø§Ù„Ø¹Ù…Ù„ - AURA',
    briefBody: `Ø£Ù‡Ù„Ù‹Ø§ ÙØ±ÙŠÙ‚ AURAØŒ

Ø£Ø±ØºØ¨ ÙÙŠ Ø¥Ø±Ø³Ø§Ù„ Ù†Ø¨Ø°Ø© Ù‚ØµÙŠØ±Ø© Ø¹Ù† Ù†Ø´Ø§Ø·ÙŠ.

Ø§Ø³Ù… Ø§Ù„Ù†Ø´Ø§Ø·:
Ù†ÙˆØ¹ Ø§Ù„Ù†Ø´Ø§Ø·:
Ù…Ø§ Ø§Ù„Ø°ÙŠ ÙŠØ¨Ø¯Ùˆ ÙÙˆØ¶ÙˆÙŠÙ‹Ø§ Ø£Ùˆ ØºÙŠØ± ÙˆØ§Ø¶Ø­:
Ù…Ø§ Ø§Ù„Ø°ÙŠ Ø£Ø±ÙŠØ¯ ØªØ­Ø³ÙŠÙ†Ù‡:
Ø±Ø§Ø¨Ø· Ø§Ù„Ù…ÙˆÙ‚Ø¹ Ø£Ùˆ Ø§Ù„Ø³ÙˆØ´ÙŠØ§Ù„:

Ø´ÙƒØ±Ù‹Ø§.`,
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
  diagnosis: 'Ø£Ù‡Ù„Ù‹Ø§ ÙØ±ÙŠÙ‚ AURAØŒ Ø£Ø±ÙŠØ¯ Ù…Ù†Ø§Ù‚Ø´Ø© ÙƒÙŠÙ ÙŠÙ…ÙƒÙ† Ù„Ù€ AURA Ù…Ø³Ø§Ø¹Ø¯ØªÙ†Ø§ ÙÙŠ ØªØ­ÙˆÙŠÙ„ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø¯Ø§Ø®Ù„ Ø´Ø±ÙƒØªÙ†Ø§ Ø¥Ù„Ù‰ Ù…Ù†Ø¸ÙˆÙ…Ø© Ø£ÙˆØ¶Ø­ ÙˆØ£ÙƒØ«Ø± Ø°ÙƒØ§Ø¡Ù‹. Ø£ÙˆØ¯ Ø§Ù„Ø¨Ø¯Ø¡ Ø¨ØªØ´Ø®ÙŠØµ Ù…Ø¨Ø¯Ø¦ÙŠ.',
  monthly: 'Ø£Ù‡Ù„Ù‹Ø§ ÙØ±ÙŠÙ‚ AURAØŒ Ø£Ø±ÙŠØ¯ Ù…Ù†Ø§Ù‚Ø´Ø© Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© ÙˆØ§Ù„ØªØ­Ø³ÙŠÙ† Ø§Ù„Ù…Ø³ØªÙ…Ø± Ù„Ù…Ù†Ø¸ÙˆÙ…Ø© Ø§Ù„Ø¹Ù…Ù„ Ø¯Ø§Ø®Ù„ Ø´Ø±ÙƒØªÙ†Ø§: Ø³ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ØŒ Ø§Ù„Ø£Ø¯ÙˆØ§ØªØŒ Ø§Ù„Ø£ØªÙ…ØªØ©ØŒ ÙˆÙˆÙƒÙ„Ø§Ø¡ Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ.',
  briefSubject: 'Ù†Ø¨Ø°Ø© Ø¹Ù† Ø§Ù„Ø´Ø±ÙƒØ© - AURA',
  briefBody: `Ø£Ù‡Ù„Ù‹Ø§ ÙØ±ÙŠÙ‚ AURAØŒ

Ø£Ø±ØºØ¨ ÙÙŠ Ø¥Ø±Ø³Ø§Ù„ Ù†Ø¨Ø°Ø© Ù‚ØµÙŠØ±Ø© Ø¹Ù† Ø´Ø±ÙƒØªÙ†Ø§.

Ø§Ø³Ù… Ø§Ù„Ø´Ø±ÙƒØ©:
Ù†ÙˆØ¹ Ø§Ù„Ø´Ø±ÙƒØ©:
Ø¹Ø¯Ø¯ Ø§Ù„ÙØ±Ù‚ Ø£Ùˆ Ø§Ù„ÙˆØ­Ø¯Ø§Øª:
Ø§Ù„Ø£Ø¯ÙˆØ§Øª Ø£Ùˆ Ø§Ù„Ø£Ù†Ø¸Ù…Ø© Ø§Ù„Ø­Ø§Ù„ÙŠØ©:
Ø£ÙƒØ¨Ø± Ù†Ù‚Ø·Ø© ØªØ¹Ø·ÙŠÙ„ Ø­Ø§Ù„ÙŠÙ‹Ø§:
Ù…Ø§ Ø§Ù„Ø°ÙŠ Ù†Ø±ÙŠØ¯ ØªØ­Ø³ÙŠÙ†Ù‡:
Ø±Ø§Ø¨Ø· Ø§Ù„Ù…ÙˆÙ‚Ø¹ Ø£Ùˆ Ø§Ù„Ø³ÙˆØ´ÙŠØ§Ù„:

Ø´ÙƒØ±Ù‹Ø§.`,
});

Object.assign(contactMessages.en, {
  diagnosis: 'Hi AURA team, Iâ€™d like to discuss how AURA can help turn our company operations into a clearer system. Iâ€™d like to start with a business diagnosis and identify the right service line.',
  monthly: 'Hi AURA team, Iâ€™d like to discuss continuous improvement for our company operating system after launch.',
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
  diagnosis: 'Ø£Ù‡Ù„Ù‹Ø§ ÙØ±ÙŠÙ‚ AURAØŒ Ø£Ø±ÙŠØ¯ Ù…Ù†Ø§Ù‚Ø´Ø© ÙƒÙŠÙ ÙŠÙ…ÙƒÙ† Ù„Ø£ÙˆØ±Ø§ Ù…Ø³Ø§Ø¹Ø¯ØªÙ†Ø§ ÙÙŠ ØªØ­ÙˆÙŠÙ„ Ø§Ù„ØªØ´ØºÙŠÙ„ Ø¯Ø§Ø®Ù„ Ø´Ø±ÙƒØªÙ†Ø§ Ø¥Ù„Ù‰ Ù…Ù†Ø¸ÙˆÙ…Ø© Ø£ÙˆØ¶Ø­. Ø£ÙˆØ¯ Ø§Ù„Ø¨Ø¯Ø¡ Ø¨ØªØ´Ø®ÙŠØµ Ø§Ø­ØªÙŠØ§Ø¬ Ø§Ù„Ø´Ø±ÙƒØ© ÙˆØªØ­Ø¯ÙŠØ¯ Ø®Ø· Ø§Ù„Ø®Ø¯Ù…Ø© Ø§Ù„Ù…Ù†Ø§Ø³Ø¨.',
  monthly: 'Ø£Ù‡Ù„Ù‹Ø§ ÙØ±ÙŠÙ‚ AURAØŒ Ø£Ø±ÙŠØ¯ Ù…Ù†Ø§Ù‚Ø´Ø© Ø§Ù„ØªØ­Ø³ÙŠÙ† Ø§Ù„Ù…Ø³ØªÙ…Ø± ÙˆÙ…Ù„ÙƒÙŠØ© Ø§Ù„Ù†Ø¸Ø§Ù… Ø¨Ø¹Ø¯ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚ Ø¯Ø§Ø®Ù„ Ø´Ø±ÙƒØªÙ†Ø§.',
  briefSubject: 'ØªØ´Ø®ÙŠØµ Ø§Ø­ØªÙŠØ§Ø¬ Ø§Ù„Ø´Ø±ÙƒØ© - AURA',
  briefBody: `Ø£Ù‡Ù„Ù‹Ø§ ÙØ±ÙŠÙ‚ AURAØŒ

Ø£Ø±ØºØ¨ ÙÙŠ Ø¥Ø±Ø³Ø§Ù„ Ù†Ø¨Ø°Ø© Ù‚ØµÙŠØ±Ø© Ù„ØªØ­Ø¯ÙŠØ¯ Ø®Ø· Ø§Ù„Ø®Ø¯Ù…Ø© Ø§Ù„Ù…Ù†Ø§Ø³Ø¨.

Ø§Ø³Ù… Ø§Ù„Ø´Ø±ÙƒØ©:
Ù†ÙˆØ¹ Ø§Ù„Ø´Ø±ÙƒØ©:
Ø¹Ø¯Ø¯ Ø§Ù„ÙØ±Ù‚ Ø£Ùˆ Ø§Ù„ÙˆØ­Ø¯Ø§Øª:
Ø£ÙŠÙ† ÙŠØ¶ÙŠØ¹ Ø§Ù„ÙˆÙ‚Øª Ø­Ø§Ù„ÙŠÙ‹Ø§:
Ù…Ø§ Ø£ÙƒØ«Ø± Ø´ÙŠØ¡ ÙŠØ­ØªØ§Ø¬ ÙˆØ¶ÙˆØ­Ù‹Ø§ Ø§Ù„Ø¢Ù†:
Ø®Ø· Ø§Ù„Ø®Ø¯Ù…Ø© Ø§Ù„Ù…ØªÙˆÙ‚Ø¹:
Ø±Ø§Ø¨Ø· Ø§Ù„Ù…ÙˆÙ‚Ø¹ Ø£Ùˆ Ø§Ù„Ø³ÙˆØ´ÙŠØ§Ù„:

Ø´ÙƒØ±Ù‹Ø§.`,
});

function getWhatsAppLink(lang: 'en' | 'ar', type: 'diagnosis' | 'monthly' = 'diagnosis') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(contactMessages[lang][type])}`;
}

function getBusinessBriefLink(lang: 'en' | 'ar') {
  const { briefSubject, briefBody } = contactMessages[lang];
  const encodedBody = encodeURIComponent(briefBody.replace(/\n/g, '\r\n'));
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(briefSubject)}&body=${encodedBody}`;
}

/* â”€â”€â”€ Icon Mapper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ Animated Section Wrapper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ Floating Particles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ Loader Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ Navigation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
          aria-label={lang === 'ar' ? 'Switch to English' : 'Ø§Ù„ØªØ¨Ø¯ÙŠÙ„ Ø¥Ù„Ù‰ Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©'}
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

/* â”€â”€â”€ Hero Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ Why Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ Service Layer Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
                {lang === 'en' ? 'New' : 'Ø¬Ø¯ÙŠØ¯'}
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
                    {lang === 'en' ? 'What AURA Builds' : 'Ù…Ø§ ØªØ¨Ù†ÙŠÙ‡ AURA'}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }} dir={isRtl ? 'rtl' : 'ltr'}>{layer.solution}</p>
                </div>
                <div>
                  <h4 className="font-bold text-xs tracking-wider uppercase mb-2" style={{ color: '#FFD666' }}>
                    {lang === 'en' ? 'Key Outputs' : 'Ø§Ù„Ù…Ø®Ø±Ø¬Ø§Øª'}
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
                    {lang === 'en' ? 'Related proof' : 'Ù†Ù…Ø§Ø°Ø¬ Ù…Ø±ØªØ¨Ø·Ø©'}
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

/* â”€â”€â”€ Services Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ Process Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* â”€â”€â”€ Process Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ Packages Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ Differentiators Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ Examples Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
                  {lang === 'en' ? 'Challenge:' : 'Ø§Ù„ØªØ­Ø¯ÙŠ:'}
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

/* â”€â”€â”€ Tools Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ Contact Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ Footer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
          Â© {new Date().getFullYear()} AURA. {t.rights} {t.built}
        </p>
      </div>
    </footer>
  );
}

/* â”€â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
