"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CalendarHeart, Menu, X } from "lucide-react";
import { navigation, siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Sombra al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sección activa (solo en la portada)
  useEffect(() => {
    if (!isHome) return;
    const ids = navigation.map((n) => n.href.split("#")[1]);
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  // Bloquear scroll y cerrar con Escape cuando el menú móvil está abierto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open ? "bg-cream/90 shadow-[0_1px_0_rgba(37,43,40,0.06)] backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <nav aria-label="Navegación principal" className="container flex h-[var(--nav-height)] items-center justify-between gap-4">
        <a href="/#inicio" className="rounded-full" aria-label={`${siteConfig.professional.name}, ir al inicio`}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 xl:flex">
          {navigation.map((item) => {
            const id = item.href.split("#")[1];
            const isActive = isHome && active === id;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.88rem] font-medium transition-colors duration-300",
                    isActive ? "text-forest" : "text-graphite hover:text-forest"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-forest transition-transform duration-500",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a href="/#reservar" className="btn-primary hidden min-h-[44px] px-6 sm:inline-flex">
            <CalendarHeart className="h-4 w-4" aria-hidden="true" />
            Reservar cita
          </a>
          <a href="/#reservar" className="btn-primary min-h-[42px] px-4 text-[13px] sm:hidden">
            Reservar
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="grid h-11 w-11 place-items-center rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest hover:text-cream xl:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-var(--nav-height))] overflow-y-auto bg-cream xl:hidden"
      >
        <div className="container flex min-h-full flex-col pb-10 pt-6">
          <ul className="flex flex-col">
            {navigation.map((item, i) => (
              <li key={item.href} className="animate-fade-up border-b border-sand/80" style={{ animationDelay: `${i * 40}ms` }}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-display text-[1.65rem] text-ink transition-colors hover:text-forest"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-base text-sage">
                    0{i + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <a href="/#reservar" onClick={() => setOpen(false)} className="btn-primary w-full">
              <CalendarHeart className="h-4 w-4" aria-hidden="true" />
              Reservar una cita
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
              <WhatsAppIcon className="h-5 w-5" />
              Escribir por WhatsApp
            </a>
          </div>
          <SocialLinks className="mt-auto justify-center pt-10" />
        </div>
      </div>
    </header>
  );
}
