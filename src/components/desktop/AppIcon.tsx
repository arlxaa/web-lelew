import { Glyph } from "@/components/Icons";

export type IconId = keyof typeof Glyph;

// Squircle app icon; each theme colours it via [data-app] in desktop.css.
export default function AppIcon({ id, size = 48 }: { id: IconId; size?: number }) {
  const G = Glyph[id];
  return (
    <span className="appicon" data-app={id} style={{ width: size, height: size }}>
      <G size={Math.round(size * 0.5)} />
    </span>
  );
}
