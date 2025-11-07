import { gql } from '@apollo/client';

export const CVS_QUERY = gql`
  query Cv {
    cvs {
      id
      name
      education
      description
      user {
        email
      }
    }
  }
`;
