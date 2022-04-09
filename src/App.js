import React from 'react';

import { CssBaseline, Typography } from '@mui/material';
import TopBar from './components/TopBar';

const App = () => {
  return (
    <>
      <CssBaseline />
      <TopBar />
      <Typography variant="h1">Hello Esyms Interview Table</Typography>
    </>
  );
};

export default App;
