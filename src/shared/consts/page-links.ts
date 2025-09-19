import { lazy } from 'react';

export const Signup = lazy(() => import('@pages/auth/SignupPage'));
export const Login = lazy(() => import('@pages/auth/LoginPage'));
export const AuthLayout = lazy(() => import('@pages/auth/AuthLayout'));
export const ForgotPassword = lazy(() => import('@pages/forgot-password'));
export const ResetPassword = lazy(() => import('@pages/reset-password'));
export const Users = lazy(() => import('@pages/users'));
export const ErrorPage = lazy(() => import('@pages/error'));
