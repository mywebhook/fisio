/** Piezas compartidas: logo, redes sociales, títulos de sección y animaciones. */
import { esc, iniciales, urlSegura } from "../utils/formato.js";
import { marcas } from "../utils/iconos.js";

export function logo(info, invertido = false) {
  const { nombre, profesion } = info.perfil;
  return `
    <span class="logo${invertido ? " logo--claro" : ""}">
      <span class="logo__monograma" aria-hidden="true">${esc(iniciales(nombre))}<span class="logo__punto"></span></span>
      <span class="logo__texto">
        <span class="logo__nombre">${esc(nombre)}</span>
        <span class="logo__profesion">${esc(profesion)}</span>
      </span>
    </span>`;
}

const REDES = [
  ["instagram", "Instagram"],
  ["facebook", "Facebook"],
  ["tiktok", "TikTok"],
];

export function redes(info, invertido = false) {
  const items = REDES.filter(([k]) => info.redes?.[k]);
  if (!items.length) return "";
  return `
    <ul class="redes${invertido ? " redes--claro" : ""}">
      ${items
        .map(
          ([k, nombre]) => `
        <li><a href="${urlSegura(info.redes[k])}" target="_blank" rel="noopener noreferrer" aria-label="${nombre} (se abre en una pestaña nueva)">${marcas[k]()}</a></li>`
        )
        .join("")}
    </ul>`;
}

/** Encabezado de sección: etiqueta + título + descripción. `titulo` admite HTML de confianza (del código, no de info.json). */
export function tituloSeccion({ id, etiqueta, titulo, descripcion = "", centrado = true, claro = false }) {
  return `
    <div class="titulo-seccion${centrado ? " titulo-seccion--centro" : ""}${claro ? " titulo-seccion--claro" : ""} revelar">
      <p class="etiqueta">${esc(etiqueta)}</p>
      <h2 id="${id}">${titulo}</h2>
      ${descripcion ? `<p class="titulo-seccion__desc">${esc(descripcion)}</p>` : ""}
    </div>`;
}

/** Aparición suave de los elementos `.revelar` al entrar en pantalla. */
export function activarAnimaciones(raiz = document) {
  const elementos = raiz.querySelectorAll(".revelar:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("visible"));
    return;
  }
  const obs = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  elementos.forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight) el.classList.add("visible");
    else obs.observe(el);
  });
}
