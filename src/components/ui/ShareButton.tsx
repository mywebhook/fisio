"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Comparte la página con la API nativa del móvil; en escritorio copia el enlace. */
export function ShareButton({ className, inverted }: { className?: string; inverted?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  async function share() {
    const url = window.location.origin;
    const data = {
      title: `${siteConfig.professional.name} · ${siteConfig.professional.title}`,
      text: siteConfig.professional.tagline,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      // El usuario canceló el diálogo de compartir: no es un error.
      if (e instanceof DOMException && e.name === "AbortError") return;
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  }

  return (
    <button type="button" onClick={share} className={cn(inverted ? "btn-outline-light" : "btn-outline", className)}>
      {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Share2 className="h-4 w-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Enlace copiado" : error ? "No se pudo compartir" : "Compartir página"}</span>
    </button>
  );
}
