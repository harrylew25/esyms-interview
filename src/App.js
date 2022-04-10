import React, { useState } from 'react';

import { Container, CssBaseline, Typography } from '@mui/material';
import TopBar from './components/TopBar';
import SearchBar from './components/SearchBar';

const App = () => {
  const titleStyle = {
    margin: '20px',
  };

  return (
    <>
      <CssBaseline />
      <TopBar />
      <Typography variant="h3" align="center" sx={titleStyle}>
        Esyms Product Search Table
      </Typography>
      <Container maxWidth="xl">
        <SearchBar />
      </Container>
    </>
  );
};

export default App;
