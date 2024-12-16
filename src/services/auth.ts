import type { User } from '@buffbyte/types';
import { apiHelpers } from '@buffbyte/utils';
import type { AxiosResponse } from 'axios';
import { CACHE_STORAGE_KEYS } from '../constants/cache';

const AUTH_TOKEN_KEY = CACHE_STORAGE_KEYS.AUTH_TOKEN_KEY;
const AUTH_USER_KEY = CACHE_STORAGE_KEYS.AUTH_USER_KEY;

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


  /**
   * Login user with email and password
   */
  static async login(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      const response: AxiosResponse<{ user: User; token: string }> = await apiHelpers.post('/auth/login', {
        email,
        password,
      });

      const { user, token } = response.data;
      
      // Save auth data to session storage
      this.saveAuth(token, user);
      
      return { user, token };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  /**
   * Register new user
   */
  static async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    try {
      const response: AxiosResponse<{ user: User; token: string }> = await apiHelpers.post('/auth/register', userData);

      const { user, token } = response.data;
      
      // Save auth data to session storage
      this.saveAuth(token, user);
      
      return { user, token };
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }
 
}
