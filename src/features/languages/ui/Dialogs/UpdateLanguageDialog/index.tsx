import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { LanguageProficiency, Proficiency, Profile } from 'cv-graphql';

import { useUpdateProfileLanguage } from '@features/languages/api';

import { LanguageForm } from '../LanguageForm/LanguageForm';

type UpdateLanguageDialogProps = {
  open: boolean;
  user: Profile;
  languageName: string;
  proficiency: Proficiency;
  onClose: () => void;
};

export const UpdateLanguageDialog = ({ open, user, languageName, proficiency, onClose }: UpdateLanguageDialogProps) => {
  const { t } = useTranslation();
  const [updateLanguage, { loading }] = useUpdateProfileLanguage();

  const handleSubmit = async (values: LanguageProficiency) => {
    await updateLanguage({
      variables: {
        language: {
          userId: user.id,
          name: languageName,
          proficiency: values.proficiency as Proficiency,
        },
      },
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('languages.update')}</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <LanguageForm
          user={user}
          defaultValues={{
            name: languageName,
            proficiency,
          }}
          disabledLanguage
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
