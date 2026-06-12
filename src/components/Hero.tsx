"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { primaryCta, asset } from "@/lib/site";

/** ファーストビューのスライド（4枚を均等にフルスクリーン表示） */
const SLIDES = [
  { src: "/fv/fv1-buddha.jpg", alt: "千手観音 — 祈りと再生の象徴" },
  { src: "/fv/fv2-sauna.jpg", alt: "薪サウナの静謐な室内" },
  { src: "/fv/fv3-nature.jpg", alt: "奥多摩・海沢の山と水の風景" },
  { src: "/fv/fv4-station.jpg", alt: "奥多摩 — 旅のはじまりの玄関口" },
];

// 1枚あたりの表示時間（フェード時間込み）
const INTERVAL = 4500;
const FADE = 1.6;

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      INTERVAL
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* 背景スライドショー（クロスフェード + Ken Burns） */}
      <div className="absolute inset-0 -z-10">
        {SLIDES.map((s, i) => (
          <motion.div
            key={s.src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: FADE, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{ scale: i === active ? 1.09 : 1 }}
              transition={{
                duration: (INTERVAL + FADE * 1000) / 1000,
                ease: "linear",
              }}
            >
              <Image
                src={asset(s.src)}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* 黒グラデーションのオーバーレイ（可読性確保） */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/40 to-ink"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/60 via-transparent to-ink/20"
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
          className="heading text-balance text-4xl leading-[1.3] drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          ととのいは、
          <br className="sm:hidden" />
          祈りに近い。
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.8 }}
          className="mx-auto mt-8 max-w-xl text-pretty text-base leading-loose text-cream/85 drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)] md:text-lg"
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
            className="w-full rounded-full border border-cream/30 bg-ink/20 px-8 py-3.5 text-sm tracking-widest2 text-cream backdrop-blur-sm transition-colors duration-300 hover:border-cream hover:bg-cream/5 sm:w-auto"
          >
            プロジェクトを見る
          </a>
        </motion.div>
      </div>

      {/* スライド進行インジケーター（4枚・均等／クリックで切替） */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`スライド ${i + 1} を表示`}
            aria-current={i === active}
            className="h-[3px] w-9 overflow-hidden rounded-full bg-cream/25 transition-colors hover:bg-cream/40"
          >
            {i === active && (
              <motion.span
                key={`fill-${active}`}
                className="block h-full bg-gold"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: INTERVAL / 1000, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* スクロール誘導 */}
      <motion.a
        href="#story"
        aria-label="下へスクロール"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
      >
        <span className="flex h-12 w-7 items-start justify-center rounded-full border border-cream/30 p-1.5">
          <span className="block h-2 w-1 animate-scroll-hint rounded-full bg-gold" />
        </span>
      </motion.a>
    </section>
  );
}
