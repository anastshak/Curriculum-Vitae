import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { ForgotPasswordInput } from 'cv-graphql';

type ForgotPasswordArgs = {
  auth: ForgotPasswordInput;
};

const PASSWORD_MUTATION = gql`
  mutation ForgotPassword($auth: ForgotPasswordInput!) {
    forgotPassword(auth: $auth)
  }
`;

export function useForgotPassword() {
  return useMutation<void, ForgotPasswordArgs>(PASSWORD_MUTATION);
}
