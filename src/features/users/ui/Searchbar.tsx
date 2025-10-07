import { useTranslation } from 'react-i18next';
import { Search } from '@mui/icons-material';
import { Box, InputAdornment, TextField } from '@mui/material';

import { SearchProps } from '../lib/types';

export const Searchbar = ({ search, setSearch }: SearchProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2, ml: 3 }}>
      <TextField
        variant="outlined"
        placeholder={t('buttonMessages.search')}
        size="small"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
        sx={{ width: 320, '& .MuiOutlinedInput-root': { borderRadius: '40px', height: '40px' } }}
      />
    </Box>
  );
};
