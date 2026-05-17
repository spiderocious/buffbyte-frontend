import { Play, Pause, RotateCcw, Maximize2 } from '@ui/icons';
import { Slider } from '@ui/input';
import { useTeleprompter } from '../../providers/use-teleprompter';

export function TransportDock() {
  const { isPlaying, play, pause, reset, speed, setSpeed } = useTeleprompter();

  function togglePlay() {
    if (isPlaying) pause();
    else play();
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        backgroundColor: 'rgba(10,10,9,0.88)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(8px)',
        padding: '12px 32px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: 16,
      }}
    >
      {/* Left — meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div>
          <p
            style={{
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.35)',
              margin: 0,
              marginBottom: 2,
            }}
          >
            Speed
          </p>
          <p
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: 'rgba(250,247,242,0.9)',
              margin: 0,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {speed} WPM
          </p>
        </div>
      </div>

      {/* Center — transport */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          backgroundColor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 999,
          padding: '8px 12px',
        }}
      >
        {/* Reset */}
        <button
          onClick={reset}
          aria-label="Restart"
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 150ms',
          }}
        >
          <RotateCcw size={15} />
        </button>

        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: 'rgba(250,247,242,1)',
            color: '#0A0A09',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 150ms',
          }}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Fullscreen */}
        <button
          onClick={() => void document.documentElement.requestFullscreen?.()}
          aria-label="Fullscreen"
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Maximize2 size={15} />
        </button>
      </div>

      {/* Right — speed slider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'flex-end' }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' }}>50</span>
        <Slider
          min={50}
          max={200}
          step={5}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="max-w-[140px]"
        />
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' }}>200</span>
      </div>
    </div>
  );
}
