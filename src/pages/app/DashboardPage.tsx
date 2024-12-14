import { AuthService } from '@buffbyte/services';
import { bufliteToasts, showToast } from '@buffbyte/utils';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = AuthService.getUser();

  const handleLogout = () => {
    AuthService.clearAuth();
    bufliteToasts.auth.logoutSuccess();
    navigate('/login', { replace: true });
  };

  // Demo functions for testing toasts
  const demoAnalysis = () => {
    const toastId = bufliteToasts.analysis.started();
    
    // Simulate analysis process
    setTimeout(() => {
      showToast.update(toastId, 'Analysis complete! Score: 87%', 'success');
    }, 2000);
  };

  const demoPromiseToast = () => {
    const mockApiCall = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('Data saved successfully!');
        } else {
          reject('Network error');
        }
      }, 2000);
    });

    showToast.promise(mockApiCall, {
      loading: 'Saving your content...',
      success: 'Content saved to BUFLITE!',
      error: 'Failed to save content',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">BUFLITE Dashboard</h1>
          <button
            onClick={handleLogout}
            className="btn-secondary"
          >
            Logout
          </button>
        </div>

        {/* User Info Card */}
        {user && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Welcome, {user.firstName} {user.lastName}! 👋
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Email:</span>
                <span className="ml-2 text-gray-900">{user.email}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Role:</span>
                <span className="ml-2 text-gray-900">{user.role}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${user.isActive ? 'bg-success-100 text-success-800' : 'bg-error-100 text-error-800'}`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Email Verified:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${user.isEmailVerified ? 'bg-success-100 text-success-800' : 'bg-warning-100 text-warning-800'}`}>
                  {user.isEmailVerified ? 'Verified' : 'Pending'}
                </span>
              </div>
              {user.lastLoginAt && (
                <div className="md:col-span-2">
                  <span className="font-medium text-gray-600">Last Login:</span>
                  <span className="ml-2 text-gray-900">{new Date(user.lastLoginAt).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Toast Demo Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🍞 Toast Notifications Demo</h3>
          <p className="text-gray-600 mb-6">Try out the beautiful toast notifications:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => showToast.success('This is a success message!')}
              className="btn-primary"
            >
              Success Toast
            </button>
            
            <button
              onClick={() => showToast.error('This is an error message!')}
              className="bg-error-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-error-600 transition-colors"
            >
              Error Toast
            </button>
            
            <button
              onClick={demoAnalysis}
              className="btn-creator"
            >
              Analysis Demo
            </button>
            
            <button
              onClick={demoPromiseToast}
              className="bg-warning-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-warning-600 transition-colors"
            >
              Promise Demo
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => bufliteToasts.script.saved()}
              className="btn-secondary"
            >
              Script Saved
            </button>
            
            <button
              onClick={() => bufliteToasts.data.networkError()}
              className="btn-secondary"
            >
              Network Error
            </button>
          </div>
        </div>

        {/* Protected Content */}
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-primary-900 mb-3">🔒 Protected Content</h3>
          <p className="text-primary-700 mb-2">This page is only accessible to authenticated users.</p>
          <p className="text-primary-600">If you can see this, the auth guarding is working correctly!</p>
        </div>
      </div>
    </div>
  );
}
