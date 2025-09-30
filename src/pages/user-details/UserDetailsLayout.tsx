import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';

import { Layout } from '@widgets/layout';
import { ROUTES } from '@shared/consts/routes';
import { Loader } from '@shared/ui/Loader';

const UserDetailsLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { userId } = useParams<{ userId: string }>();

  return (
    <Layout>
      <Tabs value={location.pathname} component="header">
        <Tab
          value={ROUTES.USER.PROFILE.replace(':userId', userId!)}
          label={t('navigation.profile')}
          component={NavLink}
          to={ROUTES.USER.PROFILE.replace(':userId', userId!)}
        />
        <Tab
          value={ROUTES.USER.SKILLS.replace(':userId', userId!)}
          label={t('navigation.skills')}
          component={NavLink}
          to={ROUTES.USER.SKILLS.replace(':userId', userId!)}
        />
        <Tab
          value={ROUTES.USER.LANGUAGES.replace(':userId', userId!)}
          label={t('navigation.languages')}
          component={NavLink}
          to={ROUTES.USER.LANGUAGES.replace(':userId', userId!)}
        />
      </Tabs>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
};

export default UserDetailsLayout;
