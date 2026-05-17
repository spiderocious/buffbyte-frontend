import { Repeat } from 'meemaw';
import type { CountryData, ContentGap } from '@shared/types/api';

interface ContentGapsProps {
  readonly gaps: CountryData['content_insights']['content_gaps'];
}

export function ContentGaps({ gaps }: ContentGapsProps) {
  if (gaps.length === 0) return null;

  return (
    <div>
      <h2 className="text-[13px] font-semibold tracking-[-0.01em] m-0 mb-3">Content gaps</h2>
      <div className="flex flex-col gap-2">
        <Repeat each={gaps as ContentGap[]}>
          {(gap) => (
            <div key={gap.topic} className="bg-sheet border border-hair rounded-card p-4 flex items-start gap-4">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-soft flex items-center justify-center text-[12px] font-bold tabular-nums"
                style={{ background: 'var(--accent-tint)', color: 'var(--accent-ink)' }}
              >
                {(gap.opportunity_score * 100).toFixed(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold m-0 mb-0.5">{gap.topic}</p>
                <p className="text-[12px] text-ink-3 m-0 leading-snug">{gap.suggested_angle}</p>
              </div>
            </div>
          )}
        </Repeat>
      </div>
    </div>
  );
}
