/** Galería editorial de instalaciones con visor ampliado (teclado, deslizar, foco atrapado). */
import { esc, urlSegura } from "../utils/formato.js";
import { icono } from "../utils/iconos.js";
import { tituloSeccion } from "./comunes.js";

export function render(info) {
  const fotos = info.instalaciones || [];
  if (!fotos.length) return "";
  return `
    <section id="instalaciones" class="seccion" aria-labelledby="inst-titulo">
      <div class="contenedor">
        ${tituloSeccion({
          id: "inst-titulo",
          etiqueta: "Instalaciones",
          titulo: "Un espacio pensado para tu bienestar",
          descripcion: "Un ambiente tranquilo, cuidado y preparado para que te sientas cómodo en cada sesión.",
        })}
        <ul class="galeria">
          ${fotos
            .map(
              (f, i) => `
            <li class="galeria__item revelar" style="--retardo:${(i % 3) * 60}ms">
              <button type="button" class="galeria__boton" data-indice="${i}" aria-label="Ampliar imagen: ${esc(f.titulo)}">
                <img src="${urlSegura(f.foto)}" alt="${esc(f.alt)}" width="1400" height="933" loading="lazy" decoding="async">
                <span class="galeria__sombra"></span>
                <span class="galeria__titulo">${esc(f.titulo)} ${icono("expand", "icon icon-sm")}</span>
              </button>
            </li>`
            )
            .join("")}
        </ul>
      </div>
    </section>`;
}

export function activar(info) {
  const fotos = info.instalaciones || [];
  const galeria = document.querySelector(".galeria");
  if (!galeria) return;
  let indice = 0;
  let origen = null;
  let visor = null;
  let toqueX = null;

  const pintar = () => {
    const f = fotos[indice];
    visor.querySelector(".visor__img").innerHTML = `<img src="${urlSegura(f.foto)}" alt="${esc(f.alt)}">`;
    visor.querySelector(".visor__titulo").textContent = f.titulo;
    visor.querySelector(".visor__contador").textContent = `${indice + 1} / ${fotos.length}`;
    visor.setAttribute("aria-label", `Galería: ${f.titulo}`);
  };
  const mover = (d) => {
    indice = (indice + d + fotos.length) % fotos.length;
    pintar();
  };
  const cerrar = () => {
    visor?.remove();
    visor = null;
    document.body.style.overflow = "";
    removeEventListener("keydown", teclas);
    origen?.focus();
  };
  const teclas = (e) => {
    if (e.key === "Escape") cerrar();
    if (e.key === "ArrowRight") mover(1);
    if (e.key === "ArrowLeft") mover(-1);
    if (e.key === "Tab") {
      const b = [...visor.querySelectorAll("button")];
      if (e.shiftKey && document.activeElement === b[0]) (e.preventDefault(), b.at(-1).focus());
      else if (!e.shiftKey && document.activeElement === b.at(-1)) (e.preventDefault(), b[0].focus());
    }
  };

  galeria.addEventListener("click", (e) => {
    const btn = e.target.closest(".galeria__boton");
    if (!btn) return;
    origen = btn;
    indice = Number(btn.dataset.indice);
    visor = document.createElement("div");
    visor.className = "visor";
    visor.setAttribute("role", "dialog");
    visor.setAttribute("aria-modal", "true");
    visor.innerHTML = `
      <div class="visor__barra">
        <p class="visor__contador" aria-live="polite"></p>
        <button type="button" class="visor__btn" data-accion="cerrar" aria-label="Cerrar galería">${icono("x")}</button>
      </div>
      <div class="visor__img"></div>
      <div class="visor__barra">
        <button type="button" class="visor__btn" data-accion="anterior" aria-label="Imagen anterior">${icono("chevron-left")}</button>
        <p class="visor__titulo"></p>
        <button type="button" class="visor__btn" data-accion="siguiente" aria-label="Imagen siguiente">${icono("chevron-right")}</button>
      </div>`;
    document.body.append(visor);
    pintar();
    document.body.style.overflow = "hidden";
    addEventListener("keydown", teclas);
    visor.querySelector('[data-accion="cerrar"]').focus();

    visor.addEventListener("click", (ev) => {
      const accion = ev.target.closest("[data-accion]")?.dataset.accion;
      if (accion === "cerrar") cerrar();
      else if (accion === "anterior") mover(-1);
      else if (accion === "siguiente") mover(1);
      else if (ev.target.classList.contains("visor__img")) cerrar();
    });
    visor.addEventListener("touchstart", (ev) => (toqueX = ev.touches[0].clientX), { passive: true });
    visor.addEventListener("touchend", (ev) => {
      if (toqueX === null) return;
      const dx = ev.changedTouches[0].clientX - toqueX;
      if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1);
      toqueX = null;
    });
  });
}
