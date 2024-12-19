import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlatformBadge from '@buffbyte/components/ui/platform-badge';

type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook';

interface PlatformTab {
  platform: Platform;
  label?: string;
  count?: number;
  enabled?: boolean;
}

interface PlatformTabsProps {
  tabs: PlatformTab[];
  activeTab: Platform;
  onTabChange: (platform: Platform) => void;
  variant?: 'pills' | 'underline' | 'cards';
  size?: 'sm' | 'md' | 'lg';
  showCounts?: boolean;
  className?: string;
}

const PlatformTabs: React.FC<PlatformTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'pills',
  size = 'md',
  showCounts = false,
  className = ''
}) => {
  // Size configuration
  const sizeConfig = {
    sm: {
      container: 'p-1',
      spacing: 'space-x-1',
      badgeSize: 'sm' as const,
      text: 'text-xs',
      count: 'text-xs'
    },
    md: {
      container: 'p-1.5',
      spacing: 'space-x-2',
      badgeSize: 'md' as const,
      text: 'text-sm',
      count: 'text-sm'
    },
    lg: {
      container: 'p-2',
      spacing: 'space-x-3',
      badgeSize: 'lg' as const,
      text: 'text-base',
      count: 'text-base'
    }
  };

  const config = sizeConfig[size];

  // Variant styles
  const variantStyles = {
    pills: {
      container: 'bg-gray-100 rounded-lg',
      tab: {
        base: 'relative px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center space-x-2',
        inactive: 'text-gray-600 hover:text-gray-900 hover:bg-white/50',
        active: 'text-white bg-primary-600 shadow-sm'
      }
    },
    underline: {
      container: 'border-b border-gray-200',
      tab: {
        base: 'relative px-4 py-3 font-medium transition-all duration-200 flex items-center space-x-2',
        inactive: 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300',
        active: 'text-primary-600 border-b-2 border-primary-600'
      }
    },
    cards: {
      container: 'grid grid-cols-2 md:grid-cols-4 gap-2',
      tab: {
        base: 'relative p-3 rounded-lg border-2 font-medium transition-all duration-200 flex flex-col items-center space-y-2',
        inactive: 'text-gray-600 bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm',
        active: 'text-primary-600 bg-primary-50 border-primary-300 shadow-md'
      }
    }
  };

  const styles = variantStyles[variant];

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const tabVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.2 }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const indicatorVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const countVariants = {
    initial: { opacity: 0, y: 5 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.2 }
    }
  };

  // Format count numbers
  const formatCount = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const handleTabClick = (platform: Platform, enabled: boolean = true) => {
    if (enabled && platform !== activeTab) {
      onTabChange(platform);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={`${styles.container} ${config.container} ${className}`}
    >
      {variant === 'cards' ? (
        // Cards layout
        tabs.map((tab) => {
          const isActive = tab.platform === activeTab;
          const isEnabled = tab.enabled !== false;

          return (
            <motion.button
              key={tab.platform}
              variants={tabVariants}
              initial="initial"
              animate="animate"
              whileHover={isEnabled ? "hover" : undefined}
              whileTap={isEnabled ? "tap" : undefined}
              onClick={() => handleTabClick(tab.platform, isEnabled)}
              disabled={!isEnabled}
              className={`
                ${styles.tab.base}
                ${isActive ? styles.tab.active : styles.tab.inactive}
                ${!isEnabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <PlatformBadge
                platform={tab.platform}
                size={config.badgeSize}
                variant={isActive ? "solid" : "outline"}
                showLabel={false}
                animated={false}
              />
              
              <div className="text-center">
                <div className={`font-medium ${config.text}`}>
                  {tab.label || tab.platform.charAt(0).toUpperCase() + tab.platform.slice(1)}
                </div>
                
                {showCounts && tab.count && (
                  <motion.div
                    variants={countVariants}
                    className={`${config.count} text-gray-500 mt-1`}
                  >
                    {formatCount(tab.count)}
                  </motion.div>
                )}
              </div>

              {/* Active indicator for cards */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    variants={indicatorVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute -top-1 -right-1 w-3 h-3 bg-primary-600 rounded-full"
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })
      ) : (
        // Pills and underline layout
        <div className={`flex ${variant === 'pills' ? config.spacing : 'space-x-0'}`}>
          {tabs.map((tab) => {
            const isActive = tab.platform === activeTab;
            const isEnabled = tab.enabled !== false;

            return (
              <motion.button
                key={tab.platform}
                variants={tabVariants}
                initial="initial"
                animate="animate"
                whileHover={isEnabled ? "hover" : undefined}
                whileTap={isEnabled ? "tap" : undefined}
                onClick={() => handleTabClick(tab.platform, isEnabled)}
                disabled={!isEnabled}
                className={`
                  ${styles.tab.base}
                  ${isActive ? styles.tab.active : styles.tab.inactive}
                  ${!isEnabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  ${variant === 'underline' ? 'border-b-2' : ''}
                `}
              >
                <PlatformBadge
                  platform={tab.platform}
                  size={config.badgeSize}
                  variant="subtle"
                  showLabel={false}
                  animated={false}
                />
                
                <span className={config.text}>
                  {tab.label || tab.platform.charAt(0).toUpperCase() + tab.platform.slice(1)}
                </span>

                {showCounts && tab.count && (
                  <motion.span
                    variants={countVariants}
                    className={`
                      ${config.count} px-2 py-0.5 rounded-full text-xs font-medium
                      ${isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-200 text-gray-600'
                      }
                    `}
                  >
                    {formatCount(tab.count)}
                  </motion.span>
                )}

                {/* Active background indicator for pills */}
                <AnimatePresence>
                  {isActive && variant === 'pills' && (
                    <motion.div
                      variants={indicatorVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute inset-0 bg-primary-600 rounded-md -z-10"
                      layoutId="activeTabBackground"
                    />
                  )}
                </AnimatePresence>

                {/* Active underline indicator */}
                <AnimatePresence>
                  {isActive && variant === 'underline' && (
                    <motion.div
                      variants={indicatorVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                      layoutId="activeTabUnderline"
                    />
                  )}
                </AnimatePresence>

                {/* Notification dot for new content */}
                {tab.count && tab.count > 0 && !showCounts && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-2 h-2 bg-error-500 rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Loading state overlay */}
      <AnimatePresence>
        {tabs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-8"
          >
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-primary-600 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlatformTabs;