/** Comunicación entre secciones: preseleccionar un servicio en el formulario de citas. */
export const SELECT_SERVICE_EVENT = "fisio:select-service";

export function requestService(service: string) {
  window.dispatchEvent(new CustomEvent<string>(SELECT_SERVICE_EVENT, { detail: service }));
  document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
