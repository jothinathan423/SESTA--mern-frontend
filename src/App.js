import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/Login';
import AdminDashboard from './pages/LoginDashboard';
import PrincipalDashboard from './pages/PrincipalDashboard';
import HODDashboard from './pages/HODDashboard';
import CADashboard from './pages/CADashboard';
import AdminForm from './components/LoginForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/principal" element={<PrincipalDashboard />} />
        <Route path="/dashboard/hod" element={<HODDashboard />} />
        <Route path="/dashboard/ca" element={<CADashboard />} />
        <Route path="/adminform" element={<AdminForm />} />
      </Routes>
    </Router>
  );
}

export default App;
