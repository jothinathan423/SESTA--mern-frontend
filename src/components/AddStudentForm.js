import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem
} from '@mui/material';

const AddStudentForm = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    username: '',
    password: '',
    role: 'student',
    phonenumber: '',
    department: '',
    id: '',
    batch: '',
    gender: '',
    year: '',
    section: ''
  });

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/student/insert', studentData);
      alert(res.data.message || "Student added successfully!");

      setStudentData({
        name: '',
        username: '',
        password: '',
        role: 'student',
        phonenumber: '',
        department: '',
        id: '',
        batch: '',
        gender: '',
        year: '',
        section: ''
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add student");
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5, backgroundColor: '#fff', padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          ADD NEW STUDENT
        </Typography>

        <form onSubmit={handleSubmit}>
          {[ 
            { label: 'Name', name: 'name' },
            { label: 'Username', name: 'username' },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'Phone Number', name: 'phonenumber' },
            { label: 'Department', name: 'department' },
            { label: 'Student ID', name: 'id' },
            { label: 'Batch', name: 'batch' },
            { label: 'Year', name: 'year' },
            { label: 'Section', name: 'section' },
          ].map((field) => (
            <TextField
              key={field.name}
              fullWidth
              label={field.label}
              name={field.name}
              type={field.type || 'text'}
              value={studentData[field.name]}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
            />
          ))}

          <TextField
            fullWidth
            select
            label="Gender"
            name="gender"
            value={studentData.gender}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          >
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, backgroundColor: '#673ab7', fontWeight: 'bold', paddingY: 1.5, fontSize: '16px' }}
          >
            Add Student
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddStudentForm;
