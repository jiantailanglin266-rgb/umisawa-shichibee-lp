"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks, getPrimaryCta, siteConfig, asset } from "@/lib/site";
import { useI18n } from "@/components/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SocialLinks } from "@/components/SocialLinks";

export function Header() {
  const { locale, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cta = getPrimaryCta(locale, t.cta);

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
        <Link href={`/${locale}/`} aria-label={siteConfig.name} className="group flex items-center">
          <Image
            src={asset("/logo.png")}
            alt={siteConfig.name}
            width={120}
            height={120}
            priority
            className="h-14 w-14 rounded-full bg-white object-cover ring-1 ring-gold/30 transition-transform duration-500 group-hover:scale-105 md:h-16 md:w-16"
          />
        </Link>

        {/* PC ナビ */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.key}
              href={`/${locale}/#${l.anchor}`}
              className="group relative text-sm tracking-wide text-cream/80 transition-colors hover:text-cream"
            >
              {t.nav[l.key as keyof typeof t.nav]}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            href={`/${locale}/access`}
            className="group relative text-sm tracking-wide text-cream/80 transition-colors hover:text-cream"
          >
            {t.nav.access}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href={`/${locale}/reserve`}
            className="group relative text-sm tracking-wide text-gold transition-colors hover:text-cream"
          >
            {t.nav.reserve}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
          </Link>
          <span className="hidden h-4 w-px bg-white/15 xl:block" />
          <div className="hidden xl:block">
            <SocialLinks />
          </div>
          <LanguageSwitcher />
          <a
            href={cta.href}
            target={cta.external ? "_blank" : undefined}
            rel={cta.external ? "noopener noreferrer" : undefined}
            className="rounded-full border border-gold/70 px-5 py-2 text-sm tracking-wide text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            {cta.label}
          </a>
        </nav>

        {/* モバイルトグル */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
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
          open ? "max-h-[36rem]" : "max-h-0"
        }`}
      >
        <nav className="container-x flex flex-col gap-1 py-4">
          {navLinks.map((l) => (
            <Link
              key={l.key}
              href={`/${locale}/#${l.anchor}`}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-white/5 py-3 text-cream/85"
            >
              <span className="tracking-wide">{t.nav[l.key as keyof typeof t.nav]}</span>
            </Link>
          ))}
          <Link
            href={`/${locale}/access`}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between border-b border-white/5 py-3 text-cream/85"
          >
            <span className="tracking-wide">{t.nav.access}</span>
          </Link>
          <Link
            href={`/${locale}/reserve`}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between border-b border-white/5 py-3 text-gold"
          >
            <span className="tracking-wide">{t.nav.reserve}</span>
          </Link>
          <a
            href={cta.href}
            target={cta.external ? "_blank" : undefined}
            rel={cta.external ? "noopener noreferrer" : undefined}
            onClick={() => setOpen(false)}
            className="mt-3 rounded-full bg-gold py-3 text-center text-sm font-medium tracking-wide text-ink"
          >
            {cta.label}
          </a>
          <div className="mt-5 flex items-center justify-between gap-4">
            <LanguageSwitcher variant="mobile" />
            <SocialLinks />
          </div>
        </nav>
      </div>
    </header>
  );
}
