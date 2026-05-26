import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import StatsSection from '@/components/StatsSection';
import NetworkSection from '@/components/NetworkSection';
import RoadmapSection from '@/components/RoadmapSection';
import TeamSection from '@/components/TeamSection';
import DocsSection from '@/components/DocsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative overflow-x-hidden">
      <Header />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <StatsSection />
      <NetworkSection />
      <RoadmapSection />
      <TeamSection />
      <DocsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
