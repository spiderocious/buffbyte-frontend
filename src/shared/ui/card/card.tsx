/**
 * Card — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/24-cards.html
 * Tokens: _foundation.css :351-366
 *
 * AnalysisCard — the signature result card: ring slot + coach-quote + footer actions.
 * QuickCard    — dashboard quick-action tile with icon + hover lift.
 * Card         — generic surface wrapper.
 */
import { cn } from '@shared/ui/utils/cn';

/* ─── Generic card ───────────────────────────────────────────────────────── */

export interface CardProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly flush?: boolean;
}

export function Card({ children, className, flush = false }: CardProps) {
  return (
    <div
      className={cn(
        'border border-hair rounded-card',
        flush ? 'bg-paper' : 'bg-sheet p-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ─── Analysis card ──────────────────────────────────────────────────────── */

export interface AnalysisCardProps {
  readonly ringSlot: React.ReactNode;
  readonly title: string;
  readonly meta?: string;
  readonly coachNote?: string;
  readonly footerLeft?: React.ReactNode;
  readonly footerActions?: React.ReactNode;
  readonly className?: string;
}

export function AnalysisCard({
  ringSlot,
  title,
  meta,
  coachNote,
  footerLeft,
  footerActions,
  className,
}: AnalysisCardProps) {
  return (
    <div className={cn('border border-hair rounded-card bg-sheet overflow-hidden', className)}>
      <div className="p-[26px] grid gap-7" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        {/* Ring slot */}
        <div className="flex flex-col items-center gap-3">
          {ringSlot}
          <span className="text-[11px] text-ink-3 uppercase tracking-[var(--track-overline)]">
            Overall score
          </span>
        </div>
        {/* Summary */}
        <div>
          <h2 className="text-[22px] font-semibold tracking-[-0.014em] m-0 mb-[6px]">{title}</h2>
          {meta !== undefined && (
            <p className="text-[12.5px] text-ink-3 mb-4 m-0">{meta}</p>
          )}
          {coachNote !== undefined && (
            <blockquote className="border-l-2 border-accent pl-3 m-0 text-[14px] text-ink-2 leading-[1.55]">
              {coachNote}
            </blockquote>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between px-[26px] py-[14px] border-t border-hair bg-paper text-[12.5px] text-ink-3">
        <div>{footerLeft}</div>
        {footerActions !== undefined && (
          <div className="flex gap-2">{footerActions}</div>
        )}
      </div>
    </div>
  );
}

/* ─── Quick card (dashboard action tile) ─────────────────────────────────── */

export interface QuickCardProps {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly description?: string;
  readonly meta?: string;
  readonly onClick?: () => void;
  readonly className?: string;
}

export function QuickCard({ icon, title, description, meta, onClick, className }: QuickCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-left bg-sheet border border-hair rounded-card p-[22px]',
        'flex flex-col gap-[14px] cursor-pointer w-full',
        'transition-[border-color,transform] duration-[200ms] ease-out',
        'hover:border-ink-4 hover:-translate-y-px',
        'focus-visible:outline-none focus-visible:shadow-focus',
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 rounded-soft bg-accent-tint text-accent flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        {meta !== undefined && (
          <span className="text-[11px] text-ink-3 uppercase tracking-[var(--track-overline)]">{meta}</span>
        )}
      </div>
      <div>
        <div className="text-[14px] font-semibold tracking-[-0.01em] mb-1">{title}</div>
        {description !== undefined && (
          <div className="text-[12.5px] text-ink-3 leading-[1.5]">{description}</div>
        )}
      </div>
    </button>
  );
}
