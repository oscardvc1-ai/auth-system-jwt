import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getProfile } from '../services/authService';

export default function Dashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const user = JSON.parse(
      localStorage.getItem('user')
    );

    if (!user) {
      navigate('/');
      return;
    }

    const data = await getProfile(user.token);

    if (data.message) {
      localStorage.removeItem('user');
      setMessage('Session expired. Please login again.');
      setLoading(false);

      setTimeout(() => {
        navigate('/');
      }, 1500);

      return;
    }

    setProfile(data);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="dashboard-card">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (message) {
    return (
      <div className="dashboard-card">
        <h1>Session Error</h1>

        <p className="error-message">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <h1>Dashboard</h1>

      <p>
        Welcome, <strong>{profile.name}</strong>
      </p>

      <p>
        Email: {profile.email}
      </p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}