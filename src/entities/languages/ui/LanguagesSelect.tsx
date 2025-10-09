import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { BaseSelect } from '@shared/ui/BaseSelect';

import { useLanguages } from '../api';
import { Props } from '../model/types';

export const LanguagesSelect = ({ user, value, onChange, loading, disabled }: Props) => {
  const { t } = useTranslation();

  const { data, loading: languagesLoading } = useLanguages();
  const isLoading = loading || languagesLoading;

  const userLanguages = useMemo(
    () => new Set(user?.languages?.map((language) => language.name) || []),
    [user?.languages],
  );

  const options = useMemo(
    () =>
      data?.languages
        .filter((language) => !userLanguages.has(language.name))
        .map((language) => ({
          id: language.name,
          label: language.name,
        })) || [],
    [data, userLanguages],
  );

  if (disabled && value) {
    return (
      <BaseSelect
        label={t('formFields.language')}
        value={value}
        loading={isLoading}
        disabled
        options={[{ id: value, label: value.split(':')[0] }]}
        size={600}
      />
    );
  }

  return (
    <BaseSelect
      label={t('formFields.language')}
      value={value}
      onChange={onChange}
      loading={isLoading}
      options={options}
      size={600}
    />
  );
};
