'use client';

import { useTranslations } from 'next-intl';
import Logo from './Logo';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <div className="text-xs leading-relaxed text-muted sm:text-right">
          <div>
            © {year} SporeNet. {t('rights')}
          </div>
          <div className="mt-1">{t('builtFor')}</div>
        </div>
      </div>
    </footer>
  );
}
