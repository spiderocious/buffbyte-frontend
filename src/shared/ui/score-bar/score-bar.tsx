/**
 * ScoreBar — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/21-bars.html
 * Tokens: _foundation.css :305-323
 *
 * ScoreBar — 4px pill bar, single. Colour: accent | warn | crit | ink.
 * StackedBar — composite bar splitting a 100% total into named segments.
 */
import { cn } from '@shared/ui/utils/cn';

export type BarColor = 'accent' | 'warn' | 'crit' | 'ink' | 'muted';

export interface ScoreBarProps {
  readonly value: number;
  readonly color?: BarColor;
  readonly className?: string;
}

const fillColors: Record<BarColor, string> = {
  accent: 'bg-accent',
  warn:   'bg-warn',
  crit:   'bg-crit',
  ink:    'bg-ink',
  muted:  'bg-ink-3',
};

export function ScoreBar({ value, color = 'accent', className }: ScoreBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn(
        'h-1 rounded-pill overflow-hidden relative bg-hair-soft',
        className,
      )}
    >
      <div
        className={cn('absolute inset-y-0 left-0 rounded-pill', fillColors[color])}
        style={{ width: `${pct}%`, transition: 'width 600ms cubic-bezier(.2,.7,.2,1)' }}
      />
    </div>
  );
}

/* ─── Score line (label + value + bar row) ───────────────────────────────── */

export interface ScoreLineProps {
  readonly label: string;
  readonly sublabel?: string;
  readonly value: number;
  readonly color?: BarColor;
  readonly className?: string;
}

export function ScoreLine({ label, sublabel, value, color = 'accent', className }: ScoreLineProps) {
  const isGood = color === 'accent' || color === 'ink';
  return (
    <div className={cn('py-3 border-t border-hair first:border-t-0', className)}>
      <div className="flex items-baseline justify-between mb-[6px]">
        <div>
          <span className="text-[13px] font-medium">{label}</span>
          {sublabel !== undefined && (
            <span className="text-[11.5px] text-ink-3 ml-2">{sublabel}</span>
          )}
        </div>
        <span
          className={cn(
            'text-[13px] font-medium [font-variant-numeric:tabular-nums]',
            isGood ? 'text-accent' : color === 'warn' ? 'text-warn-deep' : 'text-crit',
          )}
        >
          {value}
        </span>
      </div>
      <ScoreBar value={value} color={color} />
    </div>
  );
}

/* ─── Stacked bar ────────────────────────────────────────────────────────── */

export interface StackedSegment {
  readonly label: string;
  readonly value: number;
  readonly color: BarColor;
}

export interface StackedBarProps {
  readonly segments: readonly StackedSegment[];
  readonly showLegend?: boolean;
  readonly className?: string;
}

const legendDotColors: Record<BarColor, string> = {
  accent: 'bg-accent',
  warn:   'bg-warn',
  crit:   'bg-crit',
  ink:    'bg-ink',
  muted:  'bg-ink-3',
};

export function StackedBar({ segments, showLegend = true, className }: StackedBarProps) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  return (
    <div className={className}>
      <div className="flex h-2 rounded-pill overflow-hidden border border-hair bg-hair-soft">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className={cn('block', fillColors[seg.color])}
            style={{ width: `${(seg.value / total) * 100}%` }}
          />
        ))}
      </div>
      {showLegend && (
        <div className="flex gap-4 mt-3 text-[11.5px] text-ink-3 flex-wrap">
          {segments.map((seg) => (
            <span key={seg.label} className="inline-flex items-center gap-[6px]">
              <span className={cn('w-2 h-2 rounded-[2px]', legendDotColors[seg.color])} />
              {seg.label} · {seg.value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
