import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Purple surfaces (near-black violet)
        navy: {
          950: "#0b0714",
          900: "#120b1f",
          800: "#1b1230",
          700: "#271a44",
        },
        // Starlight gold accents + soft highlight
        glow: {
          DEFAULT: "#D4B06A", // starlight gold
          soft: "#F0D79A",    // soft gold
          violet: "#a882ff",  // lavender/violet accent
          pink: "#C7D2E0",    // soft highlight
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 22px rgba(212,176,106,0.35), 0 0 44px rgba(240,215,154,0.18)",
        "glow-lg": "0 0 36px rgba(212,176,106,0.45), 0 0 72px rgba(232,197,132,0.25)",
        "glow-violet": "0 0 24px rgba(139,92,246,0.45), 0 0 48px rgba(124,58,237,0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out forwards",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
