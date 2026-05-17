import { Component, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Zap } from '@ui/icons';
import { Button } from '@ui/button';
import { ROUTES } from '@shared/constants/routes';

// ─── Fallback UI ──────────────────────────────────────────────────────────────

function isAuthenticated(): boolean {
  return Boolean(sessionStorage.getItem('bb_token'));
}

function ErrorFallback({ error, onRetry }: { error: Error; onRetry: () => void }) {
  const params  = new URLSearchParams(window.location.search);
  const count   = Math.max(0, parseInt(params.get('errorCount') ?? '0', 10));
  const isAuth  = isAuthenticated();

  function handleRetry() {
    if (count >= 2) {
      // Third failure — redirect
      const dest = isAuth ? ROUTES.AUTH.LOGIN : ROUTES.ROOT;
      sessionStorage.removeItem('bb_token');
      sessionStorage.removeItem('bb_user');
      window.location.href = dest;
      return;
    }
    // Increment errorCount in URL, then re-mount by navigating
    const next = new URLSearchParams(window.location.search);
    next.set('errorCount', String(count + 1));
    window.location.search = next.toString();
    // onRetry is also called so the class component resets its state
    onRetry();
  }

  const isFinal = count >= 2;
  const attemptLabel = count === 0 ? '' : ` (attempt ${count + 1} of 3)`;

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--paper)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(24px, 5vw, 48px) 20px',
        fontFamily: 'var(--sans)',
      }}
    >
      <div style={{ width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

        {/* Logo */}
        <a
          href={ROUTES.ROOT}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 7,
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Zap size={15} color="#fff" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
            Buff<span style={{ color: 'var(--accent)' }}>Byte</span>
          </span>
        </a>

        {/* Card */}
        <div
          style={{
            width: '100%',
            background: 'var(--sheet)',
            border: '1px solid var(--hair)',
            borderRadius: 16,
            boxShadow: 'var(--shade-pop)',
            padding: 'clamp(28px, 5vw, 40px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 0,
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'var(--warn-bg)',
              border: '1px solid var(--warn-edge)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <AlertTriangle size={24} color="var(--warn)" strokeWidth={1.8} />
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: 'clamp(18px, 3vw, 22px)',
              fontWeight: 800,
              color: 'var(--ink)',
              letterSpacing: '-0.022em',
              lineHeight: 1.2,
              margin: '0 0 10px',
            }}
          >
            {isFinal ? 'Still not working' : 'Something went wrong'}
          </h1>

          {/* Sub */}
          <p
            style={{
              fontSize: 14,
              color: 'var(--ink-3)',
              lineHeight: 1.6,
              margin: '0 0 24px',
              maxWidth: 320,
            }}
          >
            {isFinal
              ? `We've tried ${count + 1} times and the issue persists. Taking you somewhere safe.`
              : `An unexpected error occurred${attemptLabel}. This is usually temporary.`}
          </p>

          {/* Error detail — collapsible */}
          {error.message && (
            <details
              style={{
                width: '100%',
                marginBottom: 24,
                textAlign: 'left',
              }}
            >
              <summary
                style={{
                  fontSize: 12,
                  color: 'var(--ink-4)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  letterSpacing: '0.01em',
                  listStyle: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span style={{ fontSize: 10 }}>▶</span> Error details
              </summary>
              <div
                style={{
                  marginTop: 10,
                  background: 'var(--paper-deep)',
                  border: '1px solid var(--hair)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  fontSize: 12,
                  fontFamily: 'ui-monospace, monospace',
                  color: 'var(--ink-3)',
                  lineHeight: 1.6,
                  wordBreak: 'break-all',
                }}
              >
                {error.message}
              </div>
            </details>
          )}

          {/* Progress pips */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: i === 2 ? 8 : 24,
                  height: 4,
                  borderRadius: 99,
                  background: i <= count ? 'var(--warn)' : 'var(--hair)',
                  transition: 'background 300ms',
                  opacity: i === 2 && !isFinal ? 0.35 : 1,
                }}
              />
            ))}
          </div>

          {/* CTA */}
          <Button
            variant={isFinal ? 'ink' : 'primary'}
            size="md"
            onClick={handleRetry}
            style={{ width: '100%', justifyContent: 'center', gap: 8 }}
          >
            {!isFinal && <RefreshCw size={14} strokeWidth={2.2} />}
            {isFinal
              ? isAuth ? 'Go to login' : 'Back to home'
              : count === 0 ? 'Try again' : 'Retry'}
          </Button>
        </div>

        {/* Footer note */}
        <p style={{ marginTop: 20, fontSize: 12, color: 'var(--ink-5)', textAlign: 'center' }}>
          If this keeps happening, try clearing your browser cache.
        </p>
      </div>
    </div>
  );
}

// ─── Class boundary ───────────────────────────────────────────────────────────

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return <ErrorFallback error={this.state.error} onRetry={this.reset} />;
    }
    return this.props.children;
  }
}
