import { gql } from '@apollo/client';

export const POSITIONS_QUERY = gql`
  query Positions {
    positions {
      id
      name
    }
  }
`;
