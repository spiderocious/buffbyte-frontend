import React from 'react';

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ 
  score, 
  size = 'md', 
  className = '' 
}) => {
  // Get score styling based on value
  const getScoreStyle = (score: number) => {
    if (score >= 80) {
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        ring: 'ring-emerald-200'
      };
    }
    if (score >= 60) {
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        ring: 'ring-blue-200'
      };
    }
    return {
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      ring: 'ring-orange-200'
    };
  };

  const sizeConfig = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const scoreStyle = getScoreStyle(score);

  return (
    <span
      className={`
        inline-flex items-center rounded-lg font-bold ring-1
        ${scoreStyle.bg} ${scoreStyle.text} ${scoreStyle.ring}
        ${sizeConfig[size]}
        ${className}
      `}
    >
      {score}%
    </span>
  );
};

export default ScoreBadge;