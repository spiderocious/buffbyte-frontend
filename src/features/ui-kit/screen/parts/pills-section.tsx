import { cn } from '@shared/ui/utils/cn';
import { Pill, StatusPill } from '@shared/ui/pill';
import { KitScene } from './kit-scene';

export function PillsSection() {
  return (
    <div className="flex flex-col gap-6">
      <KitScene label="Status pills · live states">
        <div className="flex flex-wrap gap-2">
          <StatusPill status="live">Live · analysis active</StatusPill>
          <StatusPill status="default">Draft</StatusPill>
          <StatusPill status="default">Stable</StatusPill>
          <StatusPill status="warn">Approaching limit</StatusPill>
          <StatusPill status="crit">Compliance flag</StatusPill>
          <StatusPill status="live">Ready to publish</StatusPill>
        </div>
      </KitScene>

      <KitScene
        label="Value chips · AI findings"
        description="Every adjective the AI returns is a chip with a colour-by-meaning rule."
      >
        <div className="flex flex-wrap gap-2">
          <Pill variant="accent">Strong hook</Pill>
          <Pill variant="accent">High virality</Pill>
          <Pill variant="warn">Tighten middle</Pill>
          <Pill variant="warn">Hashtag drift</Pill>
          <Pill variant="crit">Unverified claim</Pill>
          <Pill variant="crit">Competitor mention</Pill>
          <Pill variant="ink">Recommended</Pill>
        </div>
      </KitScene>

      <KitScene label="Tags · neutral labels">
        <div className="flex flex-wrap gap-2">
          <Pill>jollof_rice</Pill>
          <Pill>nigerian_food</Pill>
          <Pill>guinness_world_record</Pill>
          <Pill>premier_league</Pill>
          <Pill>behind_the_scenes</Pill>
          <Pill>25–34</Pill>
          <Pill>35–44</Pill>
        </div>
      </KitScene>

      <KitScene label="Ranked list · trending hashtags anatomy">
        <div>
          {[
            { rank: 1, tag: '#HildaBaci', tags: ['jollof_rice', 'guinness_world_record'], vol: '58.0K', eng: '87%', top: true },
            { rank: 2, tag: '#JollofRice', tags: ['nigerian_food', 'world_record'], vol: '42.0K', eng: '84%', top: false },
            { rank: 3, tag: '#Tottenham', tags: ['football', 'premier_league'], vol: '35.0K', eng: '74%', top: false },
          ].map((row) => (
            <div
              key={row.rank}
              className="grid gap-[14px] items-center py-[14px] border-t border-hair first:border-t-0"
              style={{ gridTemplateColumns: '22px 1fr auto auto' }}
            >
              <span
                className={cn(
                  'w-[22px] h-[22px] rounded-[4px] flex items-center justify-center text-[11px] font-medium [font-variant-numeric:tabular-nums]',
                  row.top ? 'bg-accent text-white' : 'bg-ink text-paper',
                )}
              >
                {row.rank}
              </span>
              <div>
                <div className="font-medium text-[14px]">{row.tag}</div>
                <div className="flex gap-[6px] mt-1">
                  {row.tags.map((t) => <Pill key={t}>{t}</Pill>)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[14px] font-medium [font-variant-numeric:tabular-nums]">{row.vol}</div>
                <div className="text-[10.5px] text-ink-3 uppercase tracking-[var(--track-overline)]">Volume</div>
              </div>
              <div className="text-right">
                <div className={cn('text-[14px] font-medium [font-variant-numeric:tabular-nums]', row.top ? 'text-accent' : 'text-ink')}>{row.eng}</div>
                <div className="text-[10.5px] text-ink-3 uppercase tracking-[var(--track-overline)]">Engagement</div>
              </div>
            </div>
          ))}
        </div>
      </KitScene>
    </div>
  );
}

