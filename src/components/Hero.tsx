"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getPrimaryCta, asset } from "@/lib/site";
import { useI18n } from "@/components/LocaleProvider";

const SLIDE_SRCS = [
  "/fv/fv1-buddha.jpg",
  "/fv/fv2-sauna.jpg",
  "/fv/fv3-nature.jpg",
  "/fv/fv4-station.jpg",
];

const INTERVAL = 4500;
const FADE = 1.6;

export function Hero() {
  const { locale, t } = useI18n();
  const [active, setActive] = useState(0);
  const cta = getPrimaryCta(locale, t.cta);
  // Hero は同一ページ内なのでアンカーのみで遷移
  const primaryHref = cta.external ? cta.href : "#contact";

  useEffect(() => {
    const timer = setInterval(
      () => setActive((i) => (i + 1) % SLIDE_SRCS.length),
      INTERVAL
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* 背景スライドショー（クロスフェード + Ken Burns） */}
      <div className="absolute inset-0 -z-10">
        {SLIDE_SRCS.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: FADE, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={{ scale: i === active ? 1.09 : 1 }}
              transition={{ duration: (INTERVAL + FADE * 1000) / 1000, ease: "linear" }}
            >
              <Image
                src={asset(src)}
                alt={t.hero.slideAlts[i]}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* オーバーレイ */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/60 via-transparent to-ink/20" />

      <div className="container-x text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="eyebrow mb-6"
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="heading text-balance text-4xl leading-[1.3] drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t.hero.titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.8 }}
          className="mx-auto mt-8 max-w-xl text-pretty text-base leading-loose text-cream/85 drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)] md:text-lg"
        >
          {t.hero.subLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={primaryHref}
            target={cta.external ? "_blank" : undefined}
            rel={cta.external ? "noopener noreferrer" : undefined}
            className="w-full rounded-full bg-gold px-8 py-3.5 text-sm font-medium tracking-widest2 text-ink transition-transform duration-300 hover:scale-[1.03] sm:w-auto"
          >
            {cta.label}
          </a>
          <a
            href="#project"
            className="w-full rounded-full border border-cream/30 bg-ink/20 px-8 py-3.5 text-sm tracking-widest2 text-cream backdrop-blur-sm transition-colors duration-300 hover:border-cream hover:bg-cream/5 sm:w-auto"
          >
            {t.cta.secondary}
          </a>
        </motion.div>
      </div>

      {/* スライド進行インジケーター */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {SLIDE_SRCS.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`${i + 1}`}
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
        aria-label={t.hero.scrollAria}
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
