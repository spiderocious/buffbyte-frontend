import React from 'react';
import { motion } from 'framer-motion';
import CopyButton from '@buffbyte/components/ui/copy';

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

type HashtagData = TwitterHashtag | InstagramHashtag | TikTokHashtag | LinkedInHashtag;
type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin';

interface HashtagItemProps {
  hashtag: HashtagData;
  platform: Platform;
  rank?: number;
  onClick?: () => void;
  className?: string;
}

const HashtagItem: React.FC<HashtagItemProps> = ({
  hashtag,
  platform,
  rank,
  onClick,
  className = ''
}) => {
  // Format numbers for display
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Format percentage
  const formatPercentage = (rate: number): string => {
    return `${(rate * 100).toFixed(1)}%`;
  };

  // Get engagement color based on rate/score
  const getEngagementColor = (value: number): string => {
    if (value >= 0.8) return 'text-success-600 bg-success-100';
    if (value >= 0.6) return 'text-primary-600 bg-primary-100';
    if (value >= 0.4) return 'text-warning-600 bg-warning-100';
    return 'text-error-600 bg-error-100';
  };

  // Platform-specific rendering
  const renderPlatformStats = () => {
    switch (platform) {
      case 'twitter':
        const twitterData = hashtag as TwitterHashtag;
        return (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {formatNumber(twitterData.volume)} tweets
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(twitterData.engagement_rate)}`}>
                {formatPercentage(twitterData.engagement_rate)} engagement
              </span>
            </div>
          </div>
        );

      case 'instagram':
        const instagramData = hashtag as InstagramHashtag;
        return (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {formatNumber(instagramData.posts_count)} posts
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full capitalize">
                {instagramData.content_type}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(instagramData.engagement_rate)}`}>
                {formatPercentage(instagramData.engagement_rate)}
              </span>
            </div>
          </div>
        );

      case 'tiktok':
        const tiktokData = hashtag as TikTokHashtag;
        return (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {formatNumber(tiktokData.views)} views
              </span>
              {tiktokData.music_associated && (
                <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  🎵 Music
                </span>
              )}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(tiktokData.trend_score)}`}>
                {formatPercentage(tiktokData.trend_score)} trend
              </span>
            </div>
          </div>
        );

      case 'linkedin':
        const linkedinData = hashtag as LinkedInHashtag;
        return (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full capitalize">
                {linkedinData.industry}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full capitalize">
                {linkedinData.engagement_type}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(linkedinData.professional_relevance)}`}>
                {formatPercentage(linkedinData.professional_relevance)} relevant
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Animation variants
  const itemVariants = {
    initial: { 
      opacity: 0, 
      x: -20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: (rank || 0) * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      x: 5,
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

  const hashtagVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { delay: 0.2 + ((rank || 0) * 0.1) }
    },
    hover: {
      color: '#0284c7',
      transition: { duration: 0.2 }
    }
  };

  const rankVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: 0.1 + ((rank || 0) * 0.1),
        type: "spring",
        stiffness: 200
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap={onClick ? "tap" : undefined}
      onClick={onClick}
      className={`
        group relative bg-white border border-gray-200 hover:border-primary-300
        rounded-lg p-4 transition-all duration-200 hover:shadow-md
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className="flex items-start justify-between space-x-4">
        {/* Left side - Rank and Hashtag */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {/* Rank indicator */}
          {typeof rank === 'number' && (
            <motion.div
              variants={rankVariants}
              initial="initial"
              animate="animate"
              className={`
                flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                ${rank <= 3 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-500'
                }
              `}
            >
              {rank}
            </motion.div>
          )}

          {/* Hashtag */}
          <motion.div 
            variants={hashtagVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex-1 min-w-0"
          >
            <h4 className="text-lg font-semibold text-primary-600 truncate">
              {hashtag.tag}
            </h4>
          </motion.div>
        </div>

        {/* Right side - Copy button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + ((rank || 0) * 0.1) }}
          className="flex-shrink-0"
        >
          <CopyButton
            textToCopy={hashtag.tag}
            size="sm"
            variant="ghost"
            onCopy={(text) => console.log(`Copied: ${text}`)}
          />
        </motion.div>
      </div>

      {/* Platform-specific stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 + ((rank || 0) * 0.1) }}
        className="mt-3"
      >
        {renderPlatformStats()}
      </motion.div>

      {/* Twitter related topics */}
      {platform === 'twitter' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + ((rank || 0) * 0.1) }}
          className="mt-2"
        >
          <div className="flex flex-wrap gap-1">
            {(hashtag as TwitterHashtag).related_topics.slice(0, 3).map((topic, idx) => (
              <motion.span
                key={topic}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + (idx * 0.1) }}
                className="inline-block px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-md"
              >
                {topic}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Trending indicator for high-performing hashtags */}
      {'engagement_rate' in hashtag && hashtag.engagement_rate >= 0.8 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="absolute -top-2 -right-2 w-4 h-4 bg-success-500 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs">🔥</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HashtagItem;