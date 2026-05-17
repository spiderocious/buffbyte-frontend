import { ScoreRing, SentimentGauge } from '@shared/ui/score-ring';
import { KitScene } from './kit-scene';

export function ScoreRingSection() {
  return (
    <div className="flex flex-col gap-6">
      <KitScene
        label="Hero ring · 220px · analysis result"
        description="One number, large and tabular, ringed by an arc. The coach note sits beside it."
      >
        <div className="flex items-center gap-10">
          <ScoreRing value={80} size="hero" color="accent" label="Overall score" />
          <div className="flex-1">
            <h2 className="text-[28px] font-semibold tracking-[var(--track-h)] m-0 mb-2">Ready to publish</h2>
            <p className="text-[14px] text-ink-2 leading-[1.55] m-0 max-w-[50ch]">
              This script scores in the top quartile for TikTok and Instagram audiences in NG. The pace is right; the hook lands in the first six words.
            </p>
            <blockquote className="border-l-2 border-accent pl-3 mt-4 text-[14px] text-ink-2 leading-[1.55] m-0">
              Cut <em>"for those who don't know"</em> in line 12. The middle drags around there — without it, you're at 89%.
            </blockquote>
          </div>
        </div>
      </KitScene>

      <KitScene label="Dimension rings · 88px · four dimensions">
        <div className="grid grid-cols-4 gap-[18px]">
          {[
            { value: 74, color: 'accent' as const, label: 'Engagement', note: 'Strong on TikTok' },
            { value: 68, color: 'accent' as const, label: 'Brand fit', note: 'Voice consistent' },
            { value: 44, color: 'warn' as const,   label: 'Shareability', note: 'Medium impact' },
            { value: 14, color: 'crit' as const,   label: 'Risk', note: 'Compliance flag' },
          ].map((d) => (
            <div key={d.label} className="border border-hair rounded-card p-[18px] bg-paper flex items-center gap-4">
              <ScoreRing value={d.value} size="card" color={d.color} />
              <div>
                <div className="text-[11px] text-ink-3 uppercase tracking-[var(--track-overline)] mb-1">{d.label}</div>
                <div className="text-[14px] font-medium">{d.note}</div>
              </div>
            </div>
          ))}
        </div>
      </KitScene>

      <KitScene label="Inline rings · 32px · compact usage">
        <div className="flex items-center gap-4 flex-wrap">
          <ScoreRing value={87} size="inline" color="accent" />
          <ScoreRing value={54} size="inline" color="warn" />
          <ScoreRing value={14} size="inline" color="crit" />
          <ScoreRing value={92} size="inline" color="ink" />
        </div>
      </KitScene>

      <KitScene
        label="Sentiment gauge · half-ring"
        description="When the metric is bipolar (negative ↔ positive), the gauge replaces the ring."
      >
        <SentimentGauge value={0.78} confidence={87} />
      </KitScene>
    </div>
  );
}
