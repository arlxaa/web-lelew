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
  demo: string;
  repo?: string;
};

// ✏️ Add or edit projects here. `cover` is a screenshot in /public/covers.
export const projects: Project[] = [
  {
    slug: "club-lights",
    title: "Club Lights",
    kind: "Web app",
    category: "for-fun",
    blurb:
      "A music-reactive light show web app. Turns live audio into real-time visuals: six light scenes driven by a microphone pipeline, plus a Spotify mode (PKCE auth + Web Playback SDK). Zero-cost, fully client-side.",
    tags: ["React", "TypeScript", "Vite", "Web Audio API", "Spotify API"],
    cover: "/covers/club-lights.png",
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
    demo: "https://luckyjackpot88.vercel.app/",
    repo: "https://github.com/arlxaa/luckyjackpot88",
  },
];

export const hostOf = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
