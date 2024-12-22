import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASING } from '../../../../types';
import {
  FiHash,
  FiTrendingUp,
  FiCopy,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import PlatformTabs from "@buffbyte/components/ui/platform-tabs";

type Platform = "twitter" | "instagram" | "tiktok" | "linkedin";

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
  className?: string;
}

const ViralHashtagsSection: React.FC<ViralHashtagsSectionProps> = ({
  hashtags,
  selectedCountry,
  loading = false,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<Platform>("twitter");

  // Create platform tabs with counts
  const platformTabs = [
    {
      platform: "twitter" as Platform,
      label: "Twitter",
      count: hashtags.twitter?.length || 0,
      enabled: (hashtags.twitter?.length || 0) > 0,
    },
    {
      platform: "instagram" as Platform,
      label: "Instagram",
      count: hashtags.instagram?.length || 0,
      enabled: (hashtags.instagram?.length || 0) > 0,
    },
    {
      platform: "tiktok" as Platform,
      label: "TikTok",
      count: hashtags.tiktok?.length || 0,
      enabled: (hashtags.tiktok?.length || 0) > 0,
    },
    {
      platform: "linkedin" as Platform,
      label: "LinkedIn",
      count: hashtags.linkedin?.length || 0,
      enabled: (hashtags.linkedin?.length || 0) > 0,
    },
  ];

  // Get current platform hashtags
  const currentHashtags = hashtags[activeTab] || [];
  console.log("Current Hashtags:", currentHashtags, hashtags);
  // Get country display name
  const getCountryName = (code: string): string => {
    const countryNames: Record<string, string> = {
      us: "United States",
      uk: "United Kingdom",
      nigeria: "Nigeria",
      ca: "Canada",
      au: "Australia",
    };
    return countryNames[code] || code.toUpperCase();
  };

  // Get platform styling
  const getPlatformStyling = (platform: Platform) => {
    const styles = {
      twitter: {
        gradient: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        accentColor: "blue-500",
      },
      instagram: {
        gradient: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-50",
        textColor: "text-purple-700",
        accentColor: "purple-500",
      },
      tiktok: {
        gradient: "from-slate-800 to-slate-600",
        bgColor: "bg-slate-50",
        textColor: "text-slate-700",
        accentColor: "slate-600",
      },
      linkedin: {
        gradient: "from-blue-700 to-blue-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        accentColor: "blue-600",
      },
    };
    return styles[platform];
  };

  const platformStyle = getPlatformStyling(activeTab);

  // Format numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  // Get hashtag metrics based on platform
  const getHashtagMetrics = (hashtag: ViralHashtag, platform: Platform) => {
    switch (platform) {
      case "twitter":
        return {
          primary: { label: "Volume", value: formatNumber(hashtag.volume) },
          secondary: {
            label: "Engagement",
            value: `${Math.round(hashtag.engagement_rate * 100)}%`,
          },
          tags: hashtag.related_topics?.slice(0, 3) || [],
        };
      case "instagram":
        return {
          primary: { label: "Posts", value: formatNumber(hashtag.posts_count) },
          secondary: {
            label: "Engagement",
            value: `${Math.round(hashtag.engagement_rate * 100)}%`,
          },
          tags: hashtag.content_type ? [hashtag.content_type] : [],
        };
      case "tiktok":
        return {
          primary: { label: "Views", value: formatNumber(hashtag.views) },
          secondary: {
            label: "Trend Score",
            value: `${Math.round(hashtag.trend_score * 100)}`,
          },
          tags: hashtag.music_associated ? ["Music"] : ["Original"],
        };
      case "linkedin":
        return {
          primary: {
            label: "Relevance",
            value: `${Math.round(hashtag.professional_relevance * 100)}%`,
          },
          secondary: { label: "Industry", value: hashtag.industry },
          tags: hashtag.engagement_type ? [hashtag.engagement_type] : [],
        };
      default:
        return {
          primary: { label: "", value: "" },
          secondary: { label: "", value: "" },
          tags: [],
        };
    }
  };

  // Animation variants
  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: EASING.smooth,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASING.smooth },
    },
  };


  // Copy all hashtags
  const copyAllHashtags = () => {
    const hashtagsText = currentHashtags.map((h) => h.tag).join(" ");
    navigator.clipboard.writeText(hashtagsText);
  };

  // Loading skeleton
  const renderSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-24 bg-slate-100 rounded-2xl animate-pulse" />
      ))}
    </div>
  );

  return (
    <motion.div
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      className={`space-y-8 ${className}`}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center space-y-3">
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-2">
            <FiHash className="w-7 h-7 text-blue-500" />
            <h2 className="text-3xl font-bold text-slate-900">
              Viral Hashtags
            </h2>
          </div>
          <div className="flex items-center space-x-1 bg-emerald-50 px-3 py-1 rounded-full">
            <HiSparkles className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-700">
              Trending
            </span>
          </div>
        </div>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Discover the most engaging hashtags to maximize your reach in{" "}
          <span className="font-semibold text-blue-600">
            {getCountryName(selectedCountry)}
          </span>
        </p>
      </motion.div>

      {/* Main Container */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden"
      >
        {/* Header Strip */}
        <div className={`h-1.5 bg-gradient-to-r ${platformStyle.gradient}`} />

        {/* Platform Tabs */}
        <div className="p-6 pb-4 border-b border-slate-100">
          <PlatformTabs
            tabs={platformTabs}
            activeTab={activeTab}
            onTabChange={(platform) => setActiveTab(platform as Platform)}
            variant="pills"
            size="lg"
            showCounts
          />
        </div>

        {/* Content */}
        <div className="p-6">
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
            ) : currentHashtags.length > 0 ? (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {currentHashtags.map((hashtag, index) => {
                  const metrics = getHashtagMetrics(hashtag, activeTab);

                  return (
                    <motion.div
                      key={`${hashtag.tag}-${index}`}
                      className="group bg-slate-50/50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        {/* Left Side - Hashtag and Rank */}
                        <div className="flex items-center space-x-4">
                          {/* Rank Badge */}
                          <div
                            className={`
                            flex items-center justify-center w-10 h-10 rounded-xl
                            bg-gradient-to-br ${platformStyle.gradient} text-white
                            font-bold text-sm shadow-lg
                          `}
                          >
                            {index + 1}
                          </div>

                          {/* Hashtag Info */}
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">
                              {hashtag.tag}
                            </h3>
                            {metrics.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {metrics.tags.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-white rounded-md text-xs font-medium text-slate-600 border border-slate-200"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right Side - Metrics */}
                        <div className="flex items-center space-x-8">
                          {/* Primary Metric */}
                          <div className="text-right">
                            <div className="text-2xl font-black text-slate-900">
                              {metrics.primary.value}
                            </div>
                            <div className="text-sm font-medium text-slate-500">
                              {metrics.primary.label}
                            </div>
                          </div>

                          {/* Secondary Metric */}
                          <div className="text-right">
                            <div className="text-xl font-bold text-slate-700">
                              {metrics.secondary.value}
                            </div>
                            <div className="text-sm font-medium text-slate-500">
                              {metrics.secondary.label}
                            </div>
                          </div>

                          {/* Trending Indicator */}
                          <div
                            className={`
                            flex items-center justify-center w-10 h-10 rounded-xl
                            ${platformStyle.bgColor} ${platformStyle.textColor}
                          `}
                          >
                            <FiTrendingUp className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16 space-y-4"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                  <FiHash className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700">
                  No hashtags available
                </h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  We're currently analyzing trending hashtags for {activeTab}.
                  Check back soon for fresh insights.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions Footer */}
        {currentHashtags.length > 0 && (
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Showing {currentHashtags.length} trending hashtags for{" "}
                <span className="font-medium capitalize">{activeTab}</span>
              </div>

              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={copyAllHashtags}
                  className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-slate-300 transition-all duration-200"
                >
                  <FiCopy className="w-4 h-4" />
                  <span>Copy All</span>
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ViralHashtagsSection;
