import { useQuery } from '@apollo/client/react';
import { Cv } from 'cv-graphql';

import { CVS_QUERY } from '../graphql/cvs.graphql';

type CvsResult = {
  cvs: Cv[];
};

export function useCvs() {
  return useQuery<CvsResult>(CVS_QUERY);
}
