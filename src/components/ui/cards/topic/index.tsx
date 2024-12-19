import { motion } from "framer-motion";
import React from "react";
import {
    FiClock,
    FiMinus,
    FiTarget,
    FiTrendingDown,
    FiTrendingUp,
    FiUsers
} from "react-icons/fi";
import PlatformBadge from "../../platform-badge";

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

interface TopicCardProps {
  topic: TrendingTopic;
  size?: "small" | "medium" | "large";
  className?: string;
  index?: number;
}

const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  size = "medium",
  className = "",
  index = 0,
}) => {
  // Get velocity styling with more sophisticated colors
  const getVelocityInfo = (velocity: TrendVelocity) => {
    switch (velocity) {
      case "rising":
        return {
          icon: FiTrendingUp,
          gradient: "from-emerald-400 via-teal-500 to-cyan-600",
          borderGlow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]",
          accentColor: "emerald-500",
          textColor: "text-emerald-700",
          bgColor: "bg-emerald-50",
          ringColor: "ring-emerald-200"
        };
      case "declining":
        return {
          icon: FiTrendingDown,
          gradient: "from-red-400 via-rose-500 to-pink-600",
          borderGlow: "shadow-[0_0_20px_rgba(239,68,68,0.3)]",
          accentColor: "red-500",
          textColor: "text-red-700",
          bgColor: "bg-red-50",
          ringColor: "ring-red-200"
        };
      default:
        return {
          icon: FiMinus,
          gradient: "from-slate-400 via-slate-500 to-slate-600",
          borderGlow: "shadow-[0_0_20px_rgba(100,116,139,0.2)]",
          accentColor: "slate-500",
          textColor: "text-slate-700",
          bgColor: "bg-slate-50",
          ringColor: "ring-slate-200"
        };
    }
  };

  const velocityInfo = getVelocityInfo(topic.trend_velocity);
  const VelocityIcon = velocityInfo.icon;

  // Enhanced engagement styling
  const getEngagementStyling = (score: number) => {
    if (score >= 0.8) {
      return {
        ringGradient: "from-emerald-400 to-teal-500",
        pulseColor: "bg-emerald-400",
        intensity: "high"
      };
    }
    if (score >= 0.6) {
      return {
        ringGradient: "from-blue-400 to-indigo-500",
        pulseColor: "bg-blue-400",
        intensity: "medium"
      };
    }
    return {
      ringGradient: "from-slate-300 to-slate-400",
      pulseColor: "bg-slate-400",
      intensity: "low"
    };
  };

  const engagementStyle = getEngagementStyling(topic.engagement_score);

  // Animation variants
  const containerVariants = {
    initial: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
    hover: {
      y: -12,
      scale: 1.03,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
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

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={`group relative ${className}`}
    >
      {/* Main Card */}
      <div className={`
        relative bg-white rounded-3xl overflow-hidden
        border border-slate-200/50
        ${velocityInfo.borderGlow}
        shadow-[0_8px_30px_rgba(0,0,0,0.06)]
        group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
        transition-all duration-500 h-full
      `}>
        
        {/* Gradient Header Strip */}
        <div className={`h-1.5 bg-gradient-to-r ${velocityInfo.gradient}`} />
        
        {/* Content Container */}
        <div className="p-8">
          
          {/* Header Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-start justify-between mb-4">
              {/* Topic Index */}
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-xl
                bg-gradient-to-br ${velocityInfo.gradient} text-white
                font-black text-sm shadow-lg
              `}>
                {index + 1}
              </div>
              
              {/* Velocity Badge */}
              <div className={`
                flex items-center space-x-2 px-4 py-2 rounded-full
                ${velocityInfo.bgColor} ${velocityInfo.ringColor} ring-1
                ${velocityInfo.textColor}
              `}>
                <VelocityIcon className="w-4 h-4" />
                <span className="text-sm font-bold capitalize">{topic.trend_velocity}</span>
              </div>
            </div>

            {/* Topic Title */}
            <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2">
              {topic.topic}
            </h3>
            
            {/* Duration Subtitle */}
            <div className="flex items-center space-x-2 text-slate-500">
              <FiClock className="w-4 h-4" />
              <span className="text-sm font-medium">
                Trending for {topic.duration_prediction}
              </span>
            </div>
          </motion.div>

          {/* Engagement Section - Central Focus */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center justify-center">
              {/* Circular Progress Ring */}
              <div className="relative">
                {/* Background Ring */}
                <div className="w-32 h-32 rounded-full bg-slate-100" />
                
                {/* Progress Ring */}
                <svg className="absolute inset-0 w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-slate-200"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className={`text-gradient-to-r ${engagementStyle.ringGradient}`}
                    style={{
                      strokeDasharray: `${2 * Math.PI * 56}`,
                    }}
                    initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                    animate={{ 
                      strokeDashoffset: 2 * Math.PI * 56 * (1 - topic.engagement_score),
                      stroke: topic.engagement_score >= 0.8 ? '#10b981' : 
                              topic.engagement_score >= 0.6 ? '#3b82f6' : '#64748b'
                    }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
                
                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-black text-slate-900">
                    {Math.round(topic.engagement_score * 100)}%
                  </div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Engagement
                  </div>
                </div>
                
                {/* Pulse Ring */}
                <motion.div
                  className={`absolute inset-0 w-32 h-32 rounded-full ${engagementStyle.pulseColor} opacity-20`}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.1, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Platforms Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="text-center mb-4">
              <h4 className="text-sm font-bold text-slate-700 mb-3">Active Platforms</h4>
              <div className="flex justify-center items-center flex-wrap gap-3">
                {topic.platforms.map((platform, idx) => (
                  <motion.div
                    key={platform}
                    initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.8 + (idx * 0.1),
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    <PlatformBadge
                      platform={platform}
                      size="lg"
                      variant="subtle"
                      animated
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Info Grid */}
          <motion.div variants={itemVariants} className="space-y-4">
            {/* Demographics */}
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center space-x-2 mb-3">
                <FiUsers className="w-4 h-4 text-slate-600" />
                <h5 className="text-sm font-bold text-slate-700">Target Demographics</h5>
              </div>
              <div className="flex flex-wrap gap-2">
                {topic.demographics.map((demo, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-slate-700 shadow-sm"
                  >
                    {demo}
                  </span>
                ))}
              </div>
            </div>

            {/* Content Types */}
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center space-x-2 mb-3">
                <FiTarget className="w-4 h-4 text-slate-600" />
                <h5 className="text-sm font-bold text-slate-700">Content Types</h5>
              </div>
              <div className="flex flex-wrap gap-2">
                {topic.content_types.map((type, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-slate-700 shadow-sm capitalize"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subtle Glow Effect on Hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)`
          }}
        />
        
        {/* Moving Highlight */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)`,
            transform: 'translateX(-100%)',
          }}
          animate={{
            transform: ['translateX(-100%)', 'translateX(100%)'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          className="opacity-0 group-hover:opacity-100"
        />
      </div>
    </motion.div>
  );
};

export default TopicCard;