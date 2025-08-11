import React, { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
  message?: string;
  showProgress?: boolean;
  variant?: 'fullscreen' | 'inline' | 'minimal';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading amazing content...", 
  showProgress = true,
  variant = 'fullscreen'
}) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(message);

  useEffect(() => {
    if (!showProgress) return;

    const loadingMessages = [
      "Preparing your experience...",
      "Loading amazing content...",
      "Almost ready...",
      "Just a moment more...",
    ];

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 100);

    const messageInterval = setInterval(() => {
      setLoadingText(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [showProgress]);

  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="relative mb-4">
            <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
            <div className="absolute inset-0 w-12 h-12 border-3 border-transparent border-r-purple-400 rounded-full animate-spin mx-auto" 
                 style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
          <p className="text-slate-600 font-medium">{loadingText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '1s' }} />
        
        {/* Floating particles */}
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${10 + (i * 10)}%`,
              top: `${20 + (i * 8)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + i}s`,
            }}
          >
            <div className="w-1.5 h-1.5 bg-blue-300/40 rounded-full" />
          </div>
        ))}
      </div>

      <div className="text-center relative z-10 max-w-md mx-auto px-6">
        {/* Main loading animation */}
        <div className="relative mb-8">
          {/* Outer ring */}
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin mx-auto" />
          {/* Inner ring */}
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-600 rounded-full animate-spin mx-auto" />
          {/* Counter-rotating ring */}
          <div className="absolute inset-2 w-16 h-16 border-4 border-transparent border-r-purple-500 rounded-full animate-spin mx-auto" 
               style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          
          {/* Center pulse */}
          <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
          </div>
        </div>
        
        {/* Loading text with typewriter effect */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            BuffByte
          </h2>
          <p className="text-slate-600 text-lg font-medium min-h-[28px] transition-all duration-300">
            {loadingText}
          </p>
          
          {/* Progress bar */}
          {showProgress && (
            <div className="space-y-2">
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(progress, 90)}%` }}
                />
              </div>
              <p className="text-sm text-slate-500">
                {Math.round(Math.min(progress, 90))}% loaded
              </p>
            </div>
          )}
        </div>
        
        {/* Animated dots */}
        <div className="flex justify-center mt-6 space-x-1">
          {[0, 1, 2].map(i => (
            <div 
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" 
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-5px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
