/**
 * PlatformPicker — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/12-selection.html (Scene 03)
 * Multi-select grid. Selected tiles light accent-tint. Controlled.
 */
import { cn } from '@shared/ui/utils/cn';

export interface PlatformItem {
  readonly value: string;
  readonly label: string;
  readonly glyph: string;
}

export interface PlatformPickerProps {
  readonly items: readonly PlatformItem[];
  readonly value: readonly string[];
  readonly onChange: (value: string[]) => void;
  readonly className?: string;
}

export function PlatformPicker({ items, value, onChange, className }: PlatformPickerProps) {
  function toggle(v: string) {
    if (value.includes(v)) {
      onChange(value.filter((x) => x !== v));
    } else {
      onChange([...value, v]);
    }
  }

  return (
    <div className={cn('grid grid-cols-4 gap-[10px]', className)}>
      {items.map((item) => {
        const active = value.includes(item.value);
        return (
          <button
            key={item.value}
            onClick={() => toggle(item.value)}
            className={cn(
              'flex items-center gap-[10px] px-3 py-3 rounded-soft border cursor-pointer',
              'text-[13px] font-sans font-normal',
              'transition-[border-color,background] duration-[160ms] ease-out',
              'focus-visible:outline-none focus-visible:shadow-focus',
              active
                ? 'border-accent bg-accent-tint'
                : 'border-hair bg-paper hover:border-ink-4',
            )}
          >
            <span
              className={cn(
                'w-7 h-7 rounded-[6px] flex items-center justify-center text-[13px] font-semibold flex-shrink-0',
                active ? 'bg-accent text-white' : 'bg-ink text-paper',
              )}
            >
              {item.glyph}
            </span>
            <span className={active ? 'text-accent-ink' : 'text-ink'}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
