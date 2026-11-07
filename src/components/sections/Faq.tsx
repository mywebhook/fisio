"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/types/content";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  if (!items.length) return null;

  return (
    <section id="preguntas" aria-labelledby="faq-title" className="section">
      <div className="container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" align="left" eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" />
          <div className="mt-8 hidden rounded-3xl bg-sage-soft p-6 lg:block">
            <p className="font-display text-xl text-ink">¿No encuentras tu respuesta?</p>
            <p className="mt-2 text-sm text-graphite">Escríbeme y te respondo personalmente.</p>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-5">
              <WhatsAppIcon className="h-5 w-5" />
              Preguntar por WhatsApp
            </a>
          </div>
        </div>

        <ul className="divide-y divide-sand border-y border-sand lg:col-span-8">
          {items.map((item) => {
            const isOpen = open === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;
            return (
              <li key={item.id}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-[1.2rem] text-ink transition-colors hover:text-forest sm:text-[1.35rem]"
                  >
                    {item.question}
                    <span
                      className={cn(
                        "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500",
                        isOpen ? "rotate-45 border-forest bg-forest text-cream" : "border-forest/25 text-forest"
                      )}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn("grid transition-[grid-template-rows] duration-500 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <p className="max-w-2xl pb-7 pr-14 leading-relaxed text-graphite">{item.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp lg:hidden">
          <WhatsAppIcon className="h-5 w-5" />
          ¿Otra duda? Pregúntame por WhatsApp
        </a>
      </div>
    </section>
  );
}
