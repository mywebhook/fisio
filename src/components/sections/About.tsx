import Image from "next/image";
import { BadgeCheck, Briefcase, GraduationCap, HeartHandshake, Leaf } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/ui/Reveal";
import type { Specialty } from "@/types/content";

export function About({ specialties }: { specialties: Specialty[] }) {
  const { professional, photos, about } = siteConfig;

  return (
    <section id="sobre-mi" aria-labelledby="about-title" className="section relative bg-white">
      <div className="container grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Columna imagen */}
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:sticky lg:top-[calc(var(--nav-height)+2rem)]">
            <div aria-hidden="true" className="absolute -left-4 -top-4 h-full w-full rounded-[2.5rem] bg-sand" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-sand-light">
              <Image src={photos.about} alt={photos.aboutAlt} fill sizes="(min-width: 1024px) 420px, 90vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-5 right-5 rounded-2xl bg-forest px-5 py-4 text-cream shadow-lift">
              <p className="font-display text-lg leading-tight">{professional.name}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-sage">{professional.title}</p>
              {professional.license && <p className="mt-1 text-xs text-cream/70">Reg. profesional {professional.license}</p>}
            </div>
          </div>
        </Reveal>

        {/* Columna texto */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">Sobre mí</p>
            <h2 id="about-title" className="mt-4 font-display text-[2rem] leading-[1.15] text-ink sm:text-[2.6rem]">
              {about.heading}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-graphite sm:text-lg">
              {about.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            <Reveal className="card p-6 sm:col-span-2">
              <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-forest">
                <GraduationCap className="h-5 w-5" aria-hidden="true" /> Formación académica
              </h3>
              <ul className="mt-5 space-y-4">
                {about.education.map((e, i) => (
                  <li key={i} className="flex gap-4 border-l-2 border-sage-light pl-4">
                    <div>
                      <p className="font-semibold text-ink">{e.title}</p>
                      <p className="text-sm text-graphite">
                        {e.institution} · {e.year}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="card p-6" delay={60}>
              <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-forest">
                <Briefcase className="h-5 w-5" aria-hidden="true" /> Experiencia
              </h3>
              <ul className="mt-5 space-y-4">
                {about.experience.map((e, i) => (
                  <li key={i}>
                    <p className="font-semibold text-ink">{e.role}</p>
                    <p className="text-sm text-graphite">
                      {e.place} · {e.period}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="card p-6" delay={120}>
              <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-forest">
                <BadgeCheck className="h-5 w-5" aria-hidden="true" /> Especialidades
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {specialties.map((s) => (
                  <li key={s.id} className="rounded-full bg-sage-soft px-3 py-1 text-[0.8rem] font-medium text-forest-deep">
                    {s.shortName ?? s.name}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="rounded-3xl bg-sage-soft p-6" delay={60}>
              <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-forest">
                <Leaf className="h-5 w-5" aria-hidden="true" /> Mi filosofía
              </h3>
              <p className="mt-4 leading-relaxed text-graphite">{about.philosophy}</p>
            </Reveal>

            <Reveal className="rounded-3xl bg-blush-light p-6" delay={120}>
              <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-forest">
                <HeartHandshake className="h-5 w-5" aria-hidden="true" /> Mi compromiso
              </h3>
              <p className="mt-4 leading-relaxed text-graphite">{about.commitment}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
