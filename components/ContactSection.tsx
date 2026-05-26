'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';

const EMAIL = 'alikhanaidyngali64@gmail.com';

export default function ContactSection() {
  const t = useTranslations('contact');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fall back — user can tap the email link directly
    }
  };

  return (
    <section id="contact" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <SectionHeading kicker={t('kicker')} title={t('title')} lead={t('lead')} align="center" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="contact-card mx-auto mt-12 max-w-xl overflow-hidden rounded-2xl border border-line bg-elev"
        >
          {/* Email display */}
          <div className="px-8 pt-8 pb-6 sm:px-10 sm:pt-10">
            <div className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{t('directEmail')}</span>
            </div>

            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 block break-all font-display text-lg text-fg underline-offset-4 transition hover:text-accent hover:underline sm:text-xl"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {EMAIL}
            </a>
          </div>

          {/* Primary CTA — full width, easy to tap on mobile */}
          <div className="px-6 pb-3 sm:px-8">
            <a
              href={`mailto:${EMAIL}`}
              className="email-cta-btn flex w-full touch-manipulation items-center justify-center gap-2.5 rounded-xl py-4 text-base font-semibold"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <Mail size={18} />
              {t('writeButton')}
              <ArrowUpRight size={15} className="opacity-70" />
            </a>
          </div>

          {/* Secondary — copy */}
          <div className="px-6 pb-7 sm:px-8 sm:pb-9">
            <button
              type="button"
              onClick={handleCopy}
              className="flex w-full touch-manipulation items-center justify-center gap-2 rounded-xl border border-line bg-transparent px-6 py-3.5 text-sm font-medium text-fg transition hover:border-accent hover:text-accent active:scale-[0.98]"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
              {copied ? t('copied') : t('copy')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
