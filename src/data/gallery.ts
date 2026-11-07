import type { GalleryImage } from "@/types/content";

/** Galería de instalaciones. Fotos de demostración (Pexels): reemplázalas por fotos reales del consultorio. */
export const gallery: GalleryImage[] = [
  { id: "sala", src: "/images/gallery/sala.jpg", alt: "Sala de tratamiento luminosa con camilla", caption: "Sala de tratamiento" },
  { id: "camilla", src: "/images/gallery/camilla.jpg", alt: "Paciente realizando ejercicios en la camilla", caption: "Camilla de tratamiento" },
  { id: "evaluacion", src: "/images/gallery/evaluacion.jpg", alt: "Zona de evaluación postural junto a la ventana", caption: "Zona de evaluación" },
  { id: "detalles", src: "/images/gallery/detalles.jpg", alt: "Detalles decorativos del consultorio en tonos claros", caption: "Detalles del espacio" },
  { id: "recepcion", src: "/images/gallery/recepcion.jpg", alt: "Escritorio de recepción con computadora", caption: "Recepción" },
  { id: "ambiente", src: "/images/gallery/ambiente.jpg", alt: "Sesión de fisioterapia en un ambiente tranquilo", caption: "Ambiente de atención" },
];
