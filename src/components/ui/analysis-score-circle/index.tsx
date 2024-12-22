import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EASING } from '../../../types';

interface AnalysisScoreCircleProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}

const AnalysisScoreCircle: React.FC<AnalysisScoreCircleProps> = ({
  score,
  size = 'md',
  showLabel = false,
  label = 'Score',
  animated = true,
  className = ''
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate score counting up
  useEffect(() => {
    if (!animated) {
      setAnimatedScore(score);
      return;
    }

    let startTime: number;
    const duration = 1500; // 1.5 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setAnimatedScore(Math.floor(easeOutQuart * score));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [score, animated]);

  // Get colors based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'emerald';
    if (score >= 60) return 'blue';
    return 'orange';
  };

  const sizeConfig = {
    sm: {
      container: 'w-16 h-16',
      circle: { cx: 32, cy: 32, r: 28 },
      strokeWidth: 4,
      fontSize: 'text-sm',
      labelSize: 'text-xs'
    },
    md: {
      container: 'w-20 h-20',
      circle: { cx: 40, cy: 40, r: 32 },
      strokeWidth: 5,
      fontSize: 'text-base',
      labelSize: 'text-xs'
    },
    lg: {
      container: 'w-24 h-24',
      circle: { cx: 48, cy: 48, r: 36 },
      strokeWidth: 6,
      fontSize: 'text-lg',
      labelSize: 'text-sm'
    }
  };

  const config = sizeConfig[size];
  const colorScheme = getScoreColor(score);
  const circumference = 2 * Math.PI * config.circle.r;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className={`relative ${config.container} ${className}`}>
      {/* Background Circle */}
      <svg className="absolute inset-0 transform -rotate-90" width="100%" height="100%">
        <circle
          cx={config.circle.cx}
          cy={config.circle.cy}
          r={config.circle.r}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          className="text-slate-200"
        />
        
        {/* Progress Circle */}
        <motion.circle
          cx={config.circle.cx}
          cy={config.circle.cy}
          r={config.circle.r}
          fill="none"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          className={`text-${colorScheme}-500`}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: animated ? circumference : strokeDashoffset,
          }}
          animate={{
            strokeDashoffset: strokeDashoffset,
            stroke: colorScheme === 'emerald' ? '#10b981' : 
                   colorScheme === 'blue' ? '#3b82f6' : '#f97316'
          }}
          transition={{
            duration: animated ? 1.5 : 0,
            ease: EASING.smooth,
            delay: 0.2
          }}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`font-black text-slate-900 ${config.fontSize}`}>
          {animatedScore}%
        </div>
        {showLabel && (
          <div className={`font-medium text-slate-500 ${config.labelSize} uppercase tracking-wider`}>
            {label}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisScoreCircle;