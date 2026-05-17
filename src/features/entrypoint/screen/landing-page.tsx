import { LandingNav } from './parts/landing-nav';
import { LandingHero } from './parts/landing-hero';
import { LandingSocialProof } from './parts/landing-social-proof';
import { LandingStats } from './parts/landing-stats';
import { LandingFeatures } from './parts/landing-features';
import { LandingHowItWorks } from './parts/landing-how-it-works';
import { LandingUseCases } from './parts/landing-use-cases';
import { LandingWhy } from './parts/landing-why';
import { LandingTestimonials } from './parts/landing-testimonials';
import { LandingPricing } from './parts/landing-pricing';
import { LandingCtaBanner } from './parts/landing-cta-banner';
import { LandingFooter } from './parts/landing-footer';
import './style.css';

export function LandingPage() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: 'var(--paper)' }}>
      <LandingNav />
      <LandingHero />
      <LandingSocialProof />
      <LandingStats />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingUseCases />
      <LandingWhy />
      <LandingTestimonials />
      <LandingPricing />
      <LandingCtaBanner />
      <LandingFooter />
    </div>
  );
}
