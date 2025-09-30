import { BaseSelect } from '@shared/ui/BaseSelect';

import { useDepartments } from '../api';

type Props = {
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
};

export const DepartmentSelect = ({ value, onChange, loading }: Props) => {
  const { data } = useDepartments();

  return (
    <BaseSelect
      label={'formFields.department'}
      value={value}
      onChange={onChange}
      loading={loading}
      options={data?.departments.map((d) => ({ id: d.id, label: d.name })) || []}
    />
  );
};
