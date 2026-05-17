import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from '@ui/icons';
import { fadeUp } from './animations';

gsap.registerPlugin(ScrollTrigger);

const PLACEHOLDERS: Record<string, string> = {
  'hero-product-ui':    'data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAADQAwCdASoUAAsAPzmGuVOvKSWisAgB4CcJQAAMOHyIw6RRSa50SBgA/uDN9Gr96zxAUal6ZXqSwo81vIdIr9j+V02QlEBo87DiKncloUWcSW01yq6Q4S6TIKAAAA==',
  'script-analysis-card': 'data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAAAQBACdASoUAAsAPzmGuVOvKSWisAgB4CcJYgDImCPuL7q13Va2GflAAAD+4M30av3rPEAVTSx/UXbC1HAjigExlN9bS5o0QF949DJgENyI7b8zhhkhcoWn1ByzSLeAAAA=',
  'teleprompter':       'data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAAAwAwCdASoUAAsAPzmGuVOvKSWisAgB4CcJYwAAQx8HUevAAP7ZXRSWaZDLQA2+1KkxTBTmmAAAAA==',
};

interface BlurImageProps {
  readonly slug: string;
  readonly alt: string;
  readonly accent: string;
  readonly priority?: boolean;
}

function BlurImage({ slug, alt, accent, priority = false }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);
  const placeholder = PLACEHOLDERS[slug];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid var(--hair)',
        boxShadow: `0 24px 64px ${accent}20`,
        background: 'var(--paper-deep)',
      }}
    >
      {/* Blurred placeholder — always present, fades out when real image loads */}
      {placeholder && (
        <img
          src={placeholder}
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(24px)',
            transform: 'scale(1.08)',
            opacity: loaded ? 0 : 1,
            transition: 'opacity 500ms ease',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Real image — crossfades in when loaded */}
      <picture>
        <source srcSet={`/landing/${slug}.webp`} type="image/webp" />
        <img
          src={`/landing/${slug}.png`}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'low'}
          onLoad={() => setLoaded(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 500ms ease',
          }}
        />
      </picture>
    </div>
  );
}

interface FeatureRowProps {
  readonly tag: string;
  readonly title: string;
  readonly description: string;
  readonly bullets: readonly string[];
  readonly imageSlug: string;
  readonly imageAlt: string;
  readonly reverse?: boolean;
  readonly accent?: string;
  readonly index: number;
  readonly priority?: boolean;
}

function FeatureRow({ tag, title, description, bullets, imageSlug, imageAlt, reverse = false, accent = 'var(--accent)', index, priority = false }: FeatureRowProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: 40, opacity: 0, rotateY: reverse ? -6 : 6, scale: 0.97 },
        {
          y: 0, opacity: 1, rotateY: 0, scale: 1,
          duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      );
      gsap.to(el, {
        y: -10, duration: 4 + index * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: index * 0.3,
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
        borderBottom: '1px solid var(--hair-soft)',
      }}
    >
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
            background: `${accent}14`,
            border: `1px solid ${accent}30`,
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
            color: 'var(--ink)',
            letterSpacing: '-0.024em',
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          {title}
        </h2>
        <p style={{ fontSize: 'clamp(14px, 1.6vw, 16px)', color: 'var(--ink-3)', lineHeight: 1.7, marginBottom: 28 }}>
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
                  background: `${accent}14`,
                  border: `1px solid ${accent}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                <Check size={10} color={accent} strokeWidth={2.5} />
              </span>
              <span style={{ fontSize: 'clamp(13px, 1.5vw, 14.5px)', color: 'var(--ink-2)', lineHeight: 1.55 }}>{b}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Image wrapper — GSAP targets this */}
      <div ref={wrapRef} style={{ order: reverse ? 1 : 2, opacity: 0 }}>
        <div
          style={{
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: -40,
              background: `radial-gradient(ellipse at center, ${accent}12 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />
          <BlurImage slug={imageSlug} alt={imageAlt} accent={accent} priority={priority} />
        </div>
      </div>
    </div>
  );
}

export function LandingFeatures() {
  return (
    <section id="features" style={{ background: 'var(--paper)', padding: 'clamp(48px, 8vw, 80px) 20px 0' }}>
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
          <h2 style={{ fontSize: 'clamp(26px, 4.5vw, 48px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.028em', lineHeight: 1.1, marginBottom: 16 }}>
            Everything you need to win online
          </h2>
          <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: 'var(--ink-3)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
            Three interconnected tools that cover the full creator workflow — from idea to delivery.
          </p>
        </motion.div>

        <FeatureRow
          index={0}
          priority
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
          imageSlug="hero-product-ui"
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
          imageSlug="script-analysis-card"
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
          imageSlug="teleprompter"
          imageAlt="AI teleprompter setup"
          accent="#2563EB"
        />
      </div>
    </section>
  );
}
