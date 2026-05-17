import { useState, useRef, useEffect } from 'react';
import { Show } from 'meemaw';
import { LogOut, ChevronDown } from '@ui/icons';
import { useAuth } from '@shared/providers/use-auth';
import { cn } from '@shared/ui/utils/cn';

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase();
}

export function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`.trim();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={cn(
          'flex items-center gap-2 px-2 py-1.5 rounded-soft',
          'text-ink-3 hover:text-ink hover:bg-paper-deep transition-colors duration-150',
        )}
      >
        <span className="w-7 h-7 rounded-full bg-accent text-paper text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
          {initials(fullName)}
        </span>
        <span className="text-[13px] font-medium text-ink max-w-[120px] truncate hidden lg:block">
          {fullName}
        </span>
        <ChevronDown size={14} className="hidden lg:block" />
      </button>

      <Show when={open}>
        <div className="absolute right-0 top-full mt-1.5 w-52 bg-sheet border border-hair rounded-card shadow-pop z-50 py-1">
          <div className="px-3 py-2 border-b border-hair">
            <p className="text-[13px] font-medium text-ink truncate">{fullName}</p>
            <p className="text-[11.5px] text-ink-3 truncate">{user.email}</p>
          </div>
          <button
            onClick={() => { setOpen(false); logout(); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-crit hover:bg-crit-bg transition-colors duration-150"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </Show>
    </div>
  );
}
