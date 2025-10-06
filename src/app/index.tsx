import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';

import { NotificationProvider } from '@shared/config/notification';

import { client } from './providers/apollo/client';
import { router } from './providers/router/router';
import { AppThemeProvider } from './providers/theme';

import '@shared/config/i18next';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AppThemeProvider>
        <NotificationProvider>
          <RouterProvider
            future={{
              v7_startTransition: true,
            }}
            router={router}
          />
        </NotificationProvider>
      </AppThemeProvider>
    </ApolloProvider>
  </StrictMode>,
);
