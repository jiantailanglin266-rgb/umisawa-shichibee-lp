"use server";

import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * 事前通知リストへのメール登録（Server Action）。
 * RESEND_API_KEY が設定されていれば運営宛に通知メールを送信します。
 * 未設定の環境（プレビュー等）でも登録自体は成功扱いにし、UI を壊しません。
 */
export async function subscribe(
  _prev: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  // ハニーポット（bot 対策）。人間は触れない隠しフィールド。
  const honey = String(formData.get("company") ?? "").trim();

  if (honey) {
    // bot とみなして静かに成功を返す
    return { status: "success", message: "ご登録ありがとうございます。" };
  }
  if (!name) {
    return { status: "error", message: "お名前をご入力ください。" };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "メールアドレスの形式をご確認ください。" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  // 環境変数が揃っていない場合は送信をスキップ（開発・プレビュー用）
  if (!apiKey || !to || !from) {
    console.info("[subscribe] Resend 未設定のため送信スキップ:", { name, email });
    return {
      status: "success",
      message: "ご登録ありがとうございます。Makuake公開時にご案内します。",
    };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `${siteConfig.name} <${from}>`,
      to,
      replyTo: email,
      subject: `【事前通知登録】${name} 様`,
      text: [
        "海沢 七兵衛 事前通知リストに新規登録がありました。",
        "",
        `お名前: ${name}`,
        `メール: ${email}`,
        `登録元: ${siteConfig.url}`,
      ].join("\n"),
    });

    return {
      status: "success",
      message: "ご登録ありがとうございます。Makuake公開時にご案内します。",
    };
  } catch (err) {
    console.error("[subscribe] 送信失敗:", err);
    return {
      status: "error",
      message: "送信に失敗しました。時間をおいて再度お試しください。",
    };
  }
}
