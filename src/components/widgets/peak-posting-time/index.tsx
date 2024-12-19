import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PostingTimeSlot from '@buffbyte/components/ui/posting-time-slot';

type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook';

interface PostingTime {
  platform: Platform;
  time: string; // Format: "HH:MM"
  timezone: string;
  engagement_boost: number; // 0 to 1
}

interface PeakPostingTimesSectionProps {
  postingTimes: PostingTime[];
  selectedCountry: string;
  loading?: boolean;
  onTimeSelect?: (time: PostingTime) => void;
  className?: string;
}

const PeakPostingTimesSection: React.FC<PeakPostingTimesSectionProps> = ({
  postingTimes,
  selectedCountry,
  loading = false,
  onTimeSelect,
  className = ''
}) => {
  const [viewMode, setViewMode] = useState<'clock' | 'timeline' | 'grid'>('clock');
  const [selectedTime, setSelectedTime] = useState<PostingTime | null>(null);
  const [filterPlatform, setFilterPlatform] = useState<Platform | 'all'>('all');

  // Get country display name
  const getCountryName = (code: string): string => {
    const countryNames: Record<string, string> = {
      'us': 'United States',
      'uk': 'United Kingdom',
      'nigeria': 'Nigeria',
      'ca': 'Canada',
      'au': 'Australia'
    };
    return countryNames[code] || code.toUpperCase();
  };

  // Filter times by platform
  const filteredTimes = filterPlatform === 'all' 
    ? postingTimes 
    : postingTimes.filter(time => time.platform === filterPlatform);

  // Get unique platforms
  const platforms = Array.from(new Set(postingTimes.map(time => time.platform)));

  // Convert time to hours for clock positioning
  const timeToHours = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours + (minutes / 60);
  };

  // Get clock position for time
  const getClockPosition = (timeString: string, radius: number = 120) => {
    const hours = timeToHours(timeString);
    const angle = (hours * 30) - 90; // 30 degrees per hour, -90 to start at 12
    const radians = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radians) * radius,
      y: Math.sin(radians) * radius
    };
  };

  // Format time to 12-hour format
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Get platform color
  const getPlatformColor = (platform: Platform) => {
    const colors = {
      twitter: '#1DA1F2',
      instagram: '#E4405F', 
      tiktok: '#000000',
      linkedin: '#0A66C2',
      youtube: '#FF0000',
      facebook: '#1877F2'
    };
    return colors[platform] || '#6B7280';
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

  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05
      }
    }
  };

  const clockVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const dotVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: {
      scale: 1.3,
      transition: { duration: 0.2 }
    }
  };

  const timelineVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
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

  // Handle time selection
  const handleTimeSelect = (time: PostingTime) => {
    setSelectedTime(time);
    onTimeSelect?.(time);
  };

  // Loading skeleton
  const renderSkeleton = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            variants={skeletonVariants}
            animate="animate"
            className="h-48 bg-gray-200 rounded-lg animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
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
              ⏰ Peak Posting Times
            </h2>
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-2xl"
            >
              📅
            </motion.div>
          </div>
          <p className="text-gray-600">
            Optimal times to maximize engagement in{' '}
            <span className="font-semibold text-primary-600">
              {getCountryName(selectedCountry)}
            </span>
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div variants={controlsVariants} className="flex flex-wrap items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['clock', 'timeline', 'grid'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 capitalize
                  ${viewMode === mode 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {mode === 'clock' && '🕐'} {mode === 'timeline' && '📊'} {mode === 'grid' && '⊞'} {mode}
              </button>
            ))}
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
        ) : (
          <motion.div
            key={`${viewMode}-${filterPlatform}`}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, y: 20 }}
          >
            {/* Clock View */}
            {viewMode === 'clock' && (
              <motion.div
                variants={clockVariants}
                className="flex justify-center items-center py-8"
              >
                <div className="relative">
                  {/* Clock Face */}
                  <div className="w-80 h-80 rounded-full border-4 border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-lg relative">
                    {/* Hour Markers */}
                    {Array.from({ length: 12 }, (_, i) => {
                      const hour = i === 0 ? 12 : i;
                      const angle = (i * 30) - 90;
                      const radians = (angle * Math.PI) / 180;
                      const x = Math.cos(radians) * 130;
                      const y = Math.sin(radians) * 130;
                      
                      return (
                        <div
                          key={i}
                          className="absolute w-6 h-6 flex items-center justify-center text-sm font-semibold text-gray-600"
                          style={{
                            left: `calc(50% + ${x}px - 12px)`,
                            top: `calc(50% + ${y}px - 12px)`
                          }}
                        >
                          {hour}
                        </div>
                      );
                    })}

                    {/* Center Dot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary-600 rounded-full shadow-md"></div>

                    {/* Posting Time Dots */}
                    {filteredTimes.map((time, index) => {
                      const position = getClockPosition(time.time);
                      const isSelected = selectedTime?.time === time.time && selectedTime?.platform === time.platform;
                      
                      return (
                        <motion.div
                          key={`${time.platform}-${time.time}`}
                          variants={dotVariants}
                          initial="initial"
                          animate="animate"
                          whileHover="hover"
                          custom={index}
                          className="absolute cursor-pointer group"
                          style={{
                            left: `calc(50% + ${position.x}px)`,
                            top: `calc(50% + ${position.y}px)`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          onClick={() => handleTimeSelect(time)}
                        >
                          <div
                            className={`
                              w-4 h-4 rounded-full border-3 transition-all duration-200
                              ${isSelected 
                                ? 'ring-4 ring-primary-200 scale-125' 
                                : 'hover:scale-110'
                              }
                            `}
                            style={{
                              backgroundColor: getPlatformColor(time.platform),
                              borderColor: isSelected ? '#0284c7' : 'white',
                              opacity: 0.3 + (time.engagement_boost * 0.7)
                            }}
                          />
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              {formatTime(time.time)} • {time.platform} • +{Math.round(time.engagement_boost * 100)}%
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-4">
                    {platforms.map(platform => (
                      <div key={platform} className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getPlatformColor(platform) }}
                        />
                        <span className="text-sm text-gray-600 capitalize">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Timeline View */}
            {viewMode === 'timeline' && (
              <motion.div variants={timelineVariants} className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">24-Hour Timeline</h3>
                  
                  <div className="relative">
                    {/* Timeline Base */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                    
                    {/* Hour Markers */}
                    <div className="space-y-8">
                      {Array.from({ length: 24 }, (_, hour) => {
                        const hourTimes = filteredTimes.filter(time => {
                          const timeHour = parseInt(time.time.split(':')[0]);
                          return timeHour === hour;
                        });
                        
                        return (
                          <div key={hour} className="relative flex items-center space-x-4">
                            <div className="w-12 text-sm font-medium text-gray-500 text-right">
                              {hour === 0 ? '12 AM' : hour <= 12 ? `${hour} AM` : `${hour - 12} PM`}
                            </div>
                            
                            <div className="flex-1 relative">
                              {hourTimes.length > 0 ? (
                                <div className="flex space-x-2">
                                  {hourTimes.map((time, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ scale: 0, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      transition={{ delay: hour * 0.02 + idx * 0.1 }}
                                      className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                                      onClick={() => handleTimeSelect(time)}
                                    >
                                      <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: getPlatformColor(time.platform) }}
                                      />
                                      <span className="text-sm font-medium text-gray-700 capitalize">
                                        {time.platform}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        +{Math.round(time.engagement_boost * 100)}%
                                      </span>
                                    </motion.div>
                                  ))}
                                </div>
                              ) : (
                                <div className="h-px bg-gray-100"></div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTimes.map((time, index) => (
                  <PostingTimeSlot
                    key={`${time.platform}-${time.time}`}
                    postingTime={time}
                    index={index}
                    selected={selectedTime?.time === time.time && selectedTime?.platform === time.platform}
                    onClick={() => handleTimeSelect(time)}
                  />
                ))}
              </div>
            )}

            {/* Selected Time Details */}
            <AnimatePresence>
              {selectedTime && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="bg-gradient-to-r from-primary-50 to-success-50 rounded-xl p-6 border border-primary-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Selected Time: {formatTime(selectedTime.time)}
                      </h3>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: getPlatformColor(selectedTime.platform) }}
                          />
                          <span className="font-medium text-gray-700 capitalize">
                            {selectedTime.platform}
                          </span>
                        </div>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-600">{selectedTime.timezone}</span>
                        <span className="text-gray-500">•</span>
                        <span className="font-semibold text-success-600">
                          +{Math.round(selectedTime.engagement_boost * 100)}% Engagement Boost
                        </span>
                      </div>
                      <p className="text-gray-600">
                        This is an optimal time to post on {selectedTime.platform} for maximum engagement.
                        Your content is likely to receive {Math.round(selectedTime.engagement_boost * 100)}% more 
                        engagement compared to off-peak times.
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setSelectedTime(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            {filteredTimes.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="text-6xl opacity-50">⏰</div>
                <h3 className="text-xl font-semibold text-gray-700">
                  No posting times found
                </h3>
                <p className="text-gray-500">
                  {filterPlatform === 'all' 
                    ? 'No optimal posting times available for this region'
                    : `No optimal posting times found for ${filterPlatform}`
                  }
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Stats */}
      {filteredTimes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-primary-50 to-success-50 rounded-lg p-4 border border-primary-100"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-600">
                {filteredTimes.length}
              </div>
              <div className="text-sm text-gray-600">Optimal Times</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success-600">
                {Math.round(filteredTimes.reduce((acc, time) => acc + time.engagement_boost, 0) / filteredTimes.length * 100)}%
              </div>
              <div className="text-sm text-gray-600">Avg Boost</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning-600">
                {Math.max(...filteredTimes.map(time => Math.round(time.engagement_boost * 100)))}%
              </div>
              <div className="text-sm text-gray-600">Peak Boost</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {platforms.length}
              </div>
              <div className="text-sm text-gray-600">Platforms</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PeakPostingTimesSection;