import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from '@ui/icons';
import { ROUTES } from '@shared/constants/routes';
import { ScriptAnalysisProvider } from '../providers/script-analysis-provider';
import { useScriptAnalysis } from '../providers/use-script-analysis';
import { ScriptResult } from './parts/script-result';
import type { AnalysisChat } from '@shared/types/api';

function ScriptAnalysisResultInner() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedAnalysis, setSelectedAnalysis } = useScriptAnalysis();

  const stateChat = (location.state as { chat?: AnalysisChat } | null)?.chat ?? null;

  useEffect(() => {
    if (stateChat !== null && selectedAnalysis === null) {
      setSelectedAnalysis(stateChat);
    }
  }, [stateChat, selectedAnalysis, setSelectedAnalysis]);

  useEffect(() => {
    if (stateChat === null && selectedAnalysis === null) {
      navigate(ROUTES.APP.SCRIPT_ANALYSIS, { replace: true });
    }
  }, [stateChat, selectedAnalysis, navigate]);

  if (stateChat === null && selectedAnalysis === null) return null;

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <header className="h-14 flex items-center gap-3 px-4 border-b border-hair bg-paper sticky top-0 z-40">
        <button
          onClick={() => navigate(ROUTES.APP.SCRIPT_ANALYSIS)}
          className="w-8 h-8 flex items-center justify-center rounded-soft text-ink-3 hover:text-ink hover:bg-paper-deep transition-colors"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-[15px] font-semibold tracking-tight m-0">Script result</h1>
      </header>
      <div className="flex-1">
        <ScriptResult />
      </div>
    </div>
  );
}

export function ScriptAnalysisResultScreen() {
  return (
    <ScriptAnalysisProvider>
      <ScriptAnalysisResultInner />
    </ScriptAnalysisProvider>
  );
}
