import type { SVGProps } from "react";
import type { SocialId } from "@/content/profile";

type P = SVGProps<SVGSVGElement> & { size?: number };

const stroke = ({ size = 16, ...rest }: P) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...rest,
});

export const ArrowUpRight = (p: P) => (
  <svg {...stroke(p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const ArrowRight = (p: P) => (
  <svg {...stroke(p)}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);
export const ArrowDown = (p: P) => (
  <svg {...stroke(p)}>
    <path d="M12 4v16M6 14l6 6 6-6" />
  </svg>
);
export const Search = (p: P) => (
  <svg {...stroke(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
);
export const Close = (p: P) => (
  <svg {...stroke(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const Send = (p: P) => (
  <svg {...stroke(p)}>
    <path d="M4 12 20 4l-6 16-3-7-7-1z" />
  </svg>
);
export const Lock = (p: P) => (
  <svg {...stroke(p)}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);
export const Chevron = (p: P) => (
  <svg {...stroke(p)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

// App glyphs used on dock / home-screen icons
export const Glyph = {
  about: (p: P) => (
    <svg {...stroke(p)}>
      <path d="M6 20 12 4l6 16M8.5 14h7" />
    </svg>
  ),
  terminal: (p: P) => (
    <svg {...stroke(p)}>
      <path d="m5 7 5 5-5 5M12 18h7" />
    </svg>
  ),
  journey: (p: P) => (
    <svg {...stroke(p)}>
      <path d="M5 6h2M10 6h9M5 12h2M10 12h9M5 18h2M10 18h6" />
    </svg>
  ),
  awards: (p: P) => (
    <svg {...stroke(p)}>
      <circle cx="12" cy="9" r="5" />
      <path d="m9 13.5-1.5 7L12 18l4.5 2.5-1.5-7" />
    </svg>
  ),
  gallery: (p: P) => (
    <svg {...stroke(p)}>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5" />
    </svg>
  ),
  projects: (p: P) => (
    <svg {...stroke(p)}>
      <path d="M3.5 7.5A1.5 1.5 0 0 1 5 6h4l2 2h8a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5z" />
    </svg>
  ),
  mail: (p: P) => (
    <svg {...stroke(p)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  chat: (p: P) => (
    <svg {...stroke(p)}>
      <path d="M4 5h16v11H9l-5 4z" />
    </svg>
  ),
};

export function SocialIcon({ id, size = 15 }: { id: SocialId; size?: number }) {
  if (id === "github")
    return (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    );
  if (id === "linkedin")
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.44 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v8.44h-4.56v-7.49c0-1.79-.03-4.09-2.49-4.09-2.49 0-2.87 1.95-2.87 3.96v7.62H7.66V8z" />
      </svg>
    );
  if (id === "spotify")
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.5 17.3a.75.75 0 0 1-1 .25c-2.85-1.74-6.45-2.14-10.68-1.17a.75.75 0 1 1-.33-1.46c4.63-1.06 8.6-.6 11.77 1.34.36.22.47.69.25 1.04zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.26-2-8.24-2.59-12.1-1.42a.94.94 0 1 1-.54-1.8c4.4-1.33 9.88-.69 13.62 1.61.44.27.58.85.31 1.3zm.13-3.4C15.18 8.3 8.74 8.08 5 9.22a1.13 1.13 0 1 1-.65-2.16c4.29-1.3 11.4-1.05 15.9 1.62a1.13 1.13 0 0 1-1.15 1.95z" />
      </svg>
    );
  return (
    <svg {...stroke({ size })}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
    </svg>
  );
}
