"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Botón flotante de WhatsApp + botón volver arriba. */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Volver arriba"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
        className={cn(
          "pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-forest/15 bg-cream/95 text-forest shadow-soft backdrop-blur transition-all duration-500 hover:bg-forest hover:text-cream",
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        )}
      >
        <ArrowUp className="h-4 w-4" aria-hidden="true" />
      </button>

      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp (se abre en una pestaña nueva)"
        className="group pointer-events-auto relative flex items-center"
      >
        <span className="mr-3 hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink opacity-0 shadow-soft transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
          ¿Hablamos?
        </span>
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-lift transition-transform duration-300 group-hover:scale-105">
          <span aria-hidden="true" className="absolute inset-0 animate-soft-ping rounded-full bg-whatsapp" />
          <WhatsAppIcon className="relative h-7 w-7" />
        </span>
      </a>
    </div>
  );
}
