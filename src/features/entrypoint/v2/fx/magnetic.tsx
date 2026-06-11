import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useReducedMotionPref } from '../lib/use-reduced-motion-pref';

/* Cursor-magnetic wrapper for CTAs: drifts toward the pointer,
   snaps back elastically on leave. Fine-pointer devices only. */

export function Magnetic({ children, strength = 0.3, style, className }: {
  children: React.ReactNode; strength?: number; style?: React.CSSProperties; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPref();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !window.matchMedia('(pointer: fine)').matches) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => { gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' }); };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [reduced, strength]);

  return (
    <div ref={ref} className={className} style={{ display: 'inline-flex', willChange: 'transform', ...style }}>
      {children}
    </div>
  );
}
