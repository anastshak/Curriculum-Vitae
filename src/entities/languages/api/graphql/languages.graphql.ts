import { gql } from '@apollo/client';

export const LANGUAGES_QUERY = gql`
  query Languages {
    languages {
      id
      name
      native_name
    }
  }
`;
