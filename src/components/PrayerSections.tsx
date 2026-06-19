"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, Leaf, Sprout } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { asset } from "@/lib/site";
import { prayerMeta } from "@/lib/data";
import { useI18n } from "@/components/LocaleProvider";

/* ── モチーフ用インラインSVG ─────────────────────────────── */
function IconLotus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" className={className}>
      <path d="M12 4c1.8 2.8 1.8 5.8 0 8.6-1.8-2.8-1.8-5.8 0-8.6Z" />
      <path d="M12 12.6c-2.8-.8-4.8-2.8-5.8-5.8 3 0 5 2 5.8 5.8Z" />
      <path d="M12 12.6c2.8-.8 4.8-2.8 5.8-5.8-3 0-5 2-5.8 5.8Z" />
      <path d="M4.5 12.2C6.5 14.4 9 15.6 12 15.6s5.5-1.2 7.5-3.4" />
    </svg>
  );
}

function IconTorii({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 6.2c3-1.4 15-1.4 18 0" />
      <path d="M5 9.2h14" />
      <path d="M6.5 6.5V19" />
      <path d="M17.5 6.5V19" />
    </svg>
  );
}

// ブロックごとのカードアイコン（左→右）
const cardIcons: ReactNode[][] = [
  [<Leaf key="l" size={20} strokeWidth={1.3} />, <IconLotus key="o" className="h-5 w-5" />, <IconTorii key="t" className="h-5 w-5" />],
  [<IconLotus key="o" className="h-5 w-5" />, <IconTorii key="t" className="h-5 w-5" />, <Sprout key="s" size={20} strokeWidth={1.3} />],
];

function Enso() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className="pointer-events-none absolute -right-2 -top-10 h-36 w-36 text-gold/20 md:h-44 md:w-44">
      <path d="M60 14a46 46 0 1 0 30 11" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function Kasumi() {
  return (
    <svg viewBox="0 0 160 80" aria-hidden className="pointer-events-none absolute -right-2 -top-8 h-20 w-40 text-gold/25">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M30 18h80c14 0 14 10 0 10H70" />
        <path d="M10 34h120c16 0 16 10 0 10H90" />
        <path d="M40 50h70c12 0 12 9 0 9H80" />
      </g>
    </svg>
  );
}

export function PrayerSections() {
  const { t } = useI18n();

  return (
    <section className="bg-[#f4f0e7] py-24 md:py-32">
      <div className="container-x space-y-24 md:space-y-32">
        {t.prayer.blocks.map((block, bi) => {
          const meta = prayerMeta[bi];
          return (
            <div key={bi}>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] shadow-[0_30px_70px_-30px_rgba(40,33,24,0.55)] sm:aspect-[5/5]">
                    <Image
                      src={asset(meta.image)}
                      alt={block.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="relative">
                    {meta.decor === "enso" ? <Enso /> : <Kasumi />}

                    <p className="relative font-display text-sm uppercase tracking-widest2 text-gold">
                      {block.dashes ? `—  ${block.eyebrow}  —` : block.eyebrow}
                    </p>

                    <h3 className="relative mt-5 font-serif text-3xl font-medium leading-[1.5] text-[#2b2722] md:text-[2.6rem]">
                      {block.headingLines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </h3>

                    <div className="mt-7 h-px w-12 bg-[#cdbf9f]" />

                    <div className="mt-7 space-y-1.5 leading-loose text-[#6f675b]">
                      {block.body.map((l) => (
                        <p key={l}>{l}</p>
                      ))}
                    </div>

                    <a
                      href="#experience"
                      className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm tracking-widest2 text-[#fffdf7] shadow-sm transition-all duration-300 hover:bg-[#a98c4f] hover:shadow-md"
                    >
                      {block.cta}
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </Reveal>
              </div>

              <Reveal>
                <div className="mt-14 grid grid-cols-1 gap-y-8 border-t border-[#e3ddcd] pt-10 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-[#e3ddcd]">
                  {block.cards.map((card, ci) => (
                    <div key={card.title} className="flex gap-4 sm:px-7 sm:first:pl-0 sm:last:pr-0">
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                          meta.iconStyle === "filled"
                            ? "bg-[#8c8c58] text-[#f5f1e8]"
                            : "border border-gold/60 text-gold"
                        }`}
                      >
                        {cardIcons[bi][ci]}
                      </span>
                      <div>
                        <h4 className="font-serif text-base text-[#2b2722]">{card.title}</h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#79705f]">{card.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
