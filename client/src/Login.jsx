import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import Navbar from './Navbar';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:3001/login', { username, password });
      console.log(result); // Log the result object for debugging

      if (result.data.message === "Success") {
        const token = result.data.token;
        if (token) {
          localStorage.setItem('authToken', token);
          navigate('/home'); // Navigate to home after successful login
        }
      } else {
        alert(result.data.message || 'Login failed');
      }
    } catch (err) {
      console.log(err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <div className="signup-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username">
                <strong>Username</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                autoComplete="off"
                name="username"
                className="form-control rounded-0"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Login
            </button>
          </form>
          <p className="mt-3">Don't Have an Account?</p>
          <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Register
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
