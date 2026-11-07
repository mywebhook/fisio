import { siteConfig } from "@/config/site";
import { hasRealPhone, realValue } from "@/lib/utils";

function esc(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

/** Genera una vCard 3.0 con los datos reales de la configuración (omite marcadores). */
export function buildVCard(): string {
  const { professional, contact, social, url } = siteConfig;
  const [first, ...rest] = professional.name.split(" ");
  const a = contact.address;
  const lines: Array<string | null> = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${esc(rest.join(" "))};${esc(first ?? "")};;;`,
    `FN:${esc(professional.name)}`,
    `TITLE:${esc(professional.title)}`,
    hasRealPhone(contact.phone) ? `TEL;TYPE=CELL,VOICE:${contact.phone}` : null,
    realValue(contact.email) ? `EMAIL;TYPE=INTERNET:${contact.email}` : null,
    realValue(a.street)
      ? `ADR;TYPE=WORK:;;${esc(a.street)};${esc(realValue(a.city) ?? "")};${esc(realValue(a.region) ?? "")};${esc(a.postalCode)};${esc(realValue(a.country) ?? "")}`
      : null,
    `URL:${url}`,
    social.instagram ? `X-SOCIALPROFILE;TYPE=instagram:${social.instagram}` : null,
    `NOTE:${esc(professional.intro)}`,
    "END:VCARD",
  ];
  return lines.filter((l): l is string => Boolean(l)).join("\r\n");
}
