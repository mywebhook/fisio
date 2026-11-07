/** Sección "Sobre mí": foto, biografía, formación, experiencia, filosofía y compromiso. */
import { esc, urlSegura } from "../utils/formato.js";
import { icono } from "../utils/iconos.js";

export function render(info) {
  const { perfil, sobreMi } = info;
  const especialidades = info.especialidades.filter((e) => e.activa);
  return `
    <section id="sobre-mi" class="seccion seccion--blanca" aria-labelledby="sobre-titulo">
      <div class="contenedor sobre">
        <div class="sobre__foto revelar">
          <div class="sobre__foto-pegajosa">
            <div class="sobre__fondo" aria-hidden="true"></div>
            <div class="sobre__imagen">
              <img src="${urlSegura(perfil.fotoSobreMi)}" alt="${esc(perfil.fotoSobreMiAlt)}" width="900" height="1125" loading="lazy" decoding="async">
            </div>
            <div class="sobre__firma">
              <p class="sobre__firma-nombre">${esc(perfil.nombre)}</p>
              <p class="sobre__firma-profesion">${esc(perfil.profesion)}</p>
              ${perfil.matricula ? `<p class="sobre__firma-matricula">Reg. profesional ${esc(perfil.matricula)}</p>` : ""}
            </div>
          </div>
        </div>

        <div class="sobre__texto">
          <div class="revelar">
            <p class="etiqueta">Sobre mí</p>
            <h2 id="sobre-titulo">${esc(sobreMi.titulo)}</h2>
            <div class="sobre__bio">${sobreMi.biografia.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
          </div>

          <div class="sobre__tarjetas">
            <div class="tarjeta sobre__tarjeta sobre__tarjeta--ancha revelar">
              <h3 class="mini-titulo">${icono("graduation-cap")} Formación académica</h3>
              <ul class="lista-linea">
                ${sobreMi.formacion
                  .map((f) => `<li><p class="negrita">${esc(f.titulo)}</p><p class="tenue">${esc(f.institucion)} · ${esc(f.anio)}</p></li>`)
                  .join("")}
              </ul>
            </div>
            <div class="tarjeta sobre__tarjeta revelar" style="--retardo:60ms">
              <h3 class="mini-titulo">${icono("briefcase")} Experiencia</h3>
              <ul class="lista-simple">
                ${sobreMi.experiencia
                  .map((x) => `<li><p class="negrita">${esc(x.cargo)}</p><p class="tenue">${esc(x.lugar)} · ${esc(x.periodo)}</p></li>`)
                  .join("")}
              </ul>
            </div>
            <div class="tarjeta sobre__tarjeta revelar" style="--retardo:120ms">
              <h3 class="mini-titulo">${icono("badge-check")} Especialidades</h3>
              <ul class="chips chips--suaves">${especialidades.map((e) => `<li>${esc(e.corto || e.nombre)}</li>`).join("")}</ul>
            </div>
            <div class="sobre__tarjeta sobre__tarjeta--salvia revelar" style="--retardo:60ms">
              <h3 class="mini-titulo">${icono("leaf")} Mi filosofía</h3>
              <p>${esc(sobreMi.filosofia)}</p>
            </div>
            <div class="sobre__tarjeta sobre__tarjeta--nude revelar" style="--retardo:120ms">
              <h3 class="mini-titulo">${icono("heart-handshake")} Mi compromiso</h3>
              <p>${esc(sobreMi.compromiso)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}
