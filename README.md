# Tarjeta digital · Fisioterapeuta (HTML puro)

Sitio web de marca personal para una fisioterapeuta, hecho con **HTML, CSS y JavaScript puros**.
No necesita Node.js, `npm install` ni compilación: se publica la carpeta tal cual.

> ⚠️ **Perfil de demostración.** Nombre, formación, dirección, teléfono, correo, precios y testimonios
> son **ficticios**. Las fotos son de [Pexels](https://www.pexels.com) (licencia libre).
> Revisa la lista de "Antes de publicar" más abajo.

## Ver el sitio en tu computadora

Los navegadores no permiten leer `info.json` abriendo el archivo con doble clic, así que hace falta
un servidor local sencillo. Cualquiera de estas opciones sirve:

```bash
# Con Python (desde esta carpeta)
python -m http.server 8080
# y abre http://localhost:8080
```

o la extensión **Live Server** de VS Code (clic derecho en `index.html` → *Open with Live Server*).

## Editar el contenido

Todo el contenido está en **`info.json`**:

| Bloque | Qué contiene |
|---|---|
| `perfil` | Nombre, profesión, matrícula, frase, presentación y fotos principales |
| `sobreMi` | Biografía, formación, experiencia, filosofía y compromiso |
| `contacto` | WhatsApp, teléfono, correo, dirección, mapa, horarios, atención a domicilio |
| `redes` | Instagram, Facebook, TikTok (deja `""` para ocultar una red) |
| `reserva` | Franjas horarias y días máximos para pedir cita |
| `especialidades` | Activa/desactiva con `"activa"`; `"destacada"` las muestra en la portada |
| `tratamientos` | Duración, precio (opcional) y foto; activa/desactiva con `"activo"` |
| `razones` | Sección "¿Por qué elegirme?" |
| `instalaciones` | Fotos de la galería |
| `testimonios` | Solo testimonios **reales** y con autorización |
| `preguntas` | Preguntas frecuentes |
| `articulos` | Entradas del blog |

- **WhatsApp:** formato internacional sin `+` ni espacios (ej. `59170000000`).
- **Fotos:** guárdalas en `img/` en formato **WebP** o JPG (máx. ~1400 px de ancho) y cambia la ruta en `info.json`.
- **Iconos disponibles** para especialidades y razones: ver `js/utils/iconos.js` (`bone`, `dumbbell`, `hand`, `brain`, `baby`, …).

## Antes de publicar con datos reales

1. Reemplaza los datos de `info.json` y pon `"demo": false`.
2. En `index.html` y `blog.html`: actualiza título, descripción, Open Graph, datos estructurados
   (WhatsApp no ejecuta JavaScript, por eso estos datos van escritos a mano) y **borra** la línea
   `<meta name="robots" content="noindex, nofollow">`.
3. Actualiza `contacto.vcf`, y el dominio en `robots.txt`, `sitemap.xml` y `canonical`.
4. Reemplaza `img/og.jpg` (1200×630) por una imagen con la foto y el nombre reales.
5. Revisa `privacidad.html` según la normativa de tu país.

## Publicar en Cloudflare Pages

1. Sube el repositorio a GitHub.
2. En Cloudflare → *Workers & Pages* → *Create* → *Pages* → conecta el repositorio.
3. **Framework preset:** *None* · **Build command:** (vacío) · **Build output directory:** `/` (la raíz del repositorio).
4. Cada `git push` publica la nueva versión en ~30 segundos.

`_headers` define caché y cabeceras de seguridad; `_redirects` oculta los archivos de documentación.

## Funcionalidades

- Solicitud de citas con validación, anti-spam (campo trampa + tiempo mínimo), estados de carga
  y mensaje automático por WhatsApp. **Nunca confirma la cita**: la profesional la confirma después.
- Botones "Consultar" que preseleccionan el servicio en el formulario.
- Galería con visor ampliado (teclado, deslizar en móvil), carrusel de testimonios y preguntas frecuentes.
- Botón flotante de WhatsApp, volver arriba, compartir página y guardar contacto (`contacto.vcf`).
- Blog (`blog.html` y `blog.html?a=<slug>`), aviso de privacidad y página 404.
- Diseño mobile first, accesible (teclado, lectores de pantalla, `prefers-reduced-motion`).

La arquitectura completa (y la Fase 3 con panel `admin.html` + Supabase) está en [`estructura.md`](estructura.md).
