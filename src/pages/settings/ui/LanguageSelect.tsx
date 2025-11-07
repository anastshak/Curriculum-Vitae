import { useTranslation } from 'react-i18next';

import { BaseSelect } from '@shared/ui/BaseSelect';

import { LanguageSelectProps } from '../lib/types';

export const LanguageSelect = ({ value, onChange, loading }: LanguageSelectProps) => {
  const { t } = useTranslation();

  const options = [
    { id: 'en', label: t('settings.language.en') },
    { id: 'ru', label: t('settings.language.ru') },
  ];

  return (
    <BaseSelect
      label={t('settings.language.title')}
      value={value}
      onChange={onChange}
      loading={loading}
      options={options}
      size={600}
    />
  );
};
