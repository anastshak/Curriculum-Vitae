import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@features/auth';
import { ROUTES } from '@shared/consts/routes';

export const PublicRoute = () => {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Navigate to={ROUTES.USERS} replace />;
  }

  return <Outlet />;
};
