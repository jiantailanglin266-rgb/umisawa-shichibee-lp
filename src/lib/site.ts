/**
 * サイト全体で参照する基本情報・環境設定。
 * Makuake 公開後は NEXT_PUBLIC_MAKUAKE_URL を設定するだけで
 * CTA の文言と遷移先が「事前通知」→「支援する」へ切替わります。
 */

export const siteConfig = {
  name: "海沢 七兵衛 SAUNA & SPA",
  nameEn: "UNAZAWA SHICHIBEE",
  tagline: "ととのいは、祈りに近い。",
  taglineEn: "Tranquility is close to prayer.",
  description:
    "東京・奥多摩 海沢。北欧サウナ × 日本仏教美 × 奥多摩の自然が交わる「現代の湯治場」。Makuake クラウドファンディング公開に向けたブランドプロジェクト。",
  location: "東京都西多摩郡奥多摩町 海沢",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://unazawa-shichibee.jp",
  ogImage: "/og.png",
  logo: "/logo.png",
  instagram: "https://www.instagram.com/",
  makuakeUrl: process.env.NEXT_PUBLIC_MAKUAKE_URL || "",
} as const;

/** Makuake が公開済みか（環境変数が設定されていれば true） */
export const isMakuakeLive = Boolean(siteConfig.makuakeUrl);

/**
 * 主CTA（公開状態＋言語に応じてラベル・遷移先を決定）。
 * 公開前は事前通知フォームへ、公開後は Makuake へ。
 * @param locale 現在のロケール（同一ページ内アンカーへ遷移するため使用）
 * @param labels t.cta（notify / support）
 */
export function getPrimaryCta(
  locale: string,
  labels: { notify: string; support: string }
) {
  return isMakuakeLive
    ? { label: labels.support, href: siteConfig.makuakeUrl, external: true }
    : { label: labels.notify, href: `/${locale}/#contact`, external: false };
}

/**
 * 画像など public/ 配下の静的アセットのパスを返す。
 * GitHub Pages のサブパス配信時は basePath を前置する
 * （next/image は src へ basePath を自動付与しないため）。
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;

/** ナビ項目。label は辞書 t.nav[key] から取得、href は各ロケールページ内アンカー。 */
export const navLinks = [
  { key: "story", anchor: "story" },
  { key: "experience", anchor: "experience" },
  { key: "project", anchor: "project" },
  { key: "rewards", anchor: "rewards" },
  { key: "gallery", anchor: "gallery" },
  { key: "faq", anchor: "faq" },
] as const;
