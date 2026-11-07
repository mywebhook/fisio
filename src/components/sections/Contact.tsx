import { Clock, Contact as ContactIcon, Home, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { mapsDirectionsUrl, mapsEmbedUrl, mapsSearchUrl, whatsappUrl } from "@/lib/whatsapp";
import { isPlaceholder } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShareButton } from "@/components/ui/ShareButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const { contact } = siteConfig;
  const a = contact.address;
  const fullAddress = [a.street, a.district, a.city, a.region].filter(Boolean).join(", ");
  const mapReady = !isPlaceholder(contact.mapsQuery);

  const channels = [
    { href: whatsappUrl(), label: "WhatsApp", value: "Escríbeme directamente", Icon: WhatsAppIcon, external: true },
    { href: `tel:${contact.phone}`, label: "Teléfono", value: contact.phoneDisplay, Icon: Phone, external: false },
    { href: `mailto:${contact.email}`, label: "Correo electrónico", value: contact.email, Icon: Mail, external: false },
  ];

  return (
    <section id="contacto" aria-labelledby="contact-title" className="section bg-white">
      <div className="container">
        <SectionHeading
          id="contact-title"
          eyebrow="Ubicación y contacto"
          title="Estoy aquí para ayudarte"
          description="Escríbeme, llámame o visítame en el consultorio. Elige la forma que te resulte más cómoda."
        />

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-12">
          {/* Información */}
          <Reveal className="space-y-6 lg:col-span-5">
            <ul className="grid gap-3">
              {channels.map(({ href, label, value, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex min-h-[72px] items-center gap-4 rounded-2xl border border-sand p-4 transition-all duration-300 hover:border-forest hover:bg-sage-soft"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sage-soft text-forest transition-colors group-hover:bg-forest group-hover:text-cream">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-graphite">{label}</span>
                      <span className="block truncate font-semibold text-ink">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="rounded-3xl bg-sand-light p-6">
              <h3 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-forest">
                <MapPin className="h-4 w-4" aria-hidden="true" /> Consultorio
              </h3>
              <address className="mt-3 not-italic leading-relaxed text-ink">{fullAddress}</address>
              <p className="mt-2 text-sm leading-relaxed text-graphite">{contact.directions}</p>

              <h3 className="mt-6 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-forest">
                <Clock className="h-4 w-4" aria-hidden="true" /> Horarios de atención
              </h3>
              <dl className="mt-3 space-y-2 text-[0.95rem]">
                {contact.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <dt className="text-graphite">{h.days}</dt>
                    <dd className="text-right font-medium text-ink">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {contact.homeVisits.enabled && (
              <div className="flex gap-4 rounded-3xl border border-forest/20 bg-forest p-6 text-cream">
                <Home className="h-6 w-6 shrink-0 text-sage" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-xl">Atención a domicilio</h3>
                  <p className="mt-1 text-sm leading-relaxed text-cream/80">
                    También puedo atenderte en tu hogar. Zonas: {contact.homeVisits.areas}.
                  </p>
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-ink">Sígueme en redes</p>
              <SocialLinks className="mt-3" />
            </div>
          </Reveal>

          {/* Mapa y acciones */}
          <Reveal className="flex flex-col gap-6 lg:col-span-7" delay={80}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-sage-soft sm:aspect-[16/10]">
              {mapReady ? (
                <iframe
                  title={`Mapa: ${fullAddress}`}
                  src={mapsEmbedUrl()}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0 grayscale-[35%]"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center p-8 text-center">
                  <div>
                    <MapPin className="mx-auto h-10 w-10 text-forest" aria-hidden="true" />
                    <p className="mt-3 font-display text-xl text-ink">Mapa del consultorio</p>
                    <p className="mt-1 text-sm text-graphite">Se mostrará al configurar la dirección en src/config/site.ts</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a href={mapsDirectionsUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Navigation className="h-4 w-4" aria-hidden="true" /> Cómo llegar
              </a>
              <a href={mapsSearchUrl()} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <MapPin className="h-4 w-4" aria-hidden="true" /> Abrir en Google Maps
              </a>
              <a href="/contacto.vcf" download className="btn-outline">
                <ContactIcon className="h-4 w-4" aria-hidden="true" /> Guardar contacto
              </a>
              <ShareButton />
            </div>

            <div className="rounded-3xl border border-sand p-6 sm:p-8">
              <h3 className="font-display text-2xl text-ink">Envíame un mensaje</h3>
              <p className="mb-5 mt-1 text-sm text-graphite">Para consultas generales. Para pedir cita, usa el formulario de reserva.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
