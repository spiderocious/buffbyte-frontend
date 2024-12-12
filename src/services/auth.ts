import type { User } from '@buffbyte/types';

const AUTH_TOKEN_KEY = 'buffbyte_auth_token';
const AUTH_USER_KEY = 'buffbyte_auth_user';

export class AuthService {
  /**
   * Save authentication data to session storage
   */
  static saveAuth(token: string, user: User): void {
    try {
      sessionStorage.setItem(AUTH_TOKEN_KEY, token);
      sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save auth data:', error);
    }
  }

  /**
   * Get authentication token from session storage
   */
  static getToken(): string | null {
    try {
      return sessionStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get auth token:', error);
      return null;
    }
  }

  /**
   * Get user data from session storage
   */
  static getUser(): User | null {
    try {
      const userStr = sessionStorage.getItem(AUTH_USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Failed to get user data:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!(this.getToken() && this.getUser());
  }

  /**
   * Clear authentication data
   */
  static clearAuth(): void {
    try {
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
      sessionStorage.removeItem(AUTH_USER_KEY);
    } catch (error) {
      console.error('Failed to clear auth data:', error);
    }
  }

  /**
   * Get authorization header for API requests
   */
  static getAuthHeader(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
