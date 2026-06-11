import { useEffect, useMemo, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { SERIF, INK_BG, overline } from '../lib/tokens';
import { useReducedMotionPref } from '../lib/use-reduced-motion-pref';

/* Pinned dark scene where the copy IS a teleprompter: words brighten
   as you scroll, the REC dot pulses, and the WPM readout rides scroll
   velocity before settling back. */

const SCRIPT = 'Hit record knowing it lands. BuffByte reads your script the way the algorithm will — hook, pacing, retention — then scrolls it for you, word by word, at exactly your speaking pace. No second app. No guessing. Just you, the lens, and a script that already knows its score.';

const promptChrome: React.CSSProperties = {
  position: 'absolute', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em',
  textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: 8,
};

export function TeleprompterScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotionPref();
  const words = useMemo(() => SCRIPT.split(' '), []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    const ctx = gsap.context(() => {
      const wordEls = gsap.utils.toArray<HTMLElement>('.vbt-w', section);
      const text = section.querySelector<HTMLElement>('.vbt-text');
      const wpmEl = section.querySelector<HTMLElement>('.vbt-wpm');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section, start: 'top top', end: '+=2400',
          pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
        },
      });
      tl.to(wordEls, { opacity: 1, duration: 6, ease: 'none', stagger: 0.5 }, 0);
      if (text) tl.fromTo(text, { y: 36 }, { y: -36, ease: 'none', duration: tl.duration() }, 0);

      // REC dot pulse
      gsap.to('.vbt-rec', { opacity: 0.2, duration: 0.8, ease: 'sine.inOut', repeat: -1, yoyo: true });

      // live WPM readout: rides scroll velocity, settles back to 128
      let target = 128, current = 128;
      const clampWpm = gsap.utils.clamp(112, 186);
      ScrollTrigger.create({
        trigger: section, start: 'top bottom', end: 'bottom top',
        onUpdate: (self) => { target = clampWpm(128 + Math.abs(self.getVelocity()) / 26); },
      });
      const tick = () => {
        current += (target - current) * 0.07;
        target += (128 - target) * 0.018;
        if (wpmEl) wpmEl.textContent = String(Math.round(current));
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  const corner = (pos: [string, string]): React.CSSProperties => ({
    position: 'absolute', width: 26, height: 26, opacity: 0.45,
    [pos[0]]: 'clamp(20px, 4vw, 56px)', [pos[1]]: 'clamp(20px, 4vw, 56px)',
    borderTop: pos[0] === 'top' ? '2px solid rgba(255,255,255,0.8)' : 'none',
    borderBottom: pos[0] === 'bottom' ? '2px solid rgba(255,255,255,0.8)' : 'none',
    borderLeft: pos[1] === 'left' ? '2px solid rgba(255,255,255,0.8)' : 'none',
    borderRight: pos[1] === 'right' ? '2px solid rgba(255,255,255,0.8)' : 'none',
  });

  return (
    <section ref={sectionRef} id="vb-prompter" style={{ position: 'relative', background: INK_BG, color: '#fff', overflow: 'hidden' }}>
      <div style={{ height: reduced ? 'auto' : '100svh', minHeight: reduced ? '70vh' : undefined, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: reduced ? '120px 0' : 0 }}>
        {/* camera chrome */}
        <span aria-hidden style={corner(['top', 'left'])} />
        <span aria-hidden style={corner(['top', 'right'])} />
        <span aria-hidden style={corner(['bottom', 'left'])} />
        <span aria-hidden style={corner(['bottom', 'right'])} />

        <div style={{ ...promptChrome, top: 'clamp(28px, 5vh, 64px)', left: 'clamp(40px, 7vw, 96px)' }} className="vbt-chrome">
          <span className="vbt-rec" style={{ width: 9, height: 9, borderRadius: '50%', background: '#E5484D', display: 'inline-block' }} />
          Rec
        </div>
        <div style={{ ...promptChrome, top: 'clamp(28px, 5vh, 64px)', right: 'clamp(40px, 7vw, 96px)', color: '#C8BAFF' }} className="vbt-chrome">
          Script · scored 94/100
        </div>
        <div style={{ ...promptChrome, bottom: 'clamp(28px, 5vh, 64px)', left: 'clamp(40px, 7vw, 96px)' }} className="vbt-chrome">
          <span className="vbt-wpm" style={{ color: '#fff', fontVariantNumeric: 'tabular-nums' }}>128</span> wpm
        </div>
        <div style={{ ...promptChrome, bottom: 'clamp(28px, 5vh, 64px)', right: 'clamp(40px, 7vw, 96px)' }} className="vbt-chrome">
          Auto-scroll on
        </div>

        {/* the script */}
        <div style={{ maxWidth: 920, padding: '0 clamp(24px, 6vw, 48px)', textAlign: 'center' }}>
          <span style={{ ...overline, color: '#C8BAFF', marginBottom: 'clamp(18px, 3vh, 32px)' }}>003 — The teleprompter, live</span>
          <p className="vbt-text" style={{
            fontFamily: SERIF, fontWeight: 420, fontSize: 'clamp(24px, 3.4vw, 42px)',
            letterSpacing: '-0.01em', lineHeight: 1.5, margin: 0, willChange: 'transform',
          }}>
            {words.map((w, i) => (
              <span key={i} className="vbt-w" style={{ opacity: reduced ? 1 : 0.13 }}>{w}{' '}</span>
            ))}
          </p>
        </div>
      </div>
      <style>{`@media (max-width: 640px){ #vb-prompter .vbt-chrome{ display: none; } }`}</style>
    </section>
  );
}
