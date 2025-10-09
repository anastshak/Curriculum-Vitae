import { useMutation } from '@apollo/client/react';
import { Profile, UpdateProfileSkillInput } from 'cv-graphql';

import { UPDATE_PROFILE_SKILL } from '../graphql/updateSkill.graphql';

type UpdateSkillArgs = {
  skill: UpdateProfileSkillInput;
};

type UpdateSkillResult = {
  updateProfileSkill: Profile;
};

export function useUpdateProfileSkill() {
  return useMutation<UpdateSkillResult, UpdateSkillArgs>(UPDATE_PROFILE_SKILL);
}
