import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';

import { ROUTES } from '@shared/consts/routes';
import { Loader } from '@shared/ui/Loader';

export const AuthLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <>
      <Tabs value={location.pathname} centered component="header">
        <Tab value={ROUTES.AUTH.LOGIN} label={t('Login')} component={NavLink} to={ROUTES.AUTH.LOGIN} />
        <Tab value={ROUTES.AUTH.SIGNUP} label={t('Signup')} component={NavLink} to={ROUTES.AUTH.SIGNUP} />
      </Tabs>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};
