import React from 'react';
import { motion } from 'framer-motion';

interface BuffByteLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  repeat?: number;
  color?: string;
}

const BuffByteLogo: React.FC<BuffByteLogoProps> = ({ 
  className = '', 
  size = 'lg',
  animated = true,
  repeat = 1,
  color = 'currentColor'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.1
      }
    }
  };

  const bufferVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut" as const,
        repeat: animated ? (repeat === 1 ? 0 : repeat - 1) : 0,
        repeatType: "loop" as const,
        repeatDelay: 0.5
      }
    }
  };

  const byteVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        delay: 0.3,
        repeat: animated ? (repeat === 1 ? 0 : repeat - 1) : 0,
        repeatType: "loop" as const,
        repeatDelay: 1.2
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: animated ? Infinity : 0,
        ease: "easeInOut" as const
      }
    }
  };

  const sparkleVariants = {
    animate: {
      rotate: [0, 180, 360],
      scale: [0, 1, 0],
      transition: {
        duration: 1.5,
        repeat: animated ? (repeat === 1 ? 0 : repeat - 1) : 0,
        repeatType: "loop" as const,
        delay: 1,
        repeatDelay: 0.8
      }
    }
  };

  return (
    <motion.div 
      className={`inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background pulse circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#pulseGradient)"
          variants={pulseVariants}
          animate="animate"
          style={{ opacity: 0.1 }}
        />

        {/* Main buffer/data flow lines */}
        <motion.path
          d="M15 30 L85 30 M15 40 L75 40 M15 50 L85 50 M15 60 L70 60 M15 70 L80 70"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          variants={bufferVariants}
          initial="initial"
          animate="animate"
        />

        {/* Central processing unit (hexagon) */}
        <motion.polygon
          points="50,25 62,35 62,55 50,65 38,55 38,35"
          fill="url(#hexGradient)"
          stroke={color}
          strokeWidth="2"
          variants={byteVariants}
          initial="initial"
          animate="animate"
        />

        {/* Inner byte representation (binary pattern) */}
        <motion.g variants={byteVariants} initial="initial" animate="animate">
          {/* <circle cx="45" cy="40" r="2" fill={color} />
          <circle cx="55" cy="40" r="2" fill={color} />
          <circle cx="45" cy="50" r="2" fill={color} />
          <circle cx="55" cy="50" r="2" fill={color} /> */}
        </motion.g>

        {/* Data sparkles */}
        <motion.g
          variants={sparkleVariants}
          initial={{ scale: 0 }}
          animate="animate"
        >
          <path
            d="M25 20 L27 25 L32 23 L27 25 L25 30 L23 25 L18 23 L23 25 Z"
            fill={color}
            opacity="0.6"
          />
          <path
            d="M75 15 L76 18 L79 17 L76 18 L75 21 L74 18 L71 17 L74 18 Z"
            fill={color}
            opacity="0.8"
          />
          <path
            d="M80 75 L82 79 L86 77 L82 79 L80 83 L78 79 L74 77 L78 79 Z"
            fill={color}
            opacity="0.5"
          />
        </motion.g>

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default BuffByteLogo;