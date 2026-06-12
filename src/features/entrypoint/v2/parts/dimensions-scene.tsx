import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { SERIF, overline, accentItalic } from '../lib/tokens';
import { useReducedMotionPref } from '../lib/use-reduced-motion-pref';
import { useMediaQuery } from '../lib/use-media-query';

/* Desktop: pinned slot-machine through all 14 scoring dimensions,
   scrubbed to scroll, snap-to-label so one swipe settles on exactly
   one dimension. Mobile: no scroll hijack — an editorial numbered
   list with row reveals. Reduced motion: static chip list. */

const DIMENSIONS = [
  { name: 'Virality', blurb: 'Will it spread past your own followers, or stall at the feed?' },
  { name: 'Sentiment', blurb: 'The emotional charge of every line, measured instead of guessed.' },
  { name: 'Brand voice', blurb: 'Still sounds like you, even on your hundredth post.' },
  { name: 'Readability', blurb: 'Zero friction between the eye and the idea.' },
  { name: 'Platform fit', blurb: 'Tuned for where it is actually going, not where it came from.' },
  { name: 'Hook strength', blurb: 'The first two seconds, stress-tested before they cost you reach.' },
  { name: 'Pacing', blurb: 'No dead air. No rushed turns. Every beat earns the next.' },
  { name: 'Retention', blurb: 'The exact line where they would swipe away — flagged first.' },
  { name: 'Clarity', blurb: 'One idea, impossible to misread.' },
  { name: 'CTA strength', blurb: 'The ask, made effortless to say yes to.' },
  { name: 'Emotion', blurb: 'What they feel decides what they share.' },
  { name: 'Originality', blurb: 'Pattern-breaking, not pattern-matching.' },
  { name: 'Length fit', blurb: 'Exactly as long as the idea earns. Not a word more.' },
  { name: 'Trend match', blurb: 'Riding the wave while it is still rising.' },
];

export function DimensionsScene() {
  const reduced = useReducedMotionPref();
  const mobile = useMediaQuery('(max-width: 860px)');
  if (reduced) return <DimensionsStatic />;
  return mobile ? <DimensionsMobile /> : <DimensionsPinned />;
}

