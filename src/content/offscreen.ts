export type OffItem = { text: string; sub?: string };

export type OffRow = {
  label: string;
  ill: "swim" | "matcha" | "music";
  items: OffItem[];
  /** Scroll the row as an endless marquee. */
  loop?: boolean;
};

// ✏️ The personal "off screen" rows. `sub` is the small label after an item (e.g. the artist).
export const offscreen: OffRow[] = [
  {
    label: "Hobbies",
    ill: "swim",
    items: [{ text: "swimming" }, { text: "sleeping" }],
  },
  {
    label: "Drinks",
    ill: "matcha",
    items: [{ text: "matcha" }, { text: "milk" }],
  },
  {
    label: "On repeat",
    ill: "music",
    loop: true,
    items: [
      { text: "do re mi", sub: "blackbear" },
      { text: "Love Me", sub: "Lil Wayne" },
      { text: "Reminder", sub: "The Weeknd" },
      { text: "The Hills", sub: "The Weeknd" },
      { text: "One Of The Girls", sub: "The Weeknd" },
    ],
  },
];

export const offscreenText =
  "Loves swimming and sleeping. Drinks matcha and milk. On repeat: do re mi by blackbear, Love Me by Lil Wayne, and Reminder, The Hills and One Of The Girls by The Weeknd.";
