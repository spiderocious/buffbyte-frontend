import React from 'react';
import { motion } from 'framer-motion';
import { BsCheck, BsX } from 'react-icons/bs';
import { BiXCircle } from 'react-icons/bi';

interface PasswordRequirement {
  id: string;
  label: string;
  test: (password: string) => boolean;
  met: boolean;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  requirements: PasswordRequirement[];
}

const calculatePasswordStrength = (password: string): PasswordStrength => {
  const requirements: Omit<PasswordRequirement, 'met'>[] = [
    {
      id: 'length',
      label: 'At least 8 characters',
      test: (pwd) => pwd.length >= 8
    },
    {
      id: 'lowercase',
      label: 'One lowercase letter (a-z)',
      test: (pwd) => /[a-z]/.test(pwd)
    },
    {
      id: 'uppercase',
      label: 'One uppercase letter (A-Z)',
      test: (pwd) => /[A-Z]/.test(pwd)
    },
    {
      id: 'number',
      label: 'One number (0-9)',
      test: (pwd) => /\d/.test(pwd)
    },
    {
      id: 'special',
      label: 'One special character (!@#$%)',
      test: (pwd) => /[^a-zA-Z\d]/.test(pwd)
    }
  ];

  const requirementsWithStatus: PasswordRequirement[] = requirements.map(req => ({
    ...req,
    met: req.test(password)
  }));

  const score = requirementsWithStatus.filter(req => req.met).length;

  const strengthMap: Record<number, { label: string; color: string }> = {
    0: { label: 'Very Weak', color: 'error-500' },
    1: { label: 'Weak', color: 'error-500' },
    2: { label: 'Fair', color: 'warning-500' },
    3: { label: 'Good', color: 'warning-400' },
    4: { label: 'Strong', color: 'success-500' },
    5: { label: 'Very Strong', color: 'success-600' }
  };

  const strength = strengthMap[score] || strengthMap[0];

  return {
    score,
    label: strength.label,
    color: strength.color,
    requirements: requirementsWithStatus
  };
};

export const PasswordStrengthIndicator: React.FC<{ password: string }> = ({ password }) => {
  const strength = calculatePasswordStrength(password);
  const widthPercentage = (strength.score / 5) * 100;

  // Define color classes to ensure they're included in Tailwind build
  const getTextColor = (color: string) => {
    switch (color) {
      case 'error-500': return 'text-error-500';
      case 'warning-500': return 'text-warning-500';
      case 'warning-400': return 'text-warning-400';
      case 'success-500': return 'text-success-500';
      case 'success-600': return 'text-success-600';
      default: return 'text-gray-500';
    }
  };

  const getBgColor = (color: string) => {
    switch (color) {
      case 'error-500': return 'bg-error-500';
      case 'warning-500': return 'bg-warning-500';
      case 'warning-400': return 'bg-warning-400';
      case 'success-500': return 'bg-success-500';
      case 'success-600': return 'bg-success-600';
      default: return 'bg-gray-500';
    }
  };

  // Animation variants for checklist items
  const checklistItemVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 }
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    exit: { scale: 0, rotate: 180 }
  };

  return (
    <div className="mt-3 space-y-4">

      {/* Requirements Checklist */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Your password must contain:</h4>
        <div className="space-y-1">
          {strength.requirements.map((requirement, index) => (
            <motion.div
              key={requirement.id}
              variants={checklistItemVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex items-center space-x-2 rounded-lg transition-all duration-200`}
            >
              <motion.div
                variants={iconVariants}
                initial="initial"
                animate={requirement.met ? "animate" : "animate"}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                  requirement.met 
                    ? 'bg-success-500 text-white' 
                    : ' text-gray-500'
                }`}
              >
                {requirement.met ? (
                  <BsCheck className="w-3 h-3" />
                ) : (
                  <BiXCircle className="w-4 h-4" />
                )}
              </motion.div>
              
              <span className={`text-sm transition-colors duration-200 ${
                requirement.met 
                  ? 'text-success-700 font-medium' 
                  : 'text-gray-600'
              }`}>
                {requirement.label}
              </span>
              
              {requirement.met && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="ml-auto"
                >
                  <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress Summary */}
      {/* <motion.div 
        className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-primary-700">
            Progress: {strength.score} of 5 requirements met
          </span>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < strength.score ? 'bg-primary-500' : 'bg-primary-200'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </motion.div> */}
    </div>
  );
};