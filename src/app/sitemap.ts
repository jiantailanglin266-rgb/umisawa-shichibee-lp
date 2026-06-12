import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// 静的書き出し（output: export）で生成するため
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/tokushoho`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
