'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

type Member = { name: string; role: string; bio: string };

function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '');
}

const accents = ['var(--accent)', 'var(--accent-2)', 'var(--accent)', 'var(--accent-2)'];

export default function TeamSection() {
  const t = useTranslations('team');
  const members = t.raw('members') as Member[];

  return (
    <section id="team" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading kicker={t('kicker')} title={t('title')} lead={t('lead')} align="center" />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-elev p-6 transition hover:-translate-y-1"
            >
              <div
                className="grid h-24 w-24 place-items-center rounded-full font-display text-3xl tracking-tight"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${accents[i % accents.length]}, transparent 75%), var(--bg)`,
                  border: '1px solid var(--border)',
                  color: 'var(--fg)',
                }}
                aria-hidden="true"
              >
                {initials(m.name)}
              </div>
              <div className="mt-6 font-display text-xl leading-tight">{m.name}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-accent">
                {m.role}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{m.bio}</p>

              <div
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 transition group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle, var(--accent) 0%, transparent 65%)',
                  filter: 'blur(28px)',
                  opacity: 0.18,
                }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
