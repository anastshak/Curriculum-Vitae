import { useTranslation } from 'react-i18next';

import { BaseSelect } from '@shared/ui/BaseSelect';

import { getMasteryOptions } from '../model/getMasteryOptions';
import { MasterySelectProps } from '../model/types';

export const MasterySelect = ({ value, onChange, loading }: MasterySelectProps) => {
  const { t } = useTranslation();

  const options = getMasteryOptions(t);

  return (
    <BaseSelect
      label={t('formFields.skillMastery')}
      value={value}
      onChange={onChange}
      loading={loading}
      options={options}
      size={600}
    />
  );
};
