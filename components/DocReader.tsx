'use client';

import { ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';

type Para = { text: string; bold: boolean };

const BACK_LABEL: Record<string, string> = {
  en: 'Back to site',
  ru: 'На сайт',
  kk: 'Сайтқа оралу',
};
const DOWNLOAD_LABEL: Record<string, string> = {
  en: 'Download .docx',
  ru: 'Скачать .docx',
  kk: '.docx жүктеу',
};

function isHeading(text: string, bold: boolean): boolean {
  if (!bold) return false;
  if (text.length > 120) return false;
  if (/^\d+\./.test(text)) return true;
  if (/^[А-ЯЁҚҒҮҰІҢӘҺA-Z]/.test(text) && text.length < 80) return true;
  return false;
}

function isSubHeading(text: string): boolean {
  return /^\d+\.\d+/.test(text);
}

function isSectionTitle(text: string): boolean {
  return /^\d+\. /.test(text) && text.length < 60;
}

export default function DocReader({
  title,
  downloadHref,
  paragraphs,
  locale,
}: {
  title: string;
  downloadHref: string;
  paragraphs: Para[];
  locale: string;
}) {
  const backLabel = BACK_LABEL[locale] ?? BACK_LABEL.en;
  const dlLabel   = DOWNLOAD_LABEL[locale] ?? DOWNLOAD_LABEL.en;

  return (
    <div className="min-h-screen bg-surface">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-40 border-b border-line backdrop-blur-md"
           style={{ background: 'color-mix(in srgb, var(--bg) 85%, transparent)' }}>
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-3">
          <Link
            href={`/${locale}#contact`}
            className="flex touch-manipulation items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm text-muted transition hover:border-accent hover:text-accent active:scale-95"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <ArrowLeft size={14} />
            {backLabel}
          </Link>

          <a
            href={downloadHref}
            download
            className="email-cta-btn flex touch-manipulation items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <Download size={14} />
            {dlLabel}
          </a>
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-5 pb-24 pt-12">
        <h1 className="font-display text-3xl font-light leading-tight sm:text-4xl">{title}</h1>
        <div className="mt-1 h-px w-16 bg-accent" />

        <div className="mt-10 space-y-3">
          {paragraphs.map((p, i) => {
            const text = p.text;

            if (isSectionTitle(text)) {
              return (
                <h2 key={i} className="mt-10 font-display text-xl font-light text-fg first:mt-0 sm:text-2xl">
                  {text}
                </h2>
              );
            }
            if (isSubHeading(text)) {
              return (
                <h3 key={i} className="mt-6 text-base font-semibold text-fg">
                  {text}
                </h3>
              );
            }
            if (isHeading(text, p.bold)) {
              return (
                <p key={i} className="pt-2 text-sm font-semibold text-fg">
                  {text}
                </p>
              );
            }
            if (text.startsWith('❝') || text.startsWith('→')) {
              return (
                <p key={i} className={`border-l-2 border-accent/40 pl-4 text-sm leading-relaxed ${text.startsWith('→') ? 'text-accent' : 'text-muted italic'}`}>
                  {text}
                </p>
              );
            }

            return (
              <p key={i} className="text-sm leading-relaxed text-muted sm:text-base">
                {text}
              </p>
            );
          })}
        </div>
      </article>
    </div>
  );
}
