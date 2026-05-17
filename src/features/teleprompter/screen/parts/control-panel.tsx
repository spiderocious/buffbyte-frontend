import { useState } from 'react';
import { Show } from 'meemaw';
import { ChevronUp, ChevronDown, Settings } from '@ui/icons';
import { Slider, Textarea } from '@ui/input';
import { useTeleprompter } from '../../providers/use-teleprompter';

export function ControlPanel() {
  const { script, setScript, speed, setSpeed, fontSize, setFontSize } = useTeleprompter();
  const [open, setOpen] = useState(true);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'rgba(10,10,9,0.92)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Toggle bar */}
      <div className="flex items-center justify-between px-6 py-2">
        <div className="flex items-center gap-3 text-[12px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
          <Settings size={13} />
          <span>Controls</span>
        </div>
        <button
          onClick={() => setOpen((p) => !p)}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 12,
          }}
        >
          <Show when={open} fallback={<ChevronDown size={13} />}>
            <ChevronUp size={13} />
          </Show>
          {open ? 'Hide' : 'Show'}
        </button>
      </div>

      <Show when={open}>
        <div className="px-6 pb-4 flex flex-col gap-4">
          {/* Script textarea */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 6,
              }}
            >
              Script
            </label>
            <Textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Paste your script here, or open via Script Analysis…"
              className="min-h-[80px] text-[13px]"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderColor: 'rgba(255,255,255,0.08)',
                color: 'rgba(250,247,242,0.9)',
              }}
            />
          </div>

          {/* Controls row */}
          <div className="grid gap-6" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  style={{
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  Speed
                </label>
                <span style={{ fontSize: 13, color: 'rgba(250,247,242,0.8)', fontVariantNumeric: 'tabular-nums' }}>
                  {speed} WPM
                </span>
              </div>
              <Slider
                min={50}
                max={200}
                step={5}
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  style={{
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  Font size
                </label>
                <span style={{ fontSize: 13, color: 'rgba(250,247,242,0.8)', fontVariantNumeric: 'tabular-nums' }}>
                  {fontSize}px
                </span>
              </div>
              <Slider
                min={16}
                max={72}
                step={2}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
