/**
 * Table — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/22-tables.html
 * Tokens: _foundation.css hair, sheet, paper tokens
 *
 * Hairline above header and above each row. No vertical lines. No zebra.
 * Numbers sit right, tabular. Hover row = paper-deep, nothing more.
 */
import { cn } from '@shared/ui/utils/cn';

/* ─── Table shell ────────────────────────────────────────────────────────── */

export interface TableProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function Table({ children, className }: TableProps) {
  return (
    <div className={cn('border border-hair rounded-card bg-sheet overflow-hidden', className)}>
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

/* ─── Table header ───────────────────────────────────────────────────────── */

export interface TableHeadProps {
  readonly children: React.ReactNode;
}

export function TableHead({ children }: TableHeadProps) {
  return <thead>{children}</thead>;
}

/* ─── Table body ─────────────────────────────────────────────────────────── */

export interface TableBodyProps {
  readonly children: React.ReactNode;
}

export function TableBody({ children }: TableBodyProps) {
  return <tbody>{children}</tbody>;
}

/* ─── Table row ──────────────────────────────────────────────────────────── */

export interface TableRowProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function TableRow({ children, className }: TableRowProps) {
  return (
    <tr className={cn('hover:bg-paper transition-colors duration-[120ms]', className)}>
      {children}
    </tr>
  );
}

/* ─── Table header cell ──────────────────────────────────────────────────── */

export interface TableThProps {
  readonly children?: React.ReactNode;
  readonly numeric?: boolean;
  readonly className?: string;
}

export function TableTh({ children, numeric = false, className }: TableThProps) {
  return (
    <th
      className={cn(
        'text-left px-7 py-[14px] text-[10.5px] text-ink-3 font-medium uppercase tracking-[var(--track-overline)]',
        'bg-paper border-t border-b border-hair',
        numeric && 'text-right',
        className,
      )}
    >
      {children}
    </th>
  );
}

/* ─── Table cell ─────────────────────────────────────────────────────────── */

export interface TableTdProps {
  readonly children?: React.ReactNode;
  readonly numeric?: boolean;
  readonly className?: string;
}

export function TableTd({ children, numeric = false, className }: TableTdProps) {
  return (
    <td
      className={cn(
        'text-left px-7 py-[14px] text-[13px] border-t border-hair align-middle',
        numeric && 'text-right [font-variant-numeric:tabular-nums]',
        className,
      )}
    >
      {children}
    </td>
  );
}

/* ─── Table toolbar (header row with search / actions) ───────────────────── */

export interface TableToolbarProps {
  readonly title?: string;
  readonly children?: React.ReactNode;
}

export function TableToolbar({ title, children }: TableToolbarProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-7 py-[22px]">
      {title !== undefined && (
        <div className="flex items-baseline gap-[10px]">
          <span className="text-[15px] font-semibold tracking-[-0.01em]">{title}</span>
        </div>
      )}
      {children !== undefined && (
        <div className="flex gap-2">{children}</div>
      )}
    </div>
  );
}
