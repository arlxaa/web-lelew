export type AwardTrack = "tech" | "sport";

export type Achievement = {
  title: string;
  event: string;
  org: string;
  date: string;
  rank: string;
  track: AwardTrack;
  // Certificate scans in /public/certificates (optional).
  certificates: string[];
};

// ✏️ Awards & competitions. Certificates open in the gallery window.
export const achievements: Achievement[] = [
  {
    title: "1st Place — Falcon x Qatar Airways UI Design Competition",
    event: "Falcon x Qatar Airways UI Design",
    org: "Faculty of IT, Universitas Pelita Harapan (Falcon Project 14)",
    date: "Nov 2024",
    rank: "1st Place",
    track: "tech",
    certificates: ["/certificates/cert-02.png"],
  },
  {
    title: "Semi-Finalist — Business Plan Competition (UI Innovation War 2024)",
    event: "UI Innovation War — Business Plan",
    org: "BEM Universitas Indonesia",
    date: "Oct 2024",
    rank: "Semi-Finalist",
    track: "tech",
    certificates: ["/certificates/cert-03.png"],
  },
  {
    title: "2nd Place — High School Startup Competition (Region 5)",
    event: "High School Startup Competition",
    org: "Yayasan Salib Suci",
    date: "Apr 2024",
    rank: "2nd Place",
    track: "tech",
    certificates: ["/certificates/cert-05.png", "/certificates/cert-06.png"],
  },
  {
    title: "Participant — Web Development Competition (ICF 2024)",
    event: "ICF 2024 Web Development",
    org: 'Informatics Student Association, UPN "Veteran" Jawa Timur',
    date: "Dec 2024",
    rank: "National Participant",
    track: "tech",
    certificates: ["/certificates/cert-01.png"],
  },
  {
    title: "1st Place & Best Player — Kyorugi Senior Putri U-56",
    event: "Kyorugi Senior Putri U-56",
    org: "Perkasa Taekwondo Club",
    date: "Feb 2024",
    rank: "1st Place",
    track: "sport",
    certificates: ["/certificates/cert-07.png", "/certificates/cert-08.png"],
  },
  {
    title: "1st Place & Best Player — Poomsae Putri",
    event: "Poomsae Putri",
    org: "Perkasa Taekwondo Club",
    date: "Feb 2024",
    rank: "1st Place",
    track: "sport",
    certificates: ["/certificates/cert-13.png"],
  },
  {
    title: "Gold Medalist — Poomsae Junior (Piala Alaikassalam)",
    event: "Poomsae Junior — Piala Alaikassalam",
    org: "West Java Regional Student Taekwondo Championship (UTI Pro)",
    date: "May 2022",
    rank: "Gold Medal",
    track: "sport",
    certificates: ["/certificates/cert-14.png"],
  },
  {
    title: "Participant — Indonesia Muda Bupati Cup Taekwondo Championship",
    event: "Indonesia Muda Bupati Cup",
    org: "UTI Pro / Indonesia Muda JTC, Bantul",
    date: "Aug 2024",
    rank: "National Participant",
    track: "sport",
    certificates: ["/certificates/cert-04.png"],
  },
];

export type Certificate = { src: string; award: number; label: string };

// Flat list used by the gallery: one entry per scan.
export const certificates: Certificate[] = achievements.flatMap((a, award) =>
  a.certificates.map((src, i) => ({
    src,
    award,
    label: a.certificates.length > 1 ? `${a.event} (${i + 1}/${a.certificates.length})` : a.event,
  })),
);

export const firstCertificateOf = (award: number) =>
  Math.max(
    0,
    certificates.findIndex((c) => c.award === award),
  );

export const TRACK_LABEL: Record<AwardTrack, string> = {
  tech: "Tech & Design",
  sport: "Taekwondo",
};
