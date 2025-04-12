import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const columns = [
    { field: 'id', headerName: 'Student ID', width: 130 },
    { field: 'department', headerName: 'Department', width: 120 },
    { field: 'batch', headerName: 'Batch', width: 130 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'year', headerName: 'Year', width: 90 },
    { field: 'section', headerName: 'Section', width: 100 },
    { field: 'phonenumber', headerName: 'Phone Number', width: 150 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function AllStudentDatatable() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/getallstudents');
                const formattedData = response.data.map((student, index) => ({
                    id: student.id || `ID${index + 1}`,
                    department: student.department,
                    batch: student.batch,
                    gender: student.gender,
                    year: student.year,
                    section: student.section,
                    phonenumber: student.phonenumber,
                }));
                setRows(formattedData);
            } catch (error) {
                console.error('Error fetching student data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