function DimensionsMobile() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.vbd-row', section).forEach((row) => {
        gsap.from(row, {
          y: 26, opacity: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 90%', once: true },
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="vb-dims" style={{ background: 'var(--sheet)', borderTop: '1px solid var(--hair)', borderBottom: '1px solid var(--hair)', padding: '72px 0 64px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
        <span style={overline}>The score</span>
        <h2 style={{ fontSize: 'clamp(28px, 8vw, 40px)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.05, margin: '10px 0 8px', color: 'var(--ink)' }}>
          Fourteen ways a post can win or <span style={accentItalic}>lose</span>
        </h2>
        <p style={{ fontSize: 14.5, color: 'var(--ink-3)', lineHeight: 1.55, margin: 0 }}>
          Graded on every post, every time.
        </p>
        <div style={{ marginTop: 28, borderTop: '1px solid var(--hair)' }}>
          {DIMENSIONS.map((d, i) => (
            <div key={d.name} className="vbd-row" style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 14, padding: '16px 0', borderBottom: '1px solid var(--hair)' }}>
              <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 25, color: 'var(--accent)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.2 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)' }}>{d.name}</div>
                <p style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.5, margin: '4px 0 0' }}>{d.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DimensionsPinned() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>('.vbd-group', section);
      const ticks = gsap.utils.toArray<HTMLElement>('.vbd-tick', section);
      const idxEl = section.querySelector<HTMLElement>('.vbd-idx');

      gsap.set(groups, { yPercent: (i) => (i === 0 ? 0 : 104) });

      const MOVE = 1, HOLD = 0.8;
      const stepPx = () => Math.max(480, window.innerHeight * 0.55);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section, start: 'top top',
          end: () => `+=${Math.round(DIMENSIONS.length * stepPx())}`,
          pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
          snap: { snapTo: 'labels', duration: { min: 0.2, max: 0.6 }, delay: 0.08, ease: 'power2.inOut' },
          onUpdate: (self) => {
            const i = Math.min(DIMENSIONS.length - 1, Math.floor(self.progress * DIMENSIONS.length));
            if (idxEl) idxEl.textContent = String(i + 1).padStart(2, '0');
            ticks.forEach((t, ti) => {
              t.style.background = ti <= i ? 'var(--accent)' : 'var(--ink-5)';
              t.style.transform = ti === i ? 'scaleY(2.2)' : 'scaleY(1)';
            });
          },
        },
      });
      tl.addLabel('dim0', HOLD / 2);
      for (let i = 1; i < groups.length; i++) {
        const at = (i - 1) * (MOVE + HOLD) + HOLD;
        tl.to(groups[i - 1], { yPercent: -104, duration: MOVE, ease: 'power3.inOut' }, at)
          .to(groups[i], { yPercent: 0, duration: MOVE, ease: 'power3.inOut' }, at)
          .addLabel(`dim${i}`, at + MOVE + HOLD / 2);
      }
      tl.to({}, { duration: HOLD }); // tail hold on the last dimension
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="vb-dims" style={{ position: 'relative', background: 'var(--sheet)', borderTop: '1px solid var(--hair)', borderBottom: '1px solid var(--hair)', overflow: 'hidden' }}>
      <div style={{ height: '100svh', maxWidth: 1280, margin: '0 auto', padding: '0 48px', display: 'flex', flexDirection: 'column' }} className="vbd-wrap">
        {/* header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, paddingTop: 'clamp(28px, 5vh, 56px)' }}>
          <div>
            <span style={overline}>The score</span>
            <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 34px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '10px 0 0', color: 'var(--ink)' }}>
              Fourteen ways a post can win or lose
            </h2>
          </div>
          <div style={{ fontVariantNumeric: 'tabular-nums', fontSize: 'clamp(18px, 2.2vw, 28px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
            <span className="vbd-idx" style={{ color: 'var(--accent)' }}>01</span>
            <span style={{ color: 'var(--ink-4)' }}> / 14</span>
          </div>
        </div>

        {/* slot viewport */}
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
          {DIMENSIONS.map((d) => (
            <div key={d.name} className="vbd-group" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(14px, 2.4vh, 26px)', willChange: 'transform' }}>
              <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 460, fontSize: 'clamp(46px, 8.6vw, 132px)', letterSpacing: '-0.03em', lineHeight: 0.95, color: 'var(--ink)' }}>
                {d.name}
              </div>
              <p style={{ fontSize: 'clamp(15px, 1.8vw, 21px)', color: 'var(--ink-3)', lineHeight: 1.55, maxWidth: 540, margin: 0 }}>{d.blurb}</p>
            </div>
          ))}
        </div>

        {/* tick rail */}
        <div style={{ paddingBottom: 'clamp(28px, 5vh, 52px)' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {DIMENSIONS.map((d) => (
              <span key={d.name} className="vbd-tick" style={{ flex: 1, height: 3, background: 'var(--ink-5)', transformOrigin: 'bottom', transition: 'background 200ms ease, transform 200ms ease' }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>
            <span>Every post. Every time.</span>
            <span>Scroll to grade</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function DimensionsStatic() {
  return (
    <section id="vb-dims" style={{ background: 'var(--sheet)', borderTop: '1px solid var(--hair)', borderBottom: '1px solid var(--hair)', padding: 'clamp(80px, 12vw, 140px) 0' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
        <span style={overline}>The score</span>
        <h2 style={{ fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, margin: '14px auto 22px', maxWidth: 720, color: 'var(--ink)' }}>
          Fourteen ways a post can win or <span style={accentItalic}>lose</span>
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 760, margin: '32px auto 0' }}>
          {DIMENSIONS.map((d) => (
            <span key={d.name} style={{ background: 'var(--paper)', border: '1px solid var(--hair)', borderRadius: 999, padding: '10px 18px', fontSize: 14, fontWeight: 600, color: 'var(--ink-2)' }}>
              {d.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
