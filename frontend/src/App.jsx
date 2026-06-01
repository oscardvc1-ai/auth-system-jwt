import {
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import ProtectedRoute from './guards/ProtectedRoute';

function App() {
  return (
    <main className="app">
      <nav className="navbar">
        <h2>Auth System</h2>

        <div>
          <Link to="/">Login</Link>

          <Link to="/register">
            Register
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}

export default App;