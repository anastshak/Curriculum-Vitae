import { useContext } from 'react';

import { AuthContext, AuthContextType } from './AuthContext';

// export const useAuth = () => {
//   const token = authStorage.getAccessToken();
//   return { isAuth: Boolean(token) };
// };

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
