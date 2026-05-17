import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, BarChart2, TrendingUp } from '@ui/icons';
import { fadeUp } from './animations';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { number: '01', icon: <FileText size={22} color="var(--accent)" strokeWidth={1.8} />, iconBg: 'var(--accent-tint)', title: 'Paste your content', description: 'Drop in any piece of content — a social post, blog excerpt, video script, or podcast outline. No formatting required.' },
  { number: '02', icon: <BarChart2 size={22} color="#7C3AED" strokeWidth={1.8} />, iconBg: '#F3EEFF', title: 'Get your AI analysis', description: 'BuffByte runs 14 scoring dimensions in seconds. You get a clear overall score plus category-level breakdowns you can act on immediately.' },
  { number: '03', icon: <TrendingUp size={22} color="#2563EB" strokeWidth={1.8} />, iconBg: '#EEF3FF', title: 'Optimize and deliver', description: 'Apply the recommendations, re-score in one click, then send your final script to the built-in teleprompter and record with confidence.' },
] as const;

export function LandingHowItWorks() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll<HTMLElement>('.how-card');
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, rotateX: 10 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 0.9, ease: 'power3.out', delay: i * 0.15,
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          },
        );
      });
    }, cardsRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      style={{
        background: 'var(--paper-deep)',
        padding: 'clamp(64px, 10vw, 120px) 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/landing/bg-texture.webp)',
          backgroundSize: '400px 400px',
          opacity: 0.06,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>
            How it works
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 4.5vw, 48px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.028em', lineHeight: 1.1, marginBottom: 16 }}>
            From idea to published in three steps
          </h2>
          <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: 'var(--ink-3)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
            No complicated setup. No learning curve. Just paste, analyze, and go.
          </p>
        </motion.div>

        <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 20, perspective: 1000 }}>
          {STEPS.map(({ number, icon, iconBg, title, description }) => (
            <div
              key={number}
              className="how-card"
              style={{
                background: 'var(--sheet)',
                border: '1px solid var(--hair)',
                borderRadius: 16,
                padding: 'clamp(24px, 4vw, 36px) clamp(20px, 3vw, 32px)',
                position: 'relative',
                overflow: 'hidden',
                opacity: 0,
                transformStyle: 'preserve-3d',
                boxShadow: 'var(--shade-pop)',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: -8,
                  right: 20,
                  fontSize: 88,
                  fontWeight: 900,
                  color: 'var(--hair)',
                  lineHeight: 1,
                  userSelect: 'none',
                  letterSpacing: '-0.04em',
                }}
              >
                {number}
              </span>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                {icon}
              </div>
              <h3 style={{ fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.016em', marginBottom: 10 }}>
                {title}
              </h3>
              <p style={{ fontSize: 'clamp(13px, 1.5vw, 14.5px)', color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
