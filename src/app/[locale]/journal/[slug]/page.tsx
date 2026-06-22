import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/lib/site";
import { journalMeta } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JournalArticle } from "@/components/JournalArticle";

export const dynamicParams = false;

export function generateStaticParams() {
  return journalMeta.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  const index = journalMeta.findIndex((m) => m.slug === slug);
  const art = t.journal.articles[index];
  if (!art) return {};
  return {
    title: art.title,
    description: art.excerpt,
    alternates: { canonical: `${siteConfig.url}/${locale}/journal/${slug}` },
    openGraph: {
      type: "article",
      title: art.title,
      description: art.excerpt,
      images: [{ url: `${siteConfig.url}${journalMeta[index].image}` }],
    },
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  if (!journalMeta.some((m) => m.slug === slug)) notFound();

  return (
    <>
      <Header />
      <main className="pt-20">
        <JournalArticle slug={slug} />
      </main>
      <Footer />
    </>
  );
}
