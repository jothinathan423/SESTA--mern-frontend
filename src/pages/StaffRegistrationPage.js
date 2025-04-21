import React, { useEffect, useState } from 'react';

const StaffRegistrationPage = () => {
  const [staffs, setStaffs] = useState([]);
  const [filteredStaffs, setFilteredStaffs] = useState([]);
  const [search, setSearch] = useState('');
  const [editStaff, setEditStaff] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/getstaffs');
      const data = await res.json();
      setStaffs(data);
      setFilteredStaffs(data);
    } catch (err) {
      console.error("Failed to fetch staffs", err);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = staffs.filter(staff =>
      staff.name?.toLowerCase().includes(value) ||
      staff.email?.toLowerCase().includes(value) ||
      staff.role?.toLowerCase().includes(value)
    );
    setFilteredStaffs(filtered);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/deletestaff/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const updatedList = staffs.filter(staff => staff._id !== id);
        setStaffs(updatedList);
        setFilteredStaffs(updatedList);
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (staff) => {
    setEditStaff(staff);
    setEditForm({ name: staff.name, email: staff.email, role: staff.role });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/updatestaff/${editStaff._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        const updatedList = staffs.map(s =>
          s._id === editStaff._id ? { ...s, ...editForm } : s
        );
        setStaffs(updatedList);
        setFilteredStaffs(updatedList);
        setEditStaff(null); // Close form
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Staff Management</h2>
      <input
        type="text"
        placeholder="Search by name, email, or role"
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: '10px', padding: '5px', width: '50%' }}
      />
      <table border="1" cellPadding="10" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaffs.map(staff => (
            <tr key={staff._id}>
              <td>{staff.name}</td>
              <td>{staff.email}</td>
              <td>{staff.role}</td>
              <td>
                <button onClick={() => handleEdit(staff)} style={{ marginRight: '10px' }}>Edit</button>
                <button onClick={() => handleDelete(staff._id)} style={{ background: 'red', color: 'white' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      {editStaff && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid gray' }}>
          <h3>Edit Staff</h3>
          <input
            name="name"
            value={editForm.name}
            onChange={handleEditChange}
            placeholder="Name"
            style={{ margin: '5px' }}
          />
          <input
            name="email"
            value={editForm.email}
            onChange={handleEditChange}
            placeholder="Email"
            style={{ margin: '5px' }}
          />
          <input
            name="role"
            value={editForm.role}
            onChange={handleEditChange}
            placeholder="Role"
            style={{ margin: '5px' }}
          />
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleUpdate} style={{ marginRight: '10px' }}>Update</button>
            <button onClick={() => setEditStaff(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffRegistrationPage;
