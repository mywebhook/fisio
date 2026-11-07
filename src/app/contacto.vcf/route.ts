import { buildVCard } from "@/lib/vcard";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

/** Descarga la tarjeta de contacto (vCard) para guardarla en el teléfono. */
export function GET() {
  const filename = siteConfig.professional.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").toLowerCase();
  return new Response(buildVCard(), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}.vcf"`,
    },
  });
}
