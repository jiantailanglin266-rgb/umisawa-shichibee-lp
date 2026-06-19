import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDictionary(locale).tokushoho.title, robots: { index: false, follow: true } };
}

export default async function TokushohoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale as Locale);
  const k = t.tokushoho;

  return (
    <LegalLayout locale={locale} eyebrow={k.eyebrow} title={k.title} backLabel={t.footer.backToTop}>
      <p className="text-sm leading-loose text-stone">{k.note}</p>
      {k.sections.map((s) => (
        <LegalSection key={s.heading} heading={s.heading}>
          {s.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </LegalSection>
      ))}
      <p className="text-xs text-stone">{k.date}</p>
    </LegalLayout>
  );
}
