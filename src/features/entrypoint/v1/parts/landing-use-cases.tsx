import { motion } from 'framer-motion';
import { Video, Mic, Briefcase, ImageIcon, MonitorPlay, Shield } from '@ui/icons';
import { fadeUp } from './animations';

const CASES = [
  { icon: <Video size={20} strokeWidth={1.8} />, type: 'YouTubers', headline: 'Scripts that keep viewers watching', body: 'Score your hook, predict your retention curve, and teleprompter your way through every take — without losing eye contact.', color: '#DC2626' },
  { icon: <Mic size={20} strokeWidth={1.8} />, type: 'Podcasters', headline: 'Outlines that flow, episodes that grow', body: 'Analyze your episode outline for pacing and audience engagement before you hit record. Know your best segments before you spend hours editing.', color: '#7C3AED' },
  { icon: <Briefcase size={20} strokeWidth={1.8} />, type: 'LinkedIn Creators', headline: 'Posts that rank on feeds, not just feelings', body: 'Stop guessing what makes a post go viral. Get a virality score, brand voice check, and platform-specific hooks before you publish.', color: '#0077B5' },
  { icon: <ImageIcon size={20} strokeWidth={1.8} />, type: 'Instagram & TikTok', headline: 'Captions that convert in the first line', body: 'The first 125 characters determine your reach. BuffByte tells you exactly how strong your opening is — and how to make it sharper.', color: '#DB2777' },
  { icon: <MonitorPlay size={20} strokeWidth={1.8} />, type: 'Course Creators', headline: 'Lessons that actually land', body: 'Analyze each module script for clarity, pacing, and information density. Students stay enrolled when lessons feel effortless.', color: '#D97706' },
  { icon: <Shield size={20} strokeWidth={1.8} />, type: 'Brand Marketers', headline: 'Content that stays on-brand, always', body: 'Run every post, reel, and caption through a brand voice consistency check. Never ship off-brand content to your audience again.', color: '#059669' },
] as const;

export function LandingUseCases() {
  return (
    <section style={{ background: 'var(--sheet)', padding: 'clamp(64px, 10vw, 120px) 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>
            Use cases
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 4.5vw, 48px)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.028em', lineHeight: 1.1, marginBottom: 16 }}>
            Built for every kind of creator
          </h2>
          <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: 'var(--ink-3)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
            Whether you post daily or produce quarterly, BuffByte fits your workflow.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
          {CASES.map(({ icon, type, headline, body, color }, i) => (
            <motion.div
              key={type}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={i * 0.08}
              variants={fadeUp}
              whileHover={{ scale: 1.02, y: -2, boxShadow: `0 12px 32px ${color}18` }}
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--hair)',
                borderRadius: 16,
                padding: 'clamp(20px, 3vw, 28px)',
                cursor: 'default',
                transition: 'box-shadow 300ms',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: `${color}14`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color,
                  marginBottom: 14,
                }}
              >
                {icon}
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color, marginBottom: 8 }}>
                {type}
              </p>
              <h3 style={{ fontSize: 'clamp(15px, 1.8vw, 16.5px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.014em', lineHeight: 1.3, marginBottom: 10 }}>
                {headline}
              </h3>
              <p style={{ fontSize: 'clamp(12.5px, 1.4vw, 13.5px)', color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
