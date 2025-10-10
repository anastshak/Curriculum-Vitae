import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Mastery, Profile } from 'cv-graphql';

import { useAddProfileSkill } from '@features/skills/api';

import { SkillForm } from '../SkillForm/SkillForm';
import { SkillFormValues } from '../SkillForm/SkillForm.types';

type AddSkillDialogProps = {
  open: boolean;
  user: Profile;
  onClose: () => void;
};

export const AddSkillDialog = React.memo(({ open, user, onClose }: AddSkillDialogProps) => {
  const { t } = useTranslation();
  const [addSkill, { loading }] = useAddProfileSkill();

  const handleSubmit = async (values: SkillFormValues) => {
    if (values) {
      const [skillName, categoryId] = values.skill.split(':');

      await addSkill({
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
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('skills.add')}</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <SkillForm user={user} loading={loading} onSubmit={handleSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
});
