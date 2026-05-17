import { useEffect, useState } from 'react';
import { Modal } from '@shared/ui/modal';

export interface AnalysisLoaderProps {
  readonly open: boolean;
  readonly type?: 'content' | 'script';
}

type PhaseId = 'init' | 'read' | 'deep' | 'opt';

interface Phase {
  readonly id: PhaseId;
  readonly label: string;
  readonly messages: readonly string[];
  readonly duration: number;
}

const PHASES: readonly Phase[] = [
  { id: 'init', label: 'Initializing',    messages: ['Spinning up the AI engine…', 'Warming up neural pathways…'],                                                     duration: 4000  },
  { id: 'read', label: 'Reading Content', messages: ['Parsing structure and syntax…', 'Extracting linguistic patterns…', 'Mapping semantic relationships…'],            duration: 7000  },
  { id: 'deep', label: 'Deep Analysis',   messages: ['Running 14 scoring dimensions…', 'Benchmarking against viral content…', 'Calculating sentiment vectors…'],        duration: 11000 },
  { id: 'opt',  label: 'Optimization',    messages: ['Crafting personalized recommendations…', 'Generating platform-specific insights…', 'Finalizing your report…'],    duration: 8000  },
];

const CONTENT_FACTS = [
  'Posts with questions get 2× more engagement on average.',
  'The first 3 words determine if readers keep scrolling.',
  'Authenticity beats production quality 9 out of 10 times.',
  'The sweet spot for LinkedIn posts is 150–300 words.',
  'Shorter captions outperform long ones on Instagram by 30%.',
];

const SCRIPT_FACTS = [
  'Videos under 60s get watched to completion 68% of the time.',
  'A strong hook in the first 3 seconds doubles average watch time.',
  'Conversational tone performs better than scripted delivery.',
  'Calls-to-action mid-video see 2× more clicks than end cards.',
  'Stories outperform list-style scripts for emotional recall.',
];

const CARDS = ['Sentiment', 'Virality', 'Brand', 'Platform', 'Risk', 'Tips'];

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 5l2.5 2.5 3.5-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpinIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="animate-spin">
      <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.25" />
      <path d="M5 1a4 4 0 0 1 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function useLoaderState() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [cardsDone, setCardsDone] = useState(0);

  useEffect(() => {
    let elapsed = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    PHASES.forEach((phase, i) => {
      timers.push(setTimeout(() => { setPhaseIndex(i); setMsgIndex(0); }, elapsed));
      elapsed += phase.duration;
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const phase = PHASES[phaseIndex];
    const t = setInterval(() => setMsgIndex((m) => (m + 1) % phase.messages.length), 3000);
    return () => clearInterval(t);
  }, [phaseIndex]);

  useEffect(() => {
    const t = setInterval(() => setFactIndex((f) => f + 1), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i < CARDS.length) { setCardsDone((c) => c + 1); i++; }
      else clearInterval(t);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return { phaseIndex, msgIndex, factIndex, cardsDone };
}

function LoaderContent({ type }: { readonly type: 'content' | 'script' }) {
  const { phaseIndex, msgIndex, factIndex, cardsDone } = useLoaderState();
  const phase = PHASES[phaseIndex];
  const msg = phase.messages[msgIndex % phase.messages.length];
  const facts = type === 'script' ? SCRIPT_FACTS : CONTENT_FACTS;
  const fact = facts[factIndex % facts.length];

  return (
    <>
      {/* Header */}
      <div className="px-6 py-4 border-b border-hair flex items-center gap-3">
        <div className="relative w-8 h-8 flex-shrink-0">
          <span className="absolute inset-0 rounded-full border border-accent animate-ping opacity-40" />
          <span className="absolute inset-0 rounded-full border-2 border-accent/30" />
          <svg className="absolute inset-0 animate-spin" viewBox="0 0 32 32" style={{ animationDuration: '1.6s' }}>
            <circle cx="16" cy="16" r="13" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="20 62" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-ink m-0 leading-tight">{msg}</p>
          <p className="text-[11px] text-ink-3 m-0 mt-0.5">{phase.label} · step {phaseIndex + 1} of {PHASES.length}</p>
        </div>
      </div>

      {/* Phase stepper */}
      <div className="px-6 py-4 border-b border-hair">
        <div className="flex items-center">
          {PHASES.map((p, i) => (
            <div key={p.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: i <= phaseIndex ? 'var(--accent)' : 'var(--paper-deep)',
                    color: i <= phaseIndex ? 'var(--paper)' : 'var(--ink-3)',
                  }}
                >
                  {i < phaseIndex ? <CheckIcon /> : <span className="text-[9px] font-bold">{i + 1}</span>}
                </div>
                <span className="text-[9px] text-ink-3 uppercase tracking-wider font-medium leading-tight text-center w-[56px]">{p.label}</span>
              </div>
              {i < PHASES.length - 1 && (
                <div
                  className="flex-1 h-px mx-1 mb-4 transition-colors duration-500"
                  style={{ background: i < phaseIndex ? 'var(--accent)' : 'var(--hair)' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Processing cards */}
      <div className="px-6 py-4 border-b border-hair">
        <p className="text-[10px] uppercase tracking-[var(--track-overline)] text-ink-3 m-0 mb-3">Processing</p>
        <div className="grid grid-cols-3 gap-2">
          {CARDS.map((card, i) => {
            const done = i < cardsDone;
            return (
              <div
                key={card}
                className="rounded-soft p-2.5 border border-hair flex items-center gap-1.5 transition-all duration-300"
                style={{ background: done ? 'var(--accent-tint)' : 'var(--paper-deep)' }}
              >
                <span style={{ color: done ? 'var(--accent-ink)' : 'var(--ink-3)' }}>
                  {done ? <CheckIcon /> : <SpinIcon />}
                </span>
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider leading-none"
                  style={{ color: done ? 'var(--accent-ink)' : 'var(--ink-3)' }}
                >
                  {card}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fact ticker */}
      <div className="px-6 py-4">
        <p className="text-[10px] uppercase tracking-[var(--track-overline)] text-ink-3 m-0 mb-1.5">Did you know?</p>
        <p key={factIndex} className="text-[12.5px] text-ink-2 m-0 leading-[1.55]">{fact}</p>
      </div>
    </>
  );
}

export function AnalysisLoader({ open, type = 'content' }: AnalysisLoaderProps) {
  return (
    <Modal open={open} onClose={() => { /* non-dismissible while analysis runs */ }}>
      <LoaderContent type={type} />
    </Modal>
  );
}
