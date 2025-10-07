import { Link as RouterLink } from 'react-router-dom';
import { NavigateNext } from '@mui/icons-material';
import { Box, Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';

import { useBreadcrumbs } from '../lib/useBreadcrumbs';
import { linkItem, wrapper } from './Breadcrumbs.styles';

export const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <Box sx={wrapper}>
      <MuiBreadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          if (isLast) {
            return (
              <Typography key={crumb.path} color="text.secondary">
                {crumb.label}
              </Typography>
            );
          }

          return (
            <Link key={crumb.path} component={RouterLink} to={crumb.path} sx={linkItem}>
              {crumb.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};
