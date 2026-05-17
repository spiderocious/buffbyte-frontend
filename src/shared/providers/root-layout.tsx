import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './auth-provider';
import { ErrorBoundary } from './error-boundary';

export function RootLayout() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Suspense>
          <Outlet />
        </Suspense>
      </AuthProvider>
    </ErrorBoundary>
  );
}
