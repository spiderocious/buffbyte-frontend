/**
 * Radio / RadioGroup — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/11-inputs.html (Scene 02)
 * Tokens: _foundation.css accent ramp
 */
import { cn } from '@shared/ui/utils/cn';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  readonly label?: React.ReactNode;
}

export function Radio({ label, className, id, ...props }: RadioProps) {
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
          type="radio"
          id={id}
          {...props}
          className="peer sr-only"
        />
        {/* outer ring */}
        <span
          className={cn(
            'absolute inset-0 rounded-full border border-ink-4 bg-paper',
            'peer-checked:border-accent',
            'peer-focus-visible:shadow-focus',
            'transition-colors duration-[160ms]',
          )}
        />
        {/* inner dot */}
        <span
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'opacity-0 peer-checked:opacity-100 transition-opacity duration-[160ms]',
          )}
        >
          <span className="w-2 h-2 rounded-full bg-accent" />
        </span>
      </span>
      {label !== undefined && <span>{label}</span>}
    </label>
  );
}

export interface RadioGroupProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function RadioGroup({ children, className }: RadioGroupProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {children}
    </div>
  );
}
