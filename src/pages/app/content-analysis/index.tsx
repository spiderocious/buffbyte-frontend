import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import AppHeader from "@buffbyte/components/layout/header/app";
import ContentAnalysisLayout from '@buffbyte/components/widgets/content-analysis/layout';

// Mock data - replace with your actual API calls
const mockAnalyses = [
  {
    id: "68946cd264800570ad60bf80",
    content: "Hey everyone! Today I want to share something that completely changed how I approach morning routines. For the longest time, I was that person hitting snooze five times, rushing through breakfast, and arriving at work already stressed. Sound familiar?",
    createdAt: "2025-08-07T09:07:30.345Z",
    score: 85,
    platform: "twitter",
    wordCount: 245
  },
  {
    id: "688fc1f95f07cce64264c161",
    content: "Then I discovered this Japanese concept called ikigai - your reason for being. But here's the thing - most people think ikigai is about finding your life purpose. That's actually a Western misinterpretation.",
    createdAt: "2025-08-03T20:09:29.149Z",
    score: 73,
    platform: "instagram",
    wordCount: 189
  },
  {
    id: "688f575e1cd82e3760561f75",
    content: "The real ikigai is much simpler. It's about finding small moments of meaning in your daily routine. Like savoring your coffee instead of chugging it. Taking three deep breaths before checking emails.",
    createdAt: "2025-08-03T12:34:38.861Z",
    score: 91,
    platform: "linkedin",
    wordCount: 156
  },
  {
    id: "688f4f0b106f580e6281be7b", 
    content: "I started with just one tiny change: setting my alarm 10 minutes earlier and using those 10 minutes to write down three things I'm grateful for. No phone, no distractions, just me and a notebook.",
    createdAt: "2025-08-03T11:59:07.642Z",
    score: 68,
    platform: "tiktok",
    wordCount: 134
  }
];

type Platform = 'twitter' | 'instagram' | 'tiktok' | 'linkedin' | 'youtube' | 'facebook';

interface AnalysisItem {
  id: string;
  content: string;
  createdAt: string;
  score?: number;
  platform?: string;
  wordCount?: number;
}

const ContentAnalysisPage: React.FC = () => {
  // const navigate = useNavigate();

  // State management
  const [analyses, setAnalyses] = useState<AnalysisItem[]>(mockAnalyses);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisItem | null>(null);

  // Load analyses on mount
  useEffect(() => {
    loadAnalyses();
  }, []);

  // Mock function to load analyses - replace with your API call
  const loadAnalyses = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In real app: const data = await AnalysisService.getAnalyses();
      setAnalyses(mockAnalyses);
    } catch (error) {
      console.error('Failed to load analyses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle new content analysis
  const handleAnalyze = async (content: string, platform: Platform) => {
    setAnalyzing(true);
    
    try {
      // Simulate API call for analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock analysis result - replace with your API call
      const newAnalysis: AnalysisItem = {
        id: Date.now().toString(),
        content,
        createdAt: new Date().toISOString(),
        score: Math.floor(Math.random() * 40) + 60, // Random score 60-100
        platform,
        wordCount: content.trim().split(/\s+/).length
      };

      // Add to analyses list
      setAnalyses(prev => [newAnalysis, ...prev]);
      
      // Select the new analysis to show results
      setSelectedAnalysis(newAnalysis);
      
      // In real app, you might navigate to a results page:
      // navigate(`/content-analysis/${newAnalysis.id}`);
      
    } catch (error) {
      console.error('Analysis failed:', error);
      // Handle error (show toast, etc.)
    } finally {
      setAnalyzing(false);
    }
  };

  // Handle analysis selection
  const handleAnalysisSelect = (analysis: AnalysisItem) => {
    setSelectedAnalysis(analysis);
    // In real app, you might navigate to show full results:
    // navigate(`/content-analysis/${analysis.id}`);
  };

  // Page animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-slate-50"
    >
      {/* App Header - Commented out for demo */}
      <AppHeader />

      {/* Main Content Container */}
      <div className="pt-2 lg:mt-32 pb-6 lg:pb-12">
        <div className="max-w-[1400px] mx-auto px-3 lg:px-8">
          
          {/* Page Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Content Analysis
                </h1>
                <p className="text-slate-600">
                  Analyze your content for engagement insights and optimization recommendations
                </p>
              </div>
              
              {/* Breadcrumb navigation */}
              <nav className="flex items-center space-x-2 text-sm">
                <button
                  onClick={() => {/* navigate('/dashboard') */}}
                  className="text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Dashboard
                </button>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900 font-medium">Content Analysis</span>
              </nav>
            </div>
          </motion.div>

          {/* Main Content Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-[calc(100vh-12rem)]" // Full height minus header and padding
          >
            <ContentAnalysisLayout
              analyses={analyses}
              onAnalyze={handleAnalyze}
              onAnalysisSelect={handleAnalysisSelect}
              loading={loading}
              analyzing={analyzing}
            />
          </motion.div>
        </div>
      </div>

      {/* Global Loading Overlay for Analysis */}
      {analyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-sm mx-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Analyzing Content
            </h3>
            <p className="text-slate-600 text-sm">
              Our AI is processing your content and generating insights...
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContentAnalysisPage;