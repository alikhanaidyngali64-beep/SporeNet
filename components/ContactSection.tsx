'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Copy, Check } from 'lucide-react';
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
      // ignore — fall back to mailto link
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
          className="mx-auto mt-12 max-w-xl rounded-2xl border border-line bg-elev p-8 sm:p-10"
        >
          <div className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
            <Mail size={14} className="text-accent" />
            <span>{t('directEmail')}</span>
          </div>

          <a
            href={`mailto:${EMAIL}`}
            className="mt-4 block break-all font-display text-2xl text-fg transition hover:text-accent sm:text-3xl"
          >
            {EMAIL}
          </a>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium"
            >
              <Mail size={14} />
              {t('writeButton')}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-transparent px-5 py-3 text-sm font-medium text-fg transition hover:border-accent hover:text-accent"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? t('copied') : t('copy')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
