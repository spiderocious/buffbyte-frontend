/* eslint-disable @typescript-eslint/no-explicit-any */

import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiBarChart2,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiHeart,
  FiMessageCircle,
  FiShare2,
  FiShield,
  FiStar,
  FiTarget,
  FiThumbsUp,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

interface AnalysisItem {
  id: string;
  message: string;
  response?: string;
  createdAt: string;
  score?: number;
  platform?: string;
  wordCount?: number;
}

interface AnalysisResultsViewerProps {
  analysis: AnalysisItem;
  onNewAnalysis?: () => void;
  onEditContent?: () => void;
  onBack?: () => void;
  className?: string;
}

const AnalysisResultsViewer: React.FC<AnalysisResultsViewerProps> = ({
  analysis,
  onBack,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle tab change with scroll reset
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Reset scroll to top when changing tabs
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  // Parse the analysis response
  let analysisData: any = {};
  try {
    if (analysis.response) {
      analysisData = JSON.parse(analysis.response);
    }
  } catch (error) {
    console.error("Failed to parse analysis response:", error);
  }

  // Get overall score
  const overallScore = analysisData.virality?.score
    ? Math.round(analysisData.virality.score * 100)
    : analysis.score || 75;

  // Score color helper
  const getScoreColor = (score: number) => {
    if (score >= 80) return "emerald";
    if (score >= 60) return "blue";
    return "orange";
  };

  // Tab definitions
  const tabs = [
    { id: "overview", label: "Overview", icon: FiBarChart2 },
    { id: "sentiment", label: "Sentiment", icon: FiHeart },
    { id: "virality", label: "Virality", icon: FiTrendingUp },
    { id: "brand", label: "Brand", icon: FiStar },
    { id: "platform", label: "Platform", icon: FiTarget },
    { id: "timing", label: "Timing", icon: FiCalendar },
    { id: "risk", label: "Risk", icon: FiShield },
    { id: "recommendations", label: "Tips", icon: HiSparkles },
  ];

  // Overview Tab Content
  const OverviewContent = () => (
    <div className="space-y-6">
      {/* Main Score Display */}
      <div className="relative bg-gradient-to-br from-white to-slate-50/50 rounded-3xl p-8 border border-slate-200/60 shadow-sm">
        <div className="text-center relative z-10">
          <h3 className="text-2xl font-bold text-slate-900 mt-8">
            Content Analysis Details
          </h3>
          {analysis.createdAt && (
            <p className="text-slate-500 mt-2 font-medium">
              Analyzed on {new Date(analysis.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-emerald-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-100/20 to-blue-100/20 rounded-full blur-2xl"></div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="group bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FiHeart className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mb-1">
              {analysisData.sentiment?.confidence
                ? Math.round(analysisData.sentiment.confidence * 100) + "%"
                : "N/A"}
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Sentiment Confidence
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FiTrendingUp className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mb-1">
              {analysisData.virality?.score
                ? Math.round(analysisData.virality.score * 100) + "%"
                : "N/A"}
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Viral Potential
            </div>
          </div>
        </motion.div>

        {analysisData.authenticity?.score && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="group bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FiStar className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mb-1">
                {analysisData.authenticity?.score
                  ? Math.round(analysisData.authenticity.score * 100) + "%"
                  : "N/A"}
              </div>
              <div className="text-sm text-slate-500 font-medium">
                Authenticity
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="group bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FiUsers className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mb-1">
              {analysisData.audience?.accessibility_score
                ? Math.round(analysisData.audience.accessibility_score * 100) +
                  "%"
                : "N/A"}
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Accessibility
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 border border-slate-200/60 shadow-sm"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
            <FiBarChart2 className="w-5 h-5 text-slate-600" />
          </div>
          <h4 className="font-bold text-slate-900 text-lg">
            Content Statistics
          </h4>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-black text-slate-900 mb-1">
              {analysis?.message?.length}
            </div>
            <div className="text-sm text-slate-500 font-medium">Characters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-slate-900 mb-1">
              {analysisData.analysis_metadata?.content_length || "N/A"}
            </div>
            <div className="text-sm text-slate-500 font-medium">Words</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-slate-900 mb-1">
              {analysisData.quality?.readability_score
                ? Math.round(analysisData.quality.readability_score * 100) + "%"
                : "N/A"}
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Readability
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-slate-900 mb-1">
              {analysisData.quality?.grammar_score
                ? Math.round(analysisData.quality.grammar_score * 100) + "%"
                : "N/A"}
            </div>
            <div className="text-sm text-slate-500 font-medium">Grammar</div>
          </div>
        </div>
      </motion.div>

      {/* Predicted Engagement */}
      {analysisData.virality?.predicted_engagement && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/50 rounded-3xl p-6 border border-slate-200/60 shadow-sm overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200/10 to-emerald-200/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-xl flex items-center justify-center">
                <FiTrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg">
                Predicted Engagement
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FiThumbsUp className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-xl font-black text-slate-900 mb-1">
                  {analysisData.virality.predicted_engagement.likes.min} -{" "}
                  {analysisData.virality.predicted_engagement.likes.max}
                </div>
                <div className="text-sm text-slate-500 font-medium">Likes</div>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FiShare2 className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-xl font-black text-slate-900 mb-1">
                  {analysisData.virality.predicted_engagement.shares.min} -{" "}
                  {analysisData.virality.predicted_engagement.shares.max}
                </div>
                <div className="text-sm text-slate-500 font-medium">Shares</div>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FiMessageCircle className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-xl font-black text-slate-900 mb-1">
                  {analysisData.virality.predicted_engagement.comments.min} -{" "}
                  {analysisData.virality.predicted_engagement.comments.max}
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  Comments
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );

  // Sentiment Tab Content
  const SentimentContent = () => (
    <div className="space-y-6">
      {/* Sentiment Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/60 rounded-3xl p-6 shadow-sm"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-red-100 rounded-xl flex items-center justify-center">
            <FiHeart className="w-5 h-5 text-pink-600" />
          </div>
          <h3 className="font-bold text-slate-900 text-lg">
            Sentiment Analysis
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div
              className={`text-4xl font-black mb-3 ${
                analysisData.sentiment?.score >= 0
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {analysisData.sentiment?.score?.toFixed(2) || "N/A"}
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Sentiment Score
            </div>
          </div>

          <div className="text-center">
            <div
              className={`text-2xl font-bold mb-3 capitalize ${
                analysisData.sentiment?.label === "positive"
                  ? "text-emerald-600"
                  : analysisData.sentiment?.label === "negative"
                  ? "text-red-600"
                  : "text-slate-600"
              }`}
            >
              {analysisData.sentiment?.label || "Neutral"}
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Classification
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-3">
              {analysisData.sentiment?.confidence
                ? Math.round(analysisData.sentiment.confidence * 100) + "%"
                : "N/A"}
            </div>
            <div className="text-sm text-slate-500 font-medium">Confidence</div>
          </div>
        </div>
      </motion.div>

      {/* Emotion Breakdown */}
      {analysisData.sentiment?.emotions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 border border-slate-200/60 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
              <HiSparkles className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg">
              Emotion Breakdown
            </h4>
          </div>

          <div className="space-y-4">
            {analysisData.sentiment.emotions.map(
              (emotion: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200/50 hover:shadow-md transition-all duration-300"
                >
                  <span className="capitalize font-semibold text-slate-700 flex-1">
                    {emotion.type}
                  </span>
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <motion.div
                        className={`h-3 rounded-full ${
                          emotion.type === "joy" ||
                          emotion.type === "trust" ||
                          emotion.type === "anticipation"
                            ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                            : emotion.type === "anger" ||
                              emotion.type === "fear" ||
                              emotion.type === "sadness"
                            ? "bg-gradient-to-r from-red-400 to-red-600"
                            : "bg-gradient-to-r from-blue-400 to-blue-600"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${emotion.intensity * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-600 w-12">
                      {Math.round(emotion.intensity * 100)}%
                    </span>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      )}
    </div>
  );

  // Virality Tab Content
  const ViralityContent = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/60 rounded-3xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-2xl flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              Virality Analysis
            </h3>
          </div>

          <div className="text-right">
            <div className="text-4xl font-black text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text">
              {Math.round((analysisData.virality?.score || 0) * 100)}%
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Viral Potential
            </div>
          </div>
        </div>

        {analysisData.virality?.factors && (
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 mb-4">
              Contributing Factors
            </h4>
            {analysisData.virality.factors.map((factor: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-5 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 capitalize mb-2 text-lg">
                      {factor.factor?.replace(/_/g, " ")}
                    </div>
                    <div className="text-sm text-slate-600 leading-relaxed">
                      {factor.reasoning}
                    </div>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-xs font-bold ml-4 ${
                      factor.impact === "high"
                        ? "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 border border-emerald-300"
                        : factor.impact === "medium"
                        ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-300"
                        : "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border border-orange-300"
                    }`}
                  >
                    {factor.impact} impact
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );

  // Platform Tab Content
  const PlatformContent = () => (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-bold text-slate-900 mb-6">Platform Optimization</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">
              Content Metrics
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Character Efficiency</span>
                <span className="font-semibold">
                  {analysisData.platform_analysis?.character_efficiency
                    ? Math.round(
                        analysisData.platform_analysis.character_efficiency *
                          100
                      ) + "%"
                    : "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Current Length</span>
                <span className="font-semibold">
                  {analysisData.platform_analysis?.optimal_length?.current ||
                    analysis?.message.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Recommended</span>
                <span className="font-semibold text-blue-600">
                  {analysisData.platform_analysis?.optimal_length
                    ?.recommended || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-3">
              Target Audience
            </h4>
            {analysisData.audience?.target_demographic && (
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Age Group:</span>{" "}
                  {analysisData.audience.target_demographic.age_group}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Level:</span>{" "}
                  {analysisData.audience.target_demographic.professional_level}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Interests:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {analysisData.audience.target_demographic.interests?.map(
                      (interest: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg"
                        >
                          {interest}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hashtag Optimization */}
        {analysisData.platform_analysis?.hashtag_optimization && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-4">
              Hashtag Strategy
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analysisData.platform_analysis.hashtag_optimization
                .current_hashtags && (
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">
                    Current Hashtags:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysisData.platform_analysis.hashtag_optimization.current_hashtags.map(
                      (tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-lg"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {analysisData.platform_analysis.hashtag_optimization
                .suggested_hashtags && (
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">
                    Suggested Hashtags:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysisData.platform_analysis.hashtag_optimization.suggested_hashtags
                      .slice(0, 6)
                      .map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Brand Tab Content
  const BrandContent = () => (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-bold text-slate-900 mb-6">Brand Analysis</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-black text-slate-900 mb-2">
              {analysisData.brand?.voice_consistency
                ? Math.round(analysisData.brand.voice_consistency * 100) + "%"
                : "N/A"}
            </div>
            <div className="text-sm text-slate-500">Voice Consistency</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-slate-900 mb-2 capitalize">
              {analysisData.brand?.tone || "N/A"}
            </div>
            <div className="text-sm text-slate-500">Tone</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-slate-900 mb-2">
              {analysisData.brand?.formality_level
                ? Math.round(analysisData.brand.formality_level * 100) + "%"
                : "N/A"}
            </div>
            <div className="text-sm text-slate-500">Formality</div>
          </div>
        </div>

        {analysisData.brand?.brand_alignment && (
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-slate-900">
                Brand Alignment
              </span>
              <span
                className={`text-2xl font-bold ${
                  analysisData.brand.brand_alignment.score >= 0.7
                    ? "text-emerald-600"
                    : analysisData.brand.brand_alignment.score >= 0.4
                    ? "text-blue-600"
                    : "text-red-600"
                }`}
              >
                {Math.round(analysisData.brand.brand_alignment.score * 100)}%
              </span>
            </div>

            {analysisData.brand.brand_alignment.deviations && (
              <div>
                <div className="text-sm font-medium text-slate-700 mb-2">
                  Areas for Improvement:
                </div>
                <div className="space-y-2">
                  {analysisData.brand.brand_alignment.deviations.map(
                    (deviation: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-sm text-slate-600"
                      >
                        <FiAlertTriangle className="w-4 h-4 text-orange-500" />
                        <span>{deviation}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  // Timing Tab Content
  const TimingContent = () => (
    <div className="space-y-6">
      {analysisData.timing?.optimal_post_times && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="font-bold text-slate-900 mb-4">
            Optimal Posting Times
          </h3>
          <div className="space-y-4">
            {analysisData.timing.optimal_post_times.map(
              (time: any, index: number) => (
                <div key={index} className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <FiClock className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-bold text-slate-900">
                          {time.time}
                        </div>
                        <div className="text-sm text-slate-600">{time.day}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-emerald-600">
                        +{Math.round((time.engagement_boost - 1) * 100)}%
                      </div>
                      <div className="text-xs text-slate-500">
                        Engagement Boost
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 mt-2">
                    {time.reasoning}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {analysisData.timing?.trending_alignment && (
        <div className="bg-slate-50 rounded-2xl p-6">
          <h4 className="font-bold text-slate-900 mb-4">Trending Alignment</h4>
          <div className="space-y-4">
            {analysisData.timing.trending_alignment.map(
              (trend: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium text-slate-700">
                    {trend.trend}
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-slate-200 rounded-full h-2">
                      <div
                        className="h-2 bg-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${trend.relevance * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-600 w-12">
                      {Math.round(trend.relevance * 100)}%
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Risk Tab Content
  const RiskContent = () => (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-bold text-slate-900 mb-6">Risk Assessment</h3>

        <div className="text-center mb-6">
          <div
            className={`text-4xl font-black mb-2 capitalize ${
              analysisData.risk?.overall_risk === "low"
                ? "text-emerald-600"
                : analysisData.risk?.overall_risk === "medium"
                ? "text-orange-600"
                : "text-red-600"
            }`}
          >
            {analysisData.risk?.overall_risk || "Unknown"} Risk
          </div>
        </div>

        {analysisData.risk?.factors && (
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">Risk Factors</h4>
            {analysisData.risk.factors.map((factor: any, index: number) => (
              <div key={index} className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 capitalize mb-1">
                      {factor.type?.replace(/_/g, " ")}
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      {factor.description}
                    </div>
                    {factor.mitigation && (
                      <div className="text-sm text-emerald-600">
                        <strong>Mitigation:</strong> {factor.mitigation}
                      </div>
                    )}
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      factor.severity === "high"
                        ? "bg-red-100 text-red-700"
                        : factor.severity === "medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {factor.severity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {analysisData.risk?.compliance_check && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-3">
              Compliance Check
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                {analysisData.risk.compliance_check.gdpr_compliant ? (
                  <FiCheckCircle className="w-5 h-5 text-emerald-500" />
                ) : (
                  <FiAlertTriangle className="w-5 h-5 text-red-500" />
                )}
                <span className="text-sm font-medium">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                {analysisData.risk.compliance_check.accessibility_compliant ? (
                  <FiCheckCircle className="w-5 h-5 text-emerald-500" />
                ) : (
                  <FiAlertTriangle className="w-5 h-5 text-red-500" />
                )}
                <span className="text-sm font-medium">Accessibility</span>
              </div>
              <div className="flex items-center space-x-2">
                {analysisData.risk.compliance_check.industry_guidelines ? (
                  <FiCheckCircle className="w-5 h-5 text-emerald-500" />
                ) : (
                  <FiAlertTriangle className="w-5 h-5 text-red-500" />
                )}
                <span className="text-sm font-medium">Industry Guidelines</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Recommendations Tab Content
  const RecommendationsContent = () => (
    <div className="space-y-6">
      {analysisData.recommendations ? (
        analysisData.recommendations.map((rec: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/60 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 via-emerald-50 to-purple-50 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {rec.icon || "💡"}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">
                    {rec.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>
              <div
                className={`px-4 py-2 rounded-full text-sm font-bold ${
                  rec.priority === "high"
                    ? "bg-gradient-to-r from-red-100 to-red-200 text-red-700 border border-red-300"
                    : rec.priority === "medium"
                    ? "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border border-orange-300"
                    : "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 border border-emerald-300"
                }`}
              >
                {rec.priority}
              </div>
            </div>

            {rec.implementation && (
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-5 mb-5 border border-slate-200/50">
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiTarget className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>Implementation:</span>
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {rec.implementation}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">
                Expected impact:{" "}
                <span className="font-semibold text-emerald-600">
                  {rec.expected_impact}
                </span>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <HiSparkles className="w-10 h-10 text-slate-400" />
          </motion.div>
          <h3 className="text-xl font-semibold text-slate-700 mb-3">
            No Recommendations Available
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Analysis completed successfully but no specific recommendations were
            generated.
          </p>
        </div>
      )}
    </div>
  );

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewContent />;
      case "sentiment":
        return <SentimentContent />;
      case "virality":
        return <ViralityContent />;
      case "brand":
        return <BrandContent />;
      case "platform":
        return <PlatformContent />;
      case "timing":
        return <TimingContent />;
      case "risk":
        return <RiskContent />;
      case "recommendations":
        return <RecommendationsContent />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col h-full bg-white rounded-3xl border border-slate-200/60 shadow-xl overflow-hidden ${className}`}
    >
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-r from-slate-50 to-blue-50 p-5 border-b border-slate-200">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-4">
              {/* Back Button */}
              {onBack && (
                <motion.button
                  onClick={onBack}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white transition-all duration-200 shadow-sm"
                >
                  <FiArrowLeft className="w-5 h-5" />
                </motion.button>
              )}

              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${
                  getScoreColor(overallScore) === "emerald"
                    ? "from-emerald-100 to-emerald-200 shadow-emerald-200/50"
                    : getScoreColor(overallScore) === "blue"
                    ? "from-blue-100 to-blue-200 shadow-blue-200/50"
                    : "from-orange-100 to-orange-200 shadow-orange-200/50"
                } flex items-center justify-center shadow-lg`}
              >
                <FiBarChart2
                  className={`w-6 h-6 ${
                    getScoreColor(overallScore) === "emerald"
                      ? "text-emerald-600"
                      : getScoreColor(overallScore) === "blue"
                      ? "text-blue-600"
                      : "text-orange-600"
                  }`}
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Analysis Results
                </h2>
                <p className="text-slate-500 text-sm font-medium">
                  {new Date(analysis.createdAt || new Date()).toLocaleDateString()} •{" "}
                  {analysis?.message.length} characters
                </p>
              </div>
            </div>

            {/* Score Badge */}
            <div
              className={`px-3 py-2 rounded-xl font-bold text-sm shadow-lg ${
                getScoreColor(overallScore) === "emerald"
                  ? "bg-emerald-500 text-white"
                  : getScoreColor(overallScore) === "blue"
                  ? "bg-blue-500 text-white"
                  : "bg-orange-500 text-white"
              }`}
            >
              {overallScore}% Score
            </div>
          </div>

          {/* Enhanced Tab Navigation */}
          <div className="relative">
            <div className="flex space-x-1 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-lg rounded-2xl p-2 overflow-x-auto scrollbar-hide border border-white/30 shadow-lg">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative flex items-center space-x-2.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 whitespace-nowrap group ${
                      isActive
                        ? "bg-gradient-to-r from-white to-white/95 text-slate-900 shadow-lg border border-slate-200/50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                    }`}
                  >
                    {/* Active tab indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-emerald-50/50 rounded-xl"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}

                    <div
                      className={`relative z-10 ${
                        isActive ? "text-blue-600" : "group-hover:text-blue-500"
                      } transition-colors duration-200`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span
                      className={`relative z-10 ${
                        isActive ? "inline" : "hidden"
                      } sm:inline transition-opacity duration-200`}
                    >
                      {tab.label}
                    </span>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-emerald-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content */}
      <div
        ref={contentRef}
        className="flex-1 p-4 sm:p-6 overflow-y-auto overflow-x-hidden"
        style={{
          scrollBehavior: "smooth",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-full"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AnalysisResultsViewer;
