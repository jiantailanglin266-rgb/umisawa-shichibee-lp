import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { ReserveForm } from "@/components/ReserveForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.reserve.title,
    description: t.reserve.lead,
    alternates: { canonical: `${siteConfig.url}/${locale}/reserve` },
  };
}

export default async function ReservePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <Header />
      <main className="pt-20">
        <PageBanner src="/banners/reserve.webp" alt={t.reserve.title} />
        <ReserveForm />
      </main>
      <Footer />
    </>
  );
}
