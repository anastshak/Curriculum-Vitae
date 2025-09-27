import { Search } from '@mui/icons-material';
import { Box, InputAdornment, TextField } from '@mui/material';

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export const Searchbar = ({ search, setSearch }: Props) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2, ml: 3 }}>
    <TextField
      variant="outlined"
      placeholder="Search"
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
