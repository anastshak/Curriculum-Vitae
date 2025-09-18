import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProtectedRoute } from '@app/providers/router/routes/ProtectedRoute';
import { PublicRoute } from '@app/providers/router/routes/PublicRoute';
import App from '@pages/App';
import { AuthLayout, LoginPage, SignupPage } from '@pages/auth';
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
        path: ROUTES.HOME,
        element: <App />,
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
    ],
  },
  {
    path: '*',
    element: <div>Page not found</div>,
  },
]);
