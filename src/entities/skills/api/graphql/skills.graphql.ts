import { gql } from '@apollo/client';

export const SKILLS = gql`
  query Skills {
    skills {
      id
      name
      category {
        id
        order
      }
      category_name
      category_parent_name
    }
  }
`;
