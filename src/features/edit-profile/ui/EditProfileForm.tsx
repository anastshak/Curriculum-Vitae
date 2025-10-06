import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, CircularProgress, DialogActions, DialogContent, Grid } from '@mui/material';
import { UserRole } from 'cv-graphql';

import { DepartmentSelect } from '@entities/departments';
import { PositionSelect } from '@entities/positions';
import { EditUserData } from '@shared/lib/types/EditUserData';
import { BaseTextField } from '@shared/ui/BaseTextField';

import { useUpdateProfile, useUpdateUser } from '../api';
import { FormValues } from '../lib/types';

interface EditProfileFormProps {
  editingUser: EditUserData | null;
  onClose?: () => void;
  isOwner?: boolean;
  mode?: 'dialog' | 'inline';
}

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
    reset,
    watch,
  } = methods;

  useEffect(() => {
    if (editingUser) {
      reset({
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        departmentId: editingUser.department?.id || '',
        positionId: editingUser.position?.id || '',
      });
    }
  }, [editingUser, reset]);

  if (!editingUser) return null;

  const onSubmit = async (values: FormValues) => {
    try {
      await updateProfile({
        variables: {
          profile: {
            userId: editingUser.id,
            first_name: values.firstName,
            last_name: values.lastName,
          },
        },
      });

      await updateUser({
        variables: {
          user: {
            userId: editingUser.id,
            departmentId: values.departmentId,
            positionId: values.positionId,
            role: 'Employee' as UserRole,
          },
        },
      });

      reset(values);
      onClose?.();
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const formValues = watch();

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
              onChange={(event) => methods.setValue('firstName', event.target.value, { shouldDirty: true })}
              disabled={!isOwner || loading}
            />

            <BaseTextField
              name={'formFields.lastName'}
              value={formValues.lastName}
              onChange={(event) => methods.setValue('lastName', event.target.value, { shouldDirty: true })}
              disabled={!isOwner || loading}
            />

            <DepartmentSelect
              value={formValues.departmentId}
              onChange={(value) => methods.setValue('departmentId', value, { shouldDirty: true })}
              loading={loading}
              isOwner={isOwner}
            />

            <PositionSelect
              value={formValues.positionId}
              onChange={(value) => methods.setValue('positionId', value, { shouldDirty: true })}
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
