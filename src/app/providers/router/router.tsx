/* eslint-disable react-refresh/only-export-components */
import { Suspense } from 'react';
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProtectedRoute } from '@app/providers/router/routes/ProtectedRoute';
import { PublicRoute } from '@app/providers/router/routes/PublicRoute';
import { Layout } from '@widgets/layout';
import { ROUTES } from '@shared/consts/routes';
import { Loader } from '@shared/ui/Loader';

import { ErrorBoundary } from '../error/ErrorBoundary';

const Signup = lazy(() => import('@pages/auth/SignupPage'));
const Login = lazy(() => import('@pages/auth/LoginPage'));
const AuthLayout = lazy(() => import('@pages/auth/AuthLayout'));
const ForgotPassword = lazy(() => import('@pages/forgot-password'));
const ResetPassword = lazy(() => import('@pages/reset-password'));
const Users = lazy(() => import('@pages/users'));
const ErrorPage = lazy(() => import('@pages/error'));
const Skills = lazy(() => import('@pages/skills'));
const Languages = lazy(() => import('@pages/languages'));
const Profile = lazy(() => import('@pages/user-details/Profile'));
const UserDetailsLayout = lazy(() => import('@pages/user-details/UserDetailsLayout'));

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
      {
        path: ROUTES.USER.PROFILE,
        element: <UserDetailsLayout />,
        children: [
          {
            path: ROUTES.USER.PROFILE,
            element: <Profile />,
          },
          {
            path: ROUTES.USER.SKILLS,
            element: <Skills />,
          },
          {
            path: ROUTES.USER.LANGUAGES,
            element: <Languages />,
          },
        ],
      },
      {
        path: ROUTES.SKILLS,
        element: (
          <Layout>
            <Skills />
          </Layout>
        ),
      },
      {
        path: ROUTES.LANGUAGES,
        element: (
          <Layout>
            <Languages />
          </Layout>
        ),
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
