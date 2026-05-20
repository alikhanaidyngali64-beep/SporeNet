'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function SectionHeading({
  kicker,
  title,
  lead,
  align = 'left',
}: {
  kicker: string;
  title: string;
  lead?: ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={
        align === 'center'
          ? 'mx-auto max-w-3xl text-center'
          : 'max-w-3xl'
      }
    >
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent"
      >
        <span className="h-px w-6 bg-accent" />
        {kicker}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-4 font-display text-3xl font-light leading-tight tracking-tight sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-base leading-relaxed text-muted sm:text-lg"
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
}
