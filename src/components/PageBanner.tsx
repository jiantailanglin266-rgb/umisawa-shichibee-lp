import Image from "next/image";
import { asset } from "@/lib/site";

/** 下層ページ上部のヒーローバナー（フルブリード画像＋暗グラデ）。 */
export function PageBanner({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-52 w-full overflow-hidden sm:h-64 md:h-80">
      <Image
        src={asset(src)}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink" />
    </div>
  );
}
