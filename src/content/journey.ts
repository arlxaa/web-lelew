export type JourneyKind = "club" | "school" | "sport" | "org";

export type JourneyItem = {
  id: string;
  role: string;
  org: string;
  short: string;
  kind: JourneyKind;
  // "YYYY-MM". Leave `end` out for things still going on.
  start: string;
  end?: string;
  points: string[];
  // Row on the Gantt timeline (0 = top).
  lane: number;
};

// ✏️ Experience + education, newest first. `lane` decides the timeline row.
export const journey: JourneyItem[] = [
  {
    id: "localhost",
    role: "Vibe Coder",
    org: "localhost",
    short: "localhost",
    kind: "club",
    // ✏️ Start month for the vibe-coding era.
    start: "2026-01",
    points: [
      "Building and shipping side projects straight from 127.0.0.1 with an AI-assisted workflow.",
    ],
    lane: 4,
  },
  {
    id: "petir",
    role: "Member (S-Class)",
    org: "PETIR Cyber Security — SOCS Binus",
    short: "PETIR",
    kind: "club",
    start: "2026-02",
    points: [
      "Selected member of PETIR Cyber Security, focusing on Digital Forensics and Open-Source Intelligence (OSINT).",
    ],
    lane: 1,
  },
  {
    id: "s-class",
    role: "Member",
    org: "S-Class SoCS Binus @Kemanggisan",
    short: "S-Class",
    kind: "club",
    start: "2026-02",
    points: [
      "Exclusive SoCS program for developing portfolio, hard & soft skills, and achievements.",
      "Three focus tracks: Competition, Research, and Product Development.",
    ],
    lane: 2,
  },
  {
    id: "binus",
    role: "Computer Science (Undergraduate)",
    org: "BINUS University",
    short: "BINUS",
    kind: "school",
    start: "2025-08",
    points: ["GPA 3.97 / 4.00."],
    lane: 0,
  },
  {
    id: "osis-head",
    role: "Head of Entrepreneurship Division — OSIS",
    org: "SMA Ignatius Slamet Riyadi Karawang",
    short: "OSIS",
    kind: "org",
    start: "2024-02",
    end: "2025-02",
    points: [
      "Led the entrepreneurship division of the student council.",
      "Managed cooperative operations and bazaar financial reporting.",
    ],
    lane: 2,
  },
  {
    id: "osis-pr",
    role: "Staff, Public Relations Division — OSIS",
    org: "SMA Ignatius Slamet Riyadi Karawang",
    short: "OSIS",
    kind: "org",
    start: "2023-02",
    end: "2024-02",
    points: [
      "Socialized the council's work programs and served as master of ceremonies.",
      "Managed the organization's public relations and social media.",
    ],
    lane: 2,
  },
  {
    id: "sma",
    role: "High School Diploma — Natural Sciences",
    org: "SMA Ignatius Slamet Riyadi Karawang",
    short: "SMA",
    kind: "school",
    start: "2022-07",
    end: "2025-05",
    points: ["Final grade 94.21."],
    lane: 0,
  },
  {
    id: "taekwondo",
    role: "Poomsae Athlete (1st Dan Black Belt)",
    org: "Taekwondo Indonesia",
    short: "Taekwondo",
    kind: "sport",
    start: "2017-09",
    end: "2026-02",
    points: [
      "Competitive Taekwondo athlete specializing in Recognized Poomsae over 8+ years.",
      "Multiple regional and national medals, including a West Java regional gold.",
    ],
    lane: 3,
  },
];

// ✏️ Other organizations (shown as chips).
export const organizations = [
  "PETIR Cyber Security (S-Class)",
  "S-Class SoCS Binus @Kemanggisan",
  "BINUS Robotics & AI Network (BRAIN)",
  "BINUS Blockchain and Crypto Club",
  "Bina Nusantara Swimming Club",
  "Binus Student Learning Community",
];

export const KIND_LABEL: Record<JourneyKind, string> = {
  club: "Club",
  school: "Education",
  sport: "Sport",
  org: "Student council",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatMonth = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
};

export const yearOf = (ym: string) => ym.slice(0, 4);
