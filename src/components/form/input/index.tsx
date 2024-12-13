import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FormInputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'tel';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
  disabled?: boolean;
  autoComplete?: string;
}

const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false,
  showPasswordToggle = false,
  className = '',
  disabled = false,
  autoComplete
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const EyeOffIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
    </svg>
  );

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-lg font-medium text-gray-900">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`
            w-full px-4 py-4 text-base leading-relaxed text-gray-900
            bg-white border-2 rounded-lg transition-all duration-200
            placeholder-gray-400
            ${isFocused ? 'border-primary-600 shadow-md' : 'border-gray-200'}
            ${error ? 'border-error-500' : ''}
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}
            focus:outline-none focus:ring-0
          `}
        />
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors disabled:cursor-not-allowed"
          >
            {showPassword ? (
              <EyeOffIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-error-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default FormInput;