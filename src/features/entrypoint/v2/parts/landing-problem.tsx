import { accentItalic } from '../lib/tokens';
import { SplitReveal } from '../fx/split-reveal';

/* Problem reframe — the one big editorial statement. */

export function LandingProblem() {
  return (
    <section style={{ background: 'var(--paper)', padding: 'clamp(90px, 13vw, 160px) 0' }}>
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
        <SplitReveal as="h2" stagger={0.04} style={{ fontSize: 'clamp(34px, 5.2vw, 68px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.02, margin: '0 0 26px', color: 'var(--ink)' }}>
          Posting shouldn’t be a gut-feel <span style={accentItalic}>gamble</span>
        </SplitReveal>
        <SplitReveal as="p" stagger={0.012} duration={0.9} delay={0.15} style={{ fontSize: 'clamp(17px, 2vw, 21px)', color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>
          You write, you second-guess, you hit publish and hope. Then the analytics roll in too late to change anything. BuffByte moves the feedback before the post — so you fix the weak line while it still matters.
        </SplitReveal>
      </div>
    </section>
  );
}
