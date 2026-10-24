import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Source_Serif_4,
  Unbounded,
} from "next/font/google";
import localFont from "next/font/local";

// Garage (default) fonts are preloaded; Claude-only families load on demand.
// Retro uses Departure Mono plus system Tahoma / Verdana.
export const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
export const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
export const unbounded = Unbounded({ subsets: ["latin"], weight: "900", variable: "--font-unbounded" });
export const departure = localFont({
  src: "../fonts/DepartureMono-Regular.woff2",
  variable: "--font-departure",
  display: "swap",
});
export const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  preload: false,
});
export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  preload: false,
});

export const fontVariables = [geist, geistMono, unbounded, departure, instrument, sourceSerif]
  .map((f) => f.variable)
  .join(" ");
