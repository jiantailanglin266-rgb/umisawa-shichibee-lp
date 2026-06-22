import { Instagram, Youtube } from "lucide-react";
import { siteConfig } from "@/lib/site";

/** X（旧Twitter）公式ロゴ。lucide に無いためインラインSVG。 */
function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const links = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: <Instagram size={18} strokeWidth={1.6} /> },
  { label: "X", href: siteConfig.social.x, icon: <XIcon size={16} /> },
  { label: "YouTube", href: siteConfig.social.youtube, icon: <Youtube size={19} strokeWidth={1.6} /> },
];

/**
 * SNS アイコンリンク（Instagram / X / YouTube）。
 * variant: "header"（小さめ・テキスト色）/ "footer"（丸枠ボタン）
 */
export function SocialLinks({
  variant = "header",
  className = "",
}: {
  variant?: "header" | "footer";
  className?: string;
}) {
  if (variant === "footer") {
    return (
      <div className={`flex gap-3 ${className}`}>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream/80 transition-colors hover:border-gold hover:text-gold"
          >
            {l.icon}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          className="text-cream/75 transition-colors hover:text-gold"
        >
          {l.icon}
        </a>
      ))}
    </div>
  );
}
