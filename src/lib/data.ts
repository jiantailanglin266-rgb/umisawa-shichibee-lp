/**
 * ダミーデータ。
 * microCMS 接続時は src/lib/microcms.ts のフェッチ関数に差し替えてください
 * （各データ構造は API スキーマと一致させています）。
 */

import type { LucideIcon } from "lucide-react";
import { Flame, Snowflake, Trees, Droplets } from "lucide-react";

/* ── Experience：4つの体験 ───────────────────── */
export type Experience = {
  kanji: string;
  title: string;
  titleEn: string;
  icon: LucideIcon;
  lines: string[];
  description: string;
};

export const experiences: Experience[] = [
  {
    kanji: "蒸",
    title: "サウナ",
    titleEn: "SAUNA",
    icon: Flame,
    lines: ["薪サウナ", "セルフロウリュ"],
    description:
      "薪の爆ぜる音と香り。立ちのぼる蒸気に身をゆだね、思考の輪郭がほどけてゆく。",
  },
  {
    kanji: "冷",
    title: "水風呂",
    titleEn: "COLD BATH",
    icon: Snowflake,
    lines: ["海沢の天然水"],
    description:
      "山が育んだ清冽な天然水。肌を刺す冷たさの奥に、研ぎ澄まされる静けさがある。",
  },
  {
    kanji: "休",
    title: "外気浴",
    titleEn: "REST",
    icon: Trees,
    lines: ["森の外気浴"],
    description:
      "木々のざわめき、沢の音。森に抱かれて、ただ呼吸する。世界と自分が溶け合う時間。",
  },
  {
    kanji: "癒",
    title: "スパ",
    titleEn: "SPA",
    icon: Droplets,
    lines: ["温浴・リラクゼーション"],
    description:
      "深部までほどける温浴と施術。整えた心身を、慈しむように満たしてゆく。",
  },
];

/* ── Project：プロジェクト概要 ───────────────── */
export const project = {
  openingLabel: "オープン予定",
  openingDate: "2026年 秋",
  crowdfundingLabel: "クラウドファンディング開始",
  crowdfundingDate: "2026年 7月",
  goalLabel: "目標金額",
  goalAmount: "8,000,000",
  // 進捗バー（公開前は事前通知登録数を可視化）
  progress: {
    current: 1240,
    target: 3000,
    unit: "名",
    caption: "事前通知ご登録者数",
  },
  usage: [
    { label: "薪サウナ室・水風呂の建築", percent: 45 },
    { label: "外気浴デッキ・休憩棟の整備", percent: 25 },
    { label: "上下水・電気などインフラ", percent: 20 },
    { label: "運営・地域連携の立ち上げ", percent: 10 },
  ],
  contribution:
    "海沢の遊休地を再生し、地域の木材と職人の手を活かす。サウナを起点に、人の流れと働く場を奥多摩へ。これは一施設の開業ではなく、小さな地域創生の試みです。",
} as const;

/* ── Rewards：想定リターン ───────────────────── */
export type Reward = {
  name: string;
  price: string;
  badge?: string;
  description: string;
  items: string[];
};

export const rewards: Reward[] = [
  {
    name: "超早割 入浴券",
    price: "3,500",
    badge: "数量限定",
    description: "オープン後に使える、最もお得な単回入浴券。",
    items: ["入浴券 1枚", "オリジナル手ぬぐい"],
  },
  {
    name: "ペア利用券",
    price: "9,800",
    badge: "人気",
    description: "大切な人と過ごす、二人分のととのい時間。",
    items: ["ペア入浴券（2名）", "ドリンク2杯", "手ぬぐい 2枚"],
  },
  {
    name: "VIP 会員権",
    price: "48,000",
    description: "オープンから1年間、いつでも通える年間パス。",
    items: ["年間フリーパス", "会員限定イベント招待", "オリジナルサウナハット"],
  },
  {
    name: "貸切プラン",
    price: "120,000",
    description: "施設を独占。最大8名で過ごす特別な一日。",
    items: ["1日貸切（最大8名）", "薪ロウリュ体験", "地元食材のケータリング"],
  },
  {
    name: "オープニングイベント招待",
    price: "30,000",
    badge: "特別",
    description: "完成披露の夜にご招待。最初の蒸気を、共に。",
    items: ["落成式 招待", "限定入浴体験", "支援者銘板へのお名前掲載"],
  },
];

