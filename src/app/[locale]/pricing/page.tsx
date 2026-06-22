import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingContent } from "@/components/PricingContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.pricing.title,
    description: t.pricing.lead,
    alternates: { canonical: `${siteConfig.url}/${locale}/pricing` },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Header />
      <main className="pt-20">
        <PricingContent />
      </main>
      <Footer />
    </>
  );
}
