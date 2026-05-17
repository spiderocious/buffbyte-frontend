import { Tooltip, Hovercard, HovercardBody, HovercardFoot } from '@shared/ui/tooltip';
import { KitScene } from './kit-scene';

export function TooltipSection() {
  return (
    <div className="flex flex-col gap-6">
      <KitScene title="Tooltips · all placements" description="Single-line, ink background. Top, bottom, left, right — shown on hover/focus.">
        <div className="flex flex-wrap items-center gap-10 py-6 justify-center">
          {(
            [
              { placement: 'top', label: 'Appears above' },
              { placement: 'bottom', label: 'Appears below' },
              { placement: 'left', label: 'Appears left' },
              { placement: 'right', label: 'Appears right' },
            ] as const
          ).map(({ placement, label }) => (
            <Tooltip key={placement} label={label} placement={placement}>
              <span className="inline-flex items-center gap-1.5 h-8 px-3 border border-hair rounded-soft bg-paper text-[13px] font-medium cursor-default select-none">
                {placement}
                <span className="w-3.5 h-3.5 rounded-full bg-ink-4 text-paper grid place-items-center text-[10px] font-semibold">?</span>
              </span>
            </Tooltip>
          ))}
        </div>
      </KitScene>

      <KitScene title="Tooltips · contextual" description="Label on icon buttons and keyboard shortcuts — the most common real usage.">
        <div className="flex items-center gap-6">
          <Tooltip label="How clearly the first six words pull the reader in" placement="top">
            <span className="inline-flex items-center gap-1.5 h-8 px-3 border border-hair rounded-soft bg-paper text-[13px] font-medium cursor-default">
              Hook strength
              <span className="w-3.5 h-3.5 rounded-full bg-ink-4 text-paper grid place-items-center text-[10px] font-semibold">?</span>
            </span>
          </Tooltip>

          <Tooltip label="Save draft" placement="bottom">
            <span className="inline-flex items-center gap-1 h-8 px-3 border border-hair rounded-soft bg-paper text-[13px] font-medium cursor-default">⌘ S</span>
          </Tooltip>

          <Tooltip label="Run analysis" placement="right">
            <span className="inline-flex items-center gap-1 h-8 px-3 border border-hair rounded-soft bg-paper text-[13px] font-medium cursor-default">⌘ ⏎</span>
          </Tooltip>
        </div>
      </KitScene>

      <KitScene title="Hovercard · user profile" description="Paper card, multi-line, with footer action row. Shown on hover.">
        <div className="flex items-start gap-8 py-2">
          <Hovercard
            trigger={
              <span className="inline-flex items-center h-7 px-2 rounded bg-accent-tint border border-accent-edge text-accent-ink text-[13px] font-medium cursor-pointer">
                @adewale
              </span>
            }
          >
            <HovercardBody>
              <h3 className="text-[14px] font-semibold tracking-[-0.01em] m-0 mb-1">Adewale Adeniji</h3>
              <p className="text-[11.5px] text-ink-3 mb-2">Building BuffByte AI · Lagos, NG</p>
              <p className="text-[12.5px] text-ink-2 leading-[1.5] m-0">
                Indie founder, writes weekly on building-in-public. Twelve drafts in your shared collection.
              </p>
            </HovercardBody>
            <HovercardFoot>
              <span>231 analyses · avg score 82</span>
              <a className="ml-auto text-accent cursor-pointer">View profile</a>
            </HovercardFoot>
          </Hovercard>

          <Hovercard
            trigger={
              <span className="inline-flex items-center h-7 px-2 rounded bg-accent-tint border border-accent-edge text-accent-ink text-[13px] font-medium cursor-pointer">
                #HildaBaci
              </span>
            }
          >
            <HovercardBody>
              <h3 className="text-[14px] font-semibold tracking-[-0.01em] m-0 mb-1">#HildaBaci</h3>
              <p className="text-[11.5px] text-ink-3 mb-2">Trending 3 days · NG · 58.0K posts</p>
              <p className="text-[12.5px] text-ink-2 leading-[1.5] m-0">
                Large-scale-cooking + record-attempt content is converging into a single repeatable format on TikTok + Instagram.
              </p>
            </HovercardBody>
            <HovercardFoot>
              <span>★ Matches your niche</span>
              <a className="ml-auto text-accent cursor-pointer">Draft from this</a>
            </HovercardFoot>
          </Hovercard>
        </div>
      </KitScene>
    </div>
  );
}
