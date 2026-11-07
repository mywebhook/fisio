/** Tarjetas de artículos, vista previa del blog y preguntas frecuentes. */
import { esc, fecha, urlSegura } from "../utils/formato.js";
import { icono, marcas } from "../utils/iconos.js";
import { enlaceWhatsapp } from "../utils/contacto.js";
import { tituloSeccion } from "./comunes.js";

export const ordenados = (info) => [...(info.articulos || [])].sort((a, b) => b.fecha.localeCompare(a.fecha));

export function tarjetaArticulo(a) {
  return `
    <article class="articulo-tarjeta">
      <div class="articulo-tarjeta__foto">
        <img src="${urlSegura(a.foto)}" alt="${esc(a.fotoAlt)}" width="1200" height="750" loading="lazy" decoding="async">
        <span class="pastilla">${esc(a.categoria)}</span>
      </div>
      <div class="articulo-tarjeta__cuerpo">
        <p class="tenue"><time datetime="${esc(a.fecha)}">${esc(fecha(a.fecha))}</time> · ${Number(a.minutos)} min de lectura</p>
        <h3><a href="blog.html?a=${encodeURIComponent(a.slug)}" class="enlace-cubre">${esc(a.titulo)}</a></h3>
        <p>${esc(a.resumen)}</p>
        <span class="leer-mas">Leer más ${icono("arrow-right", "icon icon-sm")}</span>
      </div>
    </article>`;
}

export function vistaPrevia(info) {
  const lista = ordenados(info).slice(0, 3);
  if (!lista.length) return "";
  return `
    <section id="blog" class="seccion seccion--arena" aria-labelledby="blog-titulo">
      <div class="contenedor">
        <div class="cabeza-fila">
          ${tituloSeccion({
            id: "blog-titulo",
            etiqueta: "Blog y consejos",
            titulo: "Consejos para moverte mejor",
            descripcion: "Información educativa sobre salud postural, movilidad y bienestar. No sustituye una evaluación profesional.",
            centrado: false,
          })}
          <a href="blog.html" class="btn btn--contorno">Ver todos los artículos ${icono("arrow-right")}</a>
        </div>
        <ul class="grid-3 articulos">
          ${lista.map((a, i) => `<li class="revelar" style="--retardo:${i * 70}ms">${tarjetaArticulo(a)}</li>`).join("")}
        </ul>
      </div>
    </section>`;
}

export function preguntas(info) {
  const lista = info.preguntas || [];
  if (!lista.length) return "";
  const wa = enlaceWhatsapp(info.contacto.whatsapp, info.contacto.mensajeWhatsapp);
  return `
    <section id="preguntas" class="seccion" aria-labelledby="faq-titulo">
      <div class="contenedor faq">
        <div class="faq__lado">
          ${tituloSeccion({ id: "faq-titulo", etiqueta: "Preguntas frecuentes", titulo: "Resolvemos tus dudas", centrado: false })}
          <div class="faq__ayuda">
            <p class="faq__ayuda-titulo">¿No encuentras tu respuesta?</p>
            <p>Escríbeme y te respondo personalmente.</p>
            <a href="${wa}" target="_blank" rel="noopener noreferrer" class="btn btn--whatsapp">${marcas.whatsapp()} Preguntar por WhatsApp</a>
          </div>
        </div>
        <ul class="acordeon">
          ${lista
            .map(
              (p, i) => `
            <li>
              <h3>
                <button type="button" id="faq-b${i}" aria-expanded="${i === 0}" aria-controls="faq-p${i}">
                  ${esc(p.pregunta)}<span class="acordeon__signo">${icono("plus", "icon icon-sm")}</span>
                </button>
              </h3>
              <div id="faq-p${i}" class="acordeon__panel${i === 0 ? " abierto" : ""}" role="region" aria-labelledby="faq-b${i}">
                <div${i === 0 ? "" : " inert"}><p>${esc(p.respuesta)}</p></div>
              </div>
            </li>`
            )
            .join("")}
        </ul>
      </div>
    </section>`;
}

export function activarPreguntas() {
  const acordeon = document.querySelector(".acordeon");
  if (!acordeon) return;
  acordeon.addEventListener("click", (e) => {
    const boton = e.target.closest("button[aria-controls]");
    if (!boton) return;
    const abrir = boton.getAttribute("aria-expanded") !== "true";
    acordeon.querySelectorAll("button[aria-controls]").forEach((b) => {
      const panel = document.getElementById(b.getAttribute("aria-controls"));
      const este = b === boton && abrir;
      b.setAttribute("aria-expanded", String(este));
      panel.classList.toggle("abierto", este);
      panel.firstElementChild.inert = !este;
    });
  });
}
