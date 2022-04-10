import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const ErrorAlert = () => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      There is an error with the service call. Please try again later.
    </Alert>
  );
};

export default ErrorAlert;
