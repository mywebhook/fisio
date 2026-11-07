/** Carrusel de testimonios (deslizable, con flechas y puntos). */
import { esc, fecha } from "../utils/formato.js";
import { icono } from "../utils/iconos.js";
import { tituloSeccion } from "./comunes.js";

export function render(info) {
  const lista = info.testimonios || [];
  const flechas =
    lista.length > 1
      ? `<div class="flechas">
          <button type="button" class="flecha" data-dir="-1" aria-label="Testimonio anterior">${icono("chevron-left")}</button>
          <button type="button" class="flecha" data-dir="1" aria-label="Testimonio siguiente">${icono("chevron-right")}</button>
        </div>`
      : "";

  const contenido = !lista.length
    ? `<div class="vacio">${icono("message-heart", "icon icon-xl")}<p>Pronto compartiré aquí la experiencia de mis pacientes.</p></div>`
    : `<ul class="testimonios" aria-roledescription="carrusel" aria-label="Testimonios de pacientes">
        ${lista
          .map(
            (t, i) => `
          <li aria-roledescription="diapositiva" aria-label="${i + 1} de ${lista.length}">
            <figure class="testimonio">
              ${icono("quote", "icon icon-xl testimonio__comillas")}
              ${
                t.calificacion
                  ? `<div class="estrellas" role="img" aria-label="Calificación: ${Number(t.calificacion)} de 5">${Array.from(
                      { length: 5 },
                      (_, s) => `<span class="${s < t.calificacion ? "llena" : ""}">${icono("star", "icon icon-sm")}</span>`
                    ).join("")}</div>`
                  : ""
              }
              <blockquote>“${esc(t.texto)}”</blockquote>
              <figcaption>
                <span class="testimonio__inicial" aria-hidden="true">${esc(t.autor.charAt(0))}</span>
                <span><strong>${esc(t.autor)}</strong>${t.fecha ? `<small>${esc(fecha(t.fecha))}</small>` : ""}</span>
              </figcaption>
            </figure>
          </li>`
          )
          .join("")}
      </ul>
      ${lista.length > 1 ? `<div class="puntos">${lista.map((_, i) => `<button type="button" data-punto="${i}" aria-label="Ir al testimonio ${i + 1}"><span></span></button>`).join("")}</div>` : ""}`;

  return `
    <section id="testimonios" class="seccion seccion--blanca" aria-labelledby="test-titulo">
      <div class="contenedor">
        <div class="cabeza-fila">
          ${tituloSeccion({
            id: "test-titulo",
            etiqueta: "Testimonios",
            titulo: "Lo que comparten mis pacientes",
            descripcion: "Opiniones reales, publicadas con autorización de cada paciente.",
            centrado: false,
          })}
          ${flechas}
        </div>
        ${contenido}
      </div>
    </section>`;
}

export function activar() {
  const pista = document.querySelector(".testimonios");
  if (!pista) return;
  const seccion = pista.closest("section");
  const flechas = seccion.querySelectorAll(".flecha");
  const puntos = seccion.querySelectorAll("[data-punto]");
  const total = pista.children.length;

  const actual = () => {
    const ancho = pista.children[0].offsetWidth + parseFloat(getComputedStyle(pista).columnGap || "0");
    return Math.round(pista.scrollLeft / ancho);
  };
  const ir = (i) => {
    const el = pista.children[Math.max(0, Math.min(total - 1, i))];
    pista.scrollTo({ left: el.offsetLeft - pista.offsetLeft, behavior: "smooth" });
  };
  const actualizar = () => {
    const i = actual();
    const finalAlcanzado = pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 4;
    flechas[0] && (flechas[0].disabled = i <= 0);
    flechas[1] && (flechas[1].disabled = finalAlcanzado);
    puntos.forEach((p, j) => p.setAttribute("aria-current", String(j === i)));
  };

  flechas.forEach((f) => f.addEventListener("click", () => ir(actual() + Number(f.dataset.dir))));
  puntos.forEach((p) => p.addEventListener("click", () => ir(Number(p.dataset.punto))));
  pista.addEventListener("scroll", actualizar, { passive: true });
  actualizar();
}
