"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { GalleryImage } from "@/types/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Composición editorial: la primera y la cuarta imagen ocupan más espacio en escritorio.
const layout = [
  "col-span-2 md:row-span-2",
  "md:row-span-2",
  "",
  "",
  "md:col-span-2",
  "col-span-2",
];

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const open = (i: number, el: HTMLElement) => {
    lastTrigger.current = el;
    setIndex(i);
  };
  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab") {
        // Mantener el foco dentro del visor
        const focusables = document.querySelectorAll<HTMLElement>("#lightbox button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, go]);

  if (!images.length) return null;
  const current = index !== null ? images[index] : null;

  return (
    <section id="instalaciones" aria-labelledby="gallery-title" className="section">
      <div className="container">
        <SectionHeading
          id="gallery-title"
          eyebrow="Instalaciones"
          title="Un espacio pensado para tu bienestar"
          description="Un ambiente tranquilo, cuidado y preparado para que te sientas cómodo en cada sesión."
        />

        <ul className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[260px] md:grid-cols-4 md:gap-4 lg:mt-16">
          {images.map((img, i) => (
            <Reveal as="li" key={img.id} delay={(i % 3) * 60} className={layout[i % layout.length]}>
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                className="group relative block h-full w-full overflow-hidden rounded-3xl bg-sand"
                aria-label={`Ampliar imagen: ${img.caption}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-4 bottom-4 flex items-center justify-between text-left text-sm font-medium text-cream">
                  {img.caption}
                  <Expand className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {current && index !== null && (
        <div
          id="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería: ${current.caption}`}
          className="fixed inset-0 z-[70] flex animate-fade-up flex-col bg-ink/95 backdrop-blur-sm [animation-duration:0.35s]"
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between p-4 text-cream sm:p-6">
            <p className="text-sm tabular-nums text-cream/70" aria-live="polite">
              {index + 1} / {images.length}
            </p>
            <button ref={closeRef} type="button" onClick={close} aria-label="Cerrar galería" className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 hover:bg-cream/20">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
            <Image key={current.id} src={current.src} alt={current.alt} fill sizes="100vw" className="animate-fade-up object-contain p-4 [animation-duration:0.4s] sm:p-10" />
          </div>
          <div className="flex items-center justify-between gap-4 p-4 sm:p-6">
            <button type="button" onClick={() => go(-1)} aria-label="Imagen anterior" className="grid h-12 w-12 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="text-center font-display text-lg text-cream">{current.caption}</p>
            <button type="button" onClick={() => go(1)} aria-label="Imagen siguiente" className="grid h-12 w-12 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
