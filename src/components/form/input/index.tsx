import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

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
              <HiEyeSlash className="w-5 h-5" />
            ) : (
              <HiEye className="w-5 h-5" />
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