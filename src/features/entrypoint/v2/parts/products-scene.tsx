import { useEffect, useRef } from 'react';
import { Check } from '@ui/icons';
import { gsap } from '../lib/gsap';
import { INK_BG, overline, accentItalic } from '../lib/tokens';

/* Pinned horizontal tour of the three products, with parallax drift
   inside each panel image. Stacks vertically on mobile / reduced
   motion. */

type Product = {
  n: string; eyebrow: string; title: React.ReactNode; body: string;
  points: string[]; img: string; alt: string;
};

const PRODUCTS: Product[] = [
  {
    n: '001', eyebrow: 'Content analysis',
    title: <>Score any post across <span style={accentItalic}>14 dimensions</span></>,
    body: 'Paste a caption, a thread or a full article. BuffByte grades virality, sentiment, brand voice, readability, platform fit and more — then tells you the single change that lifts the score most.',
    points: ['Works on any platform’s format', 'A reason behind every number', 'One-tap suggested rewrite'],
    img: '/landing/hero-product-ui.webp', alt: 'Content score dashboard showing a 94 virality reading',
  },
  {
    n: '002', eyebrow: 'Script analysis',
    title: <>Grade scripts for hook, pacing and <span style={accentItalic}>retention</span></>,
    body: 'Upload a video or podcast script. See where the hook lands, where attention drops, and how long it really runs — before you ever press record.',
    points: ['Hook-strength scoring', 'Predicted retention curve', 'One-click handoff to the teleprompter'],
    img: '/landing/script-analysis-card.webp', alt: 'Script analysis card with hook and pacing scores',
  },
  {
    n: '003', eyebrow: 'AI teleprompter',
    title: <>Deliver every word <span style={accentItalic}>on camera</span></>,
    body: 'A built-in teleprompter with variable-speed auto-scroll and real-time WPM control, tuned for natural on-camera delivery. Your graded script, ready to read.',
    points: ['Real-time speed control', 'Reads at your natural pace', 'No second app to wire up'],
    img: '/landing/teleprompter.webp', alt: 'Teleprompter mounted on a camera rig',
  },
];

export function ProductsScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current, track = trackRef.current;
    if (!section || !track) return;
    const mm = gsap.matchMedia();

    mm.add(
      { isDesktop: '(min-width: 861px)', isMobile: '(max-width: 860px)', reduce: '(prefers-reduced-motion: reduce)' },
      (context) => {
        const { isDesktop, reduce } = context.conditions as { isDesktop: boolean; reduce: boolean };
        if (reduce) return;

        if (isDesktop) {
          const amount = () => track.scrollWidth - window.innerWidth;
          const tween = gsap.to(track, {
            x: () => -amount(),
            ease: 'none',
            scrollTrigger: {
              trigger: section, start: 'top top', end: () => `+=${amount()}`,
              pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
            },
          });
          // parallax drift inside each panel image while the track travels
          gsap.utils.toArray<HTMLElement>('.vbp-img img', section).forEach((img) => {
            gsap.fromTo(img, { xPercent: -7 }, {
              xPercent: 7, ease: 'none',
              scrollTrigger: { trigger: img, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
            });
          });
        } else {
          gsap.utils.toArray<HTMLElement>('.vbp-panel', section).forEach((panel) => {
            gsap.from(panel, {
              y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: panel, start: 'top 86%', once: true },
            });
          });
        }
      }
    );
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="vb-products" style={{ position: 'relative', background: 'var(--paper)', overflow: 'hidden' }}>
      <div className="vbp-viewport" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 1280, width: '100%', margin: '0 auto', padding: 'clamp(28px, 5vh, 56px) 48px 0' }}>
          <span style={overline}>The toolkit</span>
          <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 44px)', fontWeight: 800, letterSpacing: '-0.035em', margin: '10px 0 0', color: 'var(--ink)' }}>
            Three instruments. One <span style={accentItalic}>pipeline</span>.
          </h2>
        </div>

        <div ref={trackRef} className="vbp-track" style={{ display: 'flex', alignItems: 'center', padding: 'clamp(24px, 4vh, 48px) 48px', gap: '5vw', willChange: 'transform' }}>
          {PRODUCTS.map((p) => (
            <article key={p.n} className="vbp-panel" style={{
              flexShrink: 0, width: 'min(76vw, 1020px)', position: 'relative',
              background: 'var(--sheet)', border: '1px solid var(--hair)', borderRadius: 22,
              boxShadow: '0 30px 70px -36px rgba(28,27,25,0.28)', overflow: 'hidden',
            }}>
              <span aria-hidden style={{
                position: 'absolute', top: -28, right: 8, fontVariantNumeric: 'tabular-nums',
                fontSize: 'clamp(90px, 11vw, 170px)', fontWeight: 800, letterSpacing: '-0.06em',
                color: 'transparent', WebkitTextStroke: '1px var(--hair)', lineHeight: 1, userSelect: 'none',
              }}>{p.n}</span>
              <div className="vbp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 'clamp(24px, 3vw, 48px)', alignItems: 'center', padding: 'clamp(28px, 3.4vw, 52px)' }}>
                <div>
                  <span style={{ ...overline, marginBottom: 14 }}>{p.n} — {p.eyebrow}</span>
                  <h3 style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '12px 0 16px', color: 'var(--ink)' }}>{p.title}</h3>
                  <p style={{ fontSize: 'clamp(14px, 1.4vw, 16.5px)', color: 'var(--ink-3)', lineHeight: 1.6, margin: '0 0 20px' }}>{p.body}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {p.points.map((pt) => (
                      <li key={pt} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14.5, color: 'var(--ink-2)' }}>
                        <span style={{ display: 'grid', placeItems: 'center', width: 19, height: 19, borderRadius: '50%', background: 'var(--accent)', color: '#fff', flexShrink: 0 }}>
                          <Check size={11} strokeWidth={3} />
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="vbp-img" style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', background: INK_BG, border: '1px solid var(--hair)' }}>
                  <img src={p.img} alt={p.alt} loading="lazy" style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '16 / 11', objectFit: 'cover', transform: 'scale(1.16)', willChange: 'transform' }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 861px){
          #vb-products .vbp-viewport{ height: 100svh; }
        }
        @media (max-width: 860px){
          #vb-products .vbp-track{ flex-direction: column; align-items: stretch; gap: 28px; padding: 28px 24px 64px; }
          #vb-products .vbp-panel{ width: 100%; }
          #vb-products .vbp-grid{ grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
