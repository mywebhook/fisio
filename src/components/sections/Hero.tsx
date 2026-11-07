import Image from "next/image";
import { ArrowDown, CalendarHeart, Home, MapPin, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { Specialty } from "@/types/content";

export function Hero({ specialties }: { specialties: Specialty[] }) {
  const { professional, photos, contact } = siteConfig;
  const featured = specialties.filter((s) => s.featured).slice(0, 3);

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden pb-20 pt-[calc(var(--nav-height)+2rem)] sm:pb-28 lg:pt-[calc(var(--nav-height)+3.5rem)]">
      {/* Fondo decorativo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-sage-light/70 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-blush-light blur-3xl" />
      </div>

      <div className="container relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="eyebrow animate-fade-up">
            {professional.title} · {contact.address.city}
          </p>

          <h1 id="hero-title" className="mt-6 animate-fade-up font-display text-[2.9rem] leading-[1.02] tracking-[-0.01em] text-ink [animation-delay:80ms] sm:text-6xl xl:text-[4.6rem]">
            {professional.name}
          </h1>

          {featured.length > 0 && (
            <ul className="mt-5 flex animate-fade-up flex-wrap gap-2 [animation-delay:140ms]" aria-label="Especialidades principales">
              {featured.map((s) => (
                <li key={s.id} className="rounded-full border border-forest/15 bg-white/60 px-3.5 py-1.5 text-[0.8rem] font-medium text-forest backdrop-blur">
                  {s.shortName ?? s.name}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-8 max-w-xl animate-fade-up font-display text-[1.55rem] italic leading-snug text-forest-deep [animation-delay:200ms] sm:text-[1.85rem]">
            “{professional.tagline}”
          </p>

          <p className="mt-5 max-w-lg animate-fade-up text-base leading-relaxed text-graphite [animation-delay:260ms] sm:text-lg">
            {professional.intro}
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:320ms] sm:flex-row">
            <a href="#reservar" className="btn-primary">
              <CalendarHeart className="h-4 w-4" aria-hidden="true" />
              Reservar una cita
            </a>
            <a href="#especialidades" className="btn-outline">
              Conocer mis servicios
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <ul className="mt-10 grid animate-fade-up grid-cols-1 gap-3 text-sm text-graphite [animation-delay:380ms] sm:grid-cols-2">
            <li className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-forest" aria-hidden="true" /> Atención personalizada
            </li>
            <li className="flex items-center gap-2.5">
              {contact.homeVisits.enabled ? (
                <>
                  <Home className="h-4 w-4 text-forest" aria-hidden="true" /> Consultorio y domicilio
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 text-forest" aria-hidden="true" /> {contact.address.city}
                </>
              )}
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none xl:col-span-5 xl:col-start-8">
          <div className="relative animate-fade-up [animation-delay:150ms]">
            <div aria-hidden="true" className="absolute -inset-3 rounded-t-[999px] rounded-b-[2.5rem] border border-forest/15 sm:-inset-4" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-sand shadow-lift">
              <Image
                src={photos.hero}
                alt={photos.heroAlt}
                fill
                priority
                sizes="(min-width: 1280px) 480px, (min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 left-4 right-4 sm:-left-8 sm:right-auto">
            <div className="animate-float rounded-2xl border border-white/70 bg-white/85 p-4 shadow-lift backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage-light text-forest">
                  <CalendarHeart className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Solicita tu cita en minutos</p>
                  <p className="text-xs text-graphite">Te confirmo personalmente por WhatsApp</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
