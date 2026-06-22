"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { galleryItems } from "@/lib/data";
import { asset } from "@/lib/site";
import { useI18n } from "@/components/LocaleProvider";

export function Gallery() {
  const { t } = useI18n();
  const alts = t.gallery.alts;
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i + galleryItems.length - 1) % galleryItems.length)),
    []
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % galleryItems.length)),
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, prev, next]);

  return (
    <section id="gallery" className="relative py-28 md:py-40">
      <div className="container-x">
        <SectionHeading align="center" eyebrow={t.gallery.eyebrow} title={t.gallery.title} />
        <p className="mx-auto mt-6 max-w-xl text-center text-xs leading-relaxed text-stone">
          {t.gallery.imageNote}
        </p>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {galleryItems.map((g, i) => (
            <button
              key={g.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={alts[i]}
              className="group relative block aspect-[3/4] overflow-hidden rounded-xl border border-white/10"
            >
              <Image
                src={asset(g.src)}
                alt={alts[i]}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-ink/15 transition-colors duration-500 group-hover:bg-ink/0" />
              <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-ink/65 px-2.5 py-1 text-[0.6rem] tracking-widest2 text-cream/85 backdrop-blur-sm">
                {t.gallery.imageBadge}
              </span>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 text-left text-xs tracking-wide text-cream/0 transition-all duration-500 group-hover:text-cream/95">
                {alts[i]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && index !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={alts[index]}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 text-cream/70 transition-colors hover:text-gold"
          >
            <X size={30} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
            className="absolute left-4 z-10 text-cream/60 transition-colors hover:text-gold md:left-10"
          >
            <ChevronLeft size={40} />
          </button>

          <figure className="mx-14 flex h-[82vh] w-full max-w-4xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full flex-1">
              <Image
                src={asset(galleryItems[index].src)}
                alt={alts[index]}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-4 shrink-0 text-center text-sm tracking-wide text-cream/70">
              {alts[index]}
              <span className="ml-2 text-xs text-stone">（{t.gallery.imageBadge}）</span>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
            className="absolute right-4 z-10 text-cream/60 transition-colors hover:text-gold md:right-10"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </section>
  );
}
