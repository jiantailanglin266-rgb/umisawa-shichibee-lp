"use client";

import { motion } from "framer-motion";
import { primaryCta } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* 背景：動画があれば再生、なければ画像にフォールバック */}
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
        >
          {/* public/hero.mp4 を配置すると動画背景になります */}
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* 画像のみ運用時のフォールバック層（slow-zoom 付き） */}
        <div
          aria-hidden
          className="absolute inset-0 animate-slow-zoom bg-cover bg-center"
          style={{ backgroundImage: "url(/hero-poster.jpg)" }}
        />
      </div>

      {/* 黒グラデーションのオーバーレイ */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/40 to-ink"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-ink/30"
      />

      {/* コピー */}
      <div className="container-x text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="eyebrow mb-6"
        >
          UMISAWA SHICHIBEE — Okutama
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="heading text-balance text-4xl leading-[1.3] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          ととのいは、
          <br className="sm:hidden" />
          祈りに近い。
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.8 }}
          className="mx-auto mt-8 max-w-xl text-pretty text-base leading-loose text-cream/80 md:text-lg"
        >
          海沢の自然に抱かれ、
          <br />
          深い静寂の中で自分を取り戻す。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={primaryCta.href}
            target={primaryCta.external ? "_blank" : undefined}
            rel={primaryCta.external ? "noopener noreferrer" : undefined}
            className="w-full rounded-full bg-gold px-8 py-3.5 text-sm font-medium tracking-widest2 text-ink transition-transform duration-300 hover:scale-[1.03] sm:w-auto"
          >
            {primaryCta.label}
          </a>
          <a
            href="#project"
            className="w-full rounded-full border border-cream/30 px-8 py-3.5 text-sm tracking-widest2 text-cream transition-colors duration-300 hover:border-cream hover:bg-cream/5 sm:w-auto"
          >
            プロジェクトを見る
          </a>
        </motion.div>
      </div>

      {/* スクロール誘導 */}
      <motion.a
        href="#story"
        aria-label="下へスクロール"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <span className="flex h-12 w-7 items-start justify-center rounded-full border border-cream/30 p-1.5">
          <span className="block h-2 w-1 animate-scroll-hint rounded-full bg-gold" />
        </span>
      </motion.a>
    </section>
  );
}
