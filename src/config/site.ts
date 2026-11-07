/**
 * ============================================================
 *  CONFIGURACIÓN PRINCIPAL — DATOS DE LA PROFESIONAL
 * ============================================================
 *
 * Edita este archivo con la información REAL de la fisioterapeuta.
 *
 * Convención: todo texto entre corchetes [así] es un marcador provisional.
 *  - En modo desarrollo aparece un aviso con la cantidad de marcadores pendientes.
 *  - Los marcadores no se incluyen en los datos estructurados de SEO.
 *
 * Campos vacíos ("") ocultan automáticamente el elemento correspondiente
 * (por ejemplo, una red social o el número de colegiatura).
 */

export const siteConfig = {
  /** URL pública del sitio. Configúrala con la variable NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "es",

  professional: {
    name: "Nombre Apellido",
    /** Nombre corto para mensajes cercanos ("Hola, Nombre"). */
    firstName: "Nombre",
    title: "Fisioterapeuta",
    /** Número de colegiatura / registro profesional. Vacío = no se muestra. */
    license: "",
    tagline: "Recupera tu movimiento, mejora tu bienestar y vuelve a disfrutar cada momento.",
    intro:
      "Atención fisioterapéutica personalizada, enfocada en acompañarte durante tu proceso de recuperación y mejorar tu calidad de vida.",
  },

  photos: {
    /** Reemplaza estas imágenes por fotografías profesionales (JPG/WebP, mínimo 1200 px de alto). */
    hero: "/images/hero-portrait.svg",
    heroAlt: "Retrato profesional de la fisioterapeuta",
    about: "/images/about-portrait.svg",
    aboutAlt: "La fisioterapeuta en su consultorio",
  },

  about: {
    heading: "Acompañarte en cada paso de tu recuperación",
    /** Biografía en primera persona. Usa un tono humano y cercano. */
    bio: [
      "[Escribe aquí una presentación breve en primera persona: quién eres, por qué elegiste la fisioterapia y qué te motiva a acompañar a tus pacientes.]",
      "[Un segundo párrafo opcional sobre tu forma de trabajar: cómo es una primera sesión, cómo explicas el proceso y cómo haces seguimiento.]",
    ],
    education: [
      { title: "[Título universitario en Fisioterapia]", institution: "[Universidad]", year: "[Año]" },
      { title: "[Especialización, posgrado o curso relevante]", institution: "[Institución]", year: "[Año]" },
    ],
    experience: [
      { role: "[Cargo o área de práctica]", place: "[Centro, clínica o consulta privada]", period: "[Periodo]" },
    ],
    philosophy:
      "[Describe tu filosofía de atención. Por ejemplo: cómo escuchas a cada paciente, la importancia de explicar cada paso y de adaptar el trabajo a sus objetivos.]",
    commitment:
      "[Describe tu compromiso con los pacientes: puntualidad, comunicación clara, respeto, confidencialidad, seguimiento.]",
  },

  contact: {
    /** Número de WhatsApp en formato internacional SIN "+" ni espacios. Ej.: 34600111222 */
    whatsapp: "00000000000",
    /** Teléfono tal como se mostrará en pantalla. */
    phoneDisplay: "[+00 000 000 000]",
    /** Teléfono para enlaces tel: (formato internacional con +). */
    phone: "+00000000000",
    email: "[correo@dominio.com]",
    address: {
      street: "[Calle y número]",
      district: "[Barrio / zona]",
      city: "[Ciudad]",
      region: "[Provincia / Estado]",
      postalCode: "",
      country: "[País]",
    },
    /** Texto que se busca en Google Maps (dirección o nombre del consultorio). */
    mapsQuery: "[Dirección completa del consultorio, Ciudad]",
    /** Enlace directo a la ficha de Google Maps (opcional; si está vacío se genera desde mapsQuery). */
    mapsUrl: "",
    /** Cómo llegar: indicaciones de referencia, transporte o estacionamiento. */
    directions: "[Indicaciones para llegar: referencias, transporte público, estacionamiento.]",
    hours: [
      { days: "Lunes a viernes", time: "[00:00 – 00:00]" },
      { days: "Sábados", time: "[00:00 – 00:00]" },
      { days: "Domingos y feriados", time: "Cerrado" },
    ],
    homeVisits: {
      enabled: true,
      /** Zonas en las que atiende a domicilio. */
      areas: "[Zonas o barrios de cobertura]",
    },
    whatsappDefaultMessage: "Hola, vi tu página web y me gustaría recibir información sobre una consulta de fisioterapia.",
  },

  /** Deja una red vacía ("") para ocultarla. */
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    tiktok: "https://www.tiktok.com/",
  },

  booking: {
    /** Franjas horarias que el paciente puede elegir como preferencia. */
    timeSlots: ["Mañana", "Mediodía", "Tarde", "Sin preferencia"],
    /** Máximo de días hacia adelante que se puede elegir como fecha preferida. */
    maxDaysAhead: 90,
  },

  seo: {
    title: "Fisioterapeuta en [Ciudad]",
    description:
      "Fisioterapia personalizada en [Ciudad]: rehabilitación física, fisioterapia deportiva y terapia manual. Solicita tu cita por WhatsApp.",
    keywords: [
      "fisioterapeuta en [Ciudad]",
      "fisioterapia en [Ciudad]",
      "rehabilitación física",
      "fisioterapia deportiva",
      "terapia manual",
    ],
  },

  legal: {
    /** Responsable del tratamiento de datos para el aviso de privacidad. */
    dataController: "[Nombre completo y documento de identidad / razón social]",
    lastUpdated: "2026-11-07",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const navigation = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Sobre mí", href: "/#sobre-mi" },
  { label: "Especialidades", href: "/#especialidades" },
  { label: "Tratamientos", href: "/#tratamientos" },
  { label: "Instalaciones", href: "/#instalaciones" },
  { label: "Testimonios", href: "/#testimonios" },
  { label: "Contacto", href: "/#contacto" },
] as const;
