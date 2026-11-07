/** Ubicación y contacto: canales, horarios, domicilio, mapa, acciones y formulario breve. */
import { esc, urlSegura } from "../utils/formato.js";
import { icono, marcas } from "../utils/iconos.js";
import { abrirEnPestana, compartir, enlaceMapa, enlaceMapaEmbebido, enlaceRuta, enlaceWhatsapp } from "../utils/contacto.js";
import { reglas, validar } from "../utils/validacion.js";
import { campoTrampa, datosDe, guardarConsulta, iniciarAntispam, mostrarError, pareceSpam } from "../utils/formulario.js";
import { redes, tituloSeccion } from "./comunes.js";

export function direccionCompleta(c) {
  return [c.direccion, c.zona, c.ciudad].filter(Boolean).join(", ");
}

export function render(info) {
  const c = info.contacto;
  const wa = enlaceWhatsapp(c.whatsapp, c.mensajeWhatsapp);
  const canales = [
    [wa, "WhatsApp", "Escríbeme directamente", marcas.whatsapp(), true],
    [`tel:${c.telefono}`, "Teléfono", c.telefonoVisible, icono("phone"), false],
    [`mailto:${c.email}`, "Correo electrónico", c.email, icono("mail"), false],
  ];

  return `
    <section id="contacto" class="seccion seccion--blanca" aria-labelledby="contacto-titulo">
      <div class="contenedor">
        ${tituloSeccion({
          id: "contacto-titulo",
          etiqueta: "Ubicación y contacto",
          titulo: "Estoy aquí para ayudarte",
          descripcion: "Escríbeme, llámame o visítame en el consultorio. Elige la forma que te resulte más cómoda.",
        })}
        <div class="contacto">
          <div class="contacto__info revelar">
            <ul class="canales">
              ${canales
                .map(
                  ([href, titulo, valor, ic, externo]) => `
                <li><a href="${urlSegura(href)}" ${externo ? 'target="_blank" rel="noopener noreferrer"' : ""} class="canal">
                  <span class="canal__icono">${ic}</span>
                  <span class="canal__texto"><small>${titulo}</small><strong>${esc(valor)}</strong></span>
                </a></li>`
                )
                .join("")}
            </ul>

            <div class="contacto__bloque">
              <h3 class="mini-titulo">${icono("map-pin", "icon icon-sm")} Consultorio</h3>
              <address>${esc(direccionCompleta(c))}</address>
              <p class="tenue">${esc(c.comoLlegar)}</p>
              <h3 class="mini-titulo">${icono("clock", "icon icon-sm")} Horarios de atención</h3>
              <dl class="horarios">${c.horarios.map((h) => `<div><dt>${esc(h.dias)}</dt><dd>${esc(h.horas)}</dd></div>`).join("")}</dl>
            </div>

            ${
              c.domicilio?.activo
                ? `<div class="domicilio">${icono("home", "icon icon-lg")}<div><h3>Atención a domicilio</h3><p>También puedo atenderte en tu hogar. Zonas: ${esc(c.domicilio.zonas)}.</p></div></div>`
                : ""
            }
            <div><p class="negrita">Sígueme en redes</p>${redes(info)}</div>
          </div>

          <div class="contacto__mapa revelar" style="--retardo:80ms">
            <div class="mapa">
              <iframe title="Mapa: ${esc(direccionCompleta(c))}" src="${esc(enlaceMapaEmbebido(c))}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
            </div>
            <div class="acciones">
              <a href="${esc(enlaceRuta(c))}" target="_blank" rel="noopener noreferrer" class="btn btn--primario">${icono("navigation")} Cómo llegar</a>
              <a href="${esc(enlaceMapa(c))}" target="_blank" rel="noopener noreferrer" class="btn btn--contorno">${icono("map-pin")} Abrir en Google Maps</a>
              <a href="contacto.vcf" download class="btn btn--contorno">${icono("contact")} Guardar contacto</a>
              <button type="button" class="btn btn--contorno" id="compartir">${icono("share")} Compartir página</button>
            </div>
            <div class="mensaje-caja">
              <h3>Envíame un mensaje</h3>
              <p class="tenue">Para consultas generales. Para pedir cita, usa el formulario de reserva.</p>
              <form id="form-mensaje" class="formulario formulario--simple" novalidate>
                ${campoTrampa}
                <div class="campo">
                  <label for="m-nombre">Nombre</label>
                  <input id="m-nombre" name="nombre" autocomplete="name" maxlength="80">
                  <p class="error" id="err-m-nombre" data-error="nombre" hidden></p>
                </div>
                <div class="campo">
                  <label for="m-mensaje">Tu consulta</label>
                  <textarea id="m-mensaje" name="mensaje" rows="3" maxlength="650" placeholder="¿En qué puedo ayudarte?"></textarea>
                  <p class="error" id="err-m-mensaje" data-error="mensaje" hidden></p>
                </div>
                <div class="acciones acciones--fila">
                  <button type="submit" class="btn btn--whatsapp">${marcas.whatsapp()} Enviar por WhatsApp</button>
                  <button type="button" class="btn btn--contorno" data-canal="email">${icono("mail")} Enviar por correo</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

export function activar(info) {
  document.getElementById("compartir")?.addEventListener("click", () =>
    compartir({ titulo: `${info.perfil.nombre} · ${info.perfil.profesion}`, texto: info.perfil.frase })
  );

  const form = document.getElementById("form-mensaje");
  if (!form) return;
  iniciarAntispam(form);
  const esquema = {
    nombre: [reglas.requerido("Escribe tu nombre.")],
    mensaje: [reglas.requerido("Escribe tu consulta."), reglas.maximo(600)],
  };

  const enviar = (canal) => {
    if (pareceSpam(form)) return;
    const datos = datosDe(form);
    const errores = validar(datos, esquema);
    Object.keys(esquema).forEach((c) => mostrarError(form, c, errores[c]));
    if (Object.keys(errores).length) return form.querySelector(`[name="${Object.keys(errores)[0]}"]`).focus();

    const texto = `Hola, ${info.perfil.nombreCorto}. Soy ${datos.nombre.trim()}.\n\n${datos.mensaje.trim()}`;
    if (info.reserva.guardarEnSupabase) guardarConsulta("mensaje", datos);
    if (canal === "email") {
      location.href = `mailto:${info.contacto.email}?subject=${encodeURIComponent("Consulta desde la web")}&body=${encodeURIComponent(texto)}`;
    } else if (!abrirEnPestana(enlaceWhatsapp(info.contacto.whatsapp, texto))) {
      location.href = enlaceWhatsapp(info.contacto.whatsapp, texto);
    }
    form.outerHTML = `<div class="confirmacion confirmacion--simple" role="status">${icono("check-circle", "icon icon-lg")}<p><strong>Tu mensaje está listo para enviarse.</strong></p><p class="tenue">Confirma el envío en la aplicación que se abrió.</p></div>`;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    enviar("whatsapp");
  });
  form.querySelector('[data-canal="email"]').addEventListener("click", () => enviar("email"));
}
