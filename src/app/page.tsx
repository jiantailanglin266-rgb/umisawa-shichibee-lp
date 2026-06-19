"use client";

import { useEffect } from "react";
import { locales, defaultLocale } from "@/i18n/config";

/**
 * ルート（/）アクセス時、ブラウザ言語を判定して各ロケールへ遷移する。
 * 静的書き出し（GitHub Pages）でも動くようクライアントでリダイレクト。
 * 相対パス遷移なので basePath に依存しない。
 */
function detectLocale(): string {
  if (typeof navigator === "undefined") return defaultLocale;
  const langs = navigator.languages || [navigator.language];
  for (const raw of langs) {
    const l = raw.toLowerCase();
    if (l.startsWith("ja")) return "ja";
    if (l.startsWith("zh")) return "zh";
    if (l.startsWith("ko")) return "ko";
    if (l.startsWith("en")) return "en";
  }
  return defaultLocale;
}

export default function RootRedirect() {
  useEffect(() => {
    const locale = detectLocale();
    // 相対遷移（/umisawa-shichibee-lp/ → /umisawa-shichibee-lp/<locale>/）
    window.location.replace(`${locale}/`);
  }, []);

  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0D0D0D",
        color: "#F5F1E8",
        fontFamily: "serif",
        gap: "1rem",
        flexDirection: "column",
      }}
    >
      <p style={{ letterSpacing: "0.2em", color: "#B89B5E" }}>UNAZAWA SHICHIBEE</p>
      <noscript>
        <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
          {locales.map((l) => (
            <li key={l}>
              <a href={`${l}/`} style={{ color: "#F5F1E8" }}>
                {l.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </noscript>
    </main>
  );
}
