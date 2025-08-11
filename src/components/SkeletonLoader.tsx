import React from 'react';

interface SkeletonLoaderProps {
  variant?: 'page' | 'dashboard' | 'content' | 'card';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ variant = 'page' }) => {
  const shimmer = (
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
  );

  const pageVariant = (
    <div className="min-h-screen bg-slate-50">
      {/* Header skeleton */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative overflow-hidden bg-slate-200 rounded-lg h-8 w-32">
                {shimmer}
              </div>
              <div className="hidden md:flex space-x-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="relative overflow-hidden bg-slate-200 rounded h-4 w-16">
                    {shimmer}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden bg-slate-200 rounded-lg h-9 w-24">
              {shimmer}
            </div>
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Title section */}
          <div className="space-y-4">
            <div className="relative overflow-hidden bg-slate-200 rounded h-8 w-64">
              {shimmer}
            </div>
            <div className="relative overflow-hidden bg-slate-200 rounded h-4 w-96">
              {shimmer}
            </div>
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
                <div className="relative overflow-hidden bg-slate-200 rounded h-4 w-3/4">
                  {shimmer}
                </div>
                <div className="space-y-2">
                  <div className="relative overflow-hidden bg-slate-200 rounded h-3 w-full">
                    {shimmer}
                  </div>
                  <div className="relative overflow-hidden bg-slate-200 rounded h-3 w-2/3">
                    {shimmer}
                  </div>
                </div>
                <div className="relative overflow-hidden bg-slate-200 rounded h-8 w-20">
                  {shimmer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const dashboardVariant = (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="relative overflow-hidden bg-slate-200 rounded-full h-12 w-12">
                  {shimmer}
                </div>
                <div className="ml-4 space-y-2 flex-1">
                  <div className="relative overflow-hidden bg-slate-200 rounded h-4 w-16">
                    {shimmer}
                  </div>
                  <div className="relative overflow-hidden bg-slate-200 rounded h-6 w-20">
                    {shimmer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="relative overflow-hidden bg-slate-200 rounded h-6 w-48 mb-6">
            {shimmer}
          </div>
          <div className="relative overflow-hidden bg-slate-200 rounded h-64 w-full">
            {shimmer}
          </div>
        </div>

        {/* Table skeleton */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <div className="relative overflow-hidden bg-slate-200 rounded h-5 w-32">
              {shimmer}
            </div>
          </div>
          <div className="divide-y">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="px-6 py-4 flex items-center space-x-4">
                <div className="relative overflow-hidden bg-slate-200 rounded-full h-8 w-8">
                  {shimmer}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="relative overflow-hidden bg-slate-200 rounded h-4 w-32">
                    {shimmer}
                  </div>
                  <div className="relative overflow-hidden bg-slate-200 rounded h-3 w-48">
                    {shimmer}
                  </div>
                </div>
                <div className="relative overflow-hidden bg-slate-200 rounded h-6 w-16">
                  {shimmer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const contentVariant = (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="relative overflow-hidden bg-slate-200 rounded h-8 w-3/4">
          {shimmer}
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="relative overflow-hidden bg-slate-200 rounded h-4 w-full">
              {shimmer}
            </div>
          ))}
          <div className="relative overflow-hidden bg-slate-200 rounded h-4 w-2/3">
            {shimmer}
          </div>
        </div>
      </div>
    </div>
  );

  const cardVariant = (
    <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
      <div className="relative overflow-hidden bg-slate-200 rounded h-6 w-3/4">
        {shimmer}
      </div>
      <div className="space-y-2">
        <div className="relative overflow-hidden bg-slate-200 rounded h-4 w-full">
          {shimmer}
        </div>
        <div className="relative overflow-hidden bg-slate-200 rounded h-4 w-5/6">
          {shimmer}
        </div>
      </div>
    </div>
  );

  const variants = {
    page: pageVariant,
    dashboard: dashboardVariant,
    content: contentVariant,
    card: cardVariant,
  };

  return (
    <div className="skeleton-loader">
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .skeleton-loader .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
      {variants[variant]}
    </div>
  );
};

export default SkeletonLoader;
