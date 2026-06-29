'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';
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
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());
  const isRtl = lang === 'ar';
  const usableImages = useMemo(
    () => images.filter((image) => !failedImages.has(image.src)),
    [failedImages, images]
  );
  const activeImage = usableImages[activeIndex % Math.max(usableImages.length, 1)];
  const delay = 3500 + (serviceId.length % 4) * 350;

  useEffect(() => {
    if (isPaused || viewerOpen || usableImages.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % usableImages.length);
    }, delay);
    return () => window.clearInterval(timer);
  }, [delay, isPaused, usableImages.length, viewerOpen]);

  useEffect(() => {
    if (activeIndex >= usableImages.length) setActiveIndex(0);
  }, [activeIndex, usableImages.length]);

  useEffect(() => {
    if (viewerIndex >= usableImages.length) setViewerIndex(0);
  }, [usableImages.length, viewerIndex]);

  useEffect(() => {
    if (!viewerOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setViewerOpen(false);
      if (event.key === 'ArrowLeft') {
        setViewerIndex((current) => (isRtl ? current + 1 : current - 1 + usableImages.length) % usableImages.length);
      }
      if (event.key === 'ArrowRight') {
        setViewerIndex((current) => (isRtl ? current - 1 + usableImages.length : current + 1) % usableImages.length);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRtl, usableImages.length, viewerOpen]);

  const openViewer = () => {
    if (!usableImages.length) return;
    setViewerIndex(activeIndex % usableImages.length);
    setViewerOpen(true);
  };

  const goToPrevious = () => {
    setViewerIndex((current) => (current - 1 + usableImages.length) % usableImages.length);
  };

  const goToNext = () => {
    setViewerIndex((current) => (current + 1) % usableImages.length);
  };

  const viewerImage = usableImages[viewerIndex];

  return (
    <>
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
            <>
              <button
                type="button"
                onClick={openViewer}
                className="absolute inset-0 z-10 cursor-zoom-in"
                aria-label={lang === 'en' ? 'Open portfolio photos' : 'فتح صور العمل'}
              >
                <span className="sr-only">{lang === 'en' ? 'Open portfolio photos' : 'فتح صور العمل'}</span>
              </button>
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
              <div className="pointer-events-none absolute top-3 end-3 z-20 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.7rem] font-bold opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'rgba(20,9,38,0.72)', color: '#FFD666', border: '1px solid rgba(242,169,0,0.18)' }}>
                <Maximize2 size={12} />
                {lang === 'en' ? 'Open' : 'فتح'}
              </div>
            </>
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
            <div className="absolute bottom-3 end-3 z-20 rounded-full px-3 py-1 text-[0.7rem] font-bold" style={{ background: 'rgba(20,9,38,0.72)', color: '#FFD666', border: '1px solid rgba(242,169,0,0.18)' }}>
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

      <AnimatePresence>
        {viewerOpen && viewerImage ? (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'en' ? `${titleEn} photos` : `${titleAr} صور`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 cursor-default"
              style={{ background: 'rgba(5,2,12,0.86)', backdropFilter: 'blur(16px)' }}
              onClick={() => setViewerOpen(false)}
              aria-label={lang === 'en' ? 'Close photos' : 'إغلاق الصور'}
            />
            <motion.div
              className="relative z-10 flex h-full max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl"
              style={{ background: 'rgba(15,6,28,0.96)', border: '1px solid rgba(242,169,0,0.22)', boxShadow: '0 30px 120px rgba(0,0,0,0.45)' }}
              initial={{ scale: 0.96, y: 14 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 14 }}
              transition={{ duration: 0.24 }}
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 md:px-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: '#A78BFA' }}>
                    {lang === 'en' ? labelEn : labelAr}
                  </p>
                  <h3 className="mt-1 text-sm font-bold md:text-base" style={{ color: '#fff' }}>
                    {lang === 'en' ? titleEn : titleAr}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ color: '#FFD666', border: '1px solid rgba(242,169,0,0.2)' }}>
                    {viewerIndex + 1}/{usableImages.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setViewerOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105"
                    style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.12)' }}
                    aria-label={lang === 'en' ? 'Close photos' : 'إغلاق الصور'}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="relative min-h-0 flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={viewerImage.src}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28 }}
                  >
                    <Image
                      src={viewerImage.src}
                      alt={lang === 'en' ? viewerImage.altEn : viewerImage.altAr}
                      fill
                      sizes="100vw"
                      className="object-contain p-3 md:p-6"
                    />
                  </motion.div>
                </AnimatePresence>

                {usableImages.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={isRtl ? goToNext : goToPrevious}
                      className="absolute start-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-transform hover:scale-105 md:start-5 md:h-12 md:w-12"
                      style={{ background: 'rgba(20,9,38,0.72)', color: '#FFD666', border: '1px solid rgba(242,169,0,0.26)' }}
                      aria-label={lang === 'en' ? 'Previous photo' : 'الصورة السابقة'}
                    >
                      {isRtl ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                    </button>
                    <button
                      type="button"
                      onClick={isRtl ? goToPrevious : goToNext}
                      className="absolute end-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full transition-transform hover:scale-105 md:end-5 md:h-12 md:w-12"
                      style={{ background: 'rgba(20,9,38,0.72)', color: '#FFD666', border: '1px solid rgba(242,169,0,0.26)' }}
                      aria-label={lang === 'en' ? 'Next photo' : 'الصورة التالية'}
                    >
                      {isRtl ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                    </button>
                  </>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
