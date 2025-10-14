import { useTranslation } from 'react-i18next';

import { BaseSelect } from '@shared/ui/BaseSelect';

import { ThemeSelectProps } from '../lib/types';

export const ThemeSelect = ({ value, onChange, loading }: ThemeSelectProps) => {
  const { t } = useTranslation();

  const options = [
    { id: 'light', label: t('settings.theme.light') },
    { id: 'dark', label: t('settings.theme.dark') },
    { id: 'device', label: t('settings.theme.device') },
  ];

  return (
    <BaseSelect
      label={t('settings.theme.title')}
      value={value}
      onChange={onChange}
      loading={loading}
      options={options}
      size={600}
    />
  );
};
