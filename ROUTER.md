# React Router Setup

This project uses React Router v6 for client-side routing.

## Router Structure

The routing is set up with a clean, organized structure:

### Files
- `src/routes/routes.ts` - Route definitions
- `src/routes/index.ts` - Router configuration and exports
- `src/components/Layout.tsx` - Main layout with navigation
- `src/pages/` - Page components

### Available Routes

- `/` - Home page
- `/about` - About page
- `*` - 404 Not Found (catch-all)

## Usage

### Adding New Routes

1. Create a new page component in `src/pages/`
2. Export it from `src/pages/index.ts`
3. Add route configuration to `src/routes/routes.ts`

Example:
```typescript
// src/pages/ContactPage.tsx
export default function ContactPage() {
  return <div><h1>Contact Us</h1></div>;
}

// Add to src/pages/index.ts
export { default as ContactPage } from './ContactPage';

// Add to src/routes/routes.ts
import { ContactPage } from '@buffbyte/pages';

export const routes: RouteConfig[] = [
  // ... existing routes
  {
    path: '/contact',
    component: ContactPage,
    requiresAuth: false,
    exact: true,
    title: 'Contact - BuffByte'
  }
];
```

### Navigation

Use React Router's `Link` component for navigation:

```typescript
import { Link } from 'react-router-dom';

<Link to="/about">About</Link>
```

### Programmatic Navigation

Use the `useNavigate` hook:

```typescript
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/about');
  };
}
```

## Route Configuration

Each route has the following properties:

- `path` - URL path
- `component` - React component to render
- `requiresAuth` - Whether authentication is required
- `exact` - Whether path should match exactly
- `title` - Page title for SEO

## Layout

The `Layout` component provides:
- Navigation bar
- Common page structure
- Outlet for nested routes
