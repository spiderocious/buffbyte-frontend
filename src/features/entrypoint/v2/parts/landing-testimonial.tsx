import { SERIF } from '../lib/tokens';
import { SplitReveal } from '../fx/split-reveal';

/* Big serif quote with word-by-word reveal. Quote + attribution are
   placeholders flagged in ASSETS.md. */

export function LandingTestimonial() {
  return (
    <section style={{ background: 'var(--paper)', padding: 'clamp(90px, 13vw, 160px) 0' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
        <span aria-hidden style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(64px, 8vw, 110px)', lineHeight: 0.4, display: 'block', color: 'var(--accent)', userSelect: 'none' }}>“</span>
        <SplitReveal as="blockquote" stagger={0.035} style={{ margin: '34px 0 0' }}>
          <p style={{ fontFamily: SERIF, fontWeight: 460, fontSize: 'clamp(26px, 3.8vw, 44px)', color: 'var(--ink)', lineHeight: 1.28, letterSpacing: '-0.015em', margin: 0 }}>
            BuffByte turned posting from a gut-feel gamble into something I can actually <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>steer</span>. My reach is up and the second-guessing is gone.
          </p>
        </SplitReveal>
        <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 13, marginTop: 38 }}>
          <span style={{ width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(150deg, #7C5CFF, #533AFD)', display: 'grid', placeItems: 'center', color: '#fff', fontWeight: 700 }}>AO</span>
          <span style={{ textAlign: 'left' }}>
            <span style={{ display: 'block', fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>Ada Okeke</span>
            <span style={{ display: 'block', fontSize: 13, color: 'var(--ink-4)' }}>Creator, 180k followers</span>
          </span>
        </footer>
      </div>
    </section>
  );
}
