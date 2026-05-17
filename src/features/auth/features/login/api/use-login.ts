import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@shared/lib/api-client';
import { EP } from '@shared/constants/endpoints';
import type { ApiResponse, User } from '@shared/types/api';

interface LoginPayload {
  readonly email: string;
  readonly password: string;
}

interface LoginData {
  readonly user: User;
  readonly token: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await apiClient.post<ApiResponse<LoginData>>(EP.AUTH.LOGIN, payload);
      return res.data.data;
    },
  });
}
