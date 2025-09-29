import { useQuery } from '@apollo/client/react';
import { User } from 'cv-graphql';

import { USERS_QUERY } from '../graphql/users.graphql.ts';

type UsersResult = {
  users: User[];
};

export function useUsers() {
  return useQuery<UsersResult>(USERS_QUERY);
}
