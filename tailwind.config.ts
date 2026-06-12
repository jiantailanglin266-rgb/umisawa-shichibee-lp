import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ブランドカラー
        ink: "#0D0D0D", // 背景
        gold: "#B89B5E", // アクセント
        cream: "#F5F1E8", // 文字
        stone: "#7C7468", // サブ
        "ink-soft": "#151515",
        "ink-card": "#171716",
      },
      fontFamily: {
        serif: ["var(--font-noto-serif-jp)", "serif"],
        display: ["var(--font-cormorant)", "serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
        widest3: "0.4em",
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scroll-hint": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "40%": { opacity: "1" },
          "80%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { opacity: "0" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
      },
      animation: {
        "fade-in": "fade-in 1.4s ease forwards",
        "scroll-hint": "scroll-hint 2.2s ease-in-out infinite",
        "slow-zoom": "slow-zoom 18s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
