/** Reglas de validación de formularios. Cada regla devuelve un mensaje de error o "". */

export const reglas = {
  requerido: (msg) => (v) => (String(v ?? "").trim() ? "" : msg),
  nombre: (v) => {
    const s = String(v ?? "").trim();
    if (s.length < 3) return "Escribe tu nombre completo.";
    if (!/^[\p{L}\s'.-]+$/u.test(s)) return "El nombre solo puede contener letras.";
    return "";
  },
  telefono: (v) => {
    const s = String(v ?? "").trim();
    const digitos = s.replace(/\D/g, "");
    if (!digitos) return "Indica tu número de WhatsApp.";
    if (!/^[+\d\s()-]+$/.test(s)) return "Usa solo números, espacios o el símbolo +.";
    if (digitos.length < 7 || digitos.length > 15) return "Revisa el número: debe tener entre 7 y 15 dígitos.";
    return "";
  },
  emailOpcional: (v) => {
    const s = String(v ?? "").trim();
    return !s || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) ? "" : "El correo no parece válido.";
  },
  maximo: (n) => (v) => (String(v ?? "").length > n ? `Máximo ${n} caracteres.` : ""),
  fechaEntre: (min, max, dias) => (v) => {
    if (!v) return "Elige una fecha preferida.";
    if (v < min) return "La fecha no puede ser anterior a hoy.";
    if (v > max) return `Elige una fecha dentro de los próximos ${dias} días.`;
    return "";
  },
  marcado: (msg) => (v) => (v ? "" : msg),
};

/** Valida un objeto de datos con un mapa campo -> [reglas]. */
export function validar(datos, esquema) {
  const errores = {};
  for (const [campo, lista] of Object.entries(esquema)) {
    for (const regla of lista) {
      const msg = regla(datos[campo]);
      if (msg) {
        errores[campo] = msg;
        break;
      }
    }
  }
  return errores;
}
