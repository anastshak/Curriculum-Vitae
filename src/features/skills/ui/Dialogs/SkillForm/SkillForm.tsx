import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { Mastery } from 'cv-graphql';

import { MasterySelect } from '@entities/mastery';
import { GroupedSkillSelect } from '@entities/skills';

import { CancelButton } from '../../Buttons';
import { SkillFormProps, SkillFormValues } from './SkillForm.types';

export const SkillForm = ({
  user,
  defaultValues = { skill: '', mastery: 'Novice' as Mastery },
  loading = false,
  disabledSkill = false,
  onSubmit,
  onCancel,
}: SkillFormProps) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<SkillFormValues>({
    defaultValues,
    mode: 'onChange',
  });

  const selectedSkill = watch('skill');
  const selectedMastery = watch('mastery');

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ width: '100%', marginTop: 3 }}>
        <Controller
          name="skill"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <GroupedSkillSelect
              user={user}
              value={field.value}
              onChange={field.onChange}
              loading={loading}
              disabled={disabledSkill}
            />
          )}
        />

        <Controller
          name="mastery"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <MasterySelect value={field.value} onChange={field.onChange} loading={loading} />}
        />

        <Stack direction="row" flexWrap="wrap" justifyContent="flex-end" spacing={2}>
          <CancelButton handleClick={onCancel} />

          <Button
            type="submit"
            variant="contained"
            disabled={loading || !isValid || !selectedSkill || !selectedMastery}
          >
            {loading ? <CircularProgress size={20} /> : t('buttonMessages.confirm')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
