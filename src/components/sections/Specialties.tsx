import Image from "next/image";
import type { Specialty } from "@/types/content";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConsultButton } from "@/components/ui/ConsultButton";

export function Specialties({ specialties }: { specialties: Specialty[] }) {
  if (!specialties.length) return null;

  return (
    <section id="especialidades" aria-labelledby="specialties-title" className="section relative">
      <div className="container">
        <SectionHeading
          id="specialties-title"
          eyebrow="Especialidades"
          title={
            <>
              Un abordaje adaptado a <em className="text-forest">cada etapa</em> de tu vida
            </>
          }
          description="Cada persona llega con una historia distinta. Estas son las áreas en las que puedo acompañarte."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {specialties.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 3) * 70} className="group">
              <article className="card relative flex h-full flex-col overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1 hover:border-sage hover:shadow-lift sm:p-7">
                {s.image && (
                  <div className="relative -mx-6 -mt-6 mb-6 aspect-[16/9] overflow-hidden sm:-mx-7 sm:-mt-7">
                    <Image src={s.image} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
                  </div>
                )}
                <div className="flex items-start gap-4 sm:block">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-sage-soft text-forest transition-colors duration-500 group-hover:bg-forest group-hover:text-cream">
                    <Icon name={s.icon} className="h-7 w-7" />
                  </span>
                  <div className="sm:mt-6">
                    <h3 className="font-display text-[1.35rem] leading-snug text-ink">{s.name}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-graphite">{s.description}</p>
                  </div>
                </div>
                <div className="mt-auto pt-5">
                  <ConsultButton service={s.name} />
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
