'use client';

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const defaultValue: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

const MOCK_USER: AuthUser = {
  id: 'u1',
  name: 'Alice Johnson',
  email: 'alice@example.com',
  role: 'Admin',
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUser({ ...MOCK_USER, email });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}