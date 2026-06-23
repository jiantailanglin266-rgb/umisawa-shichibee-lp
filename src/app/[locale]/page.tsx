import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { FaqJsonLd } from "@/components/StructuredData";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { PrayerSections } from "@/components/PrayerSections";
import { Experience } from "@/components/Experience";
import { AtmosphereBand } from "@/components/AtmosphereBand";
import { Project } from "@/components/Project";
import { SiteToday } from "@/components/SiteToday";
import { Rewards } from "@/components/Rewards";
import { Gallery } from "@/components/Gallery";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = isLocale(locale) ? getDictionary(locale) : null;
  return (
    <>
      {t && <FaqJsonLd items={t.faq.items} locale={locale} />}
      <Header />
      <main>
        <Hero />
        <Story />
        <PrayerSections />
        <Experience />
        <AtmosphereBand />
        <Project />
        <SiteToday />
        <Rewards />
        <Gallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
