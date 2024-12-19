import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UpdateNotification from '@buffbyte/components/ui/update-notification';

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

interface PlatformUpdatesSectionProps {
  updates: PlatformUpdate[];
  loading?: boolean;
  onUpdateClick?: (update: PlatformUpdate) => void;
  onUpdateDismiss?: (update: PlatformUpdate) => void;
  className?: string;
}

const PlatformUpdatesSection: React.FC<PlatformUpdatesSectionProps> = ({
  updates,
  loading = false,
  onUpdateClick,
  onUpdateDismiss,
  className = ''
}) => {
  const [displayedUpdates, setDisplayedUpdates] = useState<PlatformUpdate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [viewMode, setViewMode] = useState<'ticker' | 'list'>('ticker');
  const [filterPlatform, setFilterPlatform] = useState<Platform | 'all'>('all');

  // Filter updates by platform
  const filteredUpdates = filterPlatform === 'all' 
    ? updates 
    : updates.filter(update => update.platform === filterPlatform);

  // Sort updates by urgency and date
  const sortedUpdates = [...filteredUpdates].sort((a, b) => {
    const urgencyOrder = { high: 3, medium: 2, low: 1 };
    const urgencyDiff = (urgencyOrder[b.urgency || 'medium']) - (urgencyOrder[a.urgency || 'medium']);
    
    if (urgencyDiff !== 0) return urgencyDiff;
    
    // Sort by date if urgency is the same
    const dateA = new Date(a.date || Date.now());
    const dateB = new Date(b.date || Date.now());
    return dateB.getTime() - dateA.getTime();
  });

  // Auto-scroll ticker effect
  useEffect(() => {
    if (viewMode === 'ticker' && isAutoScrolling && sortedUpdates.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % sortedUpdates.length);
      }, 4000); // Change every 4 seconds

      return () => clearInterval(interval);
    }
  }, [viewMode, isAutoScrolling, sortedUpdates.length]);

  // Update displayed updates for ticker
  useEffect(() => {
    if (viewMode === 'ticker' && sortedUpdates.length > 0) {
      const visibleCount = 3;
      const newDisplayed = [];
      
      for (let i = 0; i < Math.min(visibleCount, sortedUpdates.length); i++) {
        const index = (currentIndex + i) % sortedUpdates.length;
        newDisplayed.push(sortedUpdates[index]);
      }
      
      setDisplayedUpdates(newDisplayed);
    } else {
      setDisplayedUpdates(sortedUpdates);
    }
  }, [currentIndex, sortedUpdates, viewMode]);

  // Get unique platforms
  const platforms = Array.from(new Set(updates.map(update => update.platform)));

  // Handle update dismiss
  const handleDismiss = (update: PlatformUpdate) => {
    onUpdateDismiss?.(update);
    // Remove from local state
    setDisplayedUpdates(prev => prev.filter(u => u !== update));
  };

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
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const controlsVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const tickerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const slideVariants = {
    enter: {
      x: 100,
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      x: -100,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const listVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const skeletonVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Loading skeleton
  const renderSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          variants={skeletonVariants}
          animate="animate"
          className="h-24 bg-gray-200 rounded-lg animate-pulse"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  return (
    <motion.div
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      className={`space-y-6 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <motion.div variants={headerVariants} className="space-y-2">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              📢 Platform Updates
            </h2>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-2xl"
            >
              🔄
            </motion.div>
          </div>
          <p className="text-gray-600">
            Stay ahead with the latest platform changes and algorithm updates
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div variants={controlsVariants} className="flex flex-wrap items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('ticker')}
              className={`
                px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
                ${viewMode === 'ticker' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              📡 Ticker
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`
                px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
                ${viewMode === 'list' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              📋 List
            </button>
          </div>

          {/* Platform Filter */}
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value as Platform | 'all')}
            className="
              px-3 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              transition-all duration-200
            "
          >
            <option value="all">All Platforms</option>
            {platforms.map(platform => (
              <option key={platform} value={platform} className="capitalize">
                {platform}
              </option>
            ))}
          </select>

          {/* Auto-scroll toggle for ticker */}
          {viewMode === 'ticker' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className={`
                p-2 rounded-lg transition-all duration-200
                ${isAutoScrolling 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {isAutoScrolling ? '⏸️' : '▶️'}
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderSkeleton()}
          </motion.div>
        ) : viewMode === 'ticker' ? (
          /* Ticker View */
          <motion.div
            key="ticker"
            variants={tickerVariants}
            className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden"
          >
            {/* Ticker Header */}
            <div className="bg-red-600 px-6 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{
                      opacity: [1, 0.5, 1],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-3 h-3 bg-white rounded-full"
                  />
                  <span className="text-white font-bold text-sm">
                    BREAKING: Platform Updates
                  </span>
                </div>
                <div className="text-white text-xs font-mono">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>

            {/* Ticker Content */}
            <div className="relative h-32 bg-gray-900 overflow-hidden">
              <AnimatePresence mode="wait">
                {displayedUpdates.map((update, index) => (
                  <motion.div
                    key={`${update.platform}-${update.update_type}-${currentIndex}`}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 flex items-center px-6"
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className={`
                        w-2 h-2 rounded-full flex-shrink-0
                        ${update.urgency === 'high' ? 'bg-error-500' : 
                          update.urgency === 'medium' ? 'bg-warning-500' : 'bg-success-500'}
                      `} />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 text-white">
                          <span className="font-bold uppercase text-xs text-gray-300">
                            {update.platform}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="font-medium capitalize">
                            {update.update_type} Update
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className={`
                            text-xs font-bold
                            ${update.impact_on_creators === 'positive' ? 'text-success-400' : 
                              update.impact_on_creators === 'negative' ? 'text-error-400' : 'text-gray-400'}
                          `}>
                            {update.impact_on_creators.toUpperCase()} IMPACT
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mt-1 truncate">
                          {update.adaptation_strategy}
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onUpdateClick?.(update)}
                        className="text-primary-400 hover:text-primary-300 transition-colors text-sm font-medium"
                      >
                        Learn More →
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Scrolling animation indicator */}
              {isAutoScrolling && (
                <motion.div
                  className="absolute bottom-2 left-6 right-6"
                  animate={{
                    scaleX: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="h-0.5 bg-primary-500 rounded-full origin-left" />
                </motion.div>
              )}
            </div>

            {/* Ticker Footer */}
            <div className="bg-gray-800 px-6 py-2 border-t border-gray-700">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-4">
                  <span>🔴 LIVE</span>
                  <span>Updates: {sortedUpdates.length}</span>
                  <span>High Priority: {sortedUpdates.filter(u => u.urgency === 'high').length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Next update in</span>
                  <motion.span
                    key={currentIndex}
                    animate={{
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{
                      duration: 1,
                      repeat: 3,
                      ease: "easeInOut"
                    }}
                    className="font-mono text-primary-400"
                  >
                    {isAutoScrolling ? '4s' : 'Paused'}
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* List View */
          <motion.div
            key="list"
            variants={listVariants}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            {displayedUpdates.length > 0 ? (
              displayedUpdates.map((update, index) => (
                <UpdateNotification
                  key={`${update.platform}-${update.update_type}-${index}`}
                  update={update}
                  index={index}
                  onClick={() => onUpdateClick?.(update)}
                  onDismiss={() => handleDismiss(update)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="text-6xl opacity-50">📢</div>
                <h3 className="text-xl font-semibold text-gray-700">
                  No updates found
                </h3>
                <p className="text-gray-500">
                  {filterPlatform === 'all' 
                    ? 'No platform updates available at the moment'
                    : `No updates found for ${filterPlatform}`
                  }
                </p>
                {filterPlatform !== 'all' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilterPlatform('all')}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors"
                  >
                    Show All Platforms
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Stats */}
      {sortedUpdates.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-primary-50 to-success-50 rounded-lg p-4 border border-primary-100"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className={`text-2xl font-bold ${
                sortedUpdates.filter(u => u.urgency === 'high').length > 0 
                  ? 'text-error-600' 
                  : 'text-success-600'
              }`}>
                {sortedUpdates.filter(u => u.urgency === 'high').length}
              </div>
              <div className="text-sm text-gray-600">High Priority</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">
                {sortedUpdates.filter(u => u.impact_on_creators === 'positive').length}
              </div>
              <div className="text-sm text-gray-600">Positive Impact</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning-600">
                {sortedUpdates.filter(u => u.update_type === 'algorithm').length}
              </div>
              <div className="text-sm text-gray-600">Algorithm Changes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success-600">
                {sortedUpdates.filter(u => u.update_type === 'feature').length}
              </div>
              <div className="text-sm text-gray-600">New Features</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-gray-600">
                💡 <strong>Stay Updated:</strong> Platform changes can significantly impact your reach and engagement
              </div>
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors"
                >
                  📧 Get Email Updates
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white text-primary-600 border border-primary-600 rounded-lg font-medium text-sm hover:bg-primary-50 transition-colors"
                >
                  📱 Enable Notifications
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Refresh Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            🔄
          </motion.div>
          <span>Updates refresh every 15 minutes</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlatformUpdatesSection;