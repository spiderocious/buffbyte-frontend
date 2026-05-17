/**
 * Banner — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/41-feedback.html
 * Tokens: _foundation.css accent-tint/edge/ink, warn-*, crit-*, ink
 *
 * Four variants: info (accent), warn, crit, ink (dark announcement).
 * Optional leading icon, body text, dismiss callback, and action slot.
 */
import { cn } from '@shared/ui/utils/cn';

export interface BannerProps {
  readonly variant?: 'info' | 'warn' | 'crit' | 'ink';
  readonly icon?: React.ReactNode;
  readonly children: React.ReactNode;
  readonly action?: React.ReactNode;
  readonly onDismiss?: () => void;
  readonly className?: string;
}

const variantClasses: Record<NonNullable<BannerProps['variant']>, string> = {
  info: 'bg-accent-tint text-accent-ink border-accent-edge',
  warn: 'bg-warn-bg text-warn-deep border-warn-edge',
  crit: 'bg-crit-bg text-crit-deep border-crit-edge',
  ink: 'bg-ink text-paper border-ink',
};

const iconColorClasses: Record<NonNullable<BannerProps['variant']>, string> = {
  info: 'text-accent',
  warn: 'text-warn-deep',
  crit: 'text-crit',
  ink: 'text-accent',
};

export function Banner({ variant = 'info', icon, children, action, onDismiss, className }: BannerProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-[14px] px-[18px] py-[14px] border rounded-soft',
        variantClasses[variant],
        className,
      )}
    >
      {icon !== undefined && (
        <span className={cn('flex-shrink-0 mt-[1px]', iconColorClasses[variant])}>
          {icon}
        </span>
      )}
      <div className="flex-1 text-[13.5px] leading-[1.5]">
        {children}
      </div>
      {action !== undefined && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {action}
        </div>
      )}
      {onDismiss !== undefined && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-0 p-0 leading-none text-current"
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* ─── Inline coach note ───────────────────────────────────────────────────── */

export interface InlineNoteProps {
  readonly coach?: boolean;
  readonly icon?: React.ReactNode;
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function InlineNote({ coach = false, icon, children, className }: InlineNoteProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 px-[14px] py-3 border border-hair rounded-soft bg-paper text-[13px] leading-[1.55] text-ink-2',
        coach && 'border-l-2 border-l-accent',
        className,
      )}
    >
      {icon !== undefined && (
        <span className="text-accent flex-shrink-0 mt-[1px]">{icon}</span>
      )}
      <div>{children}</div>
    </div>
  );
}
