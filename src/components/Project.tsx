"use client";

import { motion } from "framer-motion";
import { CalendarDays, Sparkles, HandCoins } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { project } from "@/lib/data";
import { primaryCta } from "@/lib/site";

export function Project() {
  const pct = Math.min(
    100,
    Math.round((project.progress.current / project.progress.target) * 100)
  );

  const facts = [
    { icon: CalendarDays, label: project.openingLabel, value: project.openingDate },
    { icon: Sparkles, label: project.crowdfundingLabel, value: project.crowdfundingDate },
    { icon: HandCoins, label: project.goalLabel, value: `¥${project.goalAmount}` },
  ];

  return (
    <section id="project" className="relative py-28 md:py-40">
      <div className="container-x">
        <SectionHeading eyebrow="Project" title="海沢に、現代の湯治場を。" />

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          {/* 左：概要と地域創生 */}
          <div>
            <Reveal>
              <p className="text-pretty leading-loose text-cream/75">
                {project.contribution}
              </p>
            </Reveal>

            <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
              {facts.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className="bg-ink-card px-6 py-7">
                    <Icon className="text-gold" size={20} strokeWidth={1.4} />
                    <dt className="mt-4 text-xs tracking-widest2 text-stone">
                      {f.label}
                    </dt>
                    <dd className="mt-1 font-display text-xl text-cream">
                      {f.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          {/* 右：進捗バー＋支援金用途 */}
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-ink-card p-8 md:p-10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-display text-4xl text-gold">
                    {project.progress.current.toLocaleString()}
                    <span className="ml-1 text-lg text-cream/70">
                      {project.progress.unit}
                    </span>
                  </p>
                  <p className="mt-1 text-xs tracking-widest2 text-stone">
                    {project.progress.caption}
                  </p>
                </div>
                <p className="font-display text-2xl text-cream/60">{pct}%</p>
              </div>

              {/* 進捗バー（ビューポート進入でアニメーション） */}
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
                目標 {project.progress.target.toLocaleString()}
                {project.progress.unit}
              </p>

              {/* 支援金の用途 */}
              <h3 className="mt-10 font-serif text-sm tracking-widest2 text-cream">
                支援金の用途
              </h3>
              <ul className="mt-5 space-y-4">
                {project.usage.map((u, i) => (
                  <li key={u.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-cream/80">{u.label}</span>
                      <span className="font-display text-gold">{u.percent}%</span>
                    </div>
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gold/60"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${u.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2 + i * 0.1 }}
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href={primaryCta.href}
                target={primaryCta.external ? "_blank" : undefined}
                rel={primaryCta.external ? "noopener noreferrer" : undefined}
                className="mt-10 block rounded-full bg-gold py-3.5 text-center text-sm font-medium tracking-widest2 text-ink transition-transform duration-300 hover:scale-[1.02]"
              >
                {primaryCta.label}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
