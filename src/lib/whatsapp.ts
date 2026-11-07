import { siteConfig } from "@/config/site";

/** Construye un enlace wa.me con mensaje predefinido. */
export function whatsappUrl(message: string = siteConfig.contact.whatsappDefaultMessage): string {
  const phone = siteConfig.contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function mapsSearchUrl(): string {
  if (siteConfig.contact.mapsUrl) return siteConfig.contact.mapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.mapsQuery)}`;
}

export function mapsDirectionsUrl(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.contact.mapsQuery)}`;
}

export function mapsEmbedUrl(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.contact.mapsQuery)}&output=embed`;
}
