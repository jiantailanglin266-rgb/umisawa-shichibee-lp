"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { getPrimaryCta, siteConfig, asset } from "@/lib/site";
import { useI18n } from "@/components/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SocialLinks } from "@/components/SocialLinks";

type Item = { label: string; href: string };
type Group = { label: string; items: Item[] };

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

  const menu: Group[] = [
    {
      label: t.nav.groupDiscover,
      items: [
        { label: t.nav.story, href: `/${locale}/#story` },
        { label: t.nav.experience, href: `/${locale}/#experience` },
        { label: t.nav.gallery, href: `/${locale}/#gallery` },
        { label: t.nav.journal, href: `/${locale}/journal` },
        { label: t.nav.about, href: `/${locale}/about` },
      ],
    },
    {
      label: t.nav.groupVisit,
      items: [
        { label: t.nav.access, href: `/${locale}/access` },
        { label: t.nav.pricing, href: `/${locale}/pricing` },
        { label: t.nav.guide, href: `/${locale}/guide` },
        { label: t.nav.reserve, href: `/${locale}/reserve` },
        { label: t.nav.faq, href: `/${locale}/#faq` },
      ],
    },
    {
      label: t.nav.groupProject,
      items: [
        { label: t.nav.project, href: `/${locale}/#project` },
        { label: t.nav.rewards, href: `/${locale}/#rewards` },
        { label: t.nav.news, href: `/${locale}/news` },
      ],
    },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-ink/85 backdrop-blur-md border-b border-white/5" : "bg-transparent"
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

        {/* PC ナビ（グループ別ドロップダウン） */}
        <nav className="hidden items-center gap-7 lg:flex">
          {menu.map((g) => (
            <div key={g.label} className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 text-sm tracking-wide text-cream/80 transition-colors group-hover:text-cream"
              >
                {g.label}
                <ChevronDown size={14} className="text-gold/70 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              {/* pt-3 がボタンとパネルの隙間を埋め、ホバー継続を保証 */}
              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="min-w-[12rem] overflow-hidden rounded-xl border border-white/10 bg-ink/95 py-1.5 backdrop-blur-md">
                  {g.items.map((it) => (
                    <Link
                      key={it.href}
                      href={it.href}
                      className="block px-5 py-2.5 text-sm tracking-wide text-cream/80 transition-colors hover:bg-white/5 hover:text-gold"
                    >
                      {it.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

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

      {/* モバイルメニュー（グループ見出し付き） */}
      <div
        className={`overflow-y-auto overflow-x-hidden border-t border-white/5 bg-ink/95 backdrop-blur-md transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <nav className="container-x flex flex-col gap-5 py-6">
          {menu.map((g) => (
            <div key={g.label}>
              <p className="text-xs tracking-widest2 text-gold/80">{g.label}</p>
              <div className="mt-2 flex flex-col">
                {g.items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-white/5 py-2.5 text-cream/85"
                  >
                    {it.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <a
            href={cta.href}
            target={cta.external ? "_blank" : undefined}
            rel={cta.external ? "noopener noreferrer" : undefined}
            onClick={() => setOpen(false)}
            className="mt-1 rounded-full bg-gold py-3 text-center text-sm font-medium tracking-wide text-ink"
          >
            {cta.label}
          </a>

          <div className="flex items-center justify-between gap-4">
            <LanguageSwitcher variant="mobile" />
            <SocialLinks />
          </div>
        </nav>
      </div>
    </header>
  );
}
