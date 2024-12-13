import React from 'react';

interface BuffByteLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const BuffByteLogo: React.FC<BuffByteLogoProps> = ({ 
  className = '', 
  size = 'lg' 
}) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`${sizeClasses[size]} font-bold text-primary-600 ${className}`}>
      BuffByte
    </div>
  );
};

export default BuffByteLogo;