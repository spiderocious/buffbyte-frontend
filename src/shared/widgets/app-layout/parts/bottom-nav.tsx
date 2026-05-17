import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, ScrollText, Video } from '@ui/icons';
import { ROUTES } from '@shared/constants/routes';

const NAV_ITEMS = [
  { to: ROUTES.APP.DASHBOARD,        label: 'Dashboard', icon: LayoutDashboard },
  { to: ROUTES.APP.CONTENT_ANALYSIS, label: 'Content',   icon: FileText },
  { to: ROUTES.APP.SCRIPT_ANALYSIS,  label: 'Script',    icon: ScrollText },
  { to: ROUTES.APP.TELEPROMPTER,     label: 'Prompter',  icon: Video, end: true },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: '6px 8px',
        borderRadius: 9999,
        background: 'rgba(28,27,25,0.72)',
        backdropFilter: 'blur(20px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      {NAV_ITEMS.map(({ to, label, icon: Icon, ...rest }) => (
        <NavLink
          key={label}
          to={to}
          end={'end' in rest ? rest.end : false}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: isActive ? 6 : 0,
            padding: isActive ? '10px 16px' : '10px 15px',
            borderRadius: 9999,
            background: isActive
              ? 'linear-gradient(135deg, #533AFD 0%, #6e5bfd 100%)'
              : 'transparent',
            boxShadow: isActive
              ? '0 0 0 1px rgba(83,58,253,0.5), 0 4px 12px rgba(83,58,253,0.35)'
              : 'none',
            transition: 'all 280ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            textDecoration: 'none',
            color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          })}
        >
          {({ isActive }) => (
            <>
              <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  maxWidth: isActive ? 72 : 0,
                  opacity: isActive ? 1 : 0,
                  transition: 'max-width 280ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 200ms ease',
                  overflow: 'hidden',
                }}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
