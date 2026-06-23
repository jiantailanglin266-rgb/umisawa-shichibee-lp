import Link from "next/link";
import { fontVars } from "@/lib/fonts";
import { defaultLocale } from "@/i18n/config";

export default function NotFound() {
  return (
    <html lang={defaultLocale} className={fontVars}>
      <body className="flex min-h-[100svh] flex-col items-center justify-center gap-6 bg-ink px-6 text-center text-cream">
        <p className="font-display text-6xl text-gold/40">404</p>
        <p className="font-serif text-lg">ページが見つかりませんでした。</p>
        <p className="text-sm text-stone">The page you are looking for could not be found.</p>
        <Link
          href={`/${defaultLocale}/`}
          className="mt-2 rounded-full border border-gold/60 px-6 py-3 text-sm tracking-widest2 text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          ← Home
        </Link>
      </body>
    </html>
  );
}
