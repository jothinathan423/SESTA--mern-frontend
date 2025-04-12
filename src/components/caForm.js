import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Button
} from '@mui/material';
import axios from 'axios';

const CaForm = () => {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const classOptions = ['CSE-A', 'CSE-B', 'CSE-C'];

  useEffect(() => {
    const fetchStaff = async () => {
      const department = localStorage.getItem('userDepartment');
      if (!department) {
        console.error('No department found in localStorage');
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/admin/staff?department=${department}`);
        setStaffList(res.data);
      } catch (err) {
        console.error('Failed to fetch staff:', err);
      }
    };

    fetchStaff();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/admin/update-class`, {
        staffName: selectedStaff,
        className: selectedClass
      });

      console.log('Class updated:', res.data);
      alert('Class updated successfully!');
    } catch (err) {
      console.error('Failed to update class:', err);
      alert('Something went wrong while updating class');
    }
  };

  return (
    <Paper elevation={3} sx={{ m: 4, p: 3, maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom>
        Add CA Form
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Class</InputLabel>
        <Select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          {classOptions.map((cls) => (
            <MenuItem key={cls} value={cls}>
              {cls}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Staff</InputLabel>
        <Select
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
        >
          {staffList.map((staff) => (
            <MenuItem key={staff._id} value={staff.name}>
              {staff.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!selectedClass || !selectedStaff}>
        Submit
      </Button>
    </Paper>
  );
};

export default CaForm;
