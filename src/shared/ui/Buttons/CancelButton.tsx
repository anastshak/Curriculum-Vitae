import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

type Props = {
  handleClick: () => void;
};

export const CancelButton = ({ handleClick }: Props) => {
  const { t } = useTranslation();

  return (
    <Button variant="outlined" onClick={handleClick}>
      {t('buttonMessages.cancel')}
    </Button>
  );
};
