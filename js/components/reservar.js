/**
 * Solicitud de citas.
 * La solicitud se envía por WhatsApp (y opcionalmente se guarda en Supabase).
 * Nunca confirma la cita: la profesional la confirma después.
 */
import { esc, fecha, isoLocal } from "../utils/formato.js";
import { icono, marcas } from "../utils/iconos.js";
import { abrirEnPestana, enlaceWhatsapp } from "../utils/contacto.js";
import { reglas, validar } from "../utils/validacion.js";
import { campoTrampa, datosDe, guardarConsulta, iniciarAntispam, mostrarError, pareceSpam } from "../utils/formulario.js";

const MODALIDADES = [
  { id: "consultorio", nombre: "Atención en consultorio", detalle: "Sesión en el consultorio", icono: "stethoscope" },
  { id: "domicilio", nombre: "Atención a domicilio", detalle: "Sesión en tu hogar", icono: "home" },
  { id: "informativa", nombre: "Consulta informativa", detalle: "Resolver dudas antes de empezar", icono: "message-question" },
];
const MENSAJE_MAX = 500;

const modalidades = (info) => MODALIDADES.filter((m) => m.id !== "domicilio" || info.contacto.domicilio?.activo);

function servicios(info) {
  const nombres = [
    ...info.especialidades.filter((e) => e.activa).map((e) => e.nombre),
    ...info.tratamientos.filter((t) => t.activo).map((t) => t.nombre),
  ];
  return [...new Set(nombres), "Consulta informativa / No estoy seguro"];
}

const errorDe = (campo) => `<p class="error" id="err-${campo}" data-error="${campo}" hidden></p>`;

function formulario(info) {
  const mods = modalidades(info);
  return `
    <form class="formulario" id="form-reserva" novalidate>
      <p class="formulario__nota">Los campos marcados con <span class="req">*</span> son obligatorios.</p>
      <div class="alerta" id="reserva-alerta" role="alert" hidden></div>
      ${campoTrampa}
      <div class="campos">
        <div class="campo campo--ancho">
          <label for="r-nombre">Nombre completo <span class="req">*</span></label>
          <input id="r-nombre" name="nombre" type="text" autocomplete="name" maxlength="80" placeholder="Tu nombre y apellido">
          ${errorDe("nombre")}
        </div>
        <div class="campo">
          <label for="r-whatsapp">Número de WhatsApp <span class="req">*</span></label>
          <input id="r-whatsapp" name="whatsapp" type="tel" inputmode="tel" autocomplete="tel" maxlength="20" placeholder="+591 700 00000">
          ${errorDe("whatsapp")}
        </div>
        <div class="campo">
          <label for="r-email">Correo electrónico <span class="opcional">(opcional)</span></label>
          <input id="r-email" name="email" type="email" inputmode="email" autocomplete="email" maxlength="120" placeholder="tu@correo.com">
          ${errorDe("email")}
        </div>
        <div class="campo campo--ancho">
          <label for="r-servicio">Servicio solicitado <span class="req">*</span></label>
          <div class="selector">
            <select id="r-servicio" name="servicio">
              <option value="" selected disabled>Selecciona un servicio</option>
              ${servicios(info).map((s) => `<option value="${esc(s)}">${esc(s)}</option>`).join("")}
            </select>
            ${icono("chevron-down")}
          </div>
          ${errorDe("servicio")}
        </div>
        <div class="campo">
          <label for="r-fecha">${icono("calendar-days", "icon icon-sm")} Fecha preferida <span class="req">*</span></label>
          <input id="r-fecha" name="fecha" type="date">
          ${errorDe("fecha")}
        </div>
        <fieldset class="campo">
          <legend>${icono("clock", "icon icon-sm")} Horario preferido <span class="req">*</span></legend>
          <div class="opciones opciones--franjas">
            ${info.reserva.franjas
              .map((f) => `<label class="opcion-franja"><input type="radio" name="horario" value="${esc(f)}"><span>${esc(f)}</span></label>`)
              .join("")}
          </div>
          ${errorDe("horario")}
        </fieldset>
        <fieldset class="campo campo--ancho">
          <legend>Modalidad de atención <span class="req">*</span></legend>
          <div class="opciones opciones--modalidad" style="--columnas:${mods.length}">
            ${mods
              .map(
                (m) => `
              <label class="opcion-modalidad">
                <input type="radio" name="modalidad" value="${m.id}">
                ${icono(m.icono, "icon")}
                <span><strong>${m.nombre}</strong><small>${m.detalle}</small></span>
              </label>`
              )
              .join("")}
          </div>
          ${errorDe("modalidad")}
        </fieldset>
        <div class="campo campo--ancho">
          <label for="r-mensaje">Mensaje adicional <span class="opcional">(opcional)</span></label>
          <textarea id="r-mensaje" name="mensaje" rows="4" maxlength="${MENSAJE_MAX + 50}" placeholder="Cuéntame brevemente el motivo de tu consulta o cualquier dato útil para coordinar."></textarea>
          <div class="campo__ayuda"><span>No es necesario que incluyas información médica detallada.</span><span id="r-contador">0/${MENSAJE_MAX}</span></div>
          ${errorDe("mensaje")}
        </div>
        <div class="campo campo--ancho">
          <label class="casilla">
            <input type="checkbox" name="acepto">
            <span>Acepto que mis datos se usen únicamente para gestionar esta solicitud, según el <a href="privacidad.html" target="_blank">aviso de privacidad</a>. <span class="req">*</span></span>
          </label>
          ${errorDe("acepto")}
        </div>
      </div>
      <button type="submit" class="btn btn--primario btn--bloque btn--grande">${marcas.whatsapp()} <span>Enviar solicitud por WhatsApp</span></button>
      <p class="formulario__pie">Se abrirá WhatsApp con tu mensaje listo para enviar.</p>
    </form>`;
}

