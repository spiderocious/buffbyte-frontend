import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { SERIF } from '../lib/tokens';
import { useReducedMotionPref } from '../lib/use-reduced-motion-pref';

/* Footer: link columns + a giant outlined wordmark that fills with
   ink as the page bottoms out. */

const FOOTER_COLS = [
  { head: 'Product', links: ['Content analysis', 'Script analysis', 'Teleprompter', 'Pricing'] },
  { head: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
  { head: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
];

export function MegaFooter() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionPref();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.vbf-fill',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
          scrollTrigger: { trigger: '.vbf-mark', start: 'top 96%', end: 'bottom 99%', scrub: 0.8 },
        });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  const markStyle: React.CSSProperties = {
    fontSize: 'clamp(64px, 15.4vw, 250px)', fontWeight: 800, letterSpacing: '-0.045em',
    lineHeight: 0.84, whiteSpace: 'nowrap', userSelect: 'none',
  };

  return (
    <footer ref={ref} style={{ background: 'var(--paper)', borderTop: '1px solid var(--hair)', padding: '64px 0 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 32 }} className="vbf-grid">
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: 10 }}>BuffByte</div>
            <p style={{ fontSize: 14, color: 'var(--ink-4)', lineHeight: 1.5, maxWidth: 260, margin: 0 }}>
              The AI scoring layer for creators. Know it lands before you post.
            </p>
          </div>
          {FOOTER_COLS.map((c) => (
            <div key={c.head}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>{c.head}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.links.map((l) => <li key={l}><a href="#" style={{ fontSize: 14, color: 'var(--ink-3)', textDecoration: 'none' }}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, margin: '48px 0 0', paddingTop: 24, borderTop: '1px solid var(--hair)' }}>
          <span style={{ fontSize: 13, color: 'var(--ink-4)' }}>© 2026 BuffByte. All rights reserved.</span>
          <span style={{ fontSize: 13, color: 'var(--ink-4)' }}>
            <span aria-hidden style={{ fontFamily: SERIF, fontStyle: 'italic', color: 'var(--accent)' }}>✳ </span>
            Made for creators.
          </span>
        </div>
      </div>

      {/* giant wordmark that fills with ink as you reach the end */}
      <div className="vbf-mark" aria-hidden style={{ position: 'relative', textAlign: 'center', marginTop: 'clamp(28px, 5vw, 56px)', transform: 'translateY(8%)' }}>
        <div style={{ ...markStyle, color: 'transparent', WebkitTextStroke: '1px var(--ink-5)' }}>BUFFBYTE</div>
        <div className="vbf-fill" style={{ ...markStyle, position: 'absolute', inset: 0, color: 'var(--ink)', clipPath: reduced ? 'none' : 'inset(100% 0% 0% 0%)', willChange: 'clip-path' }}>BUFFBYTE</div>
      </div>

      <style>{`@media (max-width: 720px){ .vbf-grid{ grid-template-columns: 1fr 1fr !important; } }`}</style>
    </footer>
  );
}
