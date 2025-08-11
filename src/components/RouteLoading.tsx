import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import SkeletonLoader from './SkeletonLoader';

interface RouteLoadingProps {
  route?: string;
}

const RouteLoading: React.FC<RouteLoadingProps> = ({ route }) => {
  // Determine loading type based on route
  const getLoadingComponent = () => {
    if (!route) return <LoadingSpinner />;

    // Dashboard pages get skeleton loaders for better UX
    if (route.includes('/app/dashboard')) {
      return <SkeletonLoader variant="dashboard" />;
    }

    // Content pages get content skeleton
    if (route.includes('/app/content-analysis') || route.includes('/app/script-analysis')) {
      return <SkeletonLoader variant="content" />;
    }

    // Auth pages get minimal spinner
    if (route.includes('/auth/')) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <LoadingSpinner variant="inline" message="Preparing authentication..." />
        </div>
      );
    }

    // Landing pages get page skeleton
    if (route === '/' || route.includes('/about')) {
      return <SkeletonLoader variant="page" />;
    }

    // Default to enhanced spinner
    return <LoadingSpinner />;
  };

  return getLoadingComponent();
};

export default RouteLoading;
