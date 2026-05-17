/**
 * Tabs — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/12-selection.html (Scenes 01, 02)
 * Two variants: "pill" (top-level nav), "underline" (analysis result dimensions).
 * Both are fully controlled — consumer owns the active state.
 */
import { cn } from '@shared/ui/utils/cn';

/* ─── Shared types ───────────────────────────────────────────────────────── */

export interface TabItem {
  readonly value: string;
  readonly label: React.ReactNode;
  readonly badge?: React.ReactNode;
  readonly icon?: React.ReactNode;
}

/* ─── Pill tabs (top-level nav) ──────────────────────────────────────────── */

export interface PillTabsProps {
  readonly items: readonly TabItem[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly className?: string;
}

export function PillTabs({ items, value, onChange, className }: PillTabsProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-0 p-[6px] bg-paper-deep border border-hair rounded-pill',
        className,
      )}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={cn(
              'inline-flex items-center gap-[6px] px-4 py-2 rounded-pill',
              'text-[13px] font-medium cursor-pointer border-0',
              'font-sans transition-colors duration-[160ms] ease-out',
              'focus-visible:outline-none focus-visible:shadow-focus',
              active
                ? 'bg-sheet text-ink shadow-[var(--shade-1)]'
                : 'bg-transparent text-ink-3 hover:text-ink',
            )}
          >
            {item.icon !== undefined && (
              <span className="flex-shrink-0">{item.icon}</span>
            )}
            {item.label}
            {item.badge !== undefined && (
              <span
                className={cn(
                  'text-[11px] px-[6px] py-px rounded-pill border',
                  active
                    ? 'bg-accent-tint text-accent-ink border-accent-edge'
                    : 'bg-paper-deep text-ink-3 border-hair',
                )}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Underline tabs (analysis dimensions) ───────────────────────────────── */

export interface UnderlineTabsProps {
  readonly items: readonly TabItem[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly className?: string;
}

export function UnderlineTabs({ items, value, onChange, className }: UnderlineTabsProps) {
  return (
    <div className={cn('flex gap-6 border-b border-hair', className)}>
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={cn(
              'inline-flex items-center gap-2 px-0 py-3',
              'text-[13.5px] font-medium cursor-pointer border-0 bg-transparent',
              'border-b-2 -mb-px font-sans',
              'transition-colors duration-[160ms] ease-out',
              'focus-visible:outline-none focus-visible:shadow-focus',
              active
                ? 'text-accent border-accent'
                : 'text-ink-3 border-transparent hover:text-ink',
            )}
          >
            {item.label}
            {item.badge !== undefined && (
              <span
                className={cn(
                  'text-[11px] px-[6px] py-px rounded-pill border font-variant-numeric',
                  '[font-variant-numeric:tabular-nums]',
                  active
                    ? 'bg-accent-tint text-accent-ink border-accent-edge'
                    : 'bg-paper-deep text-ink-3 border-hair',
                )}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
