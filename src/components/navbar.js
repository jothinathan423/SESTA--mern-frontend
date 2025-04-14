// components/navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, Button } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const roleToTitle = {
  admin: 'Admin Dashboard',
  hod: 'HOD Dashboard',
  principal: 'Principal Dashboard',
  staff: 'Staff Dashboard',
};

const Navbar = () => {
  const email = sessionStorage.getItem('email');
  const role = sessionStorage.getItem('role');
  const dashboardTitle = roleToTitle[role] || 'Dashboard';

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear(); // Clear all session data
    navigate('/', { replace: true }); // Redirect to login and replace history
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left side: Title */}
        <Typography variant="h6">{dashboardTitle}</Typography>

        {/* Right side: Email + Avatar + Logout */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {email}
          </Typography>
          <Avatar sx={{ bgcolor: deepPurple[500], mr: 2 }}>
            {email ? email.charAt(0).toUpperCase() : '?'}
          </Avatar>
          <Button onClick={handleLogout} variant="contained" color="secondary">
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
