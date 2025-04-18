// src/components/ViewStudents.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography
} from '@mui/material';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/student/view')
      .then((res) => setStudents(res.data || []))
      .catch((err) => {
        console.error(err);
        alert('Failed to fetch students');
      });
  }, []);

  return (
    <Paper sx={{ mt: 3, p: 2 }}>
      <Typography variant="h5" gutterBottom>Student List</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Batch</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Section</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((stu) => (
            <TableRow key={stu._id}>
              <TableCell>{stu.name}</TableCell>
              <TableCell>{stu.username}</TableCell>
              <TableCell>{stu.phonenumber}</TableCell>
              <TableCell>{stu.department}</TableCell>
              <TableCell>{stu.batch}</TableCell>
              <TableCell>{stu.gender}</TableCell>
              <TableCell>{stu.year}</TableCell>
              <TableCell>{stu.section}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ViewStudents;
