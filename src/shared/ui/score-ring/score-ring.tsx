/**
 * ScoreRing — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/20-ring.html
 * Tokens: _foundation.css :324-348
 *
 * SVG circular arc at three sizes: hero (220px), card (88px), inline (32px).
 * Value 0–100. Colour: accent | warn | crit | ink.
 */
import { cn } from '@shared/ui/utils/cn';

export type ScoreRingSize = 'hero' | 'card' | 'inline';
export type ScoreRingColor = 'accent' | 'warn' | 'crit' | 'ink';

export interface ScoreRingProps {
  readonly value: number;
  readonly size?: ScoreRingSize;
  readonly color?: ScoreRingColor;
  readonly label?: string;
  readonly className?: string;
}

// r must satisfy: r + sw/2 <= px/2  (arc must not clip outside viewBox)
// Safe formula: r = px/2 - sw/2 - 2
const sizeMap: Record<ScoreRingSize, { px: number; r: number; sw: number; fontSize: number; unitSize: number }> = {
  hero:   { px: 180, r: 82,  sw: 10, fontSize: 32, unitSize: 20 },
  card:   { px: 88,  r: 38,  sw:  6, fontSize: 14, unitSize: 10 },
  inline: { px: 44,  r: 18,  sw:  4, fontSize: 10, unitSize: 0  },
};

const colorVars: Record<ScoreRingColor, string> = {
  accent: 'var(--accent)',
  warn:   'var(--warn)',
  crit:   'var(--crit)',
  ink:    'var(--ink)',
};

const valueColors: Record<ScoreRingColor, string> = {
  accent: 'text-accent',
  warn:   'text-warn-deep',
  crit:   'text-crit',
  ink:    'text-ink',
};

export function ScoreRing({
  value,
  size = 'card',
  color = 'accent',
  label,
  className,
}: ScoreRingProps) {
  const { px, r, sw, fontSize, unitSize } = sizeMap[size];
  const cx = px / 2;
  const cy = px / 2;
  const circumference = 2 * Math.PI * r;
  const clampedValue = Math.max(0, Math.min(100, value));
  const offset = circumference * (1 - clampedValue / 100);
  const vb = `0 0 ${px} ${px}`;
  const strokeColor = colorVars[color];

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: px, height: px }}
    >
      <svg viewBox={vb} style={{ width: px, height: px, transform: 'rotate(-90deg)', overflow: 'hidden' }}>
        <circle
          cx={cx} cy={cy} r={r}
          stroke="var(--paper-deep)" strokeWidth={sw} fill="none"
        />
        <circle
          cx={cx} cy={cy} r={r}
          stroke={strokeColor} strokeWidth={sw} fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="butt"
          style={{ transition: 'stroke-dashoffset 600ms ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span
          className={cn(
            'font-bold leading-none tabular-nums',
            valueColors[color],
          )}
          style={{ fontSize }}
        >
          {clampedValue}
          {unitSize > 0 && (
            <span className="text-ink-3" style={{ fontSize: unitSize }}>%</span>
          )}
        </span>
        {label !== undefined && size !== 'inline' && (
          <span className="text-[9px] text-ink-3 uppercase tracking-[var(--track-overline)] mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Sentiment gauge (half-ring, bipolar) ───────────────────────────────── */

export interface SentimentGaugeProps {
  readonly value: number;
  readonly confidence?: number;
  readonly className?: string;
}

export function SentimentGauge({ value, confidence, className }: SentimentGaugeProps) {
  // value: -1 to +1. Map to 0–180 degrees on a half circle.
  const clampedVal = Math.max(-1, Math.min(1, value));
  const angleDeg = ((clampedVal + 1) / 2) * 180;
  const angleRad = (angleDeg * Math.PI) / 180;
  const cx = 100;
  const cy = 100;
  const r = 80;
  const dotX = cx + r * Math.cos(Math.PI - angleRad);
  const dotY = cy - r * Math.sin(angleRad);
  const arcLength = angleRad * r;
  const totalArcLength = Math.PI * r;

  return (
    <div className={cn('w-full max-w-[380px]', className)}>
      <svg viewBox="0 0 200 110" style={{ width: '100%', height: 100 }}>
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          stroke="var(--hair)" strokeWidth="6" fill="none" strokeLinecap="round"
        />
        <path
          d={`M 20 100 A 80 80 0 0 1 ${dotX.toFixed(2)} ${dotY.toFixed(2)}`}
          stroke="var(--accent)" strokeWidth="6" fill="none" strokeLinecap="round"
          strokeDasharray={`${arcLength} ${totalArcLength}`}
          style={{ transition: 'stroke-dasharray 600ms ease-out' }}
        />
        <circle cx={dotX} cy={dotY} r="6" fill="var(--accent)" />
        <text
          x="100" y="80" textAnchor="middle"
          fill="var(--ink)" fontFamily="Inter" fontSize="38" fontWeight="600"
          letterSpacing="-1"
        >
          {clampedVal.toFixed(2)}
        </text>
        {confidence !== undefined && (
          <text
            x="100" y="100" textAnchor="middle"
            fill="var(--ink-3)" fontFamily="Inter" fontSize="9" letterSpacing="2"
          >
            POSITIVE · {confidence}% CONFIDENCE
          </text>
        )}
      </svg>
      <div className="flex justify-between mt-2 text-[11px] text-ink-3 uppercase tracking-[var(--track-overline)]">
        <span>−1 · Negative</span>
        <span>0 · Neutral</span>
        <span>+1 · Positive</span>
      </div>
    </div>
  );
}
