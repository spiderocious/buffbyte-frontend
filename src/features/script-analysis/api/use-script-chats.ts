import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@shared/lib/api-client';
import { EP } from '@shared/constants/endpoints';
import type { ApiResponse, AnalysisChat } from '@shared/types/api';

export function useScriptChats() {
  return useQuery({
    queryKey: ['script-chats'],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<AnalysisChat[]>>(EP.APP.VIDEO_CHATS);
      return res.data.data;
    },
  });
}
