/* Descarga de info.json (compartida por todas las páginas). */

export async function cargarInfo() {
  // no-cache: siempre valida con el servidor para mostrar la última publicación
  const res = await fetch("info.json", { cache: "no-cache" });
  if (!res.ok) throw new Error(`info.json respondió ${res.status}`);
  return res.json();
}
