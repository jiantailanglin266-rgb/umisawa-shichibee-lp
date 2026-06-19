"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/LocaleProvider";

export function Story() {
  const { t } = useI18n();
  const story = t.story;

  return (
    <section id="story" className="relative py-28 md:py-40">
      <div className="container-x">
        <SectionHeading eyebrow={story.eyebrow} title={story.heading} />

        <div className="mt-16 grid gap-x-16 gap-y-12 md:mt-24 md:grid-cols-12">
          <div className="hidden md:col-span-3 md:block">
            <Reveal className="sticky top-32">
              <p className="font-display text-7xl italic text-gold/30">{story.asideKanji}</p>
              <p className="mt-6 max-w-[16rem] text-sm leading-loose text-stone">
                {story.asideText}
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-9">
            <ol className="space-y-12 md:space-y-16">
              {story.blocks.map((b, i) => (
                <Reveal as="li" key={b.label} delay={i * 0.05}>
                  <article className="group grid gap-3 border-l border-white/10 pl-6 transition-colors hover:border-gold md:grid-cols-[8rem_1fr] md:gap-8 md:border-l-0 md:pl-0">
                    <div className="flex items-baseline gap-3 md:flex-col md:items-end md:gap-1 md:text-right">
                      <span className="font-display text-sm tracking-widest2 text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-serif text-lg tracking-widest2 text-cream">
                        {b.label}
                      </h3>
                    </div>
                    <p className="text-pretty leading-loose text-cream/75">{b.text}</p>
                  </article>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
