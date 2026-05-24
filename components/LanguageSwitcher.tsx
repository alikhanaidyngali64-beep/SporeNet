'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { locales, localeNames, localeFullNames, defaultLocale, type Locale } from '@/i18n/config';
import { Globe, Check } from 'lucide-react';

function buildLocalizedHref(pathname: string, target: Locale, hash: string) {
  // Strip any existing locale prefix from the pathname
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] && (locales as readonly string[]).includes(segments[0])) {
    segments.shift();
  }
  const basePath = '/' + segments.join('/');
  const cleanBase = basePath === '/' ? '' : basePath;
  const prefix = target === defaultLocale ? '' : `/${target}`;
  const href = `${prefix}${cleanBase}` || '/';
  return `${href}${hash}`;
}

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const switchTo = (target: Locale) => {
    if (target === locale) {
      setOpen(false);
      return;
    }
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const href = buildLocalizedHref(pathname || '/', target, hash);
    // Persist the choice so middleware respects it on later visits.
    document.cookie = `NEXT_LOCALE=${target};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    setOpen(false);
    // Hard navigation guarantees the new locale loads even when only the
    // URL prefix changes and the React tree would otherwise reuse cache.
    window.location.assign(href);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-sm transition hover:border-accent hover:text-accent"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Change language"
      >
        <Globe size={14} />
        <span className="font-medium">{localeNames[locale]}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-11 z-20 min-w-[160px] overflow-hidden rounded-lg border border-line bg-elev shadow-lg"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => switchTo(l)}
                className="flex w-full items-center justify-between px-3 py-2 text-sm transition hover:bg-accent/10"
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted">{localeNames[l]}</span>
                  <span>{localeFullNames[l]}</span>
                </span>
                {locale === l && <Check size={14} className="text-accent" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
