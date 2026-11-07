/** Especialidades, tratamientos y "¿Por qué elegirme?". */
import { esc, urlSegura } from "../utils/formato.js";
import { icono } from "../utils/iconos.js";
import { tituloSeccion } from "./comunes.js";

/** Botón que lleva al formulario de citas con el servicio ya elegido. */
const botonConsultar = (servicio) => `
  <button type="button" class="consultar" data-servicio="${esc(servicio)}" aria-label="Consultar: ${esc(servicio)}">
    Consultar <span class="consultar__circulo">${icono("arrow-up-right")}</span>
  </button>`;

export function especialidades(info) {
  const lista = info.especialidades.filter((e) => e.activa);
  if (!lista.length) return "";
  return `
    <section id="especialidades" class="seccion" aria-labelledby="esp-titulo">
      <div class="contenedor">
        ${tituloSeccion({
          id: "esp-titulo",
          etiqueta: "Especialidades",
          titulo: "Un abordaje adaptado a <em>cada etapa</em> de tu vida",
          descripcion: "Cada persona llega con una historia distinta. Estas son las áreas en las que puedo acompañarte.",
        })}
        <ul class="grid-3 especialidades">
          ${lista
            .map(
              (e, i) => `
            <li class="revelar" style="--retardo:${(i % 3) * 70}ms">
              <article class="tarjeta especialidad">
                <div class="especialidad__cabeza">
                  <span class="especialidad__icono">${icono(e.icono, "icon icon-lg")}</span>
                  <div>
                    <h3>${esc(e.nombre)}</h3>
                    <p>${esc(e.descripcion)}</p>
                  </div>
                </div>
                ${botonConsultar(e.nombre)}
              </article>
            </li>`
            )
            .join("")}
        </ul>
      </div>
    </section>`;
}

export function tratamientos(info) {
  const lista = info.tratamientos.filter((t) => t.activo);
  if (!lista.length) return "";
  return `
    <section id="tratamientos" class="seccion seccion--arena" aria-labelledby="trat-titulo">
      <div class="contenedor">
        ${tituloSeccion({
          id: "trat-titulo",
          etiqueta: "Tratamientos",
          titulo: "Tratamientos y servicios",
          descripcion: "El tratamiento adecuado se define siempre tras una evaluación individual. Estas son algunas de las herramientas con las que trabajo.",
        })}
      </div>
      <ul class="carril tratamientos" aria-label="Catálogo de tratamientos">
        ${lista
          .map(
            (t, i) => `
          <li class="revelar" style="--retardo:${(i % 3) * 70}ms">
            <article class="tratamiento">
              <div class="tratamiento__foto">
                <img src="${urlSegura(t.foto)}" alt="${esc(t.fotoAlt)}" width="800" height="600" loading="lazy" decoding="async">
                <span class="pastilla">${icono("clock", "icon icon-xs")} ${esc(t.duracion || "Duración a consultar")}</span>
              </div>
              <div class="tratamiento__cuerpo">
                <h3>${esc(t.nombre)}</h3>
                <p>${esc(t.descripcion)}</p>
                <p class="tratamiento__objetivo">${icono("target", "icon icon-sm")}<span><strong>Objetivo: </strong>${esc(t.objetivo)}</span></p>
                <div class="tratamiento__pie">
                  ${t.precio ? `<p class="tratamiento__precio">${esc(t.precio)}</p>` : "<span></span>"}
                  ${botonConsultar(t.nombre)}
                </div>
              </div>
            </article>
          </li>`
          )
          .join("")}
      </ul>
      <p class="contenedor nota-centro">Los objetivos son orientativos. Cada proceso es único y no se garantizan resultados específicos.</p>
    </section>`;
}

export function razones(info) {
  const lista = info.razones.filter((r) => r.activa);
  if (!lista.length) return "";
  return `
    <section class="seccion seccion--bosque" aria-labelledby="porque-titulo">
      <div class="bosque__luz" aria-hidden="true"></div>
      <div class="contenedor">
        ${tituloSeccion({ id: "porque-titulo", etiqueta: "¿Por qué elegirme?", titulo: "Un acompañamiento <em>cercano</em> y profesional", claro: true })}
        <ul class="razones">
          ${lista
            .map(
              (r, i) => `
            <li class="revelar" style="--retardo:${(i % 3) * 70}ms">
              ${icono(r.icono, "icon icon-xl")}
              <h3>${esc(r.titulo)}</h3>
              <p>${esc(r.descripcion)}</p>
            </li>`
            )
            .join("")}
        </ul>
      </div>
    </section>`;
}

/** Los botones "Consultar" preseleccionan el servicio en el formulario de citas. */
export function activar() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".consultar[data-servicio]");
    if (!btn) return;
    document.dispatchEvent(new CustomEvent("elegir-servicio", { detail: btn.dataset.servicio }));
    document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
