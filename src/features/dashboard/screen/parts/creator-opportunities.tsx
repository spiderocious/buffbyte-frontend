import { Repeat } from 'meemaw';
import type { CountryData, CreatorOpportunity } from '@shared/types/api';

interface CreatorOpportunitiesProps {
  readonly opportunities: CountryData['creator_opportunities'];
}

export function CreatorOpportunities({ opportunities }: CreatorOpportunitiesProps) {
  if (opportunities.length === 0) return null;

  return (
    <div>
      <h2 className="text-[13px] font-semibold tracking-[-0.01em] m-0 mb-3">Creator opportunities</h2>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
        <Repeat each={opportunities as CreatorOpportunity[]}>
          {(opp) => (
            <div key={opp.niche} className="bg-sheet border border-hair rounded-card p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <p className="text-[13px] font-semibold m-0 leading-snug">{opp.niche}</p>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-pill flex-shrink-0"
                  style={{
                    background: opp.monetization_potential >= 0.8 ? 'var(--accent-tint)' : 'var(--paper-deep)',
                    color: opp.monetization_potential >= 0.8 ? 'var(--accent-ink)' : 'var(--ink-3)',
                  }}
                >
                  {(opp.monetization_potential * 100).toFixed(0)}% $
                </span>
              </div>
              {/* Demand / Competition bars */}
              <div className="flex flex-col gap-1.5 mb-3">
                {[
                  { label: 'Demand', value: opp.demand_level },
                  { label: 'Competition', value: opp.competition_level },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] text-ink-3">{label}</span>
                      <span className="text-[10px] font-medium tabular-nums">{(value * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 rounded-pill bg-paper-deep overflow-hidden">
                      <div
                        className="h-full rounded-pill"
                        style={{
                          width: `${value * 100}%`,
                          background: label === 'Competition' ? 'var(--warn)' : 'var(--accent)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Platforms */}
              <div className="flex gap-1 flex-wrap">
                {opp.recommended_platforms.map((p) => (
                  <span key={p} className="text-[10px] bg-ink text-paper rounded-[4px] px-1.5 py-0.5 font-medium uppercase">
                    {p.slice(0, 2)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Repeat>
      </div>
    </div>
  );
}
