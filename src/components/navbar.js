import React from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const Navbar = ({ email }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left side: Title */}
        <Typography variant="h6" component="div">
          HOD Dashboard
        </Typography>

        {/* Right side: Avatar and Email */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {email}
          </Typography>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>
            {email ? email.charAt(0).toUpperCase() : 'H'}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
