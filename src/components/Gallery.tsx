"use client";

import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { gallery } from "@/lib/data";
import { asset } from "@/lib/site";

const ratioClass: Record<string, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
};

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i + gallery.length - 1) % gallery.length)),
    []
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % gallery.length)),
    []
  );

  // キーボード操作とスクロールロック
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
        <SectionHeading
          align="center"
          eyebrow="Gallery"
          title="海沢の、まだ見ぬ風景。"
        />

        {/* Pinterest 風 masonry（CSS columns） */}
        <div className="mt-16 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {gallery.map((g, i) => (
            <button
              key={g.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${g.alt} を拡大表示`}
              className={`group relative block w-full break-inside-avoid overflow-hidden rounded-xl border border-white/10 ${ratioClass[g.ratio]}`}
            >
              {/* 画像（未配置時もグラデーションで成立する） */}
              <span
                className="absolute inset-0 bg-gradient-to-br from-ink-card via-stone/20 to-ink bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${asset(g.src)})` }}
              />
              <span className="absolute inset-0 bg-ink/20 transition-colors duration-500 group-hover:bg-ink/0" />
              <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left text-xs tracking-wide text-cream/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-cream/90">
                {g.alt}
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
          aria-label="画像の拡大表示"
        >
          <button
            type="button"
            onClick={close}
            aria-label="閉じる"
            className="absolute right-5 top-5 text-cream/70 transition-colors hover:text-gold"
          >
            <X size={30} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="前の画像"
            className="absolute left-4 text-cream/60 transition-colors hover:text-gold md:left-10"
          >
            <ChevronLeft size={40} />
          </button>

          <figure
            className="mx-16 max-h-[82vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="aspect-[3/2] w-full rounded-lg border border-white/10 bg-gradient-to-br from-ink-card via-stone/20 to-ink bg-cover bg-center"
              style={{ backgroundImage: `url(${asset(gallery[index].src)})` }}
            />
            <figcaption className="mt-4 text-center text-sm tracking-wide text-cream/70">
              {gallery[index].alt}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="次の画像"
            className="absolute right-4 text-cream/60 transition-colors hover:text-gold md:right-10"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </section>
  );
}
