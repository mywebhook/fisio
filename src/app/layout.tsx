import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { siteConfig } from "@/config/site";
import { countPlaceholders } from "@/lib/placeholders";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { DevNotice } from "@/components/layout/DevNotice";
import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display", style: ["normal", "italic"], display: "swap" });

const { professional, seo, url } = siteConfig;
const title = `${professional.name} | ${seo.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { default: title, template: `%s | ${professional.name} · ${professional.title}` },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: professional.name }],
  creator: professional.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url,
    siteName: `${professional.name} · ${professional.title}`,
    title,
    description: seo.description,
  },
  twitter: { card: "summary_large_image", title, description: seo.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
        >
          Saltar al contenido
        </a>
        <Navbar />
        <main id="contenido">{children}</main>
        <Footer />
        <FloatingActions />
        {process.env.NODE_ENV === "development" && <DevNotice count={countPlaceholders()} />}
      </body>
    </html>
  );
}
