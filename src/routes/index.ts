import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createElement } from 'react';
import { routes } from './routes';
import { ProtectedRoute, SimplePageTransition } from '@buffbyte/components';

// Separate regular routes from the catch-all route
const regularRoutes = routes.filter(route => route.path !== '*');
const notFoundRoute = routes.find(route => route.path === '*');

// Helper function to wrap component with ProtectedRoute if needed
const wrapWithAuth = (route: typeof routes[0]) => {
  const element = createElement(route.component);
  
  if (route.requiresAuth) {
    return createElement(ProtectedRoute, { children: element });
  }
  
  return element;
};

// Create route objects for React Router v6 with nested layout
const routeObjects = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: wrapWithAuth(regularRoutes.find(route => route.path === '/')!),
      },
      // Other regular routes
      ...regularRoutes
        .filter(route => route.path !== '/')
        .map(route => ({
          path: route.path,
          element: wrapWithAuth(route),
        })),
    ]
  },
  // Wrap 404 page with simple transition since it's outside layout
  ...(notFoundRoute ? [{
    path: '*',
    element: createElement(SimplePageTransition, {
      children: createElement(notFoundRoute.component)
    }),
  }] : [])
];

export const router = createBrowserRouter(routeObjects);

export { RouterProvider };

export { routes };