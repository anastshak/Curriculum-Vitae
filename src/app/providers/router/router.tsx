import { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProtectedRoute } from '@app/providers/router/routes/ProtectedRoute';
import { PublicRoute } from '@app/providers/router/routes/PublicRoute';
import { AuthLayout, ErrorPage, ForgotPassword, Login, ResetPassword, Signup, Users } from '@shared/consts/page-links';
import { ROUTES } from '@shared/consts/routes';
import { Loader } from '@shared/ui/Loader';

import { ErrorBoundary } from '../error/ErrorBoundary';

export const routerRoutes = [
  {
    path: '/',
    element: <Navigate to={ROUTES.AUTH.LOGIN} replace />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.USERS,
        element: <Users />,
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: ROUTES.AUTH.ROOT,
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.AUTH.LOGIN,
            element: <Login />,
          },
          {
            path: ROUTES.AUTH.SIGNUP,
            element: <Signup />,
          },
        ],
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: ROUTES.RESET_PASSWORD,
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
].map((route) => ({
  ...route,
  element: (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>{route.element}</Suspense>
    </ErrorBoundary>
  ),
}));

export const router = createBrowserRouter(routerRoutes);
