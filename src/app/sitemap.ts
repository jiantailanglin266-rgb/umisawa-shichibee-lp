import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { locales } from "@/i18n/config";

// 静的書き出し（output: export）で生成するため
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const languages: Record<string, string> = {};
    for (const l of locales) languages[l] = `${base}/${l}`;

    entries.push({
      url: `${base}/${locale}`,
      changeFrequency: "weekly",
      priority: locale === "ja" ? 1 : 0.8,
      alternates: { languages },
    });
    entries.push({ url: `${base}/${locale}/reserve`, changeFrequency: "monthly", priority: 0.7 });
    entries.push({ url: `${base}/${locale}/privacy`, changeFrequency: "yearly", priority: 0.2 });
    entries.push({ url: `${base}/${locale}/tokushoho`, changeFrequency: "yearly", priority: 0.2 });
  }

  return entries;
}
