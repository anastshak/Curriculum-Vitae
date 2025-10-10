import { useTranslation } from 'react-i18next';

import { BaseSelect } from '@shared/ui/BaseSelect';

import { proficiencyLevels } from '../consts/proficiencyLevels';
import { LanguageProficiencySelectProps } from '../model/types';

export const LanguageProficiencySelect = ({ value, onChange, loading }: LanguageProficiencySelectProps) => {
  const { t } = useTranslation();

  const options = proficiencyLevels.map((prof) => ({
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
