import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client/react';

import { ROUTES } from '@shared/consts/routes';

import { clearAuth } from '../lib/authState';

export function useLogout() {
  const client = useApolloClient();
  const navigate = useNavigate();

  return async () => {
    clearAuth();
    await client.clearStore();
    navigate(ROUTES.AUTH.LOGIN);
  };
}
