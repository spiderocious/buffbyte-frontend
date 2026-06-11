/* Shared design tokens + text styles for the v2 landing page. */

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* framer-motion variant used by the pricing / FAQ reveals */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: d } }),
};

/* Fraunces — display serif for accent lines and words. Variable font with
   optical sizing + italic, reads as expensive editorial against Inter's
   grotesk. Loaded in index.css. */
export const SERIF = "'Fraunces Variable', 'Hoefler Text', Georgia, serif";

/* Near-black ground for the dark cinema / proof sections. */
export const INK_BG = '#0B0A0E';

/* Violet uppercase section eyebrow. */
export const overline: React.CSSProperties = {
  display: 'inline-block', fontSize: 12, fontWeight: 700,
  letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)',
};

/* Fraunces italic accent for single words inside headings. */
export const accentItalic: React.CSSProperties = {
  fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: 'var(--accent)',
};

/* Standard section heading scale. */
export const sectionH2: React.CSSProperties = {
  fontSize: 'clamp(34px, 4.8vw, 60px)', fontWeight: 800,
  letterSpacing: '-0.04em', lineHeight: 1.0, margin: 0,
};
