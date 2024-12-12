import { useNavigate } from 'react-router-dom';
import { AuthService } from '@buffbyte/services';

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = AuthService.getUser();

  const handleLogout = () => {
    AuthService.clearAuth();
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
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

      {user && (
        <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>
          <h2>Welcome, {user.firstName} {user.lastName}!</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Status:</strong> {user.isActive ? 'Active' : 'Inactive'}</p>
          <p><strong>Email Verified:</strong> {user.isEmailVerified ? 'Yes' : 'No'}</p>
          {user.lastLoginAt && (
            <p><strong>Last Login:</strong> {new Date(user.lastLoginAt).toLocaleString()}</p>
          )}
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <h3>Protected Content</h3>
        <p>This page is only accessible to authenticated users.</p>
        <p>If you can see this, the auth guarding is working correctly!</p>
      </div>
    </div>
  );
}
