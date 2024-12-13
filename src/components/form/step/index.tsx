import React from 'react';
import { motion } from 'framer-motion';

interface FormStepProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

const FormStep: React.FC<FormStepProps> = ({ 
  children, 
  title, 
  subtitle, 
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className={`space-y-6 ${className}`}
    >
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="text-base text-gray-600">{subtitle}</p>
        )}
      </div>
      {children}
    </motion.div>
  );
};

export default FormStep;