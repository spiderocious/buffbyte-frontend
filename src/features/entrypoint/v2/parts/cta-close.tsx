import { Link } from 'react-router-dom';
import { ArrowRight } from '@ui/icons';
import { ROUTES } from '@shared/constants/routes';
import { SERIF, INK_BG } from '../lib/tokens';
import { HalftoneField } from '../fx/halftone-field';
import { SplitReveal } from '../fx/split-reveal';
import { Magnetic } from '../fx/magnetic';

/* Closing CTA — ink card with the dot field glowing inside it. */

export function CtaClose() {
  return (
    <section style={{ background: 'var(--paper)', padding: '0 0 clamp(48px, 7vw, 88px)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 clamp(20px, 4vw, 48px)' }}>
        <div style={{ position: 'relative', background: INK_BG, borderRadius: 30, padding: 'clamp(64px, 9vw, 120px) 32px', textAlign: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}><HalftoneField tone="violet" crest={0.78} /></div>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(90% 70% at 50% 40%, rgba(11,10,14,0.3) 0%, rgba(11,10,14,0.8) 80%)' }} />
          <div style={{ position: 'relative' }}>
            <SplitReveal as="h2" stagger={0.06} style={{ fontSize: 'clamp(40px, 6.4vw, 84px)', fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 0.98, color: '#fff', margin: '0 0 24px' }}>
              Score it before<br />
              you <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, color: '#9D86FF' }}>post</span> it
            </SplitReveal>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.62)', maxWidth: 440, margin: '0 auto 38px', lineHeight: 1.55 }}>
              Score your first post in under a minute. No card required.
            </p>
            <Magnetic>
              <Link to={ROUTES.AUTH.REGISTER} className="vb-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#fff', color: 'var(--ink)', fontWeight: 700, fontSize: 16, padding: '17px 32px', borderRadius: 12, textDecoration: 'none' }}>
                Get started free <ArrowRight size={17} strokeWidth={2.5} />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
