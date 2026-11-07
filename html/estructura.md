# Estructura del proyecto · Tarjeta digital Fisioterapeuta (HTML puro)

Misma arquitectura que la tarjeta C21: sitio **100 % estático** en HTML, CSS y JavaScript puros,
con todos los datos en `info.json`. Preparado para un panel privado (`admin.html`) que publique los
cambios en GitHub mediante Supabase (Fase 3).

---

## 1. Resumen

| Pieza | Servicio | Función |
|---|---|---|
| Código, `info.json` y fotos | **GitHub** | Guarda todo y lleva el historial de cambios |
| Publicación | **Cloudflare Pages** | Publica el sitio en cada commit (`*.pages.dev` y luego dominio propio) |
| Login del admin y publicación | **Supabase** (Auth + Edge Function) · *Fase 3* | Verifica quién edita y hace el commit en GitHub |
| Consultas de pacientes (opcional) | **Supabase** (tabla `consultas`) | Guarda los formularios para verlos en el admin |

**Principio:** el sitio público no depende de Supabase para mostrarse. Las citas siempre se envían
por WhatsApp; guardarlas en Supabase es opcional (`reserva.guardarEnSupabase` en `info.json`).

## 2. Carpetas

```
html/
├── index.html                 ← portada (SEO y Open Graph escritos a mano)
├── blog.html                  ← listado y artículo (?a=<slug>)
├── privacidad.html            ← aviso de privacidad (datos desde info.json)
├── 404.html                   ← página no encontrada
├── info.json                  ← TODOS los datos del sitio
├── contacto.vcf               ← tarjeta de contacto
├── robots.txt · sitemap.xml
├── _headers                   ← caché y seguridad (Cloudflare Pages)
├── _redirects                 ← oculta README.md y estructura.md
│
├── css/
│   └── styles.css             ← diseño completo (paleta, tipografía, responsive)
│
├── js/
│   ├── config.js              ← URL y clave pública (anon) de Supabase · vacías = solo WhatsApp
│   ├── datos.js               ← descarga info.json (no-cache)
│   ├── app.js                 ← arma la portada
│   ├── pagina.js              ← cabecera y pie de las páginas interiores
│   ├── articulos.js           ← blog.html
│   ├── privacidad.js          ← privacidad.html
│   ├── components/
│   │   ├── comunes.js         ← logo, redes, títulos de sección, animaciones
│   │   ├── cabecera.js        ← menú, menú móvil, sección activa, flotantes
│   │   ├── hero.js
│   │   ├── sobre-mi.js
│   │   ├── servicios.js       ← especialidades, tratamientos, ¿por qué elegirme?
│   │   ├── instalaciones.js   ← galería + visor
│   │   ├── testimonios.js     ← carrusel
│   │   ├── reservar.js        ← solicitud de citas
│   │   ├── blog.js            ← tarjetas, vista previa y preguntas frecuentes
│   │   ├── contacto.js        ← contacto, mapa, compartir y formulario breve
│   │   └── pie.js
│   └── utils/
│       ├── iconos.js          ← iconos SVG (Lucide) + marcas
│       ├── contacto.js        ← WhatsApp, mapas, compartir, avisos
│       ├── formato.js         ← escape de HTML, fechas, URLs seguras
│       ├── formulario.js      ← anti-spam, errores accesibles, envío opcional a Supabase
│       └── validacion.js      ← reglas de validación
│
└── img/
    ├── favicon.svg · apple-touch-icon.png · og.jpg (1200×630)
    ├── perfil/                ← hero.webp, sobre-mi.webp
    ├── instalaciones/
    ├── tratamientos/
    └── blog/
```

Sin npm ni compilación: las fuentes se cargan desde Google Fonts y los módulos JS con
`<script type="module">`.

## 3. Flujo de la portada

1. `index.html` muestra "Cargando…" y carga `js/app.js`.
2. `app.js` descarga `info.json` y cada componente devuelve el HTML de su sección (todo texto pasa por `esc()`).
3. Después se activan las interacciones (menú, galería, carrusel, formularios, animaciones).
4. Si `info.json` no carga, se muestra un mensaje con botón "Reintentar".

## 4. Fase 3 · Panel administrativo (pendiente)

- `admin.html` con login de Supabase Auth y formularios para editar `info.json` y subir fotos (WebP).
- Edge Function `publicar-info`: verifica sesión y rol, valida el JSON y hace **un commit** en GitHub
  con un token que **solo** vive en Supabase.
- Tabla `consultas` con RLS: inserción pública, lectura solo para administradores.
- Requiere crear el proyecto de Supabase y un token de GitHub con permisos sobre el repositorio.
