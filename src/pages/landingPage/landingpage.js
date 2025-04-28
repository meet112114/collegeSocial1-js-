// src/components/LandingPage.js
import React, { useState  , useContext} from 'react';
import './landingpage.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../App";

const LandingPage = () => {
  const { state, dispatch } = useContext(UserContext);

  const [role, setRole] = useState('student');
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/user/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      console.log(data.message)

      
    if (!response.ok || data.success === false) {
      throw new Error(data.message || 'Login failed');
    }

      
      const token = data.message;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      

      if (role === 'teacher') {
        switch (token) {
          case '67298da80d6dfcc25fd3e18367b6421cac9d8729':
            dispatch({ type: "TEACHER_LOGIN", payload: true });
            navigate('/bca');
            break;
          case 'cf7fb0130d71c67d5d10ce32fc16a6b6d5b05a7c':
            dispatch({ type: "TEACHER_LOGIN", payload: true });
            navigate('/bms');
            break;
          case '5e4ed5f84298203339f0bad2238348b81127d4ec':
            dispatch({ type: "TEACHER_LOGIN", payload: true });
            navigate('/bsc');
            break;
          case '03c74060fcbb3248f8eb9b049b7312e0c31b4e93':
            dispatch({ type: "TEACHER_LOGIN", payload: true });
            navigate('/bbi');
            break;
          case '7f60d6c23cb4a195e1679bf4a880e7b4c2fd8d71':
            dispatch({ type: "TEACHER_LOGIN", payload: true });
            navigate('/baf');
          case 'a3a3aff90439be49b9a54103a39eb6f2de631a9d':
            dispatch({ type: "ADMIN_LOGIN", payload: true });
            navigate('/admin');

            break;
          default:
            dispatch({ type: "STUDENT_LOGIN", payload: true });
            navigate('/');
        }
      } else {
        dispatch({ type: "STUDENT_LOGIN", payload: true });
        navigate('/posts');
      }
    } catch (err) {
      alert('Login failed. Please check credentials.');
      console.error(err);
    }
  };

  return (
    <div className="landing-container">
      <div className="login-box">
        <div className="role-toggle">
          <button
            className={role === 'student' ? 'active' : ''}
            onClick={() => setRole('student')}
          >
            Student Login
          </button>
          <button
            className={role === 'teacher' ? 'active' : ''}
            onClick={() => setRole('teacher')}
          >
            Teacher Login
          </button>
        </div>

        <div className="login-form">
          <h2>{role === 'teacher' ? 'Teacher' : 'Student'} Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button onClick={handleLogin}>Login</button>
          <a className='link-to-reg' onClick={()=>{navigate('/register')}}>Register ?</a>
        </div>
    
      </div>
    </div>
  );
};

export default LandingPage;
