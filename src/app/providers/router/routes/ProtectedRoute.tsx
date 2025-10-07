import { Navigate, Outlet } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client/react';

import { isAuthenticatedVar } from '@features/auth';
import { ROUTES } from '@shared/consts/routes';

export const ProtectedRoute = () => {
  const isAuth = useReactiveVar(isAuthenticatedVar);

  if (!isAuth) {
    return <Navigate to={ROUTES.AUTH.LOGIN} replace />;
  }

  return <Outlet />;
};
