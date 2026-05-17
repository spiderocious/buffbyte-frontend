import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from '@ui/icons';
import { ROUTES } from '@shared/constants/routes';
import { ContentAnalysisProvider } from '../providers/content-analysis-provider';
import { useContentAnalysis } from '../providers/use-content-analysis';
import { AnalysisResult } from './parts/analysis-result';
import type { AnalysisChat } from '@shared/types/api';

function ContentAnalysisResultInner() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedAnalysis, setSelectedAnalysis } = useContentAnalysis();

  const stateChat = (location.state as { chat?: AnalysisChat } | null)?.chat ?? null;

  useEffect(() => {
    if (stateChat !== null && selectedAnalysis === null) {
      setSelectedAnalysis(stateChat);
    }
  }, [stateChat, selectedAnalysis, setSelectedAnalysis]);

  useEffect(() => {
    if (stateChat === null && selectedAnalysis === null) {
      navigate(ROUTES.APP.CONTENT_ANALYSIS, { replace: true });
    }
  }, [stateChat, selectedAnalysis, navigate]);

  if (stateChat === null && selectedAnalysis === null) return null;

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <header className="h-14 flex items-center gap-3 px-4 border-b border-hair bg-paper sticky top-0 z-40">
        <button
          onClick={() => navigate(ROUTES.APP.CONTENT_ANALYSIS)}
          className="w-8 h-8 flex items-center justify-center rounded-soft text-ink-3 hover:text-ink hover:bg-paper-deep transition-colors"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-[15px] font-semibold tracking-tight m-0">Analysis result</h1>
      </header>
      <div className="flex-1">
        <AnalysisResult />
      </div>
    </div>
  );
}

export function ContentAnalysisResultScreen() {
  return (
    <ContentAnalysisProvider>
      <ContentAnalysisResultInner />
    </ContentAnalysisProvider>
  );
}
