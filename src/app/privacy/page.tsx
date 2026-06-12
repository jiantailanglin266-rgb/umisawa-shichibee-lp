import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "海沢 七兵衛 SAUNA & SPA のプライバシーポリシー。",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="プライバシーポリシー">
      <p className="text-sm leading-loose">
        海沢 七兵衛 SAUNA &amp; SPA（以下「当方」）は、本ウェブサイトを通じて取得する個人情報を、以下の方針に基づき適切に取り扱います。
      </p>

      <LegalSection heading="1. 取得する情報">
        <p>
          事前通知リストの登録にあたり、お名前およびメールアドレスを取得します。あわせて、アクセス解析のための情報（Cookie、閲覧ログ等）を取得する場合があります。
        </p>
      </LegalSection>

      <LegalSection heading="2. 利用目的">
        <p>
          取得した情報は、Makuake プロジェクトの公開・進捗のご案内、お問い合わせへの対応、およびサービス改善のために利用します。
        </p>
      </LegalSection>

      <LegalSection heading="3. 第三者提供">
        <p>
          法令に基づく場合を除き、ご本人の同意なく個人情報を第三者へ提供しません。メール配信等の業務委託先には、必要な範囲で適切に管理させた上で提供する場合があります。
        </p>
      </LegalSection>

      <LegalSection heading="4. 安全管理">
        <p>
          個人情報への不正アクセス、紛失、改ざん、漏えいを防止するため、必要かつ適切な安全管理措置を講じます。
        </p>
      </LegalSection>

      <LegalSection heading="5. 開示・訂正・削除">
        <p>
          ご本人からの求めに応じ、保有する個人情報の開示・訂正・利用停止・削除に対応します。下記お問い合わせ先までご連絡ください。
        </p>
      </LegalSection>

      <LegalSection heading="6. お問い合わせ窓口">
        <p>
          海沢 七兵衛 SAUNA &amp; SPA 運営事務局
          <br />
          メール：info@umisawa-shichibee.jp
        </p>
      </LegalSection>

      <p className="text-xs text-stone">制定日：2026年6月1日</p>
    </LegalLayout>
  );
}
