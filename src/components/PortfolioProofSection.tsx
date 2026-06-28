import { portfolioProofCards } from '@/data/portfolio';
import { AutoRotatingProofCard } from './AutoRotatingProofCard';

type PortfolioProofSectionProps = {
  lang: 'en' | 'ar';
};

export function PortfolioProofSection({ lang }: PortfolioProofSectionProps) {
  const isRtl = lang === 'ar';

  return (
    <section id="portfolio" className="relative overflow-hidden px-6 py-14 md:py-18">
      <div className="absolute inset-0 -z-10 bg-radial-gradient from-purple-900/10 via-transparent to-transparent" />
      <div className="mx-auto max-w-6xl">
        <div className="mb-9 text-center" dir={isRtl ? 'rtl' : 'ltr'}>
          <span
            className="mb-5 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ background: 'rgba(139,92,246,0.1)', color: '#A78BFA', border: '1px solid rgba(139,92,246,0.15)' }}
          >
            {lang === 'en' ? 'Proof of Work' : 'نماذج عمل'}
          </span>
          <h2 className="text-3xl font-extrabold md:text-5xl text-gold-gradient">
            {lang === 'en' ? 'Proof of Work' : 'نماذج من شغلنا'}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 md:text-lg" style={{ color: '#B5AEC4' }}>
            {lang === 'en'
              ? 'Selected examples of systems, tools, automation, and growth assets built by AURA.'
              : 'نماذج مختارة من أنظمة، أدوات، أتمتة، وتسويق قمنا بتنفيذها لتوضيح طريقة تفكير أورا.'}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portfolioProofCards.map((card) => (
            <AutoRotatingProofCard key={card.serviceId} {...card} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
