"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircleHeart, Quote, Star } from "lucide-react";
import type { Testimonial } from "@/types/content";
import { cn, formatDate } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const slide = el.firstElementChild as HTMLElement | null;
      if (!slide) return;
      const width = slide.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
      setActive(Math.round(el.scrollLeft / width));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (i: number) => {
    const el = track.current;
    const slide = el?.children[i] as HTMLElement | undefined;
    if (!el || !slide) return;
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <section id="testimonios" aria-labelledby="testimonials-title" className="section bg-white">
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="testimonials-title"
            align="left"
            eyebrow="Testimonios"
            title="Lo que comparten mis pacientes"
            description="Opiniones reales, publicadas con autorización de cada paciente."
          />
          {testimonials.length > 1 && (
            <div className="flex gap-2">
              <button type="button" onClick={() => scrollTo(Math.max(0, active - 1))} disabled={active === 0} aria-label="Testimonio anterior" className="grid h-12 w-12 place-items-center rounded-full border border-forest/25 text-forest transition-colors hover:bg-forest hover:text-cream disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-forest">
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => scrollTo(Math.min(testimonials.length - 1, active + 1))} disabled={active >= testimonials.length - 1} aria-label="Testimonio siguiente" className="grid h-12 w-12 place-items-center rounded-full border border-forest/25 text-forest transition-colors hover:bg-forest hover:text-cream disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-forest">
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {testimonials.length === 0 ? (
          <div className="mx-auto mt-14 max-w-xl rounded-3xl border border-dashed border-sage p-10 text-center">
            <MessageCircleHeart className="mx-auto h-10 w-10 text-forest" aria-hidden="true" />
            <p className="mt-4 font-display text-xl text-ink">Pronto compartiré aquí la experiencia de mis pacientes.</p>
          </div>
        ) : (
          <>
            <ul
              ref={track}
              aria-roledescription="carrusel"
              aria-label="Testimonios de pacientes"
              className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
            >
              {testimonials.map((t, i) => (
                <li
                  key={t.id}
                  aria-roledescription="diapositiva"
                  aria-label={`${i + 1} de ${testimonials.length}`}
                  className="w-[88%] shrink-0 snap-start sm:w-[70%] lg:w-[calc((100%-2.5rem)/3)]"
                >
                  <figure className="relative flex h-full flex-col rounded-3xl bg-sand-light p-7 sm:p-8">
                    <Quote className="h-8 w-8 text-blush" aria-hidden="true" />
                    {t.placeholder && (
                      <span className="absolute right-6 top-6 rounded-full bg-blush-light px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#8E5C55]">
                        Ejemplo
                      </span>
                    )}
                    {t.rating ? (
                      <div className="mt-5 flex gap-1" role="img" aria-label={`Calificación: ${t.rating} de 5`}>
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} className={cn("h-4 w-4", s < t.rating! ? "fill-forest text-forest" : "text-sage")} aria-hidden="true" />
                        ))}
                      </div>
                    ) : null}
                    <blockquote className="mt-5 flex-1 font-display text-[1.2rem] leading-relaxed text-ink">“{t.comment}”</blockquote>
                    <figcaption className="mt-7 flex items-center gap-3 border-t border-sand pt-5">
                      <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full bg-forest font-display text-cream">
                        {t.author.charAt(0)}
                      </span>
                      <span>
                        <span className="block font-semibold text-ink">{t.author}</span>
                        {t.date && <span className="block text-xs text-graphite">{formatDate(t.date)}</span>}
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            {testimonials.length > 1 && (
              <div className="mt-8 flex justify-center gap-2 lg:hidden">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => scrollTo(i)}
                    aria-label={`Ir al testimonio ${i + 1}`}
                    aria-current={active === i}
                    className="grid h-6 w-6 place-items-center"
                  >
                    <span className={cn("block h-1.5 rounded-full transition-all duration-500", active === i ? "w-6 bg-forest" : "w-1.5 bg-sage")} />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
