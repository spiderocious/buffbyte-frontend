import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BsCheck, BsX } from 'react-icons/bs';
import type { PasswordRequirement, PasswordStrength } from '@buffbyte/types/auth';

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
    console.log(score);
  return {
    score,
    label: strength.label,
    color: strength.color,
    requirements: requirementsWithStatus
  };
};

export const PasswordStrengthIndicator: React.FC<{ password: string; onChange?: (valid: boolean) => void }> = ({ password, onChange }) => {
  const strength = calculatePasswordStrength(password);
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

  useEffect(() => {
    if (onChange) {
      onChange(strength.score === 5); // Consider valid if score is 5
    }
  }, [strength.score, onChange]);

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
                    ? ' text-success-500' 
                    : ' text-gray-500'
                }`}
              >
                {requirement.met ? (
                  <BsCheck className="w-3 h-3" />
                ) : (
                  <BsX className="w-4 h-4" />
                )}
              </motion.div>
              
              <span className={`text-sm transition-colors duration-200 ${
                requirement.met 
                  ? 'text-success-700 font-medium' 
                  : 'text-gray-600'
              }`}>
                {requirement.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

     
    </div>
  );
};