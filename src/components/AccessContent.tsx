"use client";

import { useEffect, useRef } from "react";
import { MapPin, Train, Car, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { asset } from "@/lib/site";
import { useI18n } from "@/components/LocaleProvider";

// 地図は常に日本語の住所でクエリ（場所の一意性のため）
const MAP_QUERY = "東京都西多摩郡奥多摩町海沢";
const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=12&output=embed`;
const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

// 動画の再生速度（1 = 等速。小さいほどゆっくり）
const ROUTE_PLAYBACK_RATE = 0.35;

export function AccessContent() {
  const { t } = useI18n();
  const a = t.access;
  const videoRef = useRef<HTMLVideoElement>(null);

  // 「駐車場からの道のり」をゆっくり再生
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const apply = () => {
      v.playbackRate = ROUTE_PLAYBACK_RATE;
    };
    apply();
    v.addEventListener("loadedmetadata", apply);
    v.addEventListener("play", apply);
    return () => {
      v.removeEventListener("loadedmetadata", apply);
      v.removeEventListener("play", apply);
    };
  }, []);

  return (
    <section className="relative py-28 md:py-36">
      <div className="container-x max-w-5xl">
        <SectionHeading as="h1" align="center" eyebrow={a.eyebrow} title={a.title} />
        <p className="mx-auto mt-6 max-w-2xl text-center leading-loose text-cream/70">{a.lead}</p>

        {/* 地図 */}
        <Reveal>
          <div className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-ink-card">
            <iframe
              title={a.title}
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[340px] w-full md:h-[440px]"
            />
            <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-2.5 text-sm text-cream/85">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold" strokeWidth={1.6} />
                <span>
                  <span className="block text-xs tracking-widest2 text-stone">{a.addressLabel}</span>
                  {a.address}
                </span>
              </p>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/60 px-5 py-2.5 text-sm tracking-wide text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                {a.mapButton}
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* 電車 / 車 */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
          {[
            { icon: Train, title: a.byTrainTitle, items: a.byTrain },
            { icon: Car, title: a.byCarTitle, items: a.byCar },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title}>
                <div className="h-full rounded-2xl border border-white/10 bg-ink-card p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                    <h3 className="font-serif text-lg text-cream">{card.title}</h3>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {card.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm leading-relaxed text-cream/75">
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

        {/* 所要時間 */}
        <Reveal>
          <div className="mt-8 rounded-2xl border border-white/10 bg-ink-card p-7">
            <div className="flex items-center gap-2 text-xs tracking-widest2 text-gold">
              <Clock size={16} /> {a.timeTitle}
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {a.times.map((row) => (
                <div key={row.from} className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink px-4 py-4">
                  <span className="text-sm text-cream/80">{row.from}</span>
                  <ArrowRight size={15} className="shrink-0 text-stone" />
                  <span className="font-display text-base text-gold">{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 駐車場からの道のり（実写動画） */}
        <Reveal>
          <figure className="mx-auto mt-14 w-full max-w-[20rem]">
            <figcaption className="mb-4 text-center font-serif text-base text-cream">
              {a.routeTitle}
            </figcaption>
            <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)] ring-1 ring-gold/15">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={asset("/access/route-poster.jpg")}
              >
                <source src={asset("/access/route.mp4")} type="video/mp4" />
              </video>
            </div>
            <p className="mt-3 text-center text-xs tracking-widest2 text-stone">{a.routeCaption}</p>
          </figure>
        </Reveal>

        <p className="mx-auto mt-12 max-w-xl text-center text-xs leading-relaxed text-stone">
          {a.note}
        </p>
      </div>
    </section>
  );
}
