'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PortfolioProofImage } from '@/data/portfolio';

type AutoRotatingProofCardProps = {
  titleAr: string;
  titleEn: string;
  labelAr: string;
  labelEn: string;
  descriptionAr: string;
  descriptionEn: string;
  serviceId: string;
  images: PortfolioProofImage[];
  ctaAnchor: string;
  lang: 'en' | 'ar';
};

export function AutoRotatingProofCard({
  titleAr,
  titleEn,
  labelAr,
  labelEn,
  descriptionAr,
  descriptionEn,
  serviceId,
  images,
  ctaAnchor,
  lang
}: AutoRotatingProofCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());
  const isRtl = lang === 'ar';
  const usableImages = useMemo(
    () => images.filter((image) => !failedImages.has(image.src)),
    [failedImages, images]
  );
  const activeImage = usableImages[activeIndex % Math.max(usableImages.length, 1)];
  const delay = 3500 + (serviceId.length % 4) * 350;

  useEffect(() => {
    if (isPaused || usableImages.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % usableImages.length);
    }, delay);
    return () => window.clearInterval(timer);
  }, [delay, isPaused, usableImages.length]);

  useEffect(() => {
    if (activeIndex >= usableImages.length) setActiveIndex(0);
  }, [activeIndex, usableImages.length]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl"
      style={{
        background: 'linear-gradient(180deg, rgba(24,10,42,0.82), rgba(14,5,26,0.92))',
        border: '1px solid rgba(242,169,0,0.16)',
        boxShadow: '0 24px 70px rgba(0,0,0,0.22)',
        backdropFilter: 'blur(14px)'
      }}
      dir={isRtl ? 'rtl' : 'ltr'}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="relative h-[200px] overflow-hidden rounded-b-none rounded-t-3xl md:h-[240px]"
        style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.16), rgba(242,169,0,0.08))' }}
      >
        {activeImage ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0"
            >
              <Image
                src={activeImage.src}
                alt={lang === 'en' ? activeImage.altEn : activeImage.altAr}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className={activeImage.fit === 'cover' ? 'object-cover' : 'object-contain p-3'}
                onError={() => {
                  setFailedImages((current) => new Set(current).add(activeImage.src));
                }}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div>
              <div className="mx-auto mb-3 h-10 w-10 rounded-full" style={{ background: 'rgba(242,169,0,0.16)', border: '1px solid rgba(242,169,0,0.25)' }} />
              <p className="text-sm font-bold" style={{ color: '#FFD666' }}>
                {lang === 'en' ? 'Portfolio sample coming soon' : 'سيتم إضافة نموذج قريبًا'}
              </p>
            </div>
          </div>
        )}
        {usableImages.length > 1 ? (
          <div className="absolute bottom-3 end-3 rounded-full px-3 py-1 text-[0.7rem] font-bold" style={{ background: 'rgba(20,9,38,0.72)', color: '#FFD666', border: '1px solid rgba(242,169,0,0.18)' }}>
            {(activeIndex % usableImages.length) + 1}/{usableImages.length}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em]" style={{ color: '#A78BFA' }}>
          {lang === 'en' ? labelEn : labelAr}
        </p>
        <h3 className="mt-2 text-xl font-extrabold leading-tight" style={{ color: '#fff' }}>
          {lang === 'en' ? titleEn : titleAr}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6" style={{ color: '#B5AEC4' }}>
          {lang === 'en' ? descriptionEn : descriptionAr}
        </p>
        <a
          href={ctaAnchor}
          className="mt-5 inline-flex w-fit items-center justify-center rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 hover:scale-[1.03]"
          style={{ background: 'rgba(242,169,0,0.12)', border: '1px solid rgba(242,169,0,0.28)', color: '#FFD666' }}
        >
          {lang === 'en' ? 'Explore service' : 'اعرف الخدمة'}
        </a>
      </div>
    </motion.article>
  );
}