export function render(info) {
  const nombre = esc(info.perfil.nombreCorto);
  return `
    <section id="reservar" class="seccion seccion--salvia" aria-labelledby="reserva-titulo">
      <div class="salvia__luz" aria-hidden="true"></div>
      <div class="contenedor reserva">
        <div class="reserva__intro revelar">
          <p class="etiqueta">Reserva de citas</p>
          <h2 id="reserva-titulo">Solicita tu cita <em>en pocos pasos</em></h2>
          <p class="reserva__texto">Completa el formulario y se abrirá WhatsApp con tu solicitud lista para enviar. Te responderé personalmente para confirmar el día y la hora.</p>
          <ol class="pasos">
            <li><span>1</span><div><strong>Completa tus datos</strong><p>Solo lo necesario para poder contactarte.</p></div></li>
            <li><span>2</span><div><strong>Envía la solicitud por WhatsApp</strong><p>El mensaje se genera automáticamente.</p></div></li>
            <li><span>3</span><div><strong>Recibe la confirmación</strong><p>${nombre} revisará su agenda y te confirmará la cita.</p></div></li>
          </ol>
          <p class="nota">${icono("info", "icon icon-sm")} Tu solicitud no es una reserva confirmada. La cita queda agendada solo cuando recibes la confirmación.</p>
        </div>
        <div class="reserva__caja revelar" style="--retardo:80ms" id="reserva-caja">${formulario(info)}</div>
      </div>
    </section>`;
}

