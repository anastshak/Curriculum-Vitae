import { BaseSelect } from '@shared/ui/BaseSelect';

import { useDepartments } from '../api';
import { DepartmentSelectProps } from '../model/types';

export const DepartmentSelect = ({ value, onChange, loading, isOwner = true }: DepartmentSelectProps) => {
  const { data } = useDepartments();

  const options = data?.departments.map((department) => ({ id: department.id, label: department.name })) || [];

  return (
    <BaseSelect
      label={'formFields.department'}
      value={value}
      onChange={onChange}
      loading={loading || !isOwner}
      options={options}
    />
  );
};
