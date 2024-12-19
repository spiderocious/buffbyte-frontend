import React from 'react';
import { motion } from 'framer-motion';
import PlatformBadge from '@buffbyte/components/ui/platform-badge';

type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook';
type UpdateType = 'algorithm' | 'feature' | 'policy' | 'monetization' | 'analytics';
type Impact = 'positive' | 'negative' | 'neutral';

interface PlatformUpdate {
  platform: Platform;
  update_type: UpdateType;
  impact_on_creators: Impact;
  adaptation_strategy: string;
  date?: string;
  urgency?: 'low' | 'medium' | 'high';
}

interface UpdateNotificationProps {
  update: PlatformUpdate;
  index?: number;
  onClick?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const UpdateNotification: React.FC<UpdateNotificationProps> = ({
  update,
  index = 0,
  onClick,
  onDismiss,
  className = ''
}) => {
  // Get update type icon and color
  const getUpdateTypeConfig = (type: UpdateType) => {
    const configs = {
      algorithm: { icon: '🤖', label: 'Algorithm Update', color: 'text-primary-600 bg-primary-100' },
      feature: { icon: '✨', label: 'New Feature', color: 'text-success-600 bg-success-100' },
      policy: { icon: '📋', label: 'Policy Change', color: 'text-warning-600 bg-warning-100' },
      monetization: { icon: '💰', label: 'Monetization', color: 'text-green-600 bg-green-100' },
      analytics: { icon: '📊', label: 'Analytics Update', color: 'text-purple-600 bg-purple-100' }
    };
    return configs[type] || configs.feature;
  };

  // Get impact configuration
  const getImpactConfig = (impact: Impact) => {
    const configs = {
      positive: { 
        icon: '📈', 
        label: 'Positive Impact', 
        color: 'text-success-600 bg-success-50 border-success-200',
        dotColor: 'bg-success-500'
      },
      negative: { 
        icon: '📉', 
        label: 'Negative Impact', 
        color: 'text-error-600 bg-error-50 border-error-200',
        dotColor: 'bg-error-500'
      },
      neutral: { 
        icon: '⚖️', 
        label: 'Neutral Impact', 
        color: 'text-gray-600 bg-gray-50 border-gray-200',
        dotColor: 'bg-gray-500'
      }
    };
    return configs[impact];
  };

  // Get urgency configuration
  const getUrgencyConfig = (urgency: string = 'medium') => {
    const configs = {
      high: { color: 'border-l-error-500', pulse: true },
      medium: { color: 'border-l-warning-500', pulse: false },
      low: { color: 'border-l-gray-300', pulse: false }
    };
    return configs[urgency as keyof typeof configs] || configs.medium;
  };

  const updateTypeConfig = getUpdateTypeConfig(update.update_type);
  const impactConfig = getImpactConfig(update.impact_on_creators);
  const urgencyConfig = getUrgencyConfig(update.urgency);

  // Animation variants
  const notificationVariants = {
    initial: { 
      opacity: 0, 
      x: -50,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut" as const
      }
    },
    hover: {
      x: 5,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const
      }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    },
    exit: {
      opacity: 0,
      x: 50,
      scale: 0.95,
      transition: { duration: 0.3 }
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
    initial: { opacity: 0, y: 5 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      variants={notificationVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap={onClick ? "tap" : undefined}
      exit="exit"
      onClick={onClick}
      className={`
        relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md
        transition-all duration-200 overflow-hidden
        ${urgencyConfig.color} border-l-4
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Urgency pulse effect for high priority */}
      {urgencyConfig.pulse && (
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="absolute inset-0 bg-error-500 opacity-5 rounded-lg"
        />
      )}

      <div className="relative z-10 p-4">
        <motion.div
          variants={contentVariants}
          initial="initial"
          animate="animate"
          className="space-y-3"
        >
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="flex items-start justify-between space-x-3"
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <PlatformBadge
                platform={update.platform}
                size="sm"
                variant="solid"
                showLabel={false}
                animated
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className={`
                    inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
                    ${updateTypeConfig.color}
                  `}>
                    <span>{updateTypeConfig.icon}</span>
                    <span>{updateTypeConfig.label}</span>
                  </span>
                  
                  <span className="text-xs text-gray-500">
                    {formatDate(update.date)}
                  </span>
                </div>
              </div>
            </div>

            {/* Dismiss button */}
            {onDismiss && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss();
                }}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            )}
          </motion.div>

          {/* Impact indicator */}
          <motion.div 
            variants={itemVariants}
            className={`
              inline-flex items-center space-x-2 px-3 py-2 rounded-lg border
              ${impactConfig.color}
            `}
          >
            <motion.div
              className={`w-2 h-2 rounded-full ${impactConfig.dotColor}`}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" as const
              }}
            />
            <span className="text-sm font-medium">
              {impactConfig.icon} {impactConfig.label}
            </span>
          </motion.div>

          {/* Adaptation strategy */}
          <motion.div 
            variants={itemVariants}
            className="space-y-2"
          >
            <h4 className="text-sm font-semibold text-gray-900">
              Recommended Action:
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {update.adaptation_strategy}
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center space-x-2 pt-2"
          >
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                // Handle learn more action
              }}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More →
            </motion.button>
            
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                // Handle save action
              }}
              className="text-xs text-gray-600 hover:text-gray-700 font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save for Later
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Click ripple effect */}
      {onClick && (
        <motion.div
          className="absolute inset-0 bg-primary-500 opacity-0 rounded-lg"
          whileTap={{ opacity: 0.1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* New indicator dot */}
      {update.urgency === 'high' && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-2 right-2 w-2 h-2 bg-error-500 rounded-full"
        >
          <motion.div
            className="absolute inset-0 bg-error-500 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [1, 0, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" as const
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default UpdateNotification;