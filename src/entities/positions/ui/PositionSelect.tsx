import { BaseSelect } from '@shared/ui/BaseSelect';

import { usePositions } from '../api';

type Props = {
  value: string;
  onChange?: (value: string) => void;
  loading: boolean;
  isOwner?: boolean;
};

export const PositionSelect = ({ value, onChange, loading, isOwner = true }: Props) => {
  const { data } = usePositions();
  const options = data?.positions.map((p) => ({ id: p.id, label: p.name })) || [];

  return (
    <BaseSelect
      label={'formFields.position'}
      value={value}
      onChange={onChange}
      loading={loading || !isOwner}
      options={options}
    />
  );
};
