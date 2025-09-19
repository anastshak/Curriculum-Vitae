import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@features/auth';
import { ROUTES } from '@shared/consts/routes';

export const ProtectedRoute = () => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return <Outlet />;
};
