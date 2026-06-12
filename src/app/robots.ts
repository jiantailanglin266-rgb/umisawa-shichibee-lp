import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// 静的書き出し（output: export）で生成するため
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
