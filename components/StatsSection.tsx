'use client';

import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

type Stat = { value: number; suffix: string; label: string };

export default function StatsSection() {
  const t = useTranslations('stats');
  const items = t.raw('items') as Stat[];
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="stats" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading kicker={t('kicker')} title={t('title')} align="center" />

        <div
          ref={ref}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-elev p-8 text-center"
            >
              <div className="font-display text-5xl tracking-tight text-accent sm:text-6xl">
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2.4}
                    separator=" "
                    suffix={stat.suffix}
                  />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
