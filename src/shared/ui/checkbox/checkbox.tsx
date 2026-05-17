/**
 * Checkbox — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/11-inputs.html (Scene 02), 12-selection.html
 * Tokens: _foundation.css accent ramp
 */
import { cn } from '@shared/ui/utils/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  readonly label?: React.ReactNode;
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer text-[13px] text-ink select-none',
        props.disabled === true && 'opacity-45 cursor-not-allowed',
        className,
      )}
    >
      <span className="relative flex-shrink-0 w-4 h-4">
        <input
          type="checkbox"
          id={id}
          {...props}
          className="peer sr-only"
        />
        {/* unchecked box */}
        <span
          className={cn(
            'absolute inset-0 rounded-[4px] border border-ink-4 bg-paper',
            'peer-checked:bg-accent peer-checked:border-accent',
            'peer-focus-visible:shadow-focus',
            'transition-colors duration-[160ms]',
          )}
        />
        {/* checkmark */}
        <span
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'opacity-0 peer-checked:opacity-100 transition-opacity duration-[160ms]',
          )}
        >
          <svg width={9} height={7} viewBox="0 0 9 7" fill="none">
            <path
              d="M1 3.5L3.5 6L8 1"
              stroke="white"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
      {label !== undefined && <span>{label}</span>}
    </label>
  );
}
