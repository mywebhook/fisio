import type { Specialty } from "@/types/content";

/**
 * Especialidades. Cambia `enabled` a false para ocultar las que no se ofrezcan.
 * `featured: true` las muestra en la portada (recomendado: máximo 3).
 */
export const specialties: Specialty[] = [
  {
    id: "traumatologica",
    enabled: true,
    featured: true,
    name: "Fisioterapia traumatológica",
    shortName: "Traumatológica",
    description: "Abordaje de lesiones de músculos, articulaciones, huesos y ligamentos, como esguinces, contracturas o tendinopatías.",
    icon: "bone",
  },
  {
    id: "deportiva",
    enabled: true,
    featured: true,
    name: "Fisioterapia deportiva",
    shortName: "Deportiva",
    description: "Acompañamiento a personas activas y deportistas en la prevención de lesiones y el retorno progresivo a la actividad.",
    icon: "dumbbell",
  },
  {
    id: "postoperatoria",
    enabled: true,
    name: "Rehabilitación postoperatoria",
    shortName: "Postoperatoria",
    description: "Recuperación funcional después de una cirugía, coordinada con las indicaciones de tu equipo médico.",
    icon: "heart-pulse",
  },
  {
    id: "terapia-manual",
    enabled: true,
    featured: true,
    name: "Terapia manual",
    shortName: "Terapia manual",
    description: "Técnicas aplicadas con las manos para trabajar la movilidad de tejidos y articulaciones y aliviar molestias.",
    icon: "hand",
  },
  {
    id: "neurologica",
    enabled: true,
    name: "Fisioterapia neurológica",
    shortName: "Neurológica",
    description: "Trabajo orientado a la funcionalidad, el equilibrio y la autonomía en personas con afecciones neurológicas.",
    icon: "brain",
  },
  {
    id: "postural",
    enabled: true,
    name: "Reeducación postural",
    shortName: "Postural",
    description: "Ejercicios y pautas para tomar conciencia de tu postura y adaptarla a tu día a día.",
    icon: "person-standing",
  },
  {
    id: "pediatrica",
    enabled: true,
    name: "Fisioterapia pediátrica",
    shortName: "Pediátrica",
    description: "Atención adaptada a bebés, niñas y niños, acompañando su desarrollo motor junto a la familia.",
    icon: "baby",
  },
  {
    id: "adultos-mayores",
    enabled: true,
    name: "Fisioterapia para adultos mayores",
    shortName: "Adultos mayores",
    description: "Ejercicio y trabajo funcional para mantener la movilidad, el equilibrio y la independencia.",
    icon: "accessibility",
  },
  {
    id: "piso-pelvico",
    enabled: true,
    name: "Piso pélvico",
    shortName: "Piso pélvico",
    description: "Valoración y tratamiento de la musculatura del suelo pélvico en distintas etapas de la vida.",
    icon: "flower",
  },
];
