import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from '@ui/icons';
import { ROUTES } from '@shared/constants/routes';
import { fadeUp } from './animations';

gsap.registerPlugin(ScrollTrigger);

export function LandingCtaBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(bannerRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: bannerRef.current, start: 'top 85%', once: true } },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section style={{ background: '#0A0A09', padding: 'clamp(48px, 8vw, 80px) 20px clamp(64px, 10vw, 120px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          ref={bannerRef}
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #1A0F86 0%, #533AFD 50%, #7C3AED 100%)',
            borderRadius: 24,
            padding: 'clamp(48px, 7vw, 80px) clamp(24px, 6vw, 80px)',
            textAlign: 'center',
            overflow: 'hidden',
            opacity: 0,
          }}
        >
          <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, background: 'rgba(255,255,255,0.08)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, background: 'rgba(0,0,0,0.2)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', backgroundImage: 'url(/landing/wavy.png)', backgroundSize: 'cover', backgroundPosition: 'center top', opacity: 0.18, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ fontSize: 'clamp(26px, 5vw, 52px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.028em', lineHeight: 1.08, marginBottom: 16 }}
            >
              Your next piece of content<br />should be your best one.
            </motion.h2>
            <motion.p
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1} variants={fadeUp}
              style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.65)', maxWidth: 440, margin: '0 auto 40px', lineHeight: 1.6 }}
            >
              Join creators who use BuffByte to ship smarter content, faster.
            </motion.p>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2} variants={fadeUp}
              style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <Link
                to={ROUTES.AUTH.LOGIN}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#1A0F86', fontWeight: 800, fontSize: 'clamp(14px, 2vw, 15px)', padding: 'clamp(12px, 2vw, 14px) clamp(20px, 3vw, 28px)', borderRadius: 10, textDecoration: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', transition: 'transform 200ms', whiteSpace: 'nowrap' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; }}
              >
                Start for free <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0 }}>No credit card required</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
