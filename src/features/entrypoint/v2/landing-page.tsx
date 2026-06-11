import { useCallback, useState } from 'react';
import { ScrollTrigger } from './lib/gsap';
import { Grain } from './fx/grain';
import { PreFlightIntro } from './parts/pre-flight-intro';
import { LandingNav } from './parts/landing-nav';
import { LandingHero } from './parts/landing-hero';
import { DimensionMarquee } from './parts/dimension-marquee';
import { LandingProblem } from './parts/landing-problem';
import { DimensionsScene } from './parts/dimensions-scene';
import { ProductsScene } from './parts/products-scene';
import { TeleprompterScene } from './parts/teleprompter-scene';
import { VideoScene } from './parts/video-scene';
import { ProofBand } from './parts/proof-band';
import { LandingTestimonial } from './parts/landing-testimonial';
import { LandingFAQ } from './parts/landing-faq';
import { CtaClose } from './parts/cta-close';
import { MegaFooter } from './parts/mega-footer';

/* ============================================================
   V2 LANDING PAGE — "The landing page that scores itself."
   GSAP-first cinematic build: pre-flight intro, char-split hero,
   velocity marquee, pinned dimension slot-machine, horizontal
   product tour, live teleprompter scene, cinema video zoom,
   ink-fill wordmark close. Light paper ground, Fraunces italic
   accents, one violet. Reduced motion collapses to a calm
   static page.

   lib/   — gsap registration, design tokens, hooks
   fx/    — reusable effect components
   parts/ — one file per page section, composed below
   ============================================================ */

const INTRO_KEY = 'vb-intro-played';

export function LandingPageV2() {
  const [withIntro] = useState(
    () =>
      typeof window !== 'undefined' &&
      !sessionStorage.getItem(INTRO_KEY) &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [showIntro, setShowIntro] = useState(withIntro);
  const [heroPlay, setHeroPlay] = useState(!withIntro);

  const onReveal = useCallback(() => setHeroPlay(true), []);
  const onDone = useCallback(() => {
    sessionStorage.setItem(INTRO_KEY, '1');
    setShowIntro(false);
    ScrollTrigger.refresh();
  }, []);

  return (
    <div style={{ fontFamily: 'var(--sans)', background: 'var(--paper)' }}>
      {showIntro && <PreFlightIntro onReveal={onReveal} onDone={onDone} />}
      <Grain />
      <LandingNav />
      <LandingHero play={heroPlay} />
      <DimensionMarquee />
      <LandingProblem />
      <DimensionsScene />
      <ProductsScene />
      <TeleprompterScene />
      <VideoScene />
      <ProofBand />
      <LandingTestimonial />
      <LandingFAQ />
      <CtaClose />
      <MegaFooter />
    </div>
  );
}
