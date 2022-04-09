import React from 'react';

import { Container, CssBaseline, Typography } from '@mui/material';
import TopBar from './components/TopBar';
import SearchBar from './components/SearchBar';

const App = () => {
  return (
    <>
      <CssBaseline />
      <TopBar />
      <Typography variant="h1" align="center">
        Esyms Product Search Table
      </Typography>
      <Container maxWidth="xl">
        <SearchBar />
      </Container>
    </>
  );
};

export default App;
