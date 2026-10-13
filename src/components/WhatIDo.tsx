import FeatureCards, { type FeatureItem } from "./FeatureCards";

/**
 * Section "What I Do" bergaya CORA/Onion: kartu-kartu monokrom.
 * ✏️ Edit judul & kartu di sini.
 */
const items: FeatureItem[] = [
  {
    icon: "grid",
    title: "UI / Product Design",
    desc: "National UI design champion — crafting clean, clear interfaces that are a joy to use.",
  },
  {
    icon: "code",
    title: "Web Development",
    desc: "Building for the web with Next.js, TypeScript, and Tailwind — from idea to living interface.",
  },
  {
    icon: "spark",
    title: "AI & Machine Learning",
    desc: "A CS student exploring AI, from model experiments to practical, real-world use.",
  },
  {
    icon: "shield",
    title: "Cybersecurity & OSINT",
    desc: "Active in PETIR Cyber Security — investigation, forensics, and security as a mindset.",
  },
  {
    icon: "cpu",
    title: "Problem Solving",
    desc: "Data structures, algorithms, and logic — the foundation for solving problems cleanly.",
  },
  {
    icon: "layers",
    title: "Leadership & Teamwork",
    desc: "Organizations, startups, and competitions — used to leading and working within a team.",
  },
];

export default function WhatIDo() {
  return (
    <FeatureCards
      id="what-i-do"
      eyebrow="What I Do"
      title="From idea to interface"
      subtitle="A blend of design, code, and curiosity — the fields I work in and keep learning."
      items={items}
      cols={3}
    />
  );
}
