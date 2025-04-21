import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ManageStaff from './ManageStaff';

const DashboardLayout = () => {
  const [selectedStaff, setSelectedStaff] = useState(null);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar onStaffSelect={setSelectedStaff} />
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f9f9f9' }}>
        <ManageStaff selectedStaff={selectedStaff} />
      </div>
    </div>
  );
};

export default DashboardLayout;
