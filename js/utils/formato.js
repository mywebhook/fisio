/** Utilidades de formato y seguridad. */

/** Escapa texto para insertarlo en HTML (evita inyección de código desde info.json). */
export function esc(valor) {
  return String(valor ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Permite solo URLs http(s), mailto, tel o rutas relativas. */
export function urlSegura(url) {
  const u = String(url ?? "").trim();
  if (/^(https?:|mailto:|tel:)/i.test(u) || /^[\w./#?=&-]+$/.test(u)) return esc(u);
  return "#";
}

const fechaLarga = new Intl.DateTimeFormat("es", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** "2026-10-28" -> "28 de octubre de 2026" */
export function fecha(iso) {
  if (!iso) return "";
  return fechaLarga.format(new Date(`${iso}T00:00:00Z`));
}

export function iniciales(nombre) {
  return String(nombre)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

/** Fecha local en formato AAAA-MM-DD. */
export function isoLocal(d) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${dia}`;
}

/** Un teléfono es real si tiene algún dígito distinto de cero. */
export function telefonoReal(tel) {
  return /[1-9]/.test(String(tel ?? ""));
}
