import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import logo from '../assets/profilePic.jpg';

const TopBar = () => {
  const appBarStyles = {
    backgroundColor: 'rgb(109, 200, 191)',
  };
  return (
    <AppBar position="relative" sx={appBarStyles}>
      <Toolbar>
        <img src={logo} alt="Logo" />
        <Typography variant="h4"> Search Table</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
