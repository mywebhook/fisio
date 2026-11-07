import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: "Cómo se tratan los datos personales que compartes a través de esta web.",
  alternates: { canonical: "/privacidad" },
};

/**
 * Plantilla de aviso de privacidad. Debe revisarse y adaptarse a la normativa
 * de protección de datos aplicable en el país de la profesional.
 */
export default function PrivacyPage() {
  const { professional, contact, legal } = siteConfig;
  return (
    <section className="pb-24 pt-[calc(var(--nav-height)+3rem)]">
      <div className="container max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 font-display text-[2.4rem] leading-tight text-ink sm:text-5xl">Aviso de privacidad</h1>
        <p className="mt-4 text-sm text-graphite">Última actualización: {formatDate(legal.lastUpdated)}</p>

        <div className="mt-10 space-y-8 leading-relaxed text-graphite [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-ink">
          <div className="space-y-3">
            <h2>Responsable</h2>
            <p>
              {legal.dataController}, en su actividad profesional como {professional.title.toLowerCase()} ({professional.name}). Contacto:{" "}
              {contact.email}.
            </p>
          </div>
          <div className="space-y-3">
            <h2>Qué datos se solicitan</h2>
            <p>
              A través del formulario de solicitud de cita se piden únicamente: nombre, número de WhatsApp, correo electrónico (opcional),
              servicio de interés, fecha y horario preferidos, modalidad de atención y un mensaje opcional. No se solicita información
              clínica detallada.
            </p>
          </div>
          <div className="space-y-3">
            <h2>Cómo se envían</h2>
            <p>
              Esta web no almacena los datos de los formularios. Al enviar una solicitud se abre WhatsApp (o tu aplicación de correo) con
              un mensaje generado en tu propio dispositivo; eres tú quien decide enviarlo. A partir de ese momento, la comunicación se rige
              también por las condiciones de privacidad de WhatsApp o de tu proveedor de correo.
            </p>
          </div>
          <div className="space-y-3">
            <h2>Para qué se usan</h2>
            <p>Para responder a tu solicitud, coordinar y confirmar citas y mantener la comunicación relacionada con tu atención.</p>
          </div>
          <div className="space-y-3">
            <h2>Tus derechos</h2>
            <p>
              Puedes solicitar el acceso, rectificación o eliminación de tus datos, así como oponerte a su uso, escribiendo a {contact.email}.
            </p>
          </div>
          <div className="space-y-3">
            <h2>Servicios de terceros</h2>
            <p>
              Esta web muestra un mapa de Google Maps y enlaces a redes sociales, que pueden aplicar sus propias políticas de privacidad
              cuando interactúas con ellos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
