"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { experiences } from "@/lib/data";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative border-y border-white/5 bg-ink-soft py-28 md:py-40"
    >
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Experience"
          title="蒸し、冷やし、休み、癒す。"
        />
        <p className="mx-auto mt-6 max-w-xl text-center leading-loose text-cream/70">
          海沢 七兵衛が紡ぐ、四つの所作。
          めぐることで、心と身体は静かにととのってゆきます。
        </p>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((ex, i) => {
            const Icon = ex.icon;
            return (
              <motion.article
                key={ex.kanji}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group relative flex flex-col items-center bg-ink-card px-6 py-12 text-center transition-colors duration-500 hover:bg-ink"
              >
                {/* ホバーで立ちのぼるゴールドの光 */}
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
                  {ex.title}
                </p>

                <ul className="relative mt-5 space-y-1">
                  {ex.lines.map((line) => (
                    <li key={line} className="text-xs tracking-wide text-stone">
                      {line}
                    </li>
                  ))}
                </ul>

                {/* ホバーで現れる説明文 */}
                <p className="relative mt-5 max-h-0 overflow-hidden text-pretty text-xs leading-relaxed text-cream/0 transition-all duration-500 group-hover:max-h-32 group-hover:text-cream/70">
                  {ex.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
