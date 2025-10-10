import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { LanguageProficiency, Profile } from 'cv-graphql';

import { useAddProfileLanguage } from '@features/languages/api';

import { LanguageForm } from '../LanguageForm/LanguageForm';

type AddLanguageDialogProps = {
  open: boolean;
  user: Profile;
  onClose: () => void;
};

export const AddLanguageDialog = React.memo(({ open, user, onClose }: AddLanguageDialogProps) => {
  const { t } = useTranslation();

  const [addLanguage, { loading }] = useAddProfileLanguage();

  const handleSubmit = async (values: LanguageProficiency) => {
    if (values) {
      await addLanguage({
        variables: {
          language: {
            userId: user.id,
            name: values.name,
            proficiency: values.proficiency,
          },
        },
      });

      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('languages.add')}</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <LanguageForm user={user} loading={loading} onSubmit={handleSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
});
