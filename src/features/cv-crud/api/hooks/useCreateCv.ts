import { useMutation } from '@apollo/client/react';
import { CreateCvInput, Cv } from 'cv-graphql';

import { CREATE_CV } from '../graphql/createCv.graphql.ts';
import { CVS_QUERY } from '../graphql/cvs.graphql.ts';

type CreateCvArgs = {
  cv: CreateCvInput;
};

export type CreateCvResult = {
  createCv: Cv;
};

export const useCreateCv = () => {
  return useMutation<CreateCvResult, CreateCvArgs>(CREATE_CV, {
    refetchQueries: [{ query: CVS_QUERY }],
  });
};
