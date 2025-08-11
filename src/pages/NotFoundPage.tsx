import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/button';

const NotFoundPage = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className={`absolute animate-pulse ${
        i % 2 === 0 ? 'animate-bounce' : 'animate-pulse'
      }`}
      style={{
        left: `${10 + (i * 15)}%`,
        top: `${20 + (i * 10)}%`,
        animationDelay: `${i * 0.5}s`,
        animationDuration: `${2 + i}s`,
      }}
    >
      <div className="w-2 h-2 bg-blue-400/30 rounded-full blur-sm" />
    </div>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        {floatingElements}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* 404 Number with glitch effect */}
          <div className="relative mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-blue-400/20 animate-ping">
              404
            </div>
          </div>

          {/* Main message */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-lg mx-auto leading-relaxed">
              The page you're looking for seems to have vanished into the digital void. 
              Don't worry, it happens to the best of us!
            </p>
          </div>

          {/* Interactive elements */}
          <div className="space-y-8">
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/">
                <Button
                  variant="primary"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 px-8 py-4 text-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Take Me Home
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="group px-6 py-3 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-400 rounded-lg transition-all duration-300 hover:bg-slate-800/50"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Go Back
                </span>
              </button>
            </div>

            {/* Auto redirect countdown */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 text-slate-300">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span>
                  Redirecting to home in <span className="text-blue-400 font-bold">{countdown}</span> seconds
                </span>
              </div>
              <button
                onClick={() => setCountdown(0)}
                className="mt-3 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Skip waiting
              </button>
            </div>
          </div>

          {/* Fun suggestions */}
          <div className="mt-16 text-slate-400">
            <p className="text-sm mb-4">While you're here, you might want to:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/about" className="hover:text-blue-400 transition-colors border-b border-transparent hover:border-blue-400">
                Learn about BuffByte
              </Link>
              <Link to="/auth/login" className="hover:text-blue-400 transition-colors border-b border-transparent hover:border-blue-400">
                Sign in to your account
              </Link>
              <Link to="/auth/signup" className="hover:text-blue-400 transition-colors border-b border-transparent hover:border-blue-400">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24 text-slate-800/50" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,58.7C672,64,768,96,864,96C960,96,1056,64,1152,53.3L1200,48L1200,120L1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>
    </div>
  );
};

export default NotFoundPage;
