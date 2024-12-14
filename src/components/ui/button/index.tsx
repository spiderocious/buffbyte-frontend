import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ButtonVariant = 'primary' | 'creator' | 'secondary';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false, 
  variant = 'primary',
  fullWidth = false,
  className = '',
  type = 'button'
}) => {
  const baseClasses = `
    px-4 py-4 font-semibold rounded-lg transition-all duration-200 relative overflow-hidden
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${fullWidth ? 'w-full' : ''}
  `;

  const variants: Record<ButtonVariant, string> = {
    primary: `
      bg-primary-600 text-white border-2 border-primary-600
      hover:bg-primary-700 hover:border-primary-700
      focus:ring-primary-500 shadow-md hover:shadow-lg
      disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed
    `,
    creator: `
      bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-700 text-white border-2 border-transparent
      hover:from-blue-700 hover:via-cyan-700 hover:to-teal-800
      focus:ring-cyan-500 shadow-md hover:shadow-lg
      disabled:bg-gray-400 disabled:cursor-not-allowed
    `,
    secondary: `
      bg-white text-primary-600 border-2 border-primary-600
      hover:bg-primary-50
      focus:ring-primary-500 shadow-sm hover:shadow-md
      disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed
    `
  };

  const LoadingSpinner: React.FC = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex items-center justify-center"
    >
      <motion.svg 
        className="animate-spin -ml-1 mr-3 h-5 w-5" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </motion.svg>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Loading...
      </motion.span>
    </motion.div>
  );


  return (
    <motion.button
      whileHover={{ 
        scale: disabled ? 1 : 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.98,
        transition: { duration: 0.1 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {/* Shimmer effect for creator variant */}
      {variant === 'creator' && !disabled && (
        <motion.div
          className="absolute inset-0 -top-[1px] -bottom-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'linear'
          }}
        />
      )}

      {/* Content with animation */}
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingSpinner key="loading" />
        ) : (
          <motion.span
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='flex items-center justify-center'
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Hover glow effect */}
      {!disabled && (
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-lg opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
};

export default Button;