import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from '@ui/icons';
import { fadeUp, overline, sectionH2 } from '../lib/tokens';

/* Accordion FAQ. */

const FAQS = [
  { q: 'How does the 14-dimension score work?', a: 'Each post is read across virality, sentiment, brand voice, readability, platform fit and ten more. You get one overall score plus a breakdown, so you know exactly which dimension to improve.' },
  { q: 'Which platforms does it support?', a: 'Paste content in any format, captions, threads, long-form or scripts. BuffByte scores platform fit so you know if a post suits where you’re sending it.' },
  { q: 'Do I need a separate teleprompter app?', a: 'No. The teleprompter is built in. A graded script hands off to it in one click, with variable-speed scroll and real-time WPM control.' },
  { q: 'Is there a free plan?', a: 'Yes. The Free plan gives you 10 content scores a month with all 14 dimensions and no card required.' },
  { q: 'Can I cancel anytime?', a: 'Anytime, from your account. Paid plans are month to month with no lock-in.' },
];

export function LandingFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ background: 'var(--paper)', padding: 'clamp(80px, 12vw, 140px) 0' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 48px' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} custom={0} variants={fadeUp} style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ ...overline, marginBottom: 16 }}>FAQ</span>
          <h2 style={{ ...sectionH2 }}>Questions, answered</h2>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={f.q} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} custom={i * 0.06} variants={fadeUp}
                style={{ background: 'var(--sheet)', border: '1px solid var(--hair)', borderRadius: 14, overflow: 'hidden' }}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '20px 22px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', font: 'inherit' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{f.q}</span>
                  <span style={{ display: 'grid', placeItems: 'center', width: 26, height: 26, borderRadius: '50%', background: 'var(--accent-tint)', color: 'var(--accent)', flexShrink: 0 }}>
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>
                <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 280ms ease' }}>
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0, padding: '0 22px 22px' }}>{f.a}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
