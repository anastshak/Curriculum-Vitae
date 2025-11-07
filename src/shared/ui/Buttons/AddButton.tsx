import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

type Props = {
  handleClick: () => void;
  location: 'skills' | 'languages';
};

export const AddButton = ({ handleClick, location }: Props) => {
  const { t } = useTranslation();

  return (
    <Button variant="text" sx={{ color: 'text.secondary' }} startIcon={<AddIcon />} onClick={handleClick}>
      {location === 'skills' && t('skills.add')}
      {location === 'languages' && t('languages.add')}
    </Button>
  );
};
