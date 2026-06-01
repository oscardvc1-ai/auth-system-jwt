import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { registerUser } from '../services/authService';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setMessage('Please fill in all fields');
    return;
    }
    
    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    const data = await registerUser(formData);

    if (data.token) {
      localStorage.setItem(
        'user',
        JSON.stringify(data)
      );

      navigate('/dashboard');
    } else {
      setMessage(
        data.message || 'Registration failed'
      );
    }
  };

  return (
    <div className="auth-card">
      <h1>Create Account</h1>

      <p>
        Register a new account to access the dashboard.
      </p>

      {message && (
        <p className="error-message">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}