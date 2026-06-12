import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { asset } from "@/lib/site";

/** 物語と体験を繋ぐ「祈りの風景」セクション（森のお堂・祈りの像）。 */
const scenes = [
  {
    src: "/sanctuary/shrine.jpg",
    alt: "海沢の森に佇む小さなお堂",
    label: "森のお堂",
    caption: "静寂に包まれ、心を整える場所。",
  },
  {
    src: "/sanctuary/altar.jpg",
    alt: "受け継がれてきた祈りの像",
    label: "祈りの像",
    caption: "この地で守り継がれてきた、祈りのかたち。",
  },
];

export function Sanctuary() {
  return (
    <section className="relative py-28 md:py-40">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Sanctuary"
          title="森に佇む、祈りのかたち。"
        />
        <Reveal>
          <p className="mx-auto mt-6 max-w-2xl text-center leading-loose text-cream/70">
            日常の喧騒を離れ、海沢の森へ。
            <br className="hidden sm:block" />
            古くから受け継がれてきた祈りの文化が、
            自分と向き合う静かな時間をそっと迎えてくれます。
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          {scenes.map((s, i) => (
            <Reveal key={s.src} delay={i * 0.1}>
              <figure className="group overflow-hidden rounded-2xl border border-white/10">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={asset(s.src)}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6">
                    <span className="font-display text-xs uppercase tracking-widest2 text-gold">
                      0{i + 1}
                    </span>
                    <p className="mt-1 font-serif text-lg tracking-wide text-cream">
                      {s.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-cream/80">
                      {s.caption}
                    </p>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
