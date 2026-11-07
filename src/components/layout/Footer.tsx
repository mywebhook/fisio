import { Mail, MapPin, Phone } from "lucide-react";
import { navigation, siteConfig } from "@/config/site";
import { whatsappUrl, mapsSearchUrl } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  const { professional, contact } = siteConfig;
  const year = new Date().getFullYear();
  const featured = "Fisioterapia · Rehabilitación · Bienestar";

  return (
    <footer className="relative overflow-hidden bg-forest-deep text-cream">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-forest opacity-60 blur-3xl" />
      <div className="container relative pb-28 pt-20 sm:pb-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo inverted />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-cream/70">{professional.intro}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-sage">{featured}</p>
            <SocialLinks inverted className="mt-8" />
          </div>

          <nav aria-label="Enlaces del pie de página" className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">Navegación</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-underline text-cream/80 hover:text-cream">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/blog" className="link-underline text-cream/80 hover:text-cream">
                  Blog
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">Contacto</h2>
            <ul className="mt-5 space-y-4 text-[0.95rem] text-cream/80">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-cream">
                  <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                  WhatsApp
                </a>
              </li>
              {contact.phoneDisplay && (
                <li>
                  <a href={`tel:${contact.phone}`} className="flex items-start gap-3 hover:text-cream">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                    {contact.phoneDisplay}
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="flex items-start gap-3 break-all hover:text-cream">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                    {contact.email}
                  </a>
                </li>
              )}
              <li>
                <a href={mapsSearchUrl()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-cream">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                  <span>
                    {contact.address.street}, {contact.address.city}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">Horarios</h2>
            <dl className="mt-5 space-y-3 text-[0.95rem]">
              {contact.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 border-b border-cream/10 pb-3">
                  <dt className="text-cream/70">{h.days}</dt>
                  <dd className="text-right text-cream">{h.time}</dd>
                </div>
              ))}
            </dl>
            {contact.homeVisits.enabled && (
              <p className="mt-4 text-sm text-sage">También atención a domicilio.</p>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/10 pt-8 text-sm text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {professional.name} · {professional.title}. Todos los derechos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a href="/privacidad" className="link-underline hover:text-cream">
                Aviso de privacidad
              </a>
            </li>
            <li>
              <a href="/contacto.vcf" download className="link-underline hover:text-cream">
                Guardar contacto
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
