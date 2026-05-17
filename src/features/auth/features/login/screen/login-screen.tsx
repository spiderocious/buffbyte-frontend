import { AuthLayout } from '@features/auth/shared/parts/auth-layout';
import { LoginForm } from './parts/login-form';

export function LoginScreen() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your BuffByte account"
    >
      <LoginForm />
    </AuthLayout>
  );
}
