import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASING } from '../../../../types';
import { FiPlus, FiFilter, FiClock } from 'react-icons/fi';
import SearchInput from '@buffbyte/components/ui/search-input';
import AnalysisHistoryItem from '@buffbyte/components/ui/analysis-history-item';
import EmptyStateCard from '../empty';
import LoadingSpinner from '@buffbyte/components/ui/loading-spinner';

interface AnalysisItem {
  id: string;
  message: string;
  createdAt: string;
  score?: number;
  platform?: string;
  wordCount?: number;
}

interface AnalysisHistorySidebarProps {
  analyses: AnalysisItem[];
  selectedAnalysis?: AnalysisItem | null;
  onAnalysisSelect: (analysis: AnalysisItem) => void;
  onNewAnalysis: () => void;
  loading?: boolean;
  className?: string;
}

const AnalysisHistorySidebar: React.FC<AnalysisHistorySidebarProps> = ({
  analyses,
  selectedAnalysis,
  onAnalysisSelect,
  onNewAnalysis,
  loading = false,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');

  // Filter and sort analyses
  const filteredAnalyses = useMemo(() => {
    const filtered = analyses.filter(analysis =>
      analysis?.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort analyses
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        const scoreA = a.score || 0;
        const scoreB = b.score || 0;
        return scoreB - scoreA;
      }
    });

    return filtered;
  }, [analyses, searchQuery, sortBy]);

  const sidebarVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: EASING.smooth,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: EASING.smooth }
    }
  };

  // Loading skeleton
  const renderSkeleton = () => (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-24 bg-slate-100 rounded-2xl animate-pulse"
        />
      ))}
    </div>
  );

  return (
    <motion.div
      variants={sidebarVariants}
      initial="initial"
      animate="animate"
      className={`
        bg-slate-50/50 rounded-2xl border border-slate-200/60 
        shadow-sm h-full flex flex-col overflow-hidden
        ${className}
      `}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="p-6 pb-4 border-b border-slate-200/60">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Previous Analyses
          </h2>
          <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-blue-700">
              {analyses.length}
            </span>
          </div>
        </div>

        {/* Search */}
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search your analyses..."
          size="sm"
          className="mb-3"
        />

        {/* Filters */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSortBy('date')}
            className={`
              flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium
              transition-all duration-200
              ${sortBy === 'date'
                ? 'bg-white text-slate-700 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
              }
            `}
          >
            <FiClock className="w-3 h-3" />
            <span>Recent</span>
          </button>
          
          <button
            onClick={() => setSortBy('score')}
            className={`
              flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium
              transition-all duration-200
              ${sortBy === 'score'
                ? 'bg-white text-slate-700 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
              }
            `}
          >
            <FiFilter className="w-3 h-3" />
            <span>Score</span>
          </button>
        </div>
      </motion.div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              <LoadingSpinner size="sm" text="Loading analyses..." className="justify-center mb-4" />
              {renderSkeleton()}
            </motion.div>
          ) : filteredAnalyses.length > 0 ? (
            <motion.div
              key="analyses"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-y-auto p-6 pt-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100"
            >
              {filteredAnalyses.map((analysis, index) => (
                <AnalysisHistoryItem
                  key={analysis.id}
                  analysis={analysis}
                  isSelected={selectedAnalysis?.id === analysis.id}
                  onClick={onAnalysisSelect}
                  index={index}
                />
              ))}
              
              {/* Load More Hint */}
              {filteredAnalyses.length >= 10 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-4"
                >
                  <div className="text-xs text-slate-400">
                    Showing recent analyses
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex items-center justify-center p-6"
            >
              {searchQuery ? (
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                    <FiFilter className="w-6 h-6 text-slate-400" />
                  </div>
                  <h3 className="font-semibold text-slate-700">No matches found</h3>
                  <p className="text-sm text-slate-500">
                    Try adjusting your search terms
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <EmptyStateCard
                  onStartAnalysis={onNewAnalysis}
                  title="No analyses yet"
                  description="Start by analyzing your first piece of content to see insights and recommendations."
                  showTips={false}
                  className="border-0 shadow-none bg-transparent p-4"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer - New Analysis Button */}
      {filteredAnalyses.length < 0 && <motion.div variants={itemVariants} className="p-6 pt-4 border-t border-slate-200/60">
        <motion.button
          onClick={onNewAnalysis}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="
            w-full flex items-center justify-center space-x-2 py-3 px-4
            bg-gradient-to-r from-blue-500 to-emerald-600 
            text-white font-semibold rounded-xl shadow-lg
            hover:from-blue-600 hover:to-emerald-700 hover:shadow-xl
            transition-all duration-300
          "
        >
          <FiPlus className="w-5 h-5" />
          <span>New Analysis</span>
        </motion.button>
      </motion.div>}
    </motion.div>
  );
};

export default AnalysisHistorySidebar;