import React, { useState } from 'react';
import AddStudentForm from '../components/AddStudentForm';
import ViewStudents from '../components/ViewStudents';
import LeftSidebar2 from '../components/LeftSidebar2';
import { Box } from '@mui/material';

const CADashboard = () => {
  const [activeTab, setActiveTab] = useState('');

  const handleSidebarClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <LeftSidebar2
        role="ca"
        onAddStudentClick={() => handleSidebarClick('add')}
        onViewStudentClick={() => handleSidebarClick('view')}
      />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {activeTab === 'add' && <AddStudentForm />}
        {activeTab === 'view' && <ViewStudents />}
        {activeTab === '' && (
          <div style={{ textAlign: 'center', marginTop: '100px', color: '#aaa' }}>
            <h2>Welcome CA!</h2>
            <p>Select an action from the sidebar.</p>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default CADashboard;
