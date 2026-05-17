/**
 * Button — BuffByte design system
 * Spec: design-system/projects/buffbyte/preview/10-buttons.html
 * Tokens: _foundation.css :176-239
 */
import { cn } from '@shared/ui/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: 'primary' | 'ink' | 'secondary' | 'ghost' | 'danger';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly loading?: boolean;
  readonly children?: React.ReactNode;
}

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly label: string;
  readonly children: React.ReactNode;
}

const baseBtn =
  'inline-flex items-center gap-2 border border-transparent rounded-soft font-medium cursor-pointer whitespace-nowrap transition-colors duration-[160ms] ease-out focus-visible:outline-none focus-visible:shadow-focus disabled:opacity-45 disabled:pointer-events-none';

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-deep active:bg-accent-press',
  ink:
    'bg-ink text-paper hover:bg-[#0F0E0D] active:bg-[#000000]',
  secondary:
    'bg-paper text-ink border-hair hover:bg-paper-deep hover:border-ink-4 active:bg-paper-edge',
  ghost:
    'bg-transparent text-ink-2 hover:bg-paper-deep hover:text-ink active:bg-paper-edge',
  danger:
    'bg-crit text-white hover:bg-crit-deep active:bg-[#56201D]',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'text-[12.5px] px-3 py-[7px]',
  md: 'text-[13.5px] px-4 py-[10px]',
  lg: 'text-[14px] px-5 py-[13px]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled === true || loading}
      className={cn(
        baseBtn,
        variantClasses[variant],
        sizeClasses[size],
        loading && 'opacity-45 pointer-events-none',
        className,
      )}
    >
      {loading && (
        <svg
          className="animate-spin"
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        >
          <path d="M12 3a9 9 0 1 1-6.4 2.6" />
        </svg>
      )}
      {children}
    </button>
  );
}

export function IconButton({ label, className, children, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      aria-label={label}
      className={cn(
        'w-8 h-8 p-0 inline-flex items-center justify-center rounded-soft border border-transparent',
        'text-ink-3 bg-transparent cursor-pointer',
        'transition-colors duration-[160ms] ease-out',
        'hover:bg-paper-deep hover:border-hair hover:text-ink',
        'focus-visible:outline-none focus-visible:shadow-focus',
        'disabled:opacity-45 disabled:pointer-events-none',
        className,
      )}
    >
      {children}
    </button>
  );
}
