import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsCopy, BsCheck } from 'react-icons/bs';
import { EASING } from '../../../types';

interface CopyButtonProps {
  textToCopy: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'solid';
  showText?: boolean;
  copyText?: string;
  successText?: string;
  className?: string;
  onCopy?: (text: string) => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  size = 'md',
  variant = 'ghost',
  showText = false,
  copyText = 'Copy',
  successText = 'Copied!',
  className = '',
  onCopy
}) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Size configuration
  const sizeConfig = {
    sm: {
      button: 'p-1.5',
      icon: 'w-3 h-3',
      text: 'text-xs',
      spacing: 'space-x-1'
    },
    md: {
      button: 'p-2',
      icon: 'w-4 h-4',
      text: 'text-sm',
      spacing: 'space-x-2'
    },
    lg: {
      button: 'p-3',
      icon: 'w-5 h-5',
      text: 'text-base',
      spacing: 'space-x-2'
    }
  };

  // Variant configuration
  const variantConfig = {
    ghost: {
      base: 'text-gray-400 hover:text-primary-600 hover:bg-primary-50',
      copied: 'text-success-600 bg-success-50'
    },
    outline: {
      base: 'text-gray-600 border border-gray-200 hover:text-primary-600 hover:border-primary-300 hover:bg-primary-50',
      copied: 'text-success-600 border-success-300 bg-success-50'
    },
    solid: {
      base: 'text-white bg-gray-500 hover:bg-primary-600',
      copied: 'text-white bg-success-600'
    }
  };

  const config = sizeConfig[size];
  const variantStyle = variantConfig[variant];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      onCopy?.(textToCopy);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        onCopy?.(textToCopy);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed: ', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: copied ? 0 : 15,
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    copied: {
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 }
    }
  };

  const successVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: [0, 1.2, 1], 
      opacity: 1,
      transition: { duration: 0.4, ease: EASING.smooth }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 5 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <motion.button
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onClick={handleCopy}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          inline-flex items-center font-medium rounded-md transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
          ${config.button} ${showText ? config.spacing : ''}
          ${copied ? variantStyle.copied : variantStyle.base}
          ${className}
        `}
        disabled={copied}
      >
        {/* Icon */}
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate={copied ? "copied" : isHovered ? "hover" : "initial"}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                variants={successVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <BsCheck className={config.icon} />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                variants={successVariants}
                initial="animate"
                exit="exit"
              >
                <BsCopy className={config.icon} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Text */}
        {showText && (
          <AnimatePresence mode="wait">
            <motion.span
              key={copied ? 'success' : 'copy'}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`${config.text} font-medium`}
            >
              {copied ? successText : copyText}
            </motion.span>
          </AnimatePresence>
        )}
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && !showText && !copied && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {copyText}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success feedback */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: -20 }}
            exit={{ opacity: 0, scale: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-success-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {successText}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-success-600" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CopyButton;