import { useQuery } from '@apollo/client/react';
import { SkillCategory } from 'cv-graphql';

import { SKILL_CATEGORIES } from '../graphql/skillCategories.graphql';

type CategoriesResult = {
  skillCategories: SkillCategory[];
};

export function useSkillCategories() {
  return useQuery<CategoriesResult>(SKILL_CATEGORIES);
}
