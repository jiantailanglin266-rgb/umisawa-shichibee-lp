"use client";

import Link from "next/link";
import { siteConfig, isMakuakeLive, navLinks } from "@/lib/site";
import { useI18n } from "@/components/LocaleProvider";
import { SocialLinks } from "@/components/SocialLinks";

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
              <li>
                <Link
                  href={`/${locale}/access`}
                  className="text-sm text-cream/75 transition-colors hover:text-gold"
                >
                  {t.nav.access}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/news`}
                  className="text-sm text-cream/75 transition-colors hover:text-gold"
                >
                  {t.nav.news}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-sm text-cream/75 transition-colors hover:text-gold"
                >
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/reserve`}
                  className="text-sm text-gold/90 transition-colors hover:text-gold"
                >
                  {t.nav.reserve}
                </Link>
              </li>
            </ul>
          </nav>

          {/* リンク */}
          <div className="md:col-span-3">
            <p className="text-xs tracking-widest2 text-stone">{t.footer.follow}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <SocialLinks variant="footer" />
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
