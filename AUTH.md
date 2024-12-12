# Authentication System

This project implements a complete authentication system using session storage and React Router for route protection.

## Features

- ✅ **Session Storage Auth** - Token and user data stored in session storage
- ✅ **Route Protection** - Automatic protection for routes marked with `requiresAuth: true`
- ✅ **Login/Signup Forms** - Complete forms with error handling
- ✅ **Auto-redirect** - Unauthenticated users redirected to login
- ✅ **Token Management** - Automatic token inclusion in API requests
- ✅ **Logout Functionality** - Clear session storage and redirect

## Backend Integration

The auth system expects the following API responses:

### Login Response (`POST /api/auth/login`)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "688bfa857cef9cb138f78981",
      "firstName": "feranmi",
      "lastName": "feranmi", 
      "email": "user@example.com",
      "role": "user",
      "isActive": true,
      "isEmailVerified": false,
      "lastLoginAt": "2025-08-02T14:23:57.780Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2025-08-02T14:23:57.831Z"
}
```

### Signup Response (`POST /api/auth/signup`)
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Registration successful. Please check your email for verification link.",
  "data": {
    "user": {
      "id": "688f6dcd192a5efc477dd4b4",
      "firstName": "feranmi",
      "lastName": "feranmi",
      "email": "user@example.com",
      "role": "user",
      "isActive": true,
      "isEmailVerified": false,
      "createdAt": "2025-08-03T14:10:21.056Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2025-08-03T14:10:21.351Z"
}
```

## Usage

### Protecting Routes

Mark routes as protected in `src/routes/routes.ts`:

```typescript
{
  path: '/dashboard',
  component: DashboardPage,
  requiresAuth: true, // This route requires authentication
  exact: true,
  title: 'Dashboard - BuffByte'
}
```

### Using Auth Service

```typescript
import { AuthService } from '@buffbyte/services';

// Check if user is authenticated
const isLoggedIn = AuthService.isAuthenticated();

// Get current user
const user = AuthService.getUser();

// Get auth token
const token = AuthService.getToken();

// Logout user
AuthService.clearAuth();
```

### Making API Requests

```typescript
import { ApiService } from '@buffbyte/services';

// Authenticated GET request
const data = await ApiService.get('/user/profile');

// Authenticated POST request
const result = await ApiService.post('/user/update', { name: 'New Name' });

// The token is automatically included in all requests
```

## Components

### ProtectedRoute
Wraps components that require authentication:

```typescript
import { ProtectedRoute } from '@buffbyte/components';

<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

### Layout  
Shows different navigation based on auth status:
- **Logged in**: Shows user name, dashboard link, logout button
- **Logged out**: Shows login/signup links

## Session Storage Keys

- `buffbyte_auth_token` - JWT token
- `buffbyte_auth_user` - User object (JSON)

## Route Structure

- `/` - Public home page
- `/about` - Public about page  
- `/login` - Login form
- `/signup` - Signup form
- `/dashboard` - **Protected** - User dashboard
- `/*` - 404 page

## Error Handling

- **401 Unauthorized**: Automatically clears session and redirects to login
- **Network errors**: Shows error messages on forms
- **Invalid responses**: Handles malformed API responses

## Environment Variables

Set your API base URL:

```env
VITE_API_BASE_URL=https://your-api.com/api
```

If not set, defaults to `/api` for relative requests.
