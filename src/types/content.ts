/**
 * Modelos de contenido del sitio.
 *
 * Están pensados para poder migrarse 1:1 a una base de datos o a un CMS
 * (panel administrativo futuro). Los iconos se guardan como texto (`IconName`)
 * para que puedan almacenarse en una base de datos sin problema.
 */

import type { IconName } from "@/components/ui/Icon";

export interface Specialty {
  id: string;
  /** Activa o desactiva la especialidad según lo que realmente ofrezca la profesional. */
  enabled: boolean;
  /** Si es true, se muestra destacada en la portada (hero). */
  featured?: boolean;
  name: string;
  shortName?: string;
  description: string;
  icon: IconName;
  /** Imagen opcional (ruta en /public o URL permitida en next.config). */
  image?: string;
}

export interface Treatment {
  id: string;
  enabled: boolean;
  name: string;
  description: string;
  /** Objetivo terapéutico general. Nunca prometer resultados. */
  goal: string;
  /** Duración orientativa, por ejemplo "45 min". Si es null se muestra "Duración a consultar". */
  duration: string | null;
  /** Precio opcional. Si no se define, no se muestra. */
  price?: string;
  image: string;
  imageAlt: string;
}

export interface Testimonial {
  id: string;
  /** Nombre o iniciales, siempre con autorización del paciente. */
  author: string;
  comment: string;
  /** Calificación opcional de 1 a 5. */
  rating?: number;
  /** Fecha opcional en formato ISO (AAAA-MM-DD). */
  date?: string;
  /** Marca el testimonio como ejemplo provisional (se muestra una etiqueta). Eliminar al cargar testimonios reales. */
  placeholder?: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface Reason {
  id: string;
  enabled: boolean;
  title: string;
  description: string;
  icon: IconName;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface Article {
  slug: string;
  title: string;
  category: string;
  /** Fecha ISO (AAAA-MM-DD). */
  date: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  readingMinutes: number;
  body: ArticleBlock[];
  sources?: { label: string; url?: string }[];
}
