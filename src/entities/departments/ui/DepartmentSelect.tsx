import { BaseSelect } from '@shared/ui/BaseSelect';

import { useDepartments } from '../api';

type Props = {
  value: string;
  onChange?: (value: string) => void;
  loading: boolean;
  isOwner?: boolean;
};

export const DepartmentSelect = ({ value, onChange, loading, isOwner = true }: Props) => {
  const { data } = useDepartments();

  const options = data?.departments.map((d) => ({ id: d.id, label: d.name })) || [];

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
