import { useQuery } from '@apollo/client/react';
import { Department } from 'cv-graphql';

import { DEPARTMENTS_QUERY } from '../graphql/departments.graphql';

type DepartmentsResult = {
  departments: Department[];
};

export function useDepartments() {
  return useQuery<DepartmentsResult>(DEPARTMENTS_QUERY);
}
