
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OpportunityCard from '@buffbyte/components/ui/cards/oppurtunity-card';

type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook';

interface CreatorOpportunity {
  niche: string;
  demand_level: number; // 0 to 1
  competition_level: number; // 0 to 1 
  monetization_potential: number; // 0 to 1
  recommended_platforms: Platform[];
}

interface CreatorOpportunitiesSectionProps {
  opportunities: CreatorOpportunity[];
  selectedCountry: string;
  loading?: boolean;
  onOpportunityClick?: (opportunity: CreatorOpportunity) => void;
  className?: string;
}

const CreatorOpportunitiesSection: React.FC<CreatorOpportunitiesSectionProps> = ({
  opportunities,
  selectedCountry,
  loading = false,
  onOpportunityClick,
  className = ''
}) => {
  const [sortBy, setSortBy] = useState<'score' | 'demand' | 'monetization'>('score');
  const [filterBy, setFilterBy] = useState<'all' | 'excellent' | 'good'>('all');
  const [expandedView, setExpandedView] = useState(false);

  // Calculate opportunity score
  const calculateScore = (opp: CreatorOpportunity) => {
    return (
      (opp.demand_level * 0.4) +
      ((1 - opp.competition_level) * 0.3) +
      (opp.monetization_potential * 0.3)
    );
  };

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

  // Sort opportunities
  const sortedOpportunities = [...opportunities].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return calculateScore(b) - calculateScore(a);
      case 'demand':
        return b.demand_level - a.demand_level;
      case 'monetization':
        return b.monetization_potential - a.monetization_potential;
      default:
        return 0;
    }
  });

  // Filter opportunities
  const filteredOpportunities = sortedOpportunities.filter(opp => {
    const score = calculateScore(opp);
    switch (filterBy) {
      case 'excellent':
        return score >= 0.8;
      case 'good':
        return score >= 0.6 && score < 0.8;
      case 'all':
      default:
        return true;
    }
  });

  // Get top opportunities
  const topOpportunities = filteredOpportunities.slice(0, expandedView ? filteredOpportunities.length : 3);

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
        staggerChildren: 0.15
      }
    }
  };

  const showcaseVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const statsVariants = {
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

  // Loading skeleton
  const renderSkeleton = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            variants={skeletonVariants}
            animate="animate"
            className="h-80 bg-gray-200 rounded-xl animate-pulse"
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
              💎 Creator Opportunities
            </h2>
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-2xl"
            >
              🚀
            </motion.div>
          </div>
          <p className="text-gray-600">
            High-potential niches and untapped markets in{' '}
            <span className="font-semibold text-primary-600">
              {getCountryName(selectedCountry)}
            </span>
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div variants={controlsVariants} className="flex flex-wrap items-center gap-3">
          {/* Filter Dropdown */}
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as typeof filterBy)}
            className="
              px-3 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              transition-all duration-200
            "
          >
            <option value="all">All Opportunities</option>
            <option value="excellent">Excellent (80%+)</option>
            <option value="good">Good (60-80%)</option>
          </select>

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
            <option value="score">Sort by Score</option>
            <option value="demand">Sort by Demand</option>
            <option value="monetization">Sort by Revenue</option>
          </select>

          {/* View Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpandedView(!expandedView)}
            className="
              px-4 py-2 bg-primary-600 text-white rounded-lg font-medium text-sm 
              hover:bg-primary-700 transition-colors flex items-center space-x-2
            "
          >
            <span>{expandedView ? 'Show Less' : 'View All'}</span>
            <motion.svg
              className="w-4 h-4"
              animate={{ rotate: expandedView ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Premium Showcase Container */}
      <motion.div
        variants={showcaseVariants}
        className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Showcase Header */}
        <div className="relative bg-gradient-to-r from-purple-800/50 to-blue-800/50 px-6 py-4 border-b border-purple-700/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">💎</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Opportunity Showcase
                </h3>
                <p className="text-purple-200 text-sm">
                  Curated high-potential niches for creators
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
              <span className="text-green-300 text-sm font-medium">
                {filteredOpportunities.length} Active
              </span>
            </div>
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`
                }}
              />
            ))}
          </div>
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
            ) : topOpportunities.length > 0 ? (
              <motion.div
                key={`${sortBy}-${filterBy}-${expandedView}`}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, y: 20 }}
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {topOpportunities.map((opportunity, index) => (
                  <OpportunityCard
                    key={`${opportunity.niche}-${index}`}
                    opportunity={opportunity}
                    index={index}
                    onClick={() => onOpportunityClick?.(opportunity)}
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
                <h3 className="text-xl font-semibold text-white">
                  No opportunities found
                </h3>
                <p className="text-purple-200">
                  Try adjusting your filters or check back later for new opportunities
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setFilterBy('all');
                    setSortBy('score');
                  }}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Showcase Footer */}
        <div className="px-6 py-4 bg-gray-800/50 border-t border-purple-700/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-purple-200">
              Showing {topOpportunities.length} of {filteredOpportunities.length} opportunities
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-purple-200">Updated:</span>
              <span className="text-sm text-white font-medium">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Summary */}
      {opportunities.length > 0 && (
        <motion.div
          variants={statsVariants}
          className="bg-gradient-to-r from-primary-50 to-success-50 rounded-lg p-6 border border-primary-100"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {opportunities.filter(opp => calculateScore(opp) >= 0.8).length}
              </div>
              <div className="text-sm text-gray-600">Excellent Opportunities</div>
              <div className="text-xs text-gray-500 mt-1">80%+ Score</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-success-600 mb-1">
                {Math.round(
                  opportunities.reduce((acc, opp) => acc + opp.demand_level, 0) / 
                  opportunities.length * 100
                )}%
              </div>
              <div className="text-sm text-gray-600">Avg Market Demand</div>
              <div className="text-xs text-gray-500 mt-1">Across all niches</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-warning-600 mb-1">
                {Math.round(
                  opportunities.reduce((acc, opp) => acc + (1 - opp.competition_level), 0) / 
                  opportunities.length * 100
                )}%
              </div>
              <div className="text-sm text-gray-600">Low Competition</div>
              <div className="text-xs text-gray-500 mt-1">Market availability</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {Math.round(
                  opportunities.reduce((acc, opp) => acc + opp.monetization_potential, 0) / 
                  opportunities.length * 100
                )}%
              </div>
              <div className="text-sm text-gray-600">Revenue Potential</div>
              <div className="text-xs text-gray-500 mt-1">Monetization score</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm text-gray-600">
                💡 <strong>Pro Tip:</strong> Focus on opportunities with high demand and low competition for best results
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium text-sm hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                🎯 Get Personalized Plan
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CreatorOpportunitiesSection;