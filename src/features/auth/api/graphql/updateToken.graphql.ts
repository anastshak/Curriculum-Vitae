import { gql } from '@apollo/client';
import type { UpdateTokenResult } from 'cv-graphql';

export type UpdateTokenResponse = {
  updateToken: UpdateTokenResult;
};

export const UPDATE_TOKEN = gql`
  mutation UpdateToken {
    updateToken {
      access_token
      refresh_token
    }
  }
`;
