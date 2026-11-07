/**
 * ============================================================
 *  CONFIGURACIÓN PRINCIPAL — DATOS DE LA PROFESIONAL
 * ============================================================
 *
 * ⚠️ PERFIL DE DEMOSTRACIÓN: todos los datos de este archivo son FICTICIOS
 * (persona, formación, dirección, teléfono, correo y precios). Sirven para
 * mostrar el sitio completo. Reemplázalos por los datos reales antes de publicar.
 * La plantilla vacía, con marcadores [entre corchetes], está en la rama `version_init`.
 *
 * Campos vacíos ("") ocultan automáticamente el elemento correspondiente
 * (por ejemplo, una red social o el número de colegiatura).
 */

export const siteConfig = {
  /** URL pública del sitio. Configúrala con la variable NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "es",

  professional: {
    name: "Valeria Montaño",
    /** Nombre corto para mensajes cercanos ("Hola, Valeria"). */
    firstName: "Valeria",
    title: "Fisioterapeuta",
    /** Número de colegiatura / registro profesional. Vacío = no se muestra. */
    license: "MP-4821",
    tagline: "Recupera tu movimiento, mejora tu bienestar y vuelve a disfrutar cada momento.",
    intro:
      "Atención fisioterapéutica personalizada, enfocada en acompañarte durante tu proceso de recuperación y mejorar tu calidad de vida.",
  },

  photos: {
    /** Fotografías de demostración (Pexels, licencia libre). Reemplázalas por fotos propias. */
    hero: "/images/hero.jpg",
    heroAlt: "Valeria Montaño, fisioterapeuta, durante una sesión de tratamiento",
    about: "/images/about.jpg",
    aboutAlt: "Valeria Montaño guiando un ejercicio de movilidad en su consultorio",
  },

  about: {
    heading: "Acompañarte en cada paso de tu recuperación",
    /** Biografía en primera persona. Usa un tono humano y cercano. */
    bio: [
      "Soy Valeria, fisioterapeuta. Elegí esta profesión porque me apasiona ver cómo las personas recuperan la confianza en su cuerpo y vuelven a hacer lo que disfrutan: caminar sin molestias, volver a entrenar o jugar con sus hijos.",
      "En cada primera sesión dedico tiempo a escucharte y a entender qué te ocurre. Te explico lo que encontramos, definimos juntos los objetivos y te acompaño con un plan claro, revisando tu evolución en cada encuentro.",
    ],
    education: [
      { title: "Licenciatura en Fisioterapia y Kinesiología", institution: "Universidad del Valle Andino", year: "2014" },
      { title: "Diplomado en Terapia Manual Ortopédica", institution: "Instituto Andino de Ciencias del Movimiento", year: "2017" },
      { title: "Curso de Rehabilitación de Lesiones Deportivas", institution: "Escuela Latinoamericana de Fisioterapia", year: "2019" },
    ],
    experience: [
      { role: "Fisioterapeuta", place: "Consulta privada", period: "2018 – actualidad" },
      { role: "Fisioterapeuta de planta", place: "Centro de Rehabilitación Integral Los Pinos", period: "2014 – 2018" },
    ],
    philosophy:
      "Creo en una fisioterapia cercana y bien explicada. Cada persona es distinta, por eso adapto el tratamiento a tu historia, tus objetivos y tu ritmo, y te enseño herramientas para que seas protagonista de tu recuperación.",
    commitment:
      "Puntualidad, comunicación clara, respeto y confidencialidad. Te acompaño con seguimiento cercano y siempre te digo con honestidad qué podemos esperar del proceso.",
  },

  contact: {
    /** Número de WhatsApp en formato internacional SIN "+" ni espacios. ⚠️ Ficticio. */
    whatsapp: "59170000000",
    /** Teléfono tal como se mostrará en pantalla. */
    phoneDisplay: "+591 700 00000",
    /** Teléfono para enlaces tel: (formato internacional con +). */
    phone: "+59170000000",
    email: "contacto@valeriamontanofisio.com",
    address: {
      street: "Av. Los Álamos 1245, consultorio 3",
      district: "Zona Norte",
      city: "Cochabamba",
      region: "Cochabamba",
      postalCode: "",
      country: "Bolivia",
    },
    /** Texto que se busca en Google Maps (dirección o nombre del consultorio). */
    mapsQuery: "Cochabamba, Bolivia",
    /** Enlace directo a la ficha de Google Maps (opcional; si está vacío se genera desde mapsQuery). */
    mapsUrl: "",
    /** Cómo llegar: indicaciones de referencia, transporte o estacionamiento. */
    directions: "A dos cuadras de la plaza principal de la Zona Norte. Hay estacionamiento en la calle y paradas de transporte público cercanas.",
    hours: [
      { days: "Lunes a viernes", time: "08:00 – 19:00" },
      { days: "Sábados", time: "08:00 – 13:00" },
      { days: "Domingos y feriados", time: "Cerrado" },
    ],
    homeVisits: {
      enabled: true,
      /** Zonas en las que atiende a domicilio. */
      areas: "Zona Norte, Queru Queru, Cala Cala y Sarco",
    },
    whatsappDefaultMessage: "Hola, Valeria. Vi tu página web y me gustaría recibir información sobre una consulta de fisioterapia.",
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
    title: "Fisioterapeuta en Cochabamba",
    description:
      "Fisioterapia personalizada en Cochabamba: rehabilitación física, fisioterapia deportiva y terapia manual, en consultorio y a domicilio. Solicita tu cita por WhatsApp.",
    keywords: [
      "fisioterapeuta en Cochabamba",
      "fisioterapia en Cochabamba",
      "rehabilitación física",
      "fisioterapia deportiva",
      "terapia manual",
      "fisioterapia a domicilio",
    ],
  },

  legal: {
    /** Responsable del tratamiento de datos para el aviso de privacidad. */
    dataController: "Valeria Montaño Rojas",
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
