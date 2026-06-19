"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Check, ChevronDown } from "lucide-react";
import { locales, localeNames, isLocale, type Locale } from "@/i18n/config";
import { useI18n } from "@/components/LocaleProvider";

/** 現在のパスのロケールを target に差し替えたパスを返す。 */
function swapLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && isLocale(segments[0])) {
    segments[0] = target;
  } else {
    segments.unshift(target);
  }
  return "/" + segments.join("/") + "/";
}

export function LanguageSwitcher({ variant = "header" }: { variant?: "header" | "mobile" }) {
  const { locale } = useI18n();
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 外側クリック・Esc で閉じる（hover は使わずクリックトグルに統一）
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (variant === "mobile") {
    return (
      <div className="flex flex-wrap gap-2">
        {locales.map((l) => (
          <Link
            key={l}
            href={swapLocale(pathname, l)}
            className={`rounded-full border px-4 py-2 text-xs tracking-wide transition-colors ${
              l === locale
                ? "border-gold bg-gold/10 text-gold"
                : "border-white/20 text-cream/70 hover:border-cream/50"
            }`}
          >
            {localeNames[l]}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-sm tracking-wide text-cream/80 transition-colors hover:text-cream"
      >
        <Globe size={16} strokeWidth={1.5} />
        <span className="hidden xl:inline">{localeNames[locale]}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 min-w-[9rem] overflow-hidden rounded-xl border border-white/10 bg-ink/95 py-1 backdrop-blur-md"
        >
          {locales.map((l) => (
            <Link
              key={l}
              href={swapLocale(pathname, l)}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                l === locale ? "text-gold" : "text-cream/80"
              }`}
            >
              {localeNames[l]}
              {l === locale && <Check size={14} />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
