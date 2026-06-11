import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useReducedMotionPref } from '../lib/use-reduced-motion-pref';

/* Stat counter that rolls up once when scrolled into view. */

export function CountUp({ value, suffix = '', duration = 1.8, delay = 0, style, className }: {
  value: number; suffix?: string; duration?: number; delay?: number;
  style?: React.CSSProperties; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotionPref();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) { el.textContent = `${value}${suffix}`; return; }
    const ctx = gsap.context(() => {
      const o = { v: 0 };
      gsap.to(o, {
        v: value, duration, delay, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => { el.textContent = `${Math.round(o.v)}${suffix}`; },
      });
    });
    return () => ctx.revert();
  }, [value, suffix, duration, delay, reduced]);

  return <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums', ...style }}>0{suffix}</span>;
}
