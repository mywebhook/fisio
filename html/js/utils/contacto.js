/** Enlaces de contacto, compartir y avisos (toasts). */

export function enlaceWhatsapp(numero, mensaje = "") {
  const tel = String(numero).replace(/\D/g, "");
  return `https://wa.me/${tel}${mensaje ? `?text=${encodeURIComponent(mensaje)}` : ""}`;
}

export function enlaceMapa(contacto) {
  if (contacto.mapaUrl) return contacto.mapaUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contacto.mapaBusqueda)}`;
}

export function enlaceRuta(contacto) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contacto.mapaBusqueda)}`;
}

export function enlaceMapaEmbebido(contacto) {
  return `https://www.google.com/maps?q=${encodeURIComponent(contacto.mapaBusqueda)}&output=embed`;
}

/**
 * Abre una URL en una pestaña nueva. Debe llamarse dentro del clic del usuario
 * para que el navegador no la bloquee. Devuelve false si fue bloqueada.
 */
export function abrirEnPestana(url) {
  try {
    const w = window.open(url, "_blank");
    if (w) {
      w.opener = null;
      return true;
    }
  } catch {
    /* bloqueada */
  }
  return false;
}

let toastTimer;
/** Muestra un aviso breve en pantalla (accesible para lectores de pantalla). */
export function aviso(texto) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.append(el);
  }
  el.textContent = texto;
  el.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-visible"), 2600);
}

/** Comparte la página (menú nativo en móvil; copia el enlace en escritorio). */
export async function compartir({ titulo, texto, url = location.origin + location.pathname }) {
  try {
    if (navigator.share) {
      await navigator.share({ title: titulo, text: texto, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    aviso("Enlace copiado");
  } catch (e) {
    if (e?.name !== "AbortError") aviso("No se pudo compartir el enlace");
  }
}
