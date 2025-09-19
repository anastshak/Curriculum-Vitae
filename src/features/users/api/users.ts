import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { User } from 'cv-graphql';

type UsersResult = {
  users: User[];
};

export const USERS_QUERY = gql`
  query Users {
    users {
      id
      email
      department {
        id
        name
      }
      position {
        id
        name
      }
      profile {
        first_name
        last_name
        full_name
        avatar
      }
    }
  }
`;

export function useUsers() {
  return useQuery<UsersResult>(USERS_QUERY);
}
