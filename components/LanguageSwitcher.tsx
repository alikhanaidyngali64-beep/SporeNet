'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { locales, localeNames, localeFullNames, type Locale } from '@/i18n/config';
import { Globe, Check } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchTo = (target: Locale) => {
    router.replace(pathname, { locale: target });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-sm transition hover:border-accent hover:text-accent"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe size={14} />
        <span className="font-medium">{localeNames[locale]}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-11 z-20 min-w-[140px] overflow-hidden rounded-lg border border-line bg-elev shadow-lg"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => switchTo(l)}
                className="flex w-full items-center justify-between px-3 py-2 text-sm transition hover:bg-accent/10"
              >
                <span>{localeFullNames[l]}</span>
                {locale === l && <Check size={14} className="text-accent" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
