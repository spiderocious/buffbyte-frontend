import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CREATORS = [
  'The Create Lab', 'StudioZero', 'Waveform Media', 'CreatorOps',
  'PodForge', 'Narrativ', 'ContentStack', 'Launchpad Co.',
];

export function LandingSocialProof() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const totalWidth = el.scrollWidth / 2;
    const tween = gsap.to(el, {
      x: -totalWidth,
      duration: 28,
      ease: 'none',
      repeat: -1,
      modifiers: { x: (x) => `${parseFloat(x) % totalWidth}px` },
    });
    return () => { tween.kill(); };
  }, []);

  const doubled = [...CREATORS, ...CREATORS];

  return (
    <section
      style={{
        background: 'var(--sheet)',
        borderTop: '1px solid var(--hair)',
        borderBottom: '1px solid var(--hair)',
        padding: '28px 0',
        overflow: 'hidden',
      }}
    >
      <p
        style={{
          textAlign: 'center',
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--ink-4)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: 20,
          padding: '0 20px',
        }}
      >
        Trusted by creators worldwide
      </p>
      <div
        style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}
      >
        <div ref={trackRef} style={{ display: 'flex', gap: 56, whiteSpace: 'nowrap', willChange: 'transform' }}>
          {doubled.map((name, i) => (
            <span
              key={i}
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--ink-4)',
                letterSpacing: '-0.01em',
                flexShrink: 0,
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
