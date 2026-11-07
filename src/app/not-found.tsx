import Link from "next/link";
import { ArrowLeft, CalendarHeart } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-[var(--nav-height)]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-sage-light blur-3xl" />
      <div className="container relative text-center">
        <p className="font-display text-[7rem] leading-none text-sage sm:text-[10rem]">404</p>
        <h1 className="mt-4 font-display text-3xl text-ink sm:text-4xl">Esta página no existe</h1>
        <p className="mx-auto mt-4 max-w-md text-graphite">
          Es posible que el enlace haya cambiado. Te invito a volver al inicio o solicitar tu cita directamente.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al inicio
          </Link>
          <a href="/#reservar" className="btn-outline">
            <CalendarHeart className="h-4 w-4" aria-hidden="true" /> Reservar una cita
          </a>
        </div>
      </div>
    </section>
  );
}
