import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@ui/icons';
import { ROUTES } from '@shared/constants/routes';
import type { AnalyzeResult } from '@shared/types/api';
import { ContentAnalysisProvider } from '../providers/content-analysis-provider';
import { ContentInput } from './parts/content-input';

function ContentAnalysisNewInner() {
  const navigate = useNavigate();

  function handleSuccess(result: AnalyzeResult) {
    void navigate(ROUTES.APP.CONTENT_ANALYSIS_RESULT, { replace: true, state: { result } });
  }

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <header className="h-14 flex items-center gap-3 px-4 border-b border-hair bg-paper sticky top-0 z-40">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-soft text-ink-3 hover:text-ink hover:bg-paper-deep transition-colors"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-[15px] font-semibold tracking-tight m-0">New analysis</h1>
      </header>
      <div className="flex-1">
        <ContentInput onSuccess={handleSuccess} />
      </div>
    </div>
  );
}

export function ContentAnalysisNewScreen() {
  return (
    <ContentAnalysisProvider>
      <ContentAnalysisNewInner />
    </ContentAnalysisProvider>
  );
}
