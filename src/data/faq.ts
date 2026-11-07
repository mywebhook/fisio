import type { FaqItem } from "@/types/content";

/**
 * Preguntas frecuentes.
 * ⚠️ Las respuestas sobre duración, horarios y cobertura son de DEMOSTRACIÓN:
 * ajústalas a las políticas reales de atención.
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
    answer:
      "La primera evaluación dura alrededor de 60 minutos. Las sesiones de seguimiento suelen durar entre 40 y 45 minutos, según el tratamiento.",
  },
  {
    id: "primera-consulta",
    question: "¿Qué debo llevar a mi primera consulta?",
    answer:
      "Ropa cómoda que permita moverte con libertad y, si los tienes, estudios o informes médicos previos (radiografías, resonancias, indicaciones de tu médico).",
  },
  {
    id: "domicilio",
    question: "¿Atiendes a domicilio?",
    answer:
      "Sí. Atiendo a domicilio en Zona Norte, Queru Queru, Cala Cala y Sarco. Elige la modalidad «Atención a domicilio» en el formulario y coordinamos el horario.",
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
      "El consultorio está en la Av. Los Álamos 1245 (Zona Norte). En la sección de contacto encontrarás el mapa y un botón para abrir la ruta en Google Maps desde tu teléfono.",
  },
];
