"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { siteItems } from "@/lib/data";
import { asset } from "@/lib/site";
import { useI18n } from "@/components/LocaleProvider";

/** 現地の実写真セクション（演出なしのドキュメンタリー写真で信頼感を醸成）。 */
export function SiteToday() {
  const { t } = useI18n();
  const s = t.siteNow;

  return (
    <section className="relative border-y border-white/5 bg-ink-soft py-28 md:py-40">
      <div className="container-x">
        <SectionHeading align="center" eyebrow={s.eyebrow} title={s.title} />
        <Reveal>
          <p className="mx-auto mt-6 max-w-2xl text-center leading-loose text-cream/70">
            {s.lead}
          </p>
        </Reveal>

        {/* 現地で撮影した実写動画（自動再生・ミュート・ループ） */}
        <Reveal>
          <figure className="mx-auto mt-14 w-full max-w-[20rem]">
            <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)] ring-1 ring-gold/15">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={asset("/site/footage-poster.jpg")}
              >
                <source src={asset("/site/footage.mp4")} type="video/mp4" />
              </video>
              <span aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
            </div>
            <figcaption className="mt-4 text-center text-xs tracking-widest2 text-stone">
              {s.videoCaption}
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {siteItems.map((item, i) => (
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10"
            >
              <Image
                src={asset(item.src)}
                alt={s.items[i].alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4">
                <span className="font-display text-xs tracking-widest2 text-gold">
                  0{i + 1}
                </span>
                <p className="mt-0.5 text-sm tracking-wide text-cream/90">
                  {s.items[i].caption}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
