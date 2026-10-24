export type ProjectCategory = "assignment" | "for-fun" | "startup" | "client";

export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  assignment: "Assignment",
  "for-fun": "For fun",
  startup: "Startup",
  client: "Client work",
};

export type Project = {
  slug: string;
  title: string;
  kind: string;
  category: ProjectCategory;
  blurb: string;
  tags: string[];
  cover: string;
  /** When the project started (YYYY-MM-DD). The list is sorted newest first. */
  date: string;
  demo: string;
  /** Label for the `demo` link. Defaults to "Live demo". */
  demoLabel?: string;
  repo?: string;
};

// ✏️ Add or edit projects here. `cover` is a screenshot in /public/covers.
const list: Project[] = [
  {
    slug: "dynamic-island",
    title: "Dynamic Island for Windows",
    kind: "Desktop app",
    category: "for-fun",
    blurb:
      "The iPhone's Dynamic Island, rebuilt natively for Windows 10 and 11. A little black island that morphs with spring physics to show now playing (any app), volume, charging, the clock and weather. About 3 MB of memory when idle and zero NuGet packages.",
    tags: ["C#", "WPF", ".NET 10", "Win32 interop", "Core Audio"],
    cover: "/covers/dynamic-island.png",
    date: "2026-10-22",
    demo: "https://github.com/arlxaa/DynamicIslandd/releases/latest",
    demoLabel: "Download",
    repo: "https://github.com/arlxaa/DynamicIslandd",
  },
  {
    slug: "club-lights",
    title: "Club Lights",
    kind: "Web app",
    category: "for-fun",
    blurb:
      "A music-reactive light show web app. Turns live audio into real-time visuals: six light scenes driven by a microphone pipeline, plus a Spotify mode (PKCE auth + Web Playback SDK). Zero-cost, fully client-side.",
    tags: ["React", "TypeScript", "Vite", "Web Audio API", "Spotify API"],
    cover: "/covers/club-lights.png",
    date: "2026-10-14",
    demo: "https://jedagjedug.vercel.app/",
  },
  {
    slug: "good-old-bakery",
    title: "Good Old Bakery",
    kind: "Website",
    category: "assignment",
    blurb:
      "Final project for Human–Computer Interaction. A multi-page bakery website built around user-centered design: clear navigation, product filtering, a location finder, and form validation.",
    tags: ["HTML", "CSS", "JavaScript", "Figma", "UI/UX"],
    cover: "/covers/bakery.png",
    date: "2026-10-13",
    demo: "https://bakery-hci.vercel.app/",
  },
  {
    slug: "lucky-jackpot88",
    title: "Lucky Jackpot88",
    kind: "Browser game",
    category: "for-fun",
    blurb:
      "A single-player virtual circus arcade (no real money). Four games (slots with 5 paylines, a 3D coin pusher, scratch cards, roulette) plus a coin-catch rescue mode, Google login, and a global leaderboard.",
    tags: ["React", "TypeScript", "Three.js", "Firebase", "Tailwind"],
    cover: "/covers/lucky-jackpot88.png",
    date: "2026-10-16",
    demo: "https://luckyjackpot88.vercel.app/",
    repo: "https://github.com/arlxaa/luckyjackpot88",
  },
];

// Newest first.
export const projects = [...list].sort((a, b) => b.date.localeCompare(a.date));

export const hostOf = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
