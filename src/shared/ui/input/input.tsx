/**
 * Input / Field / Textarea / Select / Slider — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/11-inputs.html
 * Tokens: _foundation.css :241-297
 */
import { cn } from '@shared/ui/utils/cn';
import { ChevronDown } from '@ui/icons';

/* ─── Base input ─────────────────────────────────────────────────────────── */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly status?: 'default' | 'error' | 'warn';
}

const inputBase =
  'w-full font-sans text-[14px] text-ink bg-sheet border border-hair rounded-soft px-3 py-[10px] ' +
  'transition-[border-color,background,box-shadow] duration-[160ms] ease-out ' +
  'placeholder:text-ink-4 ' +
  'hover:border-ink-4 ' +
  'focus:outline-none focus:border-accent focus:bg-paper focus:shadow-focus ' +
  '[font-feature-settings:"tnum"_1,"lnum"_1]';

export function Input({ status = 'default', className, ...props }: InputProps) {
  return (
    <input
      {...props}
      aria-invalid={status === 'error' ? true : undefined}
      className={cn(
        inputBase,
        status === 'error' && 'border-crit',
        status === 'warn' && 'border-warn',
        props.readOnly === true && 'bg-paper-deep text-ink-3 cursor-default',
        className,
      )}
    />
  );
}

/* ─── Textarea ───────────────────────────────────────────────────────────── */

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly status?: 'default' | 'error' | 'warn';
}

export function Textarea({ status = 'default', className, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={cn(
        inputBase,
        'min-h-[120px] resize-y leading-[1.6]',
        status === 'error' && 'border-crit',
        status === 'warn' && 'border-warn',
        className,
      )}
    />
  );
}

/* ─── Select ─────────────────────────────────────────────────────────────── */

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  readonly status?: 'default' | 'error' | 'warn';
}

export function Select({ status = 'default', className, children, ...props }: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        {...props}
        className={cn(
          inputBase,
          'appearance-none pr-9 cursor-pointer',
          status === 'error' && 'border-crit',
          status === 'warn' && 'border-warn',
          className,
        )}
      >
        {children}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-3 pointer-events-none"
      />
    </div>
  );
}

/* ─── Slider ─────────────────────────────────────────────────────────────── */

export type SliderProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Slider({ className, ...props }: SliderProps) {
  return (
    <input
      type="range"
      {...props}
      className={cn(
        'w-full h-1 rounded-pill appearance-none outline-none cursor-pointer',
        'bg-hair-soft',
        '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4',
        '[&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer',
        '[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4',
        '[&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0',
        className,
      )}
    />
  );
}

/* ─── Label ──────────────────────────────────────────────────────────────── */

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  readonly children: React.ReactNode;
}

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      {...props}
      className={cn(
        'block text-[12px] font-medium tracking-[var(--track-label)] text-ink-3 mb-[6px]',
        className,
      )}
    >
      {children}
    </label>
  );
}

/* ─── Helper text ────────────────────────────────────────────────────────── */

export interface HelperProps {
  readonly status?: 'default' | 'error' | 'warn';
  readonly children: React.ReactNode;
  readonly className?: string;
}

export function Helper({ status = 'default', className, children }: HelperProps) {
  return (
    <p
      className={cn(
        'text-[11.5px] mt-1 leading-[1.45]',
        status === 'default' && 'text-ink-3',
        status === 'error' && 'text-crit',
        status === 'warn' && 'text-warn-deep',
        className,
      )}
    >
      {children}
    </p>
  );
}

/* ─── Field (label + input + helper wrapper) ─────────────────────────────── */

export interface FieldProps {
  readonly label?: string;
  readonly helper?: string;
  readonly status?: 'default' | 'error' | 'warn';
  readonly className?: string;
  readonly children: React.ReactNode;
}

export function Field({ label, helper, status = 'default', className, children }: FieldProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {label !== undefined && label !== '' && <Label>{label}</Label>}
      {children}
      {helper !== undefined && helper !== '' && <Helper status={status}>{helper}</Helper>}
    </div>
  );
}
