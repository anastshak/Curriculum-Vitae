import { useTranslation } from 'react-i18next';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, CircularProgress } from '@mui/material';

type Props = {
  mode: 'base' | 'selected';
  handleClick: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export const DeleteButton = ({ handleClick, mode, disabled, loading }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {mode === 'base' && (
        <Button variant="text" color="error" onClick={handleClick} startIcon={<DeleteForeverIcon />}>
          {t('skills.delete')}
        </Button>
      )}
      {mode === 'selected' && (
        <Button variant="contained" color="error" onClick={handleClick} disabled={disabled}>
          {loading ? <CircularProgress size={18} /> : t('skills.deleteSelected')}
        </Button>
      )}
    </>
  );
};
