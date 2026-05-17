import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, ScrollText, Video, Zap } from '@ui/icons';
import { ROUTES } from '@shared/constants/routes';
import { UserMenu } from './user-menu';
import { cn } from '@shared/ui/utils/cn';

const NAV_ITEMS = [
  { to: ROUTES.APP.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { to: ROUTES.APP.CONTENT_ANALYSIS, label: 'Content analysis', icon: FileText },
  { to: ROUTES.APP.SCRIPT_ANALYSIS, label: 'Script analysis', icon: ScrollText },
  { to: ROUTES.APP.TELEPROMPTER, label: 'Teleprompter', icon: Video },
] as const;

export function TopNav() {
  return (
    <header className="h-14 flex items-center gap-4 px-4 border-b border-hair bg-paper sticky top-0 z-40">
      {/* Brand mark */}
      <NavLink
        to={ROUTES.APP.DASHBOARD}
        className="flex items-center gap-2 flex-shrink-0 mr-2"
      >
        <div className="w-7 h-7 rounded-soft bg-accent flex items-center justify-center">
          <Zap size={14} className="text-paper" strokeWidth={2.5} />
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-ink">
          Buff<span className="text-accent">Byte</span>
        </span>
      </NavLink>

      {/* Nav links — desktop only */}
      <nav className="hidden md:flex items-center gap-1 flex-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-soft text-[13px] font-medium transition-colors duration-150',
                isActive
                  ? 'bg-accent-tint text-accent-ink'
                  : 'text-ink-3 hover:text-ink hover:bg-paper-deep',
              )
            }
          >
            <Icon size={14} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Spacer on mobile so UserMenu stays right */}
      <div className="flex-1 md:hidden" />

      {/* Right: user menu */}
      <UserMenu />
    </header>
  );
}
