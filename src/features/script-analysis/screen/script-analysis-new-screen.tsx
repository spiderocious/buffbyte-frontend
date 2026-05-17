import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@ui/icons';
import { ROUTES } from '@shared/constants/routes';
import { ScriptAnalysisProvider } from '../providers/script-analysis-provider';
import { useScriptAnalysis } from '../providers/use-script-analysis';
import { ScriptEditor } from './parts/script-editor';

function ScriptAnalysisNewInner() {
  const navigate = useNavigate();
  const { selectedAnalysis } = useScriptAnalysis();

  if (selectedAnalysis !== null) {
    void navigate(ROUTES.APP.SCRIPT_ANALYSIS, { replace: true });
    return null;
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
        <h1 className="text-[15px] font-semibold tracking-tight m-0">New script analysis</h1>
      </header>
      <div className="flex-1">
        <ScriptEditor />
      </div>
    </div>
  );
}

export function ScriptAnalysisNewScreen() {
  return (
    <ScriptAnalysisProvider>
      <ScriptAnalysisNewInner />
    </ScriptAnalysisProvider>
  );
}
