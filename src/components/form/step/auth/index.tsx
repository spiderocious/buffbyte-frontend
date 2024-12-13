import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  showMobilePreview?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children,  
}) => {
  const MobileIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 to-white">
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            {children}
          </div>
        </div>
        
        {/* Right side - Preview */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-700"
          />
          <div className="relative z-10 h-full flex items-center justify-center p-8">
            <div className="text-center text-white max-w-md">
              <div className="mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <MobileIcon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4">
                Join thousands of creators optimizing their content with AI
              </h2>
              <p className="text-lg opacity-90">
                Get instant insights and maximize your engagement across all platforms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;