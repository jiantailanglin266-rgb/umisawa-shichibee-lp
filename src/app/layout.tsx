import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

/**
 * パススルーのルートレイアウト。<html>/<body> は app/[locale]/layout が
 * ロケール別の lang 付きで描画する（静的HTMLでも正しい lang を出力するため）。
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
