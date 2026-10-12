// Pure-CSS falling teardrops. No external assets, no JS animation loop —
// each drop is a styled <span> animated via CSS keyframes in globals.css.
// Positions/timings are fixed (not random) to avoid hydration mismatch.

const DROPS = [
  { left: "6%", delay: "0s", dur: "9s", scale: 1.0, opacity: 0.7 },
  { left: "14%", delay: "3.5s", dur: "11s", scale: 0.7, opacity: 0.5 },
  { left: "23%", delay: "1.2s", dur: "8s", scale: 1.2, opacity: 0.8 },
  { left: "33%", delay: "5s", dur: "12s", scale: 0.8, opacity: 0.45 },
  { left: "44%", delay: "2.3s", dur: "10s", scale: 1.0, opacity: 0.65 },
  { left: "52%", delay: "6.5s", dur: "13s", scale: 0.6, opacity: 0.4 },
  { left: "61%", delay: "0.8s", dur: "9.5s", scale: 1.1, opacity: 0.75 },
  { left: "70%", delay: "4.2s", dur: "11.5s", scale: 0.75, opacity: 0.5 },
  { left: "79%", delay: "2.9s", dur: "8.5s", scale: 1.0, opacity: 0.6 },
  { left: "88%", delay: "5.8s", dur: "12.5s", scale: 0.85, opacity: 0.5 },
  { left: "95%", delay: "1.7s", dur: "10.5s", scale: 0.65, opacity: 0.4 },
];

export default function Teardrops() {
  return (
    <div className="teardrops" aria-hidden>
      {DROPS.map((d, i) => (
        <span
          key={i}
          className="teardrop"
          style={{
            left: d.left,
            animationDelay: d.delay,
            animationDuration: d.dur,
            transform: `scale(${d.scale})`,
            // base opacity hint; keyframes drive the real fade
            opacity: d.opacity,
          }}
        />
      ))}
    </div>
  );
}
