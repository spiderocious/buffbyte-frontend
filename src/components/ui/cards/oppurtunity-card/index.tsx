import React from 'react';
import { motion } from 'framer-motion';
import PlatformBadge from '@buffbyte/components/ui/platform-badge';

type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook';

interface CreatorOpportunity {
  niche: string;
  demand_level: number; // 0 to 1
  competition_level: number; // 0 to 1
  monetization_potential: number; // 0 to 1
  recommended_platforms: Platform[];
}

interface OpportunityCardProps {
  opportunity: CreatorOpportunity;
  index?: number;
  onClick?: () => void;
  className?: string;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  index = 0,
  onClick,
  className = ''
}) => {
  // Calculate overall opportunity score
  const opportunityScore = (
    (opportunity.demand_level * 0.4) +
    ((1 - opportunity.competition_level) * 0.3) +
    (opportunity.monetization_potential * 0.3)
  );

  // Get score color and label
  const getScoreDisplay = (score: number) => {
    if (score >= 0.8) return { color: 'text-success-600 bg-success-100', label: 'Excellent', icon: '🚀' };
    if (score >= 0.6) return { color: 'text-primary-600 bg-primary-100', label: 'Good', icon: '📈' };
    if (score >= 0.4) return { color: 'text-warning-600 bg-warning-100', label: 'Fair', icon: '⚡' };
    return { color: 'text-error-600 bg-error-100', label: 'Low', icon: '📉' };
  };

  // Get metric color based on value
  const getMetricColor = (value: number, inverse = false) => {
    const adjustedValue = inverse ? 1 - value : value;
    if (adjustedValue >= 0.8) return 'bg-success-500';
    if (adjustedValue >= 0.6) return 'bg-primary-500';
    if (adjustedValue >= 0.4) return 'bg-warning-500';
    return 'bg-error-500';
  };

  // Get competition level description
  const getCompetitionLevel = (level: number) => {
    if (level >= 0.8) return { text: 'Very High', color: 'text-error-600' };
    if (level >= 0.6) return { text: 'High', color: 'text-warning-600' };
    if (level >= 0.4) return { text: 'Moderate', color: 'text-warning-500' };
    return { text: 'Low', color: 'text-success-600' };
  };

  const scoreDisplay = getScoreDisplay(opportunityScore);
  const competitionDisplay = getCompetitionLevel(opportunity.competition_level);

  // Animation variants
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
      rotateX: 15
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.15,
        ease: "easeOut" as const
      }
    },
    hover: {
      y: -8,
      scale: 1.03,
      rotateX: -2,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    },
    tap: {
      scale: 0.97,
      transition: { duration: 0.1 }
    }
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        delay: 0.3 + (index * 0.15),
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const barVariants = {
    initial: { scaleX: 0 },
    animate: (value: number) => ({ 
      scaleX: value,
      transition: { 
        duration: 1,
        delay: 0.6 + (index * 0.15),
        ease: "easeOut" as const
      }
    })
  };

  const floatingVariants = {
    animate: {
      y: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap={onClick ? "tap" : undefined}
      onClick={onClick}
      className={`
        relative bg-gradient-to-br from-white via-gray-50 to-white
        border border-gray-200 rounded-xl shadow-lg hover:shadow-xl
        overflow-hidden transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        backgroundImage: `linear-gradient(135deg, ${
          opportunityScore >= 0.8 
            ? 'rgba(34, 197, 94, 0.05)' 
            : opportunityScore >= 0.6
            ? 'rgba(2, 132, 199, 0.05)'
            : 'rgba(251, 191, 36, 0.05)'
        } 0%, transparent 100%)`
      }}
    >
      {/* Floating decoration */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-4 right-4 text-2xl opacity-20"
      >
        {scoreDisplay.icon}
      </motion.div>

      {/* Glow effect for excellent opportunities */}
      {opportunityScore >= 0.8 && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-success-400/10 via-primary-400/10 to-success-400/10"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      <div className="relative z-10 p-6">
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          className="space-y-5"
        >
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="flex items-start justify-between space-x-4"
          >
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 leading-tight">
                {opportunity.niche}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Creator Opportunity
              </p>
            </div>
            
            <div className={`
              inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-bold
              ${scoreDisplay.color}
            `}>
              <span>{scoreDisplay.icon}</span>
              <span>{scoreDisplay.label}</span>
            </div>
          </motion.div>

          {/* Metrics */}
          <motion.div 
            variants={itemVariants}
            className="space-y-4"
          >
            {/* Demand Level */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Demand Level</span>
                <span className="text-sm font-bold text-gray-900">
                  {Math.round(opportunity.demand_level * 100)}%
                </span>
              </div>
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`absolute left-0 top-0 h-full origin-left ${getMetricColor(opportunity.demand_level)}`}
                  variants={barVariants}
                  initial="initial"
                  animate="animate"
                  custom={opportunity.demand_level}
                />
              </div>
            </div>

            {/* Competition Level */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Competition</span>
                <span className={`text-sm font-bold ${competitionDisplay.color}`}>
                  {competitionDisplay.text}
                </span>
              </div>
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`absolute left-0 top-0 h-full origin-left ${getMetricColor(opportunity.competition_level, true)}`}
                  variants={barVariants}
                  initial="initial"
                  animate="animate"
                  custom={opportunity.competition_level}
                />
              </div>
            </div>

            {/* Monetization Potential */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Monetization</span>
                <span className="text-sm font-bold text-gray-900">
                  {Math.round(opportunity.monetization_potential * 100)}%
                </span>
              </div>
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`absolute left-0 top-0 h-full origin-left ${getMetricColor(opportunity.monetization_potential)}`}
                  variants={barVariants}
                  initial="initial"
                  animate="animate"
                  custom={opportunity.monetization_potential}
                />
              </div>
            </div>
          </motion.div>

          {/* Recommended Platforms */}
          <motion.div 
            variants={itemVariants}
            className="space-y-3"
          >
            <h4 className="text-sm font-medium text-gray-700">Best Platforms:</h4>
            <div className="flex flex-wrap gap-2">
              {opportunity.recommended_platforms.map((platform, idx) => (
                <motion.div
                  key={platform}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8 + (idx * 0.1) + (index * 0.15) }}
                >
                  <PlatformBadge
                    platform={platform}
                    size="sm"
                    variant="solid"
                    animated
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Overall Score */}
          <motion.div 
            variants={itemVariants}
            className="pt-4 border-t border-gray-200"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Overall Opportunity Score
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${getMetricColor(opportunityScore)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${opportunityScore * 100}%` }}
                    transition={{ duration: 1.5, delay: 1 + (index * 0.15) }}
                  />
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {Math.round(opportunityScore * 100)}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Click ripple effect */}
      {onClick && (
        <motion.div
          className="absolute inset-0 bg-primary-500 opacity-0 rounded-xl"
          whileTap={{ opacity: 0.1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
};

export default OpportunityCard;