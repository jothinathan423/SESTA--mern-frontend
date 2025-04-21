import React, { useEffect, useState } from 'react';

const ManageStaff = ({ selectedStaff }) => {
  const [staff, setStaff] = useState(selectedStaff || {});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setStaff(selectedStaff || {});
    setIsEditing(false);
  }, [selectedStaff]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      await fetch(`http://localhost:5000/api/deletestaff/${staff._id}`, {
        method: 'DELETE',
      });
      alert('Staff deleted!');
      window.location.reload();
    }
  };

  const handleSave = async () => {
    await fetch(`http://localhost:5000/api/updatestaff/${staff._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(staff),
    });
    alert('Updated successfully!');
    setIsEditing(false);
  };

  if (!staff || !staff._id) {
    return <p>Select a staff to view details.</p>;
  }

  return (
    <div>
      <h2>Staff Details</h2>
      {isEditing ? (
        <>
          <input
            placeholder="Name"
            value={staff.name}
            onChange={(e) => setStaff({ ...staff, name: e.target.value })}
          /><br />
          <input
            placeholder="Email"
            value={staff.email}
            onChange={(e) => setStaff({ ...staff, email: e.target.value })}
          /><br />
          <input
            placeholder="Phone"
            value={staff.phoneNumber}
            onChange={(e) => setStaff({ ...staff, phoneNumber: e.target.value })}
          /><br />
          <input
            placeholder="Department"
            value={staff.department}
            onChange={(e) => setStaff({ ...staff, department: e.target.value })}
          /><br />
          <input
            placeholder="Qualification"
            value={staff.qualification}
            onChange={(e) => setStaff({ ...staff, qualification: e.target.value })}
          /><br />
          <input
            placeholder="Gender"
            value={staff.gender}
            onChange={(e) => setStaff({ ...staff, gender: e.target.value })}
          /><br />
          <button onClick={handleSave}>💾 Save</button>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {staff.name}</p>
          <p><strong>Email:</strong> {staff.email}</p>
          <p><strong>Phone:</strong> {staff.phoneNumber}</p>
          <p><strong>Department:</strong> {staff.department}</p>
          <p><strong>Qualification:</strong> {staff.qualification}</p>
          <p><strong>Gender:</strong> {staff.gender}</p>
          <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
          <button onClick={handleDelete} style={{ color: 'red' }}>🗑️ Delete</button>
        </>
      )}
    </div>
  );
};

export default ManageStaff;
