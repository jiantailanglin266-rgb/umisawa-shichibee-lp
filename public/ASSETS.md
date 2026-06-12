# public/ に配置する画像・動画

コードは画像が未配置でもグラデーションのプレースホルダーで成立しますが、
本番では以下を差し替えてください（推奨フォーマット・サイズの目安付き）。

## ファーストビュー
| ファイル名 | 用途 | 推奨 |
|---|---|---|
| `hero.mp4` | Hero 背景動画（任意） | H.264 / 1080p / 8〜15秒ループ / 5MB以下 |
| `hero-poster.jpg` | 動画ポスター・画像運用時の背景 | 1920×1080 / 千手観音モチーフ |
| `og.jpg` | OGP 画像 | 1200×630 |
| `favicon.ico` / `icon.png` | ファビコン | 512×512 |

## ギャラリー（`public/gallery/`）
`src/lib/data.ts` の `gallery` 配列と対応：

- `forest-01.jpg`（tall）奥多摩の渓谷
- `sauna-01.jpg`（square）薪サウナ
- `kannon-01.jpg`（tall）千手観音モチーフ
- `water-01.jpg`（wide）海沢の清流
- `cg-exterior.jpg`（wide）建築CG
- `mist-01.jpg`（square）朝霧
- `rest-deck.jpg`（tall）外気浴デッキ
- `stone-01.jpg`（square）苔むした岩

> 画像を追加・変更したら `src/lib/data.ts` の `gallery` を合わせて更新してください。
> 縦横比は `ratio: "tall" | "wide" | "square"` で指定します。
