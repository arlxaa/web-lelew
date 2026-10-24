import { about, profile, socials, stats } from "@/content/profile";
import { hostOf, projects } from "@/content/projects";
import { achievements } from "@/content/achievements";
import { formatMonth, journey } from "@/content/journey";
import { skills } from "@/content/skills";
import { offscreen } from "@/content/offscreen";
import { isThemeId, THEMES, type ThemeId } from "@/lib/themes";

export type Line =
  | { kind: "in"; text: string }
  | { kind: "out"; text: string; tone?: "dim" | "accent" | "ok" | "err" }
  | { kind: "link"; text: string; href: string };

export type TermEffect =
  | { type: "theme"; theme: ThemeId }
  | { type: "open"; app: "mail" | "gallery" | "chat" | "about" | "journey" | "awards" }
  | { type: "section"; id: string }
  | { type: "pet"; mood: "happy" | "sleep" | "wave" }
  | { type: "clear" }
  | { type: "exit" };

export const PROMPT = "lele@os ~ %";

const out = (text: string, tone?: "dim" | "accent" | "ok" | "err"): Line => ({ kind: "out", text, tone });

const HELP: [string, string][] = [
  ["whoami", "who is this"],
  ["about", "the short bio"],
  ["now", "what she's doing now"],
  ["projects", "things she built"],
  ["awards", "competitions & medals"],
  ["journey", "experience timeline"],
  ["skills", "the toolbox"],
  ["music", "what's on repeat"],
  ["contact", "say hi"],
  ["theme <retro|garage|claude>", "switch era"],
  ["pet | nap | wake", "talk to Clawd"],
  ["open <app>", "open a window (try: open gallery)"],
  ["clear", "clean the screen"],
];

export const COMMANDS = [
  "help", "whoami", "about", "now", "projects", "awards", "journey", "skills", "contact",
  "theme", "music", "pet", "nap", "wake", "open", "clear", "date", "gpa", "socials", "sudo", "exit", "ls",
];

export function run(raw: string, now: number): { lines: Line[]; effects: TermEffect[] } {
  const [cmd = "", ...args] = raw.trim().split(/\s+/);
  const c = cmd.toLowerCase();
  const lines: Line[] = [];
  const effects: TermEffect[] = [];

  switch (c) {
    case "":
      break;
    case "help":
      lines.push(out("available commands:", "dim"));
      HELP.forEach(([k, v]) => lines.push(out(`  ${k.padEnd(28)} ${v}`)));
      break;
    case "whoami":
      lines.push(out(`${profile.name} (${profile.nickname})`, "accent"));
      lines.push(out(`${profile.role} @ ${profile.school} · ${profile.now.title} @ ${profile.now.place}`));
      break;
    case "about":
      lines.push(out(about.bio));
      break;
    case "now":
      lines.push(out(`${profile.now.title} at ${profile.now.place} since ${profile.now.since}`, "accent"));
      journey.filter((j) => !j.end).forEach((j) => lines.push(out(`  ● ${j.role} — ${j.org}`)));
      break;
    case "ls":
      lines.push(out("about_me.txt  journey.log  achievements.xls  certificates.exe  message.eml  projects/"));
      break;
    case "projects":
      projects.forEach((p, i) => {
        lines.push(out(`${String(i + 1).padStart(2, "0")}  ${p.title} — ${p.kind}`, "accent"));
        lines.push({ kind: "link", text: `    ${hostOf(p.demo)}`, href: p.demo });
      });
      effects.push({ type: "section", id: "projects" });
      break;
    case "awards":
      achievements.forEach((a) => lines.push(out(`  ${a.date.padEnd(9)} ${a.rank.padEnd(21)} ${a.event}`)));
      break;
    case "journey":
      journey.forEach((j) =>
        lines.push(out(`  [${formatMonth(j.start)} – ${j.end ? formatMonth(j.end) : "now"}] ${j.role} · ${j.short}`)),
      );
      break;
    case "skills":
      lines.push(out(skills.map((s) => s.name).join(" · ")));
      break;
    case "music":
    case "hobbies": {
      offscreen.forEach((r) => {
        lines.push(out(r.label.toLowerCase(), "dim"));
        r.items.forEach((it) => lines.push(out(`  ${r.loop ? "♪ " : "· "}${it.text}${it.sub ? ` — ${it.sub}` : ""}`, r.loop ? "accent" : undefined)));
      });
      effects.push({ type: "section", id: "offscreen" });
      break;
    }
    case "gpa":
      lines.push(out(`${profile.gpa} / ${profile.gpaMax}  ${"█".repeat(20)}${"░".repeat(1)}`, "ok"));
      break;
    case "date":
      lines.push(out(new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "medium", timeZone: profile.timezone }).format(now)));
      break;
    case "socials":
    case "contact":
      lines.push(out(`email   ${profile.email}`, "accent"));
      socials.forEach((s) => lines.push({ kind: "link", text: `${s.label.toLowerCase().padEnd(8)}${s.handle}`, href: s.href }));
      if (c === "contact") effects.push({ type: "open", app: "mail" });
      break;
    case "theme": {
      const t = args[0]?.toLowerCase();
      if (isThemeId(t)) {
        effects.push({ type: "theme", theme: t });
        lines.push(out(`switching to ${t}…`, "ok"));
      } else lines.push(out(`usage: theme ${THEMES.map((x) => x.id).join("|")}`, "err"));
      break;
    }
    case "pet":
      effects.push({ type: "pet", mood: "happy" });
      lines.push(out("Clawd: ♥ ♥ ♥", "accent"));
      break;
    case "nap":
      effects.push({ type: "pet", mood: "sleep" });
      lines.push(out("Clawd curls up. zZ", "dim"));
      break;
    case "wake":
      effects.push({ type: "pet", mood: "wave" });
      lines.push(out("Clawd: hi hi!", "accent"));
      break;
    case "open": {
      const app = args[0]?.toLowerCase();
      const ok = ["mail", "gallery", "chat", "about", "journey", "awards"] as const;
      const found = ok.find((a) => a === app);
      if (found) {
        effects.push({ type: "open", app: found });
        lines.push(out(`opening ${found}…`, "ok"));
      } else lines.push(out(`usage: open ${ok.join("|")}`, "err"));
      break;
    }
    case "sudo":
      lines.push(out("permission denied: nice try. Clawd is watching.", "err"));
      break;
    case "clear":
      effects.push({ type: "clear" });
      break;
    case "exit":
      effects.push({ type: "exit" });
      break;
    default:
      lines.push(out(`zsh: command not found: ${cmd}. Try 'help'.`, "err"));
  }
  return { lines, effects };
}

export const BOOT_SCRIPT: { at: number; task: string; result: string; tone?: "wry" | "ok" }[] = [
  { at: 3, task: "mounting /dev/coffee", result: "OK" },
  { at: 10, task: `loading gpa.meter (${stats[0].value})`, result: "OK" },
  { at: 18, task: "spawning 6 organizations", result: "OK" },
  { at: 28, task: "aligning sleep schedule", result: "3 of 4", tone: "wry" },
  { at: 37, task: "waking up clawd", result: "*yawn*", tone: "ok" },
];
export const BOOT_TICKS = 44;

export const ASCII_LOGO = [
  "██╗     ███████╗██╗     ███████╗",
  "██║     ██╔════╝██║     ██╔════╝",
  "██║     █████╗  ██║     █████╗  ",
  "██║     ██╔══╝  ██║     ██╔══╝  ",
  "███████╗███████╗███████╗███████╗",
  "╚══════╝╚══════╝╚══════╝╚══════╝",
];
