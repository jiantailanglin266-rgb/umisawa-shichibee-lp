"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export type NavItem = { label: string; href: string };

/** ヘッダーのグループ・ドロップダウン（ホバー＋クリック、外側クリック/Escで閉じる）。 */
export function NavGroup({ label, items }: { label: string; items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1 text-sm tracking-wide text-cream/80 transition-colors hover:text-cream"
      >
        {label}
        <ChevronDown
          size={14}
          className={`text-gold/70 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        // pt-3 がボタンとパネルの間を埋め、ホバー移動でも閉じない
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
          <div
            role="menu"
            className="min-w-[12rem] overflow-hidden rounded-xl border border-white/10 bg-ink/95 py-1.5 shadow-xl backdrop-blur-md"
          >
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-5 py-2.5 text-sm tracking-wide text-cream/80 transition-colors hover:bg-white/5 hover:text-gold"
              >
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
