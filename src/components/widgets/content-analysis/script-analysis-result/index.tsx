/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import {
    FiArrowLeft,
    FiBarChart2,
    FiEye,
    FiHeart,
    FiInstagram,
    FiLinkedin,
    FiMic,
    FiMonitor,
    FiPlay,
    FiShare2,
    FiTarget,
    FiTrendingUp,
    FiUsers,
    FiVideo,
    FiVolumeX,
    FiYoutube
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { SiTiktok } from 'react-icons/si';

interface AnalysisItem {
  id: string;
  message: string;
  response?: string;
  createdAt: string;
  score?: number;
  platform?: string;
  wordCount?: number;
}

interface ScriptAnalysisResultsViewerProps {
  analysis: AnalysisItem;
  onBack?: () => void;
  className?: string;
}

const ScriptAnalysisResultsViewer: React.FC<ScriptAnalysisResultsViewerProps> = ({
  analysis,
  onBack,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle tab change with scroll reset
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
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
    console.error('Failed to parse analysis response:', error);
  }

  // Get overall score from quality metrics
  const overallScore = analysisData.quality?.authenticity_score ? 
    Math.round(analysisData.quality.authenticity_score * 100) : 
    85;

  // Score color helper
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'emerald';
    if (score >= 60) return 'blue';
    return 'orange';
  };

  // Tab definitions
  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiBarChart2 },
    { id: 'delivery', label: 'Delivery', icon: FiMic },
    { id: 'engagement', label: 'Engagement', icon: FiHeart },
    { id: 'platforms', label: 'Platforms', icon: FiMonitor },
    { id: 'structure', label: 'Structure', icon: FiTarget },
    { id: 'performance', label: 'Performance', icon: FiTrendingUp },
    { id: 'recommendations', label: 'Tips', icon: HiSparkles }
  ];

  // Overview Tab Content
  const OverviewContent = () => (
    <div className="space-y-6">
      {/* Main Video Stats */}
      <div className="relative bg-gradient-to-br from-white to-slate-50/50 rounded-3xl p-8 border border-slate-200/60 shadow-sm">
        <div className="text-center relative z-10">
          <h3 className="text-2xl font-bold text-slate-900 mt-8">
            Script Analysis Overview
          </h3>
          <p className="text-slate-500 mt-2 font-medium">
            Video Script • {analysisData.analysis_metadata?.estimated_video_length || '4-5 minutes'}
          </p>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/20 to-blue-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-2xl"></div>
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
            <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FiMic className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mb-1">
              {analysisData.delivery?.speaking_pace?.current_pace_rating ? 
                Math.round(analysisData.delivery.speaking_pace.current_pace_rating * 100) + '%' : 'N/A'}
            </div>
            <div className="text-sm text-slate-500 font-medium">Speaking Pace</div>
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
              <FiEye className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mb-1">
              {analysisData.engagement?.retention_prediction?.overall_score ? 
                Math.round(analysisData.engagement.retention_prediction.overall_score * 100) + '%' : 'N/A'}
            </div>
            <div className="text-sm text-slate-500 font-medium">Retention Score</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="group bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FiHeart className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mb-1">
              {analysisData.engagement?.hook_strength?.score ? 
                Math.round(analysisData.engagement.hook_strength.score * 100) + '%' : 'N/A'}
            </div>
            <div className="text-sm text-slate-500 font-medium">Hook Strength</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="group bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FiPlay className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mb-1">
              {analysisData.predicted_performance?.completion_rate ? 
                Math.round(analysisData.predicted_performance.completion_rate * 100) + '%' : 'N/A'}
            </div>
            <div className="text-sm text-slate-500 font-medium">Completion Rate</div>
          </div>
        </motion.div>
      </div>

      {/* Video Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 border border-slate-200/60 shadow-sm"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
            <FiVideo className="w-5 h-5 text-slate-600" />
          </div>
          <h4 className="font-bold text-slate-900 text-lg">Video Statistics</h4>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-black text-slate-900 mb-1">
              {analysisData.delivery?.speaking_pace?.word_count || analysis?.message.split(' ').length}
            </div>
            <div className="text-sm text-slate-500 font-medium">Words</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-slate-900 mb-1">
              {analysisData.analysis_metadata?.estimated_video_length?.split('-')[0] || '4:30'}
            </div>
            <div className="text-sm text-slate-500 font-medium">Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-slate-900 mb-1">
              {analysisData.delivery?.speaking_pace?.optimal_wpm || 150}
            </div>
            <div className="text-sm text-slate-500 font-medium">WPM</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-slate-900 mb-1">
              {analysisData.delivery?.readability_for_speech?.breath_points || 'N/A'}
            </div>
            <div className="text-sm text-slate-500 font-medium">Breath Points</div>
          </div>
        </div>
      </motion.div>

      {/* Energy Flow Visualization */}
      {analysisData.delivery?.energy_flow?.energy_curve && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 rounded-3xl p-6 border border-slate-200/60 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
              <FiTrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg">Energy Flow Timeline</h4>
          </div>
          
          <div className="space-y-4">
            {analysisData.delivery.energy_flow.energy_curve.map((segment: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200/50">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="text-sm font-bold text-slate-600 w-20">
                    {segment.timestamp}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-slate-700 font-medium mb-1">
                      {segment.note}
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${segment.energy * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-lg font-bold text-purple-600">
                    {Math.round(segment.energy * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );

  // Delivery Tab Content
  const DeliveryContent = () => (
    <div className="space-y-6">
      {/* Speaking Pace Analysis */}
      {analysisData.delivery?.speaking_pace && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/60 rounded-3xl p-6 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
              <FiMic className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Speaking Pace Analysis</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-black text-purple-600 mb-2">
                {analysisData.delivery.speaking_pace.optimal_wpm}
              </div>
              <div className="text-sm text-slate-500 font-medium">Optimal WPM</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-slate-900 mb-2">
                {analysisData.delivery.speaking_pace.estimated_duration}
              </div>
              <div className="text-sm text-slate-500 font-medium">Duration</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-black mb-2 ${
                analysisData.delivery.speaking_pace.current_pace_rating >= 0.8 ? 'text-emerald-600' : 'text-orange-600'
              }`}>
                {Math.round(analysisData.delivery.speaking_pace.current_pace_rating * 100)}%
              </div>
              <div className="text-sm text-slate-500 font-medium">Pace Rating</div>
            </div>
          </div>

          {/* Pace Variance */}
          {analysisData.delivery.speaking_pace.pace_variance && (
            <div className="bg-slate-50 rounded-2xl p-5">
              <h4 className="font-semibold text-slate-900 mb-4">Pace Variance by Section</h4>
              <div className="space-y-3">
                {Object.entries(analysisData.delivery.speaking_pace.pace_variance).map(([section, variance]: [string, any]) => (
                  <div key={section} className="flex items-center justify-between">
                    <span className="capitalize font-medium text-slate-700">{section}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-slate-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-purple-500 rounded-full"
                          style={{ width: `${variance * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-600 w-10">
                        {Math.round(variance * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Difficult Sections */}
          {analysisData.delivery.speaking_pace.difficult_sections && (
            <div className="mt-6">
              <h4 className="font-semibold text-slate-900 mb-4">Sections Requiring Attention</h4>
              <div className="space-y-3">
                {analysisData.delivery.speaking_pace.difficult_sections.map((section: any, index: number) => (
                  <div key={index} className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-orange-900 mb-1">"{section.text}"</div>
                        <div className="text-sm text-orange-700">{section.reason}</div>
                      </div>
                      <div className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        {section.suggested_pace} WPM
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Readability for Speech */}
      {analysisData.delivery?.readability_for_speech && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 border border-slate-200/60 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <FiVolumeX className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg">Speech Readability</h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-600 mb-2">
                {Math.round(analysisData.delivery.readability_for_speech.score * 100)}%
              </div>
              <div className="text-sm text-slate-500 font-medium">Readability</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900 mb-2">
                {analysisData.delivery.readability_for_speech.sentence_complexity.toFixed(1)}
              </div>
              <div className="text-sm text-slate-500 font-medium">Complexity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900 mb-2">
                {analysisData.delivery.readability_for_speech.breath_points}
              </div>
              <div className="text-sm text-slate-500 font-medium">Breath Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900 mb-2">
                {analysisData.delivery.readability_for_speech.transitions.smooth_count}
              </div>
              <div className="text-sm text-slate-500 font-medium">Smooth Transitions</div>
            </div>
          </div>

          {/* Tongue Twisters */}
          {analysisData.delivery.readability_for_speech.tongue_twisters?.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
              <h4 className="font-semibold text-yellow-900 mb-4">Pronunciation Challenges</h4>
              {analysisData.delivery.readability_for_speech.tongue_twisters.map((twister: any, index: number) => (
                <div key={index} className="bg-white rounded-xl p-3 mb-3 last:mb-0">
                  <div className="font-medium text-yellow-900">"{twister.phrase}"</div>
                  <div className="text-sm text-yellow-700 mt-1">{twister.suggestion}</div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );

  // Engagement Tab Content
  const EngagementContent = () => (
    <div className="space-y-6">
      {/* Hook Strength */}
      {analysisData.engagement?.hook_strength && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/60 rounded-3xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <FiHeart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Hook Analysis</h3>
            </div>
            
            <div className="text-right">
              <div className="text-4xl font-black text-transparent bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text">
                {Math.round(analysisData.engagement.hook_strength.score * 100)}%
              </div>
              <div className="text-sm text-slate-500 font-medium">Hook Strength</div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 mb-6">
            <h4 className="font-semibold text-slate-900 mb-3">First 15 Seconds Analysis</h4>
            <p className="text-slate-700 text-sm leading-relaxed">
              {analysisData.engagement.hook_strength.first_15_seconds}
            </p>
          </div>

          {/* Attention Grabbers */}
          {analysisData.engagement.hook_strength.attention_grabbers && (
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">Attention Grabbers</h4>
              {analysisData.engagement.hook_strength.attention_grabbers.map((grabber: any, index: number) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-5 border border-slate-200/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 mb-2 capitalize">
                        {grabber.type.replace(/_/g, ' ')}
                      </div>
                      <div className="text-sm text-slate-600">
                        "{grabber.text}"
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      grabber.effectiveness >= 0.8 ? 'bg-emerald-100 text-emerald-700' :
                      grabber.effectiveness >= 0.6 ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {Math.round(grabber.effectiveness * 100)}% effective
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Improvement Suggestions */}
          {analysisData.engagement.hook_strength.improvement_suggestions && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <h4 className="font-semibold text-blue-900 mb-4">Improvement Suggestions</h4>
              <ul className="space-y-2">
                {analysisData.engagement.hook_strength.improvement_suggestions.map((suggestion: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-blue-800">
                    <div className="w-4 h-4 rounded-full bg-blue-200 flex-shrink-0 mt-0.5"></div>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      {/* Retention Prediction */}
      {analysisData.engagement?.retention_prediction && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 border border-slate-200/60 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
              <FiEye className="w-5 h-5 text-emerald-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg">Retention Prediction</h4>
          </div>
          
          <div className="text-center mb-6">
            <div className="text-4xl font-black text-emerald-600 mb-2">
              {Math.round(analysisData.engagement.retention_prediction.overall_score * 100)}%
            </div>
            <div className="text-slate-500 font-medium">Expected Retention</div>
          </div>

          {/* Drop-off Risks */}
          {analysisData.engagement.retention_prediction.drop_off_risks && (
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">Potential Drop-off Points</h4>
              {analysisData.engagement.retention_prediction.drop_off_risks.map((risk: any, index: number) => (
                <div key={index} className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-red-900 mb-1">
                        {risk.timestamp}
                      </div>
                      <div className="text-sm text-red-700 mb-2">
                        {risk.reason}
                      </div>
                      <div className="text-sm text-emerald-700 font-medium">
                        <strong>Suggestion:</strong> {risk.suggestion}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      risk.risk_level >= 0.7 ? 'bg-red-200 text-red-800' :
                      risk.risk_level >= 0.4 ? 'bg-orange-200 text-orange-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}>
                      {Math.round(risk.risk_level * 100)}% risk
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Engagement Boosters */}
          {analysisData.engagement.retention_prediction.engagement_boosters && (
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-slate-900">Engagement Boosters</h4>
              {analysisData.engagement.retention_prediction.engagement_boosters.map((booster: any, index: number) => (
                <div key={index} className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-emerald-900">
                        {booster.timestamp}
                      </div>
                      <div className="text-sm text-emerald-700">
                        {booster.element}
                      </div>
                    </div>
                    <div className="bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold">
                      +{Math.round(booster.boost_factor * 100)}% boost
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Call to Action Analysis */}
      {analysisData.engagement?.call_to_action && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 rounded-3xl p-6 border border-slate-200/60 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
              <FiTarget className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg">Call to Action Analysis</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className={`text-2xl font-black mb-2 ${
                analysisData.engagement.call_to_action.presence ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {analysisData.engagement.call_to_action.presence ? 'Present' : 'Missing'}
              </div>
              <div className="text-sm text-slate-500 font-medium">CTA Presence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900 mb-2">
                {Math.round(analysisData.engagement.call_to_action.strength * 100)}%
              </div>
              <div className="text-sm text-slate-500 font-medium">Strength</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900 mb-2">
                {Math.round(analysisData.engagement.call_to_action.clarity * 100)}%
              </div>
              <div className="text-sm text-slate-500 font-medium">Clarity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900 mb-2 capitalize">
                {analysisData.engagement.call_to_action.placement}
              </div>
              <div className="text-sm text-slate-500 font-medium">Placement</div>
            </div>
          </div>

          {/* CTA Suggestions */}
          {analysisData.engagement.call_to_action.suggestions && (
            <div className="bg-slate-50 rounded-2xl p-5">
              <h4 className="font-semibold text-slate-900 mb-4">Improvement Suggestions</h4>
              <ul className="space-y-2">
                {analysisData.engagement.call_to_action.suggestions.map((suggestion: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-slate-700">
                    <FiTarget className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );

  // Platforms Tab Content
  const PlatformsContent = () => (
    <div className="space-y-6">
      {/* Platform Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* YouTube */}
        {analysisData.platform_optimization?.youtube && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-red-50/50 to-white rounded-3xl p-6 border border-slate-200/60 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <FiYoutube className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-bold text-slate-900">YouTube</h3>
              <div className="ml-auto text-2xl font-black text-red-600">
                {Math.round(analysisData.platform_optimization.youtube.score * 100)}%
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Watch Time Prediction</span>
                <span className="font-semibold">{analysisData.platform_optimization.youtube.watch_time_prediction}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Title Hook Strength</span>
                <span className="font-semibold">{Math.round(analysisData.platform_optimization.youtube.title_hook_strength * 100)}%</span>
              </div>
              
              {/* Thumbnail Opportunities */}
              {analysisData.platform_optimization.youtube.thumbnail_opportunities && (
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Thumbnail Ideas:</div>
                  <div className="space-y-1">
                    {analysisData.platform_optimization.youtube.thumbnail_opportunities.slice(0, 2).map((idea: string, index: number) => (
                      <div key={index} className="text-xs text-slate-600 bg-slate-100 rounded-lg px-3 py-1">
                        {idea}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SEO Keywords */}
              {analysisData.platform_optimization.youtube.seo_keywords && (
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">SEO Keywords:</div>
                  <div className="flex flex-wrap gap-1">
                    {analysisData.platform_optimization.youtube.seo_keywords.slice(0, 4).map((keyword: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-lg">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TikTok */}
        {analysisData.platform_optimization?.tiktok && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-slate-900/5 to-white rounded-3xl p-6 border border-slate-200/60 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <SiTiktok className="w-5 h-5 text-slate-900" />
              </div>
              <h3 className="font-bold text-slate-900">TikTok</h3>
              <div className="ml-auto text-2xl font-black text-slate-900">
                {Math.round(analysisData.platform_optimization.tiktok.score * 100)}%
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Viral Potential</span>
                <span className="font-semibold">{Math.round(analysisData.platform_optimization.tiktok.viral_potential * 100)}%</span>
              </div>
              
              {/* Issues */}
              {analysisData.platform_optimization.tiktok.issues && (
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Issues:</div>
                  <div className="space-y-1">
                    {analysisData.platform_optimization.tiktok.issues.slice(0, 2).map((issue: string, index: number) => (
                      <div key={index} className="text-xs text-orange-700 bg-orange-100 rounded-lg px-3 py-1">
                        {issue}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Adaptation Suggestions */}
              {analysisData.platform_optimization.tiktok.adaptation_suggestions && (
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Adaptations:</div>
                  <div className="space-y-1">
                    {analysisData.platform_optimization.tiktok.adaptation_suggestions.slice(0, 2).map((suggestion: string, index: number) => (
                      <div key={index} className="text-xs text-emerald-700 bg-emerald-100 rounded-lg px-3 py-1">
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* LinkedIn */}
        {analysisData.platform_optimization?.linkedin && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50/50 to-white rounded-3xl p-6 border border-slate-200/60 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <FiLinkedin className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900">LinkedIn</h3>
              <div className="ml-auto text-2xl font-black text-blue-600">
                {Math.round(analysisData.platform_optimization.linkedin.score * 100)}%
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Professional Tone</span>
                <span className="font-semibold">{Math.round(analysisData.platform_optimization.linkedin.professional_tone * 100)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Business Value</span>
                <span className="font-semibold">{Math.round(analysisData.platform_optimization.linkedin.business_value * 100)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Thought Leadership</span>
                <span className="font-semibold">{Math.round(analysisData.platform_optimization.linkedin.thought_leadership * 100)}%</span>
              </div>
              
              {/* Networking Opportunities */}
              {analysisData.platform_optimization.linkedin.networking_opportunities && (
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Networking:</div>
                  <div className="space-y-1">
                    {analysisData.platform_optimization.linkedin.networking_opportunities.slice(0, 2).map((opportunity: string, index: number) => (
                      <div key={index} className="text-xs text-blue-700 bg-blue-100 rounded-lg px-3 py-1">
                        {opportunity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Instagram Reels */}
        {analysisData.platform_optimization?.instagram_reels && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-pink-50/50 to-white rounded-3xl p-6 border border-slate-200/60 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                <FiInstagram className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-900">Instagram Reels</h3>
              <div className="ml-auto text-2xl font-black text-purple-600">
                {Math.round(analysisData.platform_optimization.instagram_reels.score * 100)}%
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Visual Storytelling</span>
                <span className="font-semibold">{Math.round(analysisData.platform_optimization.instagram_reels.visual_storytelling * 100)}%</span>
              </div>
              
              {/* Music Sync Opportunities */}
              {analysisData.platform_optimization.instagram_reels.music_sync_opportunities && (
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Music Sync Ideas:</div>
                  <div className="space-y-1">
                    {analysisData.platform_optimization.instagram_reels.music_sync_opportunities.slice(0, 2).map((idea: string, index: number) => (
                      <div key={index} className="text-xs text-purple-700 bg-purple-100 rounded-lg px-3 py-1">
                        {idea}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Text Overlay Suggestions */}
              {analysisData.platform_optimization.instagram_reels.text_overlay_suggestions && (
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Text Overlays:</div>
                  <div className="space-y-1">
                    {analysisData.platform_optimization.instagram_reels.text_overlay_suggestions.slice(0, 2).map((suggestion: string, index: number) => (
                      <div key={index} className="text-xs text-pink-700 bg-pink-100 rounded-lg px-3 py-1">
                        {suggestion}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  // Structure Tab Content
  const StructureContent = () => (
    <div className="space-y-6">
      {/* Narrative Flow */}
      {analysisData.structure?.narrative_flow && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/60 rounded-3xl p-6 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <FiTarget className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Narrative Flow</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-black text-blue-600 mb-2">
                {Math.round(analysisData.structure.narrative_flow.score * 100)}%
              </div>
              <div className="text-sm text-slate-500 font-medium">Overall Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-2 capitalize">
                {analysisData.structure.narrative_flow.story_arc.replace(/-/g, ' ')}
              </div>
              <div className="text-sm text-slate-500 font-medium">Story Arc</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-2 capitalize">
                {analysisData.structure.narrative_flow.pacing.replace(/_/g, ' ')}
              </div>
              <div className="text-sm text-slate-500 font-medium">Pacing</div>
            </div>
          </div>

          {/* Gaps in Structure */}
          {analysisData.structure.narrative_flow.gaps && (
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">Structure Gaps</h4>
              {analysisData.structure.narrative_flow.gaps.map((gap: any, index: number) => (
                <div key={index} className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                  <div className="font-medium text-orange-900 mb-1 capitalize">
                    {gap.section.replace(/_/g, ' ')}
                  </div>
                  <div className="text-sm text-orange-700 mb-2">{gap.issue}</div>
                  <div className="text-sm text-emerald-700 font-medium">
                    <strong>Suggestion:</strong> {gap.suggestion}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Content Density */}
      {analysisData.structure?.content_density && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 border border-slate-200/60 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
              <FiBarChart2 className="w-5 h-5 text-emerald-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg">Content Density</h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-600 mb-2">
                {analysisData.structure.content_density.information_per_minute.toFixed(1)}
              </div>
              <div className="text-sm text-slate-500 font-medium">Info/Minute</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900 mb-2 capitalize">
                {analysisData.structure.content_density.cognitive_load}
              </div>
              <div className="text-sm text-slate-500 font-medium">Cognitive Load</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900 mb-2 capitalize">
                {analysisData.structure.content_density.complexity_progression.replace(/_/g, ' ')}
              </div>
              <div className="text-sm text-slate-500 font-medium">Progression</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900 mb-2">
                {Math.round(analysisData.structure.content_density.digestibility * 100)}%
              </div>
              <div className="text-sm text-slate-500 font-medium">Digestibility</div>
            </div>
          </div>

          {/* Density Suggestions */}
          {analysisData.structure.content_density.suggestions && (
            <div className="bg-slate-50 rounded-2xl p-5">
              <h4 className="font-semibold text-slate-900 mb-4">Density Optimization</h4>
              <ul className="space-y-2">
                {analysisData.structure.content_density.suggestions.map((suggestion: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-emerald-200 flex-shrink-0 mt-0.5"></div>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      {/* Memorability */}
      {analysisData.structure?.memorability && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50 rounded-3xl p-6 border border-slate-200/60 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
              <HiSparkles className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg">Memorability Analysis</h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-black text-purple-600 mb-2">
                {Math.round(analysisData.structure.memorability.score * 100)}%
              </div>
              <div className="text-sm text-slate-500 font-medium">Memorability</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900 mb-2">
                {analysisData.structure.memorability.key_takeaways}
              </div>
              <div className="text-sm text-slate-500 font-medium">Key Takeaways</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900 mb-2">
                {analysisData.structure.memorability.story_elements}
              </div>
              <div className="text-sm text-slate-500 font-medium">Story Elements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900 mb-2">
                {analysisData.structure.memorability.emotional_moments}
              </div>
              <div className="text-sm text-slate-500 font-medium">Emotional Moments</div>
            </div>
          </div>

          {/* Quotable Moments */}
          {analysisData.structure.memorability.quotable_moments && (
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">Quotable Moments</h4>
              {analysisData.structure.memorability.quotable_moments.map((quote: any, index: number) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-5 border border-slate-200/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 mb-2">
                        "{quote.text}"
                      </div>
                      <div className="text-sm text-slate-600">
                        At {quote.timestamp}
                      </div>
                    </div>
                    <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                      {Math.round(quote.shareability * 100)}% shareable
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );

  // Performance Tab Content
  const PerformanceContent = () => (
    <div className="space-y-6">
      {/* Overall Performance Prediction */}
      {analysisData.predicted_performance && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white to-slate-50/50 border border-slate-200/60 rounded-3xl p-6 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-xl flex items-center justify-center">
              <FiTrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Performance Prediction</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FiPlay className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mb-1">
                {Math.round(analysisData.predicted_performance.completion_rate * 100)}%
              </div>
              <div className="text-sm text-slate-500 font-medium">Completion Rate</div>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FiHeart className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mb-1">
                {Math.round(analysisData.predicted_performance.engagement_rate * 100)}%
              </div>
              <div className="text-sm text-slate-500 font-medium">Engagement Rate</div>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <FiShare2 className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mb-1">
                {Math.round(analysisData.predicted_performance.share_probability * 100)}%
              </div>
              <div className="text-sm text-slate-500 font-medium">Share Probability</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Audience Segments */}
      {analysisData.predicted_performance?.audience_segments && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 border border-slate-200/60 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
              <FiUsers className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg">Audience Segment Analysis</h4>
          </div>
          
          <div className="space-y-6">
            {analysisData.predicted_performance.audience_segments.map((segment: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-slate-50/50 rounded-2xl p-5 border border-slate-200/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold text-slate-900 capitalize text-lg">
                    {segment.segment.replace(/_/g, ' ')}
                  </h5>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600 mb-1">
                      {Math.round(segment.comprehension * 100)}%
                    </div>
                    <div className="text-xs text-slate-500 font-medium">Comprehension</div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                      <div 
                        className="h-1.5 bg-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${segment.comprehension * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xl font-bold text-emerald-600 mb-1">
                      {Math.round(segment.engagement * 100)}%
                    </div>
                    <div className="text-xs text-slate-500 font-medium">Engagement</div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                      <div 
                        className="h-1.5 bg-emerald-500 rounded-full transition-all duration-1000"
                        style={{ width: `${segment.engagement * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600 mb-1">
                      {Math.round(segment.retention * 100)}%
                    </div>
                    <div className="text-xs text-slate-500 font-medium">Retention</div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                      <div 
                        className="h-1.5 bg-purple-500 rounded-full transition-all duration-1000"
                        style={{ width: `${segment.retention * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Teleprompter Readiness */}
      {analysisData.teleprompter_readiness && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-50/50 via-white to-yellow-50/50 rounded-3xl p-6 border border-slate-200/60 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center">
              <FiMonitor className="w-5 h-5 text-orange-600" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg">Teleprompter Readiness</h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-black text-orange-600 mb-2">
                {Math.round(analysisData.teleprompter_readiness.overall_score * 100)}%
              </div>
              <div className="text-sm text-slate-500 font-medium">Overall Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-2 capitalize">
                {analysisData.teleprompter_readiness.difficulty_rating}
              </div>
              <div className="text-sm text-slate-500 font-medium">Difficulty</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-2">
                {analysisData.teleprompter_readiness.practice_recommendations?.estimated_rehearsals || 'N/A'}
              </div>
              <div className="text-sm text-slate-500 font-medium">Rehearsals Needed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-2">
                {analysisData.teleprompter_readiness.formatting_needs?.pause_markers || 0}
              </div>
              <div className="text-sm text-slate-500 font-medium">Pause Markers</div>
            </div>
          </div>

          {/* Focus Areas */}
          {analysisData.teleprompter_readiness.practice_recommendations?.focus_areas && (
            <div className="bg-slate-50 rounded-2xl p-5">
              <h4 className="font-semibold text-slate-900 mb-4">Practice Focus Areas</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysisData.teleprompter_readiness.practice_recommendations.focus_areas.map((area: string, index: number) => (
                  <div key={index} className="bg-white rounded-xl p-3 text-sm text-slate-700 border border-slate-200">
                    {area}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Stumble Points */}
          {analysisData.teleprompter_readiness.practice_recommendations?.common_stumble_points && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
              <h4 className="font-semibold text-yellow-900 mb-4">Common Stumble Points</h4>
              <div className="space-y-3">
                {analysisData.teleprompter_readiness.practice_recommendations.common_stumble_points.map((point: any, index: number) => (
                  <div key={index} className="bg-white rounded-xl p-3">
                    <div className="font-medium text-yellow-900 mb-1">
                      "{point.phrase}"
                    </div>
                    <div className="text-sm text-yellow-700">
                      Alternative: "{point.alternative}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );

  // Recommendations Tab Content
  const RecommendationsContent = () => (
    <div className="space-y-6">
      {analysisData.ai_recommendations ? analysisData.ai_recommendations.map((rec: any, index: number) => (
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
                {rec.icon || '💡'}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-lg mb-2">{rec.title}</h3>
                <p className="text-slate-600 leading-relaxed">{rec.description}</p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-bold ${
              rec.priority === 'high' ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-700 border border-red-300' :
              rec.priority === 'medium' ? 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border border-orange-300' :
              'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 border border-emerald-300'
            }`}>
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
              <p className="text-slate-700 text-sm leading-relaxed">{rec.implementation}</p>
            </div>
          )}

          {/* Category Tag */}
          {rec.category && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">
                Category: <span className="font-semibold text-blue-600 capitalize">{rec.category}</span>
              </div>
              <div className="text-sm text-slate-500">
                Impact: <span className="font-semibold text-emerald-600">{rec.expected_impact}</span>
              </div>
            </div>
          )}

          {/* Platforms */}
          {rec.platforms && (
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-sm text-slate-500">Platforms:</span>
              {rec.platforms.map((platform: string, idx: number) => (
                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg capitalize">
                  {platform}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      )) : (
        <div className="text-center py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <HiSparkles className="w-10 h-10 text-slate-400" />
          </motion.div>
          <h3 className="text-xl font-semibold text-slate-700 mb-3">No Recommendations Available</h3>
          <p className="text-slate-500 max-w-md mx-auto">Analysis completed successfully but no specific recommendations were generated.</p>
        </div>
      )}
    </div>
  );

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewContent />;
      case 'delivery': return <DeliveryContent />;
      case 'engagement': return <EngagementContent />;
      case 'platforms': return <PlatformsContent />;
      case 'structure': return <StructureContent />;
      case 'performance': return <PerformanceContent />;
      case 'recommendations': return <RecommendationsContent />;
      default: return <OverviewContent />;
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
      <div className="relative bg-gradient-to-r from-slate-50 to-purple-50 p-5 border-b border-slate-200">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
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
              
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${
                getScoreColor(overallScore) === 'emerald' ? 'from-emerald-100 to-emerald-200 shadow-emerald-200/50' :
                getScoreColor(overallScore) === 'blue' ? 'from-blue-100 to-blue-200 shadow-blue-200/50' :
                'from-orange-100 to-orange-200 shadow-orange-200/50'
              } flex items-center justify-center shadow-lg`}>
                <FiVideo className={`w-6 h-6 ${
                  getScoreColor(overallScore) === 'emerald' ? 'text-emerald-600' :
                  getScoreColor(overallScore) === 'blue' ? 'text-blue-600' :
                  'text-orange-600'
                }`} />
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-slate-900 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Script Analysis Results
                </h2>
                <p className="text-slate-500 text-sm font-medium">
                  {new Date(analysis.createdAt || new Date()).toLocaleDateString()} • {analysisData.analysis_metadata?.estimated_video_length || '4-5 minutes'}
                </p>
              </div>
            </div>
            
            {/* Score Badge */}
            <div className={`px-3 py-2 rounded-xl font-bold text-sm shadow-lg ${
              getScoreColor(overallScore) === 'emerald' ? 'bg-emerald-500 text-white' :
              getScoreColor(overallScore) === 'blue' ? 'bg-blue-500 text-white' :
              'bg-orange-500 text-white'
            }`}>
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
                        ? 'bg-gradient-to-r from-white to-white/95 text-slate-900 shadow-lg border border-slate-200/50' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                    }`}
                  >
                    {/* Active tab indicator */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-blue-50/50 rounded-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    <div className={`relative z-10 ${isActive ? 'text-purple-600' : 'group-hover:text-purple-500'} transition-colors duration-200`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className={`relative z-10 ${isActive ? 'inline' : 'hidden'} sm:inline transition-opacity duration-200`}>
                      {tab.label}
                    </span>
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
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
          scrollBehavior: 'smooth'
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

export default ScriptAnalysisResultsViewer;