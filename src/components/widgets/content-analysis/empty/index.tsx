import React from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiZap, FiTrendingUp } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

interface EmptyStateCardProps {
  onStartAnalysis?: () => void;
  title?: string;
  description?: string;
  showTips?: boolean;
  className?: string;
}

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  onStartAnalysis,
  title = "Ready to analyze your content?",
  description = "Get instant insights, optimization tips, and engagement predictions for your content across all platforms.",
  showTips = true,
  className = ''
}) => {
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-4, 4, -4],
      rotate: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const tips = [
    {
      icon: FiFileText,
      title: "Paste Your Content",
      description: "Add any text content - posts, captions, articles, scripts"
    },
    {
      icon: FiZap,
      title: "Get Instant Analysis",
      description: "Receive engagement predictions and optimization suggestions"
    },
    {
      icon: FiTrendingUp,
      title: "Boost Performance",
      description: "Apply insights to maximize reach and engagement"
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={`
        bg-white rounded-2xl border border-slate-200/60 p-8 text-center
        shadow-sm hover:shadow-md transition-all duration-300
        ${className}
      `}
    >
      {/* Floating Icon */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl mb-6"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <HiSparkles className="w-10 h-10 text-blue-500" />
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariants} className="space-y-4 mb-8">
        <h3 className="text-2xl font-bold text-slate-900">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
          {description}
        </p>
      </motion.div>

      {/* Action Button */}
      {onStartAnalysis && (
        <motion.div variants={itemVariants} className="mb-8">
          <motion.button
            onClick={onStartAnalysis}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="
              inline-flex items-center space-x-2 px-6 py-3 
              bg-gradient-to-r from-blue-500 to-emerald-600 
              text-white font-semibold rounded-xl shadow-lg
              hover:from-blue-600 hover:to-emerald-700 hover:shadow-xl
              transition-all duration-300
            "
          >
            <FiZap className="w-5 h-5" />
            <span>Start Your First Analysis</span>
          </motion.button>
        </motion.div>
      )}

      {/* Tips Section */}
      {showTips && (
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              How it works
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tips.map((tip, index) => {
                const IconComponent = tip.icon;
                
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="p-4 bg-slate-50/50 rounded-xl border border-slate-100"
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm">
                        <IconComponent className="w-5 h-5 text-blue-500" />
                      </div>
                      <h5 className="font-semibold text-slate-900 text-sm">
                        {tip.title}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Background Decoration */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full blur-xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-100/20 to-transparent rounded-full blur-xl" />
      </div>
    </motion.div>
  );
};

export default EmptyStateCard;