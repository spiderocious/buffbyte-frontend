import type { User } from '@buffbyte/types';
import { apiHelpers } from '@buffbyte/utils';
import type { AxiosResponse } from 'axios';
import { CACHE_STORAGE_KEYS } from '../constants/cache';
import type { AuthAPIResponse } from '../types/api';

const AUTH_TOKEN_KEY = CACHE_STORAGE_KEYS.AUTH_TOKEN_KEY;
const AUTH_USER_KEY = CACHE_STORAGE_KEYS.AUTH_USER_KEY;

export class AuthService {
  /**
   * Save authentication data to session storage
   */
  static saveAuth(token: string, user: User): void {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }

  /**
   * Get authentication token from session storage
   */
  static getToken(): string | null {
    return sessionStorage.getItem(AUTH_TOKEN_KEY);
  }

  /**
   * Get user data from session storage
   */
  static getUser(): User | null {
    const userStr = sessionStorage.getItem(AUTH_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
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
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_USER_KEY);
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
    const response: AxiosResponse<AuthAPIResponse> = await apiHelpers.post('/auth/login', {
      email,
      password,
    });

    const { user, token } = response.data.data;
    
    // Save auth data to session storage
    this.saveAuth(token, user);
    
    return { user, token };
  }

  /**
   * Register new user
   */
  static async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    const response: AxiosResponse<AuthAPIResponse> = await apiHelpers.post('/auth/register', userData);
  
    const { user, token } = response.data.data;
    // Save auth data to session storage
    this.saveAuth(token, user);
    return { user, token };
  }
 
}