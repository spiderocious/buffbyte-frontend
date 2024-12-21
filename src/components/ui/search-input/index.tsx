import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search analyses...',
  debounceMs = 300,
  size = 'md',
  className = ''
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(internalValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [internalValue, onChange, debounceMs]);

  // Sync with external value changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const sizeConfig = {
    sm: {
      container: 'h-9',
      input: 'pl-9 pr-8 text-sm',
      icon: 'w-4 h-4',
      iconLeft: 'left-2.5',
      iconRight: 'right-2.5'
    },
    md: {
      container: 'h-10',
      input: 'pl-10 pr-10 text-sm',
      icon: 'w-4 h-4',
      iconLeft: 'left-3',
      iconRight: 'right-3'
    },
    lg: {
      container: 'h-12',
      input: 'pl-12 pr-12 text-base',
      icon: 'w-5 h-5',
      iconLeft: 'left-3.5',
      iconRight: 'right-3.5'
    }
  };

  const config = sizeConfig[size];

  const handleClear = () => {
    setInternalValue('');
    onChange('');
  };

  return (
    <div className={`relative ${config.container} ${className}`}>
      {/* Search Icon */}
      <div className={`absolute ${config.iconLeft} top-1/2 transform -translate-y-1/2 z-10`}>
        <FiSearch className={`${config.icon} text-slate-400`} />
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`
          w-full h-full rounded-lg border bg-white transition-all duration-200
          ${config.input}
          ${isFocused
            ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
            : 'border-slate-200 hover:border-slate-300'
          }
          placeholder-slate-400 text-slate-900
          focus:outline-none
        `}
      />

      {/* Clear Button */}
      <AnimatePresence>
        {internalValue && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={handleClear}
            className={`
              absolute ${config.iconRight} top-1/2 transform -translate-y-1/2 z-10
              p-1 rounded-full hover:bg-slate-100 transition-colors duration-200
            `}
          >
            <FiX className={`${config.icon} text-slate-400 hover:text-slate-600`} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Focus Ring Animation */}
      {isFocused && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute inset-0 rounded-lg border-2 border-blue-500 pointer-events-none"
        />
      )}
    </div>
  );
};

export default SearchInput;