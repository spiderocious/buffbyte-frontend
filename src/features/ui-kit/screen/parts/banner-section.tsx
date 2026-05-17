import { Banner, InlineNote } from '@shared/ui/banner';
import { KitScene } from './kit-scene';

const SparkleIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z" />
  </svg>
);

const TriangleIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l10 18H2z" /><path d="M12 10v5" /><path d="M12 18v.01" />
  </svg>
);

const CircleXIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <circle cx={12} cy={12} r={9} /><path d="M9 9l6 6M15 9l-6 6" />
  </svg>
);

const PlusIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ClockIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <circle cx={12} cy={12} r={9} /><path d="M12 8v4l3 2" />
  </svg>
);

export function BannerSection() {
  return (
    <div className="flex flex-col gap-6">
      <KitScene title="Banners · all variants" description="info (accent), warn, crit, ink — with icon, body, optional action and dismiss.">
        <div className="flex flex-col gap-4">
          <Banner
            variant="info"
            icon={<SparkleIcon />}
            onDismiss={() => undefined}
            action={
              <button className="text-[12px] font-medium text-accent-ink underline underline-offset-2 cursor-pointer bg-transparent border-0 p-0">
                See what changed →
              </button>
            }
          >
            <strong>The coach has a new model.</strong> Analyses now include voice-consistency scoring against your past 12 drafts.
          </Banner>

          <Banner
            variant="warn"
            icon={<TriangleIcon />}
            action={
              <div className="flex gap-2">
                <button className="h-7 px-3 text-[12px] font-medium border border-warn-edge rounded-soft text-warn-deep bg-transparent hover:bg-warn-bg transition-colors cursor-pointer">
                  Upgrade
                </button>
                <button className="h-7 px-3 text-[12px] font-medium text-warn-deep bg-transparent border-0 cursor-pointer opacity-70 hover:opacity-100">
                  Dismiss
                </button>
              </div>
            }
          >
            <strong>You're at 180 of 200 analyses today.</strong> Your free plan resets at midnight.
          </Banner>

          <Banner
            variant="crit"
            icon={<CircleXIcon />}
            action={
              <button className="h-7 px-3 text-[12px] font-medium border border-crit-edge rounded-soft text-crit-deep bg-transparent hover:bg-crit-bg transition-colors cursor-pointer">
                Status page
              </button>
            }
          >
            <strong>The analysis service is degraded.</strong> Some requests are failing. Your drafts are safe in local storage.
          </Banner>

          <Banner
            variant="ink"
            icon={<PlusIcon />}
            action={
              <button className="h-7 px-3 text-[12px] font-medium bg-accent text-white rounded-soft hover:bg-accent-deep transition-colors cursor-pointer border-0">
                See plans
              </button>
            }
          >
            <strong>BuffByte for Teams is here.</strong> Share collections, assign drafts to reviewers, and see everyone's progress at a glance.
          </Banner>
        </div>
      </KitScene>

      <KitScene title="Inline notes" description="Coach note (accent left border) and contextual note — in-flow, no dismiss.">
        <div className="flex flex-col gap-3">
          <InlineNote coach icon={<SparkleIcon />}>
            <strong>The coach says:</strong> your last three drafts all opened with "Spent some time…" — strong pattern, but consider varying the hook on this one.
          </InlineNote>

          <InlineNote icon={<ClockIcon />}>
            <strong>Auto-saved</strong> just now. Last 12 versions are available in history.
          </InlineNote>
        </div>
      </KitScene>
    </div>
  );
}
