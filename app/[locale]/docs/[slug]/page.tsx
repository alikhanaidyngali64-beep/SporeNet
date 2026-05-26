import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/config';
import DocReader from '@/components/DocReader';
import evidenceData from '@/data/doc-evidence.json';
import businessData from '@/data/doc-business.json';
import projectData  from '@/data/doc-project.json';

const DOCS = {
  evidence: {
    slug: 'evidence',
    titleKk: 'Ғылыми дәлелдер',
    titleRu: 'Научные доказательства',
    titleEn: 'Scientific Evidence',
    download: '/docs/sporenet-evidence.docx',
    data: evidenceData,
  },
  'business-plan': {
    slug: 'business-plan',
    titleKk: 'Бизнес-жоспар',
    titleRu: 'Бизнес-план',
    titleEn: 'Business Plan',
    download: '/docs/sporenet-business-plan.docx',
    data: businessData,
  },
  project: {
    slug: 'project',
    titleKk: 'Жоба құжаттамасы',
    titleRu: 'Документация проекта',
    titleEn: 'Project Documentation',
    download: '/docs/sporenet-project-docs.docx',
    data: projectData,
  },
} as const;

export function generateStaticParams() {
  const slugs = Object.keys(DOCS);
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const doc = DOCS[slug as keyof typeof DOCS];
  if (!doc) notFound();

  const title =
    locale === 'kk' ? doc.titleKk :
    locale === 'ru' ? doc.titleRu :
    doc.titleEn;

  return <DocReader title={title} downloadHref={doc.download} paragraphs={doc.data} locale={locale} />;
}
