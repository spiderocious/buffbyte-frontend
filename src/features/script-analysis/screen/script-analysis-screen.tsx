import { useNavigate } from 'react-router-dom';
import { PlusCircle } from '@ui/icons';
import { Show, Repeat } from 'meemaw';
import { Skeleton } from '@ui/skeleton';
import { ScriptAnalysisProvider } from '../providers/script-analysis-provider';
import { useScriptAnalysis } from '../providers/use-script-analysis';
import { useScriptChats } from '../api/use-script-chats';
import { ScriptSidebar } from './parts/script-sidebar';
import { ScriptEditor } from './parts/script-editor';
import { ScriptResult } from './parts/script-result';
import { ScoreRing } from '@ui/score-ring';
import { ROUTES } from '@shared/constants/routes';
import { cn } from '@shared/ui/utils/cn';
import type { AnalysisChat, ScriptAnalysisResult } from '@shared/types/api';
import { scoreToColor } from '../helpers/format-analysis-score';

function chatScore(chat: AnalysisChat): number {
  try {
    const parsed = JSON.parse(chat.response) as ScriptAnalysisResult;
    return Math.round((parsed.teleprompter_readiness?.overall_score ?? 0) * 100);
  } catch { return 0; }
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function MobileHistoryList() {
  const navigate = useNavigate();
  const { data: chats, isLoading } = useScriptChats();
  const { setSelectedAnalysis } = useScriptAnalysis();

  function openResult(chat: AnalysisChat) {
    setSelectedAnalysis(chat);
    void navigate(ROUTES.APP.SCRIPT_ANALYSIS_RESULT, { state: { chat } });
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => void navigate(ROUTES.APP.SCRIPT_ANALYSIS_NEW)}
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-card border-2 border-dashed border-accent/40 text-accent text-[13px] font-semibold bg-accent/5 transition-colors hover:bg-accent/10"
      >
        <PlusCircle size={16} />
        New script analysis
      </button>

      {isLoading && (
        <div className="flex flex-col gap-2">
          <Skeleton height={76} radius="8px" />
          <Skeleton height={76} radius="8px" />
          <Skeleton height={76} radius="8px" />
        </div>
      )}

      {!isLoading && (chats === undefined || chats.length === 0) && (
        <div className="text-center py-8 text-[13px] text-ink-3">
          No scripts yet. Start your first one above.
        </div>
      )}

      {!isLoading && (chats?.length ?? 0) > 0 && (
        <Repeat each={(chats ?? []) as AnalysisChat[]}>
          {(chat) => {
            const score = chatScore(chat);
            return (
              <button
                key={chat._id}
                onClick={() => openResult(chat)}
                className={cn(
                  'w-full text-left flex items-center gap-4 p-4 rounded-card border border-hair bg-sheet',
                  'hover:border-accent/40 hover:bg-accent/5 active:scale-[0.99] transition-all duration-150',
                )}
              >
                <ScoreRing value={score} size="inline" color={scoreToColor(score)} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold m-0 truncate leading-snug text-ink">
                    {chat.message.length > 60 ? chat.message.slice(0, 60) + '…' : chat.message}
                  </p>
                  <p className="text-[11.5px] text-ink-3 m-0 mt-0.5">{timeAgo(chat.createdAt)}</p>
                </div>
                <div className="flex-shrink-0 text-[22px] text-ink-5">›</div>
              </button>
            );
          }}
        </Repeat>
      )}
    </div>
  );
}

function ScriptAnalysisInner() {
  const { selectedAnalysis } = useScriptAnalysis();

  return (
    <>
      {/* ── Mobile layout: full list ── */}
      <div className="md:hidden">
        <MobileHistoryList />
      </div>

      {/* ── Desktop layout: two-column ── */}
      <div className="hidden md:flex md:h-[calc(100vh-56px-48px)] border border-hair rounded-card overflow-hidden bg-sheet">
        <div className="md:w-[35%] flex-shrink-0 border-r border-hair flex flex-col">
          <ScriptSidebar />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Show when={selectedAnalysis !== null} fallback={<ScriptEditor />}>
            <ScriptResult />
          </Show>
        </div>
      </div>
    </>
  );
}

function ScriptAnalysisHeader() {
  const navigate = useNavigate();
  const { selectedAnalysis } = useScriptAnalysis();

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-[20px] font-semibold tracking-[-0.014em] m-0">Script analysis</h1>
        <p className="text-[13px] text-ink-3 m-0 mt-1">
          Get AI feedback on delivery, pace, engagement, and teleprompter readiness.
        </p>
      </div>
      <Show when={selectedAnalysis !== null}>
        <button
          onClick={() => void navigate(ROUTES.APP.SCRIPT_ANALYSIS_NEW)}
          className="hidden md:flex items-center gap-1.5 text-[12.5px] font-semibold text-accent border border-accent/30 bg-accent/5 hover:bg-accent/10 rounded-soft px-3 py-1.5 transition-colors flex-shrink-0 mt-0.5"
        >
          <PlusCircle size={14} />
          New analysis
        </button>
      </Show>
    </div>
  );
}

export function ScriptAnalysisScreen() {
  return (
    <ScriptAnalysisProvider>
      <div className="flex flex-col gap-4">
        <ScriptAnalysisHeader />
        <ScriptAnalysisInner />
      </div>
    </ScriptAnalysisProvider>
  );
}