/* ── Gallery：画像（public/gallery/ 配下に配置）──── */
export type GalleryItem = {
  src: string;
  alt: string;
  // Pinterest 風グリッドの縦横比（tall / wide / square）
  ratio: "tall" | "wide" | "square";
};

export const gallery: GalleryItem[] = [
  { src: "/gallery/forest-01.jpg", alt: "奥多摩・海沢の渓谷と森", ratio: "tall" },
  { src: "/gallery/sauna-01.jpg", alt: "薪サウナのイメージ", ratio: "square" },
  { src: "/gallery/kannon-01.jpg", alt: "千手観音のモチーフ", ratio: "tall" },
  { src: "/gallery/water-01.jpg", alt: "海沢の清流", ratio: "wide" },
  { src: "/gallery/cg-exterior.jpg", alt: "建築CG・外観", ratio: "wide" },
  { src: "/gallery/mist-01.jpg", alt: "森にたちこめる朝霧", ratio: "square" },
  { src: "/gallery/rest-deck.jpg", alt: "外気浴デッキのイメージ", ratio: "tall" },
  { src: "/gallery/stone-01.jpg", alt: "苔むした岩", ratio: "square" },
];

/* ── FAQ ─────────────────────────────────────── */
export const faqs = [
  {
    q: "オープンはいつ頃ですか？",
    a: "2026年秋のオープンを目指して準備を進めています。最新の進捗は本サイトおよびメールでご案内します。",
  },
  {
    q: "アクセスを教えてください。",
    a: "東京都西多摩郡奥多摩町 海沢。JR青梅線「奥多摩駅」よりお車で約10分を予定しています。詳細な経路・駐車場はオープン前に公開します。",
  },
  {
    q: "どうやって支援できますか？",
    a: "クラウドファンディングサイト「Makuake」にて募集します。公開時にメールでお知らせしますので、本ページ下部のフォームよりご登録ください。",
  },
  {
    q: "リターンはどのように受け取れますか？",
    a: "入浴券・会員権などはオープン後に施設でご利用いただけます。手ぬぐい等の物販リターンは、ご支援時にご登録の住所へ発送いたします。",
  },
];

/* ── Story：本文ブロック ─────────────────────── */
export const story = {
  heading: "なぜ、奥多摩にサウナをつくるのか。",
  blocks: [
    {
      label: "出会い",
      text: "都心から二時間。電車を降り、沢沿いの道を歩いた先に海沢はありました。打ち捨てられた土地と、変わらず流れ続ける清水。ここで静かに息を整えたい——最初の衝動は、理屈より先にありました。",
    },
    {
      label: "自然",
      text: "切り立つ岩、苔むす森、絶え間ない水の音。海沢の自然は、人を急かしません。ただそこに在ることを、静かに肯定してくれる。その懐の深さに、私たちは「整う」原点を見ました。",
    },
    {
      label: "名前",
      text: "「七兵衛」は、かつてこの地を拓いた人の名。土地に根を張り、自然と折り合いながら暮らした人々への敬意を込め、その名を受け継ぎます。新しさではなく、続いてきたものの上に立つために。",
    },
    {
      label: "湯治",
      text: "日本には古来、湯に身を浸して心身を癒やす「湯治」の文化があります。私たちが目指すのは、その現代の姿。効率ではなく、ゆだねること。消費ではなく、回復すること。",
    },
    {
      label: "祈り",
      text: "蒸され、冷やされ、風に吹かれる。その繰り返しの中で訪れる無心の瞬間は、祈りによく似ています。海沢 七兵衛は、誰もが自分に還れる、新しい祈りの場所を目指します。",
    },
  ],
} as const;
