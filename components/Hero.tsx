'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowDown, Users } from 'lucide-react';
import MyceliumBackground from './MyceliumBackground';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <MyceliumBackground />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 35%, transparent 0%, var(--bg) 75%)',
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs uppercase tracking-widest text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t('tagline')}
          </span>

          <h1 className="mt-7 font-display text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            {t('title')}
          </h1>

          <p className="mt-5 max-w-xl font-display text-xl italic text-accent2 sm:text-2xl">
            {t('subtitle')}
          </p>

          <p className="mt-3 max-w-xl font-display text-base italic text-muted">
            {t('kazakh')}
          </p>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {t('lead')}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#problem"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
            >
              {t('ctaPrimary')}
              <ArrowDown size={16} />
            </a>
            <a
              href="#team"
              className="btn-ghost inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
            >
              {t('ctaSecondary')}
              <Users size={16} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <div className="h-8 w-px bg-current opacity-40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
