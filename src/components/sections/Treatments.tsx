import Image from "next/image";
import { Clock, Target } from "lucide-react";
import type { Treatment } from "@/types/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConsultButton } from "@/components/ui/ConsultButton";

export function Treatments({ treatments }: { treatments: Treatment[] }) {
  if (!treatments.length) return null;

  return (
    <section id="tratamientos" aria-labelledby="treatments-title" className="section bg-sand-light">
      <div className="container">
        <SectionHeading
          id="treatments-title"
          eyebrow="Tratamientos"
          title="Tratamientos y servicios"
          description="El tratamiento adecuado se define siempre tras una evaluación individual. Estas son algunas de las herramientas con las que trabajo."
        />
      </div>

      {/* En móvil: carrusel horizontal deslizable. En escritorio: cuadrícula. */}
      <ul
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-6 md:container md:grid md:grid-cols-2 md:gap-6 md:px-6 lg:px-8 md:overflow-visible md:pb-0 lg:mt-16 lg:grid-cols-3"
        aria-label="Catálogo de tratamientos"
      >
        {treatments.map((t, i) => (
          <Reveal as="li" key={t.id} delay={(i % 3) * 70} className="w-[82%] shrink-0 snap-center sm:w-[60%] md:w-auto">
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift">
              <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                <Image
                  src={t.image}
                  alt={t.imageAlt}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 82vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-forest backdrop-blur">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.duration ?? "Duración a consultar"}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-display text-[1.4rem] leading-snug text-ink">{t.name}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-graphite">{t.description}</p>
                <p className="mt-4 flex gap-2.5 rounded-2xl bg-sage-soft p-3.5 text-sm leading-relaxed text-forest-deep">
                  <Target className="mt-0.5 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
                  <span>
                    <span className="font-semibold">Objetivo: </span>
                    {t.goal}
                  </span>
                </p>
                <div className="mt-auto flex items-center justify-between pt-5">
                  {t.price ? <p className="text-sm font-semibold text-ink">{t.price}</p> : <span />}
                  <ConsultButton service={t.name} />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
      <p className="container mt-6 text-center text-xs text-graphite/80">
        Los objetivos son orientativos. Cada proceso es único y no se garantizan resultados específicos.
      </p>
    </section>
  );
}
