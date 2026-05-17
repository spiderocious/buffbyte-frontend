import { createContext } from 'react';
import type { User } from '@shared/types/api';

export interface AuthContextValue {
  readonly user: User | null;
  readonly token: string | null;
  readonly login: (user: User, token: string) => void;
  readonly logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
