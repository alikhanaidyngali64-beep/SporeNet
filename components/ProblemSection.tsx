'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { BurnedForestArt, MyceliumLossArt, LonelySaplingArt } from './ProblemIllustrations';

type Card = { title: string; text: string };

const ARTS = [BurnedForestArt, MyceliumLossArt, LonelySaplingArt];

export default function ProblemSection() {
  const t = useTranslations('problem');
  const cards = t.raw('cards') as Card[];

  return (
    <section id="problem" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading kicker={t('kicker')} title={t('title')} lead={t('lead')} />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => {
            const Art = ARTS[i] ?? ARTS[0];
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-line bg-elev"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Art />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-elev)] via-[var(--bg-elev)]/20 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="font-display text-xl">{card.title}</div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{card.text}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
