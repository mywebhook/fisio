import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/** Imagen Open Graph (vista previa al compartir en WhatsApp, Facebook, etc.). */
export const alt = `${siteConfig.professional.name} · ${siteConfig.professional.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { professional, contact } = siteConfig;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FAFAF7",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        <div style={{ position: "absolute", right: -120, top: -120, width: 560, height: 560, borderRadius: 9999, background: "#DCE4DA" }} />
        <div style={{ position: "absolute", left: -80, bottom: -160, width: 380, height: 380, borderRadius: 9999, background: "#F1E4E1" }} />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 18, background: "#426C59" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 96px", position: "relative" }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#426C59", textTransform: "uppercase", fontFamily: "sans-serif" }}>
            {`${professional.title} · ${contact.address.city}`}
          </div>
          <div style={{ display: "flex", fontSize: 92, color: "#252B28", marginTop: 24, lineHeight: 1.05 }}>{professional.name}</div>
          <div style={{ display: "flex", fontSize: 36, color: "#34574A", marginTop: 32, maxWidth: 900, fontStyle: "italic", lineHeight: 1.35 }}>
            {`“${professional.tagline}”`}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 48,
              background: "#426C59",
              color: "#FAFAF7",
              fontSize: 26,
              padding: "16px 36px",
              borderRadius: 999,
              alignSelf: "flex-start",
              fontFamily: "sans-serif",
            }}
          >
            Solicita tu cita por WhatsApp
          </div>
        </div>
      </div>
    ),
    size
  );
}
