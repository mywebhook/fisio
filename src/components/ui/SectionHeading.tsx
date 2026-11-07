import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  inverted?: boolean;
  id?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "center", inverted, id, className }: Props) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow", align === "center" && "justify-center", inverted && "text-sage before:bg-sage")}>{eyebrow}</p>
      <h2 id={id} className={cn("mt-4 font-display text-[2rem] leading-[1.15] sm:text-[2.6rem]", inverted ? "text-cream" : "text-ink")}>
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", inverted ? "text-cream/75" : "text-graphite")}>{description}</p>
      )}
    </Reveal>
  );
}
