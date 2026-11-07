/* ==================================================================
 *  TARJETA DIGITAL · punto de entrada
 *  Descarga info.json y arma cada sección de index.html.
 * ================================================================== */

import * as cabecera from "./components/cabecera.js";
import * as hero from "./components/hero.js";
import * as sobreMi from "./components/sobre-mi.js";
import * as servicios from "./components/servicios.js";
import * as instalaciones from "./components/instalaciones.js";
import * as testimonios from "./components/testimonios.js";
import * as reservar from "./components/reservar.js";
import * as blog from "./components/blog.js";
import * as contacto from "./components/contacto.js";
import * as pie from "./components/pie.js";
import { activarAnimaciones } from "./components/comunes.js";
import { icono } from "./utils/iconos.js";
import { cargarInfo } from "./datos.js";

/** Reemplaza un elemento marcador por el HTML generado. */
function pintar(id, html) {
  const el = document.getElementById(id);
  if (el) el.outerHTML = html;
}

async function iniciar() {
  let info;
  try {
    info = await cargarInfo();
  } catch (err) {
    console.error(err);
    mostrarError();
    return;
  }

  pintar("raiz-cabecera", cabecera.render(info));
  document.getElementById("contenido").innerHTML = [
    hero.render(info),
    sobreMi.render(info),
    servicios.especialidades(info),
    servicios.tratamientos(info),
    servicios.razones(info),
    instalaciones.render(info),
    testimonios.render(info),
    reservar.render(info),
    blog.vistaPrevia(info),
    blog.preguntas(info),
    contacto.render(info),
  ].join("");
  pintar("raiz-pie", pie.render(info));
  pintar("raiz-flotantes", cabecera.flotantes(info));

  cabecera.activar();
  servicios.activar();
  instalaciones.activar(info);
  testimonios.activar();
  reservar.activar(info);
  blog.activarPreguntas();
  contacto.activar(info);
  activarAnimaciones();

  // Enlace compartido a una sección (#reservar, #contacto…)
  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
}

function mostrarError() {
  document.getElementById("contenido").innerHTML = `
    <div class="contenedor error-carga">
      ${icono("alert")}
      <p class="error-carga__titulo">No pudimos cargar la página</p>
      <p>Revisa tu conexión e inténtalo nuevamente.</p>
      <button class="btn btn--primario" type="button" onclick="location.reload()">Reintentar</button>
    </div>`;
}

iniciar();
