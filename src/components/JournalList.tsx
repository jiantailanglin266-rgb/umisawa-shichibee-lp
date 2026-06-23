"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { journalMeta } from "@/lib/data";
import { bcp47 } from "@/i18n/config";
import { asset } from "@/lib/site";
import { useI18n } from "@/components/LocaleProvider";

function formatDate(iso: string, bcp: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(bcp, { year: "numeric", month: "long", day: "numeric" }).format(
    new Date(y, m - 1, d)
  );
}

export function JournalList() {
  const { locale, t } = useI18n();
  const j = t.journal;
  const bcp = bcp47[locale];

  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x max-w-5xl">
        <SectionHeading as="h1" align="center" eyebrow={j.eyebrow} title={j.title} />
        <p className="mx-auto mt-6 max-w-2xl text-center leading-loose text-cream/70">{j.lead}</p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {journalMeta.map((meta, i) => {
            const art = j.articles[i];
            if (!art) return null;
            return (
              <Reveal key={meta.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/${locale}/journal/${meta.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/40"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={asset(meta.image)}
                      alt={art.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-ink/65 px-2.5 py-1 text-[0.6rem] tracking-widest2 text-cream/85 backdrop-blur-sm">
                      {t.gallery.imageBadge}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="rounded-full border border-gold/40 px-2.5 py-0.5 tracking-widest2 text-gold">
                        {j.categories[meta.category]}
                      </span>
                      <time className="font-display tracking-widest2 text-stone">
                        {formatDate(meta.date, bcp)}
                      </time>
                    </div>
                    <h3 className="mt-4 font-serif text-lg leading-snug text-cream">{art.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/65">{art.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm tracking-wide text-gold">
                      {j.readMore}
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
