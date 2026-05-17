import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@shared/providers/use-auth';
import { ROUTES } from '@shared/constants/routes';

export function GuestGuard() {
  const { token } = useAuth();
  if (token) return <Navigate to={ROUTES.APP.DASHBOARD} replace />;
  return <Outlet />;
}
