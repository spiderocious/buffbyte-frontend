import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Show } from 'meemaw';
import { Eye, EyeOff } from '@ui/icons';
import { Field, Input, Helper } from '@ui/input';
import { Button } from '@ui/button';
import { ROUTES } from '@shared/constants/routes';
import { useAuth } from '@shared/providers/use-auth';
import { useLogin } from '../../api/use-login';

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const mutation = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldError, setFieldError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldError('');

    mutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          login(data.user, data.token);
          void navigate(ROUTES.APP.DASHBOARD);
        },
        onError: (err: unknown) => {
          const msg =
            (err as { response?: { data?: { message?: string } } }).response?.data?.message ??
            'Invalid email or password.';
          setFieldError(msg);
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Email">
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </Field>

      <Field label="Password">
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            status={fieldError !== '' ? 'error' : 'default'}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Show when={showPassword} fallback={<Eye size={15} />}>
              <EyeOff size={15} />
            </Show>
          </button>
        </div>
        <Show when={fieldError !== ''}>
          <Helper status="error">{fieldError}</Helper>
        </Show>
      </Field>

      <Button
        type="submit"
        variant="primary"
        loading={mutation.isPending}
        className="w-full justify-center mt-2"
      >
        Sign in
      </Button>

      <p className="text-center text-[12.5px] text-ink-3 m-0">
        Don&apos;t have an account?{' '}
        <Link
          to={ROUTES.AUTH.REGISTER}
          className="text-accent font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
