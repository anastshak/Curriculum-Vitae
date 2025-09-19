import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProtectedRoute } from '@app/providers/router/routes/ProtectedRoute';
import { PublicRoute } from '@app/providers/router/routes/PublicRoute';
import { AuthLayout, LoginPage, SignupPage } from '@pages/auth';
import { ForgotPasswordPage } from '@pages/forgot-password';
import { ResetPasswordPage } from '@pages/reset-password';
import { UsersPage } from '@pages/users';
import { ROUTES } from '@shared/consts/routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={ROUTES.AUTH.LOGIN} replace />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.USERS,
        element: <UsersPage />,
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
            element: <LoginPage />,
          },
          {
            path: ROUTES.AUTH.SIGNUP,
            element: <SignupPage />,
          },
        ],
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      {
        path: ROUTES.RESET_PASSWORD,
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: '*',
    element: <div>Page not found</div>,
  },
]);
