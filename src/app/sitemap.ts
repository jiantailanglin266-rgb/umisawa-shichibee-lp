import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { locales } from "@/i18n/config";
import { journalMeta } from "@/lib/data";

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
    entries.push({ url: `${base}/${locale}/about`, changeFrequency: "monthly", priority: 0.6 });
    entries.push({ url: `${base}/${locale}/news`, changeFrequency: "weekly", priority: 0.6 });
    entries.push({ url: `${base}/${locale}/journal`, changeFrequency: "weekly", priority: 0.6 });
    for (const m of journalMeta) {
      entries.push({ url: `${base}/${locale}/journal/${m.slug}`, changeFrequency: "monthly", priority: 0.5 });
    }
    entries.push({ url: `${base}/${locale}/access`, changeFrequency: "monthly", priority: 0.7 });
    entries.push({ url: `${base}/${locale}/pricing`, changeFrequency: "monthly", priority: 0.7 });
    entries.push({ url: `${base}/${locale}/guide`, changeFrequency: "monthly", priority: 0.6 });
    entries.push({ url: `${base}/${locale}/reserve`, changeFrequency: "monthly", priority: 0.7 });
    entries.push({ url: `${base}/${locale}/privacy`, changeFrequency: "yearly", priority: 0.2 });
    entries.push({ url: `${base}/${locale}/tokushoho`, changeFrequency: "yearly", priority: 0.2 });
  }

  return entries;
}