function construirMensaje(info, d) {
  const modalidad = MODALIDADES.find((m) => m.id === d.modalidad)?.nombre ?? "";
  return [
    `Hola, ${info.perfil.nombreCorto}. Quisiera *solicitar una cita*:`,
    "",
    `*Nombre:* ${d.nombre.trim()}`,
    `*WhatsApp:* ${d.whatsapp.trim()}`,
    d.email?.trim() ? `*Correo:* ${d.email.trim()}` : null,
    `*Servicio:* ${d.servicio}`,
    `*Fecha preferida:* ${fecha(d.fecha)}`,
    `*Horario preferido:* ${d.horario}`,
    `*Modalidad:* ${modalidad}`,
    d.mensaje?.trim() ? `*Mensaje:* ${d.mensaje.trim()}` : null,
    "",
    "Quedo a la espera de tu confirmación. ¡Gracias!",
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export function activar(info) {
  const caja = document.getElementById("reserva-caja");
  if (!caja) return;

  const hoy = new Date();
  const max = new Date();
  max.setDate(max.getDate() + info.reserva.diasMaximos);
  const minISO = isoLocal(hoy);
  const maxISO = isoLocal(max);

  const esquema = {
    nombre: [reglas.nombre],
    whatsapp: [reglas.telefono],
    email: [reglas.emailOpcional],
    servicio: [reglas.requerido("Elige el servicio que te interesa.")],
    fecha: [reglas.fechaEntre(minISO, maxISO, info.reserva.diasMaximos)],
    horario: [reglas.requerido("Elige un horario preferido.")],
    modalidad: [reglas.requerido("Elige la modalidad de atención.")],
    mensaje: [reglas.maximo(MENSAJE_MAX)],
    acepto: [reglas.marcado("Necesitamos tu aceptación para usar estos datos y responderte.")],
  };

  let ultimoUrl = "";

  function montar() {
    caja.innerHTML = formulario(info);
    const form = caja.querySelector("form");
    const tocados = new Set();
    iniciarAntispam(form);
    form.querySelector('[name="fecha"]').min = minISO;
    form.querySelector('[name="fecha"]').max = maxISO;

    const contador = form.querySelector("#r-contador");
    const revisar = (campo) => mostrarError(form, campo, validar(datosDe(form), { [campo]: esquema[campo] })[campo]);

    form.addEventListener("input", (e) => {
      const campo = e.target.name;
      if (campo === "mensaje") {
        const n = e.target.value.length;
        contador.textContent = `${n}/${MENSAJE_MAX}`;
        contador.classList.toggle("excedido", n > MENSAJE_MAX);
      }
      if (e.target.type === "radio" || e.target.type === "checkbox") tocados.add(campo);
      if (tocados.has(campo)) revisar(campo);
    });
    form.addEventListener("focusout", (e) => {
      const campo = e.target.name;
      if (!esquema[campo] || e.target.type === "radio") return;
      tocados.add(campo);
      revisar(campo);
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const boton = form.querySelector('[type="submit"]');
      if (boton.disabled) return;
      const alerta = form.querySelector("#reserva-alerta");
      alerta.hidden = true;

      if (pareceSpam(form)) {
        alerta.innerHTML = `${icono("alert", "icon icon-sm")} No pudimos procesar la solicitud. Revisa los datos e inténtalo de nuevo en unos segundos.`;
        alerta.hidden = false;
        return;
      }

      const datos = datosDe(form);
      const errores = validar(datos, esquema);
      Object.keys(esquema).forEach((c) => {
        tocados.add(c);
        mostrarError(form, c, errores[c]);
      });
      const primero = Object.keys(esquema).find((c) => errores[c]);
      if (primero) {
        form.querySelector(`[name="${primero}"]`)?.focus();
        return;
      }

      // Estado de carga + apertura de WhatsApp dentro del clic (evita bloqueos del navegador)
      boton.disabled = true;
      boton.innerHTML = `${icono("loader", "icon girar")} <span>Preparando tu solicitud…</span>`;
      ultimoUrl = enlaceWhatsapp(info.contacto.whatsapp, construirMensaje(info, datos));
      const abierto = abrirEnPestana(ultimoUrl);
      if (info.reserva.guardarEnSupabase) guardarConsulta("cita", datos);
      setTimeout(() => confirmar(abierto), 700);
    });
  }

  function confirmar(abierto) {
    caja.innerHTML = `
      <div class="confirmacion" role="status" tabindex="-1">
        <span class="confirmacion__icono">${icono("check-circle", "icon icon-xl")}</span>
        <h3>¡Tu solicitud está lista!</h3>
        <p>${
          abierto
            ? "Se abrió WhatsApp con tu mensaje. Recuerda pulsar «Enviar» en WhatsApp para completar la solicitud."
            : "Tu navegador no permitió abrir WhatsApp automáticamente. Pulsa el botón para abrir el mensaje y enviarlo."
        }</p>
        <p class="confirmacion__aviso"><strong>Importante:</strong> tu cita aún no está confirmada. ${esc(info.perfil.nombreCorto)} te responderá para confirmar disponibilidad.</p>
        <div class="confirmacion__botones">
          <a href="${esc(ultimoUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn--whatsapp">${marcas.whatsapp()} ${abierto ? "Abrir WhatsApp de nuevo" : "Abrir WhatsApp"}</a>
          <button type="button" class="btn btn--contorno" id="nueva-solicitud">${icono("rotate-ccw")} Nueva solicitud</button>
        </div>
      </div>`;
    caja.querySelector(".confirmacion").focus();
    caja.querySelector("#nueva-solicitud").addEventListener("click", montar);
  }

  // Preselección desde los botones "Consultar"
  document.addEventListener("elegir-servicio", (e) => {
    let form = caja.querySelector("form");
    if (!form) {
      montar();
      form = caja.querySelector("form");
    }
    const select = form.querySelector('[name="servicio"]');
    if ([...select.options].some((o) => o.value === e.detail)) {
      select.value = e.detail;
      mostrarError(form, "servicio", "");
    }
  });

  montar();
}
