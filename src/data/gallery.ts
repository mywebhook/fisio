import type { GalleryImage } from "@/types/content";

/** Galería de instalaciones. Reemplaza `src` por fotografías reales del consultorio. */
export const gallery: GalleryImage[] = [
  { id: "consultorio", src: "/images/gallery/consultorio.svg", alt: "Vista general del consultorio", caption: "Consultorio" },
  { id: "camillas", src: "/images/gallery/camillas.svg", alt: "Camillas de tratamiento", caption: "Camillas de tratamiento" },
  { id: "equipamiento", src: "/images/gallery/equipamiento.svg", alt: "Equipamiento de fisioterapia", caption: "Equipamiento" },
  { id: "rehabilitacion", src: "/images/gallery/rehabilitacion.svg", alt: "Espacio de rehabilitación", caption: "Espacio de rehabilitación" },
  { id: "ejercicios", src: "/images/gallery/ejercicios.svg", alt: "Área de ejercicios", caption: "Área de ejercicios" },
  { id: "ambiente", src: "/images/gallery/ambiente.svg", alt: "Ambiente de atención", caption: "Ambiente de atención" },
];
