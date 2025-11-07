import { useMutation } from '@apollo/client/react';
import { DeleteProfileSkillInput, Profile, SkillMastery } from 'cv-graphql';

import { DELETE_PROFILE_SKILL } from '../graphql/deleteSkill.graphql';

type DeleteSkillArgs = {
  skill: DeleteProfileSkillInput;
};

type DeleteSkillResult = {
  deleteProfileSkill: Profile;
};

export function useDeleteProfileSkill() {
  return useMutation<DeleteSkillResult, DeleteSkillArgs>(DELETE_PROFILE_SKILL, {
    update: (cache, { data }, { variables }) => {
      if (!data || !variables) return;

      const userId = variables.skill.userId;
      const skillNames = variables.skill.name;

      cache.modify({
        id: cache.identify({ __typename: 'Profile', id: userId }),
        fields: {
          skills(existingSkills = []) {
            return existingSkills.filter((skill: SkillMastery) => !skillNames.includes(skill.name));
          },
        },
      });
    },
  });
}
