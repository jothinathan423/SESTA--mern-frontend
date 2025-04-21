import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AdminLogin from './pages/Login';
import AdminDashboard from './pages/LoginDashboard';
import PrincipalDashboard from './pages/PrincipalDashboard';
import HODDashboard from './pages/HODDashboard';
import CADashboard from './pages/CADashboard';
import AdminForm from './components/LoginForm';
import Navbar from './components/navbar';
import ManageStaff from './components/ManageStaff';
import DashboardLayout from './components/DashboardLayout';
import StaffList from './components/StaffList'; 

// ✅ Use only ONE StaffRegistration (from /pages/admin/)
import StaffRegistration from './pages/admin/StaffRegistration';
// ✅ If using the full StaffPage version with search/edit/delete, create this
import StaffRegistrationPage from './pages/StaffRegistrationPage';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideNavbarOn = ['/']; // Routes where navbar should be hidden
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  // ✅ Get user data from sessionStorage
  const email = sessionStorage.getItem('email');
  const role = sessionStorage.getItem('role');

  return (
    <>
      {/* ✅ Conditionally render Navbar with props */}
      {!shouldHideNavbar && <Navbar email={email} role={role} />}
      
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/principal" element={<PrincipalDashboard />} />
        <Route path="/dashboard/hod" element={<HODDashboard />} />
        <Route path="/dashboard/ca" element={<CADashboard />} />
        <Route path="/adminform" element={<AdminForm />} />
        <Route path="/dashboard/admin" element={<DashboardLayout />} />
        <Route path="/manage-staff" element={<ManageStaff />} />

        {/* Option 1: basic staff table */}
        <Route path="/staff-registration" element={<StaffRegistrationPage />} />

        {/* Option 2: full version with edit/delete/search */}
        {/* <Route path="/staff-registration" element={<StaffRegistrationPage />} /> */}

        <Route path="/admin/staff" element={<StaffList />} />
      </Routes>
    </>
  );
}

export default App;
