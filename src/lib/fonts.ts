import { Noto_Serif_JP, Cormorant_Garamond } from "next/font/google";

export const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/** <html> に付与するフォント変数クラス */
export const fontVars = `${notoSerifJp.variable} ${cormorant.variable}`;
