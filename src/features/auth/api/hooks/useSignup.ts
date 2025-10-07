import { useMutation } from '@apollo/client/react';
import type { AuthInput, AuthResult } from 'cv-graphql';

import { SIGNUP } from '../graphql/signup.graphql';

type SignupArgs = {
  auth: AuthInput;
};

type SignupResult = {
  signup: AuthResult;
};

export const useSignup = () => {
  return useMutation<SignupResult, SignupArgs>(SIGNUP);
};
