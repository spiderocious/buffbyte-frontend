import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlatformBadge from '@buffbyte/components/ui/platform-badge';

type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook';

interface ViralFormat {
  format: string;
  platforms: Platform[];
  success_rate: number;
  key_elements: string[];
}

interface PeakPostingTime {
  platform: Platform;
  time: string;
  timezone: string;
  engagement_boost: number;
}

interface ContentGap {
  topic: string;
  opportunity_score: number;
  suggested_angle: string;
}

interface ContentInsights {
  viral_formats: ViralFormat[];
  peak_posting_times: PeakPostingTime[];
  content_gaps: ContentGap[];
}

interface ContentInsightsSectionProps {
  insights: ContentInsights;
  selectedCountry: string;
  loading?: boolean;
  className?: string;
}

const ContentInsightsSection: React.FC<ContentInsightsSectionProps> = ({
  insights,
  selectedCountry,
  loading = false,
  className = ''
}) => {
  const [activeInsight, setActiveInsight] = useState<'formats' | 'timing' | 'gaps'>('formats');
  const [expandedFormat, setExpandedFormat] = useState<number | null>(null);

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

  // Format time to 12-hour format
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Get success rate color
  const getSuccessColor = (rate: number) => {
    if (rate >= 0.8) return 'text-success-600 bg-success-100 border-success-200';
    if (rate >= 0.6) return 'text-primary-600 bg-primary-100 border-primary-200';
    if (rate >= 0.4) return 'text-warning-600 bg-warning-100 border-warning-200';
    return 'text-error-600 bg-error-100 border-error-200';
  };

  // Get opportunity color
  const getOpportunityColor = (score: number) => {
    if (score >= 0.8) return 'text-success-600 bg-success-50 border-success-200';
    if (score >= 0.6) return 'text-primary-600 bg-primary-50 border-primary-200';
    if (score >= 0.4) return 'text-warning-600 bg-warning-50 border-warning-200';
    return 'text-error-600 bg-error-50 border-error-200';
  };

  // Animation variants
  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  const tabsVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" as const }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" as const }
    },
    hover: {
      scale: 1.02,
      y: -2,
      transition: { duration: 0.2 }
    }
  };

  const expandVariants = {
    initial: { height: 0, opacity: 0 },
    animate: { 
      height: 'auto', 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" as const }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const skeletonVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  // Tab configuration
  const tabs = [
    { id: 'formats', label: 'Viral Formats', icon: '🔥', count: insights.viral_formats?.length || 0 },
    { id: 'timing', label: 'Peak Times', icon: '⏰', count: insights.peak_posting_times?.length || 0 },
    { id: 'gaps', label: 'Opportunities', icon: '💡', count: insights.content_gaps?.length || 0 }
  ];

  // Loading skeleton
  const renderSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          variants={skeletonVariants}
          animate="animate"
          className="h-32 bg-gray-200 rounded-lg animate-pulse"
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
      <motion.div variants={headerVariants} className="space-y-2">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            📊 Content Insights
          </h2>
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-2xl"
          >
            🔍
          </motion.div>
        </div>
        <p className="text-gray-600">
          Research-backed insights and data-driven recommendations for{' '}
          <span className="font-semibold text-primary-600">
            {getCountryName(selectedCountry)}
          </span>
        </p>
      </motion.div>

      {/* Report Style Container */}
      <motion.div
        variants={tabsVariants}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {/* Report Header */}
        <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-primary-600 font-bold text-sm">CI</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Content Intelligence Report
                </h3>
                <p className="text-sm text-gray-500">
                  Generated on {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 font-medium">Live Data</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveInsight(tab.id as 'formats' | 'timing' | 'gaps')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                  ${activeInsight === tab.id 
                    ? 'bg-white text-primary-600 shadow-sm border border-primary-200' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }
                `}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs font-bold
                    ${activeInsight === tab.id 
                      ? 'bg-primary-100 text-primary-600' 
                      : 'bg-gray-200 text-gray-600'
                    }
                  `}>
                    {tab.count}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 min-h-96">
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
                key={activeInsight}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, y: 20 }}
              >
                {/* Viral Formats */}
                {activeInsight === 'formats' && (
                  <div className="space-y-4">
                    <motion.div variants={itemVariants} className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        📈 Viral Content Formats
                      </h3>
                      <p className="text-gray-600">
                        Proven content formats with highest success rates in your market
                      </p>
                    </motion.div>

                    {insights.viral_formats?.map((format, index) => (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover="hover"
                        className="border border-gray-200 rounded-lg p-5 cursor-pointer"
                        onClick={() => setExpandedFormat(expandedFormat === index ? null : index)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <h4 className="text-lg font-semibold text-gray-900">
                                {format.format}
                              </h4>
                              <span className={`
                                inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border
                                ${getSuccessColor(format.success_rate)}
                              `}>
                                {Math.round(format.success_rate * 100)}% Success Rate
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-3">
                              {format.platforms.map((platform, idx) => (
                                <PlatformBadge
                                  key={idx}
                                  platform={platform}
                                  size="sm"
                                  variant="subtle"
                                />
                              ))}
                            </div>
                          </div>

                          <motion.div
                            animate={{ rotate: expandedFormat === index ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.div>
                        </div>

                        <AnimatePresence>
                          {expandedFormat === index && (
                            <motion.div
                              variants={expandVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              className="overflow-hidden"
                            >
                              <div className="pt-4 border-t border-gray-100">
                                <h5 className="font-semibold text-gray-800 mb-2">Key Elements:</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {format.key_elements.map((element, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                      className="flex items-center space-x-2"
                                    >
                                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                      <span className="text-sm text-gray-700 capitalize">{element}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Peak Posting Times */}
                {activeInsight === 'timing' && (
                  <div className="space-y-6">
                    <motion.div variants={itemVariants}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        ⏰ Optimal Posting Schedule
                      </h3>
                      <p className="text-gray-600">
                        Best times to post for maximum engagement across platforms
                      </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {insights.peak_posting_times?.map((time, index) => (
                        <motion.div
                          key={index}
                          variants={cardVariants}
                          whileHover="hover"
                          className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg p-5"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <PlatformBadge
                              platform={time.platform}
                              size="sm"
                              variant="solid"
                            />
                            <span className="text-xs text-gray-500">{time.timezone}</span>
                          </div>

                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-1">
                              {formatTime(time.time)}
                            </div>
                            <div className={`
                              inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                              ${getSuccessColor(time.engagement_boost)}
                            `}>
                              +{Math.round(time.engagement_boost * 100)}% Boost
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div
                                className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-success-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${time.engagement_boost * 100}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content Gaps */}
                {activeInsight === 'gaps' && (
                  <div className="space-y-4">
                    <motion.div variants={itemVariants} className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        💡 Content Opportunities
                      </h3>
                      <p className="text-gray-600">
                        Untapped content areas with high potential in your market
                      </p>
                    </motion.div>

                    {insights.content_gaps?.map((gap, index) => (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover="hover"
                        className={`
                          border-2 rounded-lg p-5
                          ${getOpportunityColor(gap.opportunity_score)}
                        `}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-lg font-semibold text-gray-900 flex-1">
                            {gap.topic}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-600">
                              Opportunity Score
                            </span>
                            <span className="text-xl font-bold text-primary-600">
                              {Math.round(gap.opportunity_score * 100)}%
                            </span>
                          </div>
                        </div>

                        <div className="bg-white/60 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-800 mb-2">💡 Suggested Approach:</h5>
                          <p className="text-gray-700 leading-relaxed">
                            {gap.suggested_angle}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            Market Demand: <span className="font-semibold">High</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors"
                          >
                            Explore →
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Report Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Report confidence: <span className="font-semibold text-success-600">85%</span> • 
              Based on <span className="font-semibold">10,000+</span> data points
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors"
            >
              📄 Export Report
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContentInsightsSection;