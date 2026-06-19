"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { rewardMeta } from "@/lib/data";
import { getPrimaryCta, isMakuakeLive } from "@/lib/site";
import { useI18n } from "@/components/LocaleProvider";

export function Rewards() {
  const { locale, t } = useI18n();
  const cta = getPrimaryCta(locale, t.cta);

  return (
    <section
      id="rewards"
      className="relative border-y border-white/5 bg-ink-soft py-28 md:py-40"
    >
      <div className="container-x">
        <SectionHeading align="center" eyebrow={t.rewards.eyebrow} title={t.rewards.title} />
        <p className="mx-auto mt-6 max-w-xl text-center leading-loose text-cream/70">
          {isMakuakeLive ? t.rewards.introLive : t.rewards.introSoon}
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.rewards.items.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group flex flex-col rounded-2xl border border-white/10 bg-ink-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-lg leading-snug text-cream">{r.name}</h3>
                {r.badge && (
                  <span className="shrink-0 rounded-full border border-gold/50 px-3 py-1 text-[0.65rem] tracking-widest2 text-gold">
                    {r.badge}
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-cream/65">{r.description}</p>

              <p className="mt-6 font-display text-3xl text-gold">
                <span className="text-lg align-top">¥</span>
                {rewardMeta[i].price}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5 border-t border-white/10 pt-6">
                {r.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-cream/80">
                    <Check size={16} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.6} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>

              <a
                href={cta.href}
                target={cta.external ? "_blank" : undefined}
                rel={cta.external ? "noopener noreferrer" : undefined}
                className="mt-7 rounded-full border border-cream/20 py-3 text-center text-sm tracking-widest2 text-cream transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink"
              >
                {isMakuakeLive ? t.rewards.cardCtaSupport : t.rewards.cardCtaNotify}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
