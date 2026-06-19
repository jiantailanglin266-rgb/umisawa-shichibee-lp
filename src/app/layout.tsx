import type { Metadata, Viewport } from "next";
import { Noto_Serif_JP, Cormorant_Garamond } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

// 既定メタデータ（各ロケールの layout が上書き）
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name}｜${siteConfig.tagline}`,
  description: siteConfig.description,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // <html lang> は既定で ja。ロケールページでは LocaleProvider が補正する。
  return (
    <html lang="ja" className={`${notoSerifJp.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
