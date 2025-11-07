import { useMutation } from '@apollo/client/react';
import { AddProfileSkillInput, Profile } from 'cv-graphql';

import { ADD_PROFILE_SKILL } from '../graphql/addSkill.graphql';

type AddSkillArgs = {
  skill: AddProfileSkillInput;
};

type AddSkillResult = {
  addProfileSkill: Profile;
};

export function useAddProfileSkill() {
  return useMutation<AddSkillResult, AddSkillArgs>(ADD_PROFILE_SKILL);
}
