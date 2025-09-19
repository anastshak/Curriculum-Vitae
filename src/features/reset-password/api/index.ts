import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { ResetPasswordInput } from 'cv-graphql';

type ResetPasswordArgs = {
  auth: ResetPasswordInput;
};

const PASSWORD_MUTATION = gql`
  mutation ResetPassword($auth: ResetPasswordInput!) {
    resetPassword(auth: $auth)
  }
`;

export function useResetPassword(token: string | null) {
  return useMutation<void, ResetPasswordArgs>(PASSWORD_MUTATION, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
  });
}
