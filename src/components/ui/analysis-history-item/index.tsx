import React from 'react';
import { motion } from 'framer-motion';
import ContentPreview from '../content-preview';
import DateBadge from '../date-badge';
import AnalysisScoreCircle from '../analysis-score-circle';

interface AnalysisItem {
  id: string;
  content: string;
  createdAt: string;
  score?: number;
  platform?: string;
  wordCount?: number;
}

interface AnalysisHistoryItemProps {
  analysis: AnalysisItem;
  isSelected?: boolean;
  onClick: (analysis: AnalysisItem) => void;
  index?: number;
  className?: string;
}

const AnalysisHistoryItem: React.FC<AnalysisHistoryItemProps> = ({
  analysis,
  isSelected = false,
  onClick,
  index = 0,
  className = ''
}) => {

  const score = analysis?.score ?? 0;
  const wordCount = analysis?.wordCount ||
    (analysis?.content.trim() === '' ? 0 : analysis?.content.trim().split(/\s+/).length);

  const itemVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1] 
      }
    },
    hover: {
      y: -2,
      scale: 1.02,
      transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={() => onClick(analysis)}
      className={`
        group relative bg-white md:rounded-2xl p-4 border cursor-pointer
        transition-all duration-300 shadow-sm
        ${isSelected
          ? 'border-blue-300 ring-2 ring-blue-500/20 shadow-md'
          : 'border-slate-200/60 hover:border-slate-300 hover:shadow-md'
        }
        ${className}
      `}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 left-3 w-2 h-2 bg-blue-500 rounded-full"
        />
      )}

      {/* Content Preview */}
      <div className="space-y-3">
        <ContentPreview
          content={analysis.content}
          maxLength={80}
          className="pr-16" // Space for score circle
        />

        {/* Bottom Row - Date and Stats */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <DateBadge 
              date={analysis.createdAt} 
              format="relative"
              className="text-xs"
            />
            
            {/* Word Count */}
            <div className="text-xs text-slate-400 font-medium">
              {wordCount.toLocaleString()} words
            </div>
          </div>

          {/* Platform Badge */}
          {analysis.platform && (
            <div className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md capitalize">
              {analysis.platform}
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-4 right-4">
        <AnalysisScoreCircle
          score={score}
          size="sm"
          animated={false}
        />
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)`,
          transform: 'translateX(-100%)',
        }}
        animate={{
          transform: ['translateX(-100%)', 'translateX(100%)'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default AnalysisHistoryItem;