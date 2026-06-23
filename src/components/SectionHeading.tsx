import { Reveal } from "@/components/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  className?: string;
  /** 見出しレベル。ページ主見出しは "h1"、トップ内セクションは "h2"（既定）。 */
  as?: "h1" | "h2";
};

/** 各セクション共通の見出し（英字ラベル＋和文タイトル＋ゴールド罫線）。 */
export function SectionHeading({ eyebrow, title, align = "left", className, as = "h2" }: Props) {
  const centered = align === "center";
  const Heading = as;
  return (
    <Reveal className={className}>
      <div className={centered ? "flex flex-col items-center text-center" : ""}>
        <p className="eyebrow">{eyebrow}</p>
        <Heading className="heading mt-4 text-2xl sm:text-3xl md:text-4xl">{title}</Heading>
        <div className={`rule-gold mt-6 ${centered ? "mx-auto" : ""}`} />
      </div>
    </Reveal>
  );
}
