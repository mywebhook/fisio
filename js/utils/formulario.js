/**
 * Ayudas de formularios: lectura de datos, errores accesibles, anti-spam y envío.
 */
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config.js";
import { icono } from "./iconos.js";
import { esc } from "./formato.js";

/** Tiempo mínimo (ms) para completar un formulario. Envíos más rápidos se consideran automáticos. */
const TIEMPO_MINIMO = 3000;

/** Marca el inicio del llenado (anti-spam). */
export function iniciarAntispam(form) {
  form.dataset.inicio = String(Date.now());
}

/** true si el envío parece automático (campo trampa lleno o demasiado rápido). */
export function pareceSpam(form) {
  const trampa = form.querySelector('[name="sitio_web"]');
  const inicio = Number(form.dataset.inicio || 0);
  return Boolean(trampa?.value) || Date.now() - inicio < TIEMPO_MINIMO;
}

/** Campo trampa invisible para personas. */
export const campoTrampa = `
  <div class="trampa" aria-hidden="true">
    <label>No completar este campo <input type="text" name="sitio_web" tabindex="-1" autocomplete="off"></label>
  </div>`;

/** Muestra u oculta el error de un campo, enlazándolo con aria-describedby. */
export function mostrarError(form, campo, mensaje) {
  const control = form.querySelector(`[name="${campo}"]`);
  const caja = form.querySelector(`[data-error="${campo}"]`);
  if (!caja) return;
  if (mensaje) {
    caja.innerHTML = `${icono("alert", "icon icon-xs")} ${esc(mensaje)}`;
    caja.hidden = false;
  } else {
    caja.textContent = "";
    caja.hidden = true;
  }
  form.querySelectorAll(`[name="${campo}"]`).forEach((el) => {
    if (mensaje) {
      el.setAttribute("aria-invalid", "true");
      el.setAttribute("aria-describedby", caja.id);
    } else {
      el.removeAttribute("aria-invalid");
      el.removeAttribute("aria-describedby");
    }
  });
  if (control?.closest(".opciones")) control.closest(".opciones").classList.toggle("con-error", Boolean(mensaje));
}

export function datosDe(form) {
  const fd = new FormData(form);
  const datos = Object.fromEntries(fd.entries());
  form.querySelectorAll('input[type="checkbox"]').forEach((c) => (datos[c.name] = c.checked));
  return datos;
}

/**
 * Guarda la consulta en Supabase (tabla `consultas`) si está configurado.
 * Es opcional y nunca bloquea el envío por WhatsApp: si falla, se ignora.
 */
export async function guardarConsulta(tipo, datos) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return false;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/consultas`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ tipo, datos }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
