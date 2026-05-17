import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@shared/lib/api-client';
import { EP } from '@shared/constants/endpoints';
import type { ApiResponse, DashboardData } from '@shared/types/api';

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<DashboardData>>(EP.APP.DASHBOARD);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 60,
  });
}
