/**
 * microCMS 接続用のスタブ。
 * 環境変数（MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY）が未設定の場合は
 * src/lib/data.ts のダミーデータを返します。
 *
 * 本番運用時は `npm i microcms-js-sdk` を入れて createClient を有効化し、
 * 各セクションのコンポーネントを Server Component 化して await で取得してください。
 */

import { gallery, rewards, faqs, story } from "@/lib/data";

const domain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

export const isCmsConnected = Boolean(domain && apiKey);

/**
 * 例：実接続時の実装イメージ
 *
 * import { createClient } from "microcms-js-sdk";
 * const client = createClient({ serviceDomain: domain!, apiKey: apiKey! });
 * export const getStory = () => client.get({ endpoint: "story" });
 */

export async function getStory() {
  // CMS 未接続時はダミーを返す
  return story;
}

export async function getRewards() {
  return rewards;
}

export async function getGallery() {
  return gallery;
}

export async function getFaqs() {
  return faqs;
}
