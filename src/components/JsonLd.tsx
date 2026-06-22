import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/** 構造化データ（JSON-LD）。組織・施設・FAQ をロケール別に出力。 */
export function JsonLd({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const localeUrl = `${siteConfig.url}/${locale}`;
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: localeUrl,
      logo: `${siteConfig.url}${siteConfig.logo}`,
      image: `${siteConfig.url}${siteConfig.ogImage}`,
      description: dict.meta.description,
      sameAs: [siteConfig.social.instagram, siteConfig.social.x, siteConfig.social.youtube].filter(Boolean),
    },
    {
      "@context": "https://schema.org",
      "@type": "HealthAndBeautyBusiness",
      name: siteConfig.name,
      description: dict.meta.description,
      url: localeUrl,
      address: {
        "@type": "PostalAddress",
        addressCountry: "JP",
        addressRegion: "東京都",
        addressLocality: "西多摩郡奥多摩町",
        streetAddress: "海沢",
      },
      areaServed: "東京都奥多摩町",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: dict.faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
