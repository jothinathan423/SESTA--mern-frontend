import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import LeftSidebar from '../components/LeftSidebar';
import CaForm from '../components/caForm';

const HodDashboard = () => {
  const [email, setEmail] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [department, setDepartment] = useState('');

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setEmail(user.email);
      setDepartment(user.department);
    }
  }, []);

  return (
    <div>
      {/* Top Navbar */}
      <Navbar email={email} />

      {/* Sidebar */}
      <LeftSidebar onAddCaClick={() => setShowForm(true)} />

      {/* Main Content */}
      {showForm && (
        <div
          style={{
            marginTop: '80px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
          }}
        >
          <div
            style={{
              width: '500px',
              padding: '30px',
              backgroundColor: '#f9f9f9',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <CaForm department={department} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HodDashboard;
