import { useTranslation } from 'react-i18next';

import { BaseSelect } from '@shared/ui/BaseSelect';

import { Props } from '../model/types';

export const MasterySelect = ({ value, onChange, loading }: Props) => {
  const { t } = useTranslation();

  const options = [
    { id: 'Expert', label: t('skills.masteryLevels.expert') },
    { id: 'Proficient', label: t('skills.masteryLevels.proficient') },
    { id: 'Competent', label: t('skills.masteryLevels.competent') },
    { id: 'Advanced', label: t('skills.masteryLevels.advanced') },
    { id: 'Novice', label: t('skills.masteryLevels.novice') },
  ];

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
