/**
 * EmptyState — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/25-empty.html
 * Tokens: _foundation.css accent-tint, ink ramp
 *
 * Two variants:
 *   "empty"    — icon slot, heading, body, optional CTA
 *   "thinking" — pulsing ring + animated dots (AI is working)
 */
import { cn } from '@shared/ui/utils/cn';

/* ─── Empty state ────────────────────────────────────────────────────────── */

export interface EmptyStateProps {
  readonly icon?: React.ReactNode;
  readonly title: string;
  readonly description?: string;
  readonly action?: React.ReactNode;
  readonly className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-7', className)}>
      {icon !== undefined && (
        <div className="w-12 h-12 rounded-card bg-accent-tint text-accent flex items-center justify-center mb-5">
          {icon}
        </div>
      )}
      <h3 className="text-[14px] font-medium text-ink m-0 mb-1">{title}</h3>
      {description !== undefined && (
        <p className="text-[12.5px] text-ink-3 m-0 mb-5 max-w-[36ch] leading-[1.55]">{description}</p>
      )}
      {action !== undefined && action}
    </div>
  );
}

/* ─── Thinking state (AI in progress) ───────────────────────────────────── */

export interface ThinkingStateProps {
  readonly title?: string;
  readonly liveLabel?: string;
  readonly className?: string;
}

export function ThinkingState({
  title = 'Analyzing your content…',
  liveLabel = 'Running 14 dimensions',
  className,
}: ThinkingStateProps) {
  return (
    <div className={cn('flex items-center gap-[18px] p-7', className)}>
      <div className="relative w-[72px] h-[72px] rounded-full bg-accent-tint flex items-center justify-center flex-shrink-0">
        {/* ripple ring */}
        <span className="absolute inset-0 rounded-full border border-accent animate-ping opacity-60" />
        <svg
          width={26} height={26}
          viewBox="0 0 24 24" fill="none"
          stroke="var(--accent)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
        </svg>
      </div>
      <div>
        <h3 className="m-0 mb-1 text-[16px] font-semibold tracking-[-0.01em]">{title}</h3>
        <p className="text-[12.5px] text-ink-3 m-0 [font-feature-settings:'tnum'_1,'lnum'_1]">
          {liveLabel}
          <span className="inline-block ml-1 animate-pulse">·</span>
        </p>
      </div>
    </div>
  );
}
