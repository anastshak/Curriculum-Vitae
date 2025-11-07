import { gql } from '@apollo/client';

export const PROFILE_QUERY = gql`
  query Profile($userId: ID!) {
    profile(userId: $userId) {
      id
      created_at
      first_name
      last_name
      full_name
      avatar
      skills {
        name
        categoryId
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`;
