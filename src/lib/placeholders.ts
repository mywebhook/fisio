import { siteConfig } from "@/config/site";

/** Cuenta los marcadores provisionales "[...]" pendientes en la configuración. */
export function countPlaceholders(value: unknown = siteConfig): number {
  if (typeof value === "string") return /\[[^\]]*\]/.test(value) ? 1 : 0;
  if (Array.isArray(value)) return value.reduce<number>((n, v) => n + countPlaceholders(v), 0);
  if (value && typeof value === "object")
    return Object.values(value).reduce<number>((n, v) => n + countPlaceholders(v), 0);
  return 0;
}
