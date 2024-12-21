import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopicCard from "@buffbyte/components/ui/cards/topic";
import { HiFire, HiSparkles } from "react-icons/hi2";

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
  const [viewMode] = useState<"grid" | "featured">("grid");
  const [sortBy] = useState<"engagement" | "velocity" | "duration">(
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
            <div className="flex items-center space-x-2">
              <HiFire className="w-7 h-7 text-orange-500" />
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
                Trending Now
              </h2>
            </div>
            <div className="flex items-center space-x-1 bg-emerald-50 px-3 py-1 rounded-full">
              <HiSparkles className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-700">Live</span>
            </div>
          </div>
          <p className="text-slate-600">
            Discover what's capturing attention in{" "}
            <span className="font-semibold text-blue-600">
              {getCountryName(selectedCountry)}
            </span>
          </p>
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
                        ease: "easeInOut" as const,
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
    </motion.div>
  );
};

export default TrendingTopicsSection;
