import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        sage: { DEFAULT: "#A8B9A5", light: "#DCE4DA", soft: "#EEF2EC" },
        forest: { DEFAULT: "#426C59", dark: "#34574A", deep: "#2B4A3D" },
        cream: "#FAFAF7",
        sand: { DEFAULT: "#E9DFD2", light: "#F4EFE8" },
        blush: { DEFAULT: "#D9B8B2", light: "#F1E4E1" },
        graphite: "#565C59",
        ink: "#252B28",
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(37,43,40,0.04), 0 8px 24px -8px rgba(37,43,40,0.10)",
        lift: "0 2px 4px rgba(37,43,40,0.04), 0 24px 48px -16px rgba(37,43,40,0.18)",
      },
      borderRadius: { "4xl": "2rem" },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "none" } },
        "soft-ping": { "0%": { transform: "scale(1)", opacity: "0.55" }, "80%,100%": { transform: "scale(1.6)", opacity: "0" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "soft-ping": "soft-ping 2.8s cubic-bezier(0,0,0.2,1) infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
