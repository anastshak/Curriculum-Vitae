import React, { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Typography } from '@mui/material';

import { useUser } from '@features/profile/api';

import { PATH_MAPPING } from '../consts/path-map';

export const useBreadcrumbs = () => {
  const location = useLocation();
  const params = useParams<{ userId?: string }>();

  const { data, loading } = useUser(params.userId);
  const username = data?.user.profile.full_name || data?.user.email;

  const pathnames = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = useMemo(() => {
    const crumbs: Array<{ label: React.ReactNode; path: string }> = [];
    let currentPath = '';

    pathnames.forEach((segment) => {
      currentPath += `/${segment}`;

      const isParam = Object.values(params).includes(segment);

      if (isParam) {
        const pathTemplate = currentPath.replace(`/${segment}`, '/:id');
        const mapping = PATH_MAPPING[pathTemplate];

        if (mapping?.queryKey === 'user') {
          crumbs.push({
            label: loading ? (
              'Loading...'
            ) : (
              <Typography component="span" sx={{ display: 'inline-flex', alignItems: 'center', color: 'primary.main' }}>
                <PersonOutlineIcon fontSize="small" sx={{ mr: 0.5 }} />
                {username ?? 'Unknown user'}
              </Typography>
            ),
            path: currentPath,
          });
        }
      } else {
        const mapping = PATH_MAPPING[currentPath];
        if (mapping) {
          crumbs.push({
            label: mapping.label,
            path: currentPath,
          });
        }
      }
    });

    return crumbs;
  }, [pathnames, params, loading, username]);

  return breadcrumbs;
};
