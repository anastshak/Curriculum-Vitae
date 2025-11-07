import { gql } from '@apollo/client';

export const SKILL_CATEGORIES = gql`
  query SkillCategories {
    skillCategories {
      id
      name
      parent {
        id
        name
      }
    }
  }
`;
