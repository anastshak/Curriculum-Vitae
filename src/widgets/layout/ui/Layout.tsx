import React from 'react';
import { Box } from '@mui/material';

import { Breadcrumbs } from '@widgets/breadcrumbs';
import { Sidebar } from '@widgets/sidebar';

import { wrapper } from './Layout.styles';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={wrapper}>
        <Breadcrumbs />
        {children}
      </Box>
    </Box>
  );
};
