import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopicCard from "@buffbyte/components/ui/cards/topic";

type Platform =
  | "twitter"
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "youtube"
  | "facebook";
type TrendVelocity = "rising" | "stable" | "declining";

interface TrendingTopic {
  topic: string;
  platforms: Platform[];
  engagement_score: number;
  trend_velocity: TrendVelocity;
  demographics: string[];
  content_types: string[];
  duration_prediction: string;
}

interface TrendingTopicsSectionProps {
  topics: TrendingTopic[];
  selectedCountry: string;
  loading?: boolean;
  onTopicClick?: (topic: TrendingTopic) => void;
  className?: string;
}

const TrendingTopicsSection: React.FC<TrendingTopicsSectionProps> = ({
  topics,
  selectedCountry,
  loading = false,
  onTopicClick,
  className = "",
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "featured">("featured");
  const [sortBy, setSortBy] = useState<"engagement" | "velocity" | "duration">(
    "engagement"
  );

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

  // Sort topics based on selected criteria
  const sortedTopics = [...topics].sort((a, b) => {
    switch (sortBy) {
      case "engagement":
        return b.engagement_score - a.engagement_score;
      case "velocity": {
        const velocityOrder = { rising: 3, stable: 2, declining: 1 };
        return (
          velocityOrder[b.trend_velocity] - velocityOrder[a.trend_velocity]
        );
      }
      case "duration": {
        const durationOrder = { weeks: 3, days: 2, hours: 1 };
        return (
          (durationOrder[b.duration_prediction as keyof typeof durationOrder] ||
            0) -
          (durationOrder[a.duration_prediction as keyof typeof durationOrder] ||
            0)
        );
      }
      default:
        return 0;
    }
  });

  // Get featured topic (highest engagement)
  const featuredTopic = sortedTopics[0];
  const otherTopics = sortedTopics.slice(1);

  // Animation variants
  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  const controlsVariants = {
    initial: { opacity: 0, x: 20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const skeletonVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  // Loading skeleton
  const renderSkeleton = () => (
    <div className="space-y-6">
      {/* Featured skeleton */}
      <motion.div
        variants={skeletonVariants}
        animate="animate"
        className="h-80 bg-gray-200 rounded-xl animate-pulse"
      />

      {/* Grid skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            variants={skeletonVariants}
            animate="animate"
            className="h-64 bg-gray-200 rounded-xl animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <motion.div
        variants={sectionVariants}
        initial="initial"
        animate="animate"
        className={`space-y-6 ${className}`}
      >
        <motion.div
          variants={headerVariants}
          className="flex items-center justify-between"
        >
          <div className="space-y-2">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex space-x-2">
            <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </motion.div>
        {renderSkeleton()}
      </motion.div>
    );
  }

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
              🔥 Trending Now
            </h2>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-2xl"
            >
              📈
            </motion.div>
          </div>
          <p className="text-gray-600">
            Hot topics and trending content in{" "}
            <span className="font-semibold text-primary-600">
              {getCountryName(selectedCountry)}
            </span>
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          variants={controlsVariants}
          className="flex flex-wrap items-center gap-3"
        >
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("featured")}
              className={`
                px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
                ${
                  viewMode === "featured"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
            >
              Featured
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`
                px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
                ${
                  viewMode === "grid"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
            >
              Grid View
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="
              px-3 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              transition-all duration-200
            "
          >
            <option value="engagement">Sort by Engagement</option>
            <option value="velocity">Sort by Velocity</option>
            <option value="duration">Sort by Duration</option>
          </select>
        </motion.div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewMode}-${sortBy}`}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit={{ opacity: 0, y: 20 }}
          className="space-y-6"
        >
          {viewMode === "featured" ? (
            <>
              {/* Featured Topic */}
              {featuredTopic && (
                <motion.div className="relative">
                  <div className="absolute -top-3 -left-3 z-10">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md"
                    >
                      ⭐ Featured
                    </motion.div>
                  </div>
                  <TopicCard
                    topic={featuredTopic}
                    size="large"
                    onClick={() => onTopicClick?.(featuredTopic)}
                    className="border-2 border-primary-200 shadow-lg"
                  />
                </motion.div>
              )}

              {/* Other Topics Grid */}
              {otherTopics.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherTopics.map((topic, index) => (
                    <TopicCard
                      key={`${topic.topic}-${index}`}
                      topic={topic}
                      size="medium"
                      index={index + 1}
                      onClick={() => onTopicClick?.(topic)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedTopics.map((topic, index) => (
                <TopicCard
                  key={`${topic.topic}-${index}`}
                  topic={topic}
                  size="medium"
                  index={index}
                  onClick={() => onTopicClick?.(topic)}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {topics.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="text-6xl opacity-50">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700">
                No trending topics found
              </h3>
              <p className="text-gray-500">
                Try selecting a different country or check back later for
                updates.
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Stats Summary */}
      {topics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-primary-50 to-success-50 rounded-lg p-4 border border-primary-100"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {topics.length}
                </div>
                <div className="text-sm text-gray-600">Total Topics</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success-600">
                  {topics.filter((t) => t.trend_velocity === "rising").length}
                </div>
                <div className="text-sm text-gray-600">Rising ↗️</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning-600">
                  {Math.round(
                    (topics.reduce((acc, t) => acc + t.engagement_score, 0) /
                      topics.length) *
                      100
                  )}
                  %
                </div>
                <div className="text-sm text-gray-600">Avg Engagement</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors"
              onClick={() => {
                // Handle view all trends
              }}
            >
              View All Trends →
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TrendingTopicsSection;
