import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useReducedMotionPref } from '../lib/use-reduced-motion-pref';

/* Infinite marquee. Scroll velocity bends it: direction flips with
   scroll direction, speed kicks with velocity, and the track skews
   slightly before settling. */

export function MarqueeRow({ children, reverse = false, speed = 32, style }: {
  children: React.ReactNode; reverse?: boolean; speed?: number; style?: React.CSSProperties;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPref();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;
    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(track,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration: speed, ease: 'none', repeat: -1 });

      let skew = 0;
      const setSkew = gsap.quickSetter(track, 'skewX', 'deg');
      const clampSkew = gsap.utils.clamp(-7, 7);
      const clampKick = gsap.utils.clamp(1, 4);
      let settle: gsap.core.Tween | null = null;
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          skew = clampSkew(v / -400);
          tween.timeScale(self.direction * clampKick(1 + Math.abs(v) / 900));
          settle?.kill();
          settle = gsap.to(tween, { timeScale: self.direction, duration: 1, ease: 'power2.out', delay: 0.1 });
        },
      });
      const decay = () => { skew *= 0.92; if (Math.abs(skew) < 0.04) skew = 0; setSkew(skew); };
      gsap.ticker.add(decay);
      return () => { gsap.ticker.remove(decay); st.kill(); settle?.kill(); };
    });
    return () => ctx.revert();
  }, [reduced, reverse, speed]);

  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', ...style }}>
      <div ref={trackRef} style={{ display: 'inline-flex', alignItems: 'center', willChange: 'transform' }}>
        {children}
        {children}
      </div>
    </div>
  );
}
