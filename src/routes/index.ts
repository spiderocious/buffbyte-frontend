import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createElement, Suspense } from 'react';
import { routes } from './routes';
import { ProtectedRoute, ErrorBoundary } from '@buffbyte/components';
import LoadingSpinner from '../components/LoadingSpinner';

// Separate regular routes from the catch-all route
const regularRoutes = routes.filter(route => route.path !== '*');
const notFoundRoute = routes.find(route => route.path === '*');

// Helper function to wrap component with ErrorBoundary, Suspense, and ProtectedRoute if needed
const wrapComponent = (route: typeof routes[0]) => {
  const LazyComponent = route.component;
  
  let wrappedElement: React.ReactElement = createElement(Suspense, {
    fallback: createElement(LoadingSpinner),
    children: createElement(LazyComponent)
  });
  
  if (route.requiresAuth) {
    wrappedElement = createElement(ProtectedRoute, { 
      children: wrappedElement 
    });
  }
  
  // Wrap everything with ErrorBoundary
  return createElement(ErrorBoundary, {
    children: wrappedElement
  });
};

// Create route objects for React Router v6 with nested layout
const routeObjects = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: wrapComponent(regularRoutes.find(route => route.path === '/')!),
      },
      // Other regular routes
      ...regularRoutes
        .filter(route => route.path !== '/')
        .map(route => ({
          path: route.path,
          element: wrapComponent(route),
        })),
    ]
  },
  // 404 page with ErrorBoundary and Suspense
  ...(notFoundRoute ? [{
    path: '*',
    element: wrapComponent(notFoundRoute),
  }] : [])
];

export const router = createBrowserRouter(routeObjects);

export { RouterProvider };

export { routes };