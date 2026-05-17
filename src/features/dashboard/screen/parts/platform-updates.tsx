import { Repeat } from 'meemaw';
import type { CountryData, PlatformUpdate } from '@shared/types/api';

interface PlatformUpdatesProps {
  readonly updates: CountryData['platform_updates'];
}

export function PlatformUpdates({ updates }: PlatformUpdatesProps) {
  if (updates.length === 0) return null;

  return (
    <div>
      <h2 className="text-[13px] font-semibold tracking-[-0.01em] m-0 mb-3">Platform updates</h2>
      <div className="flex flex-col gap-2">
        <Repeat each={updates as PlatformUpdate[]}>
          {(u) => (
            <div key={`${u.platform}-${u.update_type}`} className="bg-sheet border border-hair rounded-card p-4 flex items-start gap-3">
              <span className="flex-shrink-0 text-[10px] bg-ink text-paper rounded-[4px] px-1.5 py-0.5 font-bold uppercase mt-0.5">
                {u.platform.slice(0, 2)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="text-[12.5px] font-semibold capitalize">{u.update_type}</span>
                  <span
                    className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-pill"
                    style={{
                      background: u.impact_on_creators === 'positive' ? 'var(--accent-tint)' : 'var(--crit-bg)',
                      color: u.impact_on_creators === 'positive' ? 'var(--accent-ink)' : 'var(--crit)',
                    }}
                  >
                    {u.impact_on_creators}
                  </span>
                </div>
                <p className="text-[12px] text-ink-3 m-0 leading-snug">{u.adaptation_strategy}</p>
              </div>
            </div>
          )}
        </Repeat>
      </div>
    </div>
  );
}
