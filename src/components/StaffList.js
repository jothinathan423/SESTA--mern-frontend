// StaffList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffList = () => {
    const [staffList, setStaffList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchStaff();
    }, [searchQuery]);

    const fetchStaff = async () => {
        try {
            const response = await axios.get(`/admin/search-staff?name=${searchQuery}`);
            setStaffList(response.data);
        } catch (error) {
            console.error("Error fetching staff data");
        }
    };

    const handleEdit = (id) => {
        // Handle the edit functionality (redirect or modal)
        console.log("Editing staff with ID:", id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/admin/delete-staff/${id}`);
            fetchStaff(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting staff");
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search by name..." 
                className="border p-2 rounded mb-4"
            />
            <table className="table-auto w-full border-collapse border">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Department</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {staffList.map(staff => (
                        <tr key={staff._id}>
                            <td className="border p-2">{staff.name}</td>
                            <td className="border p-2">{staff.role}</td>
                            <td className="border p-2">{staff.department}</td>
                            <td className="border p-2">
                                <button onClick={() => handleEdit(staff._id)} className="bg-blue-500 text-white p-1 rounded mr-2">Edit</button>
                                <button onClick={() => handleDelete(staff._id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StaffList;
