import type { Reason } from "@/types/content";

/** Sección "¿Por qué elegirme?". Activa solo los puntos que se cumplan realmente. */
export const reasons: Reason[] = [
  {
    id: "personalizada",
    enabled: true,
    title: "Atención personalizada",
    description: "Cada sesión se adapta a tu situación, tus objetivos y tu ritmo.",
    icon: "user-round",
  },
  {
    id: "evaluacion",
    enabled: true,
    title: "Evaluación individual",
    description: "Antes de cualquier tratamiento, dedicamos tiempo a entender qué te ocurre.",
    icon: "clipboard-check",
  },
  {
    id: "seguimiento",
    enabled: true,
    title: "Seguimiento del proceso",
    description: "Revisamos juntos tu evolución y ajustamos el plan cuando es necesario.",
    icon: "line-chart",
  },
  {
    id: "cercania",
    enabled: true,
    title: "Trato cercano",
    description: "Un espacio de confianza donde puedes preguntar todo lo que necesites.",
    icon: "heart-handshake",
  },
  {
    id: "profesional",
    enabled: true,
    title: "Enfoque profesional",
    description: "Trabajo responsable, explicando cada paso y respetando tus decisiones.",
    icon: "shield-check",
  },
  {
    id: "instalaciones",
    enabled: true,
    title: "Instalaciones adecuadas",
    description: "Un entorno cómodo, limpio y preparado para tu sesión.",
    icon: "sparkles",
  },
];
