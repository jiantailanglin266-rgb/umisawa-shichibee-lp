import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, ogLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/lib/site";
import { fontVars } from "@/lib/fonts";
import { LocaleProvider } from "@/components/LocaleProvider";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const keywords: Record<Locale, string[]> = {
  ja: ["サウナ", "奥多摩", "海沢", "Makuake", "クラウドファンディング", "整う", "ととのい", "湯治", "スパ", "薪サウナ", "外気浴", "七兵衛", "東京 サウナ"],
  en: ["sauna", "Okutama", "Unazawa", "Tokyo sauna", "wood-fired sauna", "cold bath", "totonou", "touji", "spa", "Makuake", "crowdfunding", "Shichibee"],
  zh: ["桑拿", "奥多摩", "海沢", "东京 桑拿", "柴烧桑拿", "冷水浴", "汤治", "水疗", "Makuake", "众筹", "七兵衛"],
  ko: ["사우나", "오쿠타마", "우나자와", "도쿄 사우나", "장작 사우나", "냉수욕", "정돈", "탕치", "스파", "Makuake", "크라우드펀딩", "시치베에"],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${siteConfig.url}/${l}`;
  languages["x-default"] = `${siteConfig.url}/ja`;

  return {
    title: { default: t.meta.title, template: `%s｜${t.meta.titleSuffix}` },
    description: t.meta.description,
    keywords: keywords[locale],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    applicationName: siteConfig.name,
    formatDetection: { telephone: false, email: false, address: false },
    alternates: { canonical: `${siteConfig.url}/${locale}`, languages },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
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
    <html lang={locale} className={fontVars}>
      <body>
        <LocaleProvider locale={locale as Locale} dict={dict}>
          <JsonLd locale={locale as Locale} dict={dict} />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
