/**
 * Dropdown — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/12-selection.html (Scene 04)
 * Rendered-open list panel. Headless: no positioning logic — consumer wraps
 * in a relative container and controls open/close state.
 */
import { cn } from '@shared/ui/utils/cn';

export interface DropdownItem {
  readonly value: string;
  readonly label: React.ReactNode;
  readonly meta?: string;
  readonly dividerAfter?: boolean;
}

export interface DropdownProps {
  readonly items: readonly DropdownItem[];
  readonly value?: string;
  readonly onSelect: (value: string) => void;
  readonly className?: string;
}

export function Dropdown({ items, value, onSelect, className }: DropdownProps) {
  return (
    <div
      className={cn(
        'border border-hair rounded-card bg-sheet shadow-pop p-[6px] w-[280px]',
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.value}>
          <button
            onClick={() => onSelect(item.value)}
            className={cn(
              'w-full flex items-center gap-[10px] px-[10px] py-2 rounded-[4px]',
              'text-[13px] text-left font-sans cursor-pointer border-0',
              'transition-colors duration-[160ms] ease-out',
              'focus-visible:outline-none focus-visible:shadow-focus',
              item.value === value
                ? 'bg-accent-tint text-accent-ink'
                : 'bg-transparent text-ink hover:bg-paper-deep',
            )}
          >
            <span className="flex-1">{item.label}</span>
            {item.meta !== undefined && (
              <span className="text-ink-3 text-[11.5px] ml-auto">{item.meta}</span>
            )}
          </button>
          {item.dividerAfter === true && (
            <div className="h-px bg-hair my-1" />
          )}
        </div>
      ))}
    </div>
  );
}
