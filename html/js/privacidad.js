/* Completa privacidad.html con los datos de info.json. */

import { cargarInfo, montarMarco } from "./pagina.js";
import { fecha } from "./utils/formato.js";

async function iniciar() {
  try {
    const info = await cargarInfo();
    montarMarco(info);
    const poner = (sel, texto) => document.querySelectorAll(sel).forEach((el) => (el.textContent = texto));
    poner("[data-responsable]", info.legal.responsable);
    poner("[data-nombre]", info.perfil.nombre);
    poner("[data-profesion]", info.perfil.profesion.toLowerCase());
    poner("[data-email]", info.contacto.email);
    poner("[data-actualizado]", fecha(info.legal.actualizado));
  } catch (err) {
    console.error(err);
  }
}

iniciar();
