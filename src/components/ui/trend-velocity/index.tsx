import React from 'react';
import { motion } from 'framer-motion';
import { BsArrowUp, BsArrowRight, BsArrowDown } from 'react-icons/bs';

type TrendVelocity = 'rising' | 'stable' | 'declining';

interface TrendVelocityIndicatorProps {
  velocity: TrendVelocity;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

const TrendVelocityIndicator: React.FC<TrendVelocityIndicatorProps> = ({
  velocity,
  size = 'md',
  showLabel = false,
  animated = true,
  className = ''
}) => {
  // Configuration for each trend type
  const trendConfig = {
    rising: {
      icon: BsArrowUp,
      label: 'Rising',
      color: 'text-success-600',
      bgColor: 'bg-success-100',
      borderColor: 'border-success-200',
      animation: { y: [-1, -3, -1], rotate: [0, 5, 0] }
    },
    stable: {
      icon: BsArrowRight,
      label: 'Stable',
      color: 'text-warning-600',
      bgColor: 'bg-warning-100',
      borderColor: 'border-warning-200',
      animation: { x: [-1, 1, -1], rotate: [0, 0, 0] }
    },
    declining: {
      icon: BsArrowDown,
      label: 'Declining',
      color: 'text-error-600',
      bgColor: 'bg-error-100',
      borderColor: 'border-error-200',
      animation: { y: [1, 3, 1], rotate: [0, -5, 0] }
    }
  };

  // Size configuration
  const sizeConfig = {
    sm: {
      container: showLabel ? 'px-2 py-1' : 'p-1',
      icon: 'w-3 h-3',
      text: 'text-xs',
      rounded: 'rounded',
      spacing: 'space-x-1'
    },
    md: {
      container: showLabel ? 'px-3 py-1.5' : 'p-1.5',
      icon: 'w-4 h-4',
      text: 'text-sm',
      rounded: 'rounded-md',
      spacing: 'space-x-2'
    },
    lg: {
      container: showLabel ? 'px-4 py-2' : 'p-2',
      icon: 'w-5 h-5',
      text: 'text-base',
      rounded: 'rounded-lg',
      spacing: 'space-x-2'
    }
  };

  const config = trendConfig[velocity];
  const sizeStyles = sizeConfig[size];
  const Icon = config.icon;

  // Animation variants
  const containerVariants = {
    initial: { scale: 1, opacity: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    initial: { ...config.animation },
    animate: {
      ...config.animation,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <motion.div
      variants={animated ? containerVariants : undefined}
      initial="initial"
      whileHover={animated ? "hover" : undefined}
      className={`
        inline-flex items-center font-medium border relative overflow-hidden
        ${sizeStyles.container} ${sizeStyles.rounded} ${showLabel ? sizeStyles.spacing : ''}
        ${config.color} ${config.bgColor} ${config.borderColor}
        ${className}
      `}
    >
      {/* Background pulse effect */}
      {animated && (
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className={`
            absolute inset-0 ${config.bgColor} opacity-30
          `}
        />
      )}

      {/* Icon */}
      <motion.div
        variants={animated ? iconVariants : undefined}
        initial="initial"
        animate={animated ? "animate" : undefined}
        whileHover={animated ? "hover" : undefined}
        className="relative z-10 flex-shrink-0"
      >
        <Icon className={sizeStyles.icon} />
      </motion.div>

      {/* Label */}
      {showLabel && (
        <motion.span
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className={`${sizeStyles.text} font-medium relative z-10`}
        >
          {config.label}
        </motion.span>
      )}

      {/* Trend-specific effects */}
      {animated && velocity === 'rising' && (
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-success-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" as const
          }}
        />
      )}

      {animated && velocity === 'declining' && (
        <motion.div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-error-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" as const
          }}
        />
      )}
    </motion.div>
  );
};

export default TrendVelocityIndicator;