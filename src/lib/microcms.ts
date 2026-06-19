/**
 * microCMS 接続用のスタブ。
 * 現状コンテンツは多言語辞書（src/i18n/locales/*）で管理しています。
 * CMS 連携する場合は、ロケールごとにコンテンツを取得する関数をここに実装し、
 * 各セクションを Server Component 化して注入してください。
 *
 * 例（実接続時）:
 *   import { createClient } from "microcms-js-sdk";
 *   const client = createClient({ serviceDomain: domain!, apiKey: apiKey! });
 *   export const getStory = (locale: string) =>
 *     client.get({ endpoint: "story", queries: { filters: `locale[equals]${locale}` } });
 */

const domain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

export const isCmsConnected = Boolean(domain && apiKey);
