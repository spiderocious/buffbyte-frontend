import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '@shared/types/api';
import { ROUTES } from '@shared/constants/routes';
import { AuthContext } from './auth-context';

function readUser(): User | null {
  try {
    const raw = sessionStorage.getItem('bb_user');
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { readonly children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(readUser);
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('bb_token'));

  const login = useCallback((nextUser: User, nextToken: string) => {
    sessionStorage.setItem('bb_token', nextToken);
    sessionStorage.setItem('bb_user', JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('bb_token');
    sessionStorage.removeItem('bb_user');
    setToken(null);
    setUser(null);
    navigate(ROUTES.AUTH.LOGIN);
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
