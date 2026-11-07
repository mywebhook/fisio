import { siteConfig } from "@/config/site";
import { hasRealPhone, realValue } from "@/lib/utils";

/** Una URL de red social es real si apunta a un perfil y no solo a la portada de la red. */
export function isRealProfileUrl(u: string): boolean {
  return Boolean(u) && !/^https?:\/\/(www\.)?[^/]+\/?$/.test(u);
}

/**
 * Datos estructurados (schema.org) para SEO local.
 * Solo se incluyen campos con información real (los marcadores [..] se omiten).
 */
export function buildStructuredData(specialtyNames: string[]) {
  const { professional, contact, social, url, seo } = siteConfig;
  const a = contact.address;
  const sameAs = Object.values(social).filter(isRealProfileUrl);

  const address = realValue(a.street)
    ? {
        "@type": "PostalAddress",
        streetAddress: a.street,
        addressLocality: realValue(a.city),
        addressRegion: realValue(a.region),
        postalCode: a.postalCode || undefined,
        addressCountry: realValue(a.country),
      }
    : undefined;

  const data = {
    "@context": "https://schema.org",
    "@type": "Physiotherapy",
    "@id": `${url}/#consultorio`,
    name: `${professional.name} · ${professional.title}`,
    description: realValue(seo.description) ?? professional.intro,
    url,
    image: `${url}/opengraph-image`,
    telephone: hasRealPhone(contact.phone) ? contact.phone : undefined,
    email: realValue(contact.email),
    address,
    areaServed: realValue(a.city),
    availableService: specialtyNames.map((name) => ({ "@type": "MedicalTherapy", name })),
    sameAs: sameAs.length ? sameAs : undefined,
    founder: { "@type": "Person", name: professional.name, jobTitle: professional.title },
  };

  // Elimina claves undefined
  return JSON.parse(JSON.stringify(data)) as Record<string, unknown>;
}
