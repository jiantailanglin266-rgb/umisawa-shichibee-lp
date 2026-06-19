"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { experienceMeta } from "@/lib/data";
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

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
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
                className="group relative flex flex-col items-center bg-ink-card px-6 py-12 text-center transition-colors duration-500 hover:bg-ink"
              >
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-gold/10 to-transparent transition-all duration-500 group-hover:h-full" />

                <span className="relative font-serif text-6xl text-cream transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-gold">
                  {ex.kanji}
                </span>
                <Icon
                  className="relative mt-6 text-gold/70 transition-colors duration-500 group-hover:text-gold"
                  size={22}
                  strokeWidth={1.4}
                />
                <h3 className="relative mt-5 font-display text-sm uppercase tracking-widest2 text-gold">
                  {ex.titleEn}
                </h3>
                <p className="relative mt-1 text-sm tracking-widest2 text-cream/90">
                  {item.title}
                </p>

                <ul className="relative mt-5 space-y-1">
                  {item.lines.map((line) => (
                    <li key={line} className="text-xs tracking-wide text-stone">
                      {line}
                    </li>
                  ))}
                </ul>

                <p className="relative mt-5 max-h-0 overflow-hidden text-pretty text-xs leading-relaxed text-cream/0 transition-all duration-500 group-hover:max-h-40 group-hover:text-cream/70">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
