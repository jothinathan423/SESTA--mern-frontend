import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Drawer,
  IconButton,
  AppBar,
  Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false); // For opening and closing the sidebar
  const [staffList, setStaffList] = useState([]); // For storing staff data
  const [selectedStaff, setSelectedStaff] = useState(null); // To store clicked staff details
  const [formData, setFormData] = useState({
    prefix: '',
    name: '',
    email: '',
    password: '',
    role: '',
    department: '',
    phoneNumber: '',
    uniqueId: '',
    qualification: '',
    gender: '',
  });

  // Handle sidebar toggle (hamburger menu)
  const handleSidebarToggle = () => {
    setOpenSidebar(!openSidebar);
  };

  // Fetch staff list when the page loads
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/staff'); // Mock API
        setStaffList(response.data); // Storing staff data in state
      } catch (err) {
        console.error('Error fetching staff:', err);
      }
    };
    fetchStaff();
  }, []);

  const handleStaffClick = (staff) => {
    setSelectedStaff(staff); // Show selected staff details when clicked
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/staff/${id}`);
      setStaffList(staffList.filter(staff => staff.id !== id)); // Remove deleted staff from the list
      alert('Staff deleted successfully!');
    } catch (err) {
      console.error('Error deleting staff:', err);
    }
  };

  const handleEdit = (staff) => {
    setFormData(staff); // Pre-fill form with staff data for editing
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(formData.email)) {
      alert('Enter a valid email address.');
      return false;
    }
    if (!passwordRegex.test(formData.password)) {
      alert('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
      return false;
    }
    if (!phoneRegex.test(formData.phoneNumber)) {
      alert('Enter a valid 10-digit phone number.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:5000/api/admin/adminregister', formData);
      alert('User registered successfully!');
      setFormData({
        prefix: '',
        name: '',
        email: '',
        password: '',
        role: '',
        department: '',
        phoneNumber: '',
        uniqueId: '',
        qualification: '',
        gender: '',
      });
    } catch (err) {
      alert(err.response?.data || 'Registration failed');
    }
  };

  const roles = ['hod', 'staff', 'principal', 'admin'];
  const departments = ['it', 'cse', 'ece', 'eee', 'mechanical', 'civil', 'aids'];
  const prefixes = ['Mr', 'Ms', 'Mrs'];

  return (
    <Container>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ backgroundColor: '#0a1929' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleSidebarToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Left Sidebar */}
      <Drawer
        variant="temporary"
        open={openSidebar}
        onClose={handleSidebarToggle}
        sx={{ width: 250, backgroundColor: '#0a1929', color: '#fff' }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Staff Management</Typography>
          <Button variant="contained" fullWidth onClick={() => navigate('/staff-registration')}>
            Manage Staff
          </Button>
        </Box>
      </Drawer>

      {/* Staff List */}
      <Box sx={{ mt: 4 }}>
      
        {staffList.map(staff => (
          <Box key={staff.id} sx={{ mb: 2, p: 2, backgroundColor: '#f4f4f4', borderRadius: '4px' }}>
            <Typography variant="h6">{staff.name} - {staff.uniqueId}</Typography>
            <Button onClick={() => handleStaffClick(staff)} variant="outlined">View Details</Button>
          </Box>
        ))}
      </Box>

      {/* Staff Details Section */}
      {selectedStaff && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Staff Details</Typography>
          <Box>
            <Typography>Name: {selectedStaff.name}</Typography>
            <Typography>Email: {selectedStaff.email}</Typography>
            <Typography>Phone: {selectedStaff.phoneNumber}</Typography>
            <Typography>Qualification: {selectedStaff.qualification}</Typography>
            <Typography>Gender: {selectedStaff.gender}</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleEdit(selectedStaff)}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => handleDelete(selectedStaff.id)}>
              Delete
            </Button>
          </Box>
        </Box>
      )}

      {/* Registration Form */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Register New Admin / HOD / Principal / CA
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Prefix Selector */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Prefix</InputLabel>
            <Select
              name="prefix"
              value={formData.prefix}
              onChange={handleChange}
              label="Prefix"
              required
            >
              {prefixes.map((pfx) => (
                <MenuItem key={pfx} value={pfx}>
                  {pfx}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Name Field */}
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          {/* Email with validation */}
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          {/* Password with strong requirement */}
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            helperText="Min 8 chars, include A-Z, a-z, number, special char"
          />

          {/* Phone Number */}
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Unique ID"
            name="uniqueId"
            value={formData.uniqueId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          {/* Gender Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              label="Gender"
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          {/* Role Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
              required
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Department Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={formData.department}
              onChange={handleChange}
              label="Department"
              required
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
