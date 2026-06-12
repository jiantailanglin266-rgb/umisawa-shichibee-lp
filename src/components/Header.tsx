"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navLinks, primaryCta, siteConfig, asset } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <a href="#hero" aria-label={siteConfig.name} className="group flex items-center">
          <Image
            src={asset("/logo.png")}
            alt={siteConfig.name}
            width={120}
            height={120}
            priority
            className="h-14 w-14 rounded-full bg-white object-cover ring-1 ring-gold/30 transition-transform duration-500 group-hover:scale-105 md:h-16 md:w-16"
          />
        </a>

        {/* PC ナビ */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm tracking-wide text-cream/80 transition-colors hover:text-cream"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href={primaryCta.href}
            target={primaryCta.external ? "_blank" : undefined}
            rel={primaryCta.external ? "noopener noreferrer" : undefined}
            className="rounded-full border border-gold/70 px-5 py-2 text-sm tracking-wide text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            {primaryCta.label}
          </a>
        </nav>

        {/* モバイルトグル */}
        <button
          type="button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-cream lg:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* モバイルメニュー */}
      <div
        className={`overflow-hidden border-t border-white/5 bg-ink/95 backdrop-blur-md transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-[28rem]" : "max-h-0"
        }`}
      >
        <nav className="container-x flex flex-col gap-1 py-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-white/5 py-3 text-cream/85"
            >
              <span className="tracking-wide">{l.label}</span>
              <span className="font-display text-xs uppercase tracking-widest2 text-stone">
                {l.labelEn}
              </span>
            </a>
          ))}
          <a
            href={primaryCta.href}
            target={primaryCta.external ? "_blank" : undefined}
            rel={primaryCta.external ? "noopener noreferrer" : undefined}
            onClick={() => setOpen(false)}
            className="mt-3 rounded-full bg-gold py-3 text-center text-sm font-medium tracking-wide text-ink"
          >
            {primaryCta.label}
          </a>
          <p className="mt-3 text-center font-display text-xs tracking-widest2 text-stone">
            {siteConfig.location}
          </p>
        </nav>
      </div>
    </header>
  );
}
