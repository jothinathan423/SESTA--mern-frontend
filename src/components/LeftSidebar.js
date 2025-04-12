import React, { useState } from 'react';
import { Drawer, Box, Typography, Button } from '@mui/material';

const drawerWidth = 200;

const LeftSidebar = ({ onAddCaClick }) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sx={{
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 60,
          boxSizing: 'border-box',
          backgroundColor: '#0a1929', // 💙 custom dark blue
          color: '#fff',
          position: 'fixed',
          top: 64, // make sure it starts below navbar
          height: '100%',
          transition: 'width 0.3s ease',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        {open && (
          <>
            <Typography variant="h6">HOD Actions</Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={onAddCaClick}
              fullWidth
            >
              Add CA
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default LeftSidebar;
