/**
 * 構造・ビジュアルデータ（言語非依存）。
 * テキストは各言語の辞書（src/i18n/locales/*）に分離。
 * コンポーネントは辞書のテキストをインデックスで対応づけて結合する。
 */

import type { LucideIcon } from "lucide-react";
import { Flame, Snowflake, Trees, Droplets } from "lucide-react";

/* ── Experience：アイコン・漢字・英字（4件、辞書 experience.items と対応）── */
export const experienceMeta: { kanji: string; titleEn: string; icon: LucideIcon }[] = [
  { kanji: "蒸", titleEn: "SAUNA", icon: Flame },
  { kanji: "冷", titleEn: "COLD BATH", icon: Snowflake },
  { kanji: "休", titleEn: "REST", icon: Trees },
  { kanji: "癒", titleEn: "SPA", icon: Droplets },
];

/* ── Project：数値（ラベル等は辞書 project と対応）──────────── */
export const projectMeta = {
  goalAmount: "8,000,000",
  progress: { current: 1240, target: 3000 },
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
  { src: "/gallery/forest-cabin.jpg" }, // 0: 森のサウナ小屋と渓流（横長・フィーチャー）
  { src: "/gallery/stream.jpg" }, // 1: 海沢の清流（縦）
  { src: "/gallery/barrel-sauna.jpg" }, // 2: バレルサウナ（縦）
  { src: "/gallery/onsen.jpg" }, // 3: 露天水風呂・温浴（縦）
  { src: "/gallery/goods.jpg" }, // 4: サウナグッズ（縦）
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
