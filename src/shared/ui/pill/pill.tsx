/**
 * Pill / StatusPill — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/13-pills.html
 * Tokens: _foundation.css :279-298
 *
 * Pill — value chip / label tag. Five chroma variants.
 * StatusPill — with animated pip dot. Four state variants.
 */
import { cn } from '@shared/ui/utils/cn';

/* ─── Pill ───────────────────────────────────────────────────────────────── */

export type PillVariant = 'default' | 'accent' | 'warn' | 'crit' | 'ink';

export interface PillProps {
  readonly variant?: PillVariant;
  readonly children: React.ReactNode;
  readonly className?: string;
}

const pillVariants: Record<PillVariant, string> = {
  default: 'bg-paper-deep text-ink-2 border-hair',
  accent:  'bg-accent-tint text-accent-ink border-accent-edge',
  warn:    'bg-warn-bg text-warn-deep border-warn-edge',
  crit:    'bg-crit-bg text-crit-deep border-crit-edge',
  ink:     'bg-ink text-paper border-ink',
};

export function Pill({ variant = 'default', className, children }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[6px] h-[22px] px-[10px]',
        'rounded-pill text-[11.5px] font-medium tracking-[var(--track-label)]',
        'border whitespace-nowrap',
        pillVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ─── StatusPill ─────────────────────────────────────────────────────────── */

export type StatusVariant = 'default' | 'live' | 'warn' | 'crit';

export interface StatusPillProps {
  readonly status?: StatusVariant;
  readonly children: React.ReactNode;
  readonly className?: string;
}

const pipColors: Record<StatusVariant, string> = {
  default: 'bg-ink-3',
  live:    'bg-accent shadow-[0_0_0_3px_rgba(83,58,253,0.15)]',
  warn:    'bg-warn',
  crit:    'bg-crit',
};

export function StatusPill({ status = 'default', className, children }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[6px] py-0.5 pl-[6px] pr-[10px]',
        'rounded-pill text-[11.5px] font-medium',
        'bg-paper-deep text-ink-2 border border-hair whitespace-nowrap',
        className,
      )}
    >
      <span
        className={cn(
          'w-[6px] h-[6px] rounded-full flex-shrink-0',
          pipColors[status],
        )}
      />
      {children}
    </span>
  );
}
