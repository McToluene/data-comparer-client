import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';

type ToastProps = {
  open: boolean;
  message: string;
  severity: 'error' | 'success';
  handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
};

export default function Toast({ open, handleClose, message, severity }: ToastProps) {
  const action = (
    <React.Fragment>
      <Button color='secondary' size='small' onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} action={action}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
