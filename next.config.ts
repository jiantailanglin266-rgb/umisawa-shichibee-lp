import type { NextConfig } from "next";

/**
 * GitHub Pages 公開時は環境変数 GITHUB_PAGES=true を立て、
 * 静的書き出し（output: export）＋サブパス（/umisawa-shichibee-lp）に切替えます。
 * ローカル開発・Vercel ではこれらは無効（通常の Next.js として動作）。
 */
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "umisawa-shichibee-lp";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // next/image は basePath を src に自動付与しないため、
  // クライアントから参照できる基準パスを明示的に公開する（asset() で使用）
  env: {
    NEXT_PUBLIC_BASE_PATH: isPages ? `/${repo}` : "",
  },
  ...(isPages
    ? {
        output: "export",
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
        trailingSlash: true,
      }
    : {}),
  images: {
    // 静的書き出しでは画像最適化サーバーが使えないため無効化
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.microcms-assets.io" },
    ],
  },
};

export default nextConfig;
