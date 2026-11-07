import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./BrandIcons";

const networks = [
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon },
] as const;

export function SocialLinks({ inverted, className }: { inverted?: boolean; className?: string }) {
  const items = networks.filter((n) => siteConfig.social[n.key]);
  if (!items.length) return null;
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {items.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={siteConfig.social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (se abre en una pestaña nueva)`}
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300",
              inverted
                ? "border-cream/20 text-cream hover:border-sage hover:bg-sage hover:text-forest-deep"
                : "border-forest/20 text-forest hover:border-forest hover:bg-forest hover:text-cream"
            )}
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
