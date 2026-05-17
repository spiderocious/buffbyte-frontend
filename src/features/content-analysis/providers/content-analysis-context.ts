import { createContext } from 'react';
import type { AnalysisChat, AnalyzeResult } from '@shared/types/api';

export type SelectedAnalysis = AnalysisChat | AnalyzeResult | null;

export interface ContentAnalysisContextValue {
  readonly selectedAnalysis: SelectedAnalysis;
  readonly setSelectedAnalysis: (a: SelectedAnalysis) => void;
}

export const ContentAnalysisContext = createContext<ContentAnalysisContextValue | null>(null);
