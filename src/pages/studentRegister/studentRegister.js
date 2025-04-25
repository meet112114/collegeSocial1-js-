import React, { useState } from 'react';
import './studentRegister.css';
import { useNavigate } from 'react-router-dom';

const StudentRegister = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    bio: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/user/create/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Student registered successfully!');
        setFormData({
          email: '',
          first_name: '',
          last_name: '',
          username: '',
          password: '',
          bio: ''
        });
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Student Registration</h2>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <textarea
          name="bio"
          placeholder="Write a short bio..."
          value={formData.bio}
          onChange={handleChange}
          rows="3"
        />
        <button type="submit">Register</button>
        <a onClick={()=>{navigate('/')}} className='link-to-login'>Login ?</a>
      </form>
    </div>
  );
};

export default StudentRegister;
