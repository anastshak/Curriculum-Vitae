import { useQuery } from '@apollo/client/react';
import { Profile } from 'cv-graphql';

import { PROFILE_QUERY } from '../graphql/profile.graphql';

export type ProfileArgs = {
  userId?: string;
};

export type ProfileResult = {
  profile: Profile;
};

export const useProfile = (userId: string) => {
  return useQuery<ProfileResult, ProfileArgs>(PROFILE_QUERY, {
    variables: { userId },
    skip: !userId,
  });
};
