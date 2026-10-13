import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Monochrome surfaces (near-black neutral)
        navy: {
          950: "#060607",
          900: "#0c0c0e",
          800: "#141417",
          700: "#1f1f24",
        },
        // Monochrome accents: white highlight + soft greys
        glow: {
          DEFAULT: "#e8e8ea", // bright white-grey (was gold)
          soft: "#f4f4f6",    // near-white (was soft gold)
          violet: "#c7c7cc",  // mid grey (was violet accent)
          pink: "#9a9aa2",    // muted grey (was soft highlight)
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 22px rgba(232,232,234,0.22), 0 0 44px rgba(244,244,246,0.12)",
        "glow-lg": "0 0 36px rgba(232,232,234,0.3), 0 0 72px rgba(244,244,246,0.16)",
        "glow-violet": "0 0 24px rgba(199,199,204,0.28), 0 0 48px rgba(154,154,162,0.16)",
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
