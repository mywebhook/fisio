import type { Treatment } from "@/types/content";

/**
 * Catálogo de tratamientos.
 * - `enabled: false` oculta un tratamiento.
 * - `duration`: duración orientativa ("45 min"). null = "Duración a consultar".
 * - `price`: opcional; si no se define no se muestra.
 * Importante: describir objetivos, nunca garantizar resultados.
 *
 * ⚠️ Duraciones y precios de DEMOSTRACIÓN (ficticios).
 */
export const treatments: Treatment[] = [
  {
    id: "evaluacion",
    enabled: true,
    name: "Evaluación fisioterapéutica",
    description: "Primera consulta para conocerte, escuchar tu historia y valorar tu movimiento antes de proponer un plan.",
    goal: "Comprender tu situación y definir juntos objetivos realistas.",
    duration: "60 min",
    price: "Bs 150",
    image: "/images/treatments/evaluacion.jpg",
    imageAlt: "Fisioterapeuta evaluando la movilidad del hombro de una paciente",
  },
  {
    id: "terapia-manual",
    enabled: true,
    name: "Terapia manual",
    description: "Movilizaciones y técnicas sobre tejidos blandos aplicadas de forma suave y progresiva.",
    goal: "Favorecer la movilidad y contribuir al alivio de molestias.",
    duration: "45 min",
    price: "Bs 130",
    image: "/images/treatments/terapia-manual.jpg",
    imageAlt: "Sesión de terapia manual en camilla",
  },
  {
    id: "ejercicio-terapeutico",
    enabled: true,
    name: "Ejercicio terapéutico",
    description: "Programa de ejercicios adaptado a ti, con indicaciones claras para realizar también en casa.",
    goal: "Mejorar fuerza, control y resistencia de forma progresiva.",
    duration: "45 min",
    price: "Bs 120",
    image: "/images/treatments/ejercicio.jpg",
    imageAlt: "Fisioterapeuta guiando un ejercicio de elevación de pierna",
  },
  {
    id: "estiramientos",
    enabled: true,
    name: "Estiramientos asistidos",
    description: "Estiramientos guiados y acompañados para trabajar la flexibilidad con seguridad y sin forzar.",
    goal: "Ganar amplitud de movimiento de forma progresiva.",
    duration: "40 min",
    price: "Bs 110",
    image: "/images/treatments/estiramientos.jpg",
    imageAlt: "Fisioterapeuta asistiendo un estiramiento de pierna",
  },
  {
    id: "movilizacion",
    enabled: true,
    name: "Movilización articular",
    description: "Movimientos pasivos y controlados de las articulaciones, adaptados a tu tolerancia.",
    goal: "Contribuir a recuperar la movilidad de la articulación.",
    duration: "40 min",
    price: "Bs 120",
    image: "/images/treatments/movilizacion.jpg",
    imageAlt: "Movilización del tobillo de un paciente en camilla",
  },
  {
    id: "domicilio",
    enabled: true,
    name: "Rehabilitación a domicilio",
    description: "Sesiones en la comodidad de tu hogar para quienes tienen dificultades para desplazarse.",
    goal: "Facilitar la continuidad del tratamiento en tu entorno.",
    duration: "60 min",
    price: "Bs 200",
    image: "/images/treatments/domicilio.jpg",
    imageAlt: "Fisioterapeuta conversando con pacientes en un ambiente de hogar",
  },
];
