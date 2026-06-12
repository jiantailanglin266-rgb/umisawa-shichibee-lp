import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description: "海沢 七兵衛 SAUNA & SPA の特定商取引法に基づく表記。",
  robots: { index: false, follow: true },
};

export default function TokushohoPage() {
  return (
    <LegalLayout title="特定商取引法に基づく表記">
      <p className="text-sm leading-loose text-stone">
        ※本ページは、クラウドファンディング（Makuake）公開およびリターン提供開始時に確定情報へ更新します。以下はテンプレートです。
      </p>

      <LegalSection heading="販売事業者">
        <p>海沢 七兵衛 SAUNA &amp; SPA 運営事務局</p>
      </LegalSection>

      <LegalSection heading="運営責任者">
        <p>（担当者名を記載）</p>
      </LegalSection>

      <LegalSection heading="所在地">
        <p>東京都西多摩郡奥多摩町 海沢（詳細はご請求に応じて遅滞なく開示します）</p>
      </LegalSection>

      <LegalSection heading="連絡先">
        <p>
          メール：info@umisawa-shichibee.jp
          <br />
          電話：（受付番号を記載／受付時間 平日10:00–18:00）
        </p>
      </LegalSection>

      <LegalSection heading="販売価格">
        <p>各リターン・商品ページに記載の金額（消費税込み）。</p>
      </LegalSection>

      <LegalSection heading="商品代金以外の必要料金">
        <p>送料、振込手数料等（リターン内容に応じて別途記載）。</p>
      </LegalSection>

      <LegalSection heading="お支払い方法・時期">
        <p>
          クラウドファンディング期間中は Makuake の定める決済方法・時期に従います。施設での販売は別途定めます。
        </p>
      </LegalSection>

      <LegalSection heading="商品の引渡し時期">
        <p>
          リターンごとに記載する提供予定時期に準じます。入浴券・会員権等は施設オープン後にご利用いただけます。
        </p>
      </LegalSection>

      <LegalSection heading="返品・キャンセル">
        <p>
          クラウドファンディングの性質上、原則として支援後のキャンセル・返金はお受けできません。詳細は Makuake の利用規約に準じます。
        </p>
      </LegalSection>

      <p className="text-xs text-stone">最終更新：2026年6月1日</p>
    </LegalLayout>
  );
}
