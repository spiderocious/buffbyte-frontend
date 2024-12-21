import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiArrowRight } from 'react-icons/fi';
import LoadingSpinner from '../loading-spinner';

interface AnalyzeButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  className?: string;
}

const AnalyzeButton: React.FC<AnalyzeButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  size = 'md',
  variant = 'primary',
  className = ''
}) => {
  const sizeConfig = {
    sm: {
      padding: 'px-4 py-2',
      text: 'text-sm',
      icon: 'w-4 h-4'
    },
    md: {
      padding: 'px-6 py-3',
      text: 'text-base',
      icon: 'w-5 h-5'
    },
    lg: {
      padding: 'px-8 py-4',
      text: 'text-lg',
      icon: 'w-6 h-6'
    }
  };

  const variantConfig = {
    primary: {
      base: 'bg-gradient-to-r from-blue-500 to-emerald-600 text-white shadow-lg',
      hover: 'hover:from-blue-600 hover:to-emerald-700 hover:shadow-xl',
      disabled: 'from-slate-300 to-slate-400 cursor-not-allowed'
    },
    secondary: {
      base: 'bg-white text-slate-700 border-2 border-slate-200 shadow-sm',
      hover: 'hover:border-slate-300 hover:shadow-md',
      disabled: 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
    }
  };

  const config = sizeConfig[size];
  const variantStyle = variantConfig[variant];
  const isDisabled = disabled || loading;

  return (
    <motion.button
      onClick={onClick}
      disabled={isDisabled}
      whileHover={!isDisabled ? { y: -2, scale: 1.02 } : undefined}
      whileTap={!isDisabled ? { scale: 0.98 } : undefined}
      className={`
        relative flex items-center justify-center space-x-2 rounded-xl font-semibold
        transition-all duration-300 transform overflow-hidden
        ${config.padding} ${config.text}
        ${isDisabled 
          ? variantStyle.disabled 
          : `${variantStyle.base} ${variantStyle.hover}`
        }
        ${className}
      `}
    >
      {/* Background shimmer effect */}
      {!isDisabled && variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ transform: 'translateX(-100%)' }}
          animate={{ transform: ['translateX(-100%)', 'translateX(100%)'] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Content */}
      <div className="relative flex items-center space-x-2">
        {loading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <FiZap className={config.icon} />
        )}
        
        <span>
          {loading ? 'Analyzing...' : 'Analyze Content'}
        </span>
        
        {!loading && (
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FiArrowRight className={config.icon} />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
};

export default AnalyzeButton;