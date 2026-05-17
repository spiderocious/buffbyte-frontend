import { createContext } from 'react';
import type { AnalysisChat, AnalyzeResult } from '@shared/types/api';

export type SelectedScript = AnalysisChat | AnalyzeResult | null;

export interface ScriptAnalysisContextValue {
  readonly selectedAnalysis: SelectedScript;
  readonly setSelectedAnalysis: (a: SelectedScript) => void;
}

export const ScriptAnalysisContext = createContext<ScriptAnalysisContextValue | null>(null);
