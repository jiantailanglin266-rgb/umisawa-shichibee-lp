"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { asset } from "@/lib/site";
import { useI18n } from "@/components/LocaleProvider";

export function AboutContent() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x max-w-5xl">
        <SectionHeading align="center" eyebrow={a.eyebrow} title={a.title} />

        {/* 代表メッセージ */}
        <div className="mt-16 grid items-center gap-10 md:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]">
              <Image
                src={asset("/sanctuary/shrine.jpg")}
                alt={a.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div>
              <p className="font-display text-sm uppercase tracking-widest2 text-gold">
                {a.messageEyebrow}
              </p>
              <h3 className="mt-4 font-serif text-2xl font-medium leading-[1.5] text-cream md:text-3xl">
                {a.messageHeading}
              </h3>
              <div className="mt-7 h-px w-12 bg-gold/50" />
              <div className="mt-7 space-y-4 leading-loose text-cream/75">
                {a.messageBody.map((p, i) => (
                  <p key={i} className="text-pretty">{p}</p>
                ))}
              </div>
              <div className="mt-8 text-right">
                <p className="text-xs tracking-widest2 text-stone">{a.signatureRole}</p>
                <p className="mt-1 font-serif text-lg tracking-wide text-cream">{a.signatureName}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 運営概要 */}
        <Reveal>
          <div className="mt-20 rounded-2xl border border-white/10 bg-ink-card p-8 md:mt-28 md:p-10">
            <h3 className="font-serif text-lg tracking-widest2 text-cream">{a.companyHeading}</h3>
            <dl className="mt-6 divide-y divide-white/10">
              {a.companyRows.map((row) => (
                <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-xs tracking-widest2 text-stone sm:pt-0.5">{row.label}</dt>
                  <dd className="text-sm leading-relaxed text-cream/85">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <p className="mx-auto mt-12 max-w-xl text-center text-xs leading-relaxed text-stone">
          {a.note}
        </p>
      </div>
    </section>
  );
}
