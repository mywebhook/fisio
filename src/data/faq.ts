import type { FaqItem } from "@/types/content";

/**
 * Preguntas frecuentes. Las respuestas con [corchetes] deben completarse
 * con las políticas reales de atención. No inventar condiciones.
 */
export const faq: FaqItem[] = [
  {
    id: "reservar",
    question: "¿Cómo puedo reservar una cita?",
    answer:
      "Completa el formulario de solicitud de cita de esta página o escríbeme por WhatsApp. Tu solicitud se enviará con los datos que indiques y te responderé para confirmar el día y la hora. La cita queda reservada únicamente cuando recibes mi confirmación.",
  },
  {
    id: "duracion",
    question: "¿Cuánto dura una sesión?",
    answer: "[Indica la duración habitual de una sesión y de la primera evaluación.]",
  },
  {
    id: "primera-consulta",
    question: "¿Qué debo llevar a mi primera consulta?",
    answer:
      "[Indica qué conviene llevar: por ejemplo, ropa cómoda, estudios o informes médicos previos si los tienes, y la indicación médica si corresponde.]",
  },
  {
    id: "domicilio",
    question: "¿Atiendes a domicilio?",
    answer: "[Indica si ofreces atención a domicilio, en qué zonas y cómo se coordina.]",
  },
  {
    id: "tratamientos",
    question: "¿Qué tratamientos realizas?",
    answer:
      "Puedes ver las especialidades y tratamientos en las secciones correspondientes de esta página. El abordaje adecuado para ti se define siempre después de una evaluación individual.",
  },
  {
    id: "llegar",
    question: "¿Cómo puedo llegar al consultorio?",
    answer:
      "En la sección de contacto encontrarás la dirección, el mapa y un botón para abrir la ruta en Google Maps desde tu teléfono.",
  },
];
