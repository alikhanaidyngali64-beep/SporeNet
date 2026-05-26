'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { FileText, FlaskConical, TrendingUp, BookOpen, Download } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Link from 'next/link';

const DOCS = [
  {
    key: 'project',
    slug: 'project',
    icon: FileText,
    color: 'text-accent',
    bg: 'bg-accent/10',
    download: '/docs/sporenet-project-docs.docx',
  },
  {
    key: 'evidence',
    slug: 'evidence',
    icon: FlaskConical,
    color: 'text-accent2',
    bg: 'bg-accent2/10',
    download: '/docs/sporenet-evidence.docx',
  },
  {
    key: 'business',
    slug: 'business-plan',
    icon: TrendingUp,
    color: 'text-accent',
    bg: 'bg-accent/10',
    download: '/docs/sporenet-business-plan.docx',
  },
] as const;

export default function DocsSection() {
  const t = useTranslations('docs');
  const locale = useLocale();

  return (
    <section id="docs" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading kicker={t('kicker')} title={t('title')} lead={t('lead')} />

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {DOCS.map((doc, i) => {
            const Icon = doc.icon;
            return (
              <motion.div
                key={doc.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="doc-card flex flex-col rounded-2xl border border-line bg-elev p-6 transition-shadow hover:shadow-[var(--shadow-md)]"
              >
                {/* Icon badge */}
                <div className={`${doc.bg} inline-flex w-fit rounded-xl p-3`}>
                  <Icon size={22} className={doc.color} />
                </div>

                {/* Text */}
                <h3 className="mt-5 font-display text-xl font-light leading-snug text-fg">
                  {t(`${doc.key}.title`)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {t(`${doc.key}.desc`)}
                </p>

                {/* Actions */}
                <div className="mt-6 flex gap-2">
                  <Link
                    href={`/${locale}/docs/${doc.slug}`}
                    className="email-cta-btn flex flex-1 touch-manipulation items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <BookOpen size={15} />
                    {t('readBtn')}
                  </Link>
                  <a
                    href={doc.download}
                    download
                    aria-label={t('downloadBtn')}
                    className="flex touch-manipulation items-center justify-center rounded-xl border border-line px-4 py-3 text-muted transition hover:border-accent hover:text-accent active:scale-95"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <Download size={15} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
