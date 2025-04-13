import React, { useState } from 'react';
import axios from 'axios';


const AddStudentForm = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    username: '',
    password: '',
    role: 'student',
    phonenumber: '',
    department: '',
    id: '',
    batch: '',
    gender: '',
    year: '',
    section: ''
  });

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/student/insert', studentData);
      alert(res.data.message || "Student added!");

      // Resetting form
      setStudentData({
        name: '',
        username: '',
        password: '',
        role: 'student',
        phonenumber: '',
        department: '',
        id: '',
        batch: '',
        gender: '',
        year: '',
        section: ''
      });
    } catch (err) {
      console.error(err);
      alert("Failed to add student");
    }
  };

  return (
    <div className="container">
      <h1>ADD STUDENTS</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={studentData.name} onChange={handleChange} />
        <input name="username" placeholder="Username" value={studentData.username} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={studentData.password} onChange={handleChange} />
        <input name="phonenumber" placeholder="Phone Number" value={studentData.phonenumber} onChange={handleChange} />
        <input name="department" placeholder="Department" value={studentData.department} onChange={handleChange} />
        <input name="id" placeholder="ID" value={studentData.id} onChange={handleChange} />
        <input name="batch" placeholder="Batch" value={studentData.batch} onChange={handleChange} />
        <input name="gender" placeholder="Gender" value={studentData.gender} onChange={handleChange} />
        <input name="year" placeholder="Year" value={studentData.year} onChange={handleChange} />
        <input name="section" placeholder="Section" value={studentData.section} onChange={handleChange} />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentForm;