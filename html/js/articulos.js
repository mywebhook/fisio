/* ==================================================================
 *  BLOG · blog.html muestra el listado, y blog.html?a=<slug> un artículo.
 * ================================================================== */

import { activarAnimaciones, cargarInfo, montarMarco } from "./pagina.js";
import { ordenados, tarjetaArticulo } from "./components/blog.js";
import { esc, fecha, urlSegura } from "./utils/formato.js";
import { icono } from "./utils/iconos.js";

const raiz = document.getElementById("contenido");

function listado(info) {
  const lista = ordenados(info);
  const categorias = [...new Set(lista.map((a) => a.categoria))];
  document.title = `Blog y consejos de bienestar · ${info.perfil.nombre}`;
  return `
    <section class="pagina">
      <div class="contenedor">
        <div class="pagina__cabeza revelar">
          <p class="etiqueta">Blog</p>
          <h1>Consejos de bienestar y movimiento</h1>
          <p class="pagina__intro">Información educativa para cuidar tu cuerpo en el día a día. Estos artículos no sustituyen una evaluación profesional.</p>
        </div>
        <ul class="chips categorias" aria-label="Categorías">${categorias.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
        <ul class="grid-3">${lista.map((a, i) => `<li class="revelar" style="--retardo:${(i % 3) * 70}ms">${tarjetaArticulo(a)}</li>`).join("")}</ul>
      </div>
    </section>`;
}

function bloque(b) {
  if (b.tipo === "h2") return `<h2>${esc(b.texto)}</h2>`;
  if (b.tipo === "ul") return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
  return `<p>${esc(b.texto)}</p>`;
}

function articulo(info, a) {
  const relacionados = ordenados(info).filter((x) => x.slug !== a.slug).slice(0, 2);
  document.title = `${a.titulo} · ${info.perfil.nombre}`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", a.resumen);
  return `
    <article class="pagina">
      <div class="contenedor estrecho">
        <a href="blog.html" class="volver">${icono("arrow-left", "icon icon-sm")} Volver al blog</a>
        <p class="etiqueta" style="margin-top:24px">${esc(a.categoria)}</p>
        <h1>${esc(a.titulo)}</h1>
        <p class="tenue" style="margin-top:20px">Por ${esc(info.perfil.nombre)} · <time datetime="${esc(a.fecha)}">${esc(fecha(a.fecha))}</time> · ${Number(a.minutos)} min de lectura</p>
      </div>
      <div class="contenedor">
        <div class="articulo__portada"><img src="${urlSegura(a.foto)}" alt="${esc(a.fotoAlt)}" width="1200" height="750"></div>
      </div>
      <div class="contenedor estrecho">
        <p class="articulo__resumen">${esc(a.resumen)}</p>
        <div class="prosa">${a.contenido.map(bloque).join("")}</div>
        <aside class="aviso-medico">${icono("info", "icon icon-sm")}<p>Este artículo tiene fines educativos y no sustituye una evaluación ni un diagnóstico profesional. Si tienes dolor o una condición de salud, consulta con un profesional.</p></aside>
        ${
          a.fuentes?.length
            ? `<div class="fuentes"><h2>Fuentes</h2><ul>${a.fuentes
                .map((f) => `<li>${f.url ? `<a href="${urlSegura(f.url)}" target="_blank" rel="noopener noreferrer">${esc(f.texto)}</a>` : esc(f.texto)}</li>`)
                .join("")}</ul></div>`
            : ""
        }
        <div class="llamada">
          <p>¿Quieres una valoración personalizada?</p>
          <p>Solicita tu cita y conversemos sobre lo que necesitas.</p>
          <a href="index.html#reservar" class="btn btn--claro">${icono("calendar-heart")} Reservar una cita</a>
        </div>
      </div>
      ${
        relacionados.length
          ? `<div class="contenedor relacionados"><h2>Sigue leyendo</h2><ul class="grid-3">${relacionados.map((r) => `<li>${tarjetaArticulo(r)}</li>`).join("")}</ul></div>`
          : ""
      }
    </article>`;
}

function noEncontrado() {
  return `
    <section class="no-encontrado"><div class="contenedor">
      <p class="no-encontrado__numero">404</p>
      <h1>No encontramos este artículo</h1>
      <p>Es posible que el enlace haya cambiado.</p>
      <div class="botones"><a href="blog.html" class="btn btn--primario">${icono("arrow-left")} Ver todos los artículos</a></div>
    </div></section>`;
}

async function iniciar() {
  try {
    const info = await cargarInfo();
    montarMarco(info);
    const slug = new URLSearchParams(location.search).get("a");
    if (!slug) raiz.innerHTML = listado(info);
    else {
      const a = (info.articulos || []).find((x) => x.slug === slug);
      raiz.innerHTML = a ? articulo(info, a) : noEncontrado();
    }
    activarAnimaciones();
  } catch (err) {
    console.error(err);
    raiz.innerHTML = `<div class="contenedor error-carga"><p class="error-carga__titulo">No pudimos cargar el blog</p><button class="btn btn--primario" type="button" onclick="location.reload()">Reintentar</button></div>`;
  }
}

iniciar();
