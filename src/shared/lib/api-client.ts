import axios from 'axios';
import { DrawerService } from '@shared/ui/drawer';
import { ROUTES } from '@shared/constants/routes';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('bb_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      DrawerService.toast('An unexpected error occurred.', { variant: 'crit' });
      return Promise.reject(error);
    }

    const status = error.response?.status;

    if (status === 401 || status === 403) {
      sessionStorage.removeItem('bb_token');
      sessionStorage.removeItem('bb_user');
      DrawerService.toast('Session expired. Please sign in again.', { variant: 'crit' });
      window.location.href = ROUTES.AUTH.LOGIN;
      return Promise.reject(error);
    }

    if (status === 404) {
      DrawerService.toast('Resource not found.', { variant: 'crit' });
      return Promise.reject(error);
    }

    if (status === 422) {
      return Promise.reject(error);
    }

    if (status === 429) {
      DrawerService.toast('Too many requests. Try again later.', { variant: 'warn' });
      return Promise.reject(error);
    }

    if (status === 500) {
      DrawerService.toast('Server error. Try again later.', { variant: 'crit' });
      return Promise.reject(error);
    }

    if (status === 502 || status === 503 || status === 504) {
      DrawerService.toast('Service temporarily unavailable.', { variant: 'crit' });
      return Promise.reject(error);
    }

    if (!error.response) {
      DrawerService.toast('Check your connection.', { variant: 'warn' });
      return Promise.reject(error);
    }

    const data = error.response.data as { message?: string; error?: string; data?: { remainingTrials?: number; timeUntilReset?: number } } | undefined;
    const message = data?.error ?? data?.message ?? 'Something went wrong.';
    const timeUntilReset = data?.data?.timeUntilReset;
    const body = timeUntilReset !== undefined
      ? `Resets in ${Math.ceil(timeUntilReset / 3_600_000)}h`
      : undefined;
    DrawerService.toast(message, { variant: 'warn', body });
    return Promise.reject(error);
  },
);
