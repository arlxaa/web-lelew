export type Skill = {
  group: string;
  name: string;
  note: string;
};

// ✏️ Skill cards (the "equipment" grid). `note` is the one-liner under the name.
export const skills: Skill[] = [
  {
    group: "Build",
    name: "React / TypeScript",
    note: "Club Lights and Lucky Jackpot88: real-time audio visuals, a 3D coin pusher, auth and leaderboards.",
  },
  {
    group: "Build",
    name: "HTML / Web Development",
    note: "Multi-page sites with product filtering, a location finder and form validation.",
  },
  {
    group: "Build",
    name: "C Programming",
    note: "The language behind algorithms and data-structures coursework.",
  },
  {
    group: "Security",
    name: "Digital Forensics & OSINT",
    note: "Focus track as an S-Class member of PETIR Cyber Security.",
  },
  {
    group: "Logic",
    name: "Data Structures",
    note: "Picking the right structure before writing the first line.",
  },
  {
    group: "Logic",
    name: "Numerical / Scientific Computing",
    note: "Math-heavy problem solving with numerical methods.",
  },
  {
    group: "Design",
    name: "UI / UX & Figma",
    note: "1st place at the Falcon x Qatar Airways UI Design Competition.",
  },
  {
    group: "Logic",
    name: "Problem Solving",
    note: "Competitions, puzzles, and the occasional stubborn bug.",
  },
];

// ✏️ Soft skills, each with where it was earned.
export const softSkills = [
  { name: "Leadership", proof: "Head of Entrepreneurship, OSIS" },
  { name: "Public Speaking", proof: "Master of ceremonies, OSIS PR" },
  { name: "Teamwork", proof: "Startup & business-plan competitions" },
  { name: "Time Management", proof: "Athlete and student for 8+ years" },
  { name: "Multitasking", proof: "Active across six organizations" },
];
