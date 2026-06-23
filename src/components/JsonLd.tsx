import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import { bcp47 } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const MAP_QUERY = "東京都西多摩郡奥多摩町海沢";
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

/**
 * サイト共通の構造化データ（@graph）。
 * Organization / WebSite / LocalBusiness を @id で連結し、検索エンジンと
 * LLM が施設情報（所在地・営業時間・価格帯・設備・SNS）を正確に解釈できるようにする。
 */
export function JsonLd({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = siteConfig.url;
  const localeUrl = `${base}/${locale}`;
  const sameAs = [siteConfig.social.instagram, siteConfig.social.x, siteConfig.social.youtube];
  const logo = `${base}${siteConfig.logo}`;
  const image = `${base}${siteConfig.ogImage}`;
  const amenities = dict.experience.items.map((i) => i.title);

  const address = {
    "@type": "PostalAddress",
    streetAddress: "海沢",
    addressLocality: "奥多摩町",
    addressRegion: "東京都",
    addressCountry: "JP",
  };

  const graph = [
    {
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: siteConfig.name,
      alternateName: siteConfig.nameEn,
      url: localeUrl,
      logo: { "@type": "ImageObject", url: logo, width: 512, height: 512 },
      image,
      description: dict.meta.description,
      slogan: dict.footer.tagline,
      email: "info@unazawa-shichibee.jp",
      address,
      areaServed: "Okutama, Tokyo, Japan",
      sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${base}/#website`,
      url: localeUrl,
      name: siteConfig.name,
      description: dict.meta.description,
      inLanguage: bcp47[locale],
      publisher: { "@id": `${base}/#organization` },
    },
    {
      "@type": "HealthAndBeautyBusiness",
      "@id": `${base}/#business`,
      name: siteConfig.name,
      url: localeUrl,
      description: dict.meta.description,
      image,
      logo,
      email: "info@unazawa-shichibee.jp",
      address,
      areaServed: "Okutama, Tokyo, Japan",
      hasMap: mapUrl,
      priceRange: "¥3,500–¥30,000",
      currenciesAccepted: "JPY",
      paymentAccepted: "Cash, Credit Card",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "10:00",
          closes: "22:00",
        },
      ],
      amenityFeature: amenities.map((name) => ({
        "@type": "LocationFeatureSpecification",
        name,
        value: true,
      })),
      parentOrganization: { "@id": `${base}/#organization` },
      sameAs,
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}
