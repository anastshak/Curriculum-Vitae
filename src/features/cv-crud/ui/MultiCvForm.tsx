import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CircularProgress, DialogActions, DialogContent, Grid } from '@mui/material';

import { useCurrentUser } from '@features/auth';
import { BaseTextField } from '@shared/ui/BaseTextField';

import { useCreateCv, useUpdateCv } from '../api';
import { CvFormValues, MultiCvFormProps } from '../lib/types';
import { cvSchema } from '../lib/validationSchema';

export const MultiCvForm = ({ editingCv, onClose, isOwner = true, uiMode, functionMode }: MultiCvFormProps) => {
  const { t } = useTranslation();
  const currentUser = useCurrentUser();

  const [updateCv, { loading: cvUpdateLoading }] = useUpdateCv();
  const [createCv, { loading: cvCreateLoading }] = useCreateCv();

  const loading = functionMode === 'create' ? cvCreateLoading : cvUpdateLoading;
  const disabledState = !isOwner || loading;
  const maxWidth = uiMode === 'dialog' ? 550 : 852;

  const methods = useForm<CvFormValues>({
    resolver: zodResolver(cvSchema),
    defaultValues: {
      name: editingCv?.name || '',
      education: editingCv?.education || '',
      description: editingCv?.description || '',
    },
  });

  const {
    handleSubmit,
    formState: { isDirty, errors },
    watch,
  } = methods;

  const formValues = watch();

  const onSubmit = async (values: CvFormValues) => {
    try {
      if (functionMode === 'create') {
        await createCv({
          variables: {
            cv: {
              name: values.name,
              education: values.education,
              description: values.description,
              userId: currentUser?.id,
            },
          },
        });
      } else {
        if (!editingCv) return;

        await updateCv({
          variables: {
            cv: {
              cvId: editingCv.id,
              name: values.name,
              education: values.education,
              description: values.description,
            },
          },
        });
      }

      onClose?.();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFieldChange = (field: keyof CvFormValues, value: string) => {
    methods.setValue(field, value, { shouldDirty: true });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <BaseTextField
              name="formFields.cvName"
              value={formValues.name}
              onChange={(event) => handleFieldChange('name', event.target.value)}
              disabled={disabledState}
              width={maxWidth}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <BaseTextField
              name="formFields.education"
              value={formValues.education}
              onChange={(event) => handleFieldChange('education', event.target.value)}
              disabled={disabledState}
              width={maxWidth}
            />

            <BaseTextField
              name="formFields.description"
              value={formValues.description}
              onChange={(event) => handleFieldChange('description', event.target.value)}
              disabled={disabledState}
              width={maxWidth}
              error={!!errors.description}
              helperText={errors.description?.message}
              multiline
              rows={5}
              sx={{
                '& .MuiInputBase-root': {
                  height: 185,
                  overflow: 'auto',
                },
              }}
            />
          </Grid>
        </DialogContent>

        {isOwner && (
          <DialogActions sx={{ mb: 2, mr: 2, display: 'flex', flexWrap: 'wrap' }}>
            {uiMode === 'dialog' && (
              <Button onClick={onClose} disabled={loading}>
                {t('buttonMessages.cancel')}
              </Button>
            )}

            <Button
              type="submit"
              variant="contained"
              disabled={(!isDirty && functionMode === 'edit') || loading}
              startIcon={loading ? <CircularProgress size={16} /> : null}
            >
              {loading
                ? t('buttonMessages.wait')
                : functionMode === 'create'
                  ? t('buttonMessages.create')
                  : t('buttonMessages.update')}
            </Button>
          </DialogActions>
        )}
      </form>
    </FormProvider>
  );
};
