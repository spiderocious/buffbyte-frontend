import { motion } from 'framer-motion';
import { Star } from '@ui/icons';
import { fadeUp } from './animations';

const TESTIMONIALS = [
  { quote: "I went from spending 2 hours second-guessing every post to shipping in 20 minutes with a 91 content score. BuffByte is the unfair advantage I didn't know I needed.", name: 'Maya Okonkwo', role: 'YouTube Creator · 280k subscribers', initials: 'MO', color: '#533AFD' },
  { quote: "The script analysis caught a pacing issue in my podcast intro that I'd had for six months. My average listen-through went up 18% in two weeks.", name: 'James Reilly', role: 'Podcast Host · The Creative Stack', initials: 'JR', color: '#7C3AED' },
  { quote: "As a brand strategist I need every piece of client content to feel consistent. The brand voice consistency score has saved me from so many off-brief moments.", name: 'Tola Adeyemi', role: 'Brand Strategist · Adeyemi Creative', initials: 'TA', color: '#2563EB' },
] as const;

export function LandingTestimonials() {
  return (
    <section
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
          backgroundImage: 'url(/landing/bg-texture.png)',
          backgroundSize: '400px 400px',
          opacity: 0.05,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>
            Testimonials
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 4.5vw, 48px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.028em', lineHeight: 1.1 }}>
            Creators are already winning
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
          {TESTIMONIALS.map(({ quote, name, role, initials, color }, i) => (
            <motion.div
              key={name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={i * 0.12}
              variants={fadeUp}
              whileHover={{ y: -4, boxShadow: `0 16px 48px ${color}18` }}
              style={{
                background: 'var(--sheet)',
                border: '1px solid var(--hair)',
                borderRadius: 16,
                padding: 'clamp(24px, 3vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                transition: 'box-shadow 300ms',
                boxShadow: 'var(--shade-pop)',
              }}
            >
              <div style={{ display: 'flex', gap: 3 }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#F59E0B" color="#F59E0B" />)}
              </div>
              <p
                style={{
                  fontSize: 'clamp(13.5px, 1.6vw, 15px)',
                  color: 'var(--ink-2)',
                  lineHeight: 1.72,
                  margin: 0,
                  fontStyle: 'italic',
                }}
              >
                "{quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `${color}18`,
                    border: `2px solid ${color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 700,
                    color,
                    flexShrink: 0,
                  }}
                >
                  {initials}
                </div>
                <div>
                  <p style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', margin: 0, letterSpacing: '-0.01em' }}>{name}</p>
                  <p style={{ fontSize: 12, color: 'var(--ink-4)', margin: 0, marginTop: 2 }}>{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
