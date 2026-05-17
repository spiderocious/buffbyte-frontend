import { Skeleton } from '@shared/ui/skeleton';
import { EmptyState, ThinkingState } from '@shared/ui/empty-state';
import { KitScene } from './kit-scene';

export function SkeletonSection() {
  return (
    <div className="flex flex-col gap-6">
      <KitScene title="Card skeletons" description="Loading state for analysis cards — paper-deep blocks, 1400ms pulse.">
        <div className="grid grid-cols-2 gap-[18px]">
          {[0, 1].map((i) => (
            <div key={i} className="p-[22px] border border-hair rounded-card bg-sheet flex flex-col gap-[14px]">
              <div className="flex items-center gap-3">
                <Skeleton width={40} height={40} radius="50%" />
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton height={12} radius="4px" className="w-2/3" />
                  <Skeleton height={10} radius="4px" className="w-1/3" />
                </div>
              </div>
              <Skeleton height={8} radius="4px" />
              <Skeleton height={8} radius="4px" className="w-4/5" />
              <Skeleton height={8} radius="4px" className="w-3/5" />
              <div className="flex gap-2 pt-1">
                <Skeleton height={24} radius="6px" className="w-20" />
                <Skeleton height={24} radius="6px" className="w-16" />
              </div>
            </div>
          ))}
        </div>
      </KitScene>

      <KitScene title="ThinkingState" description="AI is working — pulsing accent ring with animated dots.">
        <ThinkingState />
      </KitScene>

      <KitScene title="ThinkingState · custom label">
        <ThinkingState title="Scoring your content…" liveLabel="Checking 8 platforms" />
      </KitScene>

      <KitScene title="EmptyState · with icon + CTA">
        <EmptyState
          icon={
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          }
          title="No analyses yet"
          description="Run your first content analysis to see scores, trends, and AI-powered recommendations."
          action={
            <button className="h-8 px-4 bg-accent text-white text-[12.5px] font-medium rounded-soft hover:bg-accent-deep transition-colors">
              Analyze content
            </button>
          }
        />
      </KitScene>

      <KitScene title="EmptyState · no icon (minimal)">
        <EmptyState
          title="Nothing matches your filters"
          description="Try adjusting the date range or platform selection."
        />
      </KitScene>
    </div>
  );
}
