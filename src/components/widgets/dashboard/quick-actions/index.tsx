import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EASING } from '../../../../types';
import { 
  FiEdit3, 
  FiMonitor,
  FiArrowRight,
  FiBarChart
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  href?: string;
  onClick?: () => void;
  badge?: string;
  stats?: {
    label: string;
    value: number;
    suffix: string;
  };
}

interface QuickActionsSectionProps {
  actions?: QuickAction[];
  className?: string;
}

const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
  actions,
  className = ''
}) => {
  // Default actions if none provided (removed trend scanner)
  const defaultActions: QuickAction[] = [
    {
      id: 'analyze-content',
      title: 'Analyze Content',
      description: 'Get instant engagement predictions and optimization tips',
      icon: FiBarChart,
      gradient: 'from-blue-500 to-indigo-600',
      href: '/app/content-analysis',
      badge: 'Popular',
      stats: {
        label: 'Avg boost',
        value: 34,
        suffix: '%'
      }
    },
    {
      id: 'optimize-script',
      title: 'Optimize Script',
      description: 'Perfect your video scripts for maximum impact',
      icon: FiEdit3,
      gradient: 'from-emerald-500 to-teal-600',
      href: '/app/script-analysis',
      stats: {
        label: 'Success rate',
        value: 87,
        suffix: '%'
      }
    },
    {
      id: 'teleprompter',
      title: 'Teleprompter',
      description: 'Practice your scripts with our smart teleprompter',
      icon: FiMonitor,
      gradient: 'from-orange-500 to-red-600',
      href: '/teleprompter',
      stats: {
        label: 'Prompts',
        value: 2100,
        suffix: '+'
      }
    }
  ];

  const navigate = useNavigate();

  const actionItems = actions || defaultActions;

  // Animation variants
  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: EASING.smooth,
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: EASING.smooth }
    }
  };

  const actionVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: EASING.smooth
      }
    },
    hover: {
      y: -4,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: EASING.smooth
      }
    }
  };

  const handleActionClick = (action: QuickAction) => {
    if (action.onClick) {
      action.onClick();
    } else if (action.href) {
      navigate(action.href);
    }
  };

  // Counter animation component
  const AnimatedCounter: React.FC<{ value: number; suffix: string; duration?: number }> = ({ 
    value, 
    suffix, 
    duration = 2 
  }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * value));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [value, duration]);

    return <span>{count}{suffix}</span>;
  };

  return (
    <motion.div
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      className={`space-y-8 ${className}`}
    >
      {/* Header */}
      <motion.div variants={headerVariants} className="text-left space-y-3">
        <div className="flex items-center justify-start space-x-3">
          <div className="flex items-center space-x-2">
            <HiSparkles className="w-7 h-7 text-blue-500" />
            <h2 className="text-3xl font-bold text-slate-900">
              Quick Actions
            </h2>
          </div>
          <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-blue-700">Ready</span>
          </div>
        </div>
        <p className="text-slate-600 max-w-2xl">
          Choose from our most powerful tools to boost your content performance instantly
        </p>
      </motion.div>

      {/* Actions Grid - Full width on mobile, row on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {actionItems.map((action) => {
          const IconComponent = action.icon;
          
          return (
            <motion.div
              key={action.id}
              variants={actionVariants}
              whileHover="hover"
              onClick={() => handleActionClick(action)}
              className="group relative cursor-pointer"
            >
              {/* Main Card - Reduced height */}
              <div className="relative bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 h-32 lg:h-28">
                
                {/* Gradient Header Strip */}
                <div className={`h-1 bg-gradient-to-r ${action.gradient}`} />
                
                {/* Content Container - Compact layout */}
                <div className="p-5 h-full">
                  <div className="flex items-center justify-between h-full">
                    
                    {/* Left Side - Icon and Text */}
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Icon */}
                      <div className={`
                        flex items-center justify-center w-12 h-12 rounded-xl
                        bg-gradient-to-br ${action.gradient} text-white
                        shadow-lg group-hover:scale-110 transition-transform duration-300
                      `}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      
                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-bold text-slate-900 truncate">
                            {action.title}
                          </h3>
                          {action.badge && (
                            <span className={`
                              px-2 py-0.5 rounded-full text-xs font-bold shrink-0
                              ${action.badge === 'Popular' 
                                ? 'bg-orange-100 text-orange-600' 
                                : 'bg-emerald-100 text-emerald-600'
                              }
                            `}>
                              {action.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">
                          {action.description}
                        </p>
                      </div>
                    </div>

                    {/* Right Side - Stats and Arrow */}
                    <div className="flex items-end justify-end  gap-2 shrink-0 flex-col">
                      {/* Stats */}
                      {action.stats && (
                        <div className="text-right">
                          <div className="text-2xl font-black text-slate-900">
                            <AnimatedCounter 
                              value={action.stats.value} 
                              suffix={action.stats.suffix}
                              duration={1.5}
                            />
                          </div>
                          <div className="text-xs font-medium text-slate-500">
                            {action.stats.label}
                          </div>
                        </div>
                      )}
                      
                      {/* Arrow */}
                      <div className="w-8 h-8 bg-slate-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:translate-x-1">
                        <FiArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle Glow Effect on Hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                {/* Moving Highlight */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)`,
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
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuickActionsSection;