import type { Article } from "@/types/content";

/**
 * Artículos del blog.
 *
 * Contenido educativo general, redactado de forma prudente. Antes de publicar,
 * la profesional debe revisarlo, adaptarlo a su criterio clínico y, si lo desea,
 * ampliar las fuentes. Ningún artículo sustituye una evaluación profesional.
 */

const WHO_ACTIVITY = {
  label: "Organización Mundial de la Salud (2020). Directrices de la OMS sobre actividad física y hábitos sedentarios.",
  url: "https://www.who.int/publications/i/item/9789240015128",
};

export const articles: Article[] = [
  {
    slug: "pausas-activas-trabajo-escritorio",
    title: "Pausas activas: cómo cuidar tu cuerpo si trabajas sentado",
    category: "Salud postural",
    date: "2026-10-28",
    excerpt: "Pasar muchas horas frente a una pantalla es habitual. Pequeños cambios a lo largo del día pueden ayudarte a sentirte mejor.",
    image: "/images/blog/postura.jpg",
    imageAlt: "Persona trabajando en un escritorio con buena iluminación",
    readingMinutes: 4,
    body: [
      { type: "p", text: "Muchas personas pasan buena parte del día sentadas. No existe una única postura «perfecta»: lo que suele ayudar es cambiar de posición con frecuencia y mantener el cuerpo en movimiento." },
      { type: "h2", text: "Ideas sencillas para tu jornada" },
      { type: "ul", items: [
        "Levántate y camina unos minutos cada cierto tiempo; puedes programar un recordatorio.",
        "Ajusta la pantalla para que quede aproximadamente a la altura de tus ojos.",
        "Apoya los pies en el suelo o en un reposapiés y acerca la silla a la mesa.",
        "Alterna tareas que puedas hacer de pie, como llamadas telefónicas.",
      ] },
      { type: "h2", text: "Movimiento, más que rigidez" },
      { type: "p", text: "La Organización Mundial de la Salud recomienda limitar el tiempo sedentario y sustituirlo por actividad física de cualquier intensidad. Moverse a lo largo del día es una forma accesible de empezar." },
      { type: "p", text: "Si tienes molestias que persisten o empeoran, lo recomendable es consultar con un profesional para valorar tu caso." },
    ],
    sources: [WHO_ACTIVITY],
  },
  {
    slug: "calentamiento-prevencion-lesiones",
    title: "Calentar antes de entrenar: por qué no deberías saltártelo",
    category: "Prevención de lesiones",
    date: "2026-10-14",
    excerpt: "Preparar el cuerpo antes de la actividad física es un hábito sencillo que te ayuda a empezar con mayor control.",
    image: "/images/blog/prevencion.jpg",
    imageAlt: "Persona calentando antes de correr",
    readingMinutes: 3,
    body: [
      { type: "p", text: "El calentamiento prepara al cuerpo de forma gradual para el esfuerzo. Suele incluir movimientos suaves que aumentan progresivamente su intensidad." },
      { type: "h2", text: "Un calentamiento básico puede incluir" },
      { type: "ul", items: [
        "Unos minutos de actividad suave, como caminar rápido o pedalear.",
        "Movilidad de las articulaciones que vas a utilizar.",
        "Ejercicios parecidos a los del entrenamiento, empezando con menor intensidad.",
      ] },
      { type: "p", text: "Aumentar la carga de entrenamiento de manera progresiva y respetar el descanso también forman parte de una práctica deportiva responsable." },
      { type: "p", text: "Cada persona y cada deporte tienen necesidades diferentes. Una valoración profesional puede ayudarte a diseñar una rutina adecuada para ti." },
    ],
  },
  {
    slug: "movilidad-dia-a-dia",
    title: "Movilidad en el día a día: pequeños gestos que suman",
    category: "Movilidad",
    date: "2026-09-30",
    excerpt: "Mantenerte en movimiento no requiere grandes rutinas. Integrar la movilidad en tu día puede ser más fácil de lo que crees.",
    image: "/images/blog/movilidad.jpg",
    imageAlt: "Persona estirándose en una sala luminosa",
    readingMinutes: 3,
    body: [
      { type: "p", text: "La movilidad es la capacidad de mover las articulaciones con comodidad y control. Mantenerla activa forma parte del cuidado de nuestro cuerpo a lo largo de la vida." },
      { type: "h2", text: "Ideas para incorporar movimiento" },
      { type: "ul", items: [
        "Aprovecha los desplazamientos para caminar cuando sea posible.",
        "Dedica unos minutos por la mañana a moverte suavemente.",
        "Busca una actividad que disfrutes: bailar, nadar, pasear o hacer yoga.",
      ] },
      { type: "p", text: "Escucha a tu cuerpo: el movimiento no debería provocar dolor intenso. Si aparece, detente y consulta con un profesional." },
    ],
    sources: [WHO_ACTIVITY],
  },
  {
    slug: "que-esperar-recuperacion-fisica",
    title: "Qué esperar durante un proceso de recuperación física",
    category: "Recuperación física",
    date: "2026-09-16",
    excerpt: "Conocer cómo suele ser un proceso de rehabilitación ayuda a vivirlo con más tranquilidad y constancia.",
    image: "/images/blog/recuperacion.jpg",
    imageAlt: "Sesión de rehabilitación acompañada por una fisioterapeuta",
    readingMinutes: 4,
    body: [
      { type: "p", text: "Cada proceso de recuperación es único. Depende de la persona, del motivo de consulta, de sus objetivos y de muchos otros factores." },
      { type: "h2", text: "Aspectos que suelen formar parte del proceso" },
      { type: "ul", items: [
        "Una evaluación inicial para comprender tu situación.",
        "Objetivos compartidos y realistas.",
        "Sesiones en consulta y, a menudo, ejercicios para realizar en casa.",
        "Revisiones periódicas para ajustar el plan.",
      ] },
      { type: "p", text: "La comunicación es clave: comentar cómo te sientes, tus dudas y tus avances permite adaptar el trabajo a lo que necesitas." },
      { type: "p", text: "Si te han operado o tienes una indicación médica, el tratamiento de fisioterapia se coordina con esas indicaciones." },
    ],
  },
  {
    slug: "ejercicio-terapeutico-en-casa",
    title: "Ejercicio terapéutico en casa: claves para hacerlo bien",
    category: "Ejercicio terapéutico",
    date: "2026-09-02",
    excerpt: "Los ejercicios que te indica tu fisioterapeuta son parte del tratamiento. Te compartimos algunas claves para mantener la constancia.",
    image: "/images/blog/ejercicio.jpg",
    imageAlt: "Esterilla y bandas elásticas preparadas para ejercitarse en casa",
    readingMinutes: 3,
    body: [
      { type: "p", text: "El ejercicio terapéutico es un programa de ejercicios pautado por un profesional según tu situación. Realizarlo en casa da continuidad al trabajo de las sesiones." },
      { type: "h2", text: "Consejos prácticos" },
      { type: "ul", items: [
        "Reserva un momento fijo del día para tus ejercicios.",
        "Prioriza la calidad del movimiento sobre la cantidad de repeticiones.",
        "Anota cómo te sientes para comentarlo en la siguiente sesión.",
        "Si algún ejercicio te genera dudas o molestias, consulta antes de continuar.",
      ] },
      { type: "p", text: "Evita copiar rutinas pensadas para otras personas: lo adecuado para ti depende de una valoración individual." },
    ],
  },
  {
    slug: "bienestar-y-movimiento",
    title: "Bienestar y movimiento: una relación que se cultiva",
    category: "Bienestar y movimiento",
    date: "2026-08-19",
    excerpt: "Moverte con regularidad es una de las formas más accesibles de cuidar de ti. Empieza por lo que disfrutes.",
    image: "/images/blog/bienestar.jpg",
    imageAlt: "Persona caminando al aire libre",
    readingMinutes: 3,
    body: [
      { type: "p", text: "La actividad física regular forma parte de un estilo de vida saludable. La OMS recuerda que cualquier cantidad de actividad física es mejor que ninguna." },
      { type: "h2", text: "Cómo empezar" },
      { type: "ul", items: [
        "Elige actividades que te resulten agradables.",
        "Empieza poco a poco y aumenta de forma gradual.",
        "Combina distintos tipos de movimiento a lo largo de la semana.",
      ] },
      { type: "p", text: "Si tienes una lesión, una condición de salud o hace tiempo que no realizas actividad física, consulta con un profesional antes de comenzar." },
    ],
    sources: [WHO_ACTIVITY],
  },
];
