/**
 * Modal — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/40-modals.html
 * Tokens: _foundation.css sheet, hair, shade-modal, crit-*, paper
 *
 * Three patterns:
 *   Modal       — base container, rendered via createPortal
 *   ModalFooter — standard footer (paper bg, top hairline, right-align actions)
 *   CritBadge   — the "Critical · irreversible action" header strip for destructive modals
 */
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { cn } from '@shared/ui/utils/cn';

export interface ModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly wide?: boolean;
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function Modal({ open, onClose, wide = false, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-5"
      role="dialog"
      aria-modal="true"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(28,27,25,0.45)' }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          'relative z-10 w-full bg-sheet border border-hair rounded-card shadow-modal overflow-hidden',
          wide ? 'max-w-[560px]' : 'max-w-[460px]',
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

/* ─── Modal body ─────────────────────────────────────────────────────────── */

export interface ModalBodyProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function ModalBody({ children, className }: ModalBodyProps) {
  return (
    <div className={cn('px-7 pt-7 pb-2', className)}>
      {children}
    </div>
  );
}

/* ─── Modal footer ───────────────────────────────────────────────────────── */

export interface ModalFooterProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={cn('flex items-center justify-end gap-[10px] px-7 py-4 border-t border-hair bg-paper', className)}>
      {children}
    </div>
  );
}

/** Spacer to push cancel left, confirm right */
export function ModalSpacer() {
  return <div className="flex-1" />;
}

/* ─── Critical pre-header strip ─────────────────────────────────────────── */

export function CritBadge() {
  return (
    <div className="px-7 py-[10px] bg-crit-bg border-b border-crit-edge text-[11px] text-crit-deep uppercase tracking-[var(--track-overline)] font-medium">
      ⚠ Critical · irreversible action
    </div>
  );
}

/* ─── Glyph icons (status round badges) ──────────────────────────────────── */

export type GlyphVariant = 'info' | 'warn' | 'crit';

export interface ModalGlyphProps {
  readonly variant?: GlyphVariant;
  readonly children: React.ReactNode;
}

const glyphClasses: Record<GlyphVariant, string> = {
  info: 'bg-accent-tint text-accent',
  warn: 'bg-warn-bg text-warn-deep',
  crit: 'bg-crit-bg text-crit',
};

export function ModalGlyph({ variant = 'info', children }: ModalGlyphProps) {
  return (
    <div className={cn('w-[38px] h-[38px] rounded-full inline-grid place-items-center mb-[14px]', glyphClasses[variant])}>
      {children}
    </div>
  );
}
