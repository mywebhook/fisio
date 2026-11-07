"use client";

import { ArrowUpRight } from "lucide-react";
import { requestService } from "@/lib/events";
import { cn } from "@/lib/utils";

/** Lleva al formulario de citas con el servicio ya seleccionado. */
export function ConsultButton({ service, className, label = "Consultar" }: { service: string; className?: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => requestService(service)}
      className={cn(
        "group/btn inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-forest transition-colors hover:text-forest-deep",
        className
      )}
      aria-label={`${label}: ${service}`}
    >
      {label}
      <span className="grid h-8 w-8 place-items-center rounded-full border border-forest/25 transition-all duration-300 group-hover/btn:border-forest group-hover/btn:bg-forest group-hover/btn:text-cream">
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-45" aria-hidden="true" />
      </span>
    </button>
  );
}
