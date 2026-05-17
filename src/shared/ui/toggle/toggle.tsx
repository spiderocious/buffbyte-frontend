/**
 * Toggle (on/off switch) — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/12-selection.html (Scene 04)
 * Tokens: _foundation.css accent ramp, ink-5
 */
import { cn } from '@shared/ui/utils/cn';

export interface ToggleProps {
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
  readonly disabled?: boolean;
  readonly label?: string;
  readonly description?: string;
  readonly className?: string;
  readonly id?: string;
}

export function Toggle({ checked, onChange, disabled = false, label, description, className, id }: ToggleProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      {(label !== undefined || description !== undefined) && (
        <div className="flex flex-col">
          {label !== undefined && (
            <span className="text-[13px] font-medium text-ink">{label}</span>
          )}
          {description !== undefined && (
            <span className="text-[12px] text-ink-3 leading-[1.45] mt-0.5">{description}</span>
          )}
        </div>
      )}
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative flex-shrink-0 w-9 h-5 rounded-pill cursor-pointer border-0',
          'transition-colors duration-[160ms] ease-out',
          'focus-visible:outline-none focus-visible:shadow-focus',
          'disabled:opacity-45 disabled:cursor-not-allowed',
          checked ? 'bg-accent' : 'bg-ink-5',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 w-4 h-4 rounded-full bg-paper',
            'transition-[left] duration-[160ms] ease-out',
            checked ? 'left-[18px]' : 'left-0.5',
          )}
        />
      </button>
    </div>
  );
}
