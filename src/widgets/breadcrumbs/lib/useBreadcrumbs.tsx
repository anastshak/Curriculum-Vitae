import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Box } from '@mui/material';

import { useUser } from '@features/profile/api';

import { PATH_MAPPING } from '../consts/path-map';

export const useBreadcrumbs = () => {
  const location = useLocation();
  const params = useParams<{ userId?: string }>();
  const { t } = useTranslation();

  const { data, loading } = useUser(params.userId);
  const username = data?.user?.profile?.full_name ?? data?.user?.email ?? null;

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
        const label = loading ? (
          t('buttonMessages.loading')
        ) : (
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', color: 'primary.main' }}>
            <PersonOutlineIcon fontSize="small" sx={{ mr: 0.5 }} />
            {username ?? t('breadcrumbs.unknownUser')}
          </Box>
        );

        crumbs.push({ label, path: currentPath });
      } else {
        crumbs.push({ label: mapping.label, path: currentPath });
      }
    }

    return crumbs;
  }, [pathnames, templateSegments, loading, username, t]);

  return breadcrumbs;
};
