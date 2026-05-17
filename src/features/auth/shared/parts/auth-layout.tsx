import { Zap } from '@ui/icons';
import { ROUTES } from '@shared/constants/routes';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  readonly title: string;
  readonly subtitle: string;
  readonly children: React.ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <Link
          to={ROUTES.ROOT}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="w-8 h-8 rounded-soft bg-accent flex items-center justify-center">
            <Zap size={16} className="text-paper" strokeWidth={2.5} />
          </div>
          <span className="text-[17px] font-semibold tracking-tight text-ink">
            Buff<span className="text-accent">Byte</span>
          </span>
        </Link>

        {/* Card */}
        <div className="bg-sheet border border-hair rounded-card shadow-pop p-8">
          <div className="mb-6">
            <h1 className="text-[22px] font-semibold tracking-[-0.014em] m-0 mb-1">{title}</h1>
            <p className="text-[13px] text-ink-3 m-0 leading-[1.5]">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
