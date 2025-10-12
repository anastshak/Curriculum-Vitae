import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      created_at
      email
      role
      profile {
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
      department {
        id
        name
      }
      position {
        id
        name
      }
      cvs {
        id
        name
        education
        description
      }
    }
  }
`;
