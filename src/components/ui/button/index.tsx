import { motion } from 'framer-motion';
import React from 'react';

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
    px-4 py-4 font-semibold rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${fullWidth ? 'w-full' : ''}
  `;

  const variants: Record<ButtonVariant, string> = {
    primary: `
      bg-primary-600 text-white border-2 border-primary-600
      hover:bg-primary-700 hover:border-primary-700 hover:scale-[1.02]
      focus:ring-primary-500 shadow-md hover:shadow-lg
      disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100
    `,
    creator: `
      bg-creator-gradient text-white border-2 border-transparent
      hover:scale-[1.02] hover:shadow-lg
      focus:ring-primary-500 shadow-md
      disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100
    `,
    secondary: `
      bg-white text-primary-600 border-2 border-primary-600
      hover:bg-primary-50 hover:scale-[1.02]
      focus:ring-primary-500 shadow-sm hover:shadow-md
      disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed disabled:hover:scale-100
    `
  };

  const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center">
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Loading...
    </div>
  );

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {loading ? <LoadingSpinner /> : children}
    </motion.button>
  );
};

export default Button;