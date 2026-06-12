/**
 * サイト全体で参照する基本情報・環境設定。
 * Makuake 公開後は NEXT_PUBLIC_MAKUAKE_URL を設定するだけで
 * CTA の文言と遷移先が「事前通知」→「支援する」へ切替わります。
 */

export const siteConfig = {
  name: "海沢 七兵衛 SAUNA & SPA",
  nameEn: "UMISAWA SHICHIBEE",
  tagline: "ととのいは、祈りに近い。",
  taglineEn: "Tranquility is close to prayer.",
  description:
    "東京・奥多摩 海沢。北欧サウナ × 日本仏教美 × 奥多摩の自然が交わる「現代の湯治場」。Makuake クラウドファンディング公開に向けたブランドプロジェクト。",
  location: "東京都西多摩郡奥多摩町 海沢",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://umisawa-shichibee.jp",
  ogImage: "/og.png",
  logo: "/logo.png",
  instagram: "https://www.instagram.com/",
  makuakeUrl: process.env.NEXT_PUBLIC_MAKUAKE_URL || "",
} as const;

/** Makuake が公開済みか（環境変数が設定されていれば true） */
export const isMakuakeLive = Boolean(siteConfig.makuakeUrl);

/** CTA の文言・遷移先を公開状態に応じて返す */
export const primaryCta = isMakuakeLive
  ? { label: "プロジェクトを支援する", href: siteConfig.makuakeUrl, external: true }
  : { label: "Makuake公開を通知", href: "#contact", external: false };

/**
 * 画像など public/ 配下の静的アセットのパスを返す。
 * GitHub Pages のサブパス配信時は basePath を前置する
 * （next/image は src へ basePath を自動付与しないため）。
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;

export const navLinks = [
  { label: "物語", labelEn: "Story", href: "#story" },
  { label: "体験", labelEn: "Experience", href: "#experience" },
  { label: "計画", labelEn: "Project", href: "#project" },
  { label: "リターン", labelEn: "Rewards", href: "#rewards" },
  { label: "風景", labelEn: "Gallery", href: "#gallery" },
  { label: "問い", labelEn: "FAQ", href: "#faq" },
] as const;
