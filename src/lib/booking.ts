/**
 * Lógica de solicitud de citas, independiente de la interfaz.
 *
 * Canal actual: WhatsApp (sin backend). La solicitud NO es una reserva:
 * la cita solo queda confirmada cuando la profesional responde.
 *
 * Para integrar una agenda o base de datos en el futuro, añade un canal
 * "api" que haga POST a /api/bookings con un `BookingRequest`.
 */
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { formatDate } from "@/lib/utils";

export const MODALITIES = [
  { id: "consultorio", label: "Atención en consultorio", description: "Sesión en el consultorio" },
  { id: "domicilio", label: "Atención a domicilio", description: "Sesión en tu hogar" },
  { id: "informativa", label: "Consulta informativa", description: "Resolver dudas antes de empezar" },
] as const;

export type ModalityId = (typeof MODALITIES)[number]["id"];

export function availableModalities() {
  return MODALITIES.filter((m) => m.id !== "domicilio" || siteConfig.contact.homeVisits.enabled);
}

export interface BookingRequest {
  name: string;
  whatsapp: string;
  email: string;
  service: string;
  date: string;
  time: string;
  modality: ModalityId | "";
  message: string;
  consent: boolean;
}

export type BookingErrors = Partial<Record<keyof BookingRequest, string>>;

export const emptyBooking: BookingRequest = {
  name: "",
  whatsapp: "",
  email: "",
  service: "",
  date: "",
  time: "",
  modality: "",
  message: "",
  consent: false,
};

export const MESSAGE_MAX = 500;

function toLocalISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function dateBounds() {
  const today = new Date();
  const max = new Date(today);
  max.setDate(max.getDate() + siteConfig.booking.maxDaysAhead);
  return { min: toLocalISO(today), max: toLocalISO(max) };
}

export function validateBooking(data: BookingRequest): BookingErrors {
  const errors: BookingErrors = {};
  const name = data.name.trim();
  if (name.length < 3) errors.name = "Escribe tu nombre completo.";
  else if (!/^[\p{L}\s'.-]+$/u.test(name)) errors.name = "El nombre solo puede contener letras.";

  const digits = data.whatsapp.replace(/\D/g, "");
  if (!digits) errors.whatsapp = "Indica tu número de WhatsApp.";
  else if (!/^[+\d\s()-]+$/.test(data.whatsapp.trim())) errors.whatsapp = "Usa solo números, espacios o el símbolo +.";
  else if (digits.length < 7 || digits.length > 15) errors.whatsapp = "Revisa el número: debe tener entre 7 y 15 dígitos.";

  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim()))
    errors.email = "El correo no parece válido.";

  if (!data.service) errors.service = "Elige el servicio que te interesa.";

  const { min, max } = dateBounds();
  if (!data.date) errors.date = "Elige una fecha preferida.";
  else if (data.date < min) errors.date = "La fecha no puede ser anterior a hoy.";
  else if (data.date > max) errors.date = `Elige una fecha dentro de los próximos ${siteConfig.booking.maxDaysAhead} días.`;

  if (!data.time) errors.time = "Elige un horario preferido.";
  if (!data.modality) errors.modality = "Elige la modalidad de atención.";
  if (data.message.length > MESSAGE_MAX) errors.message = `El mensaje no puede superar ${MESSAGE_MAX} caracteres.`;
  if (!data.consent) errors.consent = "Necesitamos tu aceptación para usar estos datos y responderte.";
  return errors;
}

export function buildBookingMessage(data: BookingRequest): string {
  const modality = MODALITIES.find((m) => m.id === data.modality)?.label ?? "";
  const lines: Array<string | null> = [
    `Hola, ${siteConfig.professional.firstName}. Quisiera *solicitar una cita*:`,
    "",
    `*Nombre:* ${data.name.trim()}`,
    `*WhatsApp:* ${data.whatsapp.trim()}`,
    data.email.trim() ? `*Correo:* ${data.email.trim()}` : null,
    `*Servicio:* ${data.service}`,
    `*Fecha preferida:* ${formatDate(data.date)}`,
    `*Horario preferido:* ${data.time}`,
    `*Modalidad:* ${modality}`,
    data.message.trim() ? `*Mensaje:* ${data.message.trim()}` : null,
    "",
    "Quedo a la espera de tu confirmación. ¡Gracias!",
  ];
  return lines.filter((l): l is string => l !== null).join("\n");
}

export function bookingWhatsappUrl(data: BookingRequest): string {
  return whatsappUrl(buildBookingMessage(data));
}
