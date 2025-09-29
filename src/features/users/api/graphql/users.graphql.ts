import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  query Users {
    users {
      id
      email
      department {
        id
        name
      }
      position {
        id
        name
      }
      profile {
        first_name
        last_name
        full_name
        avatar
      }
    }
  }
`;
