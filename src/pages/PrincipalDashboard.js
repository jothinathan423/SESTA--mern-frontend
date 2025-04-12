import React from 'react';
import { Container, Typography } from '@mui/material';
import AllStudentDatatable from './principal/StudentTable';

function PrincipalDashboard() {
  return (
    <Container>
      <Typography variant="h4">Principal Dashboard</Typography>
      <AllStudentDatatable></AllStudentDatatable>
    </Container>
  );
}

export default PrincipalDashboard;
