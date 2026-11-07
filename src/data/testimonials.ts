import type { Testimonial } from "@/types/content";

/**
 * Testimonios de pacientes.
 *
 * ⚠️ TESTIMONIOS FICTICIOS DE DEMOSTRACIÓN. No publicar el sitio con ellos:
 * reemplázalos por opiniones REALES y con autorización expresa de cada paciente.
 *
 * Si la lista queda vacía, la sección muestra un mensaje elegante en lugar del carrusel.
 */
export const testimonials: Testimonial[] = [
  {
    id: "demo-1",
    author: "Carla M.",
    comment:
      "Llegué con mucho dolor de espalda y miedo a moverme. Valeria me explicó todo con paciencia y me dio ejercicios fáciles de seguir en casa. Me sentí acompañada en todo momento.",
    rating: 5,
    date: "2026-09-18",
  },
  {
    id: "demo-2",
    author: "Jorge R.",
    comment:
      "Después de mi operación de rodilla necesitaba volver a caminar con confianza. Las sesiones a domicilio fueron una gran ayuda y siempre fue muy puntual y profesional.",
    rating: 5,
    date: "2026-08-02",
  },
  {
    id: "demo-3",
    author: "Andrea P.",
    comment:
      "Corro desde hace años y una lesión me tenía parada. Me encantó que me explicara el porqué de cada ejercicio y que el retorno a correr fuera progresivo.",
    rating: 5,
    date: "2026-07-11",
  },
  {
    id: "demo-4",
    author: "Familia G. S.",
    comment:
      "Atendió a mi mamá en casa con muchísimo cariño y respeto. Nos enseñó cómo ayudarla en el día a día. Se nota la vocación.",
    rating: 5,
    date: "2026-05-27",
  },
  {
    id: "demo-5",
    author: "Luis A.",
    comment:
      "Trabajo muchas horas sentado y tenía molestias en el cuello. Además del tratamiento, me dio consejos prácticos para mi escritorio que me sirvieron mucho.",
    rating: 4,
    date: "2026-04-09",
  },
];
