import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PrincipalDashboard from './pages/PrincipalDashboard';
import HODDashboard from './pages/HODDashboard';
import CADashboard from './pages/CADashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/principal" element={<PrincipalDashboard />} />
        <Route path="/dashboard/hod" element={<HODDashboard />} />
        <Route path="/dashboard/ca" element={<CADashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
