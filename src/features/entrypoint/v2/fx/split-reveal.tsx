import { useEffect, useRef } from 'react';
import { gsap, SplitText } from '../lib/gsap';
import { useReducedMotionPref } from '../lib/use-reduced-motion-pref';

/* Masked line/word rise on scroll-into-view. Splits after webfonts
   land (autoSplit) so line breaks are measured correctly. */

type SplitRevealProps = {
  as?: React.ElementType;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  start?: string;
};

export function SplitReveal({
  as = 'div', children, style, className, id,
  delay = 0, stagger = 0.05, duration = 1.15, start = 'top 86%',
}: SplitRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotionPref();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type: 'lines,words',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.words, {
            yPercent: 115,
            duration,
            ease: 'expo.out',
            stagger,
            delay,
            scrollTrigger: { trigger: el, start, once: true },
          }),
      });
    }, el);
    return () => { ctx.revert(); split?.revert(); };
  }, [reduced, delay, stagger, duration, start]);

  const Tag = as as React.ElementType;
  return <Tag ref={ref} style={style} className={className} id={id}>{children}</Tag>;
}
