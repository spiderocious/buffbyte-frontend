/**
 * ToastHost — mount once at the app root. Renders the toast stack via createPortal.
 * Subscribes to drawerStore via useSyncExternalStore.
 */
import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { drawerStore, type ToastItem, type ToastVariant } from './drawer-store';
import { cn } from '@shared/ui/utils/cn';

const iconByVariant: Record<ToastVariant, React.ReactNode> = {
  info: (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={12} cy={12} r={9} /><path d="M9 12l2 2 4-5" />
    </svg>
  ),
  warn: (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l10 18H2z" /><path d="M12 10v5" /><path d="M12 18v.01" />
    </svg>
  ),
  crit: (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l10 18H2z" /><path d="M12 10v5" /><path d="M12 18v.01" />
    </svg>
  ),
};

const iconBgByVariant: Record<ToastVariant, string> = {
  info: 'bg-accent-tint text-accent',
  warn: 'bg-warn-bg text-warn-deep',
  crit: 'bg-crit-bg text-crit',
};

function Toast({ item }: { readonly item: ToastItem }) {
  return (
    <div className="bg-sheet border border-hair rounded-soft shadow-pop grid grid-cols-[28px_1fr_18px] gap-3 items-start px-[14px] py-3">
      <div className={cn('w-6 h-6 rounded-full grid place-items-center flex-shrink-0', iconBgByVariant[item.variant])}>
        {iconByVariant[item.variant]}
      </div>
      <div>
        <div className="text-[13px] font-semibold">{item.title}</div>
        {item.body !== undefined && (
          <p className="text-[12.5px] text-ink-3 m-0 mt-0.5 leading-[1.45]">{item.body}</p>
        )}
        {item.action !== undefined && (
          <div className="mt-2">
            <button
              className="text-[12px] text-accent font-medium cursor-pointer bg-transparent border-0 p-0"
              onClick={item.action.onClick}
            >
              {item.action.label}
            </button>
          </div>
        )}
      </div>
      <button
        aria-label="Dismiss"
        onClick={() => drawerStore.removeToast(item.id)}
        className="text-ink-4 cursor-pointer bg-transparent border-0 p-0 leading-none text-[16px] hover:text-ink transition-colors"
      >
        ×
      </button>
    </div>
  );
}

export function ToastHost() {
  const toasts = useSyncExternalStore(
    drawerStore.subscribe,
    () => drawerStore.getState().toasts,
  );

  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-[10px] w-[360px]">
      {toasts.map((t) => <Toast key={t.id} item={t} />)}
    </div>,
    document.body,
  );
}
