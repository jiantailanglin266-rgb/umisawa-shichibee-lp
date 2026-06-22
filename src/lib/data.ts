/**
 * 構造・ビジュアルデータ（言語非依存）。
 * テキストは各言語の辞書（src/i18n/locales/*）に分離。
 * コンポーネントは辞書のテキストをインデックスで対応づけて結合する。
 */

import type { LucideIcon } from "lucide-react";
import { Flame, Snowflake, Trees, Droplets } from "lucide-react";

/* ── Experience：アイコン・漢字・英字・画像（4件、辞書 experience.items と対応）── */
export const experienceMeta: { kanji: string; titleEn: string; icon: LucideIcon; image: string }[] = [
  { kanji: "蒸", titleEn: "SAUNA", icon: Flame, image: "/experience/sauna.webp" },
  { kanji: "冷", titleEn: "COLD BATH", icon: Snowflake, image: "/experience/cold.webp" },
  { kanji: "休", titleEn: "REST", icon: Trees, image: "/experience/rest.webp" },
  { kanji: "癒", titleEn: "SPA", icon: Droplets, image: "/experience/spa.webp" },
];

/* ── Project：数値（ラベル等は辞書 project と対応）──────────── */
export const projectMeta = {
  goalAmount: "8,000,000",
  usagePercents: [45, 25, 20, 10],
};

/* ── Rewards：価格・バッジ種別（名称・説明・項目は辞書 rewards.items）── */
export const rewardMeta: { price: string }[] = [
  { price: "3,500" },
  { price: "9,800" },
  { price: "48,000" },
  { price: "120,000" },
  { price: "30,000" },
];

/* ── Gallery：画像（alt は辞書 gallery.alts と対応・5枚のマガジン構成）── */
export type GalleryItem = { src: string };

export const galleryItems: GalleryItem[] = [
  { src: "/gallery/g3-sauna.webp" }, // 薪サウナの室内
  { src: "/gallery/g4-loyly.webp" }, // セルフロウリュ
  { src: "/gallery/g2-deck.webp" }, // 外気浴デッキ
  { src: "/gallery/g1-cabin.webp" }, // 夕暮れの森のキャビン
  { src: "/gallery/g7-exterior.webp" }, // 施設の外観
  { src: "/gallery/g9-lounge.webp" }, // 夜のラウンジ
  { src: "/gallery/g8-room.webp" }, // 客室
  { src: "/gallery/g6-dining.webp" }, // お食事
  { src: "/gallery/g5-ramen.webp" }, // サウナ飯
];

/* ── Journal：記事メタ（タイトル・本文は辞書 journal.articles と対応）── */
export type JournalCategory = "sauna" | "culture" | "area";
export const journalMeta: {
  slug: string;
  date: string;
  category: JournalCategory;
  image: string;
}[] = [
  { slug: "what-is-totonou", date: "2026-06-18", category: "sauna", image: "/gallery/barrel-sauna.jpg" },
  { slug: "culture-of-touji", date: "2026-06-12", category: "culture", image: "/gallery/onsen.jpg" },
  { slug: "walking-unazawa", date: "2026-06-05", category: "area", image: "/gallery/stream.jpg" },
];

/* ── News：日付・カテゴリ（タイトル・本文は辞書 news.posts と対応）── */
export type NewsCategory = "update" | "media" | "event" | "crowdfunding";
export const newsMeta: { date: string; category: NewsCategory }[] = [
  { date: "2026-06-20", category: "update" },
  { date: "2026-06-10", category: "update" },
  { date: "2026-06-01", category: "update" },
];

/* ── SiteToday：現地の実写真（alt/caption は辞書 siteNow.items と対応）── */
export const siteItems: { src: string }[] = [
  { src: "/site/land.jpg" }, // 再生を待つ土地
  { src: "/site/hall.jpg" }, // 森のお堂
  { src: "/site/buddha.jpg" }, // 祀られた仏像
  { src: "/site/basin.jpg" }, // 湧き水の水盤
];

/* ── PrayerSections：画像・アイコン種別・装飾（テキストは辞書 prayer.blocks）── */
export const prayerMeta: {
  image: string;
  iconStyle: "outline" | "filled";
  decor: "enso" | "kasumi";
}[] = [
  { image: "/sanctuary/shrine.jpg", iconStyle: "outline", decor: "enso" },
  { image: "/sanctuary/altar.jpg", iconStyle: "filled", decor: "kasumi" },
];
