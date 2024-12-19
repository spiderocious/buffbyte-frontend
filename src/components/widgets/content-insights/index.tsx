import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBarChart,
  FiClock,
  FiTarget,
  FiTrendingUp,
  FiArrowRight,
  FiDownload,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import PlatformBadge from "@buffbyte/components/ui/platform-badge";

type Platform =
  | "twitter"
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "youtube"
  | "facebook";

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
  className = "",
}) => {
  const [activeInsight, setActiveInsight] = useState<
    "formats" | "timing" | "gaps"
  >("formats");

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

  // Format time to 12-hour format
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  // Get score styling
  const getScoreColor = (score: number) => {
    if (score >= 0.8)
      return {
        color: "emerald",
        bgClass: "bg-emerald-50",
        textClass: "text-emerald-700",
        ringClass: "ring-emerald-200",
      };
    if (score >= 0.6)
      return {
        color: "blue",
        bgClass: "bg-blue-50",
        textClass: "text-blue-700",
        ringClass: "ring-blue-200",
      };
    if (score >= 0.4)
      return {
        color: "orange",
        bgClass: "bg-orange-50",
        textClass: "text-orange-700",
        ringClass: "ring-orange-200",
      };
    return {
      color: "red",
      bgClass: "bg-red-50",
      textClass: "text-red-700",
      ringClass: "ring-red-200",
    };
  };

  // Animation variants
  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    hover: {
      y: -4,
      scale: 1.02,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Counter animation component
  const AnimatedCounter: React.FC<{
    value: number;
    suffix?: string;
    duration?: number;
  }> = ({ value, suffix = "", duration = 2 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min(
          (timestamp - startTime) / (duration * 1000),
          1
        );

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * value));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [value, duration]);

    return (
      <span>
        {count}
        {suffix}
      </span>
    );
  };

  // Tab configuration
  const tabs = [
    {
      id: "formats",
      label: "Viral Formats",
      icon: FiBarChart,
      count: insights.viral_formats?.length || 0,
      color: "blue",
    },
    {
      id: "timing",
      label: "Peak Times",
      icon: FiClock,
      count: insights.peak_posting_times?.length || 0,
      color: "emerald",
    },
    {
      id: "gaps",
      label: "Opportunities",
      icon: FiTarget,
      count: insights.content_gaps?.length || 0,
      color: "orange",
    },
  ];

  // Loading skeleton
  const renderSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-32 bg-slate-100 rounded-2xl animate-pulse" />
      ))}
    </div>
  );

  const printPage = () => {
    window.print();
  };

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
            <FiBarChart className="w-7 h-7 text-blue-500" />
            <h2 className="text-3xl font-bold text-slate-900">
              Content Insights
            </h2>
          </div>
          <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full">
            <HiSparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">
              Intelligence
            </span>
          </div>
        </div>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Data-driven insights and recommendations for{" "}
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
        <div className="h-1.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-orange-500" />

        {/* Tab Navigation */}
        <div className="p-6 pb-4 border-b border-slate-100">
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeInsight === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() =>
                    setActiveInsight(tab.id as "formats" | "timing" | "gaps")
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center space-x-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex-1
                    ${
                      isActive
                        ? "bg-slate-100 text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }
                  `}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span
                      className={`
                      px-2 py-0.5 rounded-full text-xs font-bold
                      ${
                        isActive
                          ? "bg-white text-slate-700 shadow-sm"
                          : "bg-slate-200 text-slate-600"
                      }
                    `}
                    >
                      {tab.count}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
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
            ) : (
              <motion.div
                key={activeInsight}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Viral Formats */}
                {activeInsight === "formats" && (
                  <div className="space-y-6">
                    {insights.viral_formats?.map((format, index) => {
                      const scoreStyle = getScoreColor(format.success_rate);

                      return (
                        <motion.div
                          key={index}
                          variants={cardVariants}
                          whileHover="hover"
                          className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-slate-900 mb-2">
                                {format.format}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {format.platforms.map((platform, idx) => (
                                  <PlatformBadge
                                    key={idx}
                                    platform={platform}
                                    size="sm"
                                    variant="subtle"
                                    animated
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Success Rate */}
                            <div className="text-right">
                              <div className="text-3xl font-black text-slate-900">
                                <AnimatedCounter
                                  value={Math.round(format.success_rate * 100)}
                                  suffix="%"
                                  duration={1.5}
                                />
                              </div>
                              <div className="text-sm font-medium text-slate-500">
                                Success Rate
                              </div>
                            </div>
                          </div>

                          {/* Key Elements */}
                          <div className="bg-white/80 rounded-xl p-4 border border-slate-100">
                            <h4 className="text-sm font-bold text-slate-700 mb-3">
                              Key Elements:
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {format.key_elements.map((element, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center space-x-2 text-sm text-slate-600"
                                >
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                  <span className="capitalize">{element}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Peak Posting Times */}
                {activeInsight === "timing" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {insights.peak_posting_times?.map((time, index) => {
                      const boostStyle = getScoreColor(time.engagement_boost);

                      return (
                        <motion.div
                          key={index}
                          variants={cardVariants}
                          whileHover="hover"
                          className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 transition-all duration-300"
                        >
                          {/* Platform Badge */}
                          <div className="flex items-center justify-between mb-4">
                            <PlatformBadge
                              platform={time.platform}
                              size="md"
                              variant="subtle"
                              animated
                            />
                            <span className="text-xs font-medium text-slate-500">
                              {time.timezone}
                            </span>
                          </div>

                          {/* Time Display */}
                          <div className="text-center mb-4">
                            <div className="text-3xl font-black text-slate-900 mb-2">
                              {formatTime(time.time)}
                            </div>
                            <div className="text-sm font-medium text-slate-500">
                              Optimal posting time
                            </div>
                          </div>

                          {/* Engagement Boost */}
                          <div className="bg-white/80 rounded-xl p-4 border border-slate-100">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-slate-600">
                                Engagement Boost
                              </span>
                              <span className="text-xl font-bold text-emerald-600">
                                +
                                <AnimatedCounter
                                  value={Math.round(
                                    time.engagement_boost * 100
                                  )}
                                  suffix="%"
                                  duration={1.5}
                                />
                              </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <motion.div
                                className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${time.engagement_boost * 100}%`,
                                }}
                                transition={{
                                  duration: 1.5,
                                  delay: index * 0.1,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Content Gaps */}
                {activeInsight === "gaps" && (
                  <div className="space-y-6">
                    {insights.content_gaps?.map((gap, index) => {
                      const scoreStyle = getScoreColor(gap.opportunity_score);

                      return (
                        <motion.div
                          key={index}
                          variants={cardVariants}
                          whileHover="hover"
                          className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-slate-900 mb-2">
                                {gap.topic}
                              </h3>
                            </div>

                            {/* Opportunity Score */}
                            <div className="text-right">
                              <div className="text-3xl font-black text-orange-600">
                                <AnimatedCounter
                                  value={Math.round(
                                    gap.opportunity_score * 100
                                  )}
                                  suffix="%"
                                  duration={1.5}
                                />
                              </div>
                              <div className="text-sm font-medium text-slate-500">
                                Opportunity
                              </div>
                            </div>
                          </div>

                          {/* Suggested Angle */}
                          <div className="bg-white/80 rounded-xl p-4 border border-slate-100 mb-4">
                            <h4 className="text-sm font-bold text-slate-700 mb-2">
                              Suggested Approach:
                            </h4>
                            <p className="text-slate-600 leading-relaxed">
                              {gap.suggested_angle}
                            </p>
                          </div>

                          {/* Action Button */}
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-500">
                              Market demand:{" "}
                              <span className="font-semibold text-orange-600">
                                High
                              </span>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors duration-200"
                            >
                              <span>Explore</span>
                              <FiArrowRight className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Based on <span className="font-semibold">10,000+</span> data
              points • Confidence:{" "}
              <span className="font-semibold text-emerald-600">85%</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors duration-200"
              onClick={printPage}
            >
              <FiDownload className="w-4 h-4" />
              <span>Export Report</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContentInsightsSection;
