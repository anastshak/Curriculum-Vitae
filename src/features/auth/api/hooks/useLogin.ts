import { useLazyQuery } from '@apollo/client/react';
import type { AuthInput, AuthResult } from 'cv-graphql';

import { LOGIN } from '../graphql/login.graphql';

type LoginArgs = {
  auth: AuthInput;
};

type LoginResult = {
  login: AuthResult;
};

export const useLogin = () => {
  return useLazyQuery<LoginResult, LoginArgs>(LOGIN);
};
