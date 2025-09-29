import { useQuery } from '@apollo/client/react';
import { User } from 'cv-graphql';

import { USER_QUERY } from '../graphql/user.graphql';

export type UserArgs = {
  userId?: string;
};

export type UserResult = {
  user: User;
};

export function useUser(userId?: string) {
  return useQuery<UserResult, UserArgs>(USER_QUERY, {
    variables: { userId },
    skip: !userId,
  });
}
