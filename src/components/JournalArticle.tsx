"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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

export function JournalArticle({ slug }: { slug: string }) {
  const { locale, t } = useI18n();
  const j = t.journal;
  const bcp = bcp47[locale];
  const index = journalMeta.findIndex((m) => m.slug === slug);
  const meta = journalMeta[index];
  const art = j.articles[index];
  if (!meta || !art) return null;

  return (
    <article className="relative py-24 md:py-32">
      <div className="container-x max-w-3xl">
        <Reveal>
          <div className="flex items-center justify-center gap-3 text-xs">
            <span className="rounded-full border border-gold/40 px-3 py-0.5 tracking-widest2 text-gold">
              {j.categories[meta.category]}
            </span>
            <time className="font-display tracking-widest2 text-stone">
              {formatDate(meta.date, bcp)}
            </time>
          </div>
          <h1 className="heading mt-6 text-center text-2xl leading-[1.5] md:text-4xl">
            {art.title}
          </h1>
        </Reveal>

        <Reveal>
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={asset(meta.image)}
              alt={art.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-12 space-y-6">
          {art.body.map((p, i) => (
            <Reveal key={i}>
              <p className="text-pretty leading-loose text-cream/80 md:text-[1.05rem]">{p}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <Link
            href={`/${locale}/journal`}
            className="inline-flex items-center gap-2 text-sm tracking-widest2 text-gold transition-colors hover:text-cream"
          >
            <ArrowLeft size={16} />
            {j.backToList}
          </Link>
        </div>
      </div>
    </article>
  );
}
