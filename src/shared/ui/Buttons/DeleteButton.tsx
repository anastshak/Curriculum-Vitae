import { useTranslation } from 'react-i18next';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, CircularProgress } from '@mui/material';

type Props = {
  mode: 'base' | 'selected';
  handleClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  count?: number;
  location: 'skills' | 'languages';
};

export const DeleteButton = ({ handleClick, mode, disabled, loading, count, location }: Props) => {
  const { t } = useTranslation();

  if (mode === 'base') {
    return (
      <Button variant="text" color="error" onClick={handleClick} startIcon={<DeleteForeverIcon />}>
        {location === 'skills' && t('skills.delete')}
        {location === 'languages' && t('languages.delete')}
      </Button>
    );
  }

  return (
    <Button variant="contained" color="error" onClick={handleClick} disabled={disabled}>
      {loading ? (
        <CircularProgress size={18} />
      ) : (
        `${location === 'skills' ? t('skills.deleteSelected') : t('languages.deleteSelected')}  ${count}`
      )}
    </Button>
  );
};
