import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    phoneNumber: '',
    uniqueId: '',
    qualification: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/adminregister', formData);
      alert('User registered successfully!');
      setFormData({
        name: '', email: '', password: '', role: '',
        phoneNumber: '', uniqueId: '', qualification: '', gender: ''
      });
    } catch (err) {
      alert(err.response?.data || 'Registration failed');
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Register New Admin/HOD/Principal/CA</Typography>
        <form onSubmit={handleSubmit}>
          {['name', 'email', 'password', 'role', 'phoneNumber', 'uniqueId', 'qualification', 'gender'].map((field) => (
            <TextField
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type={field === 'password' ? 'password' : 'text'}
            />
          ))}
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
