import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Mastery, Profile } from 'cv-graphql';

import { useUpdateProfileSkill } from '@features/skills/api';

import { SkillForm } from '../SkillForm/SkillForm';
import { SkillFormValues } from '../SkillForm/SkillForm.types';

type UpdateSkillDialogProps = {
  open: boolean;
  user: Profile;
  skillName: string;
  categoryId: string;
  mastery: Mastery;
  onClose: () => void;
};

export const UpdateSkillDialog = React.memo(
  ({ open, user, skillName, categoryId, mastery, onClose }: UpdateSkillDialogProps) => {
    const { t } = useTranslation();
    const [updateSkill, { loading }] = useUpdateProfileSkill();

    const handleSubmit = async (values: SkillFormValues) => {
      await updateSkill({
        variables: {
          skill: {
            userId: user.id,
            name: skillName,
            categoryId,
            mastery: values.mastery as Mastery,
          },
        },
      });

      onClose();
    };

    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{t('skills.update')}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <SkillForm
            user={user}
            defaultValues={{
              skill: skillName,
              mastery,
            }}
            disabledSkill
            loading={loading}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </DialogContent>
      </Dialog>
    );
  },
);
