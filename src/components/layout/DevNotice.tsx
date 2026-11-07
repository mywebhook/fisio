"use client";

import { useState } from "react";
import { X } from "lucide-react";

/** Aviso visible solo en desarrollo con la cantidad de datos provisionales pendientes. */
export function DevNotice({ count }: { count: number }) {
  const [hidden, setHidden] = useState(false);
  if (hidden || count === 0) return null;
  return (
    <div role="status" className="fixed bottom-4 left-4 z-[60] flex max-w-[calc(100vw-7rem)] items-start gap-3 rounded-2xl bg-ink px-4 py-3 text-xs text-cream shadow-lift sm:max-w-sm">
      <p>
        <strong className="font-semibold text-blush">Modo desarrollo:</strong> hay {count} datos provisionales [entre corchetes]
        por completar en <code className="text-sage">src/config/site.ts</code>.
      </p>
      <button type="button" onClick={() => setHidden(true)} aria-label="Ocultar aviso" className="shrink-0 rounded p-0.5 hover:text-blush">
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
