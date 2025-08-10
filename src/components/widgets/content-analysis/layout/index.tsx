import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { bus } from "../../../../events";
import { EASING } from "../../../../types";
import AnalysisPanel from "../analysis-panel";
import AnalysisResultsViewer from "../analysis-result";
import ScriptAnalysisResultsViewer from "../script-analysis-result";
import AnalysisHistorySidebar from "../sidebar";

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

interface ContentAnalysisLayoutProps {
  analyses: AnalysisItem[];
  onAnalyze: (content: string, platform: Platform) => void;
  onAnalysisSelect: (analysis: AnalysisItem | null) => void;
  loading?: boolean;
  analyzing?: boolean;
  className?: string;
  selectedAnalysis?: AnalysisItem | null; // Added selectedAnalysis prop
}

const ContentAnalysisLayout: React.FC<ContentAnalysisLayoutProps> = ({
  analyses,
  onAnalyze,
  onAnalysisSelect,
  loading = false,
  analyzing = false,
  className = "",
  selectedAnalysis = null, // Added selectedAnalysis prop
}) => {
  // State management
  const [content, setContent] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("twitter");
  //   const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisItem | null>(
  //     null
  //   );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [isContent, setIsContent] = React.useState<boolean>(true);

  useEffect(() => {
    bus.on("active:content", (data) => {
      if (data.contentType) {
        setIsContent(data.contentType === "content");
      }
    });
  }, []);

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false); // Close mobile sidebar on desktop
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle analysis selection
  const handleAnalysisSelect = (analysis: AnalysisItem) => {
    //(analysis);
    onAnalysisSelect(analysis);

    // Close mobile sidebar after selection
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Handle new analysis
  const handleNewAnalysis = () => {
    //setSelectedAnalysis(null);
    onAnalysisSelect(null);
    setContent("");

    // Close mobile sidebar
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const goBack = () => {
    //setSelectedAnalysis(null);
      onAnalysisSelect(null);
      window.location.reload(); // Reload to reset state
  };

  // Handle analyze button
  const handleAnalyze = () => {
    if (content.trim().length >= 50) {
      onAnalyze(content, selectedPlatform);
    }
  };

  // Animation variants
  const layoutVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: EASING.smooth,
        staggerChildren: 0.1,
      },
    },
  };

  const sidebarVariants = {
    closed: {
      x: "-100%",
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: EASING.smooth,
      },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
  };

  const ResultComponent = isContent
    ? AnalysisResultsViewer
    : ScriptAnalysisResultsViewer;

  return (
    <motion.div
      variants={layoutVariants}
      initial="initial"
      animate="animate"
      className={`relative h-full ${className}`}
    >
      {/* Mobile Header */}
      {isMobile && !selectedAnalysis && (
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <FiMenu className="w-5 h-5" />
            <span className="font-medium">Previous Analyses</span>
            {analyses.length > 0 && (
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                {analyses.length}
              </span>
            )}
          </button>
        </div>
      )}
      {/* Main Layout Container */}
      <div className="flex h-full">
        {/* Desktop Sidebar */}
        {!selectedAnalysis && (
          <div className="hidden lg:block w-[35%] h-full">
            <AnalysisHistorySidebar
              analyses={analyses}
              selectedAnalysis={selectedAnalysis}
              onAnalysisSelect={handleAnalysisSelect}
              onNewAnalysis={handleNewAnalysis}
              loading={loading}
              className="h-full"
            />
          </div>
        )}

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobile && sidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                variants={overlayVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              />

              {/* Sidebar Drawer */}
              <motion.div
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 lg:hidden shadow-xl"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-900">
                    Previous Analyses
                  </h3>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Sidebar Content */}
                <div className="h-full pb-16">
                  <AnalysisHistorySidebar
                    analyses={analyses}
                    selectedAnalysis={selectedAnalysis}
                    onAnalysisSelect={handleAnalysisSelect}
                    onNewAnalysis={handleNewAnalysis}
                    loading={loading}
                    className="h-full border-0 rounded-none bg-transparent"
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 lg:w-[65%] h-full lg:pl-6">
          <div>
            {selectedAnalysis ? (
              <ResultComponent
                analysis={selectedAnalysis}
                className="h-full"
                onBack={goBack}
              />
            ) : (
              <motion.div
                key="new-analysis"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: EASING.smooth }}
                className="h-full"
              >
                <AnalysisPanel
                  content={content}
                  onContentChange={setContent}
                  selectedPlatform={selectedPlatform}
                  onPlatformChange={setSelectedPlatform}
                  onAnalyze={handleAnalyze}
                  analyzing={analyzing}
                  className="h-full"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar (when sidebar is closed) */}
      {isMobile && !sidebarOpen && analyses.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="lg:hidden fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-3 shadow-xl z-30"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900"
            >
              <FiMenu className="w-4 h-4" />
              <span className="text-sm font-medium">
                View {analyses.length} analyses
              </span>
            </button>

            {!selectedAnalysis && (
              <div className="text-xs text-slate-500">
                Swipe up to view history
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ContentAnalysisLayout;
