import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import logo from '../assets/profilePic.jpg';

const TopBar = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <img src={logo} alt="Logo" />
        <Typography variant="h3"> Search Table</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
