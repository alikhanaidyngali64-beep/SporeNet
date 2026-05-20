'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    ['problem', t('problem')],
    ['solution', t('solution')],
    ['stats', t('stats')],
    ['team', t('team')],
    ['contact', t('contact')],
  ] as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md' : ''
      }`}
      style={scrolled ? { background: 'color-mix(in srgb, var(--bg) 75%, transparent)' } : undefined}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center text-fg">
          <Logo />
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {items.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm text-muted transition hover:text-accent"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
