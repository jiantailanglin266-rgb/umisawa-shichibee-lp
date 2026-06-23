"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { newsMeta } from "@/lib/data";
import { bcp47 } from "@/i18n/config";
import { useI18n } from "@/components/LocaleProvider";

// "2026-06-20" → ロケール別の表示（current-date 非依存で SSG 安全）
function formatDate(iso: string, bcp: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(bcp, { year: "numeric", month: "long", day: "numeric" }).format(
    new Date(y, m - 1, d)
  );
}

export function NewsContent() {
  const { locale, t } = useI18n();
  const n = t.news;
  const bcp = bcp47[locale];

  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x max-w-3xl">
        <SectionHeading as="h1" align="center" eyebrow={n.eyebrow} title={n.title} />
        <p className="mx-auto mt-6 max-w-2xl text-center leading-loose text-cream/70">{n.lead}</p>

        <ol className="mt-16 space-y-5">
          {newsMeta.map((meta, i) => {
            const post = n.posts[i];
            if (!post) return null;
            return (
              <Reveal as="li" key={meta.date + i} delay={i * 0.05}>
                <article className="group rounded-2xl border border-white/10 bg-ink-card p-7 transition-colors hover:border-gold/40 md:p-8">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <time className="font-display text-sm tracking-widest2 text-gold">
                      {formatDate(meta.date, bcp)}
                    </time>
                    <span className="rounded-full border border-white/15 px-3 py-0.5 text-[0.7rem] tracking-widest2 text-stone">
                      {n.categories[meta.category]}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-lg leading-snug text-cream md:text-xl">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-loose text-cream/70">{post.body}</p>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
