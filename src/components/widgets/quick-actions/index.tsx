import React from 'react';
import { motion } from 'framer-motion';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  href?: string;
  onClick?: () => void;
  badge?: string;
  stats?: {
    label: string;
    value: string;
  };
}

interface QuickActionsSectionProps {
  actions?: QuickAction[];
  className?: string;
}

const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
  actions,
  className = ''
}) => {
  // Default actions if none provided
  const defaultActions: QuickAction[] = [
    {
      id: 'analyze-content',
      title: 'Analyze Content',
      description: 'Get instant engagement predictions and optimization tips',
      icon: '🧠',
      gradient: 'from-blue-500 via-purple-500 to-pink-500',
      href: '/content-analysis',
      badge: 'Popular',
      stats: {
        label: 'Avg boost',
        value: '+34%'
      }
    },
    {
      id: 'optimize-script',
      title: 'Optimize Script',
      description: 'Perfect your video scripts for maximum impact',
      icon: '📝',
      gradient: 'from-green-500 via-teal-500 to-blue-500',
      href: '/script-analysis',
      stats: {
        label: 'Success rate',
        value: '87%'
      }
    },
    {
      id: 'teleprompter',
      title: 'Teleprompter',
      description: 'Practice your scripts with our smart teleprompter',
      icon: '📺',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      href: '/teleprompter',
      stats: {
        label: 'Used by',
        value: '2.1k+'
      }
    },
    {
      id: 'trending-analysis',
      title: 'Trend Scanner',
      description: 'Discover viral trends before they peak',
      icon: '🔥',
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      href: '/trends',
      badge: 'New',
      stats: {
        label: 'Accuracy',
        value: '94%'
      }
    }
  ];

  const actionItems = actions || defaultActions;

  // Animation variants
  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const actionVariants = {
    initial: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      rotate: -5,
      transition: { duration: 0.1 }
    }
  };

  const badgeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: 0.3,
        type: "spring",
        stiffness: 200
      }
    }
  };

  const shimmerVariants = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleActionClick = (action: QuickAction) => {
    if (action.onClick) {
      action.onClick();
    } else if (action.href) {
      window.location.href = action.href;
    }
  };

  return (
    <motion.div
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      className={`space-y-6 ${className}`}
    >
      {/* Header */}
      <motion.div variants={headerVariants} className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-3">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            🚀 Quick Actions
          </h2>
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-2xl"
          >
            ⚡
          </motion.div>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          What would you like to optimize today? Choose from our most popular tools 
          to boost your content performance instantly.
        </p>
      </motion.div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actionItems.map((action, index) => (
          <motion.div
            key={action.id}
            variants={actionVariants}
            custom={index}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleActionClick(action)}
            className="group relative cursor-pointer"
          >
            {/* Main Card */}
            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Shimmer Effect */}
              <motion.div
                variants={shimmerVariants}
                animate="animate"
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.5) 50%, transparent 75%)`,
                  backgroundSize: '200% 100%'
                }}
              />

              {/* Content */}
              <div className="relative z-10 p-6 space-y-4">
                {/* Header with Icon and Badge */}
                <div className="flex items-start justify-between">
                  <motion.div
                    variants={iconVariants}
                    className="text-5xl mb-2"
                  >
                    {action.icon}
                  </motion.div>
                  
                  {action.badge && (
                    <motion.div
                      variants={badgeVariants}
                      className={`
                        px-3 py-1 rounded-full text-xs font-bold
                        ${action.badge === 'New' 
                          ? 'bg-success-100 text-success-600' 
                          : action.badge === 'Popular'
                          ? 'bg-warning-100 text-warning-600'
                          : 'bg-primary-100 text-primary-600'
                        }
                      `}
                    >
                      {action.badge}
                    </motion.div>
                  )}
                </div>

                {/* Title and Description */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {action.description}
                  </p>
                </div>

                {/* Stats */}
                {action.stats && (
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      {action.stats.label}
                    </span>
                    <span className="text-lg font-bold text-primary-600">
                      {action.stats.value}
                    </span>
                  </div>
                )}

                {/* Action Arrow */}
                <div className="flex justify-end pt-2">
                  <motion.div
                    className="w-8 h-8 bg-gray-100 group-hover:bg-primary-100 rounded-full flex items-center justify-center transition-colors duration-200"
                    whileHover={{ x: 3 }}
                  >
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}
                style={{ transform: 'scale(1.1)' }}
              />
            </div>

            {/* Floating Decorations */}
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br ${action.gradient} rounded-full opacity-60 group-hover:opacity-80 transition-opacity`}
              style={{ animationDelay: `${index * 0.5}s` }}
            />
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className={`absolute -bottom-3 -left-2 w-3 h-3 bg-gradient-to-br ${action.gradient} rounded-full opacity-40 group-hover:opacity-60 transition-opacity`}
              style={{ animationDelay: `${index * 0.7}s` }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center pt-6"
      >
        <p className="text-gray-600 mb-4">
          Need help getting started? Check out our guides and tutorials.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          <span>📚</span>
          <span>View Documentation</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default QuickActionsSection;