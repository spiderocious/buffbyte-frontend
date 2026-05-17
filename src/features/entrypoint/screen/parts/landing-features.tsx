import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from '@ui/icons';
import { fadeUp } from './animations';

gsap.registerPlugin(ScrollTrigger);

interface FeatureRowProps {
  readonly tag: string;
  readonly title: string;
  readonly description: string;
  readonly bullets: readonly string[];
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly reverse?: boolean;
  readonly accent?: string;
  readonly index: number;
}

function FeatureRow({ tag, title, description, bullets, imageSrc, imageAlt, reverse = false, accent = 'var(--accent)', index }: FeatureRowProps) {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: 40, opacity: 0, rotateY: reverse ? -8 : 8, scale: 0.95 },
        {
          y: 0, opacity: 1, rotateY: 0, scale: 1,
          duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      );
      // Continuous subtle float
      gsap.to(el, {
        y: -12, duration: 4 + index * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: index * 0.3,
      });
    }, el);
    return () => ctx.revert();
  }, [reverse, index]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        alignItems: 'center',
        gap: 'clamp(40px, 6vw, 80px)',
        padding: 'clamp(48px, 8vw, 80px) 0',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Copy — order swaps on desktop via CSS order */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        custom={0}
        variants={fadeUp}
        style={{ order: reverse ? 2 : 1 }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: `${accent}18`,
            border: `1px solid ${accent}40`,
            borderRadius: 9999,
            padding: '5px 12px',
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 11.5, fontWeight: 700, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{tag}</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(22px, 3.5vw, 40px)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.024em',
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          {title}
        </h2>
        <p style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 28 }}>
          {description}
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {bullets.map((b) => (
            <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: `${accent}20`,
                  border: `1px solid ${accent}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                <Check size={10} color={accent} strokeWidth={2.5} />
              </span>
              <span style={{ fontSize: 'clamp(13px, 1.5vw, 14.5px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>{b}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Image */}
      <div ref={imgRef} style={{ order: reverse ? 1 : 2, position: 'relative', opacity: 0 }}>
        <div
          style={{
            position: 'absolute',
            inset: -40,
            background: `radial-gradient(ellipse at center, ${accent}28 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
        <img
          src={imageSrc}
          alt={imageAlt}
          style={{ width: '100%', height: 'auto', position: 'relative', zIndex: 1, borderRadius: 16, filter: `drop-shadow(0 24px 48px ${accent}40)` }}
        />
      </div>
    </div>
  );
}

export function LandingFeatures() {
  return (
    <section id="features" style={{ background: '#0A0A09', padding: 'clamp(48px, 8vw, 80px) 20px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: 16 }}
        >
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>
            Features
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 4.5vw, 48px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.028em', lineHeight: 1.1, marginBottom: 16 }}>
            Everything you need to win online
          </h2>
          <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: 'rgba(255,255,255,0.45)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
            Three interconnected tools that cover the full creator workflow — from idea to delivery.
          </p>
        </motion.div>

        <FeatureRow
          index={0}
          tag="Content Analysis"
          title="Know exactly why your content works — or doesn't"
          description="Paste any post, caption, article, or thread. BuffByte runs it through 14 AI scoring dimensions including virality potential, brand voice, sentiment, readability, and platform fit — then delivers a clear score and actionable improvements."
          bullets={[
            'Virality score with benchmarked comparisons',
            'Sentiment and emotional resonance analysis',
            'Brand consistency voice check',
            'Platform-specific optimization tips',
            'Risk & controversy flagging',
          ]}
          imageSrc="/landing/hero-product-ui.png"
          imageAlt="Content analysis score dashboard"
          accent="#533AFD"
        />

        <FeatureRow
          index={1}
          tag="Script Analysis"
          title="Scripts that hook, hold, and convert"
          description="Upload or paste your video script. BuffByte scores your hook strength, pacing, audience retention likelihood, and CTA effectiveness — giving you a precise roadmap to a better video before you ever hit record."
          bullets={[
            'Hook strength scoring in the first 3 seconds',
            'Pacing analysis and engagement prediction',
            'Word count and delivery time estimation',
            'Platform-specific length recommendations',
            'One-click send to Teleprompter',
          ]}
          imageSrc="/landing/script-analysis-card.png"
          imageAlt="Script analysis metrics card"
          reverse
          accent="#7C3AED"
        />

        <FeatureRow
          index={2}
          tag="AI Teleprompter"
          title="Deliver every word with total confidence"
          description="Send your polished script straight to BuffByte's built-in teleprompter. Adjust font size, scroll speed, and WPM in real time. Record without losing eye contact, without losing your place, without re-shooting 12 times."
          bullets={[
            'Smooth variable-speed auto-scroll',
            'Large, readable text optimized for on-camera use',
            'One-tap play, pause, and reset',
            'Keyboard shortcuts for hands-free control',
            'Seamless handoff from script analysis',
          ]}
          imageSrc="/landing/teleprompter.png"
          imageAlt="AI teleprompter setup"
          accent="#2563EB"
        />
      </div>
    </section>
  );
}
