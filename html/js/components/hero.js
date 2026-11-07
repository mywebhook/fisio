/** Portada: nombre, especialidades destacadas, frase, botones y retrato. */
import { esc, urlSegura } from "../utils/formato.js";
import { icono } from "../utils/iconos.js";

export function render(info) {
  const { perfil, contacto } = info;
  const destacadas = info.especialidades.filter((e) => e.activa && e.destacada).slice(0, 3);
  return `
    <section id="inicio" class="hero" aria-labelledby="hero-titulo">
      <div class="hero__fondo" aria-hidden="true"><span></span><span></span></div>
      <div class="contenedor hero__grid">
        <div class="hero__texto">
          <p class="etiqueta aparecer">${esc(perfil.profesion)} · ${esc(contacto.ciudad)}</p>
          <h1 id="hero-titulo" class="hero__nombre aparecer" style="--retardo:80ms">${esc(perfil.nombre)}</h1>
          ${
            destacadas.length
              ? `<ul class="chips aparecer" style="--retardo:140ms" aria-label="Especialidades principales">${destacadas
                  .map((e) => `<li>${esc(e.corto || e.nombre)}</li>`)
                  .join("")}</ul>`
              : ""
          }
          <p class="hero__frase aparecer" style="--retardo:200ms">“${esc(perfil.frase)}”</p>
          <p class="hero__intro aparecer" style="--retardo:260ms">${esc(perfil.presentacion)}</p>
          <div class="hero__botones aparecer" style="--retardo:320ms">
            <a href="#reservar" class="btn btn--primario">${icono("calendar-heart")} Reservar una cita</a>
            <a href="#especialidades" class="btn btn--contorno">Conocer mis servicios ${icono("arrow-down")}</a>
          </div>
          <ul class="hero__beneficios aparecer" style="--retardo:380ms">
            <li>${icono("sparkles")} Atención personalizada</li>
            <li>${contacto.domicilio?.activo ? `${icono("home")} Consultorio y domicilio` : `${icono("map-pin")} ${esc(contacto.ciudad)}`}</li>
          </ul>
        </div>
        <div class="hero__foto aparecer" style="--retardo:150ms">
          <div class="hero__marco" aria-hidden="true"></div>
          <div class="hero__imagen">
            <img src="${urlSegura(perfil.fotoHero)}" alt="${esc(perfil.fotoHeroAlt)}" width="900" height="1125" fetchpriority="high" decoding="async">
          </div>
          <div class="hero__tarjeta">
            <div class="hero__tarjeta-interior">
              <span class="hero__tarjeta-icono">${icono("calendar-heart")}</span>
              <div>
                <p><strong>Solicita tu cita en minutos</strong></p>
                <p>Te confirmo personalmente por WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}
