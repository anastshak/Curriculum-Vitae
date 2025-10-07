import { BaseSelect } from '@shared/ui/BaseSelect';

import { usePositions } from '../api';
import { Props } from '../model/types';

export const PositionSelect = ({ value, onChange, loading, isOwner = true }: Props) => {
  const { data } = usePositions();
  const options = data?.positions.map((position) => ({ id: position.id, label: position.name })) || [];

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
