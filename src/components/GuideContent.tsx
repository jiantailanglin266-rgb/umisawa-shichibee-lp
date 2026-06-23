"use client";

import { Clock, ListChecks, Backpack, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/LocaleProvider";

export function GuideContent() {
  const { t } = useI18n();
  const g = t.guide;

  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x max-w-4xl">
        <SectionHeading as="h1" align="center" eyebrow={g.eyebrow} title={g.title} />
        <p className="mx-auto mt-6 max-w-2xl text-center leading-loose text-cream/70">{g.lead}</p>

        {/* 営業時間・予約 */}
        <Reveal>
          <div className="mt-16 rounded-2xl border border-white/10 bg-ink-card p-7 md:p-8">
            <div className="flex items-center gap-2 text-xs tracking-widest2 text-gold">
              <Clock size={16} /> {g.hoursHeading}
            </div>
            <dl className="mt-5 divide-y divide-white/10">
              {g.hours.map((row) => (
                <div key={row.label} className="grid gap-1 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-xs tracking-widest2 text-stone sm:pt-0.5">{row.label}</dt>
                  <dd className="text-sm text-cream/85">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        {/* ご利用の流れ */}
        <Reveal>
          <div className="mt-8 rounded-2xl border border-white/10 bg-ink-card p-7 md:p-8">
            <div className="flex items-center gap-2 text-xs tracking-widest2 text-gold">
              <ListChecks size={16} /> {g.flowHeading}
            </div>
            <ol className="mt-6 space-y-5">
              {g.flow.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 font-display text-sm text-gold">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-cream/80">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* 持ち物・アメニティ */}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {[
            { icon: Backpack, heading: g.bringHeading, items: g.bring },
            { icon: Sparkles, heading: g.amenityHeading, items: g.amenity },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.heading}>
                <div className="h-full rounded-2xl border border-white/10 bg-ink-card p-7 md:p-8">
                  <div className="flex items-center gap-2 text-xs tracking-widest2 text-gold">
                    <Icon size={16} /> {card.heading}
                  </div>
                  <ul className="mt-5 space-y-3">
                    {card.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm leading-relaxed text-cream/80">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/70" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ご利用にあたって */}
        <Reveal>
          <div className="mt-8 rounded-2xl border border-white/10 bg-ink-soft p-7 md:p-8">
            <h3 className="font-serif text-sm tracking-widest2 text-cream">{g.etiquetteHeading}</h3>
            <ul className="mt-5 space-y-3">
              {g.etiquette.map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-sm leading-relaxed text-cream/75">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/70" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-stone">{g.note}</p>
      </div>
    </section>
  );
}
