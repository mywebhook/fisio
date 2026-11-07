/**
 * Capa de acceso a contenido.
 *
 * Hoy los datos provienen de archivos estáticos en /src/data y /src/config.
 * Todas las funciones son asíncronas a propósito: cuando exista un panel
 * administrativo con base de datos o CMS, solo hay que cambiar la
 * implementación aquí, sin tocar los componentes.
 */
import { siteConfig } from "@/config/site";
import { specialties } from "@/data/specialties";
import { treatments } from "@/data/treatments";
import { testimonials } from "@/data/testimonials";
import { gallery } from "@/data/gallery";
import { reasons } from "@/data/reasons";
import { faq } from "@/data/faq";
import { articles } from "@/data/articles";

export async function getSiteConfig() {
  return siteConfig;
}

export async function getSpecialties() {
  return specialties.filter((s) => s.enabled);
}

export async function getTreatments() {
  return treatments.filter((t) => t.enabled);
}

export async function getTestimonials() {
  return testimonials;
}

export async function getGallery() {
  return gallery;
}

export async function getReasons() {
  return reasons.filter((r) => r.enabled);
}

export async function getFaq() {
  return faq;
}

export async function getArticles() {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug) ?? null;
}

/** Opciones de servicio para el formulario de citas. */
export async function getBookingServices(): Promise<string[]> {
  const [s, t] = await Promise.all([getSpecialties(), getTreatments()]);
  const names = [...s.map((x) => x.name), ...t.map((x) => x.name)];
  return [...Array.from(new Set(names)), "Consulta informativa / No estoy seguro"];
}
