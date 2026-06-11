import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp } from './animations';

const STATS = [
  { value: '94%', label: 'Average content score uplift', num: 94, suffix: '%' },
  { value: '10×',  label: 'Faster than manual review',   num: 10, suffix: '×'  },
  { value: '3',    label: 'Powerful tools, one platform', num: 3,  suffix: ''   },
  { value: '50k+', label: 'Pieces of content analyzed',  num: 50, suffix: 'k+' },
];

function AnimatedNumber({ num, suffix, inView }: { num: number; suffix: string; inView: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const start = performance.now();
    const duration = 1600;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * num) + suffix;
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, num, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function LandingStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref}>
      {inView && (
        <section style={{ background: 'var(--paper)', padding: 'clamp(48px, 8vw, 80px) 20px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: 2,
                background: 'var(--hair)',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid var(--hair)',
              }}
            >
              {STATS.map(({ value, label, num, suffix }, i) => (
                <motion.div
                  key={value}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  custom={i * 0.1}
                  variants={fadeUp}
                  style={{
                    padding: 'clamp(28px, 4vw, 40px) clamp(20px, 3vw, 32px)',
                    background: 'var(--sheet)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 'clamp(36px, 5vw, 48px)',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-deep) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1,
                    }}
                  >
                    <AnimatedNumber num={num} suffix={suffix} inView={inView} />
                  </span>
                  <span
                    style={{
                      fontSize: 'clamp(12px, 1.5vw, 13.5px)',
                      color: 'var(--ink-3)',
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
