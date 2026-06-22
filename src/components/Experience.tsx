"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { experienceMeta } from "@/lib/data";
import { asset } from "@/lib/site";
import { useI18n } from "@/components/LocaleProvider";

export function Experience() {
  const { t } = useI18n();

  return (
    <section
      id="experience"
      className="relative border-y border-white/5 bg-ink-soft py-28 md:py-40"
    >
      <div className="container-x">
        <SectionHeading align="center" eyebrow={t.experience.eyebrow} title={t.experience.title} />
        <p className="mx-auto mt-6 max-w-xl text-center leading-loose text-cream/70">
          {t.experience.intro}
        </p>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {experienceMeta.map((ex, i) => {
            const Icon = ex.icon;
            const item = t.experience.items[i];
            return (
              <motion.article
                key={ex.kanji}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl border border-white/10"
              >
                {/* 背景画像 */}
                <Image
                  src={asset(ex.image)}
                  alt={`${item.title} — ${ex.titleEn}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20 transition-colors duration-500 group-hover:from-ink/95" />

                {/* 漢字（中央上） */}
                <span className="pointer-events-none absolute inset-x-0 top-8 text-center font-serif text-6xl text-cream/95 drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-gold">
                  {ex.kanji}
                </span>

                {/* 下部テキスト */}
                <div className="relative z-10 p-6 text-center">
                  <Icon className="mx-auto text-gold" size={22} strokeWidth={1.4} />
                  <h3 className="mt-4 font-display text-sm uppercase tracking-widest2 text-gold">
                    {ex.titleEn}
                  </h3>
                  <p className="mt-1 text-sm tracking-widest2 text-cream">{item.title}</p>

                  <ul className="mt-3 space-y-0.5">
                    {item.lines.map((line) => (
                      <li key={line} className="text-xs tracking-wide text-cream/70">
                        {line}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-3 max-h-0 overflow-hidden text-pretty text-xs leading-relaxed text-cream/0 transition-all duration-500 group-hover:max-h-40 group-hover:text-cream/80">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
