import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useReducedMotionPref } from '../lib/use-reduced-motion-pref';

/* Hand-drawn ellipse that draws itself around the word it wraps. */

export function Scribble({ color = 'var(--accent)' }: { color?: string }) {
  const reduced = useReducedMotionPref();
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    p.style.strokeDasharray = `${len}`;
    if (reduced) { p.style.strokeDashoffset = '0'; return; }
    p.style.strokeDashoffset = `${len}`;
    const ctx = gsap.context(() => {
      gsap.to(p, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut', delay: 0.7 });
    });
    return () => ctx.revert();
  }, [reduced]);

  // a loose hand-drawn ellipse, slightly over-rotated, with an open end
  return (
    <svg viewBox="0 0 320 130" preserveAspectRatio="none" aria-hidden
      style={{ position: 'absolute', left: '-7%', top: '-16%', width: '114%', height: '132%', overflow: 'visible', pointerEvents: 'none' }}>
      <path ref={pathRef} d="M196 18 C95 4 26 30 18 64 C11 96 86 120 174 118 C268 116 314 92 302 58 C293 32 232 16 150 20"
        fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}
