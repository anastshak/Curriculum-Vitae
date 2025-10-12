import { useMutation } from '@apollo/client/react';
import { DeleteCvInput } from 'cv-graphql';

import { DELETE_CV } from '../graphql/deleteCv.graphql';

type DeleteCvArgs = {
  cv: DeleteCvInput;
};

export const useDeleteCv = (cvId: string) => {
  return useMutation<null, DeleteCvArgs>(DELETE_CV, {
    variables: {
      cv: {
        cvId,
      },
    },
    update(cache) {
      const id = cache.identify({ id: cvId, __typename: 'Cv' });
      cache.evict({ id });
      cache.gc();
    },
  });
};
