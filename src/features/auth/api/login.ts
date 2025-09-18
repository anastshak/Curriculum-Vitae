import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import type { AuthInput, AuthResult } from 'cv-graphql';

type LoginArgs = {
  auth: AuthInput;
};

type LoginResult = {
  login: AuthResult;
};

const LOGIN = gql`
  query Login($auth: AuthInput!) {
    login(auth: $auth) {
      access_token
      refresh_token
      user {
        id
        created_at
        email
        role
        profile {
          id
          first_name
          last_name
          full_name
          avatar
          skills {
            name
            categoryId
            mastery
          }
          languages {
            name
            proficiency
          }
        }
        department {
          id
          name
        }
        position {
          id
          name
        }
        cvs {
          id
          name
          education
          description
        }
      }
    }
  }
`;

export const useLogin = () => {
  return useLazyQuery<LoginResult, LoginArgs>(LOGIN);
};
