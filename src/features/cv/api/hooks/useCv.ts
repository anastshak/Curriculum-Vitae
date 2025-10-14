import { useQuery } from '@apollo/client/react';
import { Cv } from 'cv-graphql';

import { CV_QUERY } from '../graphql/cv.graphql';

export type CvResult = {
  cv: Cv;
};

export type CvArgs = {
  cvId?: string;
};

export function useCv(cvId?: string) {
  return useQuery<CvResult, CvArgs>(CV_QUERY, {
    variables: { cvId },
    skip: !cvId,
  });
}
