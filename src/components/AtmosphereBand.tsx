"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { asset } from "@/lib/site";
import { useI18n } from "@/components/LocaleProvider";

/** トップのシネマティックな全面バンド（ブランドの言葉を重ねる）。 */
export function AtmosphereBand() {
  const { t } = useI18n();
  return (
    <section className="relative flex h-[58vh] min-h-[360px] items-center justify-center overflow-hidden">
      <Image
        src={asset("/atmosphere/band1.webp")}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <span aria-hidden className="absolute inset-0 bg-ink/55" />
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 px-6 text-center font-serif text-2xl leading-relaxed text-cream drop-shadow-[0_2px_24px_rgba(0,0,0,0.75)] md:text-4xl"
      >
        {t.footer.tagline}
      </motion.p>
    </section>
  );
}
