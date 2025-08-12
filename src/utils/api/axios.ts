/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { AuthService } from "@buffbyte/services";
import { showToast } from "@buffbyte/utils";
import type { APIResponse } from "../../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 1000000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use(
    (config) => {
      const token = AuthService.getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (import.meta.env.DEV) {
        console.log(
          `API Request: ${config.method?.toUpperCase()} ${config.url}`,
          {
            headers: config.headers,
            data: config.data,
          }
        );
      }

      return config;
    },
    (error: AxiosError) => {
      console.error("Request Interceptor Error:", error);
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      if (import.meta.env.DEV) {
        console.log(
          `API Response: ${response.config.method?.toUpperCase()} ${
            response.config.url
          }`,
          {
            status: response.status,
            data: response.data,
          }
        );
      }

      return response;
    },
    (error: AxiosError) => {
      const { response, request, config } = error;

      if (import.meta.env.DEV) {
        console.error(
          `API Error: ${config?.method?.toUpperCase()} ${config?.url}`,
          {
            status: response?.status,
            data: response?.data,
            message: error.message,
          }
        );
      }

      if (response) {
        const { status, data } = response;

        switch (status) {
          case 401:
            handleUnauthorized();
            break;
          case 403:
            handleForbidden();
            break;
          case 404:
            showToast.error("The requested resource was not found");
            break;
          case 422:
            break;
          case 429:
            showToast.error("Too many requests. Please try again later");
            break;
          case 500:
            showToast.error("Server error. Please try again later");
            break;
          case 502:
          case 503:
          case 504:
            showToast.error(
              "Service temporarily unavailable. Please try again"
            );
            break;
          default: {
            const errorMessage =
              ((data as Record<string, unknown>)?.message as string) ||
              "An unexpected error occurred";
            showToast.error(errorMessage);
          }
        }
      } else if (request) {
        showToast.error("Network error. Please check your connection");
      } else {
        showToast.error("Request failed. Please try again");
      }

      return Promise.reject(error);
    }
  );

  return client;
};

const handleUnauthorized = () => {
  AuthService.clearAuth();
  showToast.error("Your session has expired. Please log in again");
  if (typeof window !== "undefined") {
    window.location.href = "/auth/login";
  }
};

const handleForbidden = () => {
  AuthService.clearAuth();
  showToast.error("Access denied. Please log in again");
  if (typeof window !== "undefined") {
    window.location.href = "/auth/login";
  }
};

const api = createApiClient();

export const apiHelpers = {
  get: <T = unknown>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<AxiosResponse<T>> => {
    return api.get(url, { params });
  },

  post: <T = unknown>(
    url: string,
    data?: unknown
  ): Promise<AxiosResponse<T>> => {
    return api.post(url, data);
  },

  put: <T = unknown>(
    url: string,
    data?: unknown
  ): Promise<AxiosResponse<T>> => {
    return api.put(url, data);
  },

  patch: <T = unknown>(
    url: string,
    data?: unknown
  ): Promise<AxiosResponse<T>> => {
    return api.patch(url, data);
  },

  delete: <T = unknown>(url: string): Promise<AxiosResponse<T>> => {
    return api.delete(url);
  },

  upload: <T = unknown>(
    url: string,
    file: File | FormData,
    onProgress?: (progress: number) => void
  ): Promise<AxiosResponse<T>> => {
    const formData = file instanceof FormData ? file : new FormData();
    if (file instanceof File) {
      formData.append("file", file);
    }

    return api.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });
  },
};

export const apiConfig = {
  setBaseURL: (baseURL: string) => {
    api.defaults.baseURL = baseURL;
  },

  setTimeout: (timeout: number) => {
    api.defaults.timeout = timeout;
  },

  setHeader: (key: string, value: string) => {
    api.defaults.headers[key] = value;
  },

  removeHeader: (key: string) => {
    delete api.defaults.headers[key];
  },
};

export const getApiErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError<APIResponse<any>>;
  const data = axiosError?.response?.data?.data;
  const isDataAnArray = Array.isArray(data);
  if (isDataAnArray) {
    return data[0]?.message || "Request failed";
  }

  return (
    (axiosError?.response?.data as any)?.error ||
    (axiosError?.response?.data as any)?.message ||
    "Request failed"
  );
};

export default api;
