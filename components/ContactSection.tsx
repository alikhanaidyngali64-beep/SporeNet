'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import SectionHeading from './SectionHeading';

const EMAIL = 'alikhanaidyngali64@gmail.com';

export default function ContactSection() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name || !email || !message) {
      setStatus('error');
      return;
    }

    const subject = encodeURIComponent(`SporeNet contact — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus('sent');
      form.reset();
    }, 400);
  };

  return (
    <section id="contact" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading kicker={t('kicker')} title={t('title')} lead={t('lead')} />
            <div className="mt-10 flex items-center gap-3 text-sm">
              <Mail size={16} className="text-accent" />
              <span className="text-muted">{t('directEmail')}</span>
              <a
                href={`mailto:${EMAIL}`}
                className="font-medium text-fg underline-offset-4 transition hover:text-accent hover:underline"
              >
                {EMAIL}
              </a>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-line bg-elev p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted">
                  {t('form.name')}
                </span>
                <input
                  name="name"
                  required
                  className="mt-2 w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm outline-none transition focus:border-accent"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-muted">
                  {t('form.email')}
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-lg border border-line bg-transparent px-4 py-3 text-sm outline-none transition focus:border-accent"
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="text-xs uppercase tracking-widest text-muted">
                {t('form.message')}
              </span>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full resize-none rounded-lg border border-line bg-transparent px-4 py-3 text-sm outline-none transition focus:border-accent"
              />
            </label>

            <div className="mt-6 flex items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium disabled:opacity-60"
              >
                {status === 'sending' ? t('form.sending') : t('form.submit')}
                <Send size={14} />
              </button>
              {status === 'sent' && (
                <span className="text-sm text-accent">{t('form.success')}</span>
              )}
              {status === 'error' && (
                <span className="text-sm text-accent2">{t('form.error')}</span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
