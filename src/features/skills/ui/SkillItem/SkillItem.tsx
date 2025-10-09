import { useMemo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, LinearProgress, Stack, Typography, useTheme } from '@mui/material';
import { Mastery } from 'cv-graphql';

import { getColorMastery } from './lib/getColorMastery';
import { getValuesFromTheme } from './lib/getValuesFromTheme';
import { getProgressBarStyles, getWrapperStyles } from './SkillItem.styles';
import { SkillItemProps } from './SkillItem.types';

export const SkillItem = ({ name, mastery, isOwner = false, onEdit, selected = false, onSelect }: SkillItemProps) => {
  const theme = useTheme();

  const { value, color } = getColorMastery(mastery as Mastery, selected);
  const { progress, background } = getValuesFromTheme(theme, color);

  const wrapperStyles = useMemo(() => getWrapperStyles(isOwner, onSelect), [isOwner, onSelect]);
  const progressStyles = useMemo(() => getProgressBarStyles(progress, background), [progress, background]);

  return (
    <Stack direction="row" sx={wrapperStyles} onClick={onSelect}>
      <LinearProgress variant="determinate" value={value} sx={progressStyles} />

      <>
        <Typography variant="body1" color={selected ? 'text.primary' : '#767676'} fontWeight={selected ? 700 : 400}>
          {name}
        </Typography>

        {isOwner && onEdit && (
          <IconButton
            size="small"
            onClick={(event) => {
              event.stopPropagation();
              onEdit();
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </>
    </Stack>
  );
};
