import { Box, Stack } from '@mui/material';

import { LanguageItem } from '../LanguageItem';
import { grid } from './LanguagesList.styles';
import { LanguagesListProps } from './LanguagesList.types';

export const LanguagesList = ({
  languages,
  isOwner = false,
  isRemoveMode = false,
  onEdit,
  selectedLanguages = [],
  onSelectLanguage,
}: LanguagesListProps) => {
  return (
    <Stack spacing={3}>
      <Box sx={grid}>
        {languages.map((language) => (
          <LanguageItem
            key={language.name}
            name={language.name}
            proficiency={language.proficiency}
            isOwner={isOwner}
            isRemoveMode={isRemoveMode}
            onEdit={() => onEdit?.(language)}
            selected={selectedLanguages.includes(language.name)}
            onSelect={() => onSelectLanguage?.(language.name)}
          />
        ))}
      </Box>
    </Stack>
  );
};
