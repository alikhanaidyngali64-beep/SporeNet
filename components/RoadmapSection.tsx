'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

type Phase = {
  date: string;
  title: string;
  text: string;
  status?: 'done' | 'current' | 'next' | 'goal';
  statusLabel?: string;
};

const STATUS_STYLES: Record<NonNullable<Phase['status']>, { dot: string; ring: string; chip: string }> = {
  done: {
    dot: 'bg-accent',
    ring: 'ring-accent/30',
    chip: 'border-accent/40 text-accent',
  },
  current: {
    dot: 'bg-accent2',
    ring: 'ring-accent2/30',
    chip: 'border-accent2/50 text-accent2',
  },
  next: {
    dot: 'bg-muted',
    ring: 'ring-muted/20',
    chip: 'border-line text-muted',
  },
  goal: {
    dot: 'bg-fg',
    ring: 'ring-fg/20',
    chip: 'border-fg/30 text-fg',
  },
};

export default function RoadmapSection() {
  const t = useTranslations('roadmap');
  const phases = t.raw('phases') as Phase[];

  return (
    <section id="roadmap" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading kicker={t('kicker')} title={t('title')} />

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-3 hidden h-px bg-line md:block" />
          <div className="grid gap-10 md:grid-cols-4">
            {phases.map((p, i) => {
              const style = STATUS_STYLES[p.status ?? 'next'];
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative"
                >
                  <div className="relative mb-5 flex h-6 items-center">
                    <span
                      className={`z-10 h-3 w-3 rounded-full ring-4 ring-[color:var(--bg)] ${style.dot}`}
                    />
                    <span className={`absolute left-1.5 top-1.5 h-3 w-3 rounded-full ${style.dot} opacity-40 ${style.ring} ring`} />
                    <span className="ml-3 hidden h-px flex-1 bg-line md:block" />
                  </div>
                  <div className="font-mono text-xs uppercase tracking-widest text-accent2">
                    {p.date}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="font-display text-xl">{p.title}</div>
                  </div>
                  {p.statusLabel && (
                    <span
                      className={`mt-2 inline-block rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${style.chip}`}
                    >
                      {p.statusLabel}
                    </span>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
