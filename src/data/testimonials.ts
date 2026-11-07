import type { Testimonial } from "@/types/content";

/**
 * Testimonios de pacientes.
 *
 * ⚠️ Solo publicar testimonios REALES y con autorización expresa del paciente.
 * Los elementos con `placeholder: true` son marcadores de diseño: se muestran
 * con la etiqueta "Ejemplo" y deben eliminarse o reemplazarse.
 *
 * Si la lista queda vacía, la sección muestra un mensaje elegante en lugar del carrusel.
 */
export const testimonials: Testimonial[] = [
  {
    id: "ejemplo-1",
    author: "Iniciales del paciente",
    comment: "Aquí irá la opinión real de un paciente, compartida con su autorización. Reemplaza este texto en src/data/testimonials.ts.",
    placeholder: true,
  },
  {
    id: "ejemplo-2",
    author: "Iniciales del paciente",
    comment: "Espacio reservado para un segundo testimonio real. Puedes añadir calificación (1 a 5) y fecha si el paciente lo autoriza.",
    placeholder: true,
  },
  {
    id: "ejemplo-3",
    author: "Iniciales del paciente",
    comment: "Espacio reservado para un tercer testimonio real. Nunca publiques opiniones inventadas o sin consentimiento.",
    placeholder: true,
  },
];
