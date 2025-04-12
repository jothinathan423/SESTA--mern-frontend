import React, { useState } from 'react';
import axios from 'axios';

const AdminRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    phoneNumber: '',
    uniqueId: '',
    qualification: '',
    gender: '', // this will now be set by a dropdown
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/adminregister', formData);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required />
      <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
      <input name="phoneNumber" placeholder="PhoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      <input name="uniqueId" placeholder="UniqueId" value={formData.uniqueId} onChange={handleChange} required />
      <input name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} required />

      {/* ✅ Gender Dropdown */}
      <select name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
};

export default AdminRegisterForm;
