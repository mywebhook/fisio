import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.professional.name} · ${siteConfig.professional.title}`,
    short_name: siteConfig.professional.firstName,
    description: siteConfig.professional.intro,
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF7",
    theme_color: "#426C59",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
