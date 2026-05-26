'use client';

import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';
import Logo from './Logo';

const EMAIL = 'alikhanaidyngali64@gmail.com';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto max-w-6xl px-5">
        {/* Email quick-link strip */}
        <div className="mb-8 flex flex-col items-center gap-3 rounded-xl border border-line bg-elev px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-muted">{t('emailCta')}</p>
          <a
            href={`mailto:${EMAIL}`}
            className="email-cta-btn inline-flex shrink-0 touch-manipulation items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <Mail size={15} />
            {EMAIL}
          </a>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <div className="text-xs leading-relaxed text-muted sm:text-right">
            <div>© {year} SporeNet. {t('rights')}</div>
            <div className="mt-1">{t('builtFor')}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
