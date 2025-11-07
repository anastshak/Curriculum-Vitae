import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { LanguageProficiency, Proficiency } from 'cv-graphql';

import { LanguageProficiencySelect } from '@entities/language-proficiency';
import { LanguagesSelect } from '@entities/languages';
import { CancelButton } from '@shared/ui/Buttons';

import { LanguageFormProps } from './LanguageForm.types';

export const LanguageForm = ({
  user,
  defaultValues = { name: '', proficiency: 'A1' as Proficiency },
  loading = false,
  disabledLanguage = false,
  onSubmit,
  onCancel,
}: LanguageFormProps) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<LanguageProficiency>({
    defaultValues,
    mode: 'onChange',
  });

  const selectedLanguages = watch('name');
  const selectedProficiencies = watch('proficiency');

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ width: '100%', marginTop: 3 }}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <LanguagesSelect
              user={user}
              value={field.value}
              onChange={field.onChange}
              loading={loading}
              disabled={disabledLanguage}
            />
          )}
        />

        <Controller
          name="proficiency"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <LanguageProficiencySelect value={field.value} onChange={field.onChange} loading={loading} />
          )}
        />

        <Stack direction="row" flexWrap="wrap" justifyContent="flex-end" spacing={2}>
          <CancelButton handleClick={onCancel} />

          <Button
            type="submit"
            variant="contained"
            disabled={loading || !isValid || !selectedLanguages || !selectedProficiencies}
          >
            {loading ? <CircularProgress size={20} /> : t('buttonMessages.confirm')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
