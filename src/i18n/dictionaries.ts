import type { Locale } from "./config";
import ja, { type Dictionary } from "./locales/ja";
import en from "./locales/en";
import zh from "./locales/zh";
import ko from "./locales/ko";

const dictionaries: Record<Locale, Dictionary> = { ja, en, zh, ko };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? ja;
}

export type { Dictionary };
