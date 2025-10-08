import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

type Props = {
  handleClick: () => void;
};

export const AddButton = ({ handleClick }: Props) => {
  const { t } = useTranslation();

  return (
    <Button variant="outlined" startIcon={<AddIcon />} onClick={handleClick}>
      {t('skills.add')}
    </Button>
  );
};
