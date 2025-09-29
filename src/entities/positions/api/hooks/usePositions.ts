import { useQuery } from '@apollo/client/react';
import { Position } from 'cv-graphql';

import { POSITIONS_QUERY } from '../graphql/positions.graphql';

type PositionsResult = {
  positions: Position[];
};

export function usePositions() {
  return useQuery<PositionsResult>(POSITIONS_QUERY);
}
