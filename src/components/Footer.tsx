"use client";

import Link from "next/link";
import { Instagram } from "lucide-react";
import { siteConfig, isMakuakeLive, navLinks } from "@/lib/site";
import { useI18n } from "@/components/LocaleProvider";

export function Footer() {
  const { locale, t } = useI18n();
  const year = 2026;

  return (
    <footer className="border-t border-white/10 bg-ink py-16">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          {/* ブランド */}
          <div className="md:col-span-5">
            <p className="font-serif text-xl tracking-[0.15em] text-cream">海沢 七兵衛</p>
            <p className="mt-1 font-display text-sm uppercase tracking-widest2 text-gold">
              Sauna &amp; Spa
            </p>
            <p className="mt-6 max-w-sm text-sm leading-loose text-stone">
              {t.footer.tagline}
              <br />
              {t.footer.location}
            </p>
          </div>

          {/* ナビ */}
          <nav className="md:col-span-4">
            <p className="text-xs tracking-widest2 text-stone">{t.footer.menu}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {navLinks.map((l) => (
                <li key={l.key}>
                  <Link
                    href={`/${locale}/#${l.anchor}`}
                    className="text-sm text-cream/75 transition-colors hover:text-gold"
                  >
                    {t.nav[l.key as keyof typeof t.nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* リンク */}
          <div className="md:col-span-3">
            <p className="text-xs tracking-widest2 text-stone">{t.footer.follow}</p>
            <div className="mt-5 flex gap-4">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream/80 transition-colors hover:border-gold hover:text-gold"
              >
                <Instagram size={18} />
              </a>
              {isMakuakeLive && (
                <a
                  href={siteConfig.makuakeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 items-center rounded-full border border-gold/50 px-4 text-xs tracking-widest2 text-gold transition-colors hover:bg-gold hover:text-ink"
                >
                  Makuake
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 下段 */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-stone sm:flex-row">
          <p>© {year} 海沢 七兵衛 SAUNA &amp; SPA</p>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="transition-colors hover:text-gold">
              {t.footer.privacy}
            </Link>
            <Link href={`/${locale}/tokushoho`} className="transition-colors hover:text-gold">
              {t.footer.tokushoho}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
