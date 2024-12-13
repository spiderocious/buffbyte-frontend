import { apiConfig } from "../config";
import { AuthService } from "./auth";

export class ApiService {
  private static baseUrl = apiConfig.BASE_URL;

  /**
   * Make an authenticated API request
   */
  static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...AuthService.getAuthHeader(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid, clear auth and redirect to login
          AuthService.clearAuth();
          window.location.href = "/login";
          throw new Error("Authentication required");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  /**
   * GET request
   */
  static async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  /**
   * POST request
   */
  static async post<T>(
    endpoint: string,
    data?: Record<string, unknown>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  static async put<T>(
    endpoint: string,
    data?: Record<string, unknown>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  static async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}
