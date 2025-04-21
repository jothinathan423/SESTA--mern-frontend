import React, { useEffect, useState } from 'react';

const StaffTable = () => {
  const [staffs, setStaffs] = useState([]);
  const [filteredStaffs, setFilteredStaffs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/getstaffs');
        const data = await res.json();
        setStaffs(data);
        setFilteredStaffs(data);
      } catch (err) {
        console.error("Failed to fetch staffs", err);
      }
    };
    fetchStaffs();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = staffs.filter((staff) =>
      staff.name.toLowerCase().includes(value) ||
      staff.email.toLowerCase().includes(value) ||
      staff.role.toLowerCase().includes(value)
    );
    setFilteredStaffs(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/admin/deletestaff/${id}`, {
        method: 'DELETE'
      });
      const updatedList = staffs.filter(staff => staff._id !== id);
      setStaffs(updatedList);
      setFilteredStaffs(updatedList);
    } catch (err) {
      console.error("Failed to delete staff", err);
    }
  };

  const handleEdit = (staff) => {
    const newName = prompt("Enter new name", staff.name);
    if (newName && newName !== staff.name) {
      fetch(`http://localhost:5000/api/admin/updatestaff/${staff._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      })
        .then((res) => res.json())
        .then((updatedStaff) => {
          const updatedList = staffs.map((s) =>
            s._id === updatedStaff._id ? updatedStaff : s
          );
          setStaffs(updatedList);
          setFilteredStaffs(updatedList);
        })
        .catch((err) => console.error("Failed to update staff", err));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Staff List</h2>
      <input
        type="text"
        placeholder="Search by name/email/role"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '10px', padding: '8px', width: '300px' }}
      />
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaffs.map((staff) => (
            <tr key={staff._id}>
              <td>{staff.name}</td>
              <td>{staff.email}</td>
              <td>{staff.role}</td>
              <td>
                <button onClick={() => handleEdit(staff)}>Edit</button>{' '}
                <button onClick={() => handleDelete(staff._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;
