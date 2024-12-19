import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiMapPin, FiChevronDown, FiGlobe } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import CountrySelector from '@buffbyte/components/ui/country-selector';
import BuffByteLogo from '@buffbyte/components/ui/logo';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

interface WelcomeHeroProps {
  user: User;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  loading?: boolean;
  className?: string;
}

const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  user,
  selectedCountry,
  onCountryChange,
  loading = false,
  className = ''
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate={mounted ? "animate" : "initial"}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Main Container */}
      <div className="bg-white border overflow-hidden border-slate-200/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm">
        {/* Header Section */}
        <div className="relative px-8 pt-8 pb-6">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-emerald-50/30 rounded-3xl" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-100/20 to-transparent rounded-full blur-2xl" />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Top Bar with Logo and Country Selector */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-between mb-8"
            >
              <div className="flex items-center space-x-2">
                <BuffByteLogo size="sm" />
                <div className="hidden sm:block w-px h-6 bg-slate-200" />
                <div className="hidden sm:flex items-center space-x-2 text-slate-600">
                  <HiSparkles className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Content Intelligence</span>
                </div>
              </div>
              
              {/* Country Selector - Positioned in top right */}
              <div className="relative">
                  <CountrySelector
                    selectedCountry={selectedCountry}
                    onCountryChange={onCountryChange}
                    className="border-none bg-transparent text-sm font-medium"
                  />
              </div>
            </motion.div>

            {/* Main Welcome Content */}
            <div className="max-w-2xl">
              <motion.div variants={itemVariants} className="space-y-4">
                {/* Greeting */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">{getGreeting()}</span>
                  </div>
                </div>

                {/* Main Heading */}
                <div className="space-y-2">
                  <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight">
                    Welcome back,{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                      {user.firstName}
                    </span>
                  </h1>
                  
                  {/* Subtitle */}
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light">
                    Ready to create content that resonates with your audience? 
                    Take a peek at what's trending in <b>{selectedCountry?.toUpperCase()}</b>.
                  </p>
                </div>

                {/* CTA Section */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4"
                >
                  
                  <div className="flex items-center space-x-2 text-slate-500 text-sm">
                    <FiMapPin className="w-4 h-4" />
                    <span>Showing trends for <b className='text-blue-500'>{selectedCountry}</b> today</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500" />
      </div>

      {/* Mobile-Optimized Country Selector Overlay */}
      {/* <div className="sm:hidden fixed bottom-4 left-4 right-4 z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FiGlobe className="w-5 h-5 text-slate-600" />
              <span className="font-medium text-slate-700">Market</span>
            </div>
            <CountrySelector
              selectedCountry={selectedCountry}
              onCountryChange={onCountryChange}
              className="bg-slate-50 border-slate-200 rounded-lg"
            />
          </div>
        </motion.div>
      </div> */}
    </motion.div>
  );
};

export default WelcomeHero;