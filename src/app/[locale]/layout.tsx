import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, ogLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/lib/site";
import { LocaleProvider } from "@/components/LocaleProvider";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  // 全ロケールの hreflang
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${siteConfig.url}/${l}`;
  languages["x-default"] = `${siteConfig.url}/ja`;

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages,
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: `${siteConfig.url}${siteConfig.ogImage}`, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [`${siteConfig.url}${siteConfig.ogImage}`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <LocaleProvider locale={locale as Locale} dict={dict}>
      <JsonLd locale={locale as Locale} dict={dict} />
      {children}
    </LocaleProvider>
  );
}
