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

  const pct = Math.min(
    100,
    Math.round((projectMeta.progress.current / projectMeta.progress.target) * 100)
  );

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
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-display text-4xl text-gold">
                    {projectMeta.progress.current.toLocaleString()}
                    {p.progressUnit && (
                      <span className="ml-1 text-lg text-cream/70">{p.progressUnit}</span>
                    )}
                  </p>
                  <p className="mt-1 text-xs tracking-widest2 text-stone">{p.progressCaption}</p>
                </div>
                <p className="font-display text-2xl text-cream/60">{pct}%</p>
              </div>

              <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-gold/70 to-gold"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p className="mt-3 text-right text-xs text-stone">
                {p.goalCaption} {projectMeta.progress.target.toLocaleString()}
                {p.progressUnit}
              </p>

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
