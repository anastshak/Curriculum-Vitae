import { useTranslation } from 'react-i18next';

import { BaseSelect } from '@shared/ui/BaseSelect';

import { Props } from '../model/types';

export const LanguageProficiencySelect = ({ value, onChange, loading }: Props) => {
  const { t } = useTranslation();

  const options = ['Native', 'C2', 'C1', 'B2', 'B1', 'A2', 'A1'].map((prof) => ({
    id: prof,
    label: prof === 'Native' ? t('languages.levels.native') : prof,
  }));

  return (
    <BaseSelect
      label={t('formFields.languageProficiency')}
      value={value}
      onChange={onChange}
      loading={loading}
      options={options}
      size={600}
    />
  );
};
