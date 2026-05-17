import { Repeat, Show } from 'meemaw';
import { MessageSquare } from '@ui/icons';
import { EmptyState } from '@ui/empty-state';
import { Skeleton } from '@ui/skeleton';
import { ScoreRing } from '@ui/score-ring';
import { cn } from '@shared/ui/utils/cn';
import type { AnalysisChat, ContentAnalysisResult } from '@shared/types/api';
import { useContentChats } from '../../api/use-content-chats';
import { useContentAnalysis } from '../../providers/use-content-analysis';
import { scoreToColor } from '../../helpers/format-analysis-score';

function chatScore(chat: AnalysisChat): number {
  try {
    const parsed = JSON.parse(chat.response) as ContentAnalysisResult;
    const s = parsed.virality?.score ?? 0;
    return Math.round(s * 100);
  } catch {
    return 0;
  }
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function AnalysisSidebar() {
  const { data: chats, isLoading } = useContentChats();
  const { selectedAnalysis, setSelectedAnalysis } = useContentAnalysis();

  const selectedId =
    selectedAnalysis !== null && 'id' in selectedAnalysis ? selectedAnalysis.id : null;

  return (
    <aside className="flex flex-col border-r border-hair h-full">
      <div className="px-4 py-3 border-b border-hair">
        <h2 className="text-[13px] font-semibold tracking-[-0.01em] m-0">History</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Show when={isLoading}>
          <div className="flex flex-col gap-2 p-3">
            <Skeleton height={60} radius="8px" />
            <Skeleton height={60} radius="8px" />
            <Skeleton height={60} radius="8px" />
          </div>
        </Show>

        <Show when={!isLoading && (chats === undefined || chats.length === 0)}>
          <EmptyState
            icon={<MessageSquare size={18} />}
            title="No analyses yet"
            description="Submit content below to run your first analysis."
            className="py-10"
          />
        </Show>

        <Show when={!isLoading && chats !== undefined && chats.length > 0}>
          <Repeat each={(chats ?? []) as AnalysisChat[]}>
            {(chat) => {
              const score = chatScore(chat);
              const isSelected = selectedId === chat.id || selectedId === chat._id;
              return (
                <button
                  key={chat._id}
                  onClick={() => setSelectedAnalysis(chat)}
                  className={cn(
                    'w-full text-left flex items-start gap-3 px-4 py-3 border-b border-hair',
                    'transition-colors duration-100 focus-visible:outline-none',
                    isSelected ? 'bg-accent-tint' : 'hover:bg-paper-deep',
                  )}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <ScoreRing value={score} size="inline" color={scoreToColor(score)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-medium text-ink m-0 truncate leading-snug">
                      {chat.message.slice(0, 60)}{chat.message.length > 60 ? '…' : ''}
                    </p>
                    <p className="text-[11px] text-ink-3 m-0 mt-0.5">{timeAgo(chat.createdAt)}</p>
                  </div>
                </button>
              );
            }}
          </Repeat>
        </Show>
      </div>
    </aside>
  );
}
