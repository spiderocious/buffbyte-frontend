/* Fixed paper-grain overlay (SVG turbulence noise, multiply blend). */

const NOISE_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function Grain() {
  return (
    <div aria-hidden style={{
      position: 'fixed', inset: 0, zIndex: 60, pointerEvents: 'none',
      opacity: 0.045, mixBlendMode: 'multiply',
      backgroundImage: `url("${NOISE_URI}")`, backgroundSize: '220px 220px',
    }} />
  );
}
