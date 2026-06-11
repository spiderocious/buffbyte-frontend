import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@shared/constants/routes';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { Magnetic } from '../fx/magnetic';

/* Fixed nav: transparent over the hero, frosted sheet once scrolled,
   hides on scroll-down and returns on scroll-up. */

const navLink: React.CSSProperties = { fontSize: 14, fontWeight: 600, color: 'var(--ink-2)', textDecoration: 'none' };

export function LandingNav() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const slide = gsap.to(el, { yPercent: -110, duration: 0.4, ease: 'power3.inOut', paused: true });
      ScrollTrigger.create({
        start: 'top top-=10', end: 'max',
        onUpdate: (self) => {
          if (self.direction === 1 && self.scroll() > 320) slide.play();
          else slide.reverse();
        },
      });
      ScrollTrigger.create({ start: 60, end: 'max', toggleClass: { targets: el, className: 'vbn-solid' } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={ref} className="vbn" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, transition: 'background 280ms ease, box-shadow 280ms ease, backdrop-filter 280ms ease' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '22px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)' }}>BuffByte</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="vb-navlinks">
          <a href="#vb-dims" style={navLink}>Scoring</a>
          <a href="#vb-pricing" style={navLink}>Pricing</a>
          <Link to={ROUTES.AUTH.LOGIN} style={navLink}>Sign in</Link>
          <Magnetic strength={0.25}>
            <Link to={ROUTES.AUTH.REGISTER} style={{ ...navLink, background: 'var(--ink)', color: 'var(--paper)', padding: '9px 16px', borderRadius: 8, fontWeight: 700 }}>Get started</Link>
          </Magnetic>
        </div>
      </div>
      <style>{`
        .vbn-solid{ background: rgba(255,253,248,0.82); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: 0 1px 0 var(--hair); }
        @media (max-width: 720px){ .vb-navlinks a:not(:last-child){ display:none; } }
      `}</style>
    </nav>
  );
}
