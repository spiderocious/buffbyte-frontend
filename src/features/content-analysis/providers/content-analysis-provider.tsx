import { useState } from 'react';
import { ContentAnalysisContext, type SelectedAnalysis } from './content-analysis-context';

export function ContentAnalysisProvider({ children }: { readonly children: React.ReactNode }) {
  const [selectedAnalysis, setSelectedAnalysis] = useState<SelectedAnalysis>(null);
  return (
    <ContentAnalysisContext.Provider value={{ selectedAnalysis, setSelectedAnalysis }}>
      {children}
    </ContentAnalysisContext.Provider>
  );
}
