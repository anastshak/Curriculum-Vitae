import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';

import { Layout } from '@widgets/layout';
import { ROUTES } from '@shared/consts/routes';
import { Loader } from '@shared/ui/Loader';

const CvDetailsLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { cvId } = useParams<{ cvId: string }>();

  return (
    <Layout>
      <Tabs value={location.pathname} component="header">
        <Tab
          value={ROUTES.CV.DETAILS.replace(':cvId', cvId!)}
          label={t('navigation.cvDetails')}
          component={NavLink}
          to={ROUTES.CV.DETAILS.replace(':cvId', cvId!)}
        />
        <Tab
          value={ROUTES.CV.PREVIEW.replace(':cvId', cvId!)}
          label={t('navigation.cvPreview')}
          component={NavLink}
          to={ROUTES.CV.PREVIEW.replace(':cvId', cvId!)}
        />
      </Tabs>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
};

export default CvDetailsLayout;
