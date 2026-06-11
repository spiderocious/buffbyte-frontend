import { SERIF } from '../lib/tokens';
import { MarqueeRow } from '../fx/marquee-row';

/* Double marquee of the 14 scoring dimensions: solid names one way,
   outlined tagline the other, both bending with scroll velocity. */

const DIMS = ['Virality', 'Sentiment', 'Brand voice', 'Readability', 'Platform fit', 'Hook strength', 'Pacing', 'Retention', 'Clarity', 'CTA strength', 'Emotion', 'Originality', 'Length fit', 'Trend match'];

export function DimensionMarquee() {
  const star = <span aria-hidden style={{ fontFamily: SERIF, fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.8em', margin: '0 26px' }}>✳</span>;
  return (
    <section aria-label="The 14 scoring dimensions" style={{ background: 'var(--paper)', borderTop: '1px solid var(--hair)', borderBottom: '1px solid var(--hair)', padding: '26px 0' }}>
      <MarqueeRow speed={38}>
        {DIMS.map((d) => (
          <span key={d} style={{ display: 'inline-flex', alignItems: 'center', fontSize: 'clamp(20px, 2.4vw, 32px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)' }}>
            {d}{star}
          </span>
        ))}
      </MarqueeRow>
      <div style={{ height: 18 }} />
      <MarqueeRow reverse speed={50}>
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', fontSize: 'clamp(20px, 2.4vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'transparent', WebkitTextStroke: '1px var(--ink-4)' }}>
            Score it before you post it{star}
          </span>
        ))}
      </MarqueeRow>
    </section>
  );
}
