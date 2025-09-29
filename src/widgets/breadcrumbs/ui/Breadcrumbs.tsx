import { Link as RouterLink } from 'react-router-dom';
import { NavigateNext } from '@mui/icons-material';
import { Box, Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';

import { useBreadcrumbs } from '../lib/useBreadcrumbs';

export const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <Box
      sx={{
        paddingTop: 2,
        paddingLeft: 3,
        height: '44px',
      }}
    >
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
            <Link
              key={crumb.path}
              component={RouterLink}
              to={crumb.path}
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                  color: 'primary.main',
                },
              }}
            >
              {crumb.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};
