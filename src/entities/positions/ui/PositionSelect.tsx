import { BaseSelect } from '@shared/ui/BaseSelect';

import { usePositions } from '../api';

type Props = {
  value: string;
  onChange: (value: string) => void;
  loading: boolean;
};

export const PositionSelect = ({ value, onChange, loading }: Props) => {
  const { data } = usePositions();

  return (
    <BaseSelect
      label={'formFields.position'}
      value={value}
      onChange={onChange}
      loading={loading}
      options={data?.positions.map((d) => ({ id: d.id, label: d.name })) || []}
    />
  );
};
