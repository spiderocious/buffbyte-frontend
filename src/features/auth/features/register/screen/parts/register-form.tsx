import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Show } from 'meemaw';
import { Eye, EyeOff } from '@ui/icons';
import { Field, Input, Helper } from '@ui/input';
import { Button } from '@ui/button';
import { ROUTES } from '@shared/constants/routes';
import { useAuth } from '@shared/providers/use-auth';
import { useRegister } from '../../api/use-register';

export function RegisterForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const mutation = useRegister();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [apiError, setApiError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNameError('');
    setPasswordError('');
    setConfirmError('');
    setApiError('');

    let valid = true;

    if (name.trim() === '') {
      setNameError('Full name is required.');
      valid = false;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmError('Passwords do not match.');
      valid = false;
    }

    if (!valid) return;

    mutation.mutate(
      { name , email, password },
      {
        onSuccess: (data) => {
          login(data.user, data.token);
          void navigate(ROUTES.APP.DASHBOARD);
        },
        onError: (err: unknown) => {
          const msg =
            (err as { response?: { data?: { message?: string } } }).response?.data?.message ??
            'Could not create account. Please try again.';
          setApiError(msg);
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="Full name" helper={nameError} status={nameError !== '' ? 'error' : 'default'}>
        <Input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          status={nameError !== '' ? 'error' : 'default'}
        />
      </Field>

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

      <Field
        label="Password"
        helper={passwordError}
        status={passwordError !== '' ? 'error' : 'default'}
      >
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            status={passwordError !== '' ? 'error' : 'default'}
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
      </Field>

      <Field
        label="Confirm password"
        helper={confirmError}
        status={confirmError !== '' ? 'error' : 'default'}
      >
        <div className="relative">
          <Input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            status={confirmError !== '' ? 'error' : 'default'}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink transition-colors"
            aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
          >
            <Show when={showConfirm} fallback={<Eye size={15} />}>
              <EyeOff size={15} />
            </Show>
          </button>
        </div>
      </Field>

      <Show when={apiError !== ''}>
        <Helper status="error">{apiError}</Helper>
      </Show>

      <Button
        type="submit"
        variant="primary"
        loading={mutation.isPending}
        className="w-full justify-center mt-2"
      >
        Create account
      </Button>

      <p className="text-center text-[12.5px] text-ink-3 m-0">
        Already have an account?{' '}
        <Link
          to={ROUTES.AUTH.LOGIN}
          className="text-accent font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
