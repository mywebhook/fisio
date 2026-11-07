import { siteConfig } from "@/config/site";
import { cn, initials } from "@/lib/utils";

/**
 * Logotipo tipográfico: monograma con las iniciales + nombre.
 * Si la profesional tiene un logotipo propio, reemplaza el <span> del monograma
 * por un <Image src="/logo.svg" ... />.
 */
export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  const { name, title } = siteConfig.professional;
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "relative grid h-11 w-11 shrink-0 place-items-center rounded-full border font-display text-[15px] tracking-wide",
          inverted ? "border-sage/60 text-cream" : "border-forest/30 text-forest"
        )}
      >
        {initials(name)}
        <span className={cn("absolute -right-0.5 top-1 h-2 w-2 rounded-full", inverted ? "bg-sage" : "bg-blush")} />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className={cn("max-w-[9.5rem] truncate font-display text-[1.02rem] sm:max-w-none sm:text-[1.15rem]", inverted ? "text-cream" : "text-ink")}>
          {name}
        </span>
        <span className={cn("text-[0.68rem] font-semibold uppercase tracking-[0.22em]", inverted ? "text-sage" : "text-forest")}>
          {title}
        </span>
      </span>
    </span>
  );
}
