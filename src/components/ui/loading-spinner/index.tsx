import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text,
  className = '' 
}) => {
  const sizeConfig = {
    sm: {
      spinner: 'w-4 h-4 border-2',
      text: 'text-sm'
    },
    md: {
      spinner: 'w-6 h-6 border-2',
      text: 'text-base'
    },
    lg: {
      spinner: 'w-8 h-8 border-3',
      text: 'text-lg'
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`
          ${config.spinner}
          border-blue-500 border-t-transparent rounded-full
        `}
      />
      {text && (
        <span className={`font-medium text-slate-600 ${config.text}`}>
          {text}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;