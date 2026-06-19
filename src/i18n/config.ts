/** 多言語設定。日本語をベースに 英語・簡体中文・韓国語 へ対応。 */
export const locales = ["ja", "en", "zh", "ko"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ja";

/** 言語切替メニューの表示名 */
export const localeNames: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
  zh: "简体中文",
  ko: "한국어",
};

/** OpenGraph 用ロケールコード */
export const ogLocale: Record<Locale, string> = {
  ja: "ja_JP",
  en: "en_US",
  zh: "zh_CN",
  ko: "ko_KR",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
