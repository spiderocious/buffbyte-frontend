import { Link } from 'react-router-dom';
import { ArrowRight } from '@ui/icons';
import { ROUTES } from '@shared/constants/routes';
import { SERIF, INK_BG } from '../lib/tokens';
import { HalftoneField } from '../fx/halftone-field';
import { SplitReveal } from '../fx/split-reveal';
import { Magnetic } from '../fx/magnetic';
import { CountUp } from '../fx/count-up';

/* Dark proof band: headline + rolling stat counters over the violet
   dot field. Stats are placeholders flagged in ASSETS.md. */

const STATS = [
  { value: 92, suffix: '%', label: 'of scored posts beat the author’s last' },
  { value: 8, suffix: 's', label: 'to a full 14-dimension score' },
  { value: 14, suffix: '', label: 'dimensions, every single time' },
];

export function ProofBand() {
  return (
    <section id="vb-proof" style={{ position: 'relative', overflow: 'hidden', background: INK_BG, color: '#fff', padding: 'clamp(90px, 13vw, 150px) 0' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}><HalftoneField tone="violet" crest={0.42} /></div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(100% 80% at 50% 50%, rgba(11,10,14,0.5) 0%, rgba(11,10,14,0.85) 76%)' }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
        <SplitReveal as="h2" stagger={0.06} style={{ fontSize: 'clamp(34px, 5vw, 62px)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.02, margin: '0 0 64px' }}>
          Stop guessing. <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: '#C8BAFF' }}>Start steering.</span>
        </SplitReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 60 }}>
          {STATS.map((s, i) => (
            <div key={s.label}>
              <CountUp value={s.value} suffix={s.suffix} delay={i * 0.12}
                style={{ display: 'block', fontSize: 'clamp(52px, 7.5vw, 84px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 12 }} />
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: '0 auto', maxWidth: 220, lineHeight: 1.5 }}>{s.label}</p>
            </div>
          ))}
        </div>
        <Magnetic>
          <Link to={ROUTES.AUTH.REGISTER} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#fff', color: INK_BG, fontWeight: 700, fontSize: 16, padding: '16px 30px', borderRadius: 12, textDecoration: 'none' }}>
            Get started free <ArrowRight size={17} strokeWidth={2.5} />
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
