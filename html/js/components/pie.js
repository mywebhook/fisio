/** Pie de página + aviso de demostración. */
import { esc, urlSegura } from "../utils/formato.js";
import { icono, marcas } from "../utils/iconos.js";
import { enlaceMapa, enlaceWhatsapp } from "../utils/contacto.js";
import { logo, redes } from "./comunes.js";
import { NAVEGACION } from "./cabecera.js";

export function render(info, base = "") {
  const { perfil, contacto } = info;
  const anio = new Date().getFullYear();
  return `
    <footer class="pie">
      <div class="pie__luz" aria-hidden="true"></div>
      <div class="contenedor">
        <div class="pie__grid">
          <div class="pie__marca">
            ${logo(info, true)}
            <p>${esc(perfil.presentacion)}</p>
            <p class="pie__lema">Fisioterapia · Rehabilitación · Bienestar</p>
            ${redes(info, true)}
          </div>
          <nav aria-label="Enlaces del pie de página">
            <h2>Navegación</h2>
            <ul>
              ${NAVEGACION.map(([t, id]) => `<li><a href="${base}#${id}">${t}</a></li>`).join("")}
              <li><a href="blog.html">Blog</a></li>
            </ul>
          </nav>
          <div>
            <h2>Contacto</h2>
            <ul class="pie__contacto">
              <li><a href="${enlaceWhatsapp(contacto.whatsapp, contacto.mensajeWhatsapp)}" target="_blank" rel="noopener noreferrer">${marcas.whatsapp("icon icon-sm")} WhatsApp</a></li>
              <li><a href="tel:${esc(contacto.telefono)}">${icono("phone", "icon icon-sm")} ${esc(contacto.telefonoVisible)}</a></li>
              <li><a href="mailto:${esc(contacto.email)}">${icono("mail", "icon icon-sm")} ${esc(contacto.email)}</a></li>
              <li><a href="${urlSegura(enlaceMapa(contacto))}" target="_blank" rel="noopener noreferrer">${icono("map-pin", "icon icon-sm")} ${esc(contacto.direccion)}, ${esc(contacto.ciudad)}</a></li>
            </ul>
          </div>
          <div>
            <h2>Horarios</h2>
            <dl class="pie__horarios">${contacto.horarios.map((h) => `<div><dt>${esc(h.dias)}</dt><dd>${esc(h.horas)}</dd></div>`).join("")}</dl>
            ${contacto.domicilio?.activo ? `<p class="pie__domicilio">También atención a domicilio.</p>` : ""}
          </div>
        </div>
        <div class="pie__base">
          <p>© ${anio} ${esc(perfil.nombre)} · ${esc(perfil.profesion)}. Todos los derechos reservados.</p>
          <ul>
            <li><a href="privacidad.html">Aviso de privacidad</a></li>
            <li><a href="contacto.vcf" download>Guardar contacto</a></li>
          </ul>
        </div>
        ${info.demo ? `<p class="pie__demo">Sitio de demostración: los datos, testimonios y precios son ficticios.</p>` : ""}
      </div>
    </footer>`;
}
