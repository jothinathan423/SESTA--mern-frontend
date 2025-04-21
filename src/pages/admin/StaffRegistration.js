import React, { useState } from 'react';

const StaffRegistration = () => {
  const [staffs, setStaffs] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const handleViewStaffs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/getstaffs');
      const data = await res.json();
      setStaffs(data);
      setShowTable(true);
    } catch (err) {
      console.error("Failed to fetch staffs", err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Manage Staff</h1>
      <button onClick={handleViewStaffs}>View Registered Staffs</button>

      {showTable && staffs.length > 0 && (
        <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map(staff => (
              <tr key={staff._id}>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>{staff.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showTable && staffs.length === 0 && (
        <p>No staff found in database.</p>
      )}
    </div>
  );
};

export default StaffRegistration;
