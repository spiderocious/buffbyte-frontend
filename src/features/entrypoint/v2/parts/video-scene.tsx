import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { overline, accentItalic } from '../lib/tokens';
import { useReducedMotionPref } from '../lib/use-reduced-motion-pref';

/* Cinema scene. The film starts small on paper; scrolling zooms it
   up to 80% of the viewport while the house lights go down. At max
   size it plays. Scrolling on brings the lights back up and shrinks
   it away. */

const VIDEO_SRC = 'https://pub-53afe2d11754468183aa3396aabb7d0a.r2.dev/buffbyte.mp4';
const PAPER_HEX = '#FAF7F2';
const CINEMA_HEX = '#050507';

export function VideoScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotionPref();
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || reduced) return;
    const ctx = gsap.context(() => {
      const stage = section.querySelector<HTMLElement>('.vbv-stage');
      const frame = section.querySelector<HTMLElement>('.vbv-frame');
      const sound = section.querySelector<HTMLElement>('.vbv-sound');
      const chrome = gsap.utils.toArray<HTMLElement>('.vbv-chrome', section);

      let playing = false;
      const setPlay = (on: boolean) => {
        if (on === playing) return;
        playing = on;
        if (on) video.play().catch(() => {});
        else video.pause();
      };

      const smallScale = () => (window.innerWidth < 700 ? 0.62 : 0.42);

      // 10 timeline units: zoom in (4.2) — hold full (1.6) — zoom out (4.2)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section, start: 'top top', end: '+=2800',
          pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (self) => setPlay(self.progress > 0.36 && self.progress < 0.66),
          onLeave: () => setPlay(false),
          onLeaveBack: () => setPlay(false),
        },
      });

      tl.fromTo(frame,
        { scale: smallScale, borderRadius: 26 },
        { scale: 0.8, borderRadius: 18, duration: 4.2, ease: 'power2.inOut' }, 0)
        .fromTo(stage,
          { backgroundColor: PAPER_HEX },
          { backgroundColor: CINEMA_HEX, duration: 4.2, ease: 'power1.inOut' }, 0)
        .to(chrome, { opacity: 0, y: -16, duration: 1.4, ease: 'power1.out' }, 0)
        .to(sound, { opacity: 1, duration: 0.8 }, 3.4)
        .to({}, { duration: 1.6 }) // hold — at max size, lights down, rolling
        .to(sound, { opacity: 0, duration: 0.8 }, 5.8)
        .to(frame, { scale: smallScale, borderRadius: 26, duration: 4.2, ease: 'power2.inOut' }, 5.8)
        .to(stage, { backgroundColor: PAPER_HEX, duration: 4.2, ease: 'power1.inOut' }, 5.8)
        .to(chrome, { opacity: 1, y: 0, duration: 1.4, ease: 'power1.in' }, 8.6);
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <section id="vb-film" style={{ background: 'var(--paper)', padding: 'clamp(80px, 12vw, 140px) 0', textAlign: 'center' }}>
        <span style={overline}>The film</span>
        <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 44px)', fontWeight: 800, letterSpacing: '-0.035em', margin: '10px auto 36px', color: 'var(--ink)' }}>
          See it work in <span style={accentItalic}>real time</span>
        </h2>
        <video src={VIDEO_SRC} controls playsInline preload="metadata"
          style={{ display: 'block', width: 'min(960px, 90vw)', margin: '0 auto', borderRadius: 18, background: '#000' }} />
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="vb-film" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="vbv-stage" style={{ position: 'relative', height: '100svh', background: PAPER_HEX, display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
        {/* chrome — fades as the lights go down */}
        <div className="vbv-chrome" style={{ position: 'absolute', top: '7svh', left: 0, right: 0, textAlign: 'center', zIndex: 2, pointerEvents: 'none' }}>
          <span style={overline}>The film</span>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 800, letterSpacing: '-0.035em', margin: '10px 0 0', color: 'var(--ink)' }}>
            See it work in <span style={accentItalic}>real time</span>
          </h2>
        </div>
        <div className="vbv-chrome" aria-hidden style={{ position: 'absolute', bottom: '6svh', left: 0, right: 0, textAlign: 'center', zIndex: 2, pointerEvents: 'none', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>
          Scroll to roll
        </div>

        {/* the screen */}
        <div className="vbv-frame" style={{ position: 'relative', width: '100vw', height: '100svh', overflow: 'hidden', willChange: 'transform', boxShadow: '0 60px 140px -40px rgba(11,10,14,0.55)' }}>
          <video ref={videoRef} src={VIDEO_SRC} muted={muted} loop playsInline preload="metadata"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', background: '#000' }} />
          <button className="vbv-sound" onClick={() => setMuted((m) => !m)}
            style={{
              position: 'absolute', right: 26, bottom: 26, opacity: 0, cursor: 'pointer',
              background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.25)', borderRadius: 999, padding: '10px 18px',
              color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', fontFamily: 'inherit',
            }}>
            {muted ? 'Tap for sound' : 'Mute'}
          </button>
        </div>
      </div>
    </section>
  );
}
