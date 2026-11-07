"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  Home,
  Info,
  Loader2,
  MessageCircleQuestion,
  RotateCcw,
  Stethoscope,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  availableModalities,
  bookingWhatsappUrl,
  dateBounds,
  emptyBooking,
  MESSAGE_MAX,
  validateBooking,
  type BookingErrors,
  type BookingRequest,
} from "@/lib/booking";
import { SELECT_SERVICE_EVENT } from "@/lib/events";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";

type Status = "idle" | "submitting" | "sent" | "error";

const modalityIcons = { consultorio: Stethoscope, domicilio: Home, informativa: MessageCircleQuestion } as const;

/** Tiempo mínimo (ms) para completar el formulario; envíos más rápidos se consideran automáticos. */
const MIN_FILL_TIME = 3000;

export function Booking({ services }: { services: string[] }) {
  const [data, setData] = useState<BookingRequest>(emptyBooking);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof BookingRequest, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [waUrl, setWaUrl] = useState("");
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [bounds, setBounds] = useState({ min: "", max: "" });
  const startedAt = useRef<number>(Date.now());
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const modalities = availableModalities();
  const { firstName } = siteConfig.professional;

  // Las fechas se calculan en el cliente para respetar la zona horaria del paciente.
  useEffect(() => setBounds(dateBounds()), []);

  // Preselección de servicio desde las tarjetas de especialidades/tratamientos
  useEffect(() => {
    const onSelect = (e: Event) => {
      const service = (e as CustomEvent<string>).detail;
      if (services.includes(service)) {
        setData((d) => ({ ...d, service }));
        setErrors((er) => ({ ...er, service: undefined }));
        setStatus((s) => (s === "sent" ? "idle" : s));
      }
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, [services]);

  function update<K extends keyof BookingRequest>(key: K, value: BookingRequest[K]) {
    const next = { ...data, [key]: value };
    setData(next);
    if (touched[key] || errors[key]) {
      setErrors((er) => ({ ...er, [key]: validateBooking(next)[key] }));
    }
  }

  function blur(key: keyof BookingRequest) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((er) => ({ ...er, [key]: validateBooking(data)[key] }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    // Protección básica contra spam: campo trampa + tiempo mínimo de llenado.
    if (honeypot.current?.value || Date.now() - startedAt.current < MIN_FILL_TIME) {
      setStatus("error");
      return;
    }

    const found = validateBooking(data);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(data).map((k) => [k, true])));
    const firstError = Object.keys(found).find((k) => found[k as keyof BookingRequest]);
    if (firstError) {
      const field = formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`);
      field?.focus();
      return;
    }

    setStatus("submitting");
    const url = bookingWhatsappUrl(data);
    setWaUrl(url);

    // Se abre de forma síncrona (dentro del clic) para evitar bloqueos de ventanas emergentes.
    let win: Window | null = null;
    try {
      win = window.open(url, "_blank");
      if (win) win.opener = null;
    } catch {
      win = null;
    }
    setPopupBlocked(!win);

    window.setTimeout(() => setStatus("sent"), 700);
  }

  // Mover el foco al mensaje de confirmación para lectores de pantalla
  useEffect(() => {
    if (status === "sent") resultRef.current?.focus();
  }, [status]);

  function reset() {
    setData(emptyBooking);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setPopupBlocked(false);
    startedAt.current = Date.now();
  }

  const err = (k: keyof BookingRequest) => (touched[k] || status === "error" ? errors[k] : undefined);
  const fieldProps = (k: keyof BookingRequest) => ({
    id: `${uid}-${k}`,
    name: k,
    "aria-invalid": err(k) ? true : undefined,
    "aria-describedby": err(k) ? `${uid}-${k}-error` : undefined,
  });
  const ErrorText = ({ k }: { k: keyof BookingRequest }) =>
    err(k) ? (
      <p id={`${uid}-${k}-error`} className="field-error">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {err(k)}
      </p>
    ) : null;

  return (
    <section id="reservar" aria-labelledby="booking-title" className="section relative overflow-hidden bg-sage-soft">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-blush-light blur-3xl" />
      <div className="container relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Reserva de citas</p>
          <h2 id="booking-title" className="mt-4 font-display text-[2rem] leading-[1.15] text-ink sm:text-[2.6rem]">
            Solicita tu cita <em className="text-forest">en pocos pasos</em>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-graphite sm:text-lg">
            Completa el formulario y se abrirá WhatsApp con tu solicitud lista para enviar. Te responderé personalmente para confirmar
            el día y la hora.
          </p>

          <ol className="mt-10 space-y-6">
            {[
              ["Completa tus datos", "Solo lo necesario para poder contactarte."],
              ["Envía la solicitud por WhatsApp", "El mensaje se genera automáticamente."],
              ["Recibe la confirmación", `${firstName} revisará su agenda y te confirmará la cita.`],
            ].map(([title, text], i) => (
              <li key={title} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-forest/25 font-display text-forest">{i + 1}</span>
                <div>
                  <p className="font-semibold text-ink">{title}</p>
                  <p className="text-sm text-graphite">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-10 flex gap-3 rounded-2xl border border-forest/15 bg-white/60 p-4 text-sm leading-relaxed text-graphite">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
            Tu solicitud no es una reserva confirmada. La cita queda agendada solo cuando recibes la confirmación.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={80}>
          <div className="rounded-[2rem] bg-white p-6 shadow-lift sm:p-10">
            {status === "sent" ? (
              <div ref={resultRef} tabIndex={-1} role="status" className="py-6 text-center outline-none sm:py-10">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-light text-forest">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-[1.8rem] text-ink">¡Tu solicitud está lista!</h3>
                <p className="mx-auto mt-3 max-w-md leading-relaxed text-graphite">
                  {popupBlocked
                    ? "Tu navegador no permitió abrir WhatsApp automáticamente. Pulsa el botón para abrir el mensaje y enviarlo."
                    : "Se abrió WhatsApp con tu mensaje. Recuerda pulsar «Enviar» en WhatsApp para completar la solicitud."}
                </p>
                <p className="mx-auto mt-4 max-w-md rounded-2xl bg-sand-light p-4 text-sm text-graphite">
                  <strong className="text-ink">Importante:</strong> tu cita aún no está confirmada. {firstName} te responderá para
                  confirmar disponibilidad.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                    <WhatsAppIcon className="h-5 w-5" />
                    {popupBlocked ? "Abrir WhatsApp" : "Abrir WhatsApp de nuevo"}
                  </a>
                  <button type="button" onClick={reset} className="btn-outline">
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Nueva solicitud
                  </button>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate aria-describedby={`${uid}-required`} className="relative">
                <p id={`${uid}-required`} className="mb-6 text-xs text-graphite">
                  Los campos marcados con <span className="text-forest">*</span> son obligatorios.
                </p>

                {status === "error" && (
                  <div role="alert" className="mb-6 flex gap-3 rounded-2xl bg-[#FBF3F1] p-4 text-sm text-[#A04B40]">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    No pudimos procesar la solicitud. Revisa los datos e inténtalo de nuevo en unos segundos.
                  </div>
                )}

                {/* Campo trampa anti-spam: invisible para personas */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor={`${uid}-website`}>No completar este campo</label>
                  <input ref={honeypot} id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor={`${uid}-name`} className="field-label">
                      Nombre completo <span className="text-forest">*</span>
                    </label>
                    <input
                      {...fieldProps("name")}
                      type="text"
                      autoComplete="name"
                      className="field"
                      placeholder="Tu nombre y apellido"
                      value={data.name}
                      maxLength={80}
                      onChange={(e) => update("name", e.target.value)}
                      onBlur={() => blur("name")}
                    />
                    <ErrorText k="name" />
                  </div>

                  <div>
                    <label htmlFor={`${uid}-whatsapp`} className="field-label">
                      Número de WhatsApp <span className="text-forest">*</span>
                    </label>
                    <input
                      {...fieldProps("whatsapp")}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      className="field"
                      placeholder="+00 000 000 000"
                      value={data.whatsapp}
                      maxLength={20}
                      onChange={(e) => update("whatsapp", e.target.value)}
                      onBlur={() => blur("whatsapp")}
                    />
                    <ErrorText k="whatsapp" />
                  </div>

                  <div>
                    <label htmlFor={`${uid}-email`} className="field-label">
                      Correo electrónico <span className="font-normal text-graphite">(opcional)</span>
                    </label>
                    <input
                      {...fieldProps("email")}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      className="field"
                      placeholder="tu@correo.com"
                      value={data.email}
                      maxLength={120}
                      onChange={(e) => update("email", e.target.value)}
                      onBlur={() => blur("email")}
                    />
                    <ErrorText k="email" />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor={`${uid}-service`} className="field-label">
                      Servicio solicitado <span className="text-forest">*</span>
                    </label>
                    <div className="relative">
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-forest" aria-hidden="true" />
                    <select
                      {...fieldProps("service")}
                      className={cn("field appearance-none pr-11", !data.service && "text-graphite/60")}
                      value={data.service}
                      onChange={(e) => update("service", e.target.value)}
                      onBlur={() => blur("service")}
                    >
                      <option value="" disabled>
                        Selecciona un servicio
                      </option>
                      {services.map((s) => (
                        <option key={s} value={s} className="text-ink">
                          {s}
                        </option>
                      ))}
                    </select>
                    </div>
                    <ErrorText k="service" />
                  </div>

                  <div>
                    <label htmlFor={`${uid}-date`} className="field-label">
                      <CalendarDays className="mr-1.5 inline h-4 w-4 align-[-3px] text-forest" aria-hidden="true" />
                      Fecha preferida <span className="text-forest">*</span>
                    </label>
                    <input
                      {...fieldProps("date")}
                      type="date"
                      className="field"
                      min={bounds.min || undefined}
                      max={bounds.max || undefined}
                      value={data.date}
                      onChange={(e) => update("date", e.target.value)}
                      onBlur={() => blur("date")}
                    />
                    <ErrorText k="date" />
                  </div>

                  <fieldset>
                    <legend className="field-label">
                      <Clock className="mr-1.5 inline h-4 w-4 align-[-3px] text-forest" aria-hidden="true" />
                      Horario preferido <span className="text-forest">*</span>
                    </legend>
                    <div className="grid grid-cols-2 gap-2">
                      {siteConfig.booking.timeSlots.map((slot, i) => (
                        <label
                          key={slot}
                          className={cn(
                            "flex min-h-[48px] cursor-pointer items-center justify-center rounded-xl border px-2 text-center text-sm font-medium transition-all",
                            data.time === slot ? "border-forest bg-forest text-cream" : "border-sand bg-cream/70 text-graphite hover:border-sage",
                            err("time") && data.time !== slot && "border-[#B5574B]/50"
                          )}
                        >
                          <input
                            type="radio"
                            name="time"
                            value={slot}
                            checked={data.time === slot}
                            onChange={() => {
                              update("time", slot);
                              setTouched((t) => ({ ...t, time: true }));
                            }}
                            className="sr-only"
                            aria-describedby={i === 0 && err("time") ? `${uid}-time-error` : undefined}
                          />
                          {slot}
                        </label>
                      ))}
                    </div>
                    <ErrorText k="time" />
                  </fieldset>

                  <fieldset className="sm:col-span-2">
                    <legend className="field-label">
                      Modalidad de atención <span className="text-forest">*</span>
                    </legend>
                    <div className={cn("grid gap-3", modalities.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
                      {modalities.map((m, i) => {
                        const ModIcon = modalityIcons[m.id];
                        const checked = data.modality === m.id;
                        return (
                          <label
                            key={m.id}
                            className={cn(
                              "relative flex cursor-pointer gap-3 rounded-2xl border p-4 transition-all sm:flex-col sm:gap-2",
                              checked ? "border-forest bg-sage-soft ring-1 ring-forest" : "border-sand bg-cream/70 hover:border-sage",
                              err("modality") && !checked && "border-[#B5574B]/50"
                            )}
                          >
                            <input
                              type="radio"
                              name="modality"
                              value={m.id}
                              checked={checked}
                              onChange={() => {
                                update("modality", m.id);
                                setTouched((t) => ({ ...t, modality: true }));
                              }}
                              className="peer sr-only"
                              aria-describedby={i === 0 && err("modality") ? `${uid}-modality-error` : undefined}
                            />
                            <ModIcon className={cn("h-5 w-5 shrink-0", checked ? "text-forest" : "text-sage")} aria-hidden="true" />
                            <span>
                              <span className="block text-sm font-semibold text-ink">{m.label}</span>
                              <span className="block text-xs text-graphite">{m.description}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-0 rounded-2xl peer-focus-visible:ring-2 peer-focus-visible:ring-forest peer-focus-visible:ring-offset-2" />
                          </label>
                        );
                      })}
                    </div>
                    <ErrorText k="modality" />
                  </fieldset>

                  <div className="sm:col-span-2">
                    <label htmlFor={`${uid}-message`} className="field-label">
                      Mensaje adicional <span className="font-normal text-graphite">(opcional)</span>
                    </label>
                    <textarea
                      {...fieldProps("message")}
                      rows={4}
                      className="field resize-y"
                      placeholder="Cuéntame brevemente el motivo de tu consulta o cualquier dato útil para coordinar."
                      value={data.message}
                      maxLength={MESSAGE_MAX + 50}
                      onChange={(e) => update("message", e.target.value)}
                      onBlur={() => blur("message")}
                    />
                    <div className="mt-1.5 flex justify-between gap-4 text-xs text-graphite">
                      <span>No es necesario que incluyas información médica detallada.</span>
                      <span className={cn("tabular-nums", data.message.length > MESSAGE_MAX && "text-[#A04B40]")}>
                        {data.message.length}/{MESSAGE_MAX}
                      </span>
                    </div>
                    <ErrorText k="message" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-graphite">
                      <input
                        {...fieldProps("consent")}
                        type="checkbox"
                        checked={data.consent}
                        onChange={(e) => {
                          update("consent", e.target.checked);
                          setTouched((t) => ({ ...t, consent: true }));
                        }}
                        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-forest"
                      />
                      <span>
                        Acepto que mis datos se usen únicamente para gestionar esta solicitud, según el{" "}
                        <a href="/privacidad" target="_blank" className="font-semibold text-forest underline underline-offset-2">
                          aviso de privacidad
                        </a>
                        . <span className="text-forest">*</span>
                      </span>
                    </label>
                    <ErrorText k="consent" />
                  </div>
                </div>

                <button type="submit" disabled={status === "submitting"} className="btn-primary mt-8 w-full text-[0.95rem]" aria-live="polite">
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Preparando tu solicitud…
                    </>
                  ) : (
                    <>
                      <WhatsAppIcon className="h-5 w-5" />
                      Enviar solicitud por WhatsApp
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-xs text-graphite">Se abrirá WhatsApp con tu mensaje listo para enviar.</p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
