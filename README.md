# Web de marca personal · Fisioterapeuta

Sitio web premium para una fisioterapeuta: presentación profesional, catálogo de servicios y solicitud de citas por WhatsApp.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Lucide Icons

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # define NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
npm run build && npm start   # producción
```

Requiere Node.js 18.18 o superior.

## Personalización (sin tocar componentes)

| Qué | Dónde |
| --- | --- |
| Nombre, biografía, formación, contacto, WhatsApp, horarios, redes, SEO | `src/config/site.ts` |
| Especialidades (activar/desactivar con `enabled`, destacar con `featured`) | `src/data/specialties.ts` |
| Tratamientos (duración y precio opcionales) | `src/data/treatments.ts` |
| Testimonios (solo reales y autorizados) | `src/data/testimonials.ts` |
| Galería de instalaciones | `src/data/gallery.ts` |
| ¿Por qué elegirme? | `src/data/reasons.ts` |
| Preguntas frecuentes | `src/data/faq.ts` |
| Artículos del blog | `src/data/articles.ts` |
| Fotografías | `public/images/` |

- Todo texto entre **[corchetes]** es un marcador provisional. En `npm run dev` aparece un aviso con cuántos quedan pendientes.
- Los marcadores nunca se incluyen en los datos estructurados de SEO ni en la vCard.
- Para ocultar una red social, deja su URL vacía (`""`).
- **Fotos:** sustituye los SVG provisionales por JPG/WebP reales (mismo nombre o cambia la ruta en los datos). Next.js las optimiza a AVIF/WebP y las carga de forma diferida.
- **Testimonios:** borra los ejemplos (`placeholder: true`). Si la lista queda vacía, la sección muestra un mensaje en lugar del carrusel.

## Funcionalidades

- Navegación sticky con sección activa y menú móvil a pantalla completa.
- Solicitud de citas: validación, anti-spam (campo trampa + tiempo mínimo), estados de carga y error, mensaje generado para WhatsApp. **Nunca confirma una cita**: deja claro que la profesional debe confirmarla.
- Botones "Consultar" que preseleccionan el servicio en el formulario.
- Galería con visor ampliado (teclado, deslizamiento táctil, foco atrapado).
- Carrusel de testimonios, preguntas frecuentes en acordeón y animaciones al hacer scroll (respetan `prefers-reduced-motion`).
- Botón flotante de WhatsApp, botón para volver arriba, compartir página y guardar contacto (`/contacto.vcf`).
- SEO: metadatos, Open Graph con imagen generada (`/opengraph-image`), `sitemap.xml`, `robots.txt`, manifest y JSON-LD (`Physiotherapy`, `FAQPage`, `BlogPosting`).
- Página 404 personalizada y aviso de privacidad (plantilla que debe adaptarse a la normativa local).

## Arquitectura

```
src/
  app/            Rutas: portada, blog, privacidad, vCard, SEO, 404
  components/
    layout/       Navbar, Footer, botones flotantes
    sections/     Una sección por archivo (Hero, About, Booking, …)
    ui/           Componentes reutilizables
  config/site.ts  Datos de la profesional
  data/           Contenido editable
  lib/
    content.ts    Capa de acceso a datos (asíncrona)
    booking.ts    Validación y mensaje de solicitud de citas
  types/          Modelos de contenido
```

### Preparado para un panel administrativo

Los componentes nunca importan los datos directamente: los leen desde `src/lib/content.ts`, cuyas funciones ya son asíncronas. Para conectar una base de datos o un CMS:

1. Implementa esas mismas funciones contra la base de datos (los tipos de `src/types/content.ts` definen el esquema; los iconos se guardan como texto).
2. Añade autenticación real (por ejemplo Auth.js) para proteger el panel en `/admin`.
3. Para una agenda real, crea `POST /api/bookings` que reciba un `BookingRequest` (`src/lib/booking.ts`) y añádelo como canal de envío.

No hay panel ni backend simulados: el sitio actual es estático y no almacena datos personales.
