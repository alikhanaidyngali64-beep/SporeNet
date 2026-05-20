'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

type Step = { title: string; text: string };

function StepIcon({ index }: { index: number }) {
  const paths = [
    // 1 — sample
    <g key="s" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round">
      <path d="M14 6h12l-3 18a3 3 0 0 1-3 3 3 3 0 0 1-3-3z" />
      <path d="M17 12h6" />
    </g>,
    // 2 — cultivate
    <g key="c" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round">
      <circle cx="20" cy="20" r="9" />
      <path d="M20 11v18M11 20h18M14 14l12 12M26 14l-12 12" />
    </g>,
    // 3 — inoculate
    <g key="i" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round">
      <path d="M20 6v8M20 14c-4 4-6 7-6 11a6 6 0 0 0 12 0c0-4-2-7-6-11z" />
    </g>,
    // 4 — monitor
    <g key="m" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round">
      <path d="M6 22l5-7 4 5 5-9 4 6 5-3" />
      <circle cx="11" cy="15" r="1.4" fill="currentColor" />
      <circle cx="20" cy="11" r="1.4" fill="currentColor" />
      <circle cx="29" cy="14" r="1.4" fill="currentColor" />
    </g>,
  ];
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10 text-accent" aria-hidden>
      {paths[index]}
    </svg>
  );
}

export default function SolutionSection() {
  const t = useTranslations('solution');
  const steps = t.raw('steps') as Step[];

  return (
    <section id="solution" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading kicker={t('kicker')} title={t('title')} lead={t('lead')} />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-elev p-7"
            >
              <StepIcon index={i} />
              <div className="mt-5 font-display text-xl">{step.title}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
