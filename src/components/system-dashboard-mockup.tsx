import { BarChart3, Check, Clock3, RefreshCw, Workflow } from 'lucide-react';

type SystemDashboardMockupProps = {
  lang: 'en' | 'ar';
};

const copy = {
  en: {
    eyebrow: 'AURA OPERATIONS',
    title: 'System Overview',
    live: 'Live workflow',
    cards: [
      { label: 'Workflow Health', value: 'Stable', detail: 'Core paths monitored' },
      { label: 'Active Automations', value: 'Running', detail: 'Checks completed' },
      { label: 'Monthly System Review', value: 'Planned', detail: 'Priority roadmap ready' },
      { label: 'Process Efficiency', value: 'Improving', detail: 'Fewer manual handoffs' },
    ],
    flowTitle: 'Lead handling flow',
    flow: ['Lead', 'Check', 'Assign', 'Follow-up', 'Report'],
    tasks: 'System tasks',
    taskItems: ['Review new requests', 'Monitor handoffs', 'Prepare monthly improvements'],
  },
  ar: {
    eyebrow: 'عمليات AURA',
    title: 'نظرة عامة على النظام',
    live: 'مسار عمل نشط',
    cards: [
      { label: 'صحة سير العمل', value: 'مستقر', detail: 'مراقبة المسارات الأساسية' },
      { label: 'الأتمتة النشطة', value: 'تعمل', detail: 'تمت مراجعة العمليات' },
      { label: 'مراجعة النظام الشهرية', value: 'مخططة', detail: 'خارطة الأولويات جاهزة' },
      { label: 'كفاءة العمليات', value: 'تتحسن', detail: 'تسليمات يدوية أقل' },
    ],
    flowTitle: 'مسار التعامل مع العميل المحتمل',
    flow: ['عميل محتمل', 'مراجعة', 'إسناد', 'متابعة', 'تقرير'],
    tasks: 'مهام النظام',
    taskItems: ['مراجعة الطلبات الجديدة', 'مراقبة انتقال العمل', 'إعداد التحسينات الشهرية'],
  },
};

const cardIcons = [Workflow, RefreshCw, Clock3, BarChart3];

export function SystemDashboardMockup({ lang }: SystemDashboardMockupProps) {
  const t = copy[lang];
  const isRtl = lang === 'ar';

  return (
    <div className="system-dashboard" dir={isRtl ? 'rtl' : 'ltr'} aria-label={t.title}>
      <div className="system-dashboard__topbar">
        <div>
          <p className="system-dashboard__eyebrow">{t.eyebrow}</p>
          <h2>{t.title}</h2>
        </div>
        <div className="system-dashboard__live">
          <span />
          {t.live}
        </div>
      </div>

      <div className="system-dashboard__metrics">
        {t.cards.map((card, index) => {
          const Icon = cardIcons[index];
          return (
            <div className="system-dashboard__metric" key={card.label}>
              <div className="system-dashboard__metric-icon"><Icon size={15} /></div>
              <p>{card.label}</p>
              <strong>{card.value}</strong>
              <span>{card.detail}</span>
            </div>
          );
        })}
      </div>

      <div className="system-dashboard__flow">
        <div className="system-dashboard__section-title">
          <span>{t.flowTitle}</span>
          <span className="system-dashboard__status"><Check size={12} /> Active</span>
        </div>
        <div className="system-dashboard__flow-track">
          {t.flow.map((step, index) => (
            <div className="system-dashboard__flow-step" key={step}>
              <div className="system-dashboard__node">{index + 1}</div>
              <span>{step}</span>
              {index < t.flow.length - 1 && <div className="system-dashboard__connector" />}
            </div>
          ))}
        </div>
      </div>

      <div className="system-dashboard__tasks">
        <div className="system-dashboard__section-title">{t.tasks}</div>
        {t.taskItems.map((task, index) => (
          <div className="system-dashboard__task" key={task}>
            <span className={index === 0 ? 'is-active' : ''}><Check size={11} /></span>
            <p>{task}</p>
            <div><i style={{ width: `${76 - index * 14}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
