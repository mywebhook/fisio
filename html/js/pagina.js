/* ==================================================================
 *  Estructura común de las páginas interiores (blog, privacidad, 404):
 *  cabecera, pie y botones flotantes con enlaces hacia la portada.
 * ================================================================== */

import * as cabecera from "./components/cabecera.js";
import * as pie from "./components/pie.js";
import { activarAnimaciones } from "./components/comunes.js";
import { cargarInfo } from "./datos.js";

export { cargarInfo };

export function montarMarco(info) {
  const base = "index.html";
  document.getElementById("raiz-cabecera").outerHTML = cabecera.render(info, base);
  document.getElementById("raiz-pie").outerHTML = pie.render(info, base);
  document.getElementById("raiz-flotantes").outerHTML = cabecera.flotantes(info);
  cabecera.activar();
  document.getElementById("cabecera").classList.add("con-fondo");
}

export { activarAnimaciones };
