import React, { useState } from 'react';
import { Drawer, Box, Typography, Button } from '@mui/material';

const drawerWidth = 220;
const stripeWidth = 30;
const navbarHeight = 64; // Adjust this if your navbar is taller/shorter

const LeftSidebar2 = ({ role, onAddStudentClick, onViewStudentClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Black hover stripe below the navbar */}
      <Box
        onMouseEnter={() => setIsHovered(true)}
        sx={{
          position: 'fixed',
          top: `${navbarHeight}px`,
          left: 0,
          width: `${stripeWidth}px`,
          height: `calc(100vh - ${navbarHeight}px)`,
          backgroundColor: 'black',
          zIndex: 1400,
          cursor: 'pointer',
        }}
      />

      {/* Sidebar Drawer below the navbar */}
      <Drawer
        variant="permanent"
        open={isHovered}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: 1300,
          position: 'fixed',
          top: `${navbarHeight}px`,
          left: 0,
          height: `calc(100vh - ${navbarHeight}px)`,
          transform: isHovered ? `translateX(${stripeWidth}px)` : `translateX(-${drawerWidth}px)`,
          transition: 'transform 0.3s ease-in-out',
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'relative',
            height: '100%',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h4"> CA Actions</Typography>

          {role === 'ca' && (
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onAddStudentClick}
                sx={{ mb: 2 }}
              >
                Add Student
              </Button>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={onViewStudentClick}
              >
                View Students
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default LeftSidebar2;
