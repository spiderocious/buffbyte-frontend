import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './auth-provider';

export function RootLayout() {
  return (
    <AuthProvider>
      <Suspense>
        <Outlet />
      </Suspense>
    </AuthProvider>
  );
}
