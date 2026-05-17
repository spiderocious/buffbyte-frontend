import { useContext } from 'react';
import { ContentAnalysisContext } from './content-analysis-context';

export function useContentAnalysis() {
  const ctx = useContext(ContentAnalysisContext);
  if (!ctx) throw new Error('useContentAnalysis must be used inside ContentAnalysisProvider');
  return ctx;
}
