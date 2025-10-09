import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { Proficiency } from 'cv-graphql';

import { getColorProficiency } from './lib/getColorProficiency';
import { getProfBoxStyles, getWrapperStyles } from './LanguageItem.styles';
import { LanguageItemProps } from './LanguageItem.types';

export const LanguageItem = ({
  name,
  proficiency,
  isOwner = false,
  isRemoveMode = false,
  onEdit,
  selected = false,
  onSelect,
}: LanguageItemProps) => {
  const { t } = useTranslation();
  const { color } = getColorProficiency(proficiency as Proficiency, selected);

  const wrapperStyles = useMemo(() => getWrapperStyles(isRemoveMode, onSelect), [isRemoveMode, onSelect]);
  const profBoxStyles = useMemo(() => getProfBoxStyles(color), [color]);

  return (
    <Stack direction="row" sx={wrapperStyles} onClick={onSelect}>
      <Box sx={profBoxStyles}>{proficiency === 'Native' ? t('languages.levels.native') : proficiency}</Box>

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
