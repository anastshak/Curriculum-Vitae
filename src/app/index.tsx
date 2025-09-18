import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';

import { AuthProvider } from '@features/auth/model/AuthContext';

import { client } from './providers/apollo/client';
import { router } from './providers/router/router';
import { AppThemeProvider } from './providers/theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <AppThemeProvider>
          <RouterProvider
            future={{
              v7_startTransition: true,
            }}
            router={router}
          />
        </AppThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
);
