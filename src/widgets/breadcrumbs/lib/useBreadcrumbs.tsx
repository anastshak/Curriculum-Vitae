import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Box } from '@mui/material';

import { useCv } from '@features/cv/api';
import { useUser } from '@features/profile/api';

import { PATH_MAPPING } from '../consts/path-map';

export const useBreadcrumbs = () => {
  const location = useLocation();
  const params = useParams<{ userId?: string; cvId?: string }>();
  const { t } = useTranslation();

  const { data: userData, loading: userLoading } = useUser(params.userId);
  const { data: cvData, loading: cvLoading } = useCv(params.cvId);

  const username = userData?.user?.profile?.full_name ?? userData?.user?.email ?? null;
  const cvName = cvData?.cv?.name ?? null;

  const pathnames = location.pathname.split('/').filter(Boolean);

  const templateSegments = pathnames.map((seg) => (Object.values(params).includes(seg) ? ':id' : seg));

  const breadcrumbs = useMemo(() => {
    const crumbs: Array<{ label: React.ReactNode; path: string }> = [];

    for (let i = 0; i < pathnames.length; i += 1) {
      const currentPath = '/' + pathnames.slice(0, i + 1).join('/');
      const currentTemplate = '/' + templateSegments.slice(0, i + 1).join('/');

      const mapping = PATH_MAPPING[currentTemplate];
      if (!mapping) continue;

      if (mapping.queryKey === 'user') {
        const label = userLoading ? (
          t('buttonMessages.loading')
        ) : (
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', color: 'primary.main' }}>
            <PersonOutlineIcon fontSize="small" sx={{ mr: 0.5 }} />
            {username ?? t('breadcrumbs.unknownUser')}
          </Box>
        );

        crumbs.push({ label, path: currentPath });
      } else if (mapping.queryKey === 'cv') {
        const label = cvLoading ? (
          t('buttonMessages.loading')
        ) : (
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', color: 'primary.main' }}>
            {cvName ?? t('breadcrumbs.unknownCv')}
          </Box>
        );

        crumbs.push({ label, path: currentPath });
      } else {
        crumbs.push({ label: t(mapping.label), path: currentPath });
      }
    }

    return crumbs;
  }, [pathnames, templateSegments, userLoading, t, username, cvLoading, cvName]);

  return breadcrumbs;
};
