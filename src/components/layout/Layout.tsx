import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthService } from '@buffbyte/services';

export default function Layout() {
  const navigate = useNavigate();
  const isAuthenticated = AuthService.isAuthenticated();
  const user = AuthService.getUser();

  const handleLogout = () => {
    AuthService.clearAuth();
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <nav style={{ 
        padding: '1rem', 
        borderBottom: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
          <Link to="/about" style={{ marginRight: '1rem' }}>About</Link>
          {isAuthenticated && (
            <Link to="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
          )}
        </div>
        
        <div>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span>Welcome, {user?.firstName}!</span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </div>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
