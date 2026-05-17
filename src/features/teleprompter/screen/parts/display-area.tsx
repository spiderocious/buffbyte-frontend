import { useRef } from 'react';
import { Show } from 'meemaw';
import { useTeleprompter } from '../../providers/use-teleprompter';
import { useTeleprompterScroll } from '../../utils/use-teleprompter-scroll';

export function DisplayArea() {
  const { script, fontSize } = useTeleprompter();
  const containerRef = useRef<HTMLDivElement>(null);

  useTeleprompterScroll(containerRef);

  const paragraphs = script
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div
      ref={containerRef}
      className="no-scrollbar"
      style={{
        position: 'fixed',
        inset: 0,
        overflowY: 'auto',
        paddingTop: 240,
        paddingBottom: 120,
      }}
    >
      {/* Top fade */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 200,
          background: 'linear-gradient(to bottom, #0A0A09, transparent)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Reading baseline */}
      <div
        style={{
          position: 'fixed',
          left: '10%',
          right: '10%',
          top: '42%',
          height: 1,
          background: 'linear-gradient(to right, transparent, var(--accent), transparent)',
          opacity: 0.3,
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* Script text */}
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 40px',
        }}
      >
        <Show
          when={paragraphs.length > 0}
          fallback={
            <p
              style={{
                fontSize: Math.max(fontSize * 0.5, 24),
                color: 'rgba(255,255,255,0.25)',
                textAlign: 'center',
                marginTop: '20vh',
                fontStyle: 'italic',
              }}
            >
              Paste your script in the controls above to begin…
            </p>
          }
        >
          {paragraphs.map((para, idx) => (
            <p
              key={idx}
              style={{
                fontSize,
                fontWeight: 500,
                lineHeight: 1.45,
                letterSpacing: '-0.022em',
                color: 'rgba(250,247,242,0.9)',
                marginBottom: `${fontSize * 0.8}px`,
                transition: 'color 300ms ease',
              }}
            >
              {para}
            </p>
          ))}
        </Show>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: 'linear-gradient(to top, #0A0A09, transparent)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
