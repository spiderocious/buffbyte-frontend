import AnalyzeButton from "@buffbyte/components/ui/analyze-button";
import RichTextEditor from "@buffbyte/components/ui/content-textarea";
import PlatformSelector from "@buffbyte/components/ui/platform-selector";
import { EASING } from "../../../../types";
import { motion } from "framer-motion";
import React, { use, useEffect } from "react";
import { HiSparkles } from "react-icons/hi2";
import { bus } from "../../../../events";

type Platform =
  | "twitter"
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "youtube"
  | "facebook";

interface AnalysisPanelProps {
  content: string;
  onContentChange: (content: string) => void;
  selectedPlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
  onAnalyze: () => void;
  analyzing?: boolean;
  className?: string;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  content,
  onContentChange,
  selectedPlatform,
  onPlatformChange,
  onAnalyze,
  analyzing = false,
  className = "",
}) => {
  const panelVariants = {
    initial: { opacity: 0, x: 20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: EASING.smooth,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: EASING.smooth },
    },
  };

  const isContentReady = content.trim().length >= 50;
  const [isContent, setIsContent] = React.useState<boolean>(true);

  useEffect(() => {
    bus.on("active:content", (data) => {
      if (data.contentType) {
        setIsContent(data.contentType === "content");
      }
    });
  }, []);

  return (
    <motion.div
      variants={panelVariants}
      initial="initial"
      animate="animate"
      className={`bg-white md:rounded-2xl md:border  md:border-slate-200/60 md:shadow-sm h-fit flex flex-col ${className}`}
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="p-6 pb-4 border-b border-slate-100"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <HiSparkles className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-slate-900">
                New {isContent ? "Content" : "Script"} Analysis
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-1 bg-emerald-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-emerald-700">Ready</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex flex-col p-6 space-y-6 overflow-hidden">
        {/* Content Input */}
        <motion.div
          variants={itemVariants}
          className="flex-1 flex flex-col min-h-0"
        >
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Your Content
          </label>
          <RichTextEditor
            value={content}
            onChange={onContentChange}
            placeholder="Paste your content here to analyze engagement potential, get optimization tips, and predict performance across platforms..."
            maxChars={500}
            showWordCount={true}
            disabled={analyzing}
          />
        </motion.div>

        {/* Platform Selection */}
        <motion.div variants={itemVariants} className="hidden">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Target Platform
          </label>
          <PlatformSelector
            selectedPlatform={selectedPlatform}
            onPlatformChange={onPlatformChange}
            size="md"
          />
        </motion.div>

        {/* Analysis Button */}
        <motion.div variants={itemVariants}>
          <AnalyzeButton
            onClick={onAnalyze}
            disabled={!isContentReady}
            loading={analyzing}
            size="lg"
            className="w-full"
          />

          {!isContentReady && content.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-orange-600 mt-2 text-center"
            >
              Add at least 50 characters for meaningful analysis
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Analyzing State Overlay */}
      {analyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10"
        >
          <div className="text-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
            />
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Analyzing Your Content
              </h3>
              <p className="text-slate-600 text-sm">
                Our AI is processing your content and generating insights...
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Background Decoration */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-100/10 to-transparent rounded-full blur-2xl" />
      </div>
    </motion.div>
  );
};

export default AnalysisPanel;
