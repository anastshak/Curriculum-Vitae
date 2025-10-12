import { useMutation } from '@apollo/client/react';
import { Cv, UpdateCvInput } from 'cv-graphql';

import { UPDATE_CV } from '../graphql/updateCv.graphql';

export type UpdateCvResult = {
  updateCv: Cv;
};

type UpdateCvArgs = {
  cv: UpdateCvInput;
};

export function useUpdateCv() {
  return useMutation<UpdateCvResult, UpdateCvArgs>(UPDATE_CV);
}
