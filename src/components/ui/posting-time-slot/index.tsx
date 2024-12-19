import React from 'react';
import { motion } from 'framer-motion';
import PlatformBadge from '@buffbyte/components/ui/platform-badge';

type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook';

interface PostingTime {
  platform: Platform;
  time: string; // Format: "HH:MM"
  timezone: string;
  engagement_boost: number; // 0 to 1
}

interface PostingTimeSlotProps {
  postingTime: PostingTime;
  index?: number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const PostingTimeSlot: React.FC<PostingTimeSlotProps> = ({
  postingTime,
  index = 0,
  selected = false,
  onClick,
  className = ''
}) => {
  // Format time to 12-hour format
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Get boost color based on engagement boost value
  const getBoostColor = (boost: number) => {
    if (boost >= 0.8) return 'text-success-600 bg-success-100 border-success-200';
    if (boost >= 0.6) return 'text-primary-600 bg-primary-100 border-primary-200';
    if (boost >= 0.4) return 'text-warning-600 bg-warning-100 border-warning-200';
    return 'text-error-600 bg-error-100 border-error-200';
  };

  // Get boost icon based on engagement boost value
  const getBoostIcon = (boost: number) => {
    if (boost >= 0.8) return '🚀';
    if (boost >= 0.6) return '📈';
    if (boost >= 0.4) return '📊';
    return '📉';
  };

  // Animation variants
  const slotVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
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
      y: -2,
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

  const boostBarVariants = {
    initial: { scaleX: 0 },
    animate: { 
      scaleX: postingTime.engagement_boost,
      transition: { 
        duration: 1,
        delay: 0.5 + (index * 0.1),
        ease: "easeOut" as const
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <motion.div
      variants={slotVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap={onClick ? "tap" : undefined}
      onClick={onClick}
      className={`
        relative bg-white border-2 rounded-lg p-4 transition-all duration-200
        ${selected 
          ? 'border-primary-300 bg-primary-50 shadow-md' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
        }
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Background glow effect for high engagement */}
      {postingTime.engagement_boost >= 0.8 && (
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-success-400/10 to-primary-400/10 rounded-lg"
        />
      )}

      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 space-y-3"
      >
        {/* Header with platform and time */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-between"
        >
          <PlatformBadge
            platform={postingTime.platform}
            size="sm"
            variant="subtle"
            showLabel={false}
            animated
          />
          
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">
              {formatTime(postingTime.time)}
            </div>
            <div className="text-xs text-gray-500">
              {postingTime.timezone}
            </div>
          </div>
        </motion.div>

        {/* Engagement boost indicator */}
        <motion.div 
          variants={itemVariants}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Engagement Boost
            </span>
            <div className={`
              inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border
              ${getBoostColor(postingTime.engagement_boost)}
            `}>
              <span>{getBoostIcon(postingTime.engagement_boost)}</span>
              <span>{Math.round(postingTime.engagement_boost * 100)}%</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              variants={boostBarVariants}
              initial="initial"
              animate="animate"
              className={`
                absolute left-0 top-0 h-full origin-left
                ${postingTime.engagement_boost >= 0.8 
                  ? 'bg-gradient-to-r from-success-500 to-success-600' 
                  : postingTime.engagement_boost >= 0.6
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600'
                  : postingTime.engagement_boost >= 0.4
                  ? 'bg-gradient-to-r from-warning-500 to-warning-600'
                  : 'bg-gradient-to-r from-error-500 to-error-600'
                }
              `}
            />
            
            {/* Shimmer effect for high engagement */}
            {postingTime.engagement_boost >= 0.8 && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: [-100, 100],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1 + (index * 0.2)
                }}
              />
            )}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div 
          variants={itemVariants}
          className="text-xs text-gray-600"
        >
          {postingTime.engagement_boost >= 0.8 && (
            <div className="flex items-center space-x-1 text-success-600">
              <span>⭐</span>
              <span className="font-medium">Prime time - Maximum reach expected</span>
            </div>
          )}
          {postingTime.engagement_boost >= 0.6 && postingTime.engagement_boost < 0.8 && (
            <div className="flex items-center space-x-1 text-primary-600">
              <span>👍</span>
              <span className="font-medium">Good time - Above average engagement</span>
            </div>
          )}
          {postingTime.engagement_boost >= 0.4 && postingTime.engagement_boost < 0.6 && (
            <div className="flex items-center space-x-1 text-warning-600">
              <span>⚡</span>
              <span className="font-medium">Moderate time - Standard engagement</span>
            </div>
          )}
          {postingTime.engagement_boost < 0.4 && (
            <div className="flex items-center space-x-1 text-error-600">
              <span>💤</span>
              <span className="font-medium">Low activity - Consider other times</span>
            </div>
          )}
        </motion.div>

        {/* Selected indicator */}
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"
          >
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
        )}

        {/* Click ripple effect */}
        {onClick && (
          <motion.div
            className="absolute inset-0 rounded-lg bg-primary-500 opacity-0"
            whileTap={{ opacity: 0.1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default PostingTimeSlot;