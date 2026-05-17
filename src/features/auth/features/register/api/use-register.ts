import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@shared/lib/api-client';
import { EP } from '@shared/constants/endpoints';
import type { ApiResponse, User } from '@shared/types/api';

interface RegisterPayload {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
}

interface RegisterData {
  readonly user: User;
  readonly token: string;
}

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await apiClient.post<ApiResponse<RegisterData>>(EP.AUTH.REGISTER, payload);
      return res.data.data;
    },
  });
}
