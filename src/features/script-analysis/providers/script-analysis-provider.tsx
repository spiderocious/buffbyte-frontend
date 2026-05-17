import { useState } from 'react';
import { ScriptAnalysisContext, type SelectedScript } from './script-analysis-context';

export function ScriptAnalysisProvider({ children }: { readonly children: React.ReactNode }) {
  const [selectedAnalysis, setSelectedAnalysis] = useState<SelectedScript>(null);
  return (
    <ScriptAnalysisContext.Provider value={{ selectedAnalysis, setSelectedAnalysis }}>
      {children}
    </ScriptAnalysisContext.Provider>
  );
}
