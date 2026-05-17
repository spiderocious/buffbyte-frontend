import { Repeat } from 'meemaw';
import { Pill } from '@ui/pill';
import { cn } from '@shared/ui/utils/cn';
import type { CountryData, ViralFormat, PeakPostingTime } from '@shared/types/api';

interface FormatInsightsProps {
  readonly insights: CountryData['content_insights'];
  readonly country: string;
}

export function FormatInsights({ insights, country }: FormatInsightsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-[2fr_1fr]">
      {/* Viral formats */}
      <div className="border border-hair rounded-card bg-sheet p-5">
        <p className="text-[11px] uppercase tracking-[var(--track-overline)] text-ink-3 m-0 mb-4">
          Viral formats this week · {country.toUpperCase()}
        </p>
        <div className="flex flex-col gap-3">
          <Repeat each={insights.viral_formats as ViralFormat[]}>
            {(fmt) => (
              <div
                key={fmt.format}
                className="flex items-start gap-3 border-l-2 border-accent pl-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[13px] font-medium">{fmt.format}</span>
                    <span className="text-[11px] text-accent font-medium tabular-nums">
                      {(fmt.success_rate * 100).toFixed(0)}% success
                    </span>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    <Repeat each={fmt.platforms as string[]}>
                      {(p) => (
                        <Pill key={p} variant="default" className="text-[10px] h-[18px] px-2">
                          {p}
                        </Pill>
                      )}
                    </Repeat>
                  </div>
                </div>
              </div>
            )}
          </Repeat>
        </div>
      </div>

      {/* Peak posting times */}
      <div className="border border-hair rounded-card bg-sheet p-5">
        <p className="text-[11px] uppercase tracking-[var(--track-overline)] text-ink-3 m-0 mb-4">
          Peak posting times
        </p>
        <div className="flex flex-col gap-2">
          <Repeat each={insights.peak_posting_times as PeakPostingTime[]}>
            {(slot) => (
              <div
                key={`${slot.platform}-${slot.time}`}
                className={cn(
                  'flex items-center justify-between p-2.5 rounded-soft',
                  'bg-paper border border-hair',
                )}
              >
                <div>
                  <p className="text-[12.5px] font-medium m-0">{slot.time}</p>
                  <p className="text-[11px] text-ink-3 m-0">{slot.platform} · {slot.timezone}</p>
                </div>
                <span className="text-[11px] text-accent font-medium tabular-nums">
                  +{(slot.engagement_boost * 100).toFixed(0)}%
                </span>
              </div>
            )}
          </Repeat>
        </div>
      </div>
    </div>
  );
}
