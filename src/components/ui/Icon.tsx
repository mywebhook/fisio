import {
  Accessibility,
  Baby,
  Bone,
  Brain,
  ClipboardCheck,
  Dumbbell,
  Flower2,
  Hand,
  HeartHandshake,
  HeartPulse,
  LineChart,
  PersonStanding,
  ShieldCheck,
  Sparkles,
  UserRound,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

/**
 * Registro de iconos por nombre. Permite guardar el icono como texto
 * en los datos (y en una futura base de datos).
 */
const icons = {
  accessibility: Accessibility,
  baby: Baby,
  bone: Bone,
  brain: Brain,
  "clipboard-check": ClipboardCheck,
  dumbbell: Dumbbell,
  flower: Flower2,
  hand: Hand,
  "heart-handshake": HeartHandshake,
  "heart-pulse": HeartPulse,
  "line-chart": LineChart,
  "person-standing": PersonStanding,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  "user-round": UserRound,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" strokeWidth={1.5} {...props} />;
}
