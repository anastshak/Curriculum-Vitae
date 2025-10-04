import React from 'react';
import { useTranslation } from 'react-i18next';
import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material';
import { UserRole } from 'cv-graphql';

import { DepartmentSelect } from '@entities/departments';
import { PositionSelect } from '@entities/positions';
import { BaseTextField } from '@shared/ui/BaseTextField';

import { useUpdateProfile, useUpdateUser } from '../api';
import { EditUserForm } from '../lib/types';

type Props = {
  editingUser: EditUserForm | null;
  setEditingUser: (user: EditUserForm | null) => void;
};

export const EditProfileDialog = ({ editingUser, setEditingUser }: Props) => {
  const { t } = useTranslation();

  const [updateProfile, { loading: profileLoading }] = useUpdateProfile();
  const [updateUser, { loading: userLoading }] = useUpdateUser();

  const loading = profileLoading || userLoading;

  if (!editingUser) return null;

  const handleClose = () => {
    if (!loading) {
      setEditingUser(null);
    }
  };

  const handleChange = (field: keyof EditUserForm, value: string) => {
    setEditingUser({ ...editingUser, [field]: value });
  };

  const handleUpdate = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    try {
      await updateProfile({
        variables: {
          profile: {
            userId: editingUser.id,
            first_name: editingUser.firstName,
            last_name: editingUser.lastName,
          },
        },
      });

      await updateUser({
        variables: {
          user: {
            userId: editingUser.id,
            departmentId: editingUser.department,
            positionId: editingUser.position,
            role: 'Employee' as UserRole,
          },
        },
      });

      handleClose();
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  return (
    <Dialog open={!!editingUser} onClose={handleClose} maxWidth="md" fullWidth>
      <form onSubmit={handleUpdate}>
        <Box display="flex" alignItems="center" justifyContent="space-between" pr={1}>
          <DialogTitle sx={{ m: 0, p: 2 }}>{t('titles.updateUser')}</DialogTitle>
          <IconButton onClick={handleClose} disabled={loading}>
            <Close />
          </IconButton>
        </Box>

        {/* <DialogTitle>{t('titles.updateUser')}</DialogTitle> */}

        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <BaseTextField name={'formFields.email'} value={editingUser.email} disabled />

            <BaseTextField name={'formFields.password'} value="********" disabled />

            <BaseTextField
              name={'formFields.firstName'}
              value={editingUser.firstName}
              onChange={(event) => handleChange('firstName', event.target.value)}
              loading={loading}
            />

            <BaseTextField
              name={'formFields.lastName'}
              value={editingUser.lastName}
              onChange={(event) => handleChange('lastName', event.target.value)}
              loading={loading}
            />

            <DepartmentSelect
              value={editingUser.department}
              onChange={(val) => handleChange('department', val)}
              loading={loading}
            />

            <PositionSelect
              value={editingUser.position}
              onChange={(val) => handleChange('position', val)}
              loading={loading}
            />

            <BaseTextField name={'formFields.role'} value="Employee" disabled />
          </Grid>
        </DialogContent>

        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button onClick={handleClose}>{t('buttonMessages.cancel')}</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : null}
          >
            {loading ? t('buttonMessages.wait') : t('buttonMessages.update')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
