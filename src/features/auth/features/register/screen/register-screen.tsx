import { AuthLayout } from '@features/auth/shared/parts/auth-layout';
import { RegisterForm } from './parts/register-form';

export function RegisterScreen() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start optimizing your content with AI"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
