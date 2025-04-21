import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ onStaffSelect }) => {
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/getstaffs');
        const data = await res.json();
        setStaffs(data);
      } catch (err) {
        console.error("Failed to fetch staffs", err);
      }
    };
    fetchStaffs();
  }, []);

  return (
    <div style={{
      width: '250px',
      backgroundColor: '#0a1929',
      color: 'white',
      padding: '20px',
      overflowY: 'auto',
      height: '100vh',
      boxSizing: 'border-box'
    }}>
      <h3 style={{ color: 'white' }}>☰ Staff List</h3>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {staffs.map(staff => (
          <li
            key={staff._id}
            style={{
              padding: '8px',
              cursor: 'pointer',
              borderBottom: '1px solid #1e3a5f'
            }}
            onClick={() => onStaffSelect(staff)}
          >
            {staff.name}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '30px' }}>
        <Link
          to="/staff-registration"
          style={{
            display: 'inline-block',
            padding: '10px 15px',
            backgroundColor: '#1e88e5',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}
        >
          ➕ Manage Staff
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
