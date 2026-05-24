'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

const SECTION_IDS = ['problem', 'solution', 'stats', 'network', 'roadmap', 'team', 'contact'] as const;

export default function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

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
        scrolled || open ? 'backdrop-blur-md' : ''
      }`}
      style={
        scrolled || open
          ? { background: 'color-mix(in srgb, var(--bg) 80%, transparent)' }
          : undefined
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="flex items-center text-fg"
        >
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {items.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-sm transition hover:text-accent ${
                active === id ? 'text-fg' : 'text-muted'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-line transition hover:border-accent hover:text-accent md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-line transition-[max-height,border] duration-300 md:hidden ${
          open ? 'max-h-[400px] border-t' : 'max-h-0 border-t-0'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
          {items.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`border-b border-line/60 py-3 text-sm transition last:border-b-0 hover:text-accent ${
                active === id ? 'text-fg' : 'text-muted'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
