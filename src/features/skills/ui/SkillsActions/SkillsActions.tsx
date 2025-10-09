import { Stack } from '@mui/material';

import { AddButton, CancelButton, DeleteButton } from '../Buttons';
import { SkillsActionsProps } from './SkillsActions.types';

export const SkillsActions = ({
  removeMode,
  selectedSkills,
  deleteLoading,
  onAdd,
  onDeleteMode,
  onCancel,
  onDelete,
}: SkillsActionsProps) => (
  <Stack direction="row" justifyContent="flex-end" alignItems="center" marginY={3} spacing={1.5}>
    {!removeMode ? (
      <>
        <AddButton handleClick={onAdd} />
        <DeleteButton mode="base" handleClick={onDeleteMode} />
      </>
    ) : (
      <>
        <CancelButton handleClick={onCancel} />
        <DeleteButton
          mode="selected"
          handleClick={onDelete}
          disabled={!selectedSkills.length || deleteLoading}
          loading={deleteLoading}
          count={selectedSkills.length}
        />
      </>
    )}
  </Stack>
);
