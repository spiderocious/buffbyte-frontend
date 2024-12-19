import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface EngagementProgressRingProps {
  score: number; // 0 to 1 (0% to 100%)
  size?: 'sm' | 'md' | 'lg' | 'xl';
  strokeWidth?: number;
  showPercentage?: boolean;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'error' | 'auto';
  className?: string;
}

const EngagementProgressRing: React.FC<EngagementProgressRingProps> = ({
  score,
  size = 'md',
  strokeWidth,
  showPercentage = true,
  showLabel = false,
  label = 'Engagement',
  animated = true,
  color = 'auto',
  className = ''
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Size configuration
  const sizeConfig = {
    sm: {
      radius: 16,
      strokeWidth: strokeWidth || 3,
      fontSize: 'text-xs',
      containerSize: 'w-10 h-10'
    },
    md: {
      radius: 24,
      strokeWidth: strokeWidth || 4,
      fontSize: 'text-sm',
      containerSize: 'w-14 h-14'
    },
    lg: {
      radius: 32,
      strokeWidth: strokeWidth || 5,
      fontSize: 'text-base',
      containerSize: 'w-20 h-20'
    },
    xl: {
      radius: 48,
      strokeWidth: strokeWidth || 6,
      fontSize: 'text-lg',
      containerSize: 'w-28 h-28'
    }
  };

  const config = sizeConfig[size];
  const radius = config.radius;
  const stroke = config.strokeWidth;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  // Color configuration based on score or manual selection
  const getColor = () => {
    if (color !== 'auto') {
      const colorMap = {
        primary: { stroke: '#0284c7', bg: '#e0f2fe', glow: '#0284c7' },
        success: { stroke: '#16a34a', bg: '#dcfce7', glow: '#16a34a' },
        warning: { stroke: '#d97706', bg: '#fef3c7', glow: '#d97706' },
        error: { stroke: '#dc2626', bg: '#fee2e2', glow: '#dc2626' }
      };
      return colorMap[color];
    }

    // Auto color based on score
    if (score >= 0.8) return { stroke: '#16a34a', bg: '#dcfce7', glow: '#16a34a' }; // Green
    if (score >= 0.6) return { stroke: '#0284c7', bg: '#e0f2fe', glow: '#0284c7' }; // Blue
    if (score >= 0.4) return { stroke: '#d97706', bg: '#fef3c7', glow: '#d97706' }; // Orange
    return { stroke: '#dc2626', bg: '#fee2e2', glow: '#dc2626' }; // Red
  };

  const colors = getColor();
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (animatedScore * circumference);

  // Animate score on mount and when score changes
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedScore(score);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedScore(score);
    }
  }, [score, animated]);

  // Animation variants
  const containerVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const textVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { delay: 0.3, duration: 0.3 }
    }
  };

  const glowVariants = {
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <div className={`inline-flex flex-col items-center space-y-2 ${className}`}>
      <motion.div
        variants={animated ? containerVariants : undefined}
        initial="initial"
        animate="animate"
        whileHover={animated ? "hover" : undefined}
        className={`relative ${config.containerSize}`}
      >
        {/* Glow effect */}
        {animated && (
          <motion.div
            variants={glowVariants}
            animate="animate"
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${colors.glow}20 0%, transparent 70%)`,
              filter: 'blur(8px)'
            }}
          />
        )}

        {/* SVG Ring */}
        <svg
          className="w-full h-full transform -rotate-90"
          width={radius * 2}
          height={radius * 2}
        >
          {/* Background circle */}
          <circle
            stroke={colors.bg}
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          
          {/* Progress circle */}
          <motion.circle
            stroke={colors.stroke}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            initial={{ strokeDashoffset: circumference }}
            animate={{ 
              strokeDashoffset: animated 
                ? circumference - (animatedScore * circumference)
                : strokeDashoffset
            }}
            transition={{ 
              duration: animated ? 1.5 : 0,
              ease: "easeOut" as const,
              delay: animated ? 0.2 : 0
            }}
          />
        </svg>

        {/* Center content */}
        {showPercentage && (
          <motion.div
            variants={animated ? textVariants : undefined}
            initial="initial"
            animate="animate"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.span
                className={`font-bold ${config.fontSize}`}
                style={{ color: colors.stroke }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: animated ? 0.8 : 0 }}
              >
                {animated ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {Math.round(animatedScore * 100)}%
                  </motion.span>
                ) : (
                  `${Math.round(score * 100)}%`
                )}
              </motion.span>
            </div>
          </motion.div>
        )}

        {/* Pulse indicator for high scores */}
        {animated && score >= 0.9 && (
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: colors.stroke }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" as const
            }}
          />
        )}
      </motion.div>

      {/* Label */}
      {showLabel && (
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: animated ? 0.5 : 0 }}
          className="text-sm font-medium text-gray-600 text-center"
        >
          {label}
        </motion.span>
      )}
    </div>
  );
};

export default EngagementProgressRing;