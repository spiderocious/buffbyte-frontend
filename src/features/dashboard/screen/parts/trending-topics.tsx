import { Repeat } from 'meemaw';
import { TrendingUp, TrendingDown, Minus } from '@ui/icons';
import { Pill } from '@ui/pill';
import { ScoreRing } from '@ui/score-ring';
import { cn } from '@shared/ui/utils/cn';
import type { TrendingTopic } from '@shared/types/api';

interface TrendingTopicsProps {
  readonly topics: readonly TrendingTopic[];
}

function velocityIcon(v: TrendingTopic['trend_velocity']) {
  if (v === 'rising') return <TrendingUp size={11} />;
  if (v === 'cooling') return <TrendingDown size={11} />;
  return <Minus size={11} />;
}

function velocityColor(v: TrendingTopic['trend_velocity']): string {
  if (v === 'rising') return '#533AFD';
  if (v === 'cooling') return '#8E6112';
  return '#6B6862';
}

function scoreColor(s: number): 'accent' | 'ink' | 'warn' | 'crit' {
  const v = s * 100;
  if (v >= 80) return 'accent';
  if (v >= 60) return 'ink';
  if (v >= 40) return 'warn';
  return 'crit';
}

export function TrendingTopics({ topics }: TrendingTopicsProps) {
  return (
    <div>
      <h2 className="text-[13px] font-semibold tracking-[-0.01em] m-0 mb-3">Trending topics</h2>

      {/* ── Mobile: card stack ── */}
      <div className="flex flex-col gap-2 md:hidden">
        <Repeat each={topics as TrendingTopic[]}>
          {(topic, idx) => (
            <div
              key={topic.topic}
              className="bg-sheet border border-hair rounded-card p-3.5 flex items-start gap-3"
            >
              <span
                className={cn(
                  'flex-shrink-0 w-7 h-7 rounded-[6px] flex items-center justify-center text-[11px] font-bold',
                  idx === 0 ? 'bg-accent text-white' : 'bg-ink text-paper',
                )}
              >
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="text-[13px] font-semibold m-0 leading-snug">{topic.topic}</p>
                  <ScoreRing
                    value={Math.round(topic.engagement_score * 100)}
                    size="inline"
                    color={scoreColor(topic.engagement_score)}
                  />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {topic.platforms.slice(0, 3).map((p) => (
                    <span key={p} className="text-[10px] bg-ink text-paper rounded-[4px] px-1.5 py-0.5 font-medium uppercase">
                      {p.slice(0, 2)}
                    </span>
                  ))}
                  {topic.content_types.slice(0, 1).map((t) => (
                    <Pill key={t} variant="default" className="text-[10px] h-[18px] px-2">{t}</Pill>
                  ))}
                  <span
                    className="flex items-center gap-1 text-[11px] font-medium ml-auto"
                    style={{ color: velocityColor(topic.trend_velocity) }}
                  >
                    {velocityIcon(topic.trend_velocity)}
                    <span className="capitalize">{topic.trend_velocity}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </Repeat>
      </div>

      {/* ── Desktop: table ── */}
      <div className="hidden md:block border border-hair rounded-card bg-sheet overflow-hidden">
        <div
          className="grid px-4 py-3 bg-paper border-b border-hair text-[10.5px] uppercase tracking-[var(--track-overline)] text-ink-3 font-medium"
          style={{ gridTemplateColumns: '2rem 1fr 6rem 7rem 6rem' }}
        >
          <span>#</span>
          <span>Topic</span>
          <span className="text-right">Score</span>
          <span>Platforms</span>
          <span>Trend</span>
        </div>
        <Repeat each={topics as TrendingTopic[]}>
          {(topic, idx) => (
            <div
              key={topic.topic}
              className="grid px-4 py-3 border-t border-hair first:border-t-0 hover:bg-paper transition-colors duration-100 items-center"
              style={{ gridTemplateColumns: '2rem 1fr 6rem 7rem 6rem' }}
            >
              <span className={cn('w-7 h-7 rounded-[6px] flex items-center justify-center text-[11px] font-semibold', idx === 0 ? 'bg-accent text-white' : 'bg-ink text-paper')}>
                {idx + 1}
              </span>
              <div className="min-w-0 pr-3">
                <p className="text-[13.5px] font-medium m-0 truncate">{topic.topic}</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  <Repeat each={topic.content_types.slice(0, 2) as string[]}>
                    {(t) => <Pill key={t} variant="default" className="text-[10px] h-[18px] px-2">{t}</Pill>}
                  </Repeat>
                </div>
              </div>
              <div className="flex justify-end">
                <ScoreRing value={Math.round(topic.engagement_score * 100)} size="inline" color={scoreColor(topic.engagement_score)} />
              </div>
              <div className="flex gap-1 flex-wrap">
                <Repeat each={topic.platforms.slice(0, 3) as string[]}>
                  {(p) => <span key={p} className="text-[10px] bg-ink text-paper rounded-[4px] px-1.5 py-0.5 font-medium uppercase">{p.slice(0, 2)}</span>}
                </Repeat>
              </div>
              <div className="flex items-center gap-1 text-[12px] font-medium" style={{ color: velocityColor(topic.trend_velocity) }}>
                {velocityIcon(topic.trend_velocity)}
                <span className="capitalize">{topic.trend_velocity}</span>
              </div>
            </div>
          )}
        </Repeat>
      </div>
    </div>
  );
}
