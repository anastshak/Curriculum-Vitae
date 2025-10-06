import { createContext, ReactNode, useState } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';

type NotificationContextType = {
  showNotification: (message: string, severity?: AlertColor) => void;
};

export const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => {},
});

type Props = {
  children: ReactNode;
};

export const NotificationProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');

  const showNotification = (msg: string, sev: AlertColor = 'info') => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
