import { Reveal } from "@/components/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  className?: string;
};

/** 各セクション共通の見出し（英字ラベル＋和文タイトル＋ゴールド罫線）。 */
export function SectionHeading({ eyebrow, title, align = "left", className }: Props) {
  const centered = align === "center";
  return (
    <Reveal className={className}>
      <div className={centered ? "flex flex-col items-center text-center" : ""}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="heading mt-4 text-2xl sm:text-3xl md:text-4xl">{title}</h2>
        <div className={`rule-gold mt-6 ${centered ? "mx-auto" : ""}`} />
      </div>
    </Reveal>
  );
}
