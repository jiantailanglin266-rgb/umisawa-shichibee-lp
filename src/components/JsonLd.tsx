import { siteConfig } from "@/lib/site";
import { faqs } from "@/lib/data";

/** 構造化データ（JSON-LD）。組織情報・施設情報・FAQ を出力。 */
export function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      sameAs: [siteConfig.instagram].filter(Boolean),
    },
    {
      "@context": "https://schema.org",
      "@type": "HealthAndBeautyBusiness",
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
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
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // 静的な信頼できるデータのみを出力
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
