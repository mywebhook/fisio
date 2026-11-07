import type { Treatment } from "@/types/content";

/**
 * Catálogo de tratamientos.
 * - `enabled: false` oculta un tratamiento.
 * - `duration`: duración orientativa ("45 min"). null = "Duración a consultar".
 * - `price`: opcional; si no se define no se muestra.
 * Importante: describir objetivos, nunca garantizar resultados.
 */
export const treatments: Treatment[] = [
  {
    id: "evaluacion",
    enabled: true,
    name: "Evaluación fisioterapéutica",
    description: "Primera consulta para conocerte, escuchar tu historia y valorar tu movimiento antes de proponer un plan.",
    goal: "Comprender tu situación y definir juntos objetivos realistas.",
    duration: null,
    image: "/images/treatments/evaluacion.svg",
    imageAlt: "Fisioterapeuta realizando una evaluación del movimiento",
  },
  {
    id: "terapia-manual",
    enabled: true,
    name: "Terapia manual",
    description: "Movilizaciones y técnicas sobre tejidos blandos aplicadas de forma suave y progresiva.",
    goal: "Favorecer la movilidad y contribuir al alivio de molestias.",
    duration: null,
    image: "/images/treatments/terapia-manual.svg",
    imageAlt: "Sesión de terapia manual en camilla",
  },
  {
    id: "ejercicio-terapeutico",
    enabled: true,
    name: "Ejercicio terapéutico",
    description: "Programa de ejercicios adaptado a ti, con indicaciones claras para realizar también en casa.",
    goal: "Mejorar fuerza, control y resistencia de forma progresiva.",
    duration: null,
    image: "/images/treatments/ejercicio.svg",
    imageAlt: "Paciente realizando ejercicio terapéutico guiado",
  },
  {
    id: "electroterapia",
    enabled: true,
    name: "Electroterapia y agentes físicos",
    description: "Uso de equipos como complemento del tratamiento, siempre que esté indicado tras la evaluación.",
    goal: "Complementar el abordaje manual y el ejercicio.",
    duration: null,
    image: "/images/treatments/electroterapia.svg",
    imageAlt: "Equipo de electroterapia en el consultorio",
  },
  {
    id: "vendaje",
    enabled: true,
    name: "Vendaje neuromuscular",
    description: "Aplicación de cintas elásticas como apoyo durante el proceso de recuperación o la actividad.",
    goal: "Acompañar el movimiento como recurso complementario.",
    duration: null,
    image: "/images/treatments/vendaje.svg",
    imageAlt: "Aplicación de vendaje neuromuscular en la rodilla",
  },
  {
    id: "domicilio",
    enabled: true,
    name: "Rehabilitación a domicilio",
    description: "Sesiones en la comodidad de tu hogar para quienes tienen dificultades para desplazarse.",
    goal: "Facilitar la continuidad del tratamiento en tu entorno.",
    duration: null,
    image: "/images/treatments/domicilio.svg",
    imageAlt: "Sesión de fisioterapia en el hogar del paciente",
  },
];
