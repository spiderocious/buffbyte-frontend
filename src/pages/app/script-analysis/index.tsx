import AppHeader from "@buffbyte/components/layout/header/app";
import ContentAnalysisLayout from "@buffbyte/components/widgets/content-analysis/layout";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import AnalysisLoader from "../../../components/ui/analysis-loader";
import { EASING } from "../../../types";
import { bus } from "../../../events";
import { ApiService } from "../../../services";

type Platform =
  | "twitter"
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "youtube"
  | "facebook";

interface AnalysisItem {
  id: string;
  message: string;
  createdAt: string;
  score?: number;
  platform?: string;
  wordCount?: number;
}

const ScriptAnalysisPage: React.FC = () => {
  // const navigate = useNavigate();

  // State management
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisItem | null>(
    null
  );

  // Load analyses on mount
  useEffect(() => {
    loadAnalyses();
    bus.emit("active:content", { contentType: "script" });
  }, []);

  const loadAnalyses = async () => {
    setLoading(true);
    try {
      // Simulate API call
      const data  = await ApiService.getScriptChats();
      setAnalyses(data?.data?.data || []);
    } catch (error) {
      console.error("Failed to load analyses:", error);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAnalyze = async (content: string, _platform: Platform) => {
    setAnalyzing(true);

    try {

      const analysis = await ApiService.analyzeScript(content);
      console.log("Analysis result:", analysis);
      setSelectedAnalysis(analysis?.data?.data);
      loadAnalyses(); // Reload analyses after new one is added
    } catch (error) {
      console.error("Analysis failed:", error);
      // Handle error (show toast, etc.)
    } finally {
      setAnalyzing(false);
    }
  };

  // Handle analysis selection
  const handleAnalysisSelect = (analysis: AnalysisItem | null) => {
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
        ease: EASING.smooth,
      },
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-slate-50"
    >
      {/* App Header - Commented out for demo */}
      {!selectedAnalysis && <AppHeader />}

      {/* Main Content Container */}
      <div className={`pt-2 pb-6 lg:pb-12 ${!selectedAnalysis && "lg:pt-32 "}`}>
        <div className="max-w-[1400px] mx-auto px-3 lg:px-8">
          {/* Page Header */}
          {!selectedAnalysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASING.smooth }}
              className="mb-8"
            >
              <div className="flex items-center justify-between flex-col-reverse md:flex-row p-4 md:p-0 gap-[20px]">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Script Analysis
                  </h1>
                  <p className="text-slate-600">
                    Get detailed insights into your media scripts with our AI-powered analysis tool. 
                  </p>
                </div>

                {/* Breadcrumb navigation */}
                <nav className="flex w-full md:w-fit items-start space-x-2 text-sm">
                  <button
                    onClick={() => {
                      /* navigate('/dashboard') */
                    }}
                    className="text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    Dashboard
                  </button>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-900 font-medium">
                    Script Analysis
                  </span>
                </nav>
              </div>
            </motion.div>
          )}

          {/* Main Content Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASING.smooth }}
            className={selectedAnalysis ? "h-[calc(100vh-2rem)]" : "h-[calc(100vh-12rem)]"} // Full viewport for analysis
          >
            <ContentAnalysisLayout
              analyses={analyses}
              onAnalyze={handleAnalyze}
              onAnalysisSelect={handleAnalysisSelect}
              loading={loading}
              analyzing={analyzing}
              selectedAnalysis={selectedAnalysis}
            />
          </motion.div>
        </div>
      </div>

      <AnalysisLoader
        isVisible={analyzing}
        content={selectedAnalysis?.message}
        totalDuration={45000}
      />
    </motion.div>
  );
};

export default ScriptAnalysisPage;
