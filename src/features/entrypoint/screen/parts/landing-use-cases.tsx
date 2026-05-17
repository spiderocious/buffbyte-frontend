import { motion } from 'framer-motion';
import { Video, Mic, Briefcase, ImageIcon, MonitorPlay, Shield } from '@ui/icons';
import { fadeUp } from './animations';

const CASES = [
  { icon: <Video size={20} strokeWidth={1.8} />, type: 'YouTubers', headline: 'Scripts that keep viewers watching', body: 'Score your hook, predict your retention curve, and teleprompter your way through every take — without losing eye contact.', color: '#FF4444' },
  { icon: <Mic size={20} strokeWidth={1.8} />, type: 'Podcasters', headline: 'Outlines that flow, episodes that grow', body: 'Analyze your episode outline for pacing and audience engagement before you hit record. Know your best segments before you spend hours editing.', color: '#A855F7' },
  { icon: <Briefcase size={20} strokeWidth={1.8} />, type: 'LinkedIn Creators', headline: 'Posts that rank on feeds, not just feelings', body: 'Stop guessing what makes a post go viral. Get a virality score, brand voice check, and platform-specific hooks before you publish.', color: '#0077B5' },
  { icon: <ImageIcon size={20} strokeWidth={1.8} />, type: 'Instagram & TikTok', headline: 'Captions that convert in the first line', body: 'The first 125 characters determine your reach. BuffByte tells you exactly how strong your opening is — and how to make it sharper.', color: '#E1306C' },
  { icon: <MonitorPlay size={20} strokeWidth={1.8} />, type: 'Course Creators', headline: 'Lessons that actually land', body: 'Analyze each module script for clarity, pacing, and information density. Students stay enrolled when lessons feel effortless.', color: '#F59E0B' },
  { icon: <Shield size={20} strokeWidth={1.8} />, type: 'Brand Marketers', headline: 'Content that stays on-brand, always', body: 'Run every post, reel, and caption through a brand voice consistency check. Never ship off-brand content to your audience again.', color: '#10B981' },
] as const;

export function LandingUseCases() {
  return (
    <section style={{ background: '#0A0A09', padding: 'clamp(64px, 10vw, 120px) 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>Use cases</p>
          <h2 style={{ fontSize: 'clamp(26px, 4.5vw, 48px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.028em', lineHeight: 1.1, marginBottom: 16 }}>
            Built for every kind of creator
          </h2>
          <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
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
              whileHover={{ scale: 1.02, borderColor: `${color}40`, backgroundColor: `${color}08` }}
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16,
                padding: 'clamp(20px, 3vw, 28px)',
                cursor: 'default',
                transition: 'border-color 300ms, background 300ms',
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: 14 }}>
                {icon}
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: `${color}CC`, marginBottom: 8 }}>{type}</p>
              <h3 style={{ fontSize: 'clamp(15px, 1.8vw, 16.5px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.014em', lineHeight: 1.3, marginBottom: 10 }}>{headline}</h3>
              <p style={{ fontSize: 'clamp(12.5px, 1.4vw, 13.5px)', color: 'rgba(255,255,255,0.42)', lineHeight: 1.65, margin: 0 }}>{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
