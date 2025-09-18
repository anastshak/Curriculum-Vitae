import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@features/auth/model/useAuth';
import { ROUTES } from '@shared/consts/routes';

export const PublicRoute = () => {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};
