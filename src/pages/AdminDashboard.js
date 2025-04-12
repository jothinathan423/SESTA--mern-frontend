import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Container>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4">Welcome Admin </Typography>
        <Typography variant="body1">This is your admin dashboard.</Typography>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
