// Night sky backdrop (original, CSS-only): deep-navy nebula, twinkling stars,
// glowing blue clouds, a soft moon halo, and one periodic shooting star.
// Fixed seeds so server and client render identically (no hydration mismatch).

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = {
  left: string;
  top: string;
  size: number;
  color: string;
  dur: string;
  delay: string;
};

const STARS: Star[] = (() => {
  const rnd = mulberry32(4102);
  const palette = ["#ffffff", "#e8efff", "#bcd0ff", "#ffffff", "#d9e4ff"];
  const out: Star[] = [];
  for (let i = 0; i < 90; i++) {
    const lime = rnd() > 0.94; // a few lime "fireflies" echoing the accent
    out.push({
      left: `${(rnd() * 100).toFixed(2)}%`,
      top: `${(rnd() * 100).toFixed(2)}%`,
      size: Math.round((0.8 + rnd() * 1.8) * 10) / 10,
      color: lime ? "#d2fe71" : palette[Math.floor(rnd() * palette.length)],
      dur: `${(2.6 + rnd() * 4.5).toFixed(1)}s`,
      delay: `${(rnd() * 6).toFixed(1)}s`,
    });
  }
  return out;
})();

export default function NightSky() {
  return (
    <div className="night-sky" aria-hidden>
      {/* nebula tint is painted by .night-sky background itself */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className="ns-star"
          style={
            {
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              backgroundColor: s.color,
              boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
              "--ns-d": s.dur,
              "--ns-dl": s.delay,
            } as React.CSSProperties
          }
        />
      ))}

      {/* glowing moon halo, top-right */}
      <div className="ns-moon" />
      <div className="ns-moon-disc" />

      {/* low glowing clouds */}
      <div className="ns-cloud ns-cloud-a" />
      <div className="ns-cloud ns-cloud-b" />
      <div className="ns-cloud ns-cloud-c" />

      {/* periodic shooting star */}
      <div className="ns-shoot" />
    </div>
  );
}
