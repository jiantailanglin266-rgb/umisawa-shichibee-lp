# 海沢 七兵衛 SAUNA & SPA — 公式LP

Makuake クラウドファンディング公開を前提とした、奥多摩・海沢の高級サウナブランドサイト。
コンセプトは **「ととのいは、祈りに近い。」**

北欧サウナ × 日本仏教美 × 奥多摩の自然 ＝「現代の湯治場」を、
Aman Resorts クラスのミニマル／シネマティックな世界観で表現しています。

---

## 技術スタック

| 項目 | 採用 |
|---|---|
| Framework | Next.js 15（App Router） |
| Language | TypeScript |
| Styling | TailwindCSS v3 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Mail | Resend + Server Actions |
| CMS | microCMS（任意・未接続時はダミーデータ） |
| Deploy | Vercel |

---

## ディレクトリ構成

```
umisawa-shichibee-lp/
├── public/
│   ├── ASSETS.md            # 画像・動画の差し替えガイド
│   ├── hero.mp4 / hero-poster.jpg   # （配置推奨）
│   ├── og.jpg
│   └── gallery/*.jpg
├── src/
│   ├── app/
│   │   ├── layout.tsx       # メタデータ・フォント・JSON-LD
│   │   ├── page.tsx         # トップ（全セクション結合）
│   │   ├── globals.css      # Tailwind ＋ ブランド基調
│   │   ├── actions.ts       # メール登録 Server Action（Resend）
│   │   ├── sitemap.ts / robots.ts
│   │   ├── privacy/page.tsx
│   │   └── tokushoho/page.tsx
│   ├── components/
│   │   ├── Header.tsx  Hero.tsx  Story.tsx  Experience.tsx
│   │   ├── Project.tsx  Rewards.tsx  Gallery.tsx  FAQ.tsx
│   │   ├── Contact.tsx  Footer.tsx
│   │   ├── SectionHeading.tsx  Reveal.tsx  JsonLd.tsx
│   │   └── LegalLayout.tsx
│   └── lib/
│       ├── site.ts          # サイト基本情報・CTA・公開状態の切替
│       ├── data.ts          # 全ダミーデータ
│       └── microcms.ts      # CMS 接続スタブ
├── tailwind.config.ts
├── next.config.ts
└── .env.local.example
```

---

## セットアップ

```bash
npm install
cp .env.local.example .env.local   # 値を編集
npm run dev                        # http://localhost:3000
```

### 環境変数

| 変数 | 必須 | 用途 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ◯ | 正規URL・OGP・sitemap |
| `RESEND_API_KEY` | △ | メール登録通知（未設定でも登録は成功扱い） |
| `CONTACT_TO_EMAIL` | △ | 通知の宛先（運営） |
| `CONTACT_FROM_EMAIL` | △ | 送信元（Resend 認証済みドメイン） |
| `NEXT_PUBLIC_MAKUAKE_URL` | – | **設定すると CTA が「事前通知」→「支援する」へ自動切替** |
| `MICROCMS_*` | – | CMS 接続時のみ |

---

## デプロイ（Vercel）

1. このディレクトリを Git リポジトリ化し、GitHub へ push。
2. [vercel.com](https://vercel.com) → **New Project** → 当リポジトリを Import。
3. Framework は **Next.js** が自動検出される。設定変更不要。
4. **Settings → Environment Variables** に上記の環境変数を登録。
5. **Deploy**。以降は push で自動デプロイ。
6. 独自ドメイン（例：`umisawa-shichibee.jp`）を **Settings → Domains** で接続し、
   `NEXT_PUBLIC_SITE_URL` を本番URLに更新して再デプロイ。

---

## Makuake 公開後に「支援導線」を追加する方法

コード変更は不要です。**環境変数を 1 つ設定するだけ**で全 CTA が切り替わります。

1. Vercel の Environment Variables に追加：
   ```
   NEXT_PUBLIC_MAKUAKE_URL=https://www.makuake.com/project/umisawa-shichibee/
   ```
2. 再デプロイ。

これにより自動で以下が反映されます（`src/lib/site.ts` の `isMakuakeLive` で制御）：

- ヘッダー／Hero／Project の主CTA … 「Makuake公開を通知」→ **「プロジェクトを支援する」**（新規タブで Makuake へ）
- Rewards 各カード … 「公開を通知する」→ **「このリターンを支援」**
- フッターに **Makuake リンク**が出現

> 細かい文言・遷移先は `src/lib/site.ts` の `primaryCta` を編集して調整できます。

---

## 仕上げチェックリスト

- [ ] `public/` に本番画像・動画を配置（`public/ASSETS.md` 参照）
- [ ] `src/lib/site.ts` の Instagram URL を実アカウントへ
- [ ] `src/app/tokushoho/page.tsx` の事業者情報を確定版へ
- [ ] Resend のドメイン認証 → 環境変数設定
- [ ] Lighthouse で 95+ を確認（画像は WebP/AVIF・適切なサイズで）

---

## アクセシビリティ / SEO / パフォーマンス

- WCAG AA：コントラスト確保・全インタラクティブ要素に `aria-label`・キーボード操作（FAQ/Lightbox）対応・`prefers-reduced-motion` 尊重
- SEO：metadata API・OGP・Twitter Card・JSON-LD（Organization / LocalBusiness / FAQPage）・`sitemap.xml`・`robots.txt`
- パフォーマンス：`next/font` でフォント最適化、CSS アニメ中心、画像は AVIF/WebP 配信設定済み
