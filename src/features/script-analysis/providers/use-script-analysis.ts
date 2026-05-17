import { useContext } from 'react';
import { ScriptAnalysisContext } from './script-analysis-context';

export function useScriptAnalysis() {
  const ctx = useContext(ScriptAnalysisContext);
  if (!ctx) throw new Error('useScriptAnalysis must be used inside ScriptAnalysisProvider');
  return ctx;
}
