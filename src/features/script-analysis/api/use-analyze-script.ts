import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@shared/lib/api-client';
import { EP } from '@shared/constants/endpoints';
import type { ApiResponse, AnalyzeResult, AnalysisType } from '@shared/types/api';

export function useAnalyzeScript() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content: string) => {
      const res = await apiClient.post<ApiResponse<AnalyzeResult>>(EP.APP.ANALYZE, {
        content,
        type: 'video' satisfies AnalysisType,
      });
      return res.data.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['script-chats'] });
    },
  });
}
