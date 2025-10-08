import { useQuery } from '@apollo/client/react';
import { Skill } from 'cv-graphql';

import { SKILLS } from '../graphql/skills.graphql';

type SkillsResult = {
  skills: Skill[];
};

export function useSkills() {
  return useQuery<SkillsResult>(SKILLS);
}
