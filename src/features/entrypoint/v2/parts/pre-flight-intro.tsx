import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { SERIF } from '../lib/tokens';

/* Pre-flight intro — the page "scores itself" before revealing:
   a counter rolls 00 → 97 with cycling captions, lands on the
   verdict, then the overlay wipes up. `onReveal` fires as the wipe
   starts (so the hero entrance can run under it); `onDone` when
   the overlay is gone. */

const CAPTIONS = ['Reading the hook…', 'Checking pacing…', 'Scoring 14 dimensions…'];

export function PreFlightIntro({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const num = root.querySelector<HTMLElement>('.vbi-num');
    const cap = root.querySelector<HTMLElement>('.vbi-cap');
    const bar = root.querySelector<HTMLElement>('.vbi-bar');
    document.documentElement.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const o = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => { document.documentElement.style.overflow = ''; onDone(); },
      });
      tl.to(o, {
        v: 97, duration: 1.5, ease: 'power2.inOut',
        onUpdate: () => {
          if (num) num.textContent = String(Math.round(o.v)).padStart(2, '0');
          if (bar) bar.style.transform = `scaleX(${o.v / 97})`;
          if (cap) {
            const i = Math.min(CAPTIONS.length - 1, Math.floor((o.v / 97) * CAPTIONS.length));
            if (cap.dataset.i !== String(i)) { cap.dataset.i = String(i); cap.textContent = CAPTIONS[i]; }
          }
        },
      })
        .add(() => {
          if (cap) { cap.textContent = 'This page scored 97 / 100'; cap.style.color = 'var(--accent)'; }
        })
        .to('.vbi-inner', { y: -28, opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.5')
        .add(onReveal, '<0.1')
        .to(root, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '<0.08');
    }, root);

    return () => { document.documentElement.style.overflow = ''; ctx.revert(); };
  }, [onReveal, onDone]);

  return (
    <div ref={rootRef} aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'var(--paper)', display: 'grid', placeItems: 'center', willChange: 'transform' }}>
      <span style={{ position: 'absolute', top: 28, left: 36, fontSize: 13, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)' }}>BuffByte</span>
      <span style={{ position: 'absolute', top: 30, right: 36, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>Pre-flight analysis</span>
      <div className="vbi-inner" style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8 }}>
          <span className="vbi-num" style={{ fontSize: 'clamp(96px, 18vw, 200px)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>00</span>
          <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(22px, 3.4vw, 38px)', color: 'var(--ink-4)' }}>/100</span>
        </div>
        <div style={{ width: 'min(280px, 60vw)', height: 2, background: 'var(--hair)', margin: '26px auto 18px', overflow: 'hidden' }}>
          <div className="vbi-bar" style={{ height: '100%', background: 'var(--accent)', transform: 'scaleX(0)', transformOrigin: 'left' }} />
        </div>
        <span className="vbi-cap" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-3)' }}>Reading the hook…</span>
      </div>
    </div>
  );
}
