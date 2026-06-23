"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/LocaleProvider";

export function PricingContent() {
  const { t } = useI18n();
  const p = t.pricing;

  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x max-w-5xl">
        <SectionHeading as="h1" align="center" eyebrow={p.eyebrow} title={p.title} />
        <p className="mx-auto mt-6 max-w-2xl text-center leading-loose text-cream/70">{p.lead}</p>

        {/* プラン */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {p.plans.map((plan, i) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className={`flex flex-col rounded-2xl border bg-ink-card p-7 transition-all duration-500 hover:-translate-y-1 ${
                plan.badge ? "border-gold/50" : "border-white/10 hover:border-gold/40"
              }`}
            >
              {plan.badge ? (
                <span className="mb-4 inline-block w-fit rounded-full bg-gold/15 px-3 py-1 text-[0.65rem] tracking-widest2 text-gold">
                  {plan.badge}
                </span>
              ) : (
                <span className="mb-4 h-[1.6rem]" />
              )}
              <h3 className="font-serif text-lg text-cream">{plan.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-cream/60">{plan.desc}</p>

              <p className="mt-5 font-display text-3xl text-gold">
                <span className="align-top text-lg">¥</span>
                {plan.price}
                <span className="ml-1 text-xs tracking-wide text-stone">{plan.unit}</span>
              </p>

              <ul className="mt-6 flex-1 space-y-2.5 border-t border-white/10 pt-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-cream/80">
                    <Check size={15} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.6} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* オプション */}
        <Reveal>
          <div className="mt-10 rounded-2xl border border-white/10 bg-ink-card p-7 md:p-8">
            <h3 className="font-serif text-sm tracking-widest2 text-cream">{p.optionsHeading}</h3>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {p.options.map((o) => (
                <li key={o.name} className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-2.5">
                  <span className="text-sm text-cream/80">{o.name}</span>
                  <span className="font-display text-gold">
                    <span className="text-sm">¥</span>
                    {o.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-stone">
          {p.taxNote}
        </p>
      </div>
    </section>
  );
}
