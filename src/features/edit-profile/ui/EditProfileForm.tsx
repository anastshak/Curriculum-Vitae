import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, CircularProgress, DialogActions, DialogContent, Grid } from '@mui/material';
import { UserRole } from 'cv-graphql';

import { DepartmentSelect } from '@entities/departments';
import { PositionSelect } from '@entities/positions';
import { BaseTextField } from '@shared/ui/BaseTextField';

import { useUpdateProfile, useUpdateUser } from '../api';
import { EditProfileFormProps, FormValues } from '../lib/types';

export const EditProfileForm = ({ editingUser, onClose, isOwner = true, mode }: EditProfileFormProps) => {
  const { t } = useTranslation();

  const [updateProfile, { loading: profileLoading }] = useUpdateProfile();
  const [updateUser, { loading: userLoading }] = useUpdateUser();

  const loading = profileLoading || userLoading;

  const methods = useForm<FormValues>({
    defaultValues: {
      firstName: editingUser?.firstName || '',
      lastName: editingUser?.lastName || '',
      departmentId: editingUser?.department?.id || '',
      positionId: editingUser?.position?.id || '',
    },
  });

  const {
    handleSubmit,
    formState: { isDirty },
    watch,
  } = methods;

  const formValues = watch();

  if (!editingUser) return null;

  const onSubmit = async (values: FormValues) => {
    try {
      await Promise.all([
        updateProfile({
          variables: {
            profile: {
              userId: editingUser.id,
              first_name: values.firstName,
              last_name: values.lastName,
            },
          },
        }),
        updateUser({
          variables: {
            user: {
              userId: editingUser.id,
              departmentId: values.departmentId,
              positionId: values.positionId,
              role: 'Employee' as UserRole,
            },
          },
        }),
      ]);

      onClose?.();
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const handleFieldChange = (field: keyof FormValues, value: string) => {
    methods.setValue(field, value, { shouldDirty: true });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {mode === 'dialog' && <BaseTextField name={'formFields.email'} value={editingUser.email} disabled />}

            {mode === 'dialog' && <BaseTextField name={'formFields.password'} value="********" disabled />}

            <BaseTextField
              name={'formFields.firstName'}
              value={formValues.firstName}
              onChange={(event) => handleFieldChange('firstName', event.target.value)}
              disabled={!isOwner || loading}
            />

            <BaseTextField
              name={'formFields.lastName'}
              value={formValues.lastName}
              onChange={(event) => handleFieldChange('lastName', event.target.value)}
              disabled={!isOwner || loading}
            />

            <DepartmentSelect
              value={formValues.departmentId}
              onChange={(value) => handleFieldChange('departmentId', value)}
              loading={loading}
              isOwner={isOwner}
            />

            <PositionSelect
              value={formValues.positionId}
              onChange={(value) => handleFieldChange('positionId', value)}
              loading={loading}
              isOwner={isOwner}
            />

            {mode === 'dialog' && <BaseTextField name={'formFields.role'} value="Employee" disabled />}
          </Grid>
        </DialogContent>

        {isOwner && (
          <DialogActions sx={{ mb: 2, mr: 2, display: 'flex', flexWrap: 'wrap' }}>
            {mode === 'dialog' && (
              <Button onClick={onClose} disabled={loading}>
                {t('buttonMessages.cancel')}
              </Button>
            )}

            <Button
              type="submit"
              variant="contained"
              disabled={!isDirty || loading}
              startIcon={loading ? <CircularProgress size={16} /> : null}
            >
              {loading ? t('buttonMessages.wait') : t('buttonMessages.update')}
            </Button>
          </DialogActions>
        )}
      </form>
    </FormProvider>
  );
};
