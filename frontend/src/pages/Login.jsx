import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
    if (!formData.email || !formData.password) {
      setMessage('Please fill in all fields');
      return;
    }

    const data = await loginUser(formData);

    if (data.token) {
      localStorage.setItem(
        'user',
        JSON.stringify(data)
      );

      navigate('/dashboard');
    } else {
      setMessage(
        data.message || 'Login failed'
      );
    }
  };

  return (
    <div className="auth-card">
      <h1>Login</h1>

      <p>
        Access your account using your credentials.
      </p>

      {message && (
        <p className="error-message">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
    </div>
  );
}