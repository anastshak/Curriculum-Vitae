import { Navigate, Outlet } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client/react';

import { isAuthenticatedVar } from '@features/auth';
import { ROUTES } from '@shared/consts/routes';

export const PublicRoute = () => {
  const isAuth = useReactiveVar(isAuthenticatedVar);

  if (isAuth) {
    return <Navigate to={ROUTES.USERS} replace />;
  }

  return <Outlet />;
};
