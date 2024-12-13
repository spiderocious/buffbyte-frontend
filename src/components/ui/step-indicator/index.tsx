import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
  showStepText?: boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps, 
  className = '',
  showStepText = true 
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showStepText && (
        <span className="text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </span>
      )}
      <div className="flex space-x-1">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index < currentStep ? 'bg-primary-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;