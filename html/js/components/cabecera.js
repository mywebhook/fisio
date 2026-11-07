/** Menú superior, menú móvil, sección activa y botones flotantes. */
import { esc } from "../utils/formato.js";
import { icono, marcas } from "../utils/iconos.js";
import { enlaceWhatsapp } from "../utils/contacto.js";
import { logo, redes } from "./comunes.js";

export const NAVEGACION = [
  ["Inicio", "inicio"],
  ["Sobre mí", "sobre-mi"],
  ["Especialidades", "especialidades"],
  ["Tratamientos", "tratamientos"],
  ["Instalaciones", "instalaciones"],
  ["Testimonios", "testimonios"],
  ["Contacto", "contacto"],
];

/** `base` es "" en la portada e "index.html" en las demás páginas. */
export function render(info, base = "") {
  const wa = enlaceWhatsapp(info.contacto.whatsapp, info.contacto.mensajeWhatsapp);
  return `
    <header class="cabecera" id="cabecera">
      <nav class="contenedor cabecera__nav" aria-label="Navegación principal">
        <a href="${base}#inicio" class="cabecera__logo" aria-label="${esc(info.perfil.nombre)}, ir al inicio">${logo(info)}</a>
        <ul class="cabecera__enlaces">
          ${NAVEGACION.map(([t, id]) => `<li><a href="${base}#${id}" data-seccion="${id}">${t}</a></li>`).join("")}
        </ul>
        <div class="cabecera__acciones">
          <a href="${base}#reservar" class="btn btn--primario btn--compacto">${icono("calendar-heart")}<span class="solo-escritorio">Reservar cita</span><span class="solo-movil">Reservar</span></a>
          <button type="button" class="cabecera__menu-btn" aria-expanded="false" aria-controls="menu-movil" aria-label="Abrir menú">${icono("menu")}</button>
        </div>
      </nav>
      <div class="menu-movil" id="menu-movil" hidden>
        <div class="contenedor menu-movil__interior">
          <ul>
            ${NAVEGACION.map(
              ([t, id], i) => `<li style="animation-delay:${i * 40}ms"><a href="${base}#${id}">${t}<span aria-hidden="true">0${i + 1}</span></a></li>`
            ).join("")}
          </ul>
          <div class="menu-movil__botones">
            <a href="${base}#reservar" class="btn btn--primario btn--bloque">${icono("calendar-heart")} Reservar una cita</a>
            <a href="${wa}" target="_blank" rel="noopener noreferrer" class="btn btn--whatsapp btn--bloque">${marcas.whatsapp()} Escribir por WhatsApp</a>
          </div>
          ${redes(info)}
        </div>
      </div>
    </header>`;
}

export function flotantes(info) {
  const wa = enlaceWhatsapp(info.contacto.whatsapp, info.contacto.mensajeWhatsapp);
  return `
    <div class="flotantes">
      <button type="button" class="flotantes__arriba" id="volver-arriba" aria-label="Volver arriba" tabindex="-1">${icono("arrow-up")}</button>
      <a href="${wa}" target="_blank" rel="noopener noreferrer" class="flotantes__wa" aria-label="Escribir por WhatsApp (se abre en una pestaña nueva)">
        <span class="flotantes__burbuja">¿Hablamos?</span>
        <span class="flotantes__circulo"><span class="flotantes__pulso" aria-hidden="true"></span>${marcas.whatsapp("icon icon-lg")}</span>
      </a>
    </div>`;
}

export function activar() {
  const cabecera = document.getElementById("cabecera");
  const boton = cabecera.querySelector(".cabecera__menu-btn");
  const menu = document.getElementById("menu-movil");
  const arriba = document.getElementById("volver-arriba");

  const alDesplazar = () => {
    cabecera.classList.toggle("con-fondo", scrollY > 12);
    const mostrar = scrollY > 700;
    arriba.classList.toggle("visible", mostrar);
    arriba.tabIndex = mostrar ? 0 : -1;
  };
  alDesplazar();
  addEventListener("scroll", alDesplazar, { passive: true });
  arriba.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  // Menú móvil
  const cerrar = () => {
    menu.hidden = true;
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-label", "Abrir menú");
    boton.innerHTML = icono("menu");
    cabecera.classList.remove("menu-abierto");
    document.body.style.overflow = "";
  };
  boton.addEventListener("click", () => {
    if (!menu.hidden) return cerrar();
    menu.hidden = false;
    boton.setAttribute("aria-expanded", "true");
    boton.setAttribute("aria-label", "Cerrar menú");
    boton.innerHTML = icono("x");
    cabecera.classList.add("menu-abierto");
    document.body.style.overflow = "hidden";
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", cerrar));
  addEventListener("keydown", (e) => e.key === "Escape" && !menu.hidden && (cerrar(), boton.focus()));
  matchMedia("(min-width: 1200px)").addEventListener("change", (m) => m.matches && cerrar());

  // Sección activa
  const enlaces = cabecera.querySelectorAll("[data-seccion]");
  const secciones = [...enlaces].map((a) => document.getElementById(a.dataset.seccion)).filter(Boolean);
  if (!secciones.length || !("IntersectionObserver" in window)) return;
  const obs = new IntersectionObserver(
    (entradas) =>
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        enlaces.forEach((a) => {
          const activo = a.dataset.seccion === e.target.id;
          a.classList.toggle("activo", activo);
          activo ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current");
        });
      }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  secciones.forEach((s) => obs.observe(s));
}
