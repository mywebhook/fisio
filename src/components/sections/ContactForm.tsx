"use client";

import { useId, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { isPlaceholder } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Formulario de contacto breve. Envía la consulta por WhatsApp o por correo (sin almacenar datos). */
export function ContactForm() {
  const uid = useId();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [sent, setSent] = useState(false);
  const startedAt = useRef(Date.now());
  const trap = useRef<HTMLInputElement>(null);
  const emailEnabled = !isPlaceholder(siteConfig.contact.email);

  function validate() {
    const e: typeof errors = {};
    if (name.trim().length < 2) e.name = "Escribe tu nombre.";
    if (message.trim().length < 5) e.message = "Escribe tu consulta.";
    else if (message.length > 600) e.message = "Máximo 600 caracteres.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function send(channel: "whatsapp" | "email") {
    if (trap.current?.value || Date.now() - startedAt.current < 2000) return;
    if (!validate()) return;
    const text = `Hola, ${siteConfig.professional.firstName}. Soy ${name.trim()}.\n\n${message.trim()}`;
    const url =
      channel === "whatsapp"
        ? whatsappUrl(text)
        : `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Consulta desde la web")}&body=${encodeURIComponent(text)}`;
    if (channel === "whatsapp") {
      const win = window.open(url, "_blank");
      if (win) win.opener = null;
      else window.location.href = url;
    } else {
      window.location.href = url;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="rounded-3xl bg-sage-soft p-6 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-forest" aria-hidden="true" />
        <p className="mt-3 font-semibold text-ink">Tu mensaje está listo para enviarse.</p>
        <p className="mt-1 text-sm text-graphite">Confirma el envío en la aplicación que se abrió.</p>
        <button type="button" onClick={() => { setSent(false); setMessage(""); }} className="btn-outline mt-5">
          Escribir otro mensaje
        </button>
      </div>
    );
  }

  const ErrorText = ({ id, text }: { id: string; text?: string }) =>
    text ? (
      <p id={id} className="field-error">
        <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" /> {text}
      </p>
    ) : null;

  return (
    <form className="relative space-y-4" noValidate onSubmit={(e) => { e.preventDefault(); send("whatsapp"); }} aria-label="Formulario de contacto">
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input ref={trap} type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor={`${uid}-n`} className="field-label">Nombre</label>
        <input
          id={`${uid}-n`}
          className="field"
          autoComplete="name"
          value={name}
          maxLength={80}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${uid}-ne` : undefined}
        />
        <ErrorText id={`${uid}-ne`} text={errors.name} />
      </div>
      <div>
        <label htmlFor={`${uid}-m`} className="field-label">Tu consulta</label>
        <textarea
          id={`${uid}-m`}
          rows={3}
          className="field resize-y"
          value={message}
          maxLength={650}
          placeholder="¿En qué puedo ayudarte?"
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${uid}-me` : undefined}
        />
        <ErrorText id={`${uid}-me`} text={errors.message} />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="btn-whatsapp flex-1">
          <WhatsAppIcon className="h-5 w-5" /> Enviar por WhatsApp
        </button>
        {emailEnabled && (
          <button type="button" onClick={() => send("email")} className="btn-outline flex-1">
            <Mail className="h-4 w-4" aria-hidden="true" /> Enviar por correo
          </button>
        )}
      </div>
    </form>
  );
}
