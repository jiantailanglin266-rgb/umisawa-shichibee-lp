import type { ReactNode } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/** 規約系ページの共通レイアウト（多言語対応）。 */
export function LegalLayout({
  locale,
  eyebrow,
  title,
  backLabel,
  children,
}: {
  locale: string;
  eyebrow: string;
  title: string;
  backLabel: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="container-x max-w-3xl py-32 md:py-40">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="heading mt-4 text-3xl md:text-4xl">{title}</h1>
        <div className="rule-gold mt-6" />
        <div className="mt-12 space-y-8 text-cream/75">{children}</div>
        <Link
          href={`/${locale}/`}
          className="mt-16 inline-block text-sm tracking-widest2 text-gold transition-colors hover:text-cream"
        >
          ← {backLabel}
        </Link>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-lg text-cream">{heading}</h2>
      <div className="mt-3 space-y-2 text-sm leading-loose">{children}</div>
    </section>
  );
}
