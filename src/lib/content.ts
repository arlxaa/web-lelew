// Semua konten teks terpusat di sini agar mudah disunting.

export const profile = {
  name: "Celestyn Aurelixia",
  nickname: "Lele",
  tagline:
    "Computer Science Student at BINUS | Exploring the world of Artificial Intelligence",
  status: "Undergraduate Computer Science Student — Bina Nusantara University",
  gpa: "3.97",
  gpaMax: "4.00",
  email: "aurelixiacelestyn@gmail.com",
  emailAlt: "celestyn.aurelixia@binus.ac.id",
  github: "https://github.com/arlxaa",
  githubHandle: "arlxaa",
  linkedin: "https://www.linkedin.com/in/celestyn-aurelixia-8a09ba3b7/",
  instagram: "https://www.instagram.com/arlxaa_/",
  instagramHandle: "@arlxaa_",
};

export const about = {
  summary:
    "An undergraduate Computer Science student at Bina Nusantara University with a strong interest in artificial intelligence, cybersecurity, and problem solving. A national UI design champion and long-time Taekwondo athlete (1st Dan black belt) with 8 years of competition and active involvement across tech, research, and student organizations.",
  interests: [
    "AI",
    "Cybersecurity",
    "Problem Solving",
    "Mathematics",
    "App Development",
  ],
};

export const technicalSkills = [
  "C Programming",
  "HTML / Web Development",
  "Data Structures",
  "Numerical / Scientific Computing",
  "Digital Forensics & OSINT",
  "Problem Solving",
];

export const softSkills = [
  "Time Management",
  "Leadership",
  "Teamwork",
  "Multitasking",
  "Public Speaking",
];

export type Achievement = {
  title: string;
  org: string;
  year: string;
  rank: string;
  /** Satu atau beberapa foto piagam di /public (opsional). */
  certificates?: string[];
};

export const achievements: Achievement[] = [
  {
    title: "1st Place — Falcon x Qatar Airways UI Design Competition",
    org: "Faculty of IT, Universitas Pelita Harapan (Falcon Project 14)",
    year: "Nov 2024",
    rank: "1st Place",
    certificates: ["/certificates/cert-02.png"],
  },
  {
    title: "Semi-Finalist — Business Plan Competition (UI Innovation War 2024)",
    org: "BEM Universitas Indonesia",
    year: "Oct 2024",
    rank: "Semi-Finalist",
    certificates: ["/certificates/cert-03.png"],
  },
  {
    title: "2nd Place — High School Startup Competition (Region 5)",
    org: "Yayasan Salib Suci",
    year: "Apr 2024",
    rank: "2nd Place",
    certificates: ["/certificates/cert-05.png", "/certificates/cert-06.png"],
  },
  {
    title: "Participant — Web Development Competition (ICF 2024)",
    org: "Informatics Student Association, UPN \"Veteran\" Jawa Timur",
    year: "Dec 2024",
    rank: "National Participant",
    certificates: ["/certificates/cert-01.png"],
  },
  {
    title: "1st Place & Best Player — Kyorugi Senior Putri U-56",
    org: "Perkasa Taekwondo Club",
    year: "Feb 2024",
    rank: "1st Place",
    certificates: ["/certificates/cert-07.png", "/certificates/cert-08.png"],
  },
  {
    title: "1st Place & Best Player — Poomsae Putri",
    org: "Perkasa Taekwondo Club",
    year: "Feb 2024",
    rank: "1st Place",
    certificates: ["/certificates/cert-13.png"],
  },
  {
    title: "Gold Medalist — Poomsae Junior (Piala Alaikassalam)",
    org: "West Java Regional Student Taekwondo Championship (UTI Pro)",
    year: "May 2022",
    rank: "Gold Medal",
    certificates: ["/certificates/cert-14.png"],
  },
  {
    title: "Participant — Indonesia Muda Bupati Cup Taekwondo Championship",
    org: "UTI Pro / Indonesia Muda JTC, Bantul",
    year: "Aug 2024",
    rank: "National Participant",
    certificates: ["/certificates/cert-04.png"],
  },
];

export type Experience = {
  role: string;
  org: string;
  period: string;
  points: string[];
};

export const experiences: Experience[] = [
  {
    role: "Member (S-Class)",
    org: "PETIR Cyber Security — SOCS Binus",
    period: "Feb 2026 - Present",
    points: [
      "Selected member of PETIR Cyber Security, focusing on Digital Forensics and Open-Source Intelligence (OSINT).",
    ],
  },
  {
    role: "Member",
    org: "S-Class SoCS Binus @Kemanggisan",
    period: "Feb 2026 - Present",
    points: [
      "Exclusive SoCS program for developing portfolio, hard & soft skills, and achievements.",
      "Three focus tracks: Competition, Research, and Product Development.",
    ],
  },
  {
    role: "Poomsae Athlete (1st Dan Black Belt)",
    org: "Taekwondo Indonesia",
    period: "Sep 2017 - Feb 2026",
    points: [
      "Competitive Taekwondo athlete specializing in Recognized Poomsae over 8+ years.",
      "Multiple regional and national medals, including a West Java regional gold.",
    ],
  },
  {
    role: "Head of Entrepreneurship Division — OSIS",
    org: "SMA Ignatius Slamet Riyadi Karawang",
    period: "Feb 2024 - Feb 2025",
    points: [
      "Led the entrepreneurship division of the student council.",
      "Managed cooperative operations and bazaar financial reporting.",
    ],
  },
  {
    role: "Staff, Public Relations Division — OSIS",
    org: "SMA Ignatius Slamet Riyadi Karawang",
    period: "Feb 2023 - Feb 2024",
    points: [
      "Socialized the council's work programs and served as master of ceremonies.",
      "Managed the organization's public relations and social media.",
    ],
  },
];

export const organizations = [
  "PETIR Cyber Security (S-Class)",
  "S-Class SoCS Binus @Kemanggisan",
  "BINUS Robotics & AI Network (BRAIN)",
  "BINUS Blockchain and Crypto Club",
  "Bina Nusantara Swimming Club",
  "Binus Student Learning Community",
];

export type Education = {
  school: string;
  degree: string;
  period: string;
  grade: string;
};

export const education: Education[] = [
  {
    school: "BINUS University",
    degree: "Computer Science (Undergraduate)",
    period: "Aug 2025 - Present",
    grade: "GPA 3.97 / 4.00",
  },
  {
    school: "SMA Ignatius Slamet Riyadi Karawang",
    degree: "High School Diploma — Natural Sciences",
    period: "Jul 2022 - May 2025",
    grade: "Final Grade 94.21",
  },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
