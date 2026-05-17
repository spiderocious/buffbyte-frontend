import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from '@ui/icons';
import { useAuth } from '@shared/providers/use-auth';
import { ROUTES } from '@shared/constants/routes';

export function WelcomeBanner() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const firstName = user?.firstName ?? 'Creator';

  return (
    <div
      className="relative overflow-hidden rounded-card"
      style={{
        background: 'linear-gradient(135deg, #1C1B19 0%, #2a2460 60%, #1C1B19 100%)',
        minHeight: 168,
      }}
    >
      {/* Decorative glow blobs */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -40,
          right: -20,
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(83,58,253,0.35) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: -60,
          left: '30%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(83,58,253,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Accent top stripe */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent 0%, #533AFD 40%, #a99ffd 70%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-5 md:p-7 flex flex-col gap-5">
        {/* Top row: badge + date */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-pill"
            style={{
              background: 'rgba(83,58,253,0.25)',
              border: '1px solid rgba(169,159,253,0.3)',
            }}
          >
            <Sparkles size={11} style={{ color: '#a99ffd' }} />
            <span style={{ fontSize: 10, color: '#a99ffd', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
              AI Dashboard
            </span>
          </div>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>
            {dateStr}
          </span>
        </div>

        {/* Headline */}
        <div>
          <h1
            style={{
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: '#FAF7F2',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Good to see you,{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #a99ffd, #533AFD)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {firstName}
            </span>
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '6px 0 0', lineHeight: 1.55 }}>
            Here&apos;s what&apos;s trending in your regions today.
          </p>
        </div>

        {/* CTA row */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => void navigate(ROUTES.APP.CONTENT_ANALYSIS)}
            className="flex items-center gap-2 px-4 py-2 rounded-pill text-[13px] font-semibold transition-all duration-150"
            style={{
              background: '#533AFD',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 0 1px rgba(83,58,253,0.5), 0 4px 16px rgba(83,58,253,0.4)',
            }}
          >
            Analyze a draft
            <ArrowRight size={13} />
          </button>
          <button
            onClick={() => void navigate(ROUTES.APP.SCRIPT_ANALYSIS)}
            className="flex items-center gap-2 px-4 py-2 rounded-pill text-[13px] font-medium transition-all duration-150"
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.75)',
              border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer',
            }}
          >
            Optimise a script
          </button>
        </div>
      </div>
    </div>
  );
}
