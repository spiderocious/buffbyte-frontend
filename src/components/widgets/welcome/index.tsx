import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountrySelector from '@buffbyte/components/ui/country-selector';
import BuffByteLogo from '@buffbyte/components/ui/logo';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

interface QuickStats {
  totalAnalyses: number;
  avgEngagement: number;
  topPlatform: string;
  streakDays: number;
}

interface WelcomeHeroProps {
  user: User;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  quickStats?: QuickStats;
  loading?: boolean;
  className?: string;
}

const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  user,
  selectedCountry,
  onCountryChange,
  quickStats,
  loading = false,
  className = ''
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [displayedName, setDisplayedName] = useState('');
  const [nameIndex, setNameIndex] = useState(0);

  // Update time every minute for greeting
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Typewriter effect for name
  useEffect(() => {
    if (nameIndex < user.firstName.length) {
      const timer = setTimeout(() => {
        setDisplayedName(user.firstName.slice(0, nameIndex + 1));
        setNameIndex(nameIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [nameIndex, user.firstName]);

  // Get time-based greeting
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: 'Good morning', emoji: '🌅' };
    if (hour < 17) return { text: 'Good afternoon', emoji: '☀️' };
    return { text: 'Good evening', emoji: '🌙' };
  };

  const greeting = getGreeting();

  // Format quick stats
  const formatNumber = (num: number): string => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  const statVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-3, 3, -3],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={`
        relative bg-gradient-to-br from-white via-primary-50/30 to-white
        border border-primary-100 rounded-2xl shadow-sm overflow-hidden
        ${className}
      `}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-8 right-8 text-6xl opacity-20"
        >
          {greeting.emoji}
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-8 left-8 text-4xl opacity-10"
        >
          📊
        </motion.div>
      </div>

      <div className="relative z-10 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Left: Welcome Message */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            <div className="space-y-2">
              <motion.div 
                className="flex items-center space-x-2"
                variants={itemVariants}
              >
                <span className="text-2xl">{greeting.emoji}</span>
                <span className="text-lg text-gray-600 font-medium">
                  {greeting.text}
                </span>
              </motion.div>
              
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Welcome back,{' '}
                  <motion.span 
                    className="text-primary-600"
                    variants={pulseVariants}
                    animate="animate"
                  >
                    {displayedName}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-primary-400"
                    >
                      |
                    </motion.span>
                  </motion.span>
                </h1>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1, duration: 0.5, ease: "easeOut" as const }}
                >
                  👋
                </motion.div>
              </div>
            </div>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Ready to optimize your content and maximize engagement? 
              Let's see what's trending in your selected region.
            </motion.p>

            {/* Quick Stats */}
            {quickStats && !loading && (
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4"
              >
                <motion.div 
                  variants={statVariants}
                  className="bg-white/60 backdrop-blur-sm rounded-lg p-3 text-center border border-primary-100"
                >
                  <div className="text-2xl font-bold text-primary-600">
                    {formatNumber(quickStats.totalAnalyses)}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Total Analyses
                  </div>
                </motion.div>

                <motion.div 
                  variants={statVariants}
                  className="bg-white/60 backdrop-blur-sm rounded-lg p-3 text-center border border-success-100"
                >
                  <div className="text-2xl font-bold text-success-600">
                    {Math.round(quickStats.avgEngagement * 100)}%
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Avg Engagement
                  </div>
                </motion.div>

                <motion.div 
                  variants={statVariants}
                  className="bg-white/60 backdrop-blur-sm rounded-lg p-3 text-center border border-warning-100"
                >
                  <div className="text-2xl font-bold text-warning-600 capitalize">
                    {quickStats.topPlatform}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Top Platform
                  </div>
                </motion.div>

                <motion.div 
                  variants={statVariants}
                  className="bg-white/60 backdrop-blur-sm rounded-lg p-3 text-center border border-error-100"
                >
                  <div className="text-2xl font-bold text-error-600">
                    {quickStats.streakDays}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    Day Streak 🔥
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Loading skeleton for stats */}
            {loading && (
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4"
              >
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i}
                    className="bg-white/60 backdrop-blur-sm rounded-lg p-3 text-center border border-gray-200 animate-pulse"
                  >
                    <div className="h-8 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right: Country Selector */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-end">
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" as const }}
              >
                <BuffByteLogo size="lg" animated />
              </motion.div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Trending Insights
                </h3>
                <p className="text-sm text-gray-600">
                  Select your target market
                </p>
                <CountrySelector
                  selectedCountry={selectedCountry}
                  onCountryChange={onCountryChange}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-success-500/5 pointer-events-none" />
      
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-primary-200 opacity-50"
        animate={{
          borderColor: ['rgba(2, 132, 199, 0.2)', 'rgba(34, 197, 94, 0.2)', 'rgba(2, 132, 199, 0.2)']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut" as const
        }}
      />
    </motion.div>
  );
};

export default WelcomeHero;