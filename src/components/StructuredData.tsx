import { siteConfig } from "@/lib/site";

function Ld({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** FAQPage（よくある質問ページ・トップに設置）。 */
export function FaqJsonLd({ items, locale }: { items: { q: string; a: string }[]; locale: string }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/${locale}#faq`,
        inLanguage: locale,
        mainEntity: items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

/** BlogPosting（ジャーナル記事）。 */
export function ArticleJsonLd({
  headline,
  description,
  image,
  url,
  datePublished,
  locale,
}: {
  headline: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  locale: string;
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline,
        description,
        image,
        inLanguage: locale,
        datePublished,
        dateModified: datePublished,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@id": `${siteConfig.url}/#organization` },
        publisher: { "@id": `${siteConfig.url}/#organization` },
      }}
    />
  );
}

/** BreadcrumbList。 */
export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: it.url,
        })),
      }}
    />
  );
}
