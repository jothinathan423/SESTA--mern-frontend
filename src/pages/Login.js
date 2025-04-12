import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
  const [data, setData] = useState({
    email: "",
    password: "",
    department: ""
  });

  const navigate = useNavigate();

  const collecting = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin/adminlogin", {
        email: data.email,
        password: data.password,
        department:data.department
      });

      // Destructure token, role, department from response
      const { token, role, department } = response.data;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userDepartment", department); // ✅ save department

      // Redirect based on role
      switch (role.toLowerCase()) {
        case 'principal':
          navigate("/dashboard/principal");
          break;
        case 'hod':
          navigate("/dashboard/hod");
          break;
        case 'staff':
          navigate("/dashboard/ca");
          break;
        case 'admin':
          navigate("/dashboard/admin");
          break;
        default:
          alert("Unknown role. Access denied.");
      }

    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={data.email}
            onChange={collecting}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={data.password}
            onChange={collecting}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default AdminLogin;
