import { about, profile, socials } from "@/content/profile";
import { projects } from "@/content/projects";
import { achievements } from "@/content/achievements";
import { organizations } from "@/content/journey";

// "Ask Lele" is offline: keyword intents mapped to pre-written answers.
// ✏️ Add an intent by giving it keywords and an answer.

export const QUICK_QUESTIONS = [
  "What are you studying?",
  "Which projects did you build?",
  "Tell me about your awards",
  "How do I contact you?",
];

export type ChatAction = { label: string; kind: "app" | "link" | "section"; target: string };
export type ChatAnswer = { text: string; actions?: ChatAction[] };

const wins = achievements.filter((a) => /1st|2nd|gold/i.test(a.rank));

const INTENTS: { keys: string[]; answer: () => ChatAnswer }[] = [
  {
    keys: ["hi", "hello", "hey", "halo", "hai"],
    answer: () => ({
      text: `Hi! I'm Clawd, ${profile.nickname}'s desk pet. Ask me about her studies, projects, awards, or how to reach her.`,
    }),
  },
  {
    keys: ["study", "studying", "binus", "university", "gpa", "major", "school", "college", "kuliah"],
    answer: () => ({
      text: `${profile.nickname} studies Computer Science at ${profile.schoolLong} with a GPA of ${profile.gpa} / ${profile.gpaMax}. Before that: SMA Ignatius Slamet Riyadi Karawang (Natural Sciences, final grade 94.21).`,
      actions: [{ label: "Open journey.log", kind: "app", target: "journey" }],
    }),
  },
  {
    keys: ["vibe", "localhost", "now", "current", "doing", "work"],
    answer: () => ({
      text: `Right now she's a ${profile.now.title} at ${profile.now.place} (yes, 127.0.0.1), building side projects, plus an S-Class member of PETIR Cyber Security at BINUS.`,
    }),
  },
  {
    keys: ["project", "projects", "build", "built", "made", "portfolio", "app"],
    answer: () => ({
      text: `She has built ${projects.map((p) => p.title).join(", ")}. ${projects[0].title} turns live audio into light shows; ${projects[2].title} is a browser arcade with a 3D coin pusher.`,
      actions: [{ label: "See projects", kind: "section", target: "projects" }],
    }),
  },
  {
    keys: ["award", "awards", "win", "won", "champion", "competition", "prize", "medal"],
    answer: () => ({
      text: `${wins.length} podium finishes so far, including ${wins[0].title}. ${achievements.length} competitions on record across tech & design and Taekwondo.`,
      actions: [{ label: "Open achievements.xls", kind: "app", target: "awards" }],
    }),
  },
  {
    keys: ["taekwondo", "poomsae", "belt", "sport", "athlete", "martial"],
    answer: () => ({
      text: "She's a Poomsae athlete with a 1st Dan black belt: 8+ years of competition (2017–2026), including a West Java regional gold and two 1st-place / best-player finishes in 2024.",
    }),
  },
  {
    keys: ["cyber", "security", "forensic", "forensics", "osint", "petir", "hack"],
    answer: () => ({
      text: "Cybersecurity is a big interest: she's an S-Class member of PETIR Cyber Security, focusing on Digital Forensics and OSINT.",
    }),
  },
  {
    keys: ["ai", "artificial", "intelligence", "machine", "ml", "llm"],
    answer: () => ({
      text: "AI is the field she's exploring most, alongside cybersecurity. She's also part of BINUS Robotics & AI Network (BRAIN).",
    }),
  },
  {
    keys: ["skill", "skills", "stack", "language", "tech", "tools"],
    answer: () => ({
      text: "C, HTML/CSS/JS, React + TypeScript, data structures, numerical computing, digital forensics & OSINT, and UI/UX in Figma.",
      actions: [{ label: "See skills", kind: "section", target: "skills" }],
    }),
  },
  {
    keys: ["org", "organization", "organizations", "club", "community"],
    answer: () => ({ text: `She's active in ${organizations.length} organizations: ${organizations.join(", ")}.` }),
  },
  {
    keys: ["contact", "email", "reach", "hire", "intern", "internship", "collab", "message"],
    answer: () => ({
      text: `Email ${profile.email}, or find her on ${socials.map((s) => s.label).join(" / ")}.`,
      actions: [
        { label: "Write a message", kind: "app", target: "mail" },
        { label: "GitHub", kind: "link", target: socials[0].href },
      ],
    }),
  },
  {
    keys: ["site", "website", "this", "made this", "theme", "design"],
    answer: () => ({
      text: "LELE.OS is built with Next.js. The desktop takes after rubens.design, the terminal and timeline after bryangarage.dev, and the boot sequence after sibaldesign.com. Try the Glass / Garage / Claude switch up top.",
    }),
  },
  {
    keys: ["pet", "clawd", "claude", "you"],
    answer: () => ({ text: "I'm Clawd! I live on top of the terminal. I nap a lot. Click me for hearts." }),
  },
  {
    keys: ["who", "about", "yourself", "lele", "celestyn"],
    answer: () => ({ text: about.bio, actions: [{ label: "Open about_me.txt", kind: "app", target: "about" }] }),
  },
];

const words = (s: string) => s.toLowerCase().replace(/[^a-z0-9.\s]/g, " ").split(/\s+/).filter(Boolean);

export function answer(question: string): ChatAnswer {
  const w = new Set(words(question));
  let best: ChatAnswer | null = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    const s = intent.keys.reduce((n, k) => n + (w.has(k) ? 2 : question.toLowerCase().includes(k) && k.length > 3 ? 1 : 0), 0);
    if (s > bestScore) {
      bestScore = s;
      best = intent.answer();
    }
  }
  return (
    best ?? {
      text: "I don't know that one yet. Try asking about her projects, awards, Taekwondo, or how to reach her.",
    }
  );
}
