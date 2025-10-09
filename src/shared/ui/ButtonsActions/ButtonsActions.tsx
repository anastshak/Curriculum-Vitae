import { Stack } from '@mui/material';

import { AddButton, CancelButton, DeleteButton } from '../Buttons';
import { ButtonsActionsProps } from './ButtonsActions.types';

export const ButtonsActions = ({
  removeMode,
  selectedItems,
  deleteLoading,
  onAdd,
  onDeleteMode,
  onCancel,
  onDelete,
  location,
}: ButtonsActionsProps) => (
  <Stack direction="row" justifyContent="flex-end" alignItems="center" marginY={3} spacing={1.5}>
    {!removeMode ? (
      <>
        <AddButton location={location} handleClick={onAdd} />
        <DeleteButton location={location} mode="base" handleClick={onDeleteMode} />
      </>
    ) : (
      <>
        <CancelButton handleClick={onCancel} />
        <DeleteButton
          mode="selected"
          handleClick={onDelete}
          disabled={!selectedItems.length || deleteLoading}
          loading={deleteLoading}
          count={selectedItems.length}
          location={location}
        />
      </>
    )}
  </Stack>
);
