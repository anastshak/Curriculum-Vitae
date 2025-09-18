import { createContext, ReactNode, useEffect, useState } from 'react';

import { authStorage, AuthTokens } from '../lib/authStorage';

export type AuthContextType = {
  isAuth: boolean;
  login: (tokens: AuthTokens) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(authStorage.hasToken());

  useEffect(() => {
    setIsAuth(authStorage.hasToken());
  }, []);

  const login = (tokens: AuthTokens) => {
    authStorage.saveTokens(tokens);
    setIsAuth(true);
  };

  const logout = () => {
    authStorage.clear();
    setIsAuth(false);
  };

  return <AuthContext.Provider value={{ isAuth, login, logout }}>{children}</AuthContext.Provider>;
};
