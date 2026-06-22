"use client";

import { motion } from "framer-motion";
import { CalendarDays, Sparkles, HandCoins } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { projectMeta } from "@/lib/data";
import { getPrimaryCta } from "@/lib/site";
import { useI18n } from "@/components/LocaleProvider";

export function Project() {
  const { locale, t } = useI18n();
  const p = t.project;
  const cta = getPrimaryCta(locale, t.cta);

  const facts = [
    { icon: CalendarDays, label: p.openingLabel, value: p.openingDate },
    { icon: Sparkles, label: p.crowdfundingLabel, value: p.crowdfundingDate },
    { icon: HandCoins, label: p.goalLabel, value: `¥${projectMeta.goalAmount}` },
  ];

  return (
    <section id="project" className="relative py-28 md:py-40">
      <div className="container-x">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} />

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="text-pretty leading-loose text-cream/75">{p.contribution}</p>
            </Reveal>

            <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
              {facts.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className="bg-ink-card px-6 py-7">
                    <Icon className="text-gold" size={20} strokeWidth={1.4} />
                    <dt className="mt-4 text-xs tracking-widest2 text-stone">{f.label}</dt>
                    <dd className="mt-1 font-display text-xl text-cream">{f.value}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-ink-card p-8 md:p-10">
              {/* 公開前のステータス（実数値が無いため架空の進捗は表示しない） */}
              <div className="rounded-xl border border-gold/25 bg-gold/5 px-5 py-5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
                  <p className="font-serif text-base text-cream">{p.statusValue}</p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-stone">{p.statusNote}</p>
              </div>

              <h3 className="mt-10 font-serif text-sm tracking-widest2 text-cream">
                {p.usageHeading}
              </h3>
              <ul className="mt-5 space-y-4">
                {p.usage.map((label, i) => {
                  const percent = projectMeta.usagePercents[i];
                  return (
                    <li key={label}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-cream/80">{label}</span>
                        <span className="font-display text-gold">{percent}%</span>
                      </div>
                      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-gold/60"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.2 + i * 0.1 }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>

              <a
                href={cta.href}
                target={cta.external ? "_blank" : undefined}
                rel={cta.external ? "noopener noreferrer" : undefined}
                className="mt-10 block rounded-full bg-gold py-3.5 text-center text-sm font-medium tracking-widest2 text-ink transition-transform duration-300 hover:scale-[1.02]"
              >
                {cta.label}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
