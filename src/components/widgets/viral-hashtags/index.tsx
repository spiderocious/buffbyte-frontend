import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlatformTabs from '@buffbyte/components/ui/platform-tabs';
import HashtagItem from '@buffbyte/components/ui/hashtag-item';

type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin';

// Platform-specific hashtag data structures
interface TwitterHashtag {
  tag: string;
  volume: number;
  engagement_rate: number;
  related_topics: string[];
}

interface InstagramHashtag {
  tag: string;
  posts_count: number;
  engagement_rate: number;
  content_type: string;
}

interface TikTokHashtag {
  tag: string;
  views: number;
  trend_score: number;
  music_associated: boolean;
}

interface LinkedInHashtag {
  tag: string;
  professional_relevance: number;
  industry: string;
  engagement_type: string;
}

interface HashtagData {
  twitter: TwitterHashtag[];
  instagram: InstagramHashtag[];
  tiktok: TikTokHashtag[];
  linkedin: LinkedInHashtag[];
}

interface ViralHashtagsSectionProps {
  hashtags: HashtagData;
  selectedCountry: string;
  loading?: boolean;
  onHashtagClick?: (hashtag: unknown, platform: Platform) => void;
  className?: string;
}

const ViralHashtagsSection: React.FC<ViralHashtagsSectionProps> = ({
  hashtags,
  selectedCountry,
  loading = false,
  onHashtagClick,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<Platform>('twitter');
  const [searchQuery, setSearchQuery] = useState('');

  // Create platform tabs with counts
  const platformTabs = [
    {
      platform: 'twitter' as Platform,
      label: 'Twitter',
      count: hashtags.twitter?.length || 0,
      enabled: (hashtags.twitter?.length || 0) > 0
    },
    {
      platform: 'instagram' as Platform,
      label: 'Instagram',
      count: hashtags.instagram?.length || 0,
      enabled: (hashtags.instagram?.length || 0) > 0
    },
    {
      platform: 'tiktok' as Platform,
      label: 'TikTok',
      count: hashtags.tiktok?.length || 0,
      enabled: (hashtags.tiktok?.length || 0) > 0
    },
    {
      platform: 'linkedin' as Platform,
      label: 'LinkedIn',
      count: hashtags.linkedin?.length || 0,
      enabled: (hashtags.linkedin?.length || 0) > 0
    }
  ];

  // Get current platform hashtags
  const currentHashtags = hashtags[activeTab] || [];

  // Filter hashtags based on search
  const filteredHashtags = currentHashtags.filter(hashtag =>
    hashtag.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  // Get platform insights
  const getPlatformInsights = (platform: Platform) => {
    const insights = {
      twitter: {
        icon: '🐦',
        title: 'Twitter Trending',
        subtitle: 'Real-time conversations and viral topics',
        color: 'from-blue-500 to-cyan-500'
      },
      instagram: {
        icon: '📷',
        title: 'Instagram Viral',
        subtitle: 'Visual content and engagement leaders',
        color: 'from-purple-500 to-pink-500'
      },
      tiktok: {
        icon: '🎵',
        title: 'TikTok Trending',
        subtitle: 'Short-form video phenomena',
        color: 'from-gray-800 to-gray-600'
      },
      linkedin: {
        icon: '💼',
        title: 'LinkedIn Professional',
        subtitle: 'Industry discussions and networking',
        color: 'from-blue-700 to-blue-500'
      }
    };
    return insights[platform];
  };

  const currentInsight = getPlatformInsights(activeTab);

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

  const terminalVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" as const }
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

  // Loading skeleton
  const renderSkeleton = () => (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
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
      <motion.div variants={headerVariants} className="space-y-2">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            # Viral Hashtags
          </h2>
          <motion.div
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut" as const
            }}
            className="text-2xl"
          >
            ⚡
          </motion.div>
        </div>
        <p className="text-gray-600">
          Discover trending hashtags and maximize your reach in{' '}
          <span className="font-semibold text-primary-600">
            {getCountryName(selectedCountry)}
          </span>
        </p>
      </motion.div>

      {/* Command Center Style Container */}
      <motion.div
        variants={terminalVariants}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-700"
      >
        {/* Terminal Header */}
        <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-error-500 rounded-full"></div>
                <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
                <div className="w-3 h-3 bg-success-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-2xl bg-gradient-to-r ${currentInsight.color} bg-clip-text text-transparent`}>
                  {currentInsight.icon}
                </span>
                <div>
                  <h3 className="text-white font-semibold">
                    {currentInsight.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {currentInsight.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Live indicator */}
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-success-500 rounded-full"
              />
              <span className="text-success-400 text-sm font-mono">
                LIVE
              </span>
            </div>
          </div>
        </div>

        {/* Platform Tabs */}
        <div className="px-6 py-4 bg-gray-850 border-b border-gray-700">
          <PlatformTabs
            tabs={platformTabs}
            activeTab={activeTab}
            onTabChange={(platform) => setActiveTab(platform as Platform)}
            variant="pills"
            size="md"
            showCounts
          />
        </div>

        {/* Search and Stats */}
        <div className="px-6 py-4 bg-gray-850 border-b border-gray-700">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder={`Search ${activeTab} hashtags...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg
                  text-white placeholder-gray-400 font-mono text-sm
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                  transition-all duration-200
                "
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm font-mono">
              <div className="text-gray-300">
                <span className="text-primary-400">{filteredHashtags.length}</span> hashtags
              </div>
              <div className="text-gray-300">
                Platform: <span className="text-warning-400 capitalize">{activeTab}</span>
              </div>
              <div className="text-gray-300">
                Status: <span className="text-success-400">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 bg-gray-900 min-h-96">
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
            ) : filteredHashtags.length > 0 ? (
              <motion.div
                key={`${activeTab}-${searchQuery}`}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, y: 20 }}
                className="space-y-3"
              >
                {filteredHashtags.map((hashtag, index) => (
                  <HashtagItem
                    key={`${hashtag.tag}-${index}`}
                    hashtag={hashtag}
                    platform={activeTab}
                    rank={index + 1}
                    onClick={() => onHashtagClick?.(hashtag, activeTab)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12 space-y-4"
              >
                <div className="text-6xl opacity-30">🔍</div>
                <h3 className="text-xl font-semibold text-gray-300">
                  {searchQuery ? 'No hashtags found' : 'No hashtags available'}
                </h3>
                <p className="text-gray-500">
                  {searchQuery 
                    ? `Try adjusting your search term for ${activeTab}` 
                    : `No trending hashtags found for ${activeTab} in this region`
                  }
                </p>
                {searchQuery && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors"
                  >
                    Clear Search
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Terminal Footer */}
        <div className="px-6 py-3 bg-gray-800 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400">
            <div className="flex items-center space-x-4">
              <span>└─ buffbyte-hashtag-analyzer</span>
              <span className="text-success-400">●</span>
              <span>Connected</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Last updated:</span>
              <span className="text-primary-400">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      {filteredHashtags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-primary-50 to-success-50 rounded-lg p-4 border border-primary-100"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                Quick Actions:
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-white text-primary-600 rounded-md font-medium text-sm border border-primary-200 hover:border-primary-300 transition-colors"
                onClick={() => {
                  // Copy all hashtags
                  const hashtagsText = filteredHashtags.map(h => h.tag).join(' ');
                  navigator.clipboard.writeText(hashtagsText);
                }}
              >
                📋 Copy All
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-white text-success-600 rounded-md font-medium text-sm border border-success-200 hover:border-success-300 transition-colors"
                onClick={() => {
                  // Export as CSV
                }}
              >
                📊 Export CSV
              </motion.button>
            </div>
            
            <div className="text-sm text-gray-600">
              Showing top {filteredHashtags.length} hashtags for {activeTab}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ViralHashtagsSection;