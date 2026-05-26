'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { locales, localeNames, localeFullNames, type Locale } from '@/i18n/config';
import { Globe, Check, ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
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
        className="flex h-10 touch-manipulation items-center gap-1.5 rounded-full border border-line px-3.5 text-sm transition hover:border-accent hover:text-accent active:scale-95"
        aria-expanded={open}
        aria-haspopup="listbox"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <Globe size={14} />
        <span className="font-medium">{localeNames[locale]}</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <>
          {/* Backdrop to capture outside taps on mobile */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <ul
            role="listbox"
            className="absolute right-0 top-12 z-20 min-w-[160px] overflow-hidden rounded-xl border border-line bg-elev shadow-xl"
          >
            {locales.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  onClick={() => switchTo(l)}
                  className="flex w-full touch-manipulation items-center justify-between px-4 py-3.5 text-sm transition hover:bg-accent/10 active:bg-accent/20"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <span className="font-medium">{localeFullNames[l]}</span>
                  {locale === l && <Check size={14} className="text-accent" />}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
