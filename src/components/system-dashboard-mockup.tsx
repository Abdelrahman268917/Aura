import { BarChart3, Check, Clock3, RefreshCw, Workflow } from 'lucide-react';

type SystemDashboardMockupProps = {
  lang: 'en' | 'ar';
};

const copy = {
  en: {
    eyebrow: 'AURA COMMAND LAYER',
    title: 'Enterprise System View',
    live: 'Operating layer live',
    active: 'Active',
    cards: [
      { label: 'Workflow Health', value: 'Visible', detail: 'Core paths monitored' },
      { label: 'AI Agents', value: 'Supervised', detail: 'Human review points' },
      { label: 'Leadership Review', value: 'Ready', detail: 'Priorities prepared' },
      { label: 'Growth Layer', value: 'Connected', detail: 'Campaigns linked to follow-up' },
    ],
    flowTitle: 'Lead-to-report operating flow',
    flow: ['Lead', 'Check', 'Assign', 'Follow-up', 'Report'],
    tasks: 'Operating tasks',
    taskItems: ['Review new signals', 'Monitor cross-team handoffs', 'Prepare improvement priorities'],
  },
  ar: {
    eyebrow: 'طبقة قيادة AURA',
    title: 'رؤية المنظومة المؤسسية',
    live: 'طبقة تشغيل نشطة',
    active: 'نشط',
    cards: [
      { label: 'صحة سير العمل', value: 'مرئية', detail: 'مراقبة المسارات الأساسية' },
      { label: 'وكلاء الذكاء الاصطناعي', value: 'تحت إشراف', detail: 'نقاط مراجعة بشرية' },
      { label: 'مراجعة القيادة', value: 'جاهزة', detail: 'الأولويات معدة' },
      { label: 'طبقة النمو', value: 'مترابطة', detail: 'الحملات مرتبطة بالمتابعة' },
    ],
    flowTitle: 'مسار التشغيل من العميل إلى التقرير',
    flow: ['عميل محتمل', 'مراجعة', 'إسناد', 'متابعة', 'تقرير'],
    tasks: 'مهام التشغيل',
    taskItems: ['مراجعة الإشارات الجديدة', 'مراقبة انتقال العمل بين الفرق', 'إعداد أولويات التحسين'],
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
          <span className="system-dashboard__status"><Check size={12} /> {t.active}</span>
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
