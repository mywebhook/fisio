export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Devuelve true si el texto es un marcador provisional del tipo "[...]" o está vacío. */
export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return true;
  return /\[[^\]]*\]/.test(value);
}

/** Devuelve el valor solo si es un dato real (no vacío ni marcador). */
export function realValue(value: string | null | undefined): string | undefined {
  return isPlaceholder(value) ? undefined : (value as string);
}

/** Un teléfono es real si contiene algún dígito distinto de cero. */
export function hasRealPhone(value: string): boolean {
  return /[1-9]/.test(value);
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const dateFormatter = new Intl.DateTimeFormat("es", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}
