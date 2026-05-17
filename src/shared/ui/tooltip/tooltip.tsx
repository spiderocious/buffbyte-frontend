/**
 * Tooltip — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/42-tooltips.html
 * Tokens: _foundation.css ink, paper, shade-pop
 *
 * Single-line ink tooltip with four placement options. CSS-positioned,
 * shown on mouse enter / keyboard focus. No external dep.
 */
import { useState, useRef } from 'react';
import { cn } from '@shared/ui/utils/cn';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  readonly label: string;
  readonly placement?: TooltipPlacement;
  readonly children: React.ReactElement;
  readonly className?: string;
}

export function Tooltip({ label, placement = 'top', children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    setVisible(true);
  };

  const hide = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 80);
  };

  const tipPositionClasses: Record<TooltipPlacement, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses: Record<TooltipPlacement, string> = {
    top: 'top-full left-1/2 -translate-x-1/2 -mt-[3px]',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-[3px]',
    left: 'left-full top-1/2 -translate-y-1/2 -ml-[3px]',
    right: 'right-full top-1/2 -translate-y-1/2 -mr-[3px]',
  };

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocusCapture={show}
      onBlurCapture={hide}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={cn(
            'absolute z-50 pointer-events-none whitespace-nowrap',
            'bg-ink text-paper text-[11.5px] font-medium px-[9px] py-[5px] rounded shadow-pop',
            tipPositionClasses[placement],
          )}
        >
          {label}
          <span
            className={cn(
              'absolute w-[6px] h-[6px] bg-ink rotate-45',
              arrowClasses[placement],
            )}
          />
        </span>
      )}
    </span>
  );
}

/* ─── Hovercard ───────────────────────────────────────────────────────────── */

export interface HovercardProps {
  readonly trigger: React.ReactNode;
  readonly children: React.ReactNode;
  readonly wide?: boolean;
  readonly className?: string;
}

export function Hovercard({ trigger, children, wide = false, className }: HovercardProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    setVisible(true);
  };
  const hide = () => { timeoutRef.current = setTimeout(() => setVisible(false), 180); };

  return (
    <span
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {trigger}
      {visible && (
        <div
          className={cn(
            'absolute top-full left-0 mt-2 z-40',
            'bg-sheet border border-hair rounded-card shadow-pop overflow-hidden',
            wide ? 'w-[360px]' : 'w-[320px]',
            className,
          )}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          {children}
        </div>
      )}
    </span>
  );
}

export function HovercardBody({ children }: { readonly children: React.ReactNode }) {
  return <div className="px-[18px] py-4">{children}</div>;
}

export function HovercardFoot({ children }: { readonly children: React.ReactNode }) {
  return <div className="flex items-center gap-2 px-[18px] py-[10px] border-t border-hair bg-paper text-[11.5px]">{children}</div>;
}
