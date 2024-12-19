import React from 'react';
import { motion } from 'framer-motion';
import PlatformBadge from '@buffbyte/components/ui/platform-badge';
import TrendVelocityIndicator from '@buffbyte/components/ui/trend-velocity';
import EngagementProgressRing from '@buffbyte/components/ui/engagement-ring';

type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook';
type TrendVelocity = 'rising' | 'stable' | 'declining';

interface TrendingTopic {
  topic: string;
  platforms: Platform[];
  engagement_score: number;
  trend_velocity: TrendVelocity;
  demographics: string[];
  content_types: string[];
  duration_prediction: string;
}

interface TopicCardProps {
  topic: TrendingTopic;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
  index?: number;
}

const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  size = 'medium',
  onClick,
  className = '',
  index = 0
}) => {
  // Size configuration
  const sizeConfig = {
    small: {
      container: 'p-4',
      title: 'text-lg font-semibold',
      spacing: 'space-y-3',
      ringSize: 'sm' as const,
      badgeSize: 'sm' as const,
      indicatorSize: 'sm' as const
    },
    medium: {
      container: 'p-5',
      title: 'text-xl font-bold',
      spacing: 'space-y-4',
      ringSize: 'md' as const,
      badgeSize: 'md' as const,
      indicatorSize: 'md' as const
    },
    large: {
      container: 'p-6',
      title: 'text-2xl font-bold',
      spacing: 'space-y-5',
      ringSize: 'lg' as const,
      badgeSize: 'lg' as const,
      indicatorSize: 'lg' as const
    }
  };

  const config = sizeConfig[size];

  // Animation variants
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut" as const
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const
      }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        delay: 0.2 + (index * 0.1),
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  // Get background gradient based on engagement score
  const getBackgroundGradient = (score: number) => {
    if (score >= 0.8) return 'from-success-50 to-success-100';
    if (score >= 0.6) return 'from-primary-50 to-primary-100';
    if (score >= 0.4) return 'from-warning-50 to-warning-100';
    return 'from-gray-50 to-gray-100';
  };

  // Get border color based on engagement score
  const getBorderColor = (score: number) => {
    if (score >= 0.8) return 'border-success-200 hover:border-success-300';
    if (score >= 0.6) return 'border-primary-200 hover:border-primary-300';
    if (score >= 0.4) return 'border-warning-200 hover:border-warning-300';
    return 'border-gray-200 hover:border-gray-300';
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
        relative bg-gradient-to-br ${getBackgroundGradient(topic.engagement_score)}
        border-2 ${getBorderColor(topic.engagement_score)}
        rounded-xl shadow-sm hover:shadow-md transition-all duration-200
        ${config.container}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent transform rotate-45" />
      </div>

      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        className={`relative z-10 ${config.spacing}`}
      >
        {/* Header with title and trend indicator */}
        <motion.div 
          variants={itemVariants}
          className="flex items-start justify-between"
        >
          <div className="flex-1">
            <h3 className={`${config.title} text-gray-900 leading-tight`}>
              {topic.topic}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Predicted to last {topic.duration_prediction}
            </p>
          </div>
          <TrendVelocityIndicator 
            velocity={topic.trend_velocity}
            size={config.indicatorSize}
            animated
          />
        </motion.div>

        {/* Engagement score */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center"
        >
          <EngagementProgressRing
            score={topic.engagement_score}
            size={config.ringSize}
            showPercentage
            showLabel
            label="Engagement"
            animated
          />
        </motion.div>

        {/* Platforms */}
        <motion.div 
          variants={itemVariants}
          className="space-y-2"
        >
          <h4 className="text-sm font-medium text-gray-700">Active on:</h4>
          <div className="flex flex-wrap gap-2">
            {topic.platforms.map((platform, idx) => (
              <motion.div
                key={platform}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
              >
                <PlatformBadge
                  platform={platform}
                  size={config.badgeSize}
                  variant="subtle"
                  animated
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Demographics and Content Types */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 gap-3"
        >
          {/* Demographics */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Demographics
            </h4>
            <div className="flex flex-wrap gap-1">
              {topic.demographics.map((demo, idx) => (
                <motion.span
                  key={demo}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (idx * 0.05) }}
                  className="inline-block px-2 py-1 bg-white/60 text-xs font-medium text-gray-700 rounded-md"
                >
                  {demo}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Content Types */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Content Types
            </h4>
            <div className="flex flex-wrap gap-1">
              {topic.content_types.map((type, idx) => (
                <motion.span
                  key={type}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (idx * 0.05) }}
                  className="inline-block px-2 py-1 bg-white/60 text-xs font-medium text-gray-700 rounded-md capitalize"
                >
                  {type}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Click indicator */}
        {onClick && (
          <motion.div
            className="absolute top-3 right-3 w-2 h-2 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.2 }}
          />
        )}
      </motion.div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default TopicCard;