import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, BarChart2, Clock, Shield } from '@ui/icons';
import { fadeUp } from './animations';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  { icon: <Zap size={22} color="#D97706" strokeWidth={1.8} />, color: '#D97706', iconBg: '#FEF3C7', title: 'Instant results', body: 'No waiting. Paste your content and get a full AI analysis in under 10 seconds. Iterate fast, publish faster.' },
  { icon: <BarChart2 size={22} color="var(--accent)" strokeWidth={1.8} />, color: '#533AFD', iconBg: 'var(--accent-tint)', title: 'Data-backed decisions', body: 'Every recommendation is grounded in patterns from thousands of top-performing pieces of content — not guesswork.' },
  { icon: <Clock size={22} color="#059669" strokeWidth={1.8} />, color: '#059669', iconBg: '#D1FAE5', title: 'Save hours every week', body: 'Stop agonizing over every word. BuffByte gives you clarity in seconds so you can create more and second-guess less.' },
  { icon: <Shield size={22} color="#2563EB" strokeWidth={1.8} />, color: '#2563EB', iconBg: '#EFF6FF', title: 'Your content stays yours', body: 'We never train on your content. Your scripts, posts, and ideas remain completely private and belong only to you.' },
] as const;

export function LandingWhy() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll<HTMLElement>('.why-card');
    const ctx = gsap.context(() => {
      items.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 48, scale: 0.94 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, ease: 'power3.out', delay: i * 0.12,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        );
      });
    }, gridRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section style={{ background: 'var(--paper)', padding: 'clamp(64px, 10vw, 120px) 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>
            Why BuffByte
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 4.5vw, 48px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.028em', lineHeight: 1.1 }}>
            The creator's unfair advantage
          </h2>
        </motion.div>

        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
          {PILLARS.map(({ icon, color, iconBg, title, body }) => (
            <div
              key={title}
              className="why-card"
              style={{
                background: 'var(--sheet)',
                border: '1px solid var(--hair)',
                borderRadius: 16,
                padding: 'clamp(24px, 3vw, 32px) clamp(20px, 3vw, 28px)',
                opacity: 0,
                boxShadow: 'var(--shade-pop)',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 18,
                }}
              >
                {icon}
              </div>
              <h3 style={{ fontSize: 'clamp(15px, 2vw, 17px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.014em', marginBottom: 10 }}>
                {title}
              </h3>
              <p style={{ fontSize: 'clamp(13px, 1.5vw, 14px)', color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>
                {body}
              </p>
              <div style={{ marginTop: 20, height: 3, borderRadius: 99, background: `${color}20`, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '70%', borderRadius: 99, background: color, opacity: 0.5 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
