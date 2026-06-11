import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from '@ui/icons';
import { ROUTES } from '@shared/constants/routes';
import { gsap, SplitText } from '../lib/gsap';
import { SERIF } from '../lib/tokens';
import { useReducedMotionPref } from '../lib/use-reduced-motion-pref';
import { HalftoneField } from '../fx/halftone-field';
import { Magnetic } from '../fx/magnetic';
import { Scribble } from './scribble';

/* Hero — centered colossal type over the interactive dot field,
   ringed by floating live-score chips that parallax against the
   cursor. `play` gates the entrance until the pre-flight intro has
   started its reveal. */

const CHIPS = [
  { label: 'Virality', score: 92, x: '8%', y: '23%', depth: 1.6 },
  { label: 'Hook strength', score: 78, x: '73%', y: '18%', depth: 2.3 },
  { label: 'Retention', score: 91, x: '4%', y: '54%', depth: 2.8 },
  { label: 'Platform fit', score: 95, x: '83%', y: '48%', depth: 1.4 },
  { label: 'Pacing', score: 84, x: '70%', y: '76%', depth: 2.5 },
];

export function LandingHero({ play }: { play: boolean }) {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotionPref();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const splits: SplitText[] = [];
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.vbh-item', root);
      const chips = gsap.utils.toArray<HTMLElement>('.vbh-chip', root);
      const chipInners = gsap.utils.toArray<HTMLElement>('.vbh-chip-in', root);
      const chipLayer = root.querySelector<HTMLElement>('.vbh-chips');
      const line1 = root.querySelector<HTMLElement>('.vbh-l1');
      const line2 = root.querySelector<HTMLElement>('.vbh-l2');
      const cue = root.querySelector<HTMLElement>('.vbh-cue');

      // hidden states (also applied while the intro is still covering the page)
      gsap.set(items, { y: 26, opacity: 0 });
      gsap.set(line2, { y: 48, opacity: 0 });
      gsap.set(chips, { scale: 0.6, opacity: 0, y: 22 });
      if (cue) gsap.set(cue, { opacity: 0 });
      if (!play) {
        if (line1) gsap.set(line1, { opacity: 0 });
        return;
      }

      // entrance
      if (line1) {
        gsap.set(line1, { opacity: 1 });
        splits.push(SplitText.create(line1, {
          type: 'chars', autoSplit: true,
          onSplit: (self) => gsap.from(self.chars, {
            yPercent: 110, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.022, delay: 0.05,
          }),
        }));
      }
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to(line2, { y: 0, opacity: 1, duration: 1.2 }, 0.3)
        .to(items, { y: 0, opacity: 1, duration: 0.9, stagger: 0.09 }, 0.55)
        .to(chips, { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'back.out(1.7)', stagger: 0.07 }, 0.85)
        .to(cue, { opacity: 1, duration: 0.8 }, 1.4);

      // idle float on each chip (inner element, so it never fights the parallax)
      chipInners.forEach((el, i) => {
        gsap.to(el, { y: i % 2 ? 9 : -9, duration: 2.3 + i * 0.35, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.6 });
      });

      // cursor parallax — deeper chips drift further, opposite the pointer
      let removePointer: (() => void) | null = null;
      if (window.matchMedia('(pointer: fine)').matches) {
        const setters = chips.map((ch) => ({
          x: gsap.quickTo(ch, 'x', { duration: 0.9, ease: 'power3.out' }),
          y: gsap.quickTo(ch, 'y', { duration: 0.9, ease: 'power3.out' }),
          d: parseFloat(ch.dataset.depth || '1'),
        }));
        const onMove = (e: PointerEvent) => {
          const r = root.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          setters.forEach((s) => { s.x(nx * s.d * -24); s.y(ny * s.d * -16); });
        };
        root.addEventListener('pointermove', onMove);
        removePointer = () => root.removeEventListener('pointermove', onMove);
      }

      // depth on scroll-out
      gsap.to('.vbh-copy', {
        y: -70, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom 30%', scrub: true },
      });
      if (chipLayer) gsap.to(chipLayer, {
        y: -120, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom 45%', scrub: true },
      });
      if (cue) gsap.to(cue, {
        opacity: 0, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: '12% top', scrub: true },
      });

      // gsap.context runs cleanup functions returned here on revert
      return () => removePointer?.();
    }, root);
    return () => { ctx.revert(); splits.forEach((s) => s.revert()); };
  }, [play, reduced]);

  const chipStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 9,
    background: 'var(--sheet)', border: '1px solid var(--hair)', borderRadius: 999,
    padding: '9px 15px', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)',
    boxShadow: '0 14px 30px -16px rgba(28,27,25,0.3), 0 1px 0 rgba(28,27,25,0.03)',
    whiteSpace: 'nowrap',
  };

  return (
    <section ref={rootRef} style={{ position: 'relative', minHeight: '100svh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--paper)' }}>
      {/* interactive light field — taller, wrapping the headline */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.9, maskImage: 'linear-gradient(180deg, #000 22%, rgba(0,0,0,0.5) 55%, transparent 80%)', WebkitMaskImage: 'linear-gradient(180deg, #000 22%, rgba(0,0,0,0.5) 55%, transparent 80%)' }}>
        <HalftoneField tone="violet-soft" crest={0.26} interactive pointerRadius={170} />
      </div>

      {/* floating live-score chips */}
      <div className="vbh-chips" aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        {CHIPS.map((c) => (
          <div key={c.label} className="vbh-chip" data-depth={c.depth} style={{ position: 'absolute', left: c.x, top: c.y, willChange: 'transform' }}>
            <span className="vbh-chip-in" style={chipStyle}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
              {c.label}
              <b style={{ color: 'var(--ink)', fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{c.score}</b>
            </span>
          </div>
        ))}
        {/* the suggestion chip — the product's voice */}
        <div className="vbh-chip" data-depth={2} style={{ position: 'absolute', left: '6%', top: '74%', willChange: 'transform' }}>
          <span className="vbh-chip-in" style={{ ...chipStyle, whiteSpace: 'normal', maxWidth: 250, borderRadius: 14, padding: '11px 14px', alignItems: 'flex-start', textAlign: 'left', background: 'var(--accent-tint)', border: '1px solid var(--accent-edge)', color: 'var(--accent-ink)', fontSize: 12.5, lineHeight: 1.45 }}>
            <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}><Zap size={13} /></span>
            Tighten the first line — your hook lands at 78.
          </span>
        </div>
      </div>

      {/* centered copy */}
      <div className="vbh-copy" style={{ position: 'relative', zIndex: 3, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', maxWidth: 1280, width: '100%', margin: '0 auto', padding: '128px 32px 96px' }}>
        <div className="vbh-item" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'var(--sheet)', border: '1px solid var(--hair)', borderRadius: 999, padding: '7px 15px', marginBottom: 'clamp(24px, 4vh, 40px)', boxShadow: 'var(--shade-1)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>The AI scoring layer for creators</span>
        </div>

        <h1 style={{ margin: 0, color: 'var(--ink)', fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 0.95 }}>
          <span className="vbh-l1" style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em', marginBottom: '-0.08em', fontSize: 'clamp(46px, 8.8vw, 138px)' }}>Score it before</span>
          <span className="vbh-l2" style={{ display: 'block', fontFamily: SERIF, fontStyle: 'italic', fontWeight: 420, letterSpacing: '-0.02em', fontSize: 'clamp(48px, 9.2vw, 144px)' }}>
            you{' '}
            <span style={{ position: 'relative', display: 'inline-block', color: 'var(--accent)' }}>
              post
              <Scribble />
            </span>{' '}
            it
          </span>
        </h1>

        <p className="vbh-item" style={{ margin: 'clamp(26px, 4.5vh, 40px) 0 0', maxWidth: 600, fontSize: 'clamp(16px, 1.6vw, 20px)', lineHeight: 1.55, color: 'var(--ink-3)' }}>
          BuffByte grades every post across 14 dimensions, scores your scripts for hook and pacing, and walks you through delivery on a built-in teleprompter.
        </p>

        <div className="vbh-item" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginTop: 'clamp(28px, 4.5vh, 40px)' }}>
          <Magnetic>
            <Link to={ROUTES.AUTH.REGISTER} className="vb-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: 16, padding: '16px 28px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 12px 30px -10px rgba(83,58,253,0.5)' }}>
              Get started free <span className="vb-arrow" style={{ display: 'inline-flex' }}><ArrowRight size={17} strokeWidth={2.5} /></span>
            </Link>
          </Magnetic>
          <a href="#vb-dims" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, color: 'var(--ink-2)', fontWeight: 600, fontSize: 16, padding: '16px 24px', borderRadius: 12, textDecoration: 'none', border: '1px solid var(--hair)', background: 'var(--sheet)' }}>See how it scores</a>
        </div>

        <p className="vbh-item" style={{ marginTop: 20, fontSize: 13, color: 'var(--ink-4)' }}>
          No card required. Score your first post in under a minute.
        </p>
      </div>

      {/* scroll cue */}
      <div className="vbh-cue" aria-hidden style={{ position: 'absolute', bottom: 26, left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>Scroll</span>
        <span style={{ position: 'relative', width: 1, height: 34, background: 'var(--hair)', overflow: 'hidden', display: 'block' }}>
          <span className="vbh-cue-dot" style={{ position: 'absolute', left: 0, top: 0, width: 1, height: 10, background: 'var(--accent)' }} />
        </span>
      </div>

      <style>{`
        @media (max-width: 1023px){ .vbh-chips{ display: none; } }
        .vb-cta:hover .vb-arrow{ transform: translateX(3px); }
        .vb-arrow{ transition: transform 200ms ease; }
        .vbh-cue-dot{ animation: vbh-cue-fall 1.8s cubic-bezier(0.6, 0, 0.4, 1) infinite; }
        @keyframes vbh-cue-fall{ 0%{ transform: translateY(-12px); } 100%{ transform: translateY(40px); } }
        @media (prefers-reduced-motion: reduce){ .vb-arrow{ transition:none; } .vbh-cue-dot{ animation:none; } }
      `}</style>
    </section>
  );
}
